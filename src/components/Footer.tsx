import { Link } from "react-router-dom";
import AdSense from "@/components/AdSense";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-16">
      <div className="container mx-auto max-w-[1140px] px-6">
        
        {/* Footer Ad Placement */}
        <div className="mb-12 flex justify-center">
          <AdSense adSlot="3456789012" adFormat="horizontal" className="w-full max-w-[728px] min-h-[90px]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">About Us</h3>
            <p className="text-sm">
              WizKidsHubWorksheets provides free, high-quality educational worksheets for students from Grade 1 to 5.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:underline transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories/grade-1" className="hover:underline transition-opacity">
                  Grade 1
                </Link>
              </li>
              <li>
                <Link to="/categories/grade-2" className="hover:underline transition-opacity">
                  Grade 2
                </Link>
              </li>
              <li>
                <Link to="/categories/grade-3" className="hover:underline transition-opacity">
                  Grade 3
                </Link>
              </li>
              <li>
                <Link to="/categories/grade-4" className="hover:underline transition-opacity">
                  Grade 4
                </Link>
              </li>
              <li>
                <Link to="/categories/grade-5" className="hover:underline transition-opacity">
                  Grade 5
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy-policy" className="hover:underline transition-opacity">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:underline transition-opacity">
                  Terms Of Service
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline transition-opacity">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:underline transition-opacity">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 text-center text-sm">
          <p>© 2026 WizKidsHubWorksheets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;