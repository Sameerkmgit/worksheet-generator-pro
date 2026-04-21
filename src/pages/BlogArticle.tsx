import { Helmet } from "react-helmet-async";
import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { blogArticles, getArticleBySlug } from "@/lib/blogArticles";

const categoryColors: Record<string, string> = {
  Math: "bg-blue-100 text-blue-800",
  English: "bg-green-100 text-green-800",
  Science: "bg-purple-100 text-purple-800",
  Parenting: "bg-pink-100 text-pink-800",
  "Teaching Tips": "bg-amber-100 text-amber-800",
};

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: article.title },
  ];

  const related = blogArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 2);

  const canonical = `https://www.wizkidshub.com/blog/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    datePublished: article.date,
    author: { "@type": "Organization", name: "WizKidsHub" },
    publisher: {
      "@type": "Organization",
      name: "WizKidsHub",
      logo: {
        "@type": "ImageObject",
        url: "https://www.wizkidshub.com/favicon.png",
      },
    },
    mainEntityOfPage: canonical,
    description: article.summary,
    articleSection: article.category,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{`${article.title} | WizKidsHub Blog`}</title>
        <meta name="description" content={article.summary} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-4 py-10">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          <div className="flex items-center gap-3 mb-4">
            <Badge
              className={`${
                categoryColors[article.category] || "bg-muted text-muted-foreground"
              } border-0 text-xs font-medium`}
            >
              {article.category}
            </Badge>
            <span className="text-sm text-muted-foreground">{article.date}</span>
            <span className="text-sm text-muted-foreground">
              · {article.readingMinutes} min read
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {article.summary}
          </p>

          <div
            className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:text-foreground prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-foreground/90 prose-p:leading-relaxed prose-li:text-foreground/90 prose-a:text-primary prose-a:font-medium hover:prose-a:underline prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-12 pt-8 border-t">
            <Link
              to="/blog"
              className="text-primary font-medium hover:underline"
            >
              ← Back to all articles
            </Link>
          </div>
        </article>

        {related.length > 0 && (
          <section className="bg-secondary/5 py-12 px-4 mt-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold font-heading mb-6">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((a) => (
                  <Link key={a.slug} to={`/blog/${a.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <Badge
                          className={`${
                            categoryColors[a.category] ||
                            "bg-muted text-muted-foreground"
                          } border-0 text-xs font-medium w-fit mb-2`}
                        >
                          {a.category}
                        </Badge>
                        <CardTitle className="text-lg leading-snug">
                          {a.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {a.summary}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogArticle;
