import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Privacy Policy | WizKidsHubWorksheets</title>
        <meta name="description" content="Privacy Policy for WizKidsHubWorksheets - Learn how we protect your privacy while using our free educational worksheets." />
        <link rel="canonical" href="https://wizkidshubworksheets.com/privacy-policy" />
      </Helmet>
      <Header />
      <main className="flex-1 container mx-auto max-w-[800px] py-12 px-6">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm">Last updated: January 2025</p>
          
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Introduction</h2>
            <p>
              Welcome to WizKidsHubWorksheets. We are committed to protecting your privacy and ensuring 
              a safe experience while using our website. This Privacy Policy explains how we collect, 
              use, and safeguard information when you visit our website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Information We Collect</h2>
            <p>
              Our website provides free educational worksheets that can be downloaded and printed 
              without requiring user registration. We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Usage Data:</strong> We automatically collect certain information when you 
                visit our website, including your IP address, browser type, pages visited, and the 
                time and date of your visit. This helps us understand how visitors use our site and 
                improve our services.
              </li>
              <li>
                <strong>Cookies:</strong> We use cookies and similar tracking technologies to enhance 
                your browsing experience and analyze website traffic. You can control cookie settings 
                through your browser preferences.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Advertising</h2>
            <p>
              Our website may display advertisements from third-party advertising networks, including 
              Google AdSense. These advertisers may use cookies and similar technologies to serve ads 
              based on your prior visits to our website or other websites. You can opt out of 
              personalized advertising by visiting{" "}
              <a 
                href="https://www.google.com/settings/ads" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Ads Settings
              </a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Children's Privacy</h2>
            <p>
              Our website is designed to provide educational resources for children. We do not 
              knowingly collect personal information from children under 13 years of age. Our 
              worksheets can be downloaded freely without providing any personal information. 
              We encourage parents and guardians to supervise their children's online activities.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">How We Use Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and maintain our website</li>
              <li>Improve and optimize our content and user experience</li>
              <li>Analyze usage patterns and trends</li>
              <li>Display relevant advertisements</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Third-Party Services</h2>
            <p>
              We may use third-party services for analytics (such as Google Analytics) and 
              advertising. These services have their own privacy policies and may collect 
              information about your online activities across different websites.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Data Security</h2>
            <p>
              We take reasonable measures to protect the information collected through our website. 
              However, no method of transmission over the internet is 100% secure, and we cannot 
              guarantee absolute security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Changes To This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on 
              this page with an updated revision date. We encourage you to review this policy 
              periodically.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through our 
              website.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
