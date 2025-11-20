import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, LogOut, FileText, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  isAdminAuthenticated,
  adminLogout,
  getAllWorksheets,
  createWorksheet,
  updateWorksheet,
  deleteWorksheet,
  WorksheetData,
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

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    grade: "",
    subject: "",
    pdfUrl: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/admin/login");
      return;
    }
    loadWorksheets();
  }, [navigate]);

  useEffect(() => {
    filterWorksheets();
  }, [worksheets, filterGrade, filterSubject]);

  const loadWorksheets = () => {
    const data = getAllWorksheets();
    setWorksheets(data);
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
    navigate("/admin/login");
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
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-6 py-8">
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
      </div>
    </div>
  );
};

export default AdminDashboard;
