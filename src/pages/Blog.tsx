import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { blogArticles } from "@/lib/blogArticles";

const categoryColors: Record<string, string> = {
  Math: "bg-blue-100 text-blue-800",
  English: "bg-green-100 text-green-800",
  Science: "bg-purple-100 text-purple-800",
  Parenting: "bg-pink-100 text-pink-800",
  "Teaching Tips": "bg-amber-100 text-amber-800",
};

const Blog = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Learning Tips & Blog" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Learning Tips & Worksheet Guides | WizKidsHub Blog</title>
        <meta
          name="description"
          content="Learning tips, teaching strategies, and worksheet guides for parents and teachers helping Grade 1–5 students in Math, English, and Science."
        />
        <link rel="canonical" href="https://www.wizkidshub.com/blog" />
        <meta property="og:title" content="Learning Tips & Worksheet Guides | WizKidsHub Blog" />
        <meta property="og:description" content="Learning tips, teaching strategies, and worksheet guides for parents and teachers of Grade 1–5 students." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.wizkidshub.com/blog" />
        <meta property="og:site_name" content="WizKidsHub" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "WizKidsHub Learning Tips & Blog",
            description: "Learning tips, teaching strategies, and worksheet guides for parents and teachers of Grade 1–5 students.",
            url: "https://www.wizkidshub.com/blog",
            blogPost: blogArticles.map((a) => ({
              "@type": "BlogPosting",
              headline: a.title,
              url: `https://www.wizkidshub.com/blog/${a.slug}`,
              datePublished: a.date,
              articleSection: a.category,
              description: a.summary,
            })),
          })}
        </script>
      </Helmet>

      <Breadcrumbs items={breadcrumbItems} className="hidden" />

      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary/5 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Breadcrumbs items={breadcrumbItems} className="mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-3">
              Learning Tips &amp; Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Practical guides, teaching strategies, and learning tips for parents and educators working with Grade 1–5 students. Pair these insights with our free printable worksheets for maximum impact.
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogArticles.map((article) => (
                <Link key={article.slug} to={`/blog/${article.slug}`} className="block group">
                  <Card className="flex flex-col h-full hover:shadow-lg transition-shadow group-hover:border-primary/40">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`${categoryColors[article.category] || "bg-muted text-muted-foreground"} border-0 text-xs font-medium`}>
                          {article.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{article.date}</span>
                        <span className="text-xs text-muted-foreground">· {article.readingMinutes} min</span>
                      </div>
                      <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {article.summary}
                      </p>
                      <span className="inline-block mt-3 text-sm font-medium text-primary">Read article →</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 bg-secondary/5 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-foreground font-heading">Ready to Get Started?</h2>
            <p className="text-muted-foreground">
              Browse our full library of 780+ free printable worksheets for Grades 1–5.
            </p>
            <Link
              to="/worksheets"
              className="inline-block mt-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Browse All Worksheets
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
