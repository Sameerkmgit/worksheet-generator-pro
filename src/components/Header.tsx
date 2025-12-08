import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Menu, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const navigate = useNavigate();
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Grade 1", path: "/categories/grade-1" },
    { label: "Grade 2", path: "/categories/grade-2" },
    { label: "Grade 3", path: "/categories/grade-3" },
    { label: "Grade 4", path: "/categories/grade-4" },
    { label: "Grade 5", path: "/categories/grade-5" },
  ];

  return (
    <header className="border-b border-gray-200 bg-card sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto max-w-[1140px] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors font-heading"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
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
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors font-heading"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;