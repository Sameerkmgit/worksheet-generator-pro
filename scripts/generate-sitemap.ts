/**
 * Pre-build script to fetch sitemap from Supabase edge function
 * and write it to public/sitemap.xml
 */

const EDGE_FUNCTION_URL = "https://sitalsldfenvtdjdgafg.supabase.co/functions/v1/sitemap";

async function generateSitemap() {
  console.log("📍 Fetching sitemap from edge function...");
  
  try {
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: "GET",
      headers: {
        "Accept": "application/xml",
      },
    });

    if (!response.ok) {
      throw new Error(`Edge function returned ${response.status}: ${response.statusText}`);
    }

    const xml = await response.text();
    
    // Validate XML starts correctly
    if (!xml.includes("<?xml") || !xml.includes("<urlset")) {
      throw new Error("Invalid sitemap XML received");
    }

    // Write to public folder using Deno or Node APIs
    const fs = await import("fs");
    const path = await import("path");
    
    const publicDir = path.resolve(process.cwd(), "public");
    const sitemapPath = path.join(publicDir, "sitemap.xml");
    
    fs.writeFileSync(sitemapPath, xml, "utf-8");
    
    console.log(`✅ Sitemap written to ${sitemapPath}`);
    console.log(`📊 Sitemap size: ${xml.length} bytes`);
    
    // Count URLs
    const urlCount = (xml.match(/<url>/g) || []).length;
    console.log(`🔗 Total URLs in sitemap: ${urlCount}`);
    
  } catch (error) {
    console.error("❌ Failed to generate sitemap:", error);
    process.exit(1);
  }
}

generateSitemap();
