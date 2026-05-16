import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { BookOpen, Download, GraduationCap, Users, Heart, Mail } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

const About = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About Us" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About Us – Free Printable Worksheets | WizKidsHub</title>
        <meta
          name="description"
          content="WizKidsHub offers 780+ free printable worksheets for Grades 1–5 in Math, English, Science, and Computer Science. Built by parents and educators."
        />
        <link rel="canonical" href="https://www.wizkidshub.com/about" />
        <meta property="og:title" content="About WizKidsHub – Free Printable Worksheets for Kids" />
        <meta property="og:description" content="WizKidsHub offers 780+ free printable worksheets for Grades 1–5 in Math, English, Science, and Computer Science." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.wizkidshub.com/about" />
        <meta property="og:site_name" content="WizKidsHub" />
      </Helmet>

      <Breadcrumbs items={breadcrumbItems} className="hidden" />

      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary/5 py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-4">
              About WizKidsHub
            </h1>
            <p className="text-lg text-muted-foreground">
              Free, curriculum-aligned printable worksheets for Grade&nbsp;1 to Grade&nbsp;5 students&nbsp;— no sign-up required.
            </p>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
            <Breadcrumbs items={breadcrumbItems} className="mb-6" />

            <h2 className="text-2xl font-bold text-foreground font-heading">Who We Are</h2>
            <p>
              WizKidsHub is an educational platform built by <strong>parents and educators</strong> who understand the daily challenges of finding quality learning materials. We started this project because we saw how difficult it can be for families and teachers to access well-structured, grade-appropriate worksheets without paying for expensive subscriptions or creating accounts on multiple websites.
            </p>
            <p>
              Our team includes experienced teachers, curriculum designers, and parents who collaborate to create worksheets that are both educationally sound and engaging for young learners. Every resource on WizKidsHub is reviewed for accuracy, clarity, and alignment with standard school curricula before it is published.
            </p>

            <h2 className="text-2xl font-bold text-foreground font-heading pt-4">Our Mission</h2>
            <p>
              Our mission is simple: to provide <strong>free, high-quality printable worksheets</strong> so that every child has access to effective learning materials regardless of their family's financial background. We believe that quality education resources should not be locked behind paywalls. Every student deserves the chance to practice, learn, and grow — and that starts with having the right materials at hand.
            </p>

            <h2 className="text-2xl font-bold text-foreground font-heading pt-4">What We Offer</h2>
            <p>
              WizKidsHub offers a growing library of <strong>780+ free printable worksheets</strong> covering four core subjects: <strong>Math, English, Science, and Computer Science</strong> for students in Grades 1 through 5. Our worksheets range from basic counting and phonics for Grade 1 students to advanced fractions, essay writing, and scientific investigations for Grade 5 learners. Each worksheet is available as a high-quality PDF that you can download and print instantly — no sign-up, no email address, no hidden costs.
            </p>

            <h2 className="text-2xl font-bold text-foreground font-heading pt-4">Our Approach</h2>
            <p>
              Every worksheet on WizKidsHub is <strong>curriculum-aligned and educator-reviewed</strong>. We design our resources to follow a progressive difficulty structure, so students build skills step by step within each grade level. Our worksheets are suitable for both <strong>classroom instruction and home use</strong> — whether you are a teacher looking for ready-made practice material, a parent supplementing your child's homework, or a tutor seeking structured exercises for your students.
            </p>

            <h2 className="text-2xl font-bold text-foreground font-heading pt-4">Why Free?</h2>
            <p>
              We firmly believe that <strong>education should be accessible to all</strong>. Too many families around the world cannot afford premium educational subscriptions, and too many teachers spend their own money on classroom resources. WizKidsHub exists to bridge that gap. By keeping our entire library free, we ensure that geography, income, or access to technology never stands between a child and quality learning materials. Our platform is supported through advertising, which allows us to keep every worksheet free for every user.
            </p>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-12 px-4 bg-secondary/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground font-heading text-center mb-10">
              Why WizKidsHub?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Download, title: "100% Free", desc: "Every worksheet is free to download and print — always. No subscriptions, no hidden fees." },
                { icon: Users, title: "No Sign-Up", desc: "Just browse, pick a worksheet, and download the PDF instantly. No account required." },
                { icon: GraduationCap, title: "Curriculum-Aligned", desc: "Worksheets are structured by grade and subject, aligned with standard school curricula." },
                { icon: BookOpen, title: "Growing Library", desc: "780+ worksheets and counting, with new resources added regularly across all subjects." },
              ].map((item) => (
                <div key={item.title} className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-foreground font-heading flex items-center gap-2">
              <Mail className="w-6 h-6 text-primary" />
              Get in Touch
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Have a question, suggestion, or feedback? We'd love to hear from you. Visit our{" "}
              <Link to="/support" className="text-primary hover:underline font-medium">Contact page</Link>{" "}
              to send us a message. Whether you're a teacher looking for a specific worksheet topic, a parent with a suggestion for improvement, or just want to say hello — our team reads every message and responds as quickly as possible.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 text-center bg-primary/5">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-foreground font-heading">Start Exploring</h2>
            <p className="text-muted-foreground">
              Browse worksheets by grade and subject — it only takes a few clicks to find what you need.
            </p>
            <Link
              to="/"
              className="inline-block mt-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Browse Worksheets
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
