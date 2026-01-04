import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SITE_URL = "https://www.wizkidshub.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/xml; charset=utf-8",
};

// Format date to W3C format for sitemap
function formatDate(dateString: string | null): string | null {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // YYYY-MM-DD format
  } catch {
    return null;
  }
}

// Escape XML special characters
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Build a single URL entry
function buildUrlEntry(loc: string, lastmod?: string | null, priority?: string, changefreq?: string): string {
  let entry = `  <url>\n    <loc>${escapeXml(loc)}</loc>\n`;
  if (lastmod) {
    entry += `    <lastmod>${lastmod}</lastmod>\n`;
  }
  if (changefreq) {
    entry += `    <changefreq>${changefreq}</changefreq>\n`;
  }
  if (priority) {
    entry += `    <priority>${priority}</priority>\n`;
  }
  entry += `  </url>\n`;
  return entry;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Generating sitemap...");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Start building sitemap
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static pages
    sitemap += buildUrlEntry(`${SITE_URL}/`, null, "1.0", "daily");
    sitemap += buildUrlEntry(`${SITE_URL}/packs`, null, "0.9", "weekly");
    sitemap += buildUrlEntry(`${SITE_URL}/worksheets`, null, "0.9", "weekly");
    sitemap += buildUrlEntry(`${SITE_URL}/privacy-policy`, null, "0.3", "yearly");
    sitemap += buildUrlEntry(`${SITE_URL}/terms-of-service`, null, "0.3", "yearly");

    // Grade pages: /categories/:gradeSlug (grade-1, grade-2, etc.)
    const grades = ["grade-1", "grade-2", "grade-3", "grade-4", "grade-5"];
    for (const grade of grades) {
      sitemap += buildUrlEntry(`${SITE_URL}/categories/${grade}`, null, "0.8", "weekly");
    }

    // Fetch worksheet_categories for subject pages with readable URLs
    console.log("Fetching worksheet_categories for subject pages...");
    const { data: categories, error: catError } = await supabase
      .from("worksheet_categories")
      .select("id, grade, subject, updated_at")
      .order("sort_order", { ascending: true });

    if (catError) {
      console.error("Error fetching categories:", catError);
    } else if (categories) {
      console.log(`Found ${categories.length} categories`);
      for (const cat of categories) {
        const lastmod = formatDate(cat.updated_at);
        // Build readable URL: /categories/grade-1/math
        const gradeSlug = cat.grade.toLowerCase().replace(/\s+/g, "-");
        const subjectSlug = cat.subject.toLowerCase().replace(/\s+/g, "-");
        sitemap += buildUrlEntry(`${SITE_URL}/categories/${gradeSlug}/${subjectSlug}`, lastmod, "0.8", "weekly");
      }
    }

    // Fetch worksheet_subcategories for topic pages
    console.log("Fetching worksheet_subcategories for topic pages...");
    const { data: subcategories, error: subError } = await supabase
      .from("worksheet_subcategories")
      .select("id, updated_at")
      .eq("is_archived", false)
      .order("sort_order", { ascending: true });

    if (subError) {
      console.error("Error fetching subcategories:", subError);
    } else if (subcategories) {
      console.log(`Found ${subcategories.length} subcategories`);
      for (const sub of subcategories) {
        const lastmod = formatDate(sub.updated_at);
        sitemap += buildUrlEntry(`${SITE_URL}/subcategory/${sub.id}`, lastmod, "0.7", "weekly");
      }
    }

    // Fetch worksheets for detail pages
    console.log("Fetching worksheets...");
    const { data: worksheets, error: wsError } = await supabase
      .from("worksheets")
      .select("id, updated_at")
      .eq("is_archived", false)
      .order("created_at", { ascending: false });

    if (wsError) {
      console.error("Error fetching worksheets:", wsError);
    } else if (worksheets) {
      console.log(`Found ${worksheets.length} worksheets`);
      for (const ws of worksheets) {
        const lastmod = formatDate(ws.updated_at);
        sitemap += buildUrlEntry(`${SITE_URL}/worksheet/${ws.id}`, lastmod, "0.6", "monthly");
      }
    }

    // Close sitemap
    sitemap += `</urlset>`;

    console.log("Sitemap generated successfully");

    return new Response(sitemap, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
});
