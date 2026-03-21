import { useState, useEffect } from "react";
import { Upload, FileText, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

interface WorksheetCategory {
  id: string;
  title: string;
  grade: string;
  subject: string;
}

interface Subcategory {
  id: string;
  title: string;
  category_id: string;
}

const SUBJECT_LABELS: Record<string, string> = {
  math: "Math",
  english: "English",
  science: "Science",
  "computer-science": "Computer Science",
  assignments: "Assignments",
};

const AdminUpload = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [titleManuallyEdited, setTitleManuallyEdited] = useState(false);
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [categories, setCategories] = useState<WorksheetCategory[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);

  // Auto-generate title when grade, subject, and subcategory are selected
  useEffect(() => {
    if (titleManuallyEdited || !grade || !subject || !subcategoryId) return;

    const selectedSubcat = subcategories.find((s) => s.id === subcategoryId);
    if (!selectedSubcat) return;

    const gradeNumber = grade.replace("grade-", "");
    const subjectLabel = SUBJECT_LABELS[subject] || subject;

    const fetchNextNumber = async () => {
      const { count } = await supabase
        .from("worksheets")
        .select("id", { count: "exact", head: true })
        .eq("grade", gradeNumber)
        .eq("subject", subject)
        .eq("subcategory_id", subcategoryId)
        .eq("is_archived", false);

      const nextNum = (count ?? 0) + 1;
      setTitle(
        `${selectedSubcat.title} \u2013 Grade ${gradeNumber} ${subjectLabel} Worksheet ${nextNum} \u2013 Free Printable`
      );
    };

    fetchNextNumber();
  }, [grade, subject, subcategoryId, subcategories, titleManuallyEdited]);

  // Fetch categories when grade + subject change
  useEffect(() => {
    if (!grade || !subject) {
      setCategories([]);
      setCategoryId("");
      setSubcategories([]);
      setSubcategoryId("");
      return;
    }

    const fetchCategories = async () => {
      setLoadingCategories(true);
      // Convert grade-1 → "1"
      const gradeNumber = grade.replace("grade-", "");
      const { data, error } = await supabase
        .from("worksheet_categories")
        .select("id, title, grade, subject")
        .eq("grade", gradeNumber)
        .eq("subject", subject)
        .order("title");

      if (!error && data) {
        setCategories(data);
      }
      setLoadingCategories(false);
    };

    fetchCategories();
  }, [grade, subject]);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (!categoryId) {
      setSubcategories([]);
      setSubcategoryId("");
      return;
    }

    const fetchSubcategories = async () => {
      setLoadingSubcategories(true);
      const { data, error } = await supabase
        .from("worksheet_subcategories")
        .select("id, title, category_id")
        .eq("category_id", categoryId)
        .eq("is_archived", false)
        .order("title");

      if (!error && data) {
        setSubcategories(data);
      }
      setLoadingSubcategories(false);
    };

    fetchSubcategories();
  }, [categoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !grade || !subject || !pdfFile || !categoryId || !subcategoryId) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields: title, grade, subject, category, subcategory, and PDF file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Build a structured file path: grade-1/english/phonics/<filename>.pdf
      const gradeNumber = grade.replace("grade-", "");
      const safeName = pdfFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filePath = `grade-${gradeNumber}/${subject}/${Date.now()}-${safeName}`;

      // Upload PDF to the worksheet-pdfs bucket
      const { error: uploadError } = await supabase.storage
        .from("worksheet-pdfs")
        .upload(filePath, pdfFile, {
          contentType: "application/pdf",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from("worksheet-pdfs")
        .getPublicUrl(filePath);

      // Convert grade from "grade-1" to "1" for DB
      const gradeTitle = gradeNumber;

      // Insert worksheet into database
      const { error: insertError } = await supabase
        .from("worksheets")
        .insert({
          id: `worksheet-${Date.now()}`,
          title,
          description: description || null,
          grade: gradeTitle,
          subject,
          pdf_url: publicUrl,
          is_archived: false,
          difficulty: difficulty && difficulty !== "none" ? difficulty : null,
          sub_category: subCategory && subCategory !== "none" ? subCategory : null,
          category_id: categoryId,
          subcategory_id: subcategoryId,
        });

      if (insertError) throw insertError;

      toast({
        title: "Success!",
        description: "Worksheet uploaded and visible on the public site.",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setGrade("");
      setSubject("");
      setCategoryId("");
      setSubcategoryId("");
      setDifficulty("");
      setSubCategory("");
      setPdfFile(null);
      setCategories([]);
      setSubcategories([]);

      const pdfInput = document.getElementById("pdf") as HTMLInputElement;
      if (pdfInput) pdfInput.value = "";
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload worksheet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/5 flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="container mx-auto max-w-[1140px] py-8 px-6">
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-heading">
              Upload New Worksheet
            </h1>
            <p className="text-lg text-muted-foreground">
              Add a new worksheet to the collection
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Worksheet Details</CardTitle>
              <CardDescription>
                Fill in the information and upload the PDF for your worksheet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-semibold">
                    Worksheet Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="Auto-generated from topic, grade & subject"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setTitleManuallyEdited(true);
                    }}
                    className="h-12"
                    required
                  />
                </div>

                {/* Grade */}
                <div className="space-y-2">
                  <Label htmlFor="grade" className="text-base font-semibold">
                    Grade *
                  </Label>
                  <Select value={grade} onValueChange={setGrade} required>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grade-1">Grade 1</SelectItem>
                      <SelectItem value="grade-2">Grade 2</SelectItem>
                      <SelectItem value="grade-3">Grade 3</SelectItem>
                      <SelectItem value="grade-4">Grade 4</SelectItem>
                      <SelectItem value="grade-5">Grade 5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-base font-semibold">
                    Subject *
                  </Label>
                  <Select value={subject} onValueChange={setSubject} required>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Math</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="assignments">Assignments</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sub-Category (dependent on subject) */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Sub-Category</Label>
                  <Select
                    value={subCategory || "none"}
                    onValueChange={(v) => setSubCategory(v === "none" ? "" : v)}
                    disabled={!subject}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={!subject ? "Select subject first" : "Select sub-category (optional)"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {subject === "math" && (
                        <>
                          <SelectItem value="Addition">Addition</SelectItem>
                          <SelectItem value="Subtraction">Subtraction</SelectItem>
                          <SelectItem value="Multiplication">Multiplication</SelectItem>
                          <SelectItem value="Division">Division</SelectItem>
                          <SelectItem value="Place Value">Place Value</SelectItem>
                          <SelectItem value="Fractions">Fractions</SelectItem>
                          <SelectItem value="Shapes">Shapes</SelectItem>
                          <SelectItem value="Measurement">Measurement</SelectItem>
                          <SelectItem value="Time & Money">Time & Money</SelectItem>
                        </>
                      )}
                      {subject === "english" && (
                        <>
                          <SelectItem value="Reading">Reading</SelectItem>
                          <SelectItem value="Grammar">Grammar</SelectItem>
                          <SelectItem value="Vocabulary">Vocabulary</SelectItem>
                          <SelectItem value="Writing">Writing</SelectItem>
                          <SelectItem value="Phonics">Phonics</SelectItem>
                        </>
                      )}
                      {subject === "science" && (
                        <>
                          <SelectItem value="Plants & Animals">Plants & Animals</SelectItem>
                          <SelectItem value="My Body">My Body</SelectItem>
                          <SelectItem value="Family & Home">Family & Home</SelectItem>
                          <SelectItem value="Food & Water">Food & Water</SelectItem>
                          <SelectItem value="Environment">Environment</SelectItem>
                        </>
                      )}
                      {subject === "computer-science" && (
                        <>
                          <SelectItem value="Computer Basics">Computer Basics</SelectItem>
                          <SelectItem value="Keyboard & Mouse">Keyboard & Mouse</SelectItem>
                          <SelectItem value="Digital Safety">Digital Safety</SelectItem>
                        </>
                      )}
                      {subject === "assignments" && (
                        <>
                          <SelectItem value="English Assignment Packs">English Assignment Packs</SelectItem>
                          <SelectItem value="Math Assignment Packs">Math Assignment Packs</SelectItem>
                          <SelectItem value="EVS Assignment Packs">EVS Assignment Packs</SelectItem>
                          <SelectItem value="Mixed Subject Revision Sheets">Mixed Subject Revision Sheets</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Category (filtered by grade + subject) */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Category</Label>
                  <Select
                    value={categoryId}
                    onValueChange={(v) => { setCategoryId(v); setSubcategoryId(""); }}
                    disabled={!grade || !subject || loadingCategories}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={
                        !grade || !subject
                          ? "Select grade & subject first"
                          : loadingCategories
                          ? "Loading…"
                          : categories.length === 0
                          ? "No categories found"
                          : "Select a category"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Subcategory (filtered by category) */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Subcategory / Topic</Label>
                  <Select
                    value={subcategoryId}
                    onValueChange={setSubcategoryId}
                    disabled={!categoryId || loadingSubcategories}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={
                        !categoryId
                          ? "Select a category first"
                          : loadingSubcategories
                          ? "Loading…"
                          : subcategories.length === 0
                          ? "No subcategories found"
                          : "Select a subcategory"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {subcategories.map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Difficulty */}
                <div className="space-y-2">
                  <Label htmlFor="difficulty" className="text-base font-semibold">
                    Difficulty
                  </Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select difficulty (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base font-semibold">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this worksheet covers and who it's for..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                {/* PDF Upload */}
                <div className="space-y-2">
                  <Label htmlFor="pdf" className="text-base font-semibold">
                    PDF File *
                  </Label>
                  <div className="border-2 border-dashed rounded-lg border-border p-6 text-center hover:border-primary transition-colors">
                    <input
                      id="pdf"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                      className="hidden"
                      required
                    />
                    <label htmlFor="pdf" className="cursor-pointer">
                      <FileText className="w-12 h-12 mx-auto mb-3 text-primary" />
                      {pdfFile ? (
                        <div className="flex items-center justify-center gap-2 text-accent">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-medium">{pdfFile.name}</span>
                        </div>
                      ) : (
                        <div>
                          <p className="font-medium text-foreground mb-1">Click to upload PDF</p>
                          <p className="text-sm text-muted-foreground">or drag and drop</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full h-14 text-base" disabled={isUploading || !title || !grade || !subject || !pdfFile || !categoryId || !subcategoryId}>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2" />
                      Upload Worksheet
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminUpload;
