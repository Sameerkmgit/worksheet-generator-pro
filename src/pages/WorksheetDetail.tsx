import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Download, ArrowLeft, Loader2, FileText, ArrowRight, Sparkles } from "lucide-react";
import AdSense from "@/components/AdSense";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { supabase } from "@/integrations/supabase/client";
import { getWorksheetBySlug, getWorksheetById, getWorksheetImageOverride, getWorksheetCategoryById, getSubcategoryById, WorksheetData } from "@/lib/worksheetStorage";
import { toTitleCase, cleanDisplayTitle, toSubjectSlug, toTopicUrl, toWorksheetUrl } from "@/lib/utils";
import InteractivePracticeBanner from "@/components/InteractivePracticeBanner";
import { Badge } from "@/components/ui/badge";

interface RelatedWorksheet {
  id: string;
  title: string;
  subject: string;
  slug?: string | null;
}

// Generate dynamic description when DB field is empty
function generateDescription(title: string, grade: string, subject: string): string {
  const subjectName = toTitleCase(subject);
  const cleanName = toTitleCase(cleanDisplayTitle(title));
  return `This free printable ${subjectName} worksheet is designed for Grade ${grade} students. "${cleanName}" helps young learners build essential ${subjectName.toLowerCase()} skills through structured practice problems. Perfect for classroom instruction, homework assignments, or at-home learning — no sign-up required.`;
}

// Generate dynamic learning objectives when DB skills field is empty
function generateLearningObjectives(title: string, subject: string): string[] {
  const subjectLower = subject.toLowerCase();
  const cleanName = cleanDisplayTitle(title).toLowerCase();

  const baseObjectives: Record<string, string[]> = {
    math: [
      `Practice core ${cleanName} concepts and build computational fluency`,
      "Strengthen number sense and problem-solving strategies",
      "Develop accuracy and speed with grade-appropriate math problems",
      "Build confidence in applying mathematical reasoning",
    ],
    english: [
      `Improve reading comprehension and ${cleanName} skills`,
      "Expand vocabulary and strengthen language usage",
      "Practice writing mechanics including grammar and punctuation",
      "Develop critical thinking through language-based exercises",
    ],
    science: [
      `Explore key ${cleanName} concepts through guided activities`,
      "Develop observation and scientific reasoning skills",
      "Learn to identify and classify scientific phenomena",
      "Build a foundation for hands-on scientific inquiry",
    ],
    default: [
      `Practice and reinforce ${cleanName} skills`,
      `Build foundational knowledge in ${toTitleCase(subject).toLowerCase()}`,
      "Develop critical thinking and problem-solving abilities",
      "Gain confidence through structured, guided practice",
    ],
  };

  return baseObjectives[subjectLower] || baseObjectives.default;
}

// Generate dynamic how-to-use guidance when DB usage field is empty
function generateHowToUse(grade: string, subject: string): string {
  return `Print this worksheet and give it to your Grade ${grade} student to complete independently or with guidance. Review the answers together to identify areas of strength and topics that may need additional practice. This worksheet works great as a classroom warm-up, homework assignment, or supplementary learning activity at home. For best results, encourage students to show their work and explain their reasoning.`;
}

// Generate dynamic FAQs when DB faq field is empty — boosts AdSense word count + enables FAQPage rich snippets
function generateFaq(title: string, grade: string, subject: string): Array<{ question: string; answer: string }> {
  const cleanName = toTitleCase(cleanDisplayTitle(title));
  const subjectName = toTitleCase(subject);
  return [
    {
      question: `Is the ${cleanName} worksheet free to download?`,
      answer: `Yes. Every worksheet on WizKidsHub — including ${cleanName} — is 100% free to download and print. There is no sign-up, no email required, and no paywall. You can use it at home, in the classroom, or for tutoring.`,
    },
    {
      question: `What grade level is this ${subjectName} worksheet for?`,
      answer: `This worksheet is designed for Grade ${grade} students. The questions, vocabulary, and difficulty are aligned with Grade ${grade} ${subjectName} learning standards, but it also works well as review for older students or as a stretch challenge for advanced younger learners.`,
    },
    {
      question: `How long does it take to complete this worksheet?`,
      answer: `Most Grade ${grade} students complete this worksheet in 15 to 25 minutes. Give your child quiet, focused time to work through it, and plan another 5 minutes afterwards to review answers together. Struggling learners may need a little longer — that is completely normal.`,
    },
    {
      question: `Do you provide an answer key?`,
      answer: `Many of our worksheets include an answer key on the last page of the PDF. If an answer key is not included, the questions are designed to have clear, single correct answers that a parent or teacher can verify quickly. You can also reach out via our Support page if you need help.`,
    },
    {
      question: `Can I use this ${subjectName} worksheet in my classroom?`,
      answer: `Absolutely. Teachers are welcome to print and distribute WizKidsHub worksheets to their students for non-commercial classroom use. We just ask that you do not republish or resell our worksheets on other websites.`,
    },
  ];
}

