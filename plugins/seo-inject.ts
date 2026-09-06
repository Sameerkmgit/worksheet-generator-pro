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

interface StaticSeoPage {
  path: string;
  title: string;
  description: string;
  heading: string;
  sections: Array<{ heading: string; body: string }>;
}

const STATIC_SEO_PAGES: StaticSeoPage[] = [
  {
    path: "/",
    title: "Free Printable Worksheets for Grades 1-5 | WizKidsHub",
    description: "Download free printable Math, English, Science, and Computer Science worksheets for Grades 1 to 5. No sign-up required.",
    heading: "Free Printable Worksheets for Grades 1-5",
    sections: [
      {
        heading: "Printable practice for home and classroom",
        body: "WizKidsHub provides free educational worksheets for primary school students. Parents and teachers can browse by grade, subject, and topic to find printable PDF practice for everyday learning.",
      },
      {
        heading: "Organized by grade and subject",
        body: "The library includes Math, English, Science, Computer Science, and assignment resources for Grades 1 through 5, with clear paths to worksheet details and grade collections.",
      },
    ],
  },
  {
    path: "/worksheets",
    title: "Browse Free Printable Worksheets - Grades 1-5 | WizKidsHub",
    description: "Browse free printable worksheets for Grades 1-5. Filter by grade, subject, and topic to find PDF practice for kids.",
    heading: "Browse Free Printable Worksheets",
    sections: [
      {
        heading: "Worksheet browser",
        body: "Use the worksheet browser to explore printable learning resources by grade, subject, difficulty, and keyword. Each result links to a worksheet detail page with more information.",
      },
    ],
  },
  {
    path: "/packs",
    title: "Free Worksheet Packs PDF for Grades 1-5 | WizKidsHub",
    description: "Download free worksheet packs for Grades 1-5. Each pack groups carefully selected printable worksheets in PDF format.",
    heading: "Free Worksheet Packs",
    sections: [
      {
        heading: "Curated printable packs",
        body: "Worksheet packs group selected PDFs by grade so parents and teachers can quickly download a focused set of practice materials after choosing a pack.",
      },
    ],
  },
  {
    path: "/blog",
    title: "Learning Tips & Worksheet Guides | WizKidsHub Blog",
    description: "Learning tips, teaching strategies, and worksheet guides for parents and teachers helping Grade 1-5 students.",
    heading: "Learning Tips & Blog",
    sections: [
      {
        heading: "Guides for parents and teachers",
        body: "The WizKidsHub blog shares practical learning tips, worksheet ideas, and teaching guidance for Math, English, Science, and early grade practice.",
      },
    ],
  },
  {
    path: "/about",
    title: "About Us - Free Printable Worksheets | WizKidsHub",
    description: "Learn about WizKidsHub, a free printable worksheet library for Grades 1-5 covering Math, English, Science, and Computer Science.",
    heading: "About WizKidsHub",
    sections: [
      {
        heading: "Our purpose",
        body: "WizKidsHub helps families, tutors, and teachers find free printable worksheets for primary school practice without requiring account registration.",
      },
    ],
  },
  {
    path: "/support",
    title: "Contact & Support | WizKidsHub",
    description: "Contact WizKidsHub with worksheet questions, feedback, or support requests about free printable educational resources.",
    heading: "Contact & Support",
    sections: [
      {
        heading: "Get in touch",
        body: "The support page gives visitors a clear way to contact WizKidsHub about worksheet resources, feedback, and website questions.",
      },
    ],
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy | WizKidsHub",
    description: "Read the WizKidsHub privacy policy, including information about cookies, analytics, and third-party advertising.",
    heading: "Privacy Policy",
    sections: [
      {
        heading: "Privacy and advertising",
        body: "The privacy policy explains how WizKidsHub uses basic website data, cookies, analytics, and third-party advertising services including Google AdSense.",
      },
    ],
  },
  {
    path: "/terms-of-service",
    title: "Terms of Service | WizKidsHub",
    description: "Read the WizKidsHub terms of service for using free printable educational worksheets and website materials.",
    heading: "Terms of Service",
    sections: [
      {
        heading: "Using WizKidsHub",
        body: "The terms explain permitted use of WizKidsHub worksheet resources, including personal, home, and classroom use of printable materials.",
      },
    ],
  },
  {
    path: "/disclaimer",
    title: "Disclaimer | WizKidsHub",
    description: "Read the WizKidsHub disclaimer about the educational purpose, accuracy, and intended use of our free printable worksheets.",
    heading: "Disclaimer",
    sections: [
      {
        heading: "Educational purpose",
        body: "WizKidsHub worksheets are supplementary practice materials. They support classroom teaching and home learning but are not a replacement for a formal school curriculum.",
      },
      {
        heading: "Accuracy and suitability",
        body: "Content is prepared with care, but parents and educators should review each worksheet for accuracy and suitability before giving it to a child.",
      },
    ],
  },
];

