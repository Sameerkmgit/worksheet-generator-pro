import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { BookOpen, Download, GraduationCap, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About Us | WizKidsHub</title>
        <meta
          name="description"
          content="WizKidsHub provides free printable worksheets for Grade 1-5 students in Math, English, Science, and Computer Science. No sign-up required."
        />
        <link rel="canonical" href="https://www.wizkidshub.com/about" />
      </Helmet>

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

        {/* Mission */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
            <h2 className="text-2xl font-bold text-foreground font-heading">Our Mission</h2>
            <p>
              WizKidsHub was created with a simple goal: give teachers, parents, and tutors instant access to high-quality practice material without paywalls or account walls. Every worksheet on this site is <strong>completely free</strong> to download and print.
            </p>
            <p>
              We cover core subjects — <strong>Math, English, Science, and Computer Science</strong> — across Grades 1 through 5. Our worksheets are designed to be curriculum-aligned and progressively structured so students build skills step by step.
            </p>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-16 px-4 bg-secondary/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground font-heading text-center mb-10">
              Why WizKidsHub?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Download, title: "100% Free", desc: "Every worksheet is free to download and print — always." },
                { icon: Users, title: "No Sign-Up", desc: "Just browse, pick a worksheet, and download the PDF instantly." },
                { icon: GraduationCap, title: "Curriculum-Aligned", desc: "Worksheets are structured by grade and subject for easy planning." },
                { icon: BookOpen, title: "Growing Library", desc: "New worksheets added regularly across Math, English, Science & CS." },
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

        {/* CTA */}
        <section className="py-16 px-4 text-center">
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
