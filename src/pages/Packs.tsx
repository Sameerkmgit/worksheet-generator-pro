import { useState } from "react";
import { Download, Package, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PackCardData {
  pack_id: string;
  grade: number;
  slug: string;
  title: string;
  description: string;
  worksheet_titles: string[];
  worksheet_count: number;
}

const gradeColors: Record<number, string> = {
  1: "from-blue-400 to-blue-500",
  2: "from-blue-500 to-blue-600",
  3: "from-indigo-400 to-indigo-500",
  4: "from-indigo-500 to-indigo-600",
  5: "from-purple-400 to-purple-500",
};

const Packs = () => {
  const [selectedPack, setSelectedPack] = useState<PackCardData | null>(null);
  const { toast } = useToast();

  const { data: packs, isLoading, error } = useQuery({
    queryKey: ["pack-cards"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("v_pack_card_dynamic" as any)
          .select("*")
          .order("grade", { ascending: true });

        console.log("v_pack_card_dynamic data:", data);
        console.log("v_pack_card_dynamic error:", error);

        if (error) {
          console.error("Error fetching packs from v_pack_card_dynamic:", error);
          throw error;
        }

        return data as unknown as PackCardData[];
      } catch (e) {
        console.error("Packs fetch error:", e);
        throw e;
      }
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-12 px-6">
          <div className="container mx-auto max-w-[1140px] flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading worksheet packs...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !packs) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-12 px-6">
          <div className="container mx-auto max-w-[1140px] flex flex-col items-center justify-center min-h-[400px]">
            <AlertCircle className="w-12 h-12 text-destructive mb-4" />
            <p className="text-destructive font-semibold mb-2">Failed to load worksheet packs</p>
            <p className="text-muted-foreground text-sm text-center max-w-md">
              We couldn't load the packs right now. Please try refreshing the page.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Free Worksheet Packs | WizKidsHub Worksheets</title>
        <meta name="description" content="Download free worksheet packs for Grades 1-5. Each pack includes 10 carefully selected worksheets covering Math, English, and Science." />
        <link rel="canonical" href="https://wizkidshub.com/packs" />
      </Helmet>

      <Header />

      <main className="py-12 px-6">
        <div className="container mx-auto max-w-[1140px]">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 border-2 border-primary/20">
              <Package className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4 font-heading">Free Worksheet Packs</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Download comprehensive worksheet packs for each grade. Each pack includes carefully selected worksheets covering Math, English, and Science.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center bg-card p-6 rounded-lg shadow-card">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2 font-heading">Curated Content</h3>
              <p className="text-muted-foreground text-sm">
                Best worksheets per grade, carefully selected by educators
              </p>
            </div>
            <div className="text-center bg-card p-6 rounded-lg shadow-card">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2 font-heading">All Subjects</h3>
              <p className="text-muted-foreground text-sm">
                Balanced mix of Math, English, and Science worksheets
              </p>
            </div>
            <div className="text-center bg-card p-6 rounded-lg shadow-card">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2 font-heading">100% Free</h3>
              <p className="text-muted-foreground text-sm">
                No hidden costs, just quality educational content
              </p>
            </div>
          </div>

          {/* Packs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {packs.map((pack) => {
              const titles = Array.isArray(pack.worksheet_titles) ? pack.worksheet_titles : [];
              const color = gradeColors[pack.grade] || "from-blue-400 to-blue-500";

              return (
                <Card key={pack.pack_id} className="overflow-hidden">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
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
                      {titles.slice(0, 5).map((worksheet, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{worksheet}</span>
                        </li>
                      ))}
                      {titles.length > 5 && (
                        <li className="text-sm text-muted-foreground italic">
                          + {titles.length - 5} more worksheets
                        </li>
                      )}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex gap-3">
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
                            {titles.map((worksheet, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>{worksheet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Packs;
