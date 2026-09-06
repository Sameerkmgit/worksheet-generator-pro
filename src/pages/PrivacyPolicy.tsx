import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Privacy Policy | WizKidsHubWorksheets</title>
        <meta name="description" content="Privacy Policy for WizKidsHubWorksheets - Learn how we protect your privacy while using our free educational worksheets." />
        <link rel="canonical" href="https://www.wizkidshub.com/privacy-policy" />
      </Helmet>
      <Header />
      <main className="flex-1 container mx-auto max-w-[800px] py-12 px-6">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm">Last updated: June 2026</p>
          
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
              We use Google AdSense and may work with other third-party advertising vendors to display advertisements. Google and other vendors may use cookies to serve ads based on your prior visits to this website or other websites. These cookies help vendors measure ad performance and, where permitted, personalize advertising.
            </p>
            <p>
              You can opt out of personalized advertising through{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Ads Settings
              </a>{" "}
              or learn about additional industry opt-out choices at{" "}
              <a
                href="https://www.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                AboutAds.info
              </a>. For more information about Google's data practices, see{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google's Privacy & Terms
              </a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Children's Privacy</h2>
            <p>
              WizKidsHub provides worksheets for children, but the website is intended to be selected and supervised by parents, guardians, and educators. Visitors can browse, print, and download worksheets without creating a public account or submitting personal information.
            </p>
            <p>
              Consistent with child-privacy and COPPA-friendly practices, we do not knowingly ask children under 13 to provide names, email addresses, precise locations, or other personal information. If a parent or guardian believes a child has submitted personal information through our support channel, please contact us so we can review and delete it where appropriate. We encourage adults to supervise children's use of the internet and our materials.
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
              We may use third-party analytics services, including Google Analytics, to understand aggregate website use, such as pages viewed, approximate location, device and browser type, referral source, and time spent on the site. Advertising and analytics providers may receive device identifiers, IP addresses, cookie information, and usage events according to their own privacy policies. WizKidsHub does not receive your payment details and does not sell worksheet downloads.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Cookie Choices</h2>
            <p>
              Most browsers let you block or delete cookies through their privacy settings. Disabling cookies may affect some website features, but the core worksheet library remains available without registration. Advertising choices made through Google or AboutAds are controlled by those providers and may need to be set separately on each browser or device.
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
              If you have a privacy question, request, or concern, contact us through the{" "}
              <a href="/support" className="text-primary hover:underline">WizKidsHub support page</a>. Please do not include sensitive personal information in your message.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
