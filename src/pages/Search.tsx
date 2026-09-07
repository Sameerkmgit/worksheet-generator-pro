import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, Download, Filter, X, ArrowUp, ArrowDown, Hash } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { getWorksheetCardImage, WorksheetData, sortWorksheetsNatural } from "@/lib/worksheetStorage";
import { toTitleCase, cleanDisplayTitle, toWorksheetUrl } from "@/lib/utils";

const PAGE_SIZE = 24;

interface SearchResult {
  id: string;
  title: string;
  grade: string;
  subject: string;
  slug?: string | null;
  image_url?: string | null;
}

// Available subjects for exact matching (order matters: exact matches are checked first)
const SUBJECTS = ["Math", "English", "Science", "Computer Science", "Assignments"];

/**
 * Check if query exactly matches a subject name (case-insensitive).
 * Returns the normalized subject value for the filter, or null if no exact match.
 */
const getExactSubjectMatch = (query: string): string | null => {
  const normalizedQuery = query.trim().toLowerCase();

  for (const subject of SUBJECTS) {
    if (subject.toLowerCase() === normalizedQuery) {
      return subject.toLowerCase();
    }
  }

  return null;
};

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [gradeFilter, setGradeFilter] = useState(searchParams.get("grade") || "all");
  const [subjectFilter, setSubjectFilter] = useState(searchParams.get("subject") || "all");
  const [hasAutoSelectedSubject, setHasAutoSelectedSubject] = useState(false);
  const [jumpToValue, setJumpToValue] = useState("");
  const [showJumpInput, setShowJumpInput] = useState(false);
  const resultsGridRef = useRef<HTMLDivElement>(null);

  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  const handleJumpToResult = () => {
    const num = parseInt(jumpToValue, 10);
    if (isNaN(num) || num < 1 || num > results.length) return;
    const card = resultsGridRef.current?.querySelector(`[data-result-index="${num}"]`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      setJumpToValue("");
      setShowJumpInput(false);
    }
  };

  // Auto-select subject filter if query exactly matches a subject name
  useEffect(() => {
    const query = searchParams.get("q") || "";
    const existingSubjectParam = searchParams.get("subject");

    if (query && !existingSubjectParam && !hasAutoSelectedSubject) {
      const exactMatch = getExactSubjectMatch(query);
      if (exactMatch) {
        setSubjectFilter(exactMatch);
        setHasAutoSelectedSubject(true);

        const params = new URLSearchParams(searchParams);
        params.set("subject", exactMatch);
        setSearchParams(params, { replace: true });
      }
    }
  }, [searchParams, hasAutoSelectedSubject, setSearchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (gradeFilter !== "all") params.set("grade", gradeFilter);
    if (subjectFilter !== "all") params.set("subject", subjectFilter);
    setSearchParams(params);
  };

  const handleGradeChange = (value: string) => {
    setGradeFilter(value);
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (value !== "all") params.set("grade", value);
    if (subjectFilter !== "all") params.set("subject", subjectFilter);
    setSearchParams(params);
  };

  const handleSubjectChange = (value: string) => {
    setSubjectFilter(value);
    setHasAutoSelectedSubject(true);
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (gradeFilter !== "all") params.set("grade", gradeFilter);
    if (value !== "all") params.set("subject", value);
    setSearchParams(params);
  };

  const query = searchParams.get("q")?.trim() || "";
  const grade = searchParams.get("grade") || "all";
  const subject = searchParams.get("subject") || "all";

  const hasSearchCriteria = Boolean(query) || grade !== "all" || subject !== "all";

  // Reset pagination whenever the search criteria change
  useEffect(() => {
    setPage(0);
  }, [query, grade, subject]);

  // Fetch matching worksheets from the live library
  useEffect(() => {
    if (!hasSearchCriteria) {
      setResults([]);
      setTotalCount(0);
      return;
    }

    let cancelled = false;

    const fetchResults = async () => {
      if (page === 0) setLoading(true);
      else setLoadingMore(true);

      try {
        let request = supabase
          .from("worksheets")
          .select("id, title, grade, subject, slug, image_url", { count: "exact" })
          .eq("is_archived", false)
          .order("grade", { ascending: true })
          .order("title", { ascending: true })
          .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

        if (grade !== "all") request = request.eq("grade", grade);
        if (subject !== "all") request = request.ilike("subject", subject);
        if (query) {
          const term = query.replace(/[%,]/g, " ").trim();
          request = request.or(
            `title.ilike.%${term}%,description.ilike.%${term}%,sub_category.ilike.%${term}%,subject.ilike.%${term}%`
          );
        }

        const { data, count, error } = await request;
        if (error) throw error;
        if (cancelled) return;

        const rows = sortWorksheetsNatural((data as SearchResult[]) || []);
        setResults((prev) => (page === 0 ? rows : [...prev, ...rows]));
        if (typeof count === "number") setTotalCount(count);
      } catch {
        if (!cancelled && page === 0) {
          setResults([]);
          setTotalCount(0);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    };

    fetchResults();
    return () => {
      cancelled = true;
    };
  }, [query, grade, subject, page, hasSearchCriteria]);

  const clearAll = () => {
    setSearchQuery("");
    setGradeFilter("all");
    setSubjectFilter("all");
    setHasAutoSelectedSubject(false);
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Search Worksheets | WizKidsHub Worksheets</title>
        <meta name="description" content="Search for educational worksheets by keyword, grade, and subject. Find the perfect printable worksheet for your child." />
        <link rel="canonical" href="https://www.wizkidshub.com/search" />
      </Helmet>

      <Header />

      <main className="py-12 px-6">
        <div className="container mx-auto max-w-[1140px]">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 font-heading">Search Worksheets</h1>
            <p className="text-lg text-muted-foreground">Find the perfect worksheet for your child</p>
          </div>

          {/* Search Bar */}
          <div className="bg-card p-6 rounded-lg shadow-card mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Search by keyword (e.g., addition, alphabet, animals)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="h-12"
                />
              </div>
              <Button onClick={handleSearch} size="lg" className="h-12">
                <SearchIcon className="mr-2" />
                Search
              </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              <Select value={gradeFilter} onValueChange={handleGradeChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Grades" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="1">Grade 1</SelectItem>
                  <SelectItem value="2">Grade 2</SelectItem>
                  <SelectItem value="3">Grade 3</SelectItem>
                  <SelectItem value="4">Grade 4</SelectItem>
                  <SelectItem value="5">Grade 5</SelectItem>
                </SelectContent>
              </Select>
              <Select value={subjectFilter} onValueChange={handleSubjectChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="math">Math</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="computer science">Computer Science</SelectItem>
                  <SelectItem value="assignments">Assignments</SelectItem>
                </SelectContent>
              </Select>
              {(gradeFilter !== "all" || subjectFilter !== "all" || searchQuery) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAll}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold font-heading">
              {loading
                ? "Searching worksheets…"
                : `${totalCount} ${totalCount === 1 ? "Worksheet" : "Worksheets"} Found`}
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-72 rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" ref={resultsGridRef}>
                {results.map((worksheet, index) => {
                  const worksheetData = {
                    imageUrl: worksheet.image_url || "",
                    subject: worksheet.subject,
                    title: worksheet.title,
                    id: worksheet.id,
                  } as WorksheetData;
                  const imageSrc = getWorksheetCardImage(worksheetData);

                  return (
                    <Card key={worksheet.id} className="group" data-result-index={index + 1}>
                      <CardHeader>
                        <img
                          src={imageSrc}
                          alt={cleanDisplayTitle(worksheet.title)}
                          loading="lazy"
                          className="w-full h-48 object-cover rounded-lg mb-4"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            const fallback = getWorksheetCardImage({ ...worksheetData, imageUrl: "" } as WorksheetData);
                            if (target.src !== fallback) target.src = fallback;
                          }}
                        />
                        <CardTitle className="text-xl group-hover:text-primary transition-colors font-heading">
                          {toTitleCase(cleanDisplayTitle(worksheet.title))}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2 mb-2">
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                            Grade {worksheet.grade}
                          </span>
                          <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded">
                            {toTitleCase(worksheet.subject)}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link to={toWorksheetUrl(worksheet)}>
                            <Download className="mr-2 h-4 w-4" />
                            View & Download
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>

              {results.length < totalCount && (
                <div className="mt-8 text-center">
                  <Button variant="outline" onClick={() => setPage((p) => p + 1)} disabled={loadingMore}>
                    {loadingMore ? "Loading…" : "Load more worksheets"}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {hasSearchCriteria ? "No worksheets found" : "Start your search"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {hasSearchCriteria
                  ? "Try adjusting your search or filters"
                  : "Search by keyword, or pick a grade and subject"}
              </p>
              {hasSearchCriteria && <Button onClick={clearAll}>Clear All Filters</Button>}
            </div>
          )}
        </div>
      </main>

      {/* Floating Navigation Buttons */}
      {results.length > 0 && (
        <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-40">
          {showJumpInput && (
            <div className="flex items-center gap-1 bg-card border rounded-lg shadow-lg p-2 animate-fade-in">
              <Input
                type="number"
                min={1}
                max={results.length}
                placeholder={`1-${results.length}`}
                value={jumpToValue}
                onChange={(e) => setJumpToValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleJumpToResult()}
                className="w-20 h-8 text-sm"
              />
              <Button size="sm" variant="secondary" onClick={handleJumpToResult} className="h-8 px-2">
                Go
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setShowJumpInput(false)} className="h-8 px-2">
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              onClick={() => setShowJumpInput(!showJumpInput)}
              className="h-10 w-10 rounded-full shadow-lg"
              title="Jump to result #"
            >
              <Hash className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              onClick={scrollToTop}
              className="h-10 w-10 rounded-full shadow-lg"
              title="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              onClick={scrollToBottom}
              className="h-10 w-10 rounded-full shadow-lg"
              title="Scroll to bottom"
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Search;
