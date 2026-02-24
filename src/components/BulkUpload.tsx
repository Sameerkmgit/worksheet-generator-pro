import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, FileText, X, Loader2, Check, AlertCircle, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  createWorksheet,
  getWorksheetCategoriesByGradeAndSubject,
  getSubcategoriesByCategoryId,
  WorksheetCategoryData,
  SubcategoryData,
} from "@/lib/worksheetStorage";

type FileStatus = "pending" | "uploading" | "done" | "failed";

interface QueueItem {
  id: string;
  file: File;
  title: string;
  status: FileStatus;
  error?: string;
}

const normalizeSubject = (subject: string): string => {
  const subjectMap: Record<string, string> = {
    math: "Math",
    english: "English",
    science: "Science",
    "computer-science": "Computer Science",
    assignments: "Assignments",
  };
  return subjectMap[subject] || subject;
};

export default function BulkUpload() {
  const { toast } = useToast();

  // Shared settings
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [categoryId, setCategoryId] = useState("none");
  const [subcategoryId, setSubcategoryId] = useState("none");

  // Dropdown data
  const [categoryOptions, setCategoryOptions] = useState<WorksheetCategoryData[]>([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState<SubcategoryData[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [isSubcategoriesLoading, setIsSubcategoriesLoading] = useState(false);

  // File queue
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch categories when grade+subject change
  useEffect(() => {
    if (!grade || !subject) {
      setCategoryOptions([]);
      setCategoryId("none");
      setSubcategoryId("none");
      return;
    }
    setCategoryId("none");
    setSubcategoryId("none");
    setIsCategoriesLoading(true);
    getWorksheetCategoriesByGradeAndSubject(grade, normalizeSubject(subject))
      .then(setCategoryOptions)
      .catch(() => setCategoryOptions([]))
      .finally(() => setIsCategoriesLoading(false));
  }, [grade, subject]);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (!categoryId || categoryId === "none") {
      setSubcategoryOptions([]);
      setSubcategoryId("none");
      return;
    }
    setSubcategoryId("none");
    setIsSubcategoriesLoading(true);
    getSubcategoriesByCategoryId(categoryId)
      .then(setSubcategoryOptions)
      .catch(() => setSubcategoryOptions([]))
      .finally(() => setIsSubcategoriesLoading(false));
  }, [categoryId]);

  const titleFromFilename = (name: string) =>
    name.replace(/\.pdf$/i, "").replace(/[-_]/g, " ").replace(/\s+/g, " ").trim();

  const addFiles = useCallback((files: FileList | File[]) => {
    const pdfs = Array.from(files).filter((f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"));
    if (pdfs.length === 0) return;
    const newItems: QueueItem[] = pdfs.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      file,
      title: titleFromFilename(file.name),
      status: "pending" as FileStatus,
    }));
    setQueue((prev) => [...prev, ...newItems]);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const updateTitle = (id: string, title: string) =>
    setQueue((prev) => prev.map((q) => (q.id === id ? { ...q, title } : q)));

  const removeItem = (id: string) => setQueue((prev) => prev.filter((q) => q.id !== id));

  const clearAll = () => setQueue([]);

  const canUpload =
    queue.length > 0 &&
    grade !== "" &&
    subject !== "" &&
    queue.filter((q) => q.status === "pending" || q.status === "failed").every((q) => q.title.trim() !== "") &&
    !isUploading;

  const handleBulkUpload = async () => {
    // Validate all titles
    const toUpload = queue.filter((q) => q.status === "pending" || q.status === "failed");
    if (toUpload.some((q) => !q.title.trim())) {
      toast({ title: "Missing Titles", description: "All files need a title before uploading.", variant: "destructive" });
      return;
    }

    setIsUploading(true);
    setUploadedCount(0);
    let successCount = 0;
    let failCount = 0;

    for (const item of toUpload) {
      // Mark uploading
      setQueue((prev) => prev.map((q) => (q.id === item.id ? { ...q, status: "uploading" as FileStatus, error: undefined } : q)));

      try {
        // Upload PDF
        const safeName = item.file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const filePath = `grade-${grade}/${subject}/${Date.now()}-${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from("worksheet-pdfs")
          .upload(filePath, item.file, { contentType: "application/pdf", upsert: false });

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("worksheet-pdfs").getPublicUrl(filePath);

        // Insert worksheet
        const result = await createWorksheet({
          title: item.title.trim(),
          grade,
          subject,
          pdfUrl: publicUrl,
          categoryId: categoryId === "none" ? null : categoryId,
          subcategoryId: subcategoryId === "none" ? null : subcategoryId,
        } as any);

        if (!result) throw new Error("Insert returned no data");

        // Mark done
        setQueue((prev) => prev.map((q) => (q.id === item.id ? { ...q, status: "done" as FileStatus } : q)));
        successCount++;
      } catch (err: any) {
        console.error(`Bulk upload failed for "${item.title}":`, err);
        setQueue((prev) =>
          prev.map((q) => (q.id === item.id ? { ...q, status: "failed" as FileStatus, error: err.message || "Unknown error" } : q))
        );
        failCount++;
      }
      setUploadedCount((c) => c + 1);
    }

    setIsUploading(false);

    // Remove successful items
    setTimeout(() => {
      setQueue((prev) => prev.filter((q) => q.status !== "done"));
    }, 1500);

    toast({
      title: failCount === 0 ? "✅ Bulk Upload Complete" : "⚠️ Bulk Upload Finished",
      description: `${successCount} uploaded, ${failCount} failed`,
      variant: failCount > 0 ? "destructive" : "default",
      duration: 8000,
    });
  };

  const retryFailed = () => {
    setQueue((prev) => prev.map((q) => (q.status === "failed" ? { ...q, status: "pending" as FileStatus, error: undefined } : q)));
  };

  const pendingOrFailed = queue.filter((q) => q.status === "pending" || q.status === "failed");
  const failedItems = queue.filter((q) => q.status === "failed");
  const totalToUpload = pendingOrFailed.length;

  return (
    <div className="space-y-6">
      {/* STEP 1 — Shared Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Step 1 — Shared Settings</CardTitle>
          <CardDescription>These apply to all uploaded files.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Grade */}
            <div className="space-y-2">
              <Label>Grade *</Label>
              <Select value={grade} onValueChange={setGrade} disabled={isUploading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Grade 1</SelectItem>
                  <SelectItem value="2">Grade 2</SelectItem>
                  <SelectItem value="3">Grade 3</SelectItem>
                  <SelectItem value="4">Grade 4</SelectItem>
                  <SelectItem value="5">Grade 5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label>Subject *</Label>
              <Select value={subject} onValueChange={setSubject} disabled={isUploading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Math</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="assignments">Assignments</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={categoryId}
                onValueChange={setCategoryId}
                disabled={!grade || !subject || isCategoriesLoading || isUploading}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      isCategoriesLoading ? "Loading…" : !grade || !subject ? "Select grade & subject" : "No category"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Category</SelectItem>
                  {categoryOptions.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Subcategory */}
            <div className="space-y-2">
              <Label>Subcategory</Label>
              <Select
                value={subcategoryId}
                onValueChange={setSubcategoryId}
                disabled={!categoryId || categoryId === "none" || isSubcategoriesLoading || isUploading}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      isSubcategoriesLoading
                        ? "Loading…"
                        : !categoryId || categoryId === "none"
                        ? "Select a category first"
                        : "No subcategory"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Subcategory</SelectItem>
                  {subcategoryOptions.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* STEP 2 — Drop Zone + Queue */}
      <Card>
        <CardHeader>
          <CardTitle>Step 2 — Select PDF Files</CardTitle>
          <CardDescription>Drop multiple PDF files or click to browse. You can edit each title before uploading.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Drop zone */}
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => !isUploading && inputRef.current?.click()}
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors border-border hover:border-primary/60"
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files) addFiles(e.target.files);
                e.target.value = "";
              }}
              disabled={isUploading}
            />
            <Upload className="w-10 h-10 mx-auto mb-2 text-muted-foreground" />
            <p className="font-medium text-sm text-foreground">Drag &amp; drop PDFs here or click to browse</p>
            <p className="text-xs text-muted-foreground mt-1">Only .pdf files accepted · Multiple files allowed</p>
          </div>

          {/* Queue */}
          {queue.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{queue.length} file(s) in queue</p>
                <Button variant="ghost" size="sm" onClick={clearAll} disabled={isUploading}>
                  <Trash2 className="h-4 w-4 mr-1" /> Clear All
                </Button>
              </div>

              <div className="divide-y divide-border rounded-lg border">
                {queue.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 px-4 py-3">
                    {/* Status icon */}
                    <div className="shrink-0">
                      {item.status === "pending" && <FileText className="h-5 w-5 text-muted-foreground" />}
                      {item.status === "uploading" && <Loader2 className="h-5 w-5 text-primary animate-spin" />}
                      {item.status === "done" && <Check className="h-5 w-5 text-green-600" />}
                      {item.status === "failed" && <AlertCircle className="h-5 w-5 text-destructive" />}
                    </div>

                    {/* Filename */}
                    <p className="text-xs text-muted-foreground truncate w-36 shrink-0" title={item.file.name}>
                      {item.file.name}
                    </p>

                    {/* Editable title */}
                    <Input
                      value={item.title}
                      onChange={(e) => updateTitle(item.id, e.target.value)}
                      disabled={item.status === "uploading" || item.status === "done"}
                      className="flex-1 h-8 text-sm"
                      placeholder="Worksheet title"
                    />

                    {/* Error message */}
                    {item.status === "failed" && item.error && (
                      <p className="text-xs text-destructive max-w-[200px] truncate" title={item.error}>
                        {item.error}
                      </p>
                    )}

                    {/* Remove */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 h-8 w-8"
                      onClick={() => removeItem(item.id)}
                      disabled={item.status === "uploading"}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* STEP 3 — Upload */}
      {queue.length > 0 && (
        <Card>
          <CardContent className="py-4 flex flex-wrap items-center gap-4">
            <Button onClick={handleBulkUpload} disabled={!canUpload} className="min-w-[200px]">
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploaded {uploadedCount} of {totalToUpload}
                </>
              ) : (
                `Upload All (${totalToUpload} worksheet${totalToUpload !== 1 ? "s" : ""})`
              )}
            </Button>

            {failedItems.length > 0 && !isUploading && (
              <Button variant="outline" onClick={retryFailed}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry Failed ({failedItems.length})
              </Button>
            )}

            {isUploading && (
              <p className="text-sm text-muted-foreground">
                Uploading {uploadedCount} of {totalToUpload}…
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
