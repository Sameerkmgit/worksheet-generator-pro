import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

interface OverrideRow {
  id: string;
  page_type: string;
  grade: string;
  subject: string;
  topic_slug: string | null;
  page_path: string;
  intro: string | null;
  key_skills_json: string[] | null;
  example_questions_json: string[] | null;
  how_to_use: string | null;
  what_kids_learn_json: string[] | null;
  practice_tips: string | null;
  meta_title: string | null;
  meta_description: string | null;
  is_active: boolean;
}

const EMPTY_OVERRIDE: Omit<OverrideRow, "id"> = {
  page_type: "subject",
  grade: "1",
  subject: "math",
  topic_slug: null,
  page_path: "",
  intro: "",
  key_skills_json: [],
  example_questions_json: [],
  how_to_use: "",
  what_kids_learn_json: [],
  practice_tips: "",
  meta_title: "",
  meta_description: "",
  is_active: true,
};

const AdminSeoOverrides = () => {
  const navigate = useNavigate();
  const [overrides, setOverrides] = useState<OverrideRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<OverrideRow | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin/login"); return; }
      const { data } = await supabase.rpc("has_role", { _user_id: session.user.id, _role: "admin" });
      if (!data) navigate("/admin/login");
    };
    checkAuth();
    loadOverrides();
  }, [navigate]);

  const loadOverrides = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("seo_page_overrides" as any)
      .select("*")
      .order("grade")
      .order("subject")
      .order("page_type");
    setOverrides((data as any as OverrideRow[]) || []);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!editing) return;
    const record: any = {
      page_type: editing.page_type,
      grade: editing.grade,
      subject: editing.subject.toLowerCase(),
      topic_slug: editing.page_type === "topic" ? editing.topic_slug : null,
      page_path: editing.page_path,
      intro: editing.intro || null,
      key_skills_json: editing.key_skills_json?.length ? editing.key_skills_json : null,
      example_questions_json: editing.example_questions_json?.length ? editing.example_questions_json : null,
      how_to_use: editing.how_to_use || null,
      what_kids_learn_json: editing.what_kids_learn_json?.length ? editing.what_kids_learn_json : null,
      practice_tips: editing.practice_tips || null,
      meta_title: editing.meta_title || null,
      meta_description: editing.meta_description || null,
      is_active: editing.is_active,
    };

    if (isNew) {
      const { error } = await supabase.from("seo_page_overrides" as any).insert(record);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("seo_page_overrides" as any).update(record).eq("id", editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: "Saved", description: "Override saved successfully." });
    setEditing(null);
    setIsNew(false);
    loadOverrides();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this override?")) return;
    await supabase.from("seo_page_overrides" as any).delete().eq("id", id);
    toast({ title: "Deleted" });
    loadOverrides();
  };

  const arrayToText = (arr: string[] | null) => (arr || []).join("\n");
  const textToArray = (text: string) => text.split("\n").map(s => s.trim()).filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>SEO Overrides | Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold font-heading">SEO Content Overrides</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/admin/dashboard")}>← Dashboard</Button>
            <Button onClick={() => { setEditing({ id: "", ...EMPTY_OVERRIDE } as OverrideRow); setIsNew(true); }}>
              <Plus className="w-4 h-4 mr-1" /> New Override
            </Button>
          </div>
        </div>

        {editing ? (
          <Card>
            <CardHeader><CardTitle>{isNew ? "New Override" : "Edit Override"}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label>Page Type</Label>
                  <Select value={editing.page_type} onValueChange={v => setEditing({ ...editing, page_type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="subject">Subject</SelectItem>
                      <SelectItem value="topic">Topic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Grade</Label>
                  <Select value={editing.grade} onValueChange={v => setEditing({ ...editing, grade: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["1","2","3","4","5"].map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Subject</Label>
                  <Input value={editing.subject} onChange={e => setEditing({ ...editing, subject: e.target.value })} />
                </div>
                {editing.page_type === "topic" && (
                  <div>
                    <Label>Topic Slug</Label>
                    <Input value={editing.topic_slug || ""} onChange={e => setEditing({ ...editing, topic_slug: e.target.value })} />
                  </div>
                )}
              </div>
              <div>
                <Label>Page Path</Label>
                <Input value={editing.page_path} onChange={e => setEditing({ ...editing, page_path: e.target.value })} placeholder="/categories/grade-1/math" />
              </div>
              <div>
                <Label>Meta Title</Label>
                <Input value={editing.meta_title || ""} onChange={e => setEditing({ ...editing, meta_title: e.target.value })} />
              </div>
              <div>
                <Label>Meta Description</Label>
                <Textarea value={editing.meta_description || ""} onChange={e => setEditing({ ...editing, meta_description: e.target.value })} rows={2} />
              </div>
              <div>
                <Label>Intro</Label>
                <Textarea value={editing.intro || ""} onChange={e => setEditing({ ...editing, intro: e.target.value })} rows={4} />
              </div>
              {editing.page_type === "subject" ? (
                <>
                  <div>
                    <Label>Key Skills (one per line)</Label>
                    <Textarea value={arrayToText(editing.key_skills_json)} onChange={e => setEditing({ ...editing, key_skills_json: textToArray(e.target.value) })} rows={5} />
                  </div>
                  <div>
                    <Label>How to Use</Label>
                    <Textarea value={editing.how_to_use || ""} onChange={e => setEditing({ ...editing, how_to_use: e.target.value })} rows={3} />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label>What Kids Will Learn (one per line)</Label>
                    <Textarea value={arrayToText(editing.what_kids_learn_json)} onChange={e => setEditing({ ...editing, what_kids_learn_json: textToArray(e.target.value) })} rows={5} />
                  </div>
                  <div>
                    <Label>Practice Tips</Label>
                    <Textarea value={editing.practice_tips || ""} onChange={e => setEditing({ ...editing, practice_tips: e.target.value })} rows={3} />
                  </div>
                </>
              )}
              <div>
                <Label>Example Questions (one per line)</Label>
                <Textarea value={arrayToText(editing.example_questions_json)} onChange={e => setEditing({ ...editing, example_questions_json: textToArray(e.target.value) })} rows={4} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={editing.is_active} onCheckedChange={v => setEditing({ ...editing, is_active: v })} />
                <Label>Active</Label>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave}><Save className="w-4 h-4 mr-1" /> Save</Button>
                <Button variant="outline" onClick={() => { setEditing(null); setIsNew(false); }}><X className="w-4 h-4 mr-1" /> Cancel</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {loading ? <p>Loading...</p> : overrides.length === 0 ? <p className="text-muted-foreground">No overrides yet.</p> : (
              overrides.map(o => (
                <Card key={o.id} className={`${!o.is_active ? "opacity-50" : ""}`}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{o.page_path}</p>
                      <p className="text-sm text-muted-foreground">
                        {o.page_type} · Grade {o.grade} · {o.subject}
                        {o.topic_slug ? ` · ${o.topic_slug}` : ""}
                        {!o.is_active && " · INACTIVE"}
                      </p>
                      {o.meta_title && <p className="text-xs text-muted-foreground mt-1 truncate max-w-lg">{o.meta_title}</p>}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => { setEditing(o); setIsNew(false); }}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(o.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminSeoOverrides;
