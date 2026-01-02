import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Download, Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const DownloadPack = () => {
  const { packId } = useParams<{ packId: string }>();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  // Extract grade number from packId (e.g., "grade-1-pack" -> "1")
  const gradeMatch = packId?.match(/^grade-(\d)-pack$/);
  const gradeNum = gradeMatch ? gradeMatch[1] : null;

  useEffect(() => {
    const downloadPack = async () => {
      if (!gradeNum || parseInt(gradeNum) < 1 || parseInt(gradeNum) > 5) {
        setStatus("error");
        setErrorMessage("Invalid grade. Please select a valid grade (1-5).");
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke("download-pack", {
          body: { grade: gradeNum },
        });

        if (error) {
          console.error("Download error:", error);
          setStatus("error");
          setErrorMessage(error.message || "Failed to download the worksheet pack.");
          return;
        }

        // Check if response is a blob/file
        if (data instanceof Blob) {
          // Create download link
          const url = URL.createObjectURL(data);
          const a = document.createElement("a");
          a.href = url;
          a.download = `grade-${gradeNum}-pack.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          setStatus("success");
        } else if (data?.error) {
          setStatus("error");
          setErrorMessage(data.error);
        } else {
          setStatus("error");
          setErrorMessage("Unexpected response format.");
        }
      } catch (err) {
        console.error("Download exception:", err);
        setStatus("error");
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    };

    downloadPack();
  }, [gradeNum]);

  const gradeDisplay = gradeNum || packId;

  return (
    <>
      <Helmet>
        <title>Download Grade {gradeDisplay} Pack | WizKidsHub</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full text-center space-y-6">
          {status === "loading" && (
            <div className="space-y-4">
              <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto" />
              <h1 className="text-2xl font-bold text-foreground">
                Preparing Your Download
              </h1>
              <p className="text-muted-foreground">
                Getting Grade {gradeDisplay} Worksheet Pack ready...
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Download className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Download Started!
              </h1>
              <p className="text-muted-foreground">
                Your Grade {gradeDisplay} Worksheet Pack is downloading. Check your downloads folder.
              </p>
              <Button asChild variant="outline">
                <Link to="/packs">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Packs
                </Link>
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Download Failed
              </h1>
              <p className="text-muted-foreground">{errorMessage}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => window.location.reload()}
                  variant="default"
                >
                  Try Again
                </Button>
                <Button asChild variant="outline">
                  <Link to="/packs">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Packs
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DownloadPack;
