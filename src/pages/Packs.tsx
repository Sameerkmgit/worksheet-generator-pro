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
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ type: "success" | "error"; message: string } | null>(null);

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

  const getPackDownloadUrl = (grade: number) => `/downloads/grade-${grade}-pack`;

  const handleSend = async (pack: PackCard) => {
    console.log("[Pack Send] click", { packId: pack.pack_id, slug: pack.slug, email });
    setSendResult(null);

    // Validate email if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSendResult({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    setSending(true);

    try {
      if (email) {
        // Attempt email delivery via edge function
        console.log("[Pack Send] invoking send-support-email for pack delivery");
        const { data, error: fnError } = await supabase.functions.invoke("send-support-email", {
          body: {
            email,
            name: "Pack Request",
            subject: `Pack Download: ${pack.title}`,
            message: `User requested ${pack.title} (Grade ${pack.grade}) to be sent to ${email}.\n\nDirect download: https://www.wizkidshub.com/downloads/grade-${pack.grade}-pack`,
          },
        });
        console.log("[Pack Send] edge function response:", data, fnError);

        if (fnError) throw fnError;

        toast({ title: "Email sent!", description: `We've sent ${pack.title} details to ${email}.` });
        setSendResult({ type: "success", message: `Email sent to ${email}. You can also download directly below.` });
      } else {
        // No email — just trigger download
        console.log("[Pack Send] no email, triggering direct download");
        toast({ title: "Downloading pack…", description: `Starting download for ${pack.title}.` });
        setSendResult({ type: "success", message: "Your download should start shortly." });
        window.open(getPackDownloadUrl(pack.grade), "_blank", "noopener,noreferrer");
      }
    } catch (err: any) {
      console.error("[Pack Send] failure:", err);
      const msg = err?.message || "Something went wrong. Use the download link below.";
      toast({ title: "Send failed", description: msg, variant: "destructive" });
      setSendResult({ type: "error", message: msg });
    } finally {
      setSending(false);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setEmail("");
      setSendResult(null);
      setSelectedPack(null);
    }
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
        <link rel="canonical" href="https://www.wizkidshub.com/packs" />
      </Helmet>
      
      <Breadcrumbs items={breadcrumbItems} className="hidden" />

      <Header />

      <main className="py-12 px-6">
        <div className="container mx-auto max-w-[1140px]">
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
                      <Link to={`/categories/grade-${pack.grade}`} className="w-full">
                        <Button variant="outline" className="w-full">
                          Browse Grade {pack.grade} Worksheets
                        </Button>
                      </Link>
                      
                      <div className="flex gap-3 w-full">
                        <Button asChild className="flex-1">
                          <a href={getPackDownloadUrl(pack.grade)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Now
                          </a>
                        </Button>

                        <Dialog onOpenChange={handleDialogOpenChange}>
                          <DialogTrigger asChild>
                            <Button variant="outline" onClick={() => {
                              console.log("[Pack Modal] opening for", pack.title);
                              setSelectedPack(pack);
                            }}>
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

                            <div className="border-t pt-4 space-y-3">
                              <p className="text-sm text-muted-foreground">
                                Enter your email to receive this pack, or leave blank to download directly:
                              </p>
                              <div className="flex gap-2">
                                <Input
                                  type="email"
                                  placeholder="your@email.com (optional)"
                                  value={email}
                                  onChange={(e) => {
                                    setEmail(e.target.value);
                                    setSendResult(null);
                                  }}
                                  disabled={sending}
                                />
                                <Button
                                  onClick={() => pack && handleSend(pack)}
                                  disabled={sending}
                                >
                                  {sending ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Sending…
                                    </>
                                  ) : email ? "Send" : "Download"}
                                </Button>
                              </div>

                              {sendResult && (
                                <div className={`text-sm flex items-start gap-2 ${
                                  sendResult.type === "success" ? "text-green-600" : "text-red-600"
                                }`}>
                                  {sendResult.type === "success" ? (
                                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                  ) : (
                                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                  )}
                                  <span>{sendResult.message}</span>
                                </div>
                              )}

                              {/* Always show direct download fallback */}
                              <Button asChild variant="outline" className="w-full">
                                <a href={getPackDownloadUrl(pack.grade)}>
                                  <Download className="mr-2 h-4 w-4" />
                                  Direct Download (PDF)
                                </a>
                              </Button>
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
