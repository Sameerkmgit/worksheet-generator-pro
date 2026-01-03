import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Send, CheckCircle } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supportFormSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email too long"),
  name: z.string().trim().max(100, "Name too long").optional(),
  subject: z.string().trim().max(200, "Subject too long").optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message too long"),
});

type SupportFormData = z.infer<typeof supportFormSchema>;

const Support = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<SupportFormData>({
    email: "",
    name: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SupportFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof SupportFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = supportFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SupportFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof SupportFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Store in database
      const { error: dbError } = await supabase.from("support_messages").insert({
        email: result.data.email,
        name: result.data.name || null,
        subject: result.data.subject || null,
        message: result.data.message,
        page_url: window.location.origin + location.pathname,
      });

      if (dbError) {
        console.error("Database error:", dbError);
        throw dbError;
      }

      // Send email notification via edge function
      const { data: emailData, error: emailError } = await supabase.functions.invoke(
        "send-support-email",
        {
          body: {
            email: result.data.email,
            name: result.data.name || undefined,
            subject: result.data.subject || undefined,
            message: result.data.message,
            pageUrl: window.location.origin + location.pathname,
          },
        }
      );

      if (emailError) {
        console.error("Email sending error:", emailError);
        // Still show success since message was saved to database
      } else {
        console.log("Email sent successfully:", emailData);
      }

      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
    } catch (error) {
      console.error("Error submitting support message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendAnother = () => {
    setIsSubmitted(false);
    setFormData({ email: "", name: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Contact & Support | WizKidsHub Worksheets</title>
        <meta name="description" content="Get in touch with WizKidsHub. Send us your questions, feedback, or suggestions about our educational worksheets." />
        <link rel="canonical" href="https://worksheet-generator-pro.lovable.app/support" />
      </Helmet>

      <Header />

      <main className="py-12 px-6">
        <div className="container mx-auto max-w-xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-heading">Contact & Support</CardTitle>
              <CardDescription>
                Have questions, feedback, or suggestions? We'd love to hear from you!
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8 animate-fade-in">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. We'll review your message and get back to you as soon as possible.
                  </p>
                  <Button variant="outline" onClick={handleSendAnother}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Name (optional)</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject (optional)</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      className={errors.subject ? "border-destructive" : ""}
                    />
                    {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us how we can help..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