// Grade collection pages: /categories/grade-1 ... /categories/grade-5
const GRADE_INTROS: Record<string, string> = {
  "1": "Grade 1 worksheets build early number sense, phonics, handwriting, and first science observations through short, focused printable practice.",
  "2": "Grade 2 worksheets strengthen addition and subtraction with regrouping, reading fluency, paragraph writing, and hands-on science topics.",
  "3": "Grade 3 worksheets cover multiplication, division, fractions, reading comprehension, essay basics, and guided science investigations.",
  "4": "Grade 4 worksheets practise multi-digit multiplication and division, fractions and decimals, longer writing tasks, and energy and body science.",
  "5": "Grade 5 worksheets prepare students for middle school with fraction and decimal operations, literary analysis, and space and matter science.",
};

function buildGradePages(): StaticSeoPage[] {
  return ["1", "2", "3", "4", "5"].map((g) => ({
    path: `/categories/grade-${g}`,
    title: `Grade ${g} Worksheets – Free Printable PDFs | WizKidsHub`,
    description: `Download free Grade ${g} printable worksheets in Math, English, and Science. Curriculum-aligned PDFs for home and classroom use.`,
    heading: `Grade ${g} Worksheets`,
    sections: [
      {
        heading: `What Grade ${g} students learn`,
        body: GRADE_INTROS[g],
      },
      {
        heading: "Browse by subject",
        body: `Grade ${g} worksheets are organised into Math, English, Science, Computer Science, and Assignments collections, each with topic pages and printable PDF worksheets.`,
      },
    ],
  }));
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

function buildStaticSeoHtml(page: StaticSeoPage): string {
  const parts: string[] = [];
  parts.push(`<article data-seo-prerender="true" style="max-width:900px;margin:0 auto;padding:2rem 1rem;font-family:system-ui,sans-serif;color:#333">`);
  parts.push(`<h1>${escapeHtml(page.heading)}</h1>`);
  parts.push(`<p>${escapeHtml(page.description)}</p>`);

  for (const section of page.sections) {
    parts.push(`<h2>${escapeHtml(section.heading)}</h2>`);
    parts.push(`<p>${escapeHtml(section.body)}</p>`);
  }

  parts.push(`</article>`);
  return parts.join("\n");
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

function buildStaticJsonLd(page: StaticSeoPage, canonicalUrl: string): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": page.path === "/blog" ? "Blog" : "WebPage",
    name: page.heading,
    description: page.description,
    url: canonicalUrl,
    isPartOf: { "@type": "WebSite", name: "WizKidsHub", url: SITE_URL },
  };

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function writeRouteHtml(distDir: string, routePath: string, html: string) {
  const filePath = routePath === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, routePath, "index.html");
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, html, "utf-8");
}

function injectHtml(baseHtml: string, metaTags: string, jsonLd: string, seoBlock: string): string {
  let html = baseHtml;
  html = html.replace(/<title>.*?<\/title>/, metaTags);
  html = html.replace("</head>", `    ${jsonLd}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${seoBlock}</div>`);
  return html;
}

function generateStaticPages(distDir: string, baseHtml: string, pages: StaticSeoPage[]) {
  for (const page of pages) {
    const canonicalUrl = `${SITE_URL}${page.path === "/" ? "" : page.path}`;
    const metaTags = buildMetaTags(
      {
        page_path: page.path,
        page_type: "static",
        grade: "",
        subject: "",
        topic_slug: null,
        intro: null,
        key_skills_json: null,
        example_questions_json: null,
        how_to_use: null,
        what_kids_learn_json: null,
        practice_tips: null,
        meta_title: page.title,
        meta_description: page.description,
      },
      canonicalUrl
    );
    const html = injectHtml(
      baseHtml,
      metaTags,
      buildStaticJsonLd(page, canonicalUrl),
      buildStaticSeoHtml(page)
    );
    writeRouteHtml(distDir, page.path, html);
    console.log(`  static ${page.path === "/" ? "/index.html" : `${page.path}/index.html`}`);
  }
}

interface WorksheetRecord {
  id: string;
  slug: string | null;
  title: string | null;
  grade: string | null;
  subject: string | null;
}

