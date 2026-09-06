import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Disclaimer = () => {
  const pageUrl = "https://www.wizkidshub.com/disclaimer";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Disclaimer | WizKidsHub</title>
        <meta name="description" content="Read the disclaimer for WizKidsHub educational worksheets and learning materials." />
        <link rel="canonical" href={pageUrl} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Disclaimer | WizKidsHub" />
        <meta property="og:description" content="Read the disclaimer for WizKidsHub educational worksheets and learning materials." />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Disclaimer | WizKidsHub" />
        <meta name="twitter:description" content="Read the disclaimer for WizKidsHub educational worksheets and learning materials." />
      </Helmet>

      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">
          Disclaimer
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <p className="text-sm">Last updated: June 2026</p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Educational Information Only</h2>
            <p>
              WizKidsHub provides printable worksheets, activity ideas, articles, and related learning materials for general educational and informational purposes. They are intended to support practice at home or in the classroom and are not a substitute for a formal curriculum, professional teaching, educational assessment, tutoring, or advice from a qualified education specialist.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Accuracy And Suitability</h2>
            <p>
              We make reasonable efforts to create useful and accurate resources, but we do not guarantee that every worksheet, answer, explanation, grade label, or external link is complete, current, error-free, or suitable for every learner or curriculum. Educational standards and terminology vary by school, region, and country.
            </p>
            <p>
              Parents, guardians, and educators should review materials before use and decide whether they are appropriate for a child's age, ability, learning needs, and local curriculum. Stop or adapt an activity if it causes confusion or is not a good fit for the learner.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">No Guarantees</h2>
            <p>
              Access to the website and its materials is provided on an “as is” and “as available” basis without warranties of any kind. We do not promise particular grades, test results, learning outcomes, uninterrupted availability, or that every file will work with every device, printer, or PDF reader.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Limitation Of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, WizKidsHub is not liable for losses, damages, costs, or educational outcomes arising from reliance on or use of the website, its worksheets, downloads, advertisements, or third-party links. Users remain responsible for supervising children and for how the materials are selected and used.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Contact</h2>
            <p>
              If you find an error or have a question about this disclaimer, contact us through the{" "}
              <a href="/support" className="text-primary hover:underline">WizKidsHub support page</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Disclaimer;
