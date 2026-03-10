import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, FolderOpen, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSense from "@/components/AdSense";
import { supabase } from "@/integrations/supabase/client";
import { toTitleCase, cleanDisplayTitle, toSubjectSlug, fromSubjectSlug, toTopicUrl } from "@/lib/utils";
import InteractivePracticeBanner from "@/components/InteractivePracticeBanner";

const getPdfEmbedUrl = (pdfUrl: string): string => {
  if (!pdfUrl) return "";
  const driveMatch = pdfUrl.match(/https?:\/\/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  return pdfUrl;
};

interface WorksheetRow {
  id: string;
  title: string;
  description: string | null;
  pdf_url: string;
  image_url: string | null;
  subject: string;
}

interface RelatedTopic {
  id: string;
  title: string;
  slug: string;
  worksheetCount: number;
  image_url?: string | null;
}

interface CategoryInfo {
  id: string;
  grade: string;
  subject: string;
  title: string;
  description: string | null;
}

interface SubcategoryInfo {
  id: string;
  title: string;
  slug: string;
  category_id: string;
}

const SITE_URL = "https://www.wizkidshub.com";

const TopicPage = () => {
  const { gradeSlug, subjectSlug, topicSlug } = useParams();
  const [worksheets, setWorksheets] = useState<WorksheetRow[]>([]);
  const [subcategory, setSubcategory] = useState<SubcategoryInfo | null>(null);
  const [category, setCategory] = useState<CategoryInfo | null>(null);
  const [relatedTopics, setRelatedTopics] = useState<RelatedTopic[]>([]);
  const [loading, setLoading] = useState(true);

  const gradeNumber = gradeSlug?.replace("grade-", "") || "";
  const subjectDisplay = fromSubjectSlug(subjectSlug);

  useEffect(() => {
    setWorksheets([]);
    setSubcategory(null);
    setCategory(null);
    setRelatedTopics([]);
    setLoading(true);

    const loadData = async () => {
      try {
        if (!gradeNumber || !subjectSlug || !topicSlug) return;

        // Find category by grade + subject
        const { data: catData } = await supabase
          .from("worksheet_categories")
          .select("id, grade, subject, title, description")
          .eq("grade", gradeNumber)
          .ilike("subject", subjectDisplay)
          .maybeSingle();

        if (!catData) return;
        setCategory(catData);

        // Find subcategory by slug + category_id
        const { data: subData } = await supabase
          .from("worksheet_subcategories")
          .select("id, title, slug, category_id")
          .eq("category_id", catData.id)
          .eq("slug", topicSlug)
          .eq("is_archived", false)
          .maybeSingle();

        if (!subData) return;
        setSubcategory(subData);

        // Fetch worksheets for this topic
        const { data: wsData } = await supabase
          .from("worksheets")
          .select("id, title, description, pdf_url, image_url, subject")
          .eq("subcategory_id", subData.id)
          .eq("is_archived", false)
          .order("created_at", { ascending: false });

        setWorksheets(wsData || []);

        // Fetch related topics (other subcategories in same category)
        const { data: relatedData } = await supabase
          .from("worksheet_subcategories")
          .select("id, title, slug, image_url")
          .eq("category_id", catData.id)
          .eq("is_archived", false)
          .neq("id", subData.id)
          .order("sort_order", { ascending: true })
          .limit(12);

        if (relatedData) {
          const withCounts = await Promise.all(
            relatedData.map(async (topic) => {
              const { count } = await supabase
                .from("worksheets")
                .select("*", { count: "exact", head: true })
                .eq("subcategory_id", topic.id)
                .eq("is_archived", false);
              return {
                id: topic.id,
                title: topic.title,
                slug: topic.slug,
                worksheetCount: count || 0,
                image_url: topic.image_url,
              };
            })
          );
          setRelatedTopics(
            withCounts
              .filter((t) => t.worksheetCount > 0)
              .sort((a, b) => b.worksheetCount - a.worksheetCount)
              .slice(0, 6)
          );
        }
      } catch (error) {
        console.error("Error loading topic page:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [gradeNumber, subjectSlug, topicSlug, subjectDisplay]);

  const topicTitle = toTitleCase(subcategory?.title) || toTitleCase(topicSlug?.replace(/-/g, " "));
  const gradeLabel = `Grade ${gradeNumber}`;
  const subjectLabel = toTitleCase(category?.subject) || toTitleCase(subjectDisplay);

  // Indexing logic: require ≥3 worksheets + title + related topics
  const hasEnoughContent =
    worksheets.length >= 3 &&
    !!subcategory?.title &&
    relatedTopics.length > 0;

  const canonicalUrl = `${SITE_URL}/categories/${gradeSlug}/${subjectSlug}/${topicSlug}`;
  const seoTitle = `${topicTitle} Worksheets - ${gradeLabel} ${subjectLabel} | WizKidsHub`;
  const seoDescription = `Free printable ${topicTitle} worksheets for ${gradeLabel} ${subjectLabel}. ${worksheets.length} worksheets available. Download and practice. No sign-up required.`;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: `${gradeLabel} Worksheets`, href: `/categories/${gradeSlug}` },
    { label: toTitleCase(category?.title) || subjectLabel, href: `/categories/${gradeSlug}/${subjectSlug}` },
    { label: topicTitle },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />
        {!hasEnoughContent && <meta name="robots" content="noindex,follow" />}
      </Helmet>

      <Breadcrumbs items={breadcrumbItems} className="hidden" />

      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={breadcrumbItems} className="mb-4" />
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              {topicTitle} Worksheets
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {worksheets.length} free printable {topicTitle.toLowerCase()} worksheet
              {worksheets.length !== 1 ? "s" : ""} for {gradeLabel} {subjectLabel} students.
              {category?.description ? ` ${category.description}` : ""}
            </p>
          </div>
        </section>

        {/* Top Ad */}
        <div className="w-full py-4">
          <div className="max-w-7xl mx-auto px-4">
            <AdSense adSlot="8901234567" adFormat="horizontal" className="w-full min-h-[90px]" />
          </div>
        </div>

        {/* Worksheets Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                  <p className="text-muted-foreground text-lg">Loading worksheets...</p>
                </div>
              </div>
            ) : worksheets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No worksheets available in this topic yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {worksheets.map((ws) => (
                  <Card key={ws.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-[4/3] overflow-hidden bg-muted flex items-stretch">
                      <iframe
                        src={getPdfEmbedUrl(ws.pdf_url)}
                        title={ws.title}
                        className="w-full h-full border-0"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2">
                        {toTitleCase(cleanDisplayTitle(ws.title))}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {toTitleCase(cleanDisplayTitle(ws.description))}
                      </p>
                      <Button asChild variant="default" className="w-full">
                        <Link to={`/worksheet/${ws.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Related Topics */}
        {relatedTopics.length > 0 && category && (
          <section className="py-12 px-4 bg-secondary/5">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-foreground font-heading">
                Related Topics in {toTitleCase(category.title)}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {relatedTopics.map((topic) => (
                  <Link
                    key={topic.id}
                    to={toTopicUrl(category.grade, category.subject, topic.slug)}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow hover:border-primary/50 group overflow-hidden">
                      <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                        {topic.image_url ? (
                          <img
                            src={topic.image_url}
                            alt={`${toTitleCase(topic.title)} worksheets`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FolderOpen className="w-8 h-8 text-primary/40" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <h3 className="font-semibold text-sm text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                          {toTitleCase(topic.title)}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {topic.worksheetCount} worksheet{topic.worksheetCount !== 1 ? "s" : ""}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom Ad */}
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

export default TopicPage;
