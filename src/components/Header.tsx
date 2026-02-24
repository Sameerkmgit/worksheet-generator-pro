import { Link, useNavigate, useLocation } from "react-router-dom";
import { BookOpen, Menu, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Grade 1", path: "/categories/grade-1" },
    { label: "Grade 2", path: "/categories/grade-2" },
    { label: "Grade 3", path: "/categories/grade-3" },
    { label: "Grade 4", path: "/categories/grade-4" },
    { label: "Grade 5", path: "/categories/grade-5" },
    { label: "About Us", path: "/about" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="border-b border-gray-200 bg-card sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between w-full">
        {/* Logo Section - Aligned to left edge */}
        <div className="flex items-center gap-4 pl-4 md:pl-6">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-secondary/20"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold font-heading text-primary">
              WizKidsHub<span className="text-foreground">Worksheets</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation - Centered with right padding */}
        <nav className="hidden md:flex items-center gap-6 pr-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-semibold transition-colors font-heading ${
                isActive(item.path)
                  ? "text-primary border-b-2 border-primary pb-0.5"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden mr-4">
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-lg font-semibold transition-colors font-heading ${
                    isActive(item.path)
                      ? "text-primary border-l-4 border-primary pl-3"
                      : "text-foreground hover:text-primary pl-4"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;