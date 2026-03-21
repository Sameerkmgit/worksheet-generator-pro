import { useParams, Link } from "react-router-dom";
import { FolderOpen, BookOpen, Sparkles } from "lucide-react";
import { Helmet } from "react-helmet-async";
import AdSense from "@/components/AdSense";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toTitleCase, toSubjectSlug, toTopicUrl } from "@/lib/utils";
import InteractivePracticeBanner from "@/components/InteractivePracticeBanner";

interface WorksheetCategory {
  id: string;
  title: string;
  subject: string;
  grade: string;
  description?: string | null;
  image_url?: string | null;
}

interface PopularTopic {
  id: string;
  title: string;
  slug: string;
  subject: string;
  worksheet_count: number;
  category_title: string;
  image_url?: string | null;
}

const gradeTitles: Record<string, string> = {
  "grade-1": "Grade 1",
  "grade-2": "Grade 2",
  "grade-3": "Grade 3",
  "grade-4": "Grade 4",
  "grade-5": "Grade 5",
};

// Rich grade-level descriptions for AdSense content
const gradeDescriptions: Record<string, { intro: string; subjects: { name: string; description: string }[] }> = {
  "1": {
    intro: "Grade 1 is when students build the foundation for lifelong learning. At this level, children develop number sense through counting, basic addition and subtraction, and place value concepts. They also begin reading simple sentences, learning phonics patterns, and exploring the world around them through basic science observations.",
    subjects: [
      { name: "Math", description: "Covers counting to 100, number recognition, basic addition and subtraction within 20, shapes, patterns, and simple measurement. Students build number sense and develop early problem-solving skills." },
      { name: "English", description: "Focuses on phonics, letter recognition, sight words, simple sentence reading and writing. Students practice handwriting, spelling, and basic grammar concepts like nouns and verbs." },
      { name: "Science", description: "Introduces living and non-living things, basic plant and animal life, weather observations, and the five senses. Students learn to observe, describe, and ask questions about their environment." },
      { name: "Computer Science", description: "Introduces basic sequencing, simple patterns, and early logical thinking through unplugged activities. Students begin to understand how instructions work step by step." },
    ],
  },
  "2": {
    intro: "Grade 2 students strengthen their reading fluency and begin tackling multi-digit addition and subtraction. They explore more complex sentence structures, expand their vocabulary, and dive deeper into science topics like habitats and the water cycle. This is a pivotal year for building academic confidence and independent learning habits.",
    subjects: [
      { name: "Math", description: "Covers addition and subtraction with regrouping, place value to 1000, basic multiplication concepts, time, money, and data handling. Students develop fluency in mental math strategies." },
      { name: "English", description: "Focuses on reading comprehension, expanded vocabulary, paragraph writing, and grammar skills including adjectives, adverbs, and punctuation. Students begin writing short stories and descriptions." },
      { name: "Science", description: "Explores habitats, life cycles, states of matter, and the water cycle. Students learn to classify, compare, and record observations in simple experiments." },
      { name: "Computer Science", description: "Builds on sequencing with simple algorithms, basic coding concepts using visual blocks, and understanding inputs and outputs in everyday technology." },
    ],
  },
  "3": {
    intro: "In Grade 3, students transition from learning to read to reading to learn. Multiplication and division become central math skills, while writing assignments grow longer and more structured. Science topics expand to include ecosystems, simple machines, and earth science, challenging students to think critically and analytically.",
    subjects: [
      { name: "Math", description: "Covers multiplication tables, division, fractions, measurement, area and perimeter, and multi-step word problems. Students develop strong computational skills and mathematical reasoning." },
      { name: "English", description: "Focuses on reading comprehension across genres, essay writing, grammar mastery including tenses and sentence types, and vocabulary building through context clues and word roots." },
      { name: "Science", description: "Explores ecosystems, food chains, simple machines, rocks and minerals, and the solar system. Students conduct guided experiments and learn the basics of the scientific method." },
      { name: "Computer Science", description: "Introduces flowcharts, conditional logic, and basic programming concepts. Students begin to decompose problems and create simple step-by-step solutions." },
    ],
  },
  "4": {
    intro: "Grade 4 marks a significant increase in academic complexity. Students work with larger numbers, explore fractions and decimals in depth, and begin writing multi-paragraph essays. Science studies expand to energy, electricity, and the human body. Critical thinking and independent problem-solving become essential skills at this level.",
    subjects: [
      { name: "Math", description: "Covers multi-digit multiplication and division, fractions and decimals, geometry, data interpretation, and complex word problems. Students apply math to real-world scenarios." },
      { name: "English", description: "Focuses on advanced reading comprehension, persuasive and narrative writing, complex grammar, figurative language, and research skills. Students develop a strong academic writing voice." },
      { name: "Science", description: "Explores energy and electricity, the human body systems, weather and climate, and earth's resources. Students design experiments and analyze results systematically." },
      { name: "Computer Science", description: "Covers variables, loops, and debugging in visual programming environments. Students create simple projects and begin understanding how software solves real problems." },
    ],
  },
  "5": {
    intro: "Grade 5 prepares students for middle school with advanced concepts across all subjects. Students master operations with fractions and decimals, write structured research reports, and explore complex science topics like ecosystems and the scientific method in depth. This year focuses on building independence and higher-order thinking skills.",
    subjects: [
      { name: "Math", description: "Covers operations with fractions and decimals, ratios, coordinate geometry, volume, and algebraic thinking. Students tackle multi-step problems requiring strategic planning and logical reasoning." },
      { name: "English", description: "Focuses on literary analysis, structured essay writing, advanced grammar and mechanics, vocabulary from Greek and Latin roots, and oral presentation skills. Students engage with diverse text types." },
      { name: "Science", description: "Explores matter and chemical changes, force and motion, ecosystems and biodiversity, and space science. Students conduct independent investigations and write lab reports." },
      { name: "Computer Science", description: "Introduces functions, events, and more complex algorithms. Students build interactive projects and begin understanding how technology impacts society and daily life." },
    ],
  },
};

