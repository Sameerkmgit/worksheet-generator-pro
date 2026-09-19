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
        heading: "Printable practice written for primary classrooms and kitchen tables",
        body: "WizKidsHub is a free library of printable worksheets for children in Grades 1 to 5. Every sheet is organised by grade, subject and topic, so a parent who wants ten minutes of multiplication practice before dinner, or a teacher who needs a phonics revision sheet for Monday morning, can find it in two or three clicks. There is no account to create, no trial period and no watermark on the printable pages. Each worksheet page also explains what the sheet teaches, where children usually get stuck, and how an adult can help without simply giving away the answer.",
      },
      {
        heading: "How the library is organised",
        body: "The collection is split by grade first, because a Grade 2 child and a Grade 5 child need very different practice even inside the same subject. Within each grade you will find Math, English, Science, Computer Science and mixed assignment sheets. Each subject then opens into topic collections such as addition with regrouping, fractions, phonics, vocabulary, reading comprehension, shapes, time and money, plants and animals, the human body, and computer basics. Topic pages group every worksheet on that skill in order, from the gentlest introduction to the more demanding practice, so you can work through a skill in sequence rather than hunting for a suitable next step.",
      },
      {
        heading: "What makes a good practice sheet",
        body: "A worksheet works when it does one job well. Our Math sheets keep a single skill in focus, so a child practising carrying tens is not also wrestling with word-problem language at the same time. English sheets separate decoding from comprehension, because a child who can read every word aloud may still not be able to say what a paragraph was about. Science sheets ask for observation and explanation rather than recall of isolated facts. Where a topic has a predictable trap, such as adding the denominators when adding fractions or treating clock time like ordinary numbers, the worksheet page names that trap so the adult supervising knows what to watch for.",
      },
      {
        heading: "Using worksheets at home",
        body: "Short and frequent beats long and rare. Fifteen focused minutes, four times a week, does more for a Grade 3 reader than an hour of Sunday catch-up. Print two sheets rather than ten, let the child finish something, and stop while confidence is still high. When a mistake appears, ask the child to talk you through the step rather than marking it wrong straight away; most errors in primary practice are procedural slips rather than gaps in understanding, and hearing the reasoning aloud usually reveals which it is.",
      },
      {
        heading: "Using worksheets in the classroom",
        body: "Teachers and tutors are welcome to print and photocopy these sheets for their own classes. They work well as bell-ringer starters, as differentiated practice for groups moving at different speeds, as homework that parents can actually help with, and as quick diagnostic checks before starting a new unit. Because sheets on the same topic are numbered in order, it is straightforward to give one group the earlier sheets while another group moves ahead.",
      },
      {
        heading: "Free, and free to print",
        body: "Everything on WizKidsHub is free for personal, home and classroom use. There are no downloads counted against you, no email wall in front of a PDF and no paid tier holding back the better material. The library is added to regularly, and the support page is the fastest way to ask for a topic that is missing or to report a sheet with a problem.",
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
        heading: "Every worksheet in one place",
        body: "This page lists the full WizKidsHub library and lets you narrow it down by grade, subject and keyword. If you already know what you need, typing a topic such as fractions, phonics, telling time or plants will bring back every matching sheet across the grades. If you are browsing, start with the grade filter and then pick a subject, which is usually the quickest route to something a child can start straight away.",
      },
      {
        heading: "Choosing the right level",
        body: "Grade labels describe the level the sheet was written for, not a rule. A confident Grade 2 reader may be ready for Grade 3 comprehension, while a child who has just moved schools may need to revisit earlier number work before fractions make sense. The safest approach is to print one sheet slightly below where you think the child is. If it is finished quickly and correctly, move up; if it takes real effort, you have found the right place to practise.",
      },
      {
        heading: "What you get on each worksheet page",
        body: "Opening a worksheet shows a preview of the printable PDF along with a short explanation of the skill it practises, the learning objectives behind it, sample questions taken from the sheet itself, guidance for the adult supervising, and answers to the questions parents most often ask about that topic. From there you can print, download, or jump to related worksheets on the same skill.",
      },
      {
        heading: "Subjects covered",
        body: "Math runs from counting, number sense and shapes in the early grades through addition and subtraction with regrouping, multiplication and division, fractions, decimals, measurement, time and money. English covers phonics, handwriting, grammar, punctuation, vocabulary, sentence and paragraph writing, and reading comprehension. Science covers plants and animals, the human body, food and water, materials, the environment, weather and simple physical science. Computer Science introduces parts of a computer, input and output devices, basic software use, and safe behaviour online.",
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
        heading: "A grade's practice in one download",
        body: "Worksheet packs collect a set of printable sheets for a single grade into one PDF, so you can download once and have a fortnight of practice ready to print. Each pack mixes subjects deliberately: number work, reading and writing, and a science or computer topic, which keeps a child from spending every session on the same skill and losing interest in it.",
      },
      {
        heading: "When a pack is the better choice",
        body: "Packs suit school holidays, long journeys, and the weeks before an assessment when you want steady revision rather than a specific skill drill. They are also useful for tutors planning ahead, and for families with limited internet time who would rather download once and print as needed. If you need practice on one particular skill instead, the topic pages in the worksheet browser are a better starting point.",
      },
      {
        heading: "How to use a pack",
        body: "Print the first few pages rather than the whole pack, and work through them in order; the sheets are sequenced so earlier pages prepare a child for later ones. Keep completed sheets together so both you and the child can see progress accumulating. Packs are free to print for home and classroom use.",
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
        heading: "Practical guidance, not general advice",
        body: "The WizKidsHub blog is written for the adult sitting next to the child. Articles work through the situations that actually come up in primary learning: a child who reads fluently but cannot summarise, a child who knows the times tables but freezes on word problems, handwriting that falls apart as soon as speed increases, and the point in Grade 4 where fractions stop being pictures and start being arithmetic.",
      },
      {
        heading: "What the articles cover",
        body: "Topics include building a home practice routine that survives a busy week, spotting the difference between a careless slip and a genuine misunderstanding, teaching phonics without confusing a child who is already guessing from pictures, helping with multiplication when carried digits go missing, making reading comprehension questions less intimidating, and choosing the right worksheet level so practice feels achievable rather than punishing.",
      },
      {
        heading: "Written from classroom experience",
        body: "Each article explains the underlying reason a child struggles with a skill before offering what to do about it, because the same wrong answer can have several different causes and the useful response depends on which one it is. Where a worksheet on the site fits the advice, the article links to it directly so you can move from reading to practising in one step.",
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
        heading: "Why the site exists",
        body: "WizKidsHub began with a simple frustration: searching for a printable worksheet usually leads to sites that ask for an email address, watermark the page, lock the useful sheets behind a subscription, or bury one usable PDF under a pile of adverts. This library was built to be the opposite. Pick a grade, pick a topic, print the sheet. Nothing to join, nothing to pay, nothing to unsubscribe from later.",
      },
      {
        heading: "What we publish",
        body: "The library covers Math, English, Science, Computer Science and mixed assignments for Grades 1 to 5, organised into topic collections and numbered in teaching order. Alongside each printable PDF we write the supporting material an adult actually needs: what the sheet is practising, the mistakes children typically make on it, sample questions from the sheet itself, and short answers to the questions parents ask most about that topic.",
      },
      {
        heading: "How worksheets are prepared",
        body: "Sheets are grouped by skill rather than by page count, so a topic collection moves from an accessible first sheet to more demanding practice. Wording is kept short and plain, because a child who cannot read the instruction cannot show what they know about the mathematics. Layouts leave room to work on the page, and each sheet stays on one skill so a mistake tells you something specific rather than leaving you guessing.",
      },
      {
        heading: "Who it is for",
        body: "Parents supporting homework, tutors planning sessions, teachers who need differentiated practice quickly, and families homeschooling all use the same library. Because everything is printable PDF, it works equally well for a child who should be away from a screen and for a classroom with a single shared printer.",
      },
      {
        heading: "Feedback and corrections",
        body: "The collection grows in response to what visitors ask for. If a topic is missing, a sheet has an error, or the level looks wrong for the grade it sits under, the support page reaches us directly and those messages shape what gets published next.",
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
        heading: "How to reach us",
        body: "The support form on this page is the direct way to contact WizKidsHub. It is read by a person, and messages about broken downloads, mistakes on a worksheet, or a topic that is missing from a grade are the ones acted on fastest. Please describe the grade, subject and worksheet title where you can, since that makes a problem far quicker to locate and fix.",
      },
      {
        heading: "What we can help with",
        body: "Common requests include a PDF that will not open or print, a worksheet that seems pitched at the wrong grade, a request for more practice on a particular skill, questions about using the sheets in a classroom or tuition centre, and permission questions about printing and photocopying. Printing and copying for home, classroom and tuition use is already allowed, so no request is needed for that.",
      },
      {
        heading: "Privacy when you write to us",
        body: "Only send what is needed to answer your question. Please do not include a child's full name, school details, photographs or any other personal information in a support message, and never send payment details, since nothing on WizKidsHub is sold. Messages are used solely to reply and to improve the worksheet library.",
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
        heading: "What this policy covers",
        body: "This policy explains what information WizKidsHub collects when you visit the site, why it is collected, and the choices you have. The worksheet library can be browsed, printed and downloaded without creating an account, so in normal use you are never asked for your name, address or any other personal detail.",
      },
      {
        heading: "Analytics and cookies",
        body: "Like most websites, WizKidsHub records basic technical information such as the pages viewed, the approximate region a visit came from, the browser and device type, and the referring site. This is used in aggregate to understand which worksheets are useful and where the library has gaps. Cookies support this measurement and can be blocked or deleted in your browser settings; the worksheet library continues to work if you do.",
      },
      {
        heading: "Advertising",
        body: "Third-party advertising, including Google AdSense, may be shown on the site, and those providers may use cookies to measure ad performance and, where permitted, to personalise the ads you see. Personalised advertising can be turned off through Google Ads Settings, and further industry opt-out choices are available through AboutAds.info. These choices are stored per browser and per device.",
      },
      {
        heading: "Children's privacy",
        body: "The worksheets are for children, but the site is intended to be chosen and supervised by a parent, guardian or teacher. Children are never asked to register or to submit personal information, and we do not knowingly collect names, email addresses or precise locations from children under 13. If you believe a child has sent us personal information through the support form, contact us and we will review and delete it.",
      },
      {
        heading: "Contact",
        body: "Privacy questions and deletion requests can be sent through the WizKidsHub support page. The full policy text, including how information is used and how changes to this policy are published, is shown on this page once it loads.",
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
        heading: "Using the worksheet library",
        body: "WizKidsHub worksheets are free to download, print and photocopy for personal, family, classroom and tuition use. You may hand printed copies to the children you teach or care for, and use them in lessons and homework. What is not permitted is reselling the sheets, republishing them on another website or app as your own, or bundling them into a paid product.",
      },
      {
        heading: "Availability and changes",
        body: "The library is added to and corrected regularly, so individual worksheets may be revised, renumbered or withdrawn. The site is provided as it is, and while we work to keep it available and accurate, we cannot guarantee uninterrupted access or that every sheet is free of error.",
      },
      {
        heading: "Educational responsibility",
        body: "Worksheets are supplementary practice, not a curriculum. Adults should review a sheet before giving it to a child to confirm the level and content suit that particular learner. Decisions about a child's learning remain with the parent, guardian or teacher.",
      },
      {
        heading: "Third-party content",
        body: "The site uses third-party services for analytics and advertising, and worksheet PDFs may be delivered or previewed through third-party file services. Those providers operate under their own terms and privacy policies.",
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
        body: "WizKidsHub worksheets are supplementary practice materials. They are written to reinforce skills a child is already meeting at school or at home, and they do not replace a formal school curriculum, a qualified teacher, or professional assessment of a child's learning needs.",
      },
      {
        heading: "Accuracy and suitability",
        body: "Worksheets and the guidance around them are prepared with care, but errors can survive review, and a sheet that suits one child in a grade may be too easy or too hard for another. Parents and educators should read a worksheet before giving it to a child, and use their own judgement about level, content and timing. Mistakes reported through the support page are corrected.",
      },
      {
        heading: "No professional advice",
        body: "Nothing on this site is educational, psychological or medical advice. If you are concerned about a child's reading, numeracy, attention or development, speak to the child's teacher or to a qualified specialist rather than relying on practice sheets to resolve it.",
      },
      {
        heading: "External links and advertising",
        body: "Pages may link to third-party websites and may display advertising served by third parties. WizKidsHub does not control that content and is not responsible for it. Adults should supervise children's browsing, as with any website.",
      },
    ],
  },
];

