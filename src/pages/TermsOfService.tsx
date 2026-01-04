import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Terms Of Service | WizKidsHubWorksheets</title>
        <meta name="description" content="Terms of Service for WizKidsHubWorksheets - Rules and guidelines for using our free educational worksheets." />
        <link rel="canonical" href="https://www.wizkidshub.com/terms-of-service" />
      </Helmet>
      <Header />
      <main className="flex-1 container mx-auto max-w-[800px] py-12 px-6">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-8">Terms Of Service</h1>
        
        <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm">Last updated: January 2025</p>
          
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Agreement To Terms</h2>
            <p>
              By accessing and using WizKidsHubWorksheets, you agree to be bound by these Terms of 
              Service. If you do not agree with any part of these terms, please do not use our website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Use Of Our Worksheets</h2>
            <p>
              WizKidsHubWorksheets provides free educational worksheets for personal and educational 
              use. You may:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Download and print worksheets for personal use</li>
              <li>Use worksheets in classroom settings for educational purposes</li>
              <li>Share printed worksheets with students, children, or family members</li>
            </ul>
            <p className="mt-4">You may NOT:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Sell or redistribute our worksheets for commercial purposes</li>
              <li>Claim ownership or authorship of our worksheets</li>
              <li>Remove or alter any copyright notices or branding on the worksheets</li>
              <li>Upload our worksheets to other websites without permission</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Intellectual Property</h2>
            <p>
              All content on WizKidsHubWorksheets, including worksheets, graphics, text, and website 
              design, is the property of WizKidsHubWorksheets and is protected by copyright laws. 
              The worksheets are provided for free personal and educational use only.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Educational Purpose</h2>
            <p>
              Our worksheets are designed for educational purposes to supplement learning for 
              students in Grades 1 through 5. While we strive to provide accurate and helpful 
              content, we make no guarantees about the educational outcomes or suitability for 
              any particular curriculum or learning objective.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Advertisements</h2>
            <p>
              Our website displays third-party advertisements to support the free availability of 
              our worksheets. We are not responsible for the content of these advertisements. 
              Clicking on advertisements may take you to third-party websites with their own 
              terms and privacy policies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Disclaimer Of Warranties</h2>
            <p>
              Our website and worksheets are provided "as is" without any warranties, express or 
              implied. We do not guarantee that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The website will be available at all times without interruption</li>
              <li>The worksheets will be error-free or suitable for your specific needs</li>
              <li>Any errors or defects will be corrected</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Limitation Of Liability</h2>
            <p>
              WizKidsHubWorksheets shall not be liable for any direct, indirect, incidental, or 
              consequential damages arising from your use of our website or worksheets. This 
              includes, but is not limited to, damages for loss of data or other intangible losses.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Changes To These Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be 
              effective immediately upon posting to this page. Your continued use of the website 
              after changes are posted constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with 
              applicable laws, without regard to conflict of law principles.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us through 
              our website.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