// Subject icons and colors
const subjectConfig: Record<string, { icon: typeof BookOpen; color: string }> = {
  Math: { icon: BookOpen, color: "from-blue-500 to-indigo-500" },
  English: { icon: BookOpen, color: "from-green-500 to-emerald-500" },
  Science: { icon: BookOpen, color: "from-purple-500 to-violet-500" },
  "Computer Science": { icon: BookOpen, color: "from-orange-500 to-amber-500" },
  Assignments: { icon: BookOpen, color: "from-red-500 to-rose-500" },
};

const Category = () => {
  const { gradeSlug } = useParams();
  const [categories, setCategories] = useState<WorksheetCategory[]>([]);
  const [popularTopics, setPopularTopics] = useState<PopularTopic[]>([]);
  const [loading, setLoading] = useState(true);

  // Parse grade number from slug (grade-1 -> 1)
  const gradeNumber = gradeSlug?.replace('grade-', '') || '';

  useEffect(() => {
    setCategories([]);
    setPopularTopics([]);
    setLoading(true);

    const loadData = async () => {
      try {
        console.log(`Loading categories for grade=${gradeNumber}`);

        // Fetch categories (subjects) for this grade
        const { data: catData, error: catError } = await supabase
          .from("worksheet_categories")
          .select("id,title,subject,grade,description,image_url,sort_order")
          .eq("grade", gradeNumber)
          .order("sort_order", { ascending: true })
          .order("title", { ascending: true });

        if (catError) {
          console.error("Error fetching categories:", catError);
        } else {
          console.log(`Loaded ${catData?.length || 0} categories`);
          setCategories(catData || []);
        }

        // Fetch popular topics (subcategories with worksheet counts) for this grade
        // Join subcategories with categories to filter by grade, then count worksheets
        const { data: topicsData, error: topicsError } = await supabase
          .from("worksheet_subcategories")
          .select(`
            id,
            title,
            slug,
            category_id,
            image_url,
            worksheet_categories!inner(grade, title, subject)
          `)
          .eq("worksheet_categories.grade", gradeNumber)
          .eq("is_archived", false)
          .order("sort_order", { ascending: true })
          .limit(10);

        if (topicsError) {
          console.error("Error fetching topics:", topicsError);
        } else if (topicsData) {
          // Get worksheet counts for each subcategory
          const topicsWithCounts = await Promise.all(
            topicsData.map(async (topic: any) => {
              const { count } = await supabase
                .from("worksheets")
                .select("*", { count: "exact", head: true })
                .eq("subcategory_id", topic.id)
                .eq("is_archived", false);
              
              return {
                id: topic.id,
                title: topic.title,
                slug: topic.slug,
                subject: topic.worksheet_categories?.subject || "",
                worksheet_count: count || 0,
                category_title: topic.worksheet_categories?.title || "",
                image_url: topic.image_url,
              };
            })
          );
          
          // Sort by worksheet count and take top 8
          const sortedTopics = topicsWithCounts
            .filter(t => t.worksheet_count > 0)
            .sort((a, b) => b.worksheet_count - a.worksheet_count)
            .slice(0, 8);
          
          setPopularTopics(sortedTopics);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (gradeNumber) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [gradeNumber]);
  
  const gradeTitle = gradeTitles[gradeSlug || ""] || `Grade ${gradeNumber}`;
  const pageTitle = `${gradeTitle} Worksheets`;
  const seoTitle = `${gradeTitle} Worksheets – Free Printable Math, English & Science PDFs | WizKidsHub`;
  
  const pageDescription = `Download free ${gradeTitle} printable worksheets in Math, English, and Science. Curriculum-aligned PDFs for home and classroom use.`;

  const pageUrl = `https://www.wizkidshub.com/categories/${gradeSlug}`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": pageUrl,
    "isPartOf": {
      "@type": "WebSite",
      "name": "WizKidsHub Worksheets",
      "url": "https://www.wizkidshub.com"
    }
  };

  // Breadcrumb items for Grade pages
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: `${gradeTitle} Worksheets` }
  ];

  // Get unique subjects from categories
  const subjects = [...new Set(categories.map(c => c.subject))];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      {/* Breadcrumbs component injects JSON-LD */}
      <Breadcrumbs items={breadcrumbItems} className="hidden" />

      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-8">
          <div className="max-w-7xl mx-auto px-4">
            {/* Visible Breadcrumbs */}
            <Breadcrumbs items={breadcrumbItems} className="mb-4" />
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-foreground tracking-tight">
              {gradeTitle} Worksheets
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-6">
              {pageDescription}
            </p>

            {/* Interactive Practice CTA */}
            <InteractivePracticeBanner variant="page" grade={gradeNumber} />
          </div>
        </section>

        {/* Subjects Grid */}
        <section className="py-6 px-4 bg-background">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-foreground font-heading">
              Browse by Subject
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
                ))
              ) : subjects.length === 0 ? (
                <p className="col-span-full text-muted-foreground">No subjects available yet.</p>
              ) : (
                subjects.map((subject) => {
                  const config = subjectConfig[subject] || { icon: BookOpen, color: "from-gray-500 to-gray-600" };
                  const Icon = config.icon;
                  const subjectSlug = toSubjectSlug(subject);
                  
                  return (
                    <Link 
                      key={subject} 
                      to={`/categories/${gradeSlug}/${subjectSlug}`}
                      className="block"
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow group">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {toTitleCase(subject)}
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </section>

        {/* Grade Description Section */}
        {gradeDescriptions[gradeNumber] && (
          <section className="py-8 px-4 bg-background">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="prose prose-muted max-w-none">
                <h2 className="text-2xl font-bold text-foreground font-heading mb-3">
                  What {gradeTitle} Students Learn
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {gradeDescriptions[gradeNumber].intro}
                </p>

                <h3 className="text-xl font-bold text-foreground font-heading mb-4">
                  What You Will Find Here
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {gradeDescriptions[gradeNumber].subjects.map((subj) => (
                    <div key={subj.name} className="rounded-lg border p-4 bg-card">
                      <h4 className="font-semibold text-foreground mb-1">{subj.name}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{subj.description}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg bg-primary/5 border border-primary/10 p-4">
                  <h4 className="font-semibold text-foreground mb-1">Curriculum Alignment</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    All {gradeTitle} worksheets on WizKidsHub are aligned with standard school curricula. They are designed to complement classroom instruction and can be used as homework, revision material, or enrichment activities. Our worksheets follow a progressive difficulty structure to help students build skills step by step.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Ad between sections */}
        <div className="max-w-7xl mx-auto px-4 py-2">
          <AdSense adSlot="4567890123" adFormat="auto" className="w-full" />
        </div>

        {/* Categories Grid */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-foreground font-heading">
              All {gradeTitle} Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-12">
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p className="text-muted-foreground text-lg">Loading categories...</p>
                  </div>
                </div>
              ) : categories.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No categories available for this grade yet. Check back soon!
                  </p>
                </div>
              ) : (
                categories.map((category) => (
                  <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {category.image_url ? (
                      <div className="aspect-[16/9] overflow-hidden bg-muted">
                        <img
                          src={category.image_url}
                          alt={`${gradeTitle} ${category.subject} worksheets category image`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <FolderOpen className="h-14 w-14 text-primary/40" />
                      </div>
                    )}

                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <FolderOpen className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{toTitleCase(category.title)}</CardTitle>
                      </div>
                      <CardDescription className="text-sm">{toTitleCase(category.subject)}</CardDescription>
                      {category.description && (
                        <CardDescription className="text-sm mt-1">
                          {toTitleCase(category.description)}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button asChild className="w-full">
                        <Link to={`/categories/${gradeSlug}/${toSubjectSlug(category.subject)}`}>View Worksheets</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Popular Topics Section */}
        {popularTopics.length > 0 && (
          <section className="py-12 px-4 bg-secondary/5">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground font-heading">
                  Popular Topics in {gradeTitle}
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {popularTopics.map((topic) => (
                  <Link key={topic.id} to={toTopicUrl(gradeNumber, topic.subject, topic.slug)}>
                    <Card className="h-full hover:shadow-lg transition-shadow hover:border-primary/50 overflow-hidden">
                      <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                        {topic.image_url ? (
                          <img
                            src={topic.image_url}
                            alt={`${toTitleCase(topic.title)} worksheets for ${gradeTitle}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FolderOpen className="h-10 w-10 text-primary/40" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                          {toTitleCase(topic.title)}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {topic.worksheet_count} worksheet{topic.worksheet_count !== 1 ? "s" : ""}
                        </p>
                        <p className="text-xs text-primary mt-1">
                          {toTitleCase(topic.category_title)}
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
            <AdSense adSlot="5678901234" adFormat="horizontal" className="w-full min-h-[90px]" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Category;