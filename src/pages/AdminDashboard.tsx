import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, LogOut, FileText, Filter, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImageUploader from "@/components/ImageUploader";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  isAdminAuthenticated,
  adminLogout,
  getAllWorksheets,
  createWorksheet,
  updateWorksheet,
  deleteWorksheet,
  WorksheetData,
  getAllCategories,
  updateCategory,
  CategoryData,
  setWorksheetImageOverride,
  getWorksheetImageOverride,
  seedInitialWorksheets,
} from "@/lib/worksheetStorage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [worksheets, setWorksheets] = useState<WorksheetData[]>([]);
  const [filteredWorksheets, setFilteredWorksheets] = useState<WorksheetData[]>([]);
  const [filterGrade, setFilterGrade] = useState<string>("all");
  const [filterSubject, setFilterSubject] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWorksheet, setEditingWorksheet] = useState<WorksheetData | null>(null);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [activeTab, setActiveTab] = useState<"worksheets" | "categories">("worksheets");
  const [categoryGradeFilter, setCategoryGradeFilter] = useState<string>("grade-1");
  const [categorySubjectFilter, setCategorySubjectFilter] = useState<string>("math");
  const [isUploading, setIsUploading] = useState(false);
  const [imageUpdateTrigger, setImageUpdateTrigger] = useState(0);
  const [selectedImageFile, setSelectedImageFile] = useState<{[key: string]: File | null}>({});
  const [savedWorksheetIds, setSavedWorksheetIds] = useState<Set<string>>(new Set());
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    grade: "",
    subject: "",
    pdfUrl: "",
    imageUrl: "",
  });

  // Reset all data and reseed
  const handleResetData = () => {
    if (window.confirm("⚠️ This will DELETE ALL worksheets and categories and create fresh sample data. Are you sure?")) {
      localStorage.removeItem('smartkids_worksheets');
      localStorage.removeItem('smartkids_categories');
      localStorage.removeItem('smartkids_worksheet_images');
      seedInitialWorksheets();
      loadWorksheets();
      loadCategories();
      toast({
        title: "Data Reset Complete",
        description: "Sample worksheets have been created. Check the filters now!",
      });
    }
  };

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/dashboard-secure-2025");
      return;
    }
    // Seed worksheets if none exist
    seedInitialWorksheets();
    loadWorksheets();
    loadCategories();
  }, [navigate]);

  useEffect(() => {
    filterWorksheets();
  }, [worksheets, filterGrade, filterSubject]);

  const loadWorksheets = () => {
    const data = getAllWorksheets();
    setWorksheets(data);
  };

  const loadCategories = () => {
    const data = getAllCategories();
    setCategories(data);
  };

  const getCurrentCategory = () => {
    return categories.find(c => c.grade === categoryGradeFilter && c.id === `${categoryGradeFilter}-${categorySubjectFilter}`);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `category-${categoryGradeFilter}-${categorySubjectFilter}-${Date.now()}.${fileExt}`;
      const filePath = `categories/${fileName}`;

      const { data, error } = await supabase.storage
        .from('worksheet-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('worksheet-images')
        .getPublicUrl(filePath);
      
      // Update the category
      const categoryId = `${categoryGradeFilter}-${categorySubjectFilter}`;
      updateCategory(categoryId, { imageUrl: publicUrl });
      
      loadCategories();
      
      toast({
        title: "Image Uploaded",
        description: `Successfully updated ${categorySubjectFilter} image for ${categoryGradeFilter}`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const getFilteredCategories = () => {
    return categories.filter((c) => c.grade === categoryGradeFilter);
  };

  const filterWorksheets = () => {
    let filtered = [...worksheets];
    
    if (filterGrade !== "all") {
      filtered = filtered.filter(w => w.grade === filterGrade);
    }
    
    if (filterSubject !== "all") {
      filtered = filtered.filter(w => w.subject === filterSubject);
    }
    
    setFilteredWorksheets(filtered);
  };

  const handleLogout = () => {
    adminLogout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/dashboard-secure-2025");
  };

  const handleWorksheetImageSelect = (e: React.ChangeEvent<HTMLInputElement>, worksheetId: string | number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Store the selected file temporarily
    setSelectedImageFile(prev => ({
      ...prev,
      [String(worksheetId)]: file
    }));
  };

  const handleSaveWorksheetImage = async (worksheetId: string | number) => {
    const file = selectedImageFile[String(worksheetId)];
    if (!file) {
      toast({
        title: "No Image Selected",
        description: "Please select an image first",
        variant: "destructive",
      });
      return;
    }

    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `worksheet-${worksheetId}-${Date.now()}.${fileExt}`;
      const filePath = `worksheets/${fileName}`;

      const { data, error } = await supabase.storage
        .from('worksheet-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('worksheet-images')
        .getPublicUrl(filePath);
      
      // Store the override
      setWorksheetImageOverride(String(worksheetId), publicUrl);
      
      // Mark as saved
      setSavedWorksheetIds(prev => new Set([...prev, String(worksheetId)]));
      
      toast({
        title: "✅ Image Saved Successfully!",
        description: "Image uploaded to cloud and will appear on the live site.",
        duration: 5000,
      });
      
      console.log(`✅ Image saved for worksheet ID: ${worksheetId}`);
      
      // Force re-render
      setImageUpdateTrigger(prev => prev + 1);
      
      // Clear saved indicator after 3 seconds
      setTimeout(() => {
        setSavedWorksheetIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(String(worksheetId));
          return newSet;
        });
      }, 3000);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getWorksheetsForFilters = () => {
    // Get ALL worksheets from storage
    const allWorksheets = getAllWorksheets();
    
    console.log('📊 Total worksheets:', allWorksheets.length);
    console.log('🔍 Filters - Grade:', categoryGradeFilter, 'Subject:', categorySubjectFilter);
    
    if (allWorksheets.length === 0) {
      console.log('❌ No worksheets in storage');
      return [];
    }
    
    // Normalize grade filter: "grade-1" -> "Grade 1", "grade-2" -> "Grade 2", etc.
    const gradeNum = categoryGradeFilter.replace('grade-', '');
    const normalizedGrade = `Grade ${gradeNum}`;
    
    console.log('🔄 Normalized grade:', normalizedGrade);
    
    // Filter by selected grade and subject
    const filtered = allWorksheets.filter(worksheet => {
      // Case-insensitive comparison for both grade and subject
      const worksheetGrade = worksheet.grade?.toString().toLowerCase().trim();
      const filterGrade = normalizedGrade.toLowerCase().trim();
      const gradeMatch = worksheetGrade === filterGrade;
      
      const worksheetSubject = worksheet.subject?.toString().toLowerCase().trim();
      const filterSubject = categorySubjectFilter.toLowerCase().trim();
      const subjectMatch = worksheetSubject === filterSubject;
      
      console.log(`Worksheet: "${worksheet.title}" | Grade: "${worksheet.grade}" (${gradeMatch}) | Subject: "${worksheet.subject}" (${subjectMatch})`);
      
      return gradeMatch && subjectMatch;
    });
    
    console.log(`✅ Found ${filtered.length} matching worksheets`);
    return filtered;
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      grade: "",
      subject: "",
      pdfUrl: "",
      imageUrl: "",
    });
    setEditingWorksheet(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingWorksheet) {
      // Update existing worksheet
      updateWorksheet(editingWorksheet.id, formData);
      toast({
        title: "Worksheet Updated",
        description: "The worksheet has been successfully updated",
      });
    } else {
      // Create new worksheet
      createWorksheet(formData);
      toast({
        title: "Worksheet Created",
        description: "New worksheet has been added successfully",
      });
    }

    loadWorksheets();
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (worksheet: WorksheetData) => {
    setEditingWorksheet(worksheet);
    setFormData({
      title: worksheet.title,
      description: worksheet.description,
      grade: worksheet.grade,
      subject: worksheet.subject,
      pdfUrl: worksheet.pdfUrl,
      imageUrl: worksheet.imageUrl,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteWorksheet(id);
      loadWorksheets();
      toast({
        title: "Worksheet Deleted",
        description: "The worksheet has been removed",
      });
    }
  };

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      resetForm();
    }
  };

  // Group worksheets by grade and subject
  const groupedWorksheets = filteredWorksheets.reduce((acc, worksheet) => {
    const key = `${worksheet.grade}-${worksheet.subject}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(worksheet);
    return acc;
  }, {} as Record<string, WorksheetData[]>);

  return (
    <div className="min-h-screen bg-secondary/5">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading font-bold text-foreground">
              Admin Dashboard
            </h1>
            <div className="flex gap-2">
              <Button onClick={handleResetData} variant="destructive" size="sm">
                🔄 Reset Data
              </Button>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          <Button
            variant={activeTab === "worksheets" ? "default" : "ghost"}
            onClick={() => setActiveTab("worksheets")}
            className="rounded-b-none"
          >
            <FileText className="mr-2 h-4 w-4" />
            Worksheets
          </Button>
          <Button
            variant={activeTab === "categories" ? "default" : "ghost"}
            onClick={() => setActiveTab("categories")}
            className="rounded-b-none"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Categories
          </Button>
        </div>

        {activeTab === "worksheets" && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Worksheets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">{worksheets.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Grades</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">5</p>
              <p className="text-sm text-muted-foreground">Grade 1-5</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">4</p>
              <p className="text-sm text-muted-foreground">Math, English, Science, CS</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add New Worksheet
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingWorksheet ? "Edit Worksheet" : "Add New Worksheet"}
                </DialogTitle>
                <DialogDescription>
                  Fill in the details below. Make sure all URLs are accessible.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Worksheet Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Addition Practice - Grade 1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the worksheet"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade *</Label>
                    <Select
                      value={formData.grade}
                      onValueChange={(value) => setFormData({ ...formData, grade: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
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

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      required
                    >
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pdfUrl">PDF URL *</Label>
                  <Input
                    id="pdfUrl"
                    type="url"
                    value={formData.pdfUrl}
                    onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                    placeholder="https://drive.google.com/file/d/..."
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Use Google Drive, Dropbox, or any direct PDF link
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Preview Image URL *</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Use an image hosting service like Imgur or Google Drive
                  </p>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingWorksheet ? "Update Worksheet" : "Create Worksheet"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDialogClose(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Filters */}
          <div className="flex gap-2 flex-1">
            <Select value={filterGrade} onValueChange={setFilterGrade}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="grade-1">Grade 1</SelectItem>
                <SelectItem value="grade-2">Grade 2</SelectItem>
                <SelectItem value="grade-3">Grade 3</SelectItem>
                <SelectItem value="grade-4">Grade 4</SelectItem>
                <SelectItem value="grade-5">Grade 5</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterSubject} onValueChange={setFilterSubject}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="math">Math</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="computer-science">Computer Science</SelectItem>
                <SelectItem value="assignments">Assignments</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Worksheets List */}
        <div className="space-y-8">
          {Object.keys(groupedWorksheets).length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Worksheets Found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Get started by adding your first worksheet
                </p>
              </CardContent>
            </Card>
          ) : (
            Object.entries(groupedWorksheets).map(([key, items]) => {
              const [grade, subject] = key.split("-");
              const gradeLabel = grade.charAt(0).toUpperCase() + grade.slice(1).replace("-", " ");
              const subjectLabel = subject.charAt(0).toUpperCase() + subject.slice(1).replace("-", " ");

              return (
                <div key={key}>
                  <h2 className="text-xl font-heading font-semibold mb-4">
                    {gradeLabel} - {subjectLabel} ({items.length})
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {items.map((worksheet) => (
                      <Card key={worksheet.id} className="hover:shadow-soft transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-2">{worksheet.title}</h3>
                              <p className="text-muted-foreground text-sm mb-4">
                                {worksheet.description}
                              </p>
                              <div className="flex gap-4 text-xs text-muted-foreground">
                                <span>Created: {new Date(worksheet.createdAt).toLocaleDateString()}</span>
                                <span>Updated: {new Date(worksheet.updatedAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(worksheet)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(worksheet.id, worksheet.title)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
          </>
        )}

        {activeTab === "categories" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Category Images</CardTitle>
                <CardDescription>
                  Update the main subject category images (e.g., the "Math" or "English" card images shown on grade pages).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Filters */}
                <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                  <h3 className="font-semibold text-lg mb-4">Select Category to Update</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category-grade-filter">Grade</Label>
                      <Select
                        value={categoryGradeFilter}
                        onValueChange={setCategoryGradeFilter}
                      >
                        <SelectTrigger id="category-grade-filter" className="bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="z-50">
                          <SelectItem value="grade-1">Grade 1</SelectItem>
                          <SelectItem value="grade-2">Grade 2</SelectItem>
                          <SelectItem value="grade-3">Grade 3</SelectItem>
                          <SelectItem value="grade-4">Grade 4</SelectItem>
                          <SelectItem value="grade-5">Grade 5</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category-subject-filter">Subject</Label>
                      <Select
                        value={categorySubjectFilter}
                        onValueChange={setCategorySubjectFilter}
                      >
                        <SelectTrigger id="category-subject-filter" className="bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="z-50">
                          <SelectItem value="math">Math</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="computer-science">Computer Science</SelectItem>
                          <SelectItem value="assignments">Assignments</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-3 pt-4 border-t">
                    <Label htmlFor="image-upload" className="text-sm font-medium">
                      Upload Subject Category Image (This updates the category card image)
                    </Label>
                    <div className="space-y-3 pt-4 border-t">
                    <Label htmlFor="image-upload" className="text-sm font-medium">
                      Upload Subject Category Image (This updates the category card image)
                    </Label>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                    <p className="text-xs text-muted-foreground">
                      Upload an image for {categorySubjectFilter} in {categoryGradeFilter}. Recommended size: 400x300px
                    </p>
                  </div>
                  </div>
                </div>

                {/* Current Category Preview */}
                {getCurrentCategory() && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Current Category</CardTitle>
                      <CardDescription>
                        {getCurrentCategory()?.name} - {categoryGradeFilter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video w-full max-w-md overflow-hidden rounded-lg bg-muted">
                        <img
                          src={getCurrentCategory()?.imageUrl}
                          alt={getCurrentCategory()?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        {getCurrentCategory()?.description}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Worksheet Image Management */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>📝 Manage Individual Worksheet Images</CardTitle>
                <CardDescription>
                  Upload custom images for each worksheet below. These images appear on worksheet cards and detail pages. Select grade and subject above, then upload images for each worksheet.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Worksheet Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" key={imageUpdateTrigger}>
                  {getWorksheetsForFilters().map((worksheet) => (
                    <Card key={worksheet.id} className="overflow-hidden">
                       <CardContent className="p-4">
                         <h4 className="font-medium text-base mb-3">{worksheet.title}</h4>
                         
                         <ImageUploader
                           currentImageUrl={getWorksheetImageOverride(String(worksheet.id)) || worksheet.imageUrl}
                           onImageUpload={(file) => handleWorksheetImageSelect({ target: { files: [file] } } as any, worksheet.id)}
                           label="Worksheet Image"
                           worksheetId={String(worksheet.id)}
                         />
                         
                         <div className="flex gap-2 mt-4">
                           <Button
                             size="sm"
                             className="flex-1"
                             onClick={() => handleSaveWorksheetImage(worksheet.id)}
                             disabled={!selectedImageFile[String(worksheet.id)]}
                           >
                             {savedWorksheetIds.has(String(worksheet.id)) ? (
                               <>✅ Saved!</>
                             ) : (
                               <>💾 Save Image</>
                             )}
                           </Button>
                           
                           <Button
                             size="sm"
                             variant="outline"
                             className="flex-1"
                             onClick={() => {
                               const gradeSlug = categoryGradeFilter;
                               const subjectSlug = categorySubjectFilter;
                               window.open(`/category/${gradeSlug}/${subjectSlug}`, '_blank');
                             }}
                           >
                             View Live →
                           </Button>
                         </div>
                       </CardContent>
                    </Card>
                  ))}
                </div>
                {getWorksheetsForFilters().length === 0 && (
                  <div className="text-center py-12 bg-yellow-50 border-2 border-dashed border-yellow-300 rounded-lg">
                    <p className="text-lg font-semibold mb-2">⚠️ No worksheets found</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Selected: {categoryGradeFilter} / {categorySubjectFilter}
                    </p>
                    <Button onClick={handleResetData} variant="default" size="sm">
                      🔄 Click here to Reset & Create Sample Data
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
