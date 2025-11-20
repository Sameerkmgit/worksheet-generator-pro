import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">About Us</h3>
            <p className="text-sm opacity-90">
              SmartKidsWorksheets provides free, high-quality educational worksheets for students from Grade 1 to 5.
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
                <Link to="/category/math" className="opacity-90 hover:opacity-100 transition-opacity">
                  Math
                </Link>
              </li>
              <li>
                <Link to="/category/english" className="opacity-90 hover:opacity-100 transition-opacity">
                  English
                </Link>
              </li>
              <li>
                <Link to="/category/science" className="opacity-90 hover:opacity-100 transition-opacity">
                  Science
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-white/20 pt-8 mt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-heading font-semibold text-lg mb-2">Get free worksheets in your inbox!</h3>
            <p className="text-sm opacity-90 mb-4">Subscribe to receive new worksheets and educational resources.</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 text-center text-sm opacity-90">
          <p>© 2024 SmartKidsWorksheets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
