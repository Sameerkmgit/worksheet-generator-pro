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
import { getWorksheetById, getWorksheetImageOverride, getWorksheetCategoryById, getSubcategoryById, WorksheetData } from "@/lib/worksheetStorage";
import { toTitleCase, cleanDisplayTitle, toSubjectSlug, toTopicUrl } from "@/lib/utils";
import InteractivePracticeBanner from "@/components/InteractivePracticeBanner";
import { Badge } from "@/components/ui/badge";

interface RelatedWorksheet {
  id: string;
  title: string;
  subject: string;
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

const WorksheetDetail = () => {
  const { worksheetId } = useParams();
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
      if (!worksheetId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getWorksheetById(worksheetId);
        
        if (!data) {
          setLoading(false);
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
          .eq("id", worksheetId)
          .maybeSingle();
        
        if (wsData?.subcategory_id) {
          const subcat = await getSubcategoryById(wsData.subcategory_id);
          if (subcat) {
            setSubcategory(subcat);
          }
          
          const { data: topicWorksheets, error: topicError } = await supabase
            .from("worksheets")
            .select("id, title, subject")
            .eq("subcategory_id", wsData.subcategory_id)
            .eq("is_archived", false)
            .neq("id", worksheetId)
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
            .select("id, title, subject")
            .eq("grade", gradeNum)
            .eq("is_archived", false)
            .neq("id", worksheetId)
            .limit(6);
          
          if (!gradeError && gradeWorksheets) {
            // Filter out ones already in moreFromTopic
            const topicIds = new Set(moreFromTopic.map(w => w.id));
            const filtered = gradeWorksheets.filter(w => !topicIds.has(w.id)).slice(0, 6);
            setMoreFromGrade(filtered);
          }
        }

        // Check for image override
        const override = await getWorksheetImageOverride(worksheetId);
        setImageUrl(override || data.imageUrl || "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800");
      } catch (error) {
        console.error("Error loading worksheet:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWorksheet();
  }, [worksheetId]);

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
  const pageTitle = (cleanTitle && gradeNum && subjectName)
    ? `${cleanTitle} - Grade ${gradeNum} ${subjectName} Free Printable Worksheet | WizKidsHub`
    : `${cleanTitle} - Free Printable PDF | WizKidsHub`;
  const pageDescription = (cleanTitle && gradeNum && subjectName)
    ? `Download this free printable ${subjectName} worksheet for Grade ${gradeNum} students. Topic: ${cleanTitle}. No sign-up required. Perfect for classroom or home use. | WizKidsHub`
    : `Download free Grade ${worksheet.grade} ${subjectName} worksheet: ${cleanTitle}. Perfect for classroom and home learning.`;
  const pageUrl = `https://www.wizkidshub.com/worksheet/${worksheetId}`;

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
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                      Grade {worksheet.grade}
                    </span>
                    <span className="bg-secondary/10 text-secondary-foreground px-3 py-1 rounded-full">
                      {toTitleCase(worksheet.subject)}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{toTitleCase(cleanDisplayTitle(worksheet.title))}</h1>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    {toTitleCase(cleanDisplayTitle(worksheet.description))}
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

              {/* Skills Section */}
              {worksheet.skills && Array.isArray(worksheet.skills) && worksheet.skills.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Skills Developed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {worksheet.skills.map((skill: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span className="text-muted-foreground">{toTitleCase(skill)}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Usage Section */}
              {worksheet.usage && (
                <Card>
                  <CardHeader>
                    <CardTitle>How to Use This Worksheet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {worksheet.usage}
                    </p>
                  </CardContent>
                </Card>
              )}

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
                  <Link key={ws.id} to={`/worksheet/${ws.id}`}>
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
                  <Link key={ws.id} to={`/worksheet/${ws.id}`}>
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