// src/pages/SubCategory.tsx
import { useParams, Link } from "react-router-dom";
import { FolderOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const subjectList = [
  {
    id: "math",
    name: "Math",
    description: "Practice numbers, operations, shapes and patterns.",
  },
  {
    id: "english",
    name: "English",
    description: "Improve reading, writing, grammar and vocabulary.",
  },
  {
    id: "science",
    name: "Science",
    description: "Explore science concepts with fun worksheets.",
  },
  {
    id: "computer-science",
    name: "Computer Science",
    description: "Build digital literacy and computer skills.",
  },
  {
    id: "assignments",
    name: "Assignments",
    description: "Revision packs, tests and practice papers.",
  },
];

const gradeTitles: Record<string, string> = {
  "grade-1": "Grade 1",
  "grade-2": "Grade 2",
  "grade-3": "Grade 3",
  "grade-4": "Grade 4",
  "grade-5": "Grade 5",
};

const SubCategory = () => {
  const { grade } = useParams<{ grade: string }>();

  const gradeSlug = grade || "grade-1";
  const gradeTitle = gradeTitles[gradeSlug] || "Grade";

  const pageTitle = `${gradeTitle} Worksheets by Subject`;
  const pageDescription = `Browse ${gradeTitle.toLowerCase()} worksheets organized by subject – Math, English, Science, Computer Science and Assignments.`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{pageTitle} | SmartKids Worksheets</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-sm text-muted-foreground mb-2">
              Home / {gradeTitle}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {gradeTitle} Worksheets
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Choose a subject to explore free printable {gradeTitle.toLowerCase()} worksheets.
            </p>
          </div>
        </section>

        {/* Subjects grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">
              Select a Subject
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjectList.map((subject) => (
                <div
                  key={subject.id}
                  className="bg-card border rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-6 flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <FolderOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        {subject.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {subject.description}
                      </p>
                      <Link
                        to={`/categories/${gradeSlug}/${subject.id}`}
                        className="inline-flex items-center text-primary font-medium hover:underline"
                      >
                        View {subject.name} worksheets
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SubCategory;