const WorksheetDetail = () => {
  const { worksheetSlug } = useParams();
  const navigate = useNavigate();
  const [worksheet, setWorksheet] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<any>(null);
  const [subcategory, setSubcategory] = useState<any>(null);
  const [moreFromTopic, setMoreFromTopic] = useState<RelatedWorksheet[]>([]);
  const [moreFromGrade, setMoreFromGrade] = useState<RelatedWorksheet[]>([]);

  useEffect(() => {
    const loadWorksheet = async () => {
      if (!worksheetSlug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Try loading by slug first, then fall back to ID
        let data = await getWorksheetBySlug(worksheetSlug);
        if (!data) {
          data = await getWorksheetById(worksheetSlug);
        }
        
        if (!data) {
          setLoading(false);
          return;
        }

        // If we loaded by ID and there's a slug, redirect to the slug URL
        if (/^\d+$/.test(worksheetSlug) && data.slug) {
          navigate(`/worksheet/${data.slug}`, { replace: true });
          return;
        }

        setWorksheet(data);

        // Load category for breadcrumbs
        if (data.categoryId) {
          const categoryData = await getWorksheetCategoryById(data.categoryId);
          setCategory(categoryData);
        }
        
        // Fetch subcategory for breadcrumbs
        const { data: wsData } = await supabase
          .from("worksheets")
          .select("subcategory_id")
          .eq("id", data.id)
          .maybeSingle();
        
        if (wsData?.subcategory_id) {
          const subcat = await getSubcategoryById(wsData.subcategory_id);
          if (subcat) {
            setSubcategory(subcat);
          }
          
          const { data: topicWorksheets, error: topicError } = await supabase
            .from("worksheets")
            .select("id, title, subject, slug")
            .eq("subcategory_id", wsData.subcategory_id)
            .eq("is_archived", false)
            .neq("id", data.id)
            .limit(6);
          
          if (!topicError && topicWorksheets) {
            setMoreFromTopic(topicWorksheets);
          }
        }

        // Fetch "More from this grade" (same grade, different worksheets)
        const gradeNum = data.grade?.toString().replace("Grade ", "").trim();
        if (gradeNum) {
          const { data: gradeWorksheets, error: gradeError } = await supabase
            .from("worksheets")
            .select("id, title, subject, slug")
            .eq("grade", gradeNum)
            .eq("is_archived", false)
            .neq("id", data.id)
            .limit(6);
          
          if (!gradeError && gradeWorksheets) {
            // Filter out ones already in moreFromTopic
            const topicIds = new Set(moreFromTopic.map(w => w.id));
            const filtered = gradeWorksheets.filter(w => !topicIds.has(w.id)).slice(0, 6);
            setMoreFromGrade(filtered);
          }
        }

        // Check for image override
        const override = await getWorksheetImageOverride(data.id);
        setImageUrl(override || data.imageUrl || "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800");
      } catch (error) {
        console.error("Error loading worksheet:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWorksheet();
  }, [worksheetSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading worksheet...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!worksheet) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md mx-4">
            <CardHeader>
              <CardTitle>Worksheet Not Found</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The worksheet you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => navigate(-1)} className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const cleanTitle = toTitleCase(cleanDisplayTitle(worksheet.title));
  const gradeNum = worksheet.grade?.toString().replace("Grade ", "").trim();
  const subjectName = toTitleCase(worksheet.subject);
  // Use the raw DB title (already in standard naming convention) for SEO meta
  const rawTitle = worksheet.title || cleanTitle;
  const pageTitle = `${rawTitle} | WizKidsHub`;
  const topicName = cleanTitle.split("–")[0]?.trim() || cleanTitle;
  const pageDescription = `Download this free printable ${topicName} worksheet for Grade ${gradeNum} ${subjectName}. Perfect for practice, homework, and classroom use.`;
  const pageUrl = `https://www.wizkidshub.com/worksheet/${worksheet.slug || worksheet.id}`;

  const gradeSlug = worksheet.grade ? `grade-${gradeNum}` : "";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalResource",
    "name": cleanTitle,
    "description": pageDescription,
    "educationalLevel": `Grade ${gradeNum}`,
    "learningResourceType": "Worksheet",
    "isAccessibleForFree": true,
    "inLanguage": "en",
    "url": pageUrl,
    "about": subjectName,
    "encodingFormat": "application/pdf",
    "publisher": {
      "@type": "Organization",
      "name": "WizKidsHub Worksheets",
      "url": "https://www.wizkidshub.com"
    }
  };

  // FAQ — DB field if present, otherwise auto-generated
  const faqItems: Array<{ question: string; answer: string }> =
    worksheet.faq && Array.isArray(worksheet.faq) && worksheet.faq.length > 0
      ? worksheet.faq
      : generateFaq(worksheet.title, gradeNum, worksheet.subject);

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  // Build dynamic breadcrumb items
  const breadcrumbItems: Array<{ label: string; href?: string }> = [
    { label: "Home", href: "/" },
    { label: `Grade ${worksheet.grade}`, href: `/categories/${gradeSlug}` },
  ];
  
  if (category) {
    const subjectSlug = toSubjectSlug(category.subject);
    breadcrumbItems.push({ 
      label: toTitleCase(category.title) || "Category", 
      href: `/categories/${gradeSlug}/${subjectSlug}` 
    });
  }
  
  if (subcategory && category) {
    breadcrumbItems.push({ 
      label: toTitleCase(subcategory.title) || "Topic", 
      href: toTopicUrl(gradeNum, category.subject, subcategory.slug || subcategory.id)
    });
  }
  
  breadcrumbItems.push({ label: toTitleCase(cleanDisplayTitle(worksheet.title)) });

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>
      
      {/* Breadcrumbs component injects JSON-LD */}
      <Breadcrumbs items={breadcrumbItems} className="hidden" />

      <Header />

      <main className="flex-1">
        {/* Top Banner Ad */}
        <div className="w-full py-4">
          <div className="max-w-7xl mx-auto px-4">
            <AdSense adSlot="8901234567" adFormat="horizontal" className="w-full min-h-[90px]" />
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumbs items={breadcrumbItems} className="mb-4" />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Introduction Section */}
              {worksheet.intro && (
                <Card>
                  <CardHeader>
                    <CardTitle>Introduction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {worksheet.intro}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Practice Questions Section */}
              {worksheet.content && (
                <Card>
                  <CardHeader>
                    <CardTitle>Practice Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {worksheet.content}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Worksheet Details */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0">Grade {gradeNum}</Badge>
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground border-0">{subjectName}</Badge>
                    {worksheet.difficulty && (
                      <Badge variant="outline">{toTitleCase(worksheet.difficulty)}</Badge>
                    )}
                    {worksheet.subCategory && (
                      <Badge variant="outline">{toTitleCase(worksheet.subCategory)}</Badge>
                    )}
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{cleanTitle}</h1>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    {worksheet.description
                      ? toTitleCase(cleanDisplayTitle(worksheet.description))
                      : generateDescription(worksheet.title, gradeNum, worksheet.subject)}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button size="lg" className="w-full md:w-auto" asChild>
                      <a href={worksheet.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-5 w-5" />
                        Download PDF
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full md:w-auto" asChild>
                      <a 
                        href="https://practice.wizkidshub.com"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Sparkles className="mr-2 h-5 w-5" />
                        Start Interactive Practice
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* PDF Preview */}
              {worksheet.pdfUrl && (
                <Card>
                  <CardHeader>
                    <CardTitle>Worksheet Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      // Extract Google Drive file ID and create embed URL
                      const driveMatch = worksheet.pdfUrl.match(/https?:\/\/drive\.google\.com\/file\/d\/([^/]+)/);
                      const fileId = driveMatch ? driveMatch[1] : null;
                      const embedUrl = fileId 
                        ? `https://drive.google.com/file/d/${fileId}/preview`
                        : worksheet.pdfUrl;
                      const viewUrl = fileId
                        ? `https://drive.google.com/file/d/${fileId}/view`
                        : worksheet.pdfUrl;
                      
                      return (
                        <>
                          <div className="w-full rounded-lg overflow-hidden border bg-muted">
                            <iframe
                              src={embedUrl}
                              className="w-full h-[600px] md:h-[800px]"
                              title={`${worksheet.title} Preview`}
                              allow="autoplay"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground mt-3 text-center">
                            Can't see the preview?{" "}
                            <a 
                              href={viewUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-primary hover:underline"
                            >
                              Open in Google Drive
                            </a>
                          </p>
                        </>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}


              {/* Questions/Content Section */}
              {worksheet.questions && Array.isArray(worksheet.questions) && worksheet.questions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Worksheet Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {worksheet.questions.map((question: any, index: number) => (
                        <li key={index} className="text-muted-foreground">
                          {typeof question === 'string' ? question : question.question || question.text}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Learning Objectives / Skills Section — always shown */}
              <Card>
                <CardHeader>
                  <CardTitle>Learning Objectives</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(worksheet.skills && Array.isArray(worksheet.skills) && worksheet.skills.length > 0
                      ? worksheet.skills
                      : generateLearningObjectives(worksheet.title, worksheet.subject)
                    ).map((skill: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span className="text-muted-foreground">{toTitleCase(skill)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* How to Use — always shown */}
              <Card>
                <CardHeader>
                  <CardTitle>How to Use This Worksheet</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {worksheet.usage || generateHowToUse(gradeNum, worksheet.subject)}
                  </p>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              {worksheet.faq && Array.isArray(worksheet.faq) && worksheet.faq.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {worksheet.faq.map((item: any, index: number) => (
                      <div key={index}>
                        <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
                        <p className="text-muted-foreground">{item.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Sidebar Ad */}
              <div className="sticky top-4">
                <AdSense adSlot="9012345678" adFormat="vertical" className="min-h-[250px]" />
              </div>
            </div>
          </div>
        </div>

        {/* More from this Topic Section */}
        {moreFromTopic.length > 0 && (
          <section className="py-12 px-4 bg-secondary/5">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-foreground font-heading">
                More from this Topic
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {moreFromTopic.map((ws) => (
                  <Link key={ws.id} to={toWorksheetUrl(ws)}>
                    <Card className="h-full hover:shadow-lg transition-shadow hover:border-primary/50 group">
                      <CardContent className="p-4">
                        <FileText className="w-8 h-8 text-primary/60 mb-2 group-hover:text-primary transition-colors" />
                        <h3 className="font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {toTitleCase(cleanDisplayTitle(ws.title))}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {toTitleCase(ws.subject)}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* More from this Grade Section */}
        {moreFromGrade.length > 0 && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground font-heading">
                  More Grade {worksheet.grade?.toString().replace("Grade ", "")} Worksheets
                </h2>
                <Link 
                  to={`/categories/grade-${worksheet.grade?.toString().replace("Grade ", "").trim()}`}
                  className="text-primary hover:underline flex items-center gap-1 text-sm font-medium"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {moreFromGrade.map((ws) => (
                  <Link key={ws.id} to={toWorksheetUrl(ws)}>
                    <Card className="h-full hover:shadow-lg transition-shadow hover:border-primary/50 group">
                      <CardContent className="p-4">
                        <FileText className="w-8 h-8 text-primary/60 mb-2 group-hover:text-primary transition-colors" />
                        <h3 className="font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {toTitleCase(cleanDisplayTitle(ws.title))}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {toTitleCase(ws.subject)}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom Banner Ad */}
        <div className="w-full py-4">
          <div className="max-w-7xl mx-auto px-4">
            <AdSense adSlot="0123456789" adFormat="horizontal" className="w-full min-h-[90px]" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WorksheetDetail;