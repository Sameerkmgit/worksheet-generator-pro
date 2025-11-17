import { Link } from "react-router-dom";
import { BookOpen, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Math", path: "/category/math" },
    { label: "English", path: "/category/english" },
    { label: "Science", path: "/category/science" },
    { label: "More", path: "/category/coloring" },
  ];

  return (
    <header className="border-b border-gray-200 bg-card sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto max-w-[1140px] px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold font-heading text-primary">
              SmartKidsWorksheets
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/admin/upload">
              <Button size="sm" variant="accent">
                Upload
              </Button>
            </Link>
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
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link to="/admin/upload" className="mt-4">
                  <Button className="w-full" variant="accent">
                    Upload Worksheet
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
