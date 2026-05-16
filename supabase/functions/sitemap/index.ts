import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SITE_URL = "https://www.wizkidshub.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/xml; charset=utf-8",
};

function formatDate(dateString: string | null): string | null {
  if (!dateString) return null;
  try {
    return new Date(dateString).toISOString().split("T")[0];
  } catch {
    return null;
  }
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildUrlEntry(loc: string, lastmod?: string | null, priority?: string, changefreq?: string): string {
  let entry = `  <url>\n    <loc>${escapeXml(loc)}</loc>\n`;
  if (lastmod) entry += `    <lastmod>${lastmod}</lastmod>\n`;
  if (changefreq) entry += `    <changefreq>${changefreq}</changefreq>\n`;
  if (priority) entry += `    <priority>${priority}</priority>\n`;
  entry += `  </url>\n`;
  return entry;
}

function toSubjectSlug(subject: string): string {
  return subject.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Generating sitemap...");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static pages
    sitemap += buildUrlEntry(`${SITE_URL}/`, null, "1.0", "daily");
    sitemap += buildUrlEntry(`${SITE_URL}/packs`, null, "0.9", "weekly");
    sitemap += buildUrlEntry(`${SITE_URL}/worksheets`, null, "0.9", "weekly");
    sitemap += buildUrlEntry(`${SITE_URL}/privacy-policy`, null, "0.3", "yearly");
    sitemap += buildUrlEntry(`${SITE_URL}/terms-of-service`, null, "0.3", "yearly");
    sitemap += buildUrlEntry(`${SITE_URL}/about`, null, "0.5", "monthly");
    sitemap += buildUrlEntry(`${SITE_URL}/support`, null, "0.3", "yearly");
    sitemap += buildUrlEntry(`${SITE_URL}/disclaimer`, null, "0.3", "yearly");

    // Blog
    sitemap += buildUrlEntry(`${SITE_URL}/blog`, null, "0.7", "weekly");
    const blogSlugs = [
      "grade-1-addition-at-home",
      "top-english-worksheets-grade-2",
      "printable-vs-screen-time",
      "wizkidshub-in-classroom",
      "grade-3-science-plants-animals",
      "math-confidence-grade-4-5",
    ];
    for (const slug of blogSlugs) {
      sitemap += buildUrlEntry(`${SITE_URL}/blog/${slug}`, null, "0.7", "monthly");
    }

    // Grade pages
    const grades = ["grade-1", "grade-2", "grade-3", "grade-4", "grade-5"];
    for (const grade of grades) {
      sitemap += buildUrlEntry(`${SITE_URL}/categories/${grade}`, null, "0.8", "weekly");
    }

    // Assignments landing pages (one per grade)
    for (const grade of grades) {
      sitemap += buildUrlEntry(`${SITE_URL}/assignments/${grade}`, null, "0.6", "weekly");
    }

    // Subject pages
    console.log("Fetching worksheet_categories...");
    const { data: categories, error: catError } = await supabase
      .from("worksheet_categories")
      .select("id, grade, subject, updated_at")
      .order("sort_order", { ascending: true });

    if (catError) console.error("Error fetching categories:", catError);
    
    // Build a lookup: category_id → { grade, subject }
    const catLookup: Record<string, { grade: string; subject: string }> = {};
    if (categories) {
      for (const cat of categories) {
        const gradeSlug = `grade-${cat.grade}`;
        const subjectSlug = toSubjectSlug(cat.subject);
        const lastmod = formatDate(cat.updated_at);
        sitemap += buildUrlEntry(`${SITE_URL}/categories/${gradeSlug}/${subjectSlug}`, lastmod, "0.8", "weekly");
        catLookup[cat.id] = { grade: cat.grade, subject: cat.subject };
      }
    }

    // Topic pages — readable URLs, only include topics with ≥3 worksheets
    console.log("Fetching subcategories with worksheet counts...");
    const { data: subcategories, error: subError } = await supabase
      .from("worksheet_subcategories")
      .select("id, slug, category_id, updated_at")
      .eq("is_archived", false)
      .order("sort_order", { ascending: true });

    if (subError) console.error("Error fetching subcategories:", subError);

    if (subcategories) {
      for (const sub of subcategories) {
        const cat = catLookup[sub.category_id];
        if (!cat) continue;

        // Check worksheet count for this topic
        const { count } = await supabase
          .from("worksheets")
          .select("*", { count: "exact", head: true })
          .eq("subcategory_id", sub.id)
          .eq("is_archived", false);

        // Only include in sitemap if ≥3 worksheets
        if ((count || 0) >= 3) {
          const gradeSlug = `grade-${cat.grade}`;
          const subjectSlug = toSubjectSlug(cat.subject);
          const lastmod = formatDate(sub.updated_at);
          sitemap += buildUrlEntry(
            `${SITE_URL}/categories/${gradeSlug}/${subjectSlug}/${sub.slug}`,
            lastmod,
            "0.7",
            "weekly"
          );
        }
      }
    }

    // Worksheet detail pages — use slugs
    console.log("Fetching worksheets...");
    const { data: worksheets, error: wsError } = await supabase
      .from("worksheets")
      .select("id, slug, updated_at")
      .eq("is_archived", false)
      .order("created_at", { ascending: false });

    if (wsError) console.error("Error fetching worksheets:", wsError);
    if (worksheets) {
      for (const ws of worksheets) {
        const lastmod = formatDate(ws.updated_at);
        const wsPath = ws.slug || ws.id;
        sitemap += buildUrlEntry(`${SITE_URL}/worksheet/${wsPath}`, lastmod, "0.6", "monthly");
      }
    }

    sitemap += `</urlset>`;
    console.log("Sitemap generated successfully");

    return new Response(sitemap, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      { status: 500, headers: corsHeaders }
    );
  }
});
