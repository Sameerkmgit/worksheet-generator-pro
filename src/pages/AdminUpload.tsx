import { useState } from "react";
import { Upload, FileText, Image, CheckCircle, Loader2 } from "lucide-react";
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

const AdminUpload = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !grade || !subject || !pdfFile) {
      toast({
        title: "Missing Information",
        description: "Please fill in title, grade, subject, and PDF file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Upload PDF to Supabase Storage
      const pdfFileName = `${Date.now()}-${pdfFile.name}`;
      const { data: pdfData, error: pdfError } = await supabase.storage
        .from('worksheet-images')
        .upload(pdfFileName, pdfFile, {
          contentType: 'application/pdf',
          upsert: false
        });

      if (pdfError) throw pdfError;

      const { data: { publicUrl: pdfUrl } } = supabase.storage
        .from('worksheet-images')
        .getPublicUrl(pdfFileName);

      // Convert grade from "grade-1" to "Grade 1"
      const gradeTitle = grade.split('-').map((word, index) => 
        index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
      ).join(' ');

      // Insert worksheet into database
      const { error: insertError } = await supabase
        .from('worksheets')
        .insert({
          id: `worksheet-${Date.now()}`,
          title,
          description: description || null,
          grade: gradeTitle,
          subject,
          pdf_url: pdfUrl
        });

      if (insertError) throw insertError;

      toast({
        title: "Success!",
        description: "Worksheet added successfully.",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setGrade("");
      setSubject("");
      setPdfFile(null);
      
      // Reset file inputs
      const pdfInput = document.getElementById('pdf') as HTMLInputElement;
      if (pdfInput) pdfInput.value = '';

    } catch (error: any) {
      console.error('Upload error:', error);
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
                  placeholder="e.g., Addition Basics for Grade 1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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

              <Button type="submit" size="lg" className="w-full h-14 text-base" disabled={isUploading}>
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
