import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ExternalLink, Search, X } from "lucide-react";
import { format } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { toTitleCase, cleanDisplayTitle } from "@/lib/utils";

interface Worksheet {
  id: string;
  grade: string;
  subject: string;
  title: string;
  pdf_url: string;
  created_at: string;
}

const WorksheetsBrowser = () => {
  const [grades, setGrades] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
  
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [loadingGrades, setLoadingGrades] = useState(true);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingWorksheets, setLoadingWorksheets] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if any filters are active
  const hasActiveFilters = selectedGrade !== null || selectedSubject !== null || searchTerm.trim() !== "";

  // Clear all filters
  const clearFilters = () => {
    setSelectedGrade(null);
    setSelectedSubject(null);
    setSearchTerm("");
  };

  // Fetch distinct grades on mount
  useEffect(() => {
    const fetchGrades = async () => {
      setLoadingGrades(true);
      setError(null);
      try {
        const { data, error: queryError } = await supabase
          .from("worksheets")
          .select("grade")
          .eq("is_archived", false);

        if (queryError) throw queryError;

        const gradeList: string[] = (data || []).map((d) => d.grade);
        const uniqueGrades: string[] = Array.from(new Set(gradeList)).sort();
        setGrades(uniqueGrades);
        // Do NOT auto-select the first grade
      } catch (err: any) {
        setError(err.message || "Failed to load grades");
      } finally {
        setLoadingGrades(false);
      }
    };

    fetchGrades();
  }, []);

  // Fetch all subjects (or filtered by grade if selected)
  useEffect(() => {
    const fetchSubjects = async () => {
      setLoadingSubjects(true);
      setError(null);
      try {
        let query = supabase
          .from("worksheets")
          .select("subject")
          .eq("is_archived", false);

        if (selectedGrade) {
          query = query.eq("grade", selectedGrade);
        }

        const { data, error: queryError } = await query;

        if (queryError) throw queryError;

        const subjectList: string[] = (data || []).map((d) => d.subject);
        const uniqueSubjects: string[] = Array.from(new Set(subjectList)).sort();
        setSubjects(uniqueSubjects);
        
        // Reset subject if the currently selected subject isn't available for the new grade
        if (selectedSubject && !uniqueSubjects.includes(selectedSubject)) {
          setSelectedSubject(null);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load subjects");
      } finally {
        setLoadingSubjects(false);
      }
    };

    fetchSubjects();
  }, [selectedGrade]);

  // Fetch worksheets when filters change
  useEffect(() => {
    const fetchWorksheets = async () => {
      setLoadingWorksheets(true);
      setError(null);
      try {
        let query = supabase
          .from("worksheets")
          .select("id, grade, subject, title, pdf_url, created_at")
          .eq("is_archived", false)
          .order("created_at", { ascending: false })
          .order("title", { ascending: true });

        // Only apply filters if values are selected
        if (selectedGrade) {
          query = query.eq("grade", selectedGrade);
        }
        
        if (selectedSubject) {
          query = query.eq("subject", selectedSubject);
        }

        if (searchTerm.trim()) {
          query = query.ilike("title", `%${searchTerm.trim()}%`);
        }

        const { data, error: queryError } = await query;

        if (queryError) throw queryError;

        setWorksheets((data as Worksheet[]) || []);
      } catch (err: any) {
        setError(err.message || "Failed to load worksheets");
      } finally {
        setLoadingWorksheets(false);
      }
    };

    fetchWorksheets();
  }, [selectedGrade, selectedSubject, searchTerm]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "d MMM yyyy");
    } catch {
      return dateString;
    }
  };

  // Handle grade change - use special value "__all__" for clearing
  const handleGradeChange = (value: string) => {
    if (value === "__all__") {
      setSelectedGrade(null);
    } else {
      setSelectedGrade(value);
    }
  };

  // Handle subject change - use special value "__all__" for clearing
  const handleSubjectChange = (value: string) => {
    if (value === "__all__") {
      setSelectedSubject(null);
    } else {
      setSelectedSubject(value);
    }
  };

  // Breadcrumb items for Worksheets Browser page
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Browse Worksheets" }
  ];

  return (
    <>
      <Helmet>
        <title>Browse Worksheets | WizKidsHub Worksheets</title>
        <meta name="description" content="Browse and download worksheets by grade and subject" />
        <link rel="canonical" href="https://www.wizkidshub.com/worksheets" />
      </Helmet>
      
      {/* Breadcrumbs component injects JSON-LD */}
      <Breadcrumbs items={breadcrumbItems} className="hidden" />

      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Visible Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2 font-heading">WizKidsHub Worksheets Browser</h1>
            <p className="text-muted-foreground">Browse worksheets by Grade and Subject</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            {/* Grade Dropdown */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-foreground mb-1">Grade</label>
              <Select
                value={selectedGrade || "__all__"}
                onValueChange={handleGradeChange}
                disabled={loadingGrades}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Grades" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  <SelectItem value="__all__">All Grades</SelectItem>
                  {grades.map((g) => (
                    <SelectItem key={g} value={g}>
                      Grade {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Subject Dropdown */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-foreground mb-1">Subject</label>
              <Select
                value={selectedSubject || "__all__"}
                onValueChange={handleSubjectChange}
                disabled={loadingSubjects}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  <SelectItem value="__all__">All Subjects</SelectItem>
                  {subjects.map((s) => (
                    <SelectItem key={s} value={s}>
                      {toTitleCase(s)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Box */}
            <div className="flex-[2] min-w-[200px]">
              <label className="block text-sm font-medium text-foreground mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by title…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="flex justify-end mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-md p-4 mb-6">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loadingWorksheets && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading worksheets…</span>
            </div>
          )}

          {/* Worksheets List */}
          {!loadingWorksheets && worksheets.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              {hasActiveFilters 
                ? "No worksheets found for this selection." 
                : "Select a grade or subject to browse worksheets."}
            </div>
          )}

          {!loadingWorksheets && worksheets.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Showing {worksheets.length} worksheet{worksheets.length !== 1 ? 's' : ''}
              </p>
              {worksheets.map((worksheet) => (
                <Card key={worksheet.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{toTitleCase(cleanDisplayTitle(worksheet.title))}</h3>
                      <p className="text-sm text-muted-foreground">
                        Grade {worksheet.grade} · {toTitleCase(worksheet.subject)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Added on {formatDate(worksheet.created_at)}
                      </p>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => window.open(worksheet.pdf_url, "_blank", "noopener,noreferrer")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View / Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default WorksheetsBrowser;