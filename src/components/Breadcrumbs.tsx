import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://wizkidshubworksheets.com";

export interface BreadcrumbItem {
  label: string;
  href?: string; // If undefined, it's the current page (no link)
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Reusable Breadcrumbs component with semantic HTML and JSON-LD schema.
 * 
 * Usage:
 * <Breadcrumbs items={[
 *   { label: "Home", href: "/" },
 *   { label: "Grade 3", href: "/categories/grade-3" },
 *   { label: "Math Worksheets" } // No href = current page
 * ]} />
 */
const Breadcrumbs = ({ items, className = "" }: BreadcrumbsProps) => {
  // Build JSON-LD BreadcrumbList schema
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href 
        ? `${SITE_URL}${item.href === "/" ? "" : item.href}`
        : `${SITE_URL}${typeof window !== "undefined" ? window.location.pathname : ""}`
    }))
  };

  return (
    <>
      {/* JSON-LD in head */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLdData)}
        </script>
      </Helmet>

      {/* Visible breadcrumb trail */}
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;

            return (
              <li key={index} className="flex items-center gap-1.5">
                {/* Separator (except before first item) */}
                {!isFirst && (
                  <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                )}

                {/* Link or current page */}
                {isLast || !item.href ? (
                  <span 
                    className="text-foreground font-medium" 
                    aria-current="page"
                  >
                    {isFirst && <Home className="h-3.5 w-3.5 inline mr-1" aria-hidden="true" />}
                    {item.label}
                  </span>
                ) : (
                  <Link 
                    to={item.href} 
                    className="hover:text-primary transition-colors"
                  >
                    {isFirst && <Home className="h-3.5 w-3.5 inline mr-1" aria-hidden="true" />}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
