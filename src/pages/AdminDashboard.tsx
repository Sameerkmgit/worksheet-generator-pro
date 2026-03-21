import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, LogOut, FileText, Filter, Image as ImageIcon, FolderPlus, Loader2, UploadCloud, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImageUploader from "@/components/ImageUploader";
import PdfUploadZone from "@/components/PdfUploadZone";
import BulkUpload from "@/components/BulkUpload";
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
  getCategoryByGradeAndSubject,
  CategoryData,
  setWorksheetImageOverride,
  getWorksheetImageOverride,
  getAllWorksheetImageOverrides,
  
  getAllWorksheetCategories,
  getWorksheetCategoriesByGradeAndSubject,
  createWorksheetCategory,
  deleteWorksheetCategory,
  WorksheetCategoryData,
  SubcategoryData,
  getSubcategoriesByCategoryId,
} from "@/lib/worksheetStorage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [worksheets, setWorksheets] = useState<WorksheetData[]>([]);
  const [filteredWorksheets, setFilteredWorksheets] = useState<WorksheetData[]>([]);
  const [filterGrade, setFilterGrade] = useState<string>("all");
  const [filterSubject, setFilterSubject] = useState<string>("all");
  const [filterSubCategory, setFilterSubCategory] = useState<string>("all");
  const [filterSubcategoryOptions, setFilterSubcategoryOptions] = useState<SubcategoryData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWorksheet, setEditingWorksheet] = useState<WorksheetData | null>(null);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [worksheetCategories, setWorksheetCategories] = useState<WorksheetCategoryData[]>([]);
  const [activeTab, setActiveTab] = useState<"worksheets" | "bulk-upload" | "categories" | "worksheet-categories">("worksheets");
  const [categoryGradeFilter, setCategoryGradeFilter] = useState<string>("grade-1");
  const [categorySubjectFilter, setCategorySubjectFilter] = useState<string>("math");
  const [isUploading, setIsUploading] = useState(false);
  const [imageUpdateTrigger, setImageUpdateTrigger] = useState(0);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUploading, setPdfUploading] = useState(false);
  const [pdfUploadProgress, setPdfUploadProgress] = useState(0);
  const [selectedImageFile, setSelectedImageFile] = useState<{[key: string]: File | null}>({});
  const [savedWorksheetIds, setSavedWorksheetIds] = useState<Set<string>>(new Set());
  const [categoryFilteredWorksheets, setCategoryFilteredWorksheets] = useState<WorksheetData[]>([]);
  const [worksheetImageOverrides, setWorksheetImageOverrides] = useState<Record<string, string>>({});
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [newCategoryData, setNewCategoryData] = useState({
    title: "",
    description: "",
    grade: "",
    subject: "",
  });
  // Subcategory image upload state
  const [subcatGradeFilter, setSubcatGradeFilter] = useState<string>("1");
  const [subcatSubjectFilter, setSubcatSubjectFilter] = useState<string>("Math");
  const [subcatCategories, setSubcatCategories] = useState<WorksheetCategoryData[]>([]);
  const [subcatCategoryFilter, setSubcatCategoryFilter] = useState<string>("all");
  const [subcatList, setSubcatList] = useState<SubcategoryData[]>([]);
  const [subcatNameFilter, setSubcatNameFilter] = useState<string>("all");
  const [subcatImageUploading, setSubcatImageUploading] = useState<string | null>(null);
  // Pagination state for worksheets tab
  const [worksheetPage, setWorksheetPage] = useState(1);
  const [worksheetSearch, setWorksheetSearch] = useState("");
  const WORKSHEETS_PER_PAGE = 50;
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    grade: "",
    subject: "",
    categoryId: "none",
    subcategoryId: "none",
    difficulty: "",
    subCategory: "",
    pdfUrl: "",
    content: "",
  });
  const [categoryOptions, setCategoryOptions] = useState<WorksheetCategoryData[]>([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState<SubcategoryData[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [isSubcategoriesLoading, setIsSubcategoriesLoading] = useState(false);

  // Helper function to normalize subject for DB queries
  const normalizeSubject = (subject: string): string => {
    const subjectMap: Record<string, string> = {
      'math': 'Math',
      'english': 'English',
      'science': 'Science',
      'computer-science': 'Computer Science',
      'assignments': 'Assignments'
    };
    return subjectMap[subject] || subject;
  };


  useEffect(() => {
    const checkAuth = async () => {
      const isAdmin = await isAdminAuthenticated();
      if (!isAdmin) {
        navigate("/dashboard-secure-2025");
        return;
      }
      loadWorksheets();
      loadCategories();
      loadWorksheetCategories();
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    filterWorksheets();
    setWorksheetPage(1);
  }, [worksheets, filterGrade, filterSubject, filterSubCategory]);

  // Load subcategory options for the filter dropdown from DB
  useEffect(() => {
    const loadFilterSubcategories = async () => {
      if (filterGrade === "all" || filterSubject === "all") {
        setFilterSubcategoryOptions([]);
        return;
      }
      try {
        const normalizedSubject = normalizeSubject(filterSubject);
        const cats = await getWorksheetCategoriesByGradeAndSubject(filterGrade, normalizedSubject);
        if (cats.length > 0) {
          const subs = await getSubcategoriesByCategoryId(cats[0].id);
          setFilterSubcategoryOptions(subs);
        } else {
          setFilterSubcategoryOptions([]);
        }
      } catch {
        setFilterSubcategoryOptions([]);
      }
    };
    loadFilterSubcategories();
  }, [filterGrade, filterSubject]);
  // Load category-filtered worksheets
  useEffect(() => {
    const loadCategoryWorksheets = async () => {
      const filtered = await getWorksheetsForFilters();
      setCategoryFilteredWorksheets(filtered);
    };
    loadCategoryWorksheets();
  }, [categoryGradeFilter, categorySubjectFilter, worksheets]);

  // Load image overrides
  useEffect(() => {
    const loadImageOverrides = async () => {
      const overrides = await getAllWorksheetImageOverrides();
      setWorksheetImageOverrides(overrides);
    };
    loadImageOverrides();
  }, [imageUpdateTrigger]);

  // Fetch categories when grade or subject changes
  useEffect(() => {
    const fetchCategories = async () => {
      if (!formData.grade || !formData.subject) {
        setCategoryOptions([]);
        return;
      }

      setIsCategoriesLoading(true);
      try {
        const normalizedSubject = normalizeSubject(formData.subject);
        console.log(`Fetching categories for grade="${formData.grade}", subject="${normalizedSubject}"`);
        
        const categories = await getWorksheetCategoriesByGradeAndSubject(
          formData.grade,
          normalizedSubject
        );
        
        console.log(`Fetched ${categories.length} categories:`, categories.map(c => c.title));
        setCategoryOptions(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategoryOptions([]);
        toast({
          title: "Error",
          description: "Failed to load categories",
          variant: "destructive",
        });
      } finally {
        setIsCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, [formData.grade, formData.subject]);

  // Fetch subcategories when categoryId changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!formData.categoryId || formData.categoryId === "none") {
        setSubcategoryOptions([]);
        return;
      }
      setIsSubcategoriesLoading(true);
      try {
        const subs = await getSubcategoriesByCategoryId(formData.categoryId);
        setSubcategoryOptions(subs);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setSubcategoryOptions([]);
      } finally {
        setIsSubcategoriesLoading(false);
      }
    };
    fetchSubcategories();
  }, [formData.categoryId]);

  const loadWorksheets = async () => {
    const data = await getAllWorksheets();
    setWorksheets(data);
  };

  const loadCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  const loadWorksheetCategories = async () => {
    const data = await getAllWorksheetCategories();
    setWorksheetCategories(data);
  };

  const loadImageOverrides = async () => {
    const overrides = await getAllWorksheetImageOverrides();
    setWorksheetImageOverrides(overrides);
  };

  const getCurrentCategory = () => {
    const gradeNum = categoryGradeFilter.replace('grade-', '');
    const normalizedSubject = categorySubjectFilter.replace(/-/g, ' ').toLowerCase();

    return categories.find((c) => {
      const cGrade = String(c.grade).replace('grade-', '').trim();
      const cSubject = String(c.subject || '').toLowerCase().trim();
      return cGrade === gradeNum && cSubject === normalizedSubject;
    });
  };

  const validateImageFile = (file: File): { valid: boolean; error?: string } => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 20 * 1024 * 1024; // 20MB
    
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Only JPEG, PNG, and WebP images allowed' };
    }
    
    if (file.size > maxSize) {
      return { valid: false, error: 'Image must be smaller than 20MB' };
    }
    
    return { valid: true };
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast({
        title: "Invalid File",
        description: validation.error,
        variant: "destructive",
      });
      e.target.value = ''; // Clear the input
      return;
    }

    setIsUploading(true);
    
    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `category-${categoryGradeFilter}-${categorySubjectFilter}-${Date.now()}.${fileExt}`;
      const filePath = `categories/${fileName}`;

      console.log('🚀 Starting upload:', fileName);

      const { data, error } = await supabase.storage
        .from('worksheet-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.error('❌ Upload error:', error);
        throw error;
      }

      console.log('✅ Upload successful:', data);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('worksheet-images')
        .getPublicUrl(filePath);
      
      console.log('🔗 Public URL:', publicUrl);
      
      // Find the actual category by grade and subject
      const category = await getCategoryByGradeAndSubject(categoryGradeFilter, categorySubjectFilter);
      if (!category) {
        throw new Error(`Category not found for ${categoryGradeFilter} / ${categorySubjectFilter}`);
      }

      await updateCategory(category.id, { imageUrl: publicUrl });
      console.log('✅ Category updated with image:', category.id);
      
      // Force reload categories
      loadCategories();
      
      // Clear the file input
      e.target.value = '';
      
      toast({
        title: "✅ Category Image Updated!",
        description: `Successfully updated ${categorySubjectFilter} image for ${categoryGradeFilter}. Refresh the page to see changes.`,
        duration: 5000,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "❌ Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload image. Please try again.",
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
      filtered = filtered.filter(w => w.subject.toLowerCase() === filterSubject.toLowerCase());
    }

    if (filterSubCategory !== "all") {
      // Filter by subcategoryId (UUID) instead of text sub_category
      filtered = filtered.filter(w => w.subcategoryId === filterSubCategory);
    }
    
    setFilteredWorksheets(filtered);
  };

  const getSubCategoryOptionsForSubject = (subject: string): string[] => {
    const map: Record<string, string[]> = {
      math: ["Addition", "Subtraction", "Multiplication", "Division", "Place Value", "Fractions", "Shapes", "Measurement", "Time & Money"],
      english: ["Reading", "Grammar", "Vocabulary", "Writing", "Phonics"],
      science: ["Plants & Animals", "My Body", "Family & Home", "Food & Water", "Environment"],
      "computer-science": ["Computer Basics", "Keyboard & Mouse", "Digital Safety"],
      assignments: ["English Assignment Packs", "Math Assignment Packs", "EVS Assignment Packs", "Mixed Subject Revision Sheets"],
    };
    if (subject === "all" || !map[subject]) {
      return [...new Set(Object.values(map).flat())];
    }
    return map[subject];
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

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast({
        title: "Invalid File",
        description: validation.error,
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
      
      // Store the override - AWAIT THIS!
      await setWorksheetImageOverride(String(worksheetId), publicUrl);
      
      // Mark as saved
      setSavedWorksheetIds(prev => new Set([...prev, String(worksheetId)]));
      
      toast({
        title: "✅ Image Saved Successfully!",
        description: `"${file.name}" is now in cloud storage and will appear on the live site within a few seconds. No credits were used.`,
        duration: 8000,
        className: "bg-green-50 border-green-500",
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
    } catch (error: any) {
      console.error('❌ Error saving worksheet image:', error);
      console.error('Error details:', {
        worksheetId,
        fileName: file.name,
        fileSize: file.size,
        errorMessage: error.message,
        errorStack: error.stack
      });
      toast({
        title: "❌ Upload Failed",
        description: `Error: ${error.message || "Failed to save image"}. Check browser console for details.`,
        variant: "destructive",
        duration: 10000,
      });
    }
  };

  const getWorksheetsForFilters = async () => {
    // Get ALL worksheets from storage
    const allWorksheets = await getAllWorksheets();
    
    console.log('📊 Total worksheets:', allWorksheets.length);
    console.log('🔍 Filters - Grade:', categoryGradeFilter, 'Subject:', categorySubjectFilter);
    
    if (allWorksheets.length === 0) {
      console.log('❌ No worksheets in storage');
      return [];
    }
    
    // Normalize grade filter: "grade-1" -> "1"
    const gradeNum = categoryGradeFilter.replace('grade-', '');
    
    console.log('🔄 Normalized grade:', gradeNum);
    
    // Filter by selected grade and subject
    const filtered = allWorksheets.filter(worksheet => {
      const worksheetGrade = worksheet.grade?.toString().trim();
      const gradeMatch = worksheetGrade === gradeNum;
      
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
      grade: "",
      subject: "",
      categoryId: "none",
      subcategoryId: "none",
      difficulty: "",
      subCategory: "",
      pdfUrl: "",
      content: "",
    });
    setEditingWorksheet(null);
    setPdfFile(null);
    setPdfUploadProgress(0);
    setSubcategoryOptions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // For new worksheets, a PDF file is required; for edits, existing URL is fine
    if (!editingWorksheet && !pdfFile) {
      toast({ title: "Missing PDF", description: "Please upload a PDF file.", variant: "destructive" });
      return;
    }

    let finalPdfUrl = formData.pdfUrl;

    // Upload the PDF if a new file was selected
    if (pdfFile) {
      setPdfUploading(true);
      setPdfUploadProgress(10);
      try {
        const gradeNumber = formData.grade;
        const safeName = pdfFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const filePath = `grade-${gradeNumber}/${formData.subject}/${Date.now()}-${safeName}`;

        setPdfUploadProgress(30);
        const { error: uploadError } = await supabase.storage
          .from("worksheet-pdfs")
          .upload(filePath, pdfFile, { contentType: "application/pdf", upsert: false });

        if (uploadError) throw uploadError;

        setPdfUploadProgress(80);
        const { data: { publicUrl } } = supabase.storage
          .from("worksheet-pdfs")
          .getPublicUrl(filePath);

        finalPdfUrl = publicUrl;
        setPdfUploadProgress(100);
      } catch (err: any) {
        console.error("PDF upload error:", err);
        toast({ title: "Upload Failed", description: err.message || "Failed to upload PDF.", variant: "destructive" });
        setPdfUploading(false);
        setPdfUploadProgress(0);
        return;
      } finally {
        setPdfUploading(false);
      }
    }

    // Prepare data, treating "none" as empty categoryId/subcategoryId
    const submitData = {
      ...formData,
      pdfUrl: finalPdfUrl,
      difficulty: formData.difficulty && formData.difficulty !== "none" ? formData.difficulty : undefined,
      subCategory: formData.subCategory && formData.subCategory !== "none" ? formData.subCategory : null,
      categoryId: formData.categoryId === "none" ? null : formData.categoryId || null,
      subcategoryId: formData.subcategoryId === "none" ? null : formData.subcategoryId || null,
    };

    try {
      if (editingWorksheet) {
        const result = await updateWorksheet(editingWorksheet.id, submitData);
        if (!result) {
          toast({ title: "❌ Update Failed", description: "Worksheet could not be updated. Check the console for errors.", variant: "destructive", duration: 10000 });
          return;
        }
        toast({ title: "Worksheet Updated", description: "The worksheet has been successfully updated" });
      } else {
        const result = await createWorksheet(submitData);
        if (!result) {
          toast({ title: "❌ Save Failed", description: "Worksheet could not be saved. Check the console for errors.", variant: "destructive", duration: 10000 });
          return;
        }
        toast({
          title: "✅ Worksheet Created!",
          description: `"${formData.title}" has been added. Go to Categories tab to upload its image.`,
          duration: 6000,
        });
      }
    } catch (err: any) {
      console.error("Worksheet save error:", err);
      toast({
        title: "❌ Failed to Save Worksheet",
        description: err.message || "An unknown error occurred. Check console for details.",
        variant: "destructive",
        duration: 10000,
      });
      return;
    }

    await loadWorksheets();
    const filtered = await getWorksheetsForFilters();
    setCategoryFilteredWorksheets(filtered);
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (worksheet: WorksheetData) => {
    setEditingWorksheet(worksheet);
    setFormData({
      title: worksheet.title,
      grade: worksheet.grade,
      subject: worksheet.subject,
      categoryId: worksheet.categoryId || "none",
      subcategoryId: (worksheet as any).subcategoryId || "none",
      difficulty: worksheet.difficulty || "",
      subCategory: (worksheet as any).subCategory || "",
      pdfUrl: worksheet.pdfUrl,
      content: worksheet.content || "",
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

  const handleCreateCategory = async () => {
    if (!newCategoryData.title || !newCategoryData.grade || !newCategoryData.subject) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Normalize the subject to proper case for consistency
    const normalizedCategoryData = {
      ...newCategoryData,
      subject: normalizeSubject(newCategoryData.subject),
    };

    const result = await createWorksheetCategory(normalizedCategoryData);
    if (result.data) {
      toast({
        title: "Success",
        description: "Category created successfully",
      });
      loadWorksheetCategories();
      setIsCategoryDialogOpen(false);
      setNewCategoryData({
        title: "",
        description: "",
        grade: "",
        subject: "",
      });
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to create category",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = async (id: string, title: string) => {
    if (window.confirm(`Delete category "${title}"? Worksheets will not be deleted.`)) {
      const success = await deleteWorksheetCategory(id);
      if (success) {
        toast({ title: "Success", description: "Category deleted successfully" });
        loadWorksheetCategories();
      } else {
        toast({ title: "Error", description: "Failed to delete category", variant: "destructive" });
      }
    }
  };

  // Load subcategories for the subcategory image manager
  useEffect(() => {
    const loadSubcatCategories = async () => {
      const cats = await getWorksheetCategoriesByGradeAndSubject(subcatGradeFilter, subcatSubjectFilter);
      setSubcatCategories(cats);
      setSubcatCategoryFilter("all");
      setSubcatNameFilter("all");
    };
    if (subcatGradeFilter && subcatSubjectFilter) {
      loadSubcatCategories();
    }
  }, [subcatGradeFilter, subcatSubjectFilter]);

  useEffect(() => {
    const loadSubcats = async () => {
      if (subcatCategoryFilter === "all") {
        const allSubs: SubcategoryData[] = [];
        for (const cat of subcatCategories) {
          const subs = await getSubcategoriesByCategoryId(cat.id);
          allSubs.push(...subs);
        }
        setSubcatList(allSubs);
      } else {
        const subs = await getSubcategoriesByCategoryId(subcatCategoryFilter);
        setSubcatList(subs);
      }
    };
    loadSubcats();
  }, [subcatCategoryFilter, subcatCategories]);

  const handleSubcatImageUpload = async (subcatId: string, file: File) => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast({ title: "Invalid File", description: validation.error, variant: "destructive" });
      return;
    }
    setSubcatImageUploading(subcatId);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `subcategory-${subcatId}-${Date.now()}.${fileExt}`;
      const filePath = `subcategories/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('category-images')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('category-images')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('worksheet_subcategories')
        .update({ image_url: publicUrl })
        .eq('id', subcatId);
      if (updateError) throw updateError;

      setSubcatList(prev => prev.map(s => s.id === subcatId ? { ...s, imageUrl: publicUrl } : s));
      toast({ title: "✅ Image Uploaded!", description: "Subcategory thumbnail updated successfully." });
    } catch (error: any) {
      console.error('Subcategory image upload error:', error);
      toast({ title: "❌ Upload Failed", description: error.message || "Failed to upload image", variant: "destructive" });
    } finally {
      setSubcatImageUploading(null);
    }
  };

  const handleSubcatImageDelete = async (subcatId: string, imageUrl: string) => {
    setSubcatImageUploading(subcatId);
    try {
      // Extract storage path from public URL
      const bucketPath = imageUrl.split('/category-images/')[1];
      if (bucketPath) {
        await supabase.storage.from('category-images').remove([decodeURIComponent(bucketPath)]);
      }

      const { error } = await supabase
        .from('worksheet_subcategories')
        .update({ image_url: null })
        .eq('id', subcatId);
      if (error) throw error;

      setSubcatList(prev => prev.map(s => s.id === subcatId ? { ...s, imageUrl: undefined } : s));
      toast({ title: "✅ Image Removed", description: "Subcategory thumbnail deleted." });
    } catch (error: any) {
      console.error('Subcategory image delete error:', error);
      toast({ title: "❌ Delete Failed", description: error.message || "Failed to delete image", variant: "destructive" });
    } finally {
      setSubcatImageUploading(null);
    }
  };

  // Apply search filter on top of grade/subject/subcategory filters
  const searchFilteredWorksheets = worksheetSearch.trim()
    ? filteredWorksheets.filter(w =>
        w.title.toLowerCase().includes(worksheetSearch.toLowerCase()) ||
        (w.description || "").toLowerCase().includes(worksheetSearch.toLowerCase())
      )
    : filteredWorksheets;

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(searchFilteredWorksheets.length / WORKSHEETS_PER_PAGE));
  const safeWorksheetPage = Math.min(worksheetPage, totalPages);
  const paginatedWorksheets = searchFilteredWorksheets.slice(
    (safeWorksheetPage - 1) * WORKSHEETS_PER_PAGE,
    safeWorksheetPage * WORKSHEETS_PER_PAGE
  );

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
              <Button variant="outline" onClick={() => navigate("/admin/worksheet-audit")}>
                <FileText className="mr-2 h-4 w-4" />
                Audit
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
          <Button
            variant={activeTab === "bulk-upload" ? "default" : "ghost"}
            onClick={() => setActiveTab("bulk-upload")}
            className="rounded-b-none"
          >
            <UploadCloud className="mr-2 h-4 w-4" />
            Bulk Upload
          </Button>
          <Button
            variant={activeTab === "worksheet-categories" ? "default" : "ghost"}
            onClick={() => setActiveTab("worksheet-categories")}
            className="rounded-b-none"
          >
            <FolderPlus className="mr-2 h-4 w-4" />
            Worksheet Categories
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
                        <SelectItem value="1">Grade 1</SelectItem>
                        <SelectItem value="2">Grade 2</SelectItem>
                        <SelectItem value="3">Grade 3</SelectItem>
                        <SelectItem value="4">Grade 4</SelectItem>
                        <SelectItem value="5">Grade 5</SelectItem>
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
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="assignments">Assignments</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subCategory">Sub-Category</Label>
                  <Select
                    value={formData.subCategory || "none"}
                    onValueChange={(value) => setFormData({ ...formData, subCategory: value === "none" ? "" : value })}
                    disabled={!formData.subject}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={!formData.subject ? "Select subject first" : "Select sub-category (optional)"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {formData.subject === "math" && (
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
                      {formData.subject === "english" && (
                        <>
                          <SelectItem value="Reading">Reading</SelectItem>
                          <SelectItem value="Grammar">Grammar</SelectItem>
                          <SelectItem value="Vocabulary">Vocabulary</SelectItem>
                          <SelectItem value="Writing">Writing</SelectItem>
                          <SelectItem value="Phonics">Phonics</SelectItem>
                        </>
                      )}
                      {formData.subject === "science" && (
                        <>
                          <SelectItem value="Plants & Animals">Plants & Animals</SelectItem>
                          <SelectItem value="My Body">My Body</SelectItem>
                          <SelectItem value="Family & Home">Family & Home</SelectItem>
                          <SelectItem value="Food & Water">Food & Water</SelectItem>
                          <SelectItem value="Environment">Environment</SelectItem>
                        </>
                      )}
                      {formData.subject === "computer-science" && (
                        <>
                          <SelectItem value="Computer Basics">Computer Basics</SelectItem>
                          <SelectItem value="Keyboard & Mouse">Keyboard & Mouse</SelectItem>
                          <SelectItem value="Digital Safety">Digital Safety</SelectItem>
                        </>
                      )}
                      {formData.subject === "assignments" && (
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

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <div className="flex gap-2">
                    <Select
                      value={formData.categoryId}
                      onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                      disabled={!formData.grade || !formData.subject || isCategoriesLoading}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder={
                          isCategoriesLoading 
                            ? "Loading categories..." 
                            : !formData.grade || !formData.subject
                            ? "Select grade and subject first"
                            : "Select category (optional)"
                        } />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Category</SelectItem>
                        {categoryOptions.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setIsCategoryDialogOpen(true)}
                      title="Create new category"
                    >
                      <FolderPlus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Categories help organize multiple worksheets on the same topic
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subcategory">Subcategory / Topic</Label>
                  <Select
                    value={formData.subcategoryId}
                    onValueChange={(value) => setFormData({ ...formData, subcategoryId: value })}
                    disabled={!formData.categoryId || formData.categoryId === "none" || isSubcategoriesLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={
                        isSubcategoriesLoading
                          ? "Loading subcategories..."
                          : !formData.categoryId || formData.categoryId === "none"
                          ? "Select a category first"
                          : "Select subcategory (optional)"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Subcategory</SelectItem>
                      {subcategoryOptions.map(sub => (
                        <SelectItem key={sub.id} value={sub.id}>
                          {sub.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Subcategories/topics appear under categories on the site
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                  >
                    <SelectTrigger>
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

                <div className="space-y-2">
                  <Label>PDF File *</Label>
                  <PdfUploadZone
                    file={pdfFile}
                    onFileChange={setPdfFile}
                    existingPdfUrl={editingWorksheet ? formData.pdfUrl : undefined}
                    isUploading={pdfUploading}
                    uploadProgress={pdfUploadProgress}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Worksheet Content (questions)</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Paste your worksheet questions here, one per line..."
                    rows={8}
                  />
                  <p className="text-xs text-muted-foreground">
                    Optional: Add the actual questions to display on the worksheet page
                  </p>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1" disabled={pdfUploading}>
                    {pdfUploading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Uploading…</>
                    ) : editingWorksheet ? "Update Worksheet" : "Create Worksheet"}
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
                <SelectItem value="1">Grade 1</SelectItem>
                <SelectItem value="2">Grade 2</SelectItem>
                <SelectItem value="3">Grade 3</SelectItem>
                <SelectItem value="4">Grade 4</SelectItem>
                <SelectItem value="5">Grade 5</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterSubject} onValueChange={(val) => { setFilterSubject(val); setFilterSubCategory("all"); }}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="math">Math</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="computer-science">Computer Science</SelectItem>
                <SelectItem value="assignments">Assignments</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterSubCategory} onValueChange={setFilterSubCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by Sub-Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sub-Categories</SelectItem>
                {filterSubcategoryOptions.map((opt) => (
                  <SelectItem key={opt.id} value={opt.id}>{opt.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Box */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search worksheets by title…"
              value={worksheetSearch}
              onChange={(e) => { setWorksheetSearch(e.target.value); setWorksheetPage(1); }}
              className="pl-10"
            />
          </div>
        </div>

        {/* Worksheets List - Paginated */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Showing {((safeWorksheetPage - 1) * WORKSHEETS_PER_PAGE) + 1}–{Math.min(safeWorksheetPage * WORKSHEETS_PER_PAGE, searchFilteredWorksheets.length)} of {searchFilteredWorksheets.length} worksheets
            {worksheetSearch && ` matching "${worksheetSearch}"`}
          </p>

          {paginatedWorksheets.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Worksheets Found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  {worksheetSearch ? "Try a different search term" : "Get started by adding your first worksheet"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {paginatedWorksheets.map((worksheet) => (
                <Card key={worksheet.id} className="hover:shadow-soft transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-base mb-1">{worksheet.title}</h4>
                        <p className="text-muted-foreground text-sm mb-2 line-clamp-1">
                          {worksheet.description}
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                          <span className="px-2 py-0.5 rounded bg-muted font-medium">Grade {worksheet.grade}</span>
                          <span className="px-2 py-0.5 rounded bg-muted font-medium capitalize">{worksheet.subject}</span>
                          {worksheet.difficulty && (
                            <span className="px-2 py-0.5 rounded bg-muted font-medium">{worksheet.difficulty}</span>
                          )}
                          {(worksheet as any).subCategory && (
                            <span className="px-2 py-0.5 rounded bg-muted font-medium">{(worksheet as any).subCategory}</span>
                          )}
                          <span>Created: {new Date(worksheet.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(worksheet)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(worksheet.id, worksheet.title)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 py-4">
              <Button
                variant="outline"
                size="sm"
                disabled={safeWorksheetPage <= 1}
                onClick={() => setWorksheetPage(p => Math.max(1, p - 1))}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <span className="text-sm text-muted-foreground px-4">
                Page {safeWorksheetPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={safeWorksheetPage >= totalPages}
                onClick={() => setWorksheetPage(p => Math.min(totalPages, p + 1))}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
          </>
        )}

        {activeTab === "bulk-upload" && <BulkUpload />}

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
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="computer-science">Computer Science</SelectItem>
                          <SelectItem value="assignments">Assignments</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-4 pt-4 border-t">
                    <Label htmlFor="image-upload" className="text-sm font-semibold text-lg">
                      Upload Subject Category Image
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      This updates the category card image for {categorySubjectFilter} in {categoryGradeFilter}. Recommended size: 400x300px
                    </p>
                    <div className="flex gap-3 items-end">
                      <div className="flex-1">
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                          className="cursor-pointer"
                        />
                      </div>
                      <Button 
                        onClick={() => document.getElementById('image-upload')?.click()}
                        disabled={isUploading}
                        size="lg"
                      >
                        {isUploading ? "Uploading..." : "Choose & Upload Image"}
                      </Button>
                    </div>
                    {isUploading && (
                      <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                        <p className="text-sm text-blue-700">⏳ Uploading image to cloud...</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Current Category Preview */}
                {getCurrentCategory()?.imageUrl ? (
                  <Card key={getCurrentCategory()?.imageUrl}>
                    <CardHeader>
                      <CardTitle className="text-lg">✅ Current Category Image</CardTitle>
                      <CardDescription>
                        {getCurrentCategory()?.name} - {categoryGradeFilter.replace('grade-', 'Grade ').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video w-full max-w-md overflow-hidden rounded-lg bg-muted border-2 border-green-300">
                        <img
                          src={getCurrentCategory()?.imageUrl}
                          alt={getCurrentCategory()?.name}
                          className="w-full h-full object-cover"
                          key={getCurrentCategory()?.imageUrl}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        {getCurrentCategory()?.description}
                      </p>
                      <p className="text-xs text-green-700 mt-2 font-semibold">
                        ✓ This image is currently live on the website
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        URL: {getCurrentCategory()?.imageUrl?.substring(0, 60)}...
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-6 text-center">
                    <p className="text-amber-800 font-medium">📸 No image uploaded yet for this category</p>
                    <p className="text-sm text-amber-600 mt-2">Upload an image above to see the preview here</p>
                  </div>
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
                {/* Info Banner - No Credits Required */}
                <div className="mb-4 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
                  <p className="text-sm font-bold text-green-800 flex items-center gap-2">
                    ✅ <span className="text-base">FREE FEATURE - No Credits Required!</span>
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    Upload as many worksheet images as you need. This is a backend storage operation that doesn't consume any Lovable credits.
                  </p>
                </div>

                {/* Debug Info */}
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm font-semibold text-blue-900 mb-2">📊 Debug Info:</p>
                  <p className="text-sm text-blue-700">
                    Showing worksheets for: <strong>{categoryGradeFilter}</strong> → <strong>{categorySubjectFilter}</strong>
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Found: <strong>{categoryFilteredWorksheets.length}</strong> worksheets
                  </p>
                </div>

                {/* Worksheet Grid */}
                {categoryFilteredWorksheets.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" key={imageUpdateTrigger}>
                    {categoryFilteredWorksheets.map((worksheet) => (
                      <Card key={worksheet.id} className="overflow-hidden">
                         <CardContent className="p-4">
                           <h4 className="font-medium text-base mb-3">{worksheet.title}</h4>
                           
                           <ImageUploader
                             currentImageUrl={worksheetImageOverrides[String(worksheet.id)] || worksheet.imageUrl}
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
                ) : (
                  <div className="text-center py-16 bg-yellow-50 border-2 border-dashed border-yellow-400 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-800 mb-2">⚠️ No Worksheets Found</p>
                    <p className="text-base text-yellow-700 mb-1">
                      Selected filters: <strong>{categoryGradeFilter.replace('grade-', 'Grade ')}</strong> → <strong className="capitalize">{categorySubjectFilter}</strong>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      No worksheets match these filters. Check if worksheets exist for this combination.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "worksheet-categories" && (
          <div className="space-y-8">
            {/* Subcategory Image Management — shown first for visibility */}
            <Card>
              <CardHeader>
                <CardTitle>📸 Subcategory / Topic Thumbnails</CardTitle>
                <CardDescription>
                  Upload thumbnail images for subcategories like Addition, Subtraction, Phonics, etc. These appear on topic cards across the public site.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label>Grade</Label>
                    <Select value={subcatGradeFilter} onValueChange={setSubcatGradeFilter}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["1","2","3","4","5"].map(g => (
                          <SelectItem key={g} value={g}>Grade {g}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Select value={subcatSubjectFilter} onValueChange={setSubcatSubjectFilter}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Math">Math</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Science">Science</SelectItem>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Assignments">Assignments</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Category (optional)</Label>
                    <Select value={subcatCategoryFilter} onValueChange={setSubcatCategoryFilter}>
                      <SelectTrigger><SelectValue placeholder="All categories" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {subcatCategories.map(c => (
                          <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Subcategory</Label>
                    <Select
                      value={subcatNameFilter}
                      onValueChange={setSubcatNameFilter}
                    >
                      <SelectTrigger><SelectValue placeholder="All subcategories" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subcategories</SelectItem>
                        {[...new Set(subcatList.map(s => s.title))].sort().map(name => (
                          <SelectItem key={name} value={name}>{name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Subcategory Grid */}
                {(() => {
                  const displayedSubcats = subcatNameFilter === "all"
                    ? subcatList
                    : subcatList.filter(s => s.title === subcatNameFilter);
                  return displayedSubcats.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayedSubcats.map(subcat => (
                      <Card key={subcat.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-base mb-2">{subcat.title}</h4>
                          
                          {/* Current thumbnail preview */}
                          <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted border mb-3 max-w-[200px]">
                            {subcat.imageUrl ? (
                              <img
                                src={subcat.imageUrl}
                                alt={subcat.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                <ImageIcon className="w-8 h-8" />
                              </div>
                            )}
                          </div>

                          {/* Upload input */}
                          <Input
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            className="cursor-pointer text-sm"
                            disabled={subcatImageUploading === subcat.id}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleSubcatImageUpload(subcat.id, file);
                              e.target.value = '';
                            }}
                          />
                          {subcatImageUploading === subcat.id && (
                            <p className="text-sm text-primary mt-2 flex items-center gap-1">
                              <Loader2 className="w-3 h-3 animate-spin" /> Uploading...
                            </p>
                          )}
                          {subcat.imageUrl && (
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-xs text-muted-foreground truncate">✓ Image set</p>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-destructive hover:text-destructive" disabled={subcatImageUploading === subcat.id}>
                                    <Trash2 className="w-3 h-3 mr-1" /> Delete
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete subcategory image?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will remove the thumbnail for "{subcat.title}" from the admin dashboard and the public site. The file will also be deleted from storage.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      onClick={() => handleSubcatImageDelete(subcat.id, subcat.imageUrl!)}
                                    >
                                      Delete Image
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No subcategories found for Grade {subcatGradeFilter} → {subcatSubjectFilter}{subcatNameFilter !== "all" ? ` → ${subcatNameFilter}` : ""}</p>
                  </div>
                );
                })()}
              </CardContent>
            </Card>

            {/* Category Management — below thumbnails */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Manage Worksheet Categories</CardTitle>
                    <CardDescription>
                      Create categories to organize multiple worksheets on the same topic
                    </CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Category
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Category</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="categoryTitle">Title *</Label>
                          <Input
                            id="categoryTitle"
                            value={newCategoryData.title}
                            onChange={(e) => setNewCategoryData({ ...newCategoryData, title: e.target.value })}
                            placeholder="e.g. Addition Practice"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="categoryDescription">Description</Label>
                          <Input
                            id="categoryDescription"
                            value={newCategoryData.description}
                            onChange={(e) => setNewCategoryData({ ...newCategoryData, description: e.target.value })}
                            placeholder="Optional description"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="categoryGrade">Grade *</Label>
                            <Select
                              value={newCategoryData.grade}
                              onValueChange={(value) => setNewCategoryData({ ...newCategoryData, grade: value })}
                              required
                            >
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
                          <div className="space-y-2">
                            <Label htmlFor="categorySubject">Subject *</Label>
                            <Select
                              value={newCategoryData.subject}
                              onValueChange={(value) => setNewCategoryData({ ...newCategoryData, subject: value })}
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select subject" />
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
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button onClick={handleCreateCategory}>
                            Create Category
                          </Button>
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              Cancel
                            </Button>
                          </DialogTrigger>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {["1", "2", "3", "4", "5"].map(grade => (
                    <div key={grade}>
                      <h3 className="text-lg font-semibold mb-3">Grade {grade}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {worksheetCategories
                          .filter(c => c.grade === grade)
                          .map(category => (
                            <Card key={category.id}>
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h4 className="font-semibold">{category.title}</h4>
                                    <p className="text-sm text-muted-foreground capitalize">{category.subject}</p>
                                    {category.description && (
                                      <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                                    )}
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteCategory(category.id, category.title)}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        {worksheetCategories.filter(c => c.grade === grade).length === 0 && (
                          <p className="text-sm text-muted-foreground col-span-full">No categories yet for {grade}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