async function generateWorksheetPages(distDir: string, baseHtml: string) {
  const all: WorksheetRecord[] = [];
  const pageSize = 1000;
  for (let offset = 0; ; offset += pageSize) {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/worksheets?is_archived=eq.false&select=id,slug,title,grade,subject&order=id.asc&limit=${pageSize}&offset=${offset}`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );
    if (!res.ok) {
      console.error(`SEO inject: worksheets API returned ${res.status}`);
      return;
    }
    const batch = (await res.json()) as WorksheetRecord[];
    all.push(...batch);
    if (batch.length < pageSize) break;
  }

  let written = 0;
  for (const w of all) {
    const rawTitle = (w.title || "").trim();
    if (!rawTitle) continue;
    const gradeNum = (w.grade || "").toString().replace("Grade ", "").trim();
    const subject = toTitleCase((w.subject || "").toString());
    const topicName = rawTitle.split("–")[0]?.replace(/\([^)]*\)/g, "").trim() || rawTitle;
    const canonicalPath = `/worksheet/${w.slug || w.id}`;
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;
    const title = `${rawTitle} | WizKidsHub`;
    const description = `Download this free printable ${topicName} worksheet for Grade ${gradeNum} ${subject}. Perfect for practice, homework, and classroom use.`;

    const metaTags = [
      `<title>${escapeHtml(title)}</title>`,
      `<meta name="description" content="${escapeHtml(description)}" />`,
      `<meta property="og:title" content="${escapeHtml(title)}" />`,
      `<meta property="og:description" content="${escapeHtml(description)}" />`,
      `<meta property="og:type" content="article" />`,
      `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
      `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
      `<meta name="robots" content="index, follow" />`,
    ].join("\n    ");

    const jsonLd = `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalResource",
      name: rawTitle,
      description,
      educationalLevel: `Grade ${gradeNum}`,
      learningResourceType: "Worksheet",
      isAccessibleForFree: true,
      inLanguage: "en",
      url: canonicalUrl,
      about: subject,
      encodingFormat: "application/pdf",
      publisher: {
        "@type": "Organization",
        name: "WizKidsHub Worksheets",
        url: SITE_URL,
      },
    })}</script>`;

    const seoBlock = [
      `<article data-seo-prerender="true" style="max-width:900px;margin:0 auto;padding:2rem 1rem;font-family:system-ui,sans-serif;color:#333">`,
      `<h1>${escapeHtml(rawTitle)}</h1>`,
      `<p>${escapeHtml(description)}</p>`,
      `<h2>Grade ${escapeHtml(gradeNum)} ${escapeHtml(subject)} practice</h2>`,
      `<p>${escapeHtml(`This printable ${topicName} worksheet is part of the free WizKidsHub Grade ${gradeNum} ${subject} collection. Print it at home or in the classroom for extra practice.`)}</p>`,
      `</article>`,
    ].join("\n");

    const html = injectHtml(baseHtml, metaTags, jsonLd, seoBlock);

    // Canonical (slug) URL
    writeRouteHtml(distDir, canonicalPath, html);
    written++;

    // Numeric-id URL: same head, canonical still points at the slug page
    if (w.slug && w.id && `/worksheet/${w.id}` !== canonicalPath) {
      writeRouteHtml(distDir, `/worksheet/${w.id}`, html);
      written++;
    }
  }

  console.log(`SEO inject: ${written} worksheet pages generated`);
}

export default function seoInjectPlugin(): Plugin {
  return {
    name: "vite-plugin-seo-inject",
    apply: "build",
    async closeBundle() {
      console.log("📍 SEO inject: fetching overrides...");
      try {
        const distDir = path.resolve(process.cwd(), "dist");
        const baseHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

        console.log(`SEO inject: generating ${STATIC_SEO_PAGES.length} static public pages`);
        generateStaticPages(distDir, baseHtml);

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

        const records: SeoRecord[] = (await res.json()) as SeoRecord[];
        console.log(`SEO inject: ${records.length} overrides found`);

        if (records.length === 0) return;

        for (const record of records) {
          const routePath = record.page_path; // e.g. /categories/grade-1/math
          const canonicalUrl = `${SITE_URL}${routePath}`;

          // Build SEO content
          const seoBlock = buildSeoHtml(record);
          const metaTags = buildMetaTags(record, canonicalUrl);
          const jsonLd = buildJsonLd(record, canonicalUrl);

          // Inject into HTML
          const html = injectHtml(baseHtml, metaTags, jsonLd, seoBlock);

          // Write the file
          writeRouteHtml(distDir, routePath, html);
          console.log(`  ✅ ${routePath}/index.html`);
        }

        console.log(`SEO inject: ${records.length} pages generated`);
      } catch (err) {
        console.error("SEO inject failed:", err);
      }
    },
  };
}
