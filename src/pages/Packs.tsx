import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Download, Package, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type PackCard = {
  pack_id: string;
  grade: number;
  slug: string;
  title: string;
  description: string;
  worksheet_titles: string[];
  worksheet_count: number;
};

const Packs = () => {
  const { toast } = useToast();

  const [packs, setPacks] = useState<PackCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedPack, setSelectedPack] = useState<PackCard | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadPacks = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await (supabase as any)
          .from("v_pack_card_dynamic")
          .select("pack_id, grade, slug, title, description, worksheet_titles, worksheet_count")
          .order("grade", { ascending: true });

        console.log("v_pack_card_dynamic data:", data);
        console.log("v_pack_card_dynamic error:", error);

        if (error) throw error;

        setPacks((data ?? []) as unknown as PackCard[]);
      } catch (e: any) {
        console.error("Packs fetch error:", e);
        setError(e?.message ?? "Failed to load packs");
        setPacks([]);
      } finally {
        setLoading(false);
      }
    };

    loadPacks();
  }, []);

  const handleEmailSend = (pack: PackCard) => {
    // Production note: real email delivery needs an email service + edge function.
    // For now, don't lie to users. Give an honest toast.
    if (!email) {
      toast({ title: "Email required", description: "Please enter your email address." });
      return;
    }
    toast({
      title: "Email delivery not enabled yet",
      description: "Download works now. Email delivery will be added soon.",
    });
    setEmail("");
    setSelectedPack(null);
  };

  // Breadcrumb items for Packs page
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Worksheet Packs" }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Free Worksheet Packs (PDF) for Grades 1–5 | WizKidsHub</title>
        <meta
          name="description"
          content="Download free worksheet packs for Grades 1–5. Each pack includes 10 carefully selected printable worksheets in PDF format."
        />
        <link rel="canonical" href="https://wizkidshubworksheets.com/packs" />
      </Helmet>
      
      {/* Breadcrumbs component injects JSON-LD */}
      <Breadcrumbs items={breadcrumbItems} className="hidden" />

      <Header />

      <main className="py-12 px-6">
        <div className="container mx-auto max-w-[1140px]">
          {/* Visible Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 border-2 border-accent/20">
              <Package className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4 font-heading">Free Worksheet Packs</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Download comprehensive worksheet packs for each grade. Each pack includes 10 carefully selected
              worksheets.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center bg-card p-6 rounded-lg shadow-card">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2 font-heading">Curated Content</h3>
              <p className="text-muted-foreground text-sm">
                10 best worksheets per grade, selected from real site content
              </p>
            </div>
            <div className="text-center bg-card p-6 rounded-lg shadow-card">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2 font-heading">Indexable Truth</h3>
              <p className="text-muted-foreground text-sm">Pack cards always match the actual worksheets in the pack</p>
            </div>
            <div className="text-center bg-card p-6 rounded-lg shadow-card">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2 font-heading">100% Free</h3>
              <p className="text-muted-foreground text-sm">No hidden costs, just quality educational content</p>
            </div>
          </div>

          {/* Loading / Error */}
          {loading && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground py-12">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading worksheet packs…
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
              <div className="font-semibold text-red-600">Failed to load worksheet packs</div>
              <div className="text-sm text-muted-foreground mt-1">{error}</div>
            </div>
          )}

          {/* Packs Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {packs.map((pack) => {
                const titles = Array.isArray(pack.worksheet_titles) ? pack.worksheet_titles : [];
                const bullets = titles.slice(0, 5);
                const remaining = Math.max((pack.worksheet_count ?? 0) - bullets.length, 0);

                return (
                  <Card key={pack.pack_id} className="overflow-hidden">
                    <CardHeader>
                      <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Package className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl font-heading">{pack.title}</CardTitle>
                      <p className="text-muted-foreground">{pack.description}</p>
                    </CardHeader>

                    <CardContent>
                      <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-primary">
                        What's Included:
                      </h4>

                      <ul className="space-y-2">
                        {bullets.map((title, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span className="text-sm">{title}</span>
                          </li>
                        ))}
                      </ul>

                      {remaining > 0 && (
                        <p className="mt-2 text-sm text-muted-foreground">+{remaining} more worksheets</p>
                      )}
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3">
                      {/* Link to Grade page */}
                      <Link to={`/categories/grade-${pack.grade}`} className="w-full">
                        <Button variant="outline" className="w-full">
                          Browse Grade {pack.grade} Worksheets
                        </Button>
                      </Link>
                      
                      <div className="flex gap-3 w-full">
                        {/* IMPORTANT: Use proxy download route */}
                        <Button asChild className="flex-1">
                          <a href={`/downloads/grade-${pack.grade}-pack`}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Now
                          </a>
                        </Button>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" onClick={() => setSelectedPack(pack)}>
                              View All
                            </Button>
                          </DialogTrigger>

                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle className="font-heading">{pack.title}</DialogTitle>
                              <DialogDescription>{pack.description}</DialogDescription>
                            </DialogHeader>

                            <div className="py-4">
                              <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-primary">
                                All {titles.length} Worksheets:
                              </h4>

                              <ul className="space-y-2 max-h-60 overflow-y-auto">
                                {titles.map((t, index) => (
                                  <li key={index} className="flex items-start gap-2 text-sm">
                                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>{t}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="border-t pt-4">
                              <p className="text-sm text-muted-foreground mb-3">
                                Get this pack sent to your email (optional):
                              </p>
                              <div className="flex gap-2">
                                <Input
                                  type="email"
                                  placeholder="your@email.com"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                                <Button onClick={() => selectedPack && handleEmailSend(selectedPack)}>Send</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Packs;
