/**
 * Vite plugin: Build-time SEO HTML injection
 * 
 * Fetches manual SEO overrides from Supabase at build time and generates
 * per-route HTML files with visible content injected into the root div.
 * React will replace this content on hydration, but crawlers/View Source
 * see real text instead of an empty <div id="root">.
 */
import type { Plugin } from "vite";
import path from "path";
import fs from "fs";

const SUPABASE_URL = "https://sitalsldfenvtdjdgafg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpdGFsc2xkZmVudnRkamRnYWZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1MjkxMTEsImV4cCI6MjA4MTEwNTExMX0.Wy-zLYtjOVXHEL1dDn1v6FavZV2xrT4P4iEaK-ZX6sY";
const SITE_URL = "https://www.wizkidshub.com";

interface SeoRecord {
  page_path: string;
  page_type: string;
  grade: string;
  subject: string;
  topic_slug: string | null;
  intro: string | null;
  key_skills_json: string[] | null;
  example_questions_json: string[] | null;
  how_to_use: string | null;
  what_kids_learn_json: string[] | null;
  practice_tips: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toTitleCase(str: string): string {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildSeoHtml(record: SeoRecord): string {
  const grade = `Grade ${record.grade}`;
  const subject = toTitleCase(record.subject);
  const topic = record.topic_slug
    ? toTitleCase(record.topic_slug.replace(/-/g, " "))
    : null;

  const heading = topic
    ? `${topic} Worksheets for ${grade} ${subject}`
    : `${grade} ${subject} Worksheets`;

  const parts: string[] = [];
  parts.push(`<article data-seo-prerender="true" style="max-width:900px;margin:0 auto;padding:2rem 1rem;font-family:system-ui,sans-serif;color:#333">`);
  parts.push(`<h1>${escapeHtml(heading)}</h1>`);

  if (record.intro) {
    parts.push(`<p>${escapeHtml(record.intro)}</p>`);
  }

  const bullets = record.page_type === "topic"
    ? record.what_kids_learn_json
    : record.key_skills_json;
  const bulletsTitle = record.page_type === "topic"
    ? "What Kids Will Learn"
    : `Key Skills in ${grade} ${subject}`;

  if (bullets && bullets.length > 0) {
    parts.push(`<h2>${escapeHtml(bulletsTitle)}</h2><ul>`);
    for (const item of bullets) {
      parts.push(`<li>${escapeHtml(item)}</li>`);
    }
    parts.push(`</ul>`);
  }

  if (record.example_questions_json && record.example_questions_json.length > 0) {
    parts.push(`<h2>Example Questions</h2><ol>`);
    for (const q of record.example_questions_json) {
      parts.push(`<li>${escapeHtml(q)}</li>`);
    }
    parts.push(`</ol>`);
  }

  const tips = record.page_type === "topic" ? record.practice_tips : record.how_to_use;
  const tipsTitle = record.page_type === "topic"
    ? "Practice Tips for Parents &amp; Teachers"
    : "How to Use These Worksheets";
  if (tips) {
    parts.push(`<h2>${tipsTitle}</h2><p>${escapeHtml(tips)}</p>`);
  }

  parts.push(`</article>`);
  return parts.join("\n");
}

function buildMetaTags(record: SeoRecord, canonicalUrl: string): string {
  const title = record.meta_title || "";
  const desc = record.meta_description || "";
  const tags: string[] = [];
  if (title) {
    tags.push(`<title>${escapeHtml(title)}</title>`);
    tags.push(`<meta property="og:title" content="${escapeHtml(title)}" />`);
  }
  if (desc) {
    tags.push(`<meta name="description" content="${escapeHtml(desc)}" />`);
    tags.push(`<meta property="og:description" content="${escapeHtml(desc)}" />`);
  }
  tags.push(`<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`);
  tags.push(`<meta name="robots" content="index, follow" />`);
  return tags.join("\n    ");
}

function buildJsonLd(record: SeoRecord, canonicalUrl: string): string {
  const grade = `Grade ${record.grade}`;
  const subject = toTitleCase(record.subject);
  const topic = record.topic_slug
    ? toTitleCase(record.topic_slug.replace(/-/g, " "))
    : null;

  const name = topic
    ? `${topic} Worksheets for ${grade} ${subject}`
    : `${grade} ${subject} Worksheets`;
  const desc = record.meta_description || record.intro || "";

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description: desc,
    url: canonicalUrl,
    isPartOf: { "@type": "WebSite", name: "WizKidsHub", url: SITE_URL },
    about: {
      "@type": "Course",
      name: `${grade} ${subject}`,
      educationalLevel: grade,
    },
  };

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

export default function seoInjectPlugin(): Plugin {
  return {
    name: "vite-plugin-seo-inject",
    apply: "build",
    async closeBundle() {
      console.log("📍 SEO inject: fetching overrides...");
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/seo_page_overrides?is_active=eq.true&select=*`,
          {
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            },
          }
        );

        if (!res.ok) {
          console.error(`SEO inject: API returned ${res.status}`);
          return;
        }

        const records: SeoRecord[] = await res.json();
        console.log(`SEO inject: ${records.length} overrides found`);

        if (records.length === 0) return;

        const distDir = path.resolve(process.cwd(), "dist");
        const baseHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

        for (const record of records) {
          const routePath = record.page_path; // e.g. /categories/grade-1/math
          const filePath = path.join(distDir, routePath, "index.html");
          const canonicalUrl = `${SITE_URL}${routePath}`;

          // Build SEO content
          const seoBlock = buildSeoHtml(record);
          const metaTags = buildMetaTags(record, canonicalUrl);
          const jsonLd = buildJsonLd(record, canonicalUrl);

          // Inject into HTML
          let html = baseHtml;

          // Replace the static <title> in head with page-specific meta
          html = html.replace(
            /<title>.*?<\/title>/,
            metaTags
          );

          // Inject JSON-LD before </head>
          html = html.replace("</head>", `    ${jsonLd}\n  </head>`);

          // Inject SEO content inside <div id="root">
          html = html.replace(
            '<div id="root"></div>',
            `<div id="root">${seoBlock}</div>`
          );

          // Write the file
          const dir = path.dirname(filePath);
          fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(filePath, html, "utf-8");
          console.log(`  ✅ ${routePath}/index.html`);
        }

        console.log(`SEO inject: ${records.length} pages generated`);
      } catch (err) {
        console.error("SEO inject failed:", err);
      }
    },
  };
}
