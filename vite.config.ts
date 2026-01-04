import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

const SITEMAP_EDGE_URL = "https://sitalsldfenvtdjdgafg.supabase.co/functions/v1/sitemap";

/**
 * Vite plugin to fetch sitemap from edge function and write to public/sitemap.xml
 * Runs at build start to ensure fresh sitemap on every deploy
 */
function sitemapPlugin(): Plugin {
  return {
    name: "vite-plugin-sitemap",
    apply: "build",
    async buildStart() {
      console.log("📍 Fetching sitemap from edge function...");
      try {
        const response = await fetch(SITEMAP_EDGE_URL, {
          method: "GET",
          headers: { Accept: "application/xml" },
        });

        if (!response.ok) {
          throw new Error(`Edge function returned ${response.status}`);
        }

        const xml = await response.text();

        if (!xml.includes("<?xml") || !xml.includes("<urlset")) {
          throw new Error("Invalid sitemap XML received");
        }

        const sitemapPath = path.resolve(__dirname, "public/sitemap.xml");
        fs.writeFileSync(sitemapPath, xml, "utf-8");

        const urlCount = (xml.match(/<url>/g) || []).length;
        console.log(`✅ Sitemap written (${urlCount} URLs, ${xml.length} bytes)`);
      } catch (error) {
        console.error("❌ Sitemap generation failed:", error);
        // Don't fail build, just warn
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    sitemapPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
