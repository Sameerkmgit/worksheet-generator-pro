import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";

const blogArticles = [
  {
    title: "How to Help Your Grade 1 Child Learn Addition at Home",
    date: "February 15, 2026",
    category: "Math",
    summary:
      "Addition is one of the first math skills your child will learn in school, and reinforcing it at home can make a big difference. Discover simple strategies, hands-on activities, and free printable worksheets to make addition practice fun and effective for young learners.",
    slug: "grade-1-addition-at-home",
  },
  {
    title: "Top 5 English Worksheets for Grade 2 Students",
    date: "February 8, 2026",
    category: "English",
    summary:
      "Grade 2 is a critical year for reading fluency and writing development. We've curated five of our most popular English worksheets that cover phonics, vocabulary, sentence building, and reading comprehension — all free to download and print.",
    slug: "top-english-worksheets-grade-2",
  },
  {
    title: "Why Printable Worksheets Are Better Than Screen Time for Young Learners",
    date: "January 28, 2026",
    category: "Parenting",
    summary:
      "While educational apps have their place, research shows that writing by hand and working on paper helps children retain information better. Learn why printable worksheets remain one of the most effective learning tools for kids in Grades 1–5.",
    slug: "printable-vs-screen-time",
  },
  {
    title: "How to Use WizKidsHub Worksheets in Your Classroom",
    date: "January 20, 2026",
    category: "Teaching Tips",
    summary:
      "Whether you teach a single grade or a mixed-ability class, WizKidsHub worksheets can save you hours of preparation time. Here's how teachers across the country are using our free printable resources for warm-ups, homework, and differentiated practice.",
    slug: "wizkidshub-in-classroom",
  },
  {
    title: "Grade 3 Science: Fun Ways to Teach Plants and Animals",
    date: "January 12, 2026",
    category: "Science",
    summary:
      "Plants and animals are fascinating topics for Grade 3 students. Combine hands-on activities like nature walks and garden projects with our free science worksheets to create engaging lessons that spark curiosity and scientific thinking.",
    slug: "grade-3-science-plants-animals",
  },
  {
    title: "Building Math Confidence in Grade 4 and Grade 5 Students",
    date: "January 5, 2026",
    category: "Math",
    summary:
      "Many students start to struggle with math confidence in upper elementary grades as concepts become more abstract. Learn proven strategies for building a growth mindset and how regular worksheet practice helps students master fractions, decimals, and multi-step problems.",
    slug: "math-confidence-grade-4-5",
  },
];

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
        <title>Learning Tips & Blog – Free Worksheet Guides for Parents & Teachers | WizKidsHub</title>
        <meta
          name="description"
          content="Read learning tips, teaching strategies, and worksheet guides for parents and teachers. Practical advice for helping Grade 1–5 students succeed in Math, English, and Science."
        />
        <link rel="canonical" href="https://www.wizkidshub.com/blog" />
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
                <Card key={article.slug} className="flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${categoryColors[article.category] || "bg-muted text-muted-foreground"} border-0 text-xs font-medium`}>
                        {article.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{article.date}</span>
                    </div>
                    <CardTitle className="text-lg leading-snug">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {article.summary}
                    </p>
                  </CardContent>
                </Card>
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
