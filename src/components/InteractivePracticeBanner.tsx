import { ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InteractivePracticeBannerProps {
  /** "homepage" = large hero-style, "page" = compact card, "detail" = prominent card */
  variant?: "homepage" | "page" | "detail";
  /** Grade number (e.g. "1", "2") */
  grade?: string;
  /** Subject slug (e.g. "math", "english") — already slugified */
  subjectSlug?: string;
}

const PRACTICE_BASE = "https://practice.wizkidshub.com";

function buildPracticeUrl(grade?: string, subjectSlug?: string) {
  if (grade && subjectSlug) return `${PRACTICE_BASE}/grade-${grade}/${subjectSlug}`;
  if (grade) return `${PRACTICE_BASE}/grade-${grade}`;
  return PRACTICE_BASE;
}

const InteractivePracticeBanner = ({
  variant = "page",
  grade,
  subjectSlug,
}: InteractivePracticeBannerProps) => {
  const href = buildPracticeUrl(grade, subjectSlug);

  if (variant === "homepage") {
    return (
      <section className="py-16 px-6" aria-label="Interactive practice promotion">
        <div className="container mx-auto max-w-[1140px]">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border border-primary/15 p-10 md:p-14">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-xl bg-primary/15 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-heading">
                  Practice Worksheets Online
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Try interactive worksheets with instant answers and guided practice on WizKidsHub Practice.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button size="lg" className="h-14 px-10 text-base font-semibold" asChild>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Explore Interactive Practice
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "detail") {
    return (
      <div className="rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/8 via-accent/5 to-transparent p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-foreground">
            Practice on WizKidsHub Practice
          </h2>
        </div>
        <p className="text-muted-foreground text-base">
          Try interactive worksheets with instant answers and guided practice.
        </p>
        <Button size="lg" className="mt-2" asChild>
          <a href={href} target="_blank" rel="noopener noreferrer">
            <Sparkles className="mr-2 h-5 w-5" />
            Start Interactive Practice
          </a>
        </Button>
      </div>
    );
  }

  // variant === "page" — compact banner for category/subject/topic pages
  return (
    <div className="rounded-xl border border-primary/15 bg-gradient-to-r from-primary/8 to-accent/5 p-6 flex flex-col sm:flex-row items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-lg font-bold font-heading text-foreground">Practice Online</h3>
        <p className="text-sm text-muted-foreground">
          Looking for interactive worksheets? Practice online with instant answers.
        </p>
      </div>
      <Button variant="outline" className="flex-shrink-0" asChild>
        <a href={href} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="mr-2 h-4 w-4" />
          Go to Interactive Practice
        </a>
      </Button>
    </div>
  );
};

export default InteractivePracticeBanner;
