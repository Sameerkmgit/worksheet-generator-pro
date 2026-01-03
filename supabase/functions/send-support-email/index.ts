import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SupportEmailRequest {
  email: string;
  name?: string;
  subject?: string;
  message: string;
  pageUrl?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, subject, message, pageUrl }: SupportEmailRequest = await req.json();

    console.log("Received support email request:", { email, name, subject, pageUrl });

    // Build the email content
    const emailSubject = subject ? `Support: ${subject}` : "New Support Message";
    const senderName = name || "Anonymous";
    
    const htmlContent = `
      <h2>New Support Message from WizKidsHub</h2>
      <p><strong>From:</strong> ${senderName} (${email})</p>
      ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
      ${pageUrl ? `<p><strong>Page URL:</strong> ${pageUrl}</p>` : ""}
      <hr />
      <h3>Message:</h3>
      <p style="white-space: pre-wrap;">${message}</p>
      <hr />
      <p style="color: #666; font-size: 12px;">
        This message was sent via the WizKidsHub support form.
        Reply directly to this email to respond to ${email}.
      </p>
    `;

    const emailResponse = await resend.emails.send({
      from: "WizKidsHub <onboarding@resend.dev>",
      to: ["smartkidshubweb@gmail.com"],
      reply_to: email,
      subject: emailSubject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-support-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