// Grade collection pages: /categories/grade-1 ... /categories/grade-5
interface GradeDetail {
  learn: string;
  math: string;
  english: string;
  science: string;
  computing: string;
  struggles: string;
  routine: string;
}

const GRADE_DETAILS: Record<string, GradeDetail> = {
  "1": {
    learn: "Grade 1 is the year formal practice begins. Children move from recognising numbers to using them, from naming letters to blending them into words, and from listening to stories to reading short ones themselves. Progress is uneven by nature: a child may count confidently to a hundred on Monday and lose track at the teens on Wednesday. Short, frequent practice suits this age far better than long sessions.",
    math: "Number sense comes first: counting forwards and backwards, comparing quantities, and understanding that the 2 in 25 means two tens. Addition and subtraction stay within twenty, usually with counters, fingers or a number line still allowed. Children meet flat and solid shapes, simple patterns, non-standard measurement, the hour and half hour on a clock, and coins used in small totals.",
    english: "Phonics dominates: single letter sounds, consonant blends, digraphs such as sh and ch, and the first look at how a silent e changes a vowel. Alongside decoding, children practise letter formation, capital letters and full stops, sight words, and writing a complete sentence that someone else can read.",
    science: "Science in Grade 1 is observation. Children compare living and non-living things, name the parts of a plant, sort animals by where they live and what they eat, learn what a body needs to stay healthy, and notice weather and seasons changing around them.",
    computing: "Computer work starts with the physical machine: naming the monitor, keyboard and mouse, understanding what input and output mean, switching a device on and off properly, and the first rules about asking an adult before using one.",
    struggles: "Reversed letters and digits are normal at this age and usually resolve with practice. The two genuine sticking points are counting on from a number rather than restarting at one, and guessing a word from the picture instead of sounding it out. Both are worth catching early, because both get harder to unlearn in Grade 2.",
    routine: "Ten to fifteen minutes is plenty. One number sheet and one phonics sheet, finished and praised, beats a stack half done. Let the child read the instruction aloud so you know whether a wrong answer came from the skill or from the words describing it.",
  },
  "2": {
    learn: "Grade 2 is where methods replace counting. Children start adding and subtracting two-digit numbers on paper, read for meaning rather than only decoding, and write several connected sentences. The jump in expectation is larger than it looks, and this is often the year a parent first notices a gap.",
    math: "Addition and subtraction move to two and three digits with regrouping, which is the year's central skill. Children meet equal groups and repeated addition as the beginning of multiplication, halves and quarters as first fractions, standard units of length and mass, time to five minutes, and money problems needing change.",
    english: "Phonics continues with long vowel patterns, r-controlled vowels and common suffixes, while attention shifts towards comprehension: answering questions about a passage, retelling a story in order, and finding a word's meaning from the sentence around it. Writing grows to a short paragraph with consistent tense and correct sentence punctuation.",
    science: "Children compare life cycles, look at habitats and simple food chains, sort materials by their properties, explore where water comes from and why it must be kept clean, and start recording what they observe rather than just describing it.",
    computing: "Work moves onto the screen: using a mouse and keyboard with intent, opening and saving a file, typing and formatting a few lines, recognising common icons, and following simple rules about screen time and privacy.",
    struggles: "Regrouping is where most Grade 2 errors live, and the usual cause is columns drifting out of line rather than a misunderstanding of tens. In reading, children who answer comprehension questions from memory instead of returning to the text need to be shown that going back to look is allowed and expected.",
    routine: "Twenty minutes, four or five times a week. Ask the child to explain one answer aloud each session. In subtraction with borrowing, watch the working rather than only the final number, because the slip is nearly always visible mid-calculation.",
  },
  "3": {
    learn: "Grade 3 brings multiplication, division and the first real fractions, and reading shifts from learning to read towards reading to learn. Children are expected to hold a method in mind across several steps, which is a genuine change in demand and the reason Grade 3 practice benefits most from an adult nearby.",
    math: "Multiplication tables and division facts become the backbone, used in area, arrays and word problems. Fractions arrive properly as parts of a whole and as points on a number line. Children also work with place value to thousands, column addition and subtraction, perimeter, elapsed time, and money problems with more than one step.",
    english: "Comprehension becomes central: main idea, sequence, cause and effect, and inference from clues rather than direct statements. Grammar covers nouns, verbs, adjectives, subject-verb agreement and commas in lists. Vocabulary work uses prefixes, suffixes and context. Writing extends to structured paragraphs with a clear opening and closing.",
    science: "Investigation begins. Children plan simple fair tests, learn about plant parts and their functions, food groups and digestion, forces and simple machines, the water cycle, and how human activity affects the local environment.",
    computing: "Children use software with purpose: typing and editing a document, making a simple presentation, searching sensibly for information, understanding that not everything found online is true, and learning the basics of passwords and safe sharing.",
    struggles: "Two problems recur. In fractions, children add the denominators as well as the numerators, because the notation looks like two separate numbers. In time, they subtract clock times as if they were ordinary numbers and lose the sixty-minute hour. Both need naming explicitly rather than simply marking wrong.",
    routine: "Twenty to twenty-five minutes. Keep times-table recall and written method practice separate; fluency drills and multi-step problems tire a child in different ways, and mixing them makes it hard to tell which part is failing.",
  },
  "4": {
    learn: "Grade 4 is a consolidation year with heavier arithmetic. Multi-digit multiplication and division, fractions and decimals as two views of the same idea, and writing that must be planned before it is written. Accuracy over several steps matters more than it did before, and careless slips start costing whole answers.",
    math: "Children multiply and divide multi-digit numbers with formal written methods, find factors and multiples, compare and add fractions, convert between fractions and decimals, work with measurement conversions and area and perimeter of compound shapes, and read data from tables and graphs.",
    english: "Reading covers longer passages, inference, author's purpose, and summarising without copying. Grammar adds tense consistency, pronoun agreement, apostrophes for possession and contraction, and direct speech punctuation. Vocabulary grows through roots, synonyms and shades of meaning, and writing extends to planned multi-paragraph pieces.",
    science: "Topics include the human body's major systems, adaptation and classification, energy and its transfers, states of matter and changes between them, sources and conservation of water, and environmental impact with evidence-based reasoning.",
    computing: "Work becomes more independent: organising files into folders, editing documents and presentations properly, using spreadsheets for simple sums, evaluating sources found online, and understanding what information should never be shared.",
    struggles: "In long multiplication the carried digit goes missing or lands in the wrong column, and in division the remainder is dropped. In fractions, unlike denominators are added without finding a common one. In writing, the apostrophe migrates onto ordinary plurals. None of these signal weak understanding; they signal a method not yet automatic.",
    routine: "Twenty-five to thirty minutes. Have the child check one completed calculation by estimating first, then compare. Estimation catches misplaced digits faster than re-doing the whole sum and builds the habit of noticing an answer that cannot be right.",
  },
  "5": {
    learn: "Grade 5 is preparation for middle school. Fractions and decimals must be operated on confidently, reading must be analysed rather than retold, and writing must hold a position across several paragraphs. Independence is part of the expectation, so practice this year should end with the child checking their own work.",
    math: "Children add, subtract, multiply and divide fractions and decimals, work with percentages, use order of operations, handle volume and surface area, plot coordinates, calculate averages, and solve multi-step word problems where choosing the operation is the difficult part.",
    english: "Reading covers theme, character motivation, figurative language, comparing texts and distinguishing fact from opinion. Grammar extends to clauses, complex sentences, active and passive voice and consistent register. Writing includes structured essays, opinion pieces with reasons, and summaries in the child's own words.",
    science: "Topics include space and the solar system, matter and its properties, energy transfer, ecosystems and interdependence, the water cycle and conservation, and human impact on climate and habitats, with an emphasis on explaining evidence.",
    computing: "Children work with documents, spreadsheets and presentations for real tasks, understand file types and storage, research critically, recognise plagiarism, and discuss digital footprint, online safety and responsible behaviour.",
    struggles: "Dividing by a fraction produces a larger answer, which feels wrong and gets reversed. Decimal points drift when multiplying. In comprehension, children retell the plot when asked for the theme. In essays, paragraphs are written but never linked into an argument. Each needs its own conversation rather than more of the same sheet.",
    routine: "Thirty minutes, with the last five spent checking rather than doing. Ask the child to say why an answer is reasonable before accepting it; at this level, explaining the reasoning is the skill that transfers to secondary school.",
  },
};

