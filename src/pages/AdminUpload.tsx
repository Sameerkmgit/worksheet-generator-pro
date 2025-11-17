import { useState } from "react";
import { Upload, FileText, Image, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const AdminUpload = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !category || !pdfFile || !previewFile) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and upload both files.",
        variant: "destructive",
      });
      return;
    }

    // In production, this would upload to your backend/storage
    toast({
      title: "Success!",
      description: "Worksheet uploaded successfully.",
    });

    // Reset form
    setTitle("");
    setDescription("");
    setCategory("");
    setPdfFile(null);
    setPreviewFile(null);
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-muted/5">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-heading">
            Upload New Worksheet
          </h1>
          <p className="text-xl text-muted-foreground">
            Add a new worksheet to the collection
          </p>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl font-heading">Worksheet Details</CardTitle>
            <CardDescription>
              Fill in the information and upload the files for your worksheet
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
                  placeholder="e.g., Addition Basics for Class 1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-base font-semibold">
                  Category *
                </Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Math</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="word-search">Word Search</SelectItem>
                    <SelectItem value="coloring">Coloring Pages</SelectItem>
                    <SelectItem value="class-1">Class 1</SelectItem>
                    <SelectItem value="class-2">Class 2</SelectItem>
                    <SelectItem value="class-3">Class 3</SelectItem>
                    <SelectItem value="class-4">Class 4</SelectItem>
                    <SelectItem value="class-5">Class 5</SelectItem>
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
                <div className="border-2 border-dashed rounded-2xl border-border p-6 text-center hover:border-primary transition-colors">
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

              {/* Preview Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="preview" className="text-base font-semibold">
                  Preview Image (JPG) *
                </Label>
                <div className="border-2 border-dashed rounded-2xl border-border p-6 text-center hover:border-primary transition-colors">
                  <input
                    id="preview"
                    type="file"
                    accept=".jpg,.jpeg"
                    onChange={(e) => setPreviewFile(e.target.files?.[0] || null)}
                    className="hidden"
                    required
                  />
                  <label htmlFor="preview" className="cursor-pointer">
                    <Image className="w-12 h-12 mx-auto mb-3 text-primary" />
                    {previewFile ? (
                      <div className="flex items-center justify-center gap-2 text-accent">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">{previewFile.name}</span>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium text-foreground mb-1">Click to upload JPG</p>
                        <p className="text-sm text-muted-foreground">or drag and drop</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full h-14 text-base">
                <Upload className="mr-2" />
                Upload Worksheet
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminUpload;
