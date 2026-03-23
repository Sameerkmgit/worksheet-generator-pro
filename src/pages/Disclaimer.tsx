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
          <p>
            WizKidsHub provides educational worksheets and learning materials for informational and educational purposes only.
          </p>
          <p>
            While we strive to ensure accuracy and relevance, we do not guarantee that all content is free from errors or suitable for every learner.
          </p>
          <p>
            Parents and teachers are encouraged to review and adapt materials based on individual learning needs.
          </p>
          <p>
            WizKidsHub is not responsible for any outcomes resulting from the use of our worksheets.
          </p>
          <p>
            All content is provided "as is" without warranties of any kind.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Disclaimer;
