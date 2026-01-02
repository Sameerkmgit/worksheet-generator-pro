import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-16">
      <div className="container mx-auto max-w-[1140px] px-6">
        
        {/* Footer Ad Placement */}
        <div className="mb-12 flex justify-center">
          <div className="bg-primary-foreground/10 rounded-lg border border-dashed border-primary-foreground/30 p-6 text-center w-full max-w-[728px] min-h-[90px] flex items-center justify-center">
            {/* <!-- Google AdSense - Footer Banner - Replace with your ad code --> */}
            <p className="text-primary-foreground/70 text-sm">Advertisement</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">About Us</h3>
            <p className="text-sm opacity-90">
              WizKidsHubWorksheets provides free, high-quality educational worksheets for students from Grade 1 to 5.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="opacity-90 hover:opacity-100 transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories/grade-1" className="opacity-90 hover:opacity-100 transition-opacity">
                  Grade 1
                </Link>
              </li>
              <li>
                <Link to="/categories/grade-2" className="opacity-90 hover:opacity-100 transition-opacity">
                  Grade 2
                </Link>
              </li>
              <li>
                <Link to="/categories/grade-3" className="opacity-90 hover:opacity-100 transition-opacity">
                  Grade 3
                </Link>
              </li>
              <li>
                <Link to="/categories/grade-4" className="opacity-90 hover:opacity-100 transition-opacity">
                  Grade 4
                </Link>
              </li>
              <li>
                <Link to="/categories/grade-5" className="opacity-90 hover:opacity-100 transition-opacity">
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
                <Link to="/privacy-policy" className="opacity-90 hover:opacity-100 transition-opacity">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="opacity-90 hover:opacity-100 transition-opacity">
                  Terms Of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 text-center text-sm opacity-90">
          <p>© 2025 WizKidsHubWorksheets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;