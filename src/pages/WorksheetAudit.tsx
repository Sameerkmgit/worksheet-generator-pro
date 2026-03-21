import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, AlertCircle, TrendingUp, Loader2, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { isAdminAuthenticated } from "@/lib/worksheetStorage";
import { toTitleCase } from "@/lib/utils";

interface WorksheetRow {
  id: string;
  title: string;
  grade: string;
  subject: string;
  subcategory_id: string | null;
}

interface SubcategoryRow {
  id: string;
  title: string;
  category_id: string;
}

interface CategoryRow {
  id: string;
  title: string;
  grade: string;
  subject: string;
}

interface TopicGroup {
  topicName: string;
  topicId: string | null;
  worksheets: { id: string; title: string }[];
}

interface SubjectGroup {
  subject: string;
  topics: TopicGroup[];
}

interface GradeGroup {
  grade: string;
  gradeNum: number;
  subjects: SubjectGroup[];
}

const SUBJECT_ORDER = ["Math", "English", "Science", "Computer Science"];

function normalizeSubject(s: string): string {
  const lower = s.toLowerCase();
  if (lower === "mathematics") return "Math";
  if (lower === "evs") return "Science";
  if (lower === "cs") return "Computer Science";
  return toTitleCase(s);
}

function extractGradeNum(grade: string): number {
  const m = grade.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

const WorksheetAudit = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [gradeGroups, setGradeGroups] = useState<GradeGroup[]>([]);
  const [zeroTopics, setZeroTopics] = useState<{ name: string; grade: string; subject: string }[]>([]);
  const [lowTopics, setLowTopics] = useState<{ name: string; count: number; grade: string; subject: string }[]>([]);
  const [highTopics, setHighTopics] = useState<{ name: string; count: number; grade: string; subject: string }[]>([]);
  const [totalWorksheets, setTotalWorksheets] = useState(0);
  const [uncategorized, setUncategorized] = useState(0);

  useEffect(() => {
    const check = async () => {
      const ok = await isAdminAuthenticated();
      if (!ok) navigate("/admin/login", { replace: true });
    };
    check();
  }, [navigate]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      // Fetch all data in parallel
      const [wsRes, subRes, catRes] = await Promise.all([
        supabase.from("worksheets").select("id, title, grade, subject, subcategory_id").eq("is_archived", false),
        supabase.from("worksheet_subcategories").select("id, title, category_id").eq("is_archived", false),
        supabase.from("worksheet_categories").select("id, title, grade, subject"),
      ]);

      const worksheets = (wsRes.data || []) as WorksheetRow[];
      const subcategories = (subRes.data || []) as SubcategoryRow[];
      const categories = (catRes.data || []) as CategoryRow[];

      setTotalWorksheets(worksheets.length);

      // Build lookup maps
      const subMap = new Map<string, SubcategoryRow>();
      subcategories.forEach((s) => subMap.set(s.id, s));

      const catMap = new Map<string, CategoryRow>();
      categories.forEach((c) => catMap.set(c.id, c));

      // Group worksheets by grade → subject → topic
      const gradeMap = new Map<string, Map<string, Map<string | null, { topicName: string; worksheets: { id: string; title: string }[] }>>>();

      let uncatCount = 0;

      worksheets.forEach((ws) => {
        const gradeNum = extractGradeNum(ws.grade);
        const gradeKey = `Grade ${gradeNum}`;
        const subject = normalizeSubject(ws.subject);

        let topicName = "Uncategorized";
        let topicId: string | null = null;

        if (ws.subcategory_id && subMap.has(ws.subcategory_id)) {
          topicName = subMap.get(ws.subcategory_id)!.title;
          topicId = ws.subcategory_id;
        } else {
          uncatCount++;
        }

        if (!gradeMap.has(gradeKey)) gradeMap.set(gradeKey, new Map());
        const subjMap = gradeMap.get(gradeKey)!;
        if (!subjMap.has(subject)) subjMap.set(subject, new Map());
        const topicMap = subjMap.get(subject)!;
        if (!topicMap.has(topicId)) topicMap.set(topicId, { topicName, worksheets: [] });
        topicMap.get(topicId)!.worksheets.push({ id: ws.id, title: ws.title });
      });

      setUncategorized(uncatCount);

      // Also find subcategories with 0 worksheets
      const usedSubcatIds = new Set(worksheets.filter((w) => w.subcategory_id).map((w) => w.subcategory_id));
      const zeroList: { name: string; grade: string; subject: string }[] = [];
      subcategories.forEach((sub) => {
        if (!usedSubcatIds.has(sub.id)) {
          const cat = catMap.get(sub.category_id);
          zeroList.push({
            name: sub.title,
            grade: cat ? cat.grade : "Unknown",
            subject: cat ? normalizeSubject(cat.subject) : "Unknown",
          });
        }
      });
      setZeroTopics(zeroList);

      // Build structured output
      const grades: GradeGroup[] = [];
      const allTopicCounts: { name: string; count: number; grade: string; subject: string }[] = [];

      const sortedGrades = Array.from(gradeMap.keys()).sort((a, b) => extractGradeNum(a) - extractGradeNum(b));

      for (const gradeKey of sortedGrades) {
        const subjMap = gradeMap.get(gradeKey)!;
        const subjects: SubjectGroup[] = [];

        const sortedSubjects = Array.from(subjMap.keys()).sort(
          (a, b) => (SUBJECT_ORDER.indexOf(a) === -1 ? 99 : SUBJECT_ORDER.indexOf(a)) - (SUBJECT_ORDER.indexOf(b) === -1 ? 99 : SUBJECT_ORDER.indexOf(b))
        );

        for (const subj of sortedSubjects) {
          const topicMap = subjMap.get(subj)!;
          const topics: TopicGroup[] = Array.from(topicMap.entries())
            .map(([tid, data]) => ({ topicName: data.topicName, topicId: tid, worksheets: data.worksheets }))
            .sort((a, b) => a.worksheets.length - b.worksheets.length);

          topics.forEach((t) => {
            if (t.topicId) {
              allTopicCounts.push({ name: t.topicName, count: t.worksheets.length, grade: gradeKey, subject: subj });
            }
          });

          subjects.push({ subject: subj, topics });
        }

        grades.push({ grade: gradeKey, gradeNum: extractGradeNum(gradeKey), subjects });
      }

      setGradeGroups(grades);
      setLowTopics(allTopicCounts.filter((t) => t.count > 0 && t.count < 5).sort((a, b) => a.count - b.count));
      setHighTopics(allTopicCounts.filter((t) => t.count > 15).sort((a, b) => b.count - a.count));
      setLoading(false);
    };

    load();
  }, []);

  const getCountBadge = (count: number) => {
    if (count === 0) return <Badge className="bg-red-500 text-white">{count}</Badge>;
    if (count < 5) return <Badge className="bg-orange-500 text-white">{count}</Badge>;
    if (count > 15) return <Badge className="bg-green-600 text-white">{count}</Badge>;
    return <Badge variant="secondary">{count}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading audit data...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 bg-background border-b px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/dashboard")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <ClipboardList className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-bold">Worksheet Audit</h1>
        <span className="ml-auto text-sm text-muted-foreground">
          Total: {totalWorksheets} worksheets | {uncategorized} uncategorized
        </span>
      </header>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Grade Groups */}
        {gradeGroups.map((gg) => (
          <Card key={gg.grade}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{gg.grade}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {gg.subjects.map((sg) => (
                <div key={sg.subject} className="border rounded-lg p-3">
                  <h3 className="font-semibold text-base mb-2 text-primary">{sg.subject}</h3>
                  <div className="space-y-2">
                    {sg.topics.map((tg, idx) => (
                      <details key={tg.topicId ?? `uncat-${idx}`} className="group">
                        <summary className="cursor-pointer flex items-center gap-2 py-1 hover:bg-muted/50 rounded px-2 -mx-2">
                          {getCountBadge(tg.worksheets.length)}
                          <span className={`text-sm ${tg.topicId ? "" : "italic text-muted-foreground"}`}>
                            {tg.topicName}
                          </span>
                          <span className="text-xs text-muted-foreground ml-auto">
                            {tg.worksheets.length} worksheet{tg.worksheets.length !== 1 ? "s" : ""}
                          </span>
                        </summary>
                        <ul className="ml-12 mt-1 space-y-0.5 text-sm text-muted-foreground list-disc">
                          {tg.worksheets.map((w) => (
                            <li key={w.id}>{w.title}</li>
                          ))}
                        </ul>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Summary Section */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Zero worksheets */}
          <Card className="border-red-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                Critical: 0 Worksheets ({zeroTopics.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {zeroTopics.length === 0 ? (
                <p className="text-sm text-muted-foreground">None — all topics have worksheets!</p>
              ) : (
                <ul className="text-sm space-y-1">
                  {zeroTopics.map((t, i) => (
                    <li key={i} className="text-red-700">
                      <span className="font-medium">{t.name}</span>
                      <span className="text-xs text-muted-foreground ml-1">({t.grade}, {t.subject})</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Low coverage */}
          <Card className="border-orange-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2 text-orange-600">
                <AlertTriangle className="h-4 w-4" />
                Low Coverage: &lt;5 ({lowTopics.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {lowTopics.length === 0 ? (
                <p className="text-sm text-muted-foreground">All topics have 5+ worksheets.</p>
              ) : (
                <ul className="text-sm space-y-1 max-h-64 overflow-y-auto">
                  {lowTopics.map((t, i) => (
                    <li key={i} className="text-orange-700">
                      <Badge className="bg-orange-500 text-white mr-1 text-xs">{t.count}</Badge>
                      <span className="font-medium">{t.name}</span>
                      <span className="text-xs text-muted-foreground ml-1">({t.grade}, {t.subject})</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Overloaded */}
          <Card className="border-green-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2 text-green-600">
                <TrendingUp className="h-4 w-4" />
                Overloaded: &gt;15 ({highTopics.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {highTopics.length === 0 ? (
                <p className="text-sm text-muted-foreground">No topics exceed 15 worksheets.</p>
              ) : (
                <ul className="text-sm space-y-1 max-h-64 overflow-y-auto">
                  {highTopics.map((t, i) => (
                    <li key={i} className="text-green-700">
                      <Badge className="bg-green-600 text-white mr-1 text-xs">{t.count}</Badge>
                      <span className="font-medium">{t.name}</span>
                      <span className="text-xs text-muted-foreground ml-1">({t.grade}, {t.subject})</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorksheetAudit;