function buildGradePages(): StaticSeoPage[] {
  return ["1", "2", "3", "4", "5"].map((g) => {
    const d = GRADE_DETAILS[g];
    return {
      path: `/categories/grade-${g}`,
      title: `Grade ${g} Worksheets – Free Printable PDFs | WizKidsHub`,
      description: `Download free Grade ${g} printable worksheets in Math, English, and Science. Curriculum-aligned PDFs for home and classroom use.`,
      heading: `Grade ${g} Worksheets`,
      sections: [
        { heading: `What Grade ${g} students are working on`, body: d.learn },
        { heading: `Grade ${g} Math worksheets`, body: d.math },
        { heading: `Grade ${g} English worksheets`, body: d.english },
        { heading: `Grade ${g} Science worksheets`, body: d.science },
        { heading: `Grade ${g} Computer Science worksheets`, body: d.computing },
        { heading: `Where Grade ${g} children usually get stuck`, body: d.struggles },
        { heading: `How to use Grade ${g} worksheets at home`, body: d.routine },
        {
          heading: "Free to print for home and classroom",
          body: `Every Grade ${g} worksheet on this page is a free printable PDF with no sign-up and no download limit. Sheets on the same topic are numbered in teaching order, so you can work through a skill in sequence, and each worksheet page explains the objectives, shows sample questions from the sheet, and answers the questions parents ask most about that topic.`,
        },
      ],
    };
  });
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
  sub_category: string | null;
  questions: unknown;
}

async function generateWorksheetPages(distDir: string, baseHtml: string) {
  const all: WorksheetRecord[] = [];
  const pageSize = 1000;
  for (let offset = 0; ; offset += pageSize) {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/worksheets?is_archived=eq.false&select=id,slug,title,grade,subject,sub_category,questions&order=id.asc&limit=${pageSize}&offset=${offset}`,
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

    const topicContent = pickTopicContent({
      worksheetId: String(w.id),
      title: rawTitle,
      grade: gradeNum,
      subject: (w.subject || "").toString(),
      topic: w.sub_category,
    });

    const sampleQuestions = extractQuestions(w.questions).slice(0, 3);

    const parts: string[] = [
      `<article data-seo-prerender="true" style="max-width:900px;margin:0 auto;padding:2rem 1rem;font-family:system-ui,sans-serif;color:#333">`,
      `<h1>${escapeHtml(rawTitle)}</h1>`,
      `<p>${escapeHtml(description)}</p>`,
      `<h2>Grade ${escapeHtml(gradeNum)} ${escapeHtml(subject)} practice</h2>`,
      `<p>${escapeHtml(`This printable ${topicName} worksheet is part of the free WizKidsHub Grade ${gradeNum} ${subject} collection. Print it at home or in the classroom for extra practice.`)}</p>`,
    ];

    if (topicContent) {
      parts.push(`<h2>What this worksheet teaches</h2><ul>`);
      for (const o of topicContent.objectives) parts.push(`<li>${escapeHtml(o)}</li>`);
      parts.push(`</ul>`);
      parts.push(`<h2>How to use this worksheet</h2><p>${escapeHtml(topicContent.usage)}</p>`);
    }

    if (sampleQuestions.length > 0) {
      parts.push(`<h2>Sample questions from this worksheet</h2><ol>`);
      for (const q of sampleQuestions) parts.push(`<li>${escapeHtml(q)}</li>`);
      parts.push(`</ol>`);
    }

    if (topicContent && topicContent.faq.length > 0) {
      parts.push(`<h2>Frequently asked questions</h2>`);
      for (const f of topicContent.faq) {
        parts.push(`<h3>${escapeHtml(f.question)}</h3><p>${escapeHtml(f.answer)}</p>`);
      }
    }

    parts.push(`</article>`);
    const seoBlock = parts.join("\n");

    const html = injectHtml(baseHtml, metaTags, jsonLd, seoBlock);

    // Canonical (slug) URL
    writeRouteHtml(distDir, canonicalPath, html);
    written++;

    // Numeric-id URL: kept for legacy links, but noindex so Google only
    // indexes the canonical slug URL (avoids "Page with redirect" reports)
    if (w.slug && w.id && `/worksheet/${w.id}` !== canonicalPath) {
      const legacyHtml = injectHtml(
        baseHtml,
        metaTags.replace(
          `<meta name="robots" content="index, follow" />`,
          `<meta name="robots" content="noindex, follow" />`
        ),
        jsonLd,
        seoBlock
      );
      writeRouteHtml(distDir, `/worksheet/${w.id}`, legacyHtml);
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

        const pages = [...STATIC_SEO_PAGES, ...buildGradePages()];
        console.log(`SEO inject: generating ${pages.length} static public pages`);
        generateStaticPages(distDir, baseHtml, pages);

        await generateWorksheetPages(distDir, baseHtml);



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
