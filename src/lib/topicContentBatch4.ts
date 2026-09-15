/**
 * Topic content bank — batch 4.
 *
 * Remaining English topics (grammar, phonics, vocabulary, reading) plus early
 * shapes. Same quality bar: grade-specific, names the real difficulty and what
 * a parent should physically do.
 */

import type { TopicContentBank } from "./topicContent";

export const TOPIC_CONTENT_BATCH_4: Record<string, TopicContentBank> = {
  // ──────────────────────────────────────────────────────────────────
  "1|english|grammar": {
    objectives: [
      "Start every sentence with a capital letter and finish it with a full stop, without being reminded.",
      "Tell naming words (nouns) apart from doing words (verbs) in a short sentence.",
      "Use a and an correctly, hearing that an goes before a vowel sound.",
      "Choose is or are to match one thing or many things.",
      "Write the plural of simple nouns by adding s, and notice the odd ones like feet and children.",
      "Use I instead of me as the person doing the action ('I ran', not 'me ran').",
    ],
    usage: [
      "Grade 1 grammar is mostly an ear skill, not a rule skill. Read each sentence aloud with your child before they write — 'a apple' sounds wrong to a six-year-old long before they can explain the vowel rule, and that instinct is what the sheet is training.",
      "Check capitals and full stops last, as a separate pass. Children this age can either think about the words or think about the punctuation, rarely both at once, so splitting the job cuts the error count sharply.",
      "If handwriting is slowing things down, let your child say the answer and you write it. The grammar choice is what matters here; letter formation is a separate practice.",
    ],
    faq: [
      {
        question: "My child knows the rules out loud but still forgets capital letters when writing. Why?",
        answer:
          "Because writing uses up their attention on spelling and letter shapes first. A second read-through hunting only for capitals fixes this far better than reminding them mid-sentence.",
      },
      {
        question: "Should my child know the words noun and verb at Grade 1?",
        answer:
          "Recognising naming words and doing words is the expected skill; the formal labels are usually introduced alongside, so using both terms together is helpful, not too early.",
      },
      {
        question: "Is it a problem that my child writes 'me and mum went'?",
        answer:
          "It is completely normal and one of the most common Grade 1 errors. Saying the sentence without the other person ('me went') makes the mistake audible, which teaches it faster than a rule.",
      },
      {
        question: "How long should this take?",
        answer:
          "Around ten to fifteen minutes. If it stretches much past that, stop and finish later — accuracy drops quickly once a Grade 1 child tires.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "2|english|grammar": {
    objectives: [
      "Identify nouns, verbs and adjectives inside the same sentence.",
      "Match subject and verb correctly ('she walks', not 'she walk').",
      "Use question marks and exclamation marks where the sentence needs them, not just full stops.",
      "Join two short sentences with and or but so the result still makes sense.",
      "Use past tense correctly for regular verbs, and learn the common irregulars — went, ate, saw, ran.",
      "Add commas between items in a simple list.",
    ],
    usage: [
      "The single biggest Grade 2 slip is the missing s on present-tense verbs after he, she or it. Have your child read their finished answer aloud pointing at the verb — the ear catches 'she walk' immediately even when the eye does not.",
      "For the joining questions, ask what the second sentence does to the first: adds more (and) or disagrees with it (but). Naming that job stops children using and for everything.",
      "Irregular past tenses cannot be worked out, only remembered. Keep a running list on the fridge of the ones your child gets wrong and add to it over weeks — that beats re-teaching the same sheet.",
    ],
    faq: [
      {
        question: "My child writes 'goed' and 'runned'. Is something wrong?",
        answer:
          "No — that is actually a good sign. It means your child has learned the add-ed rule and is applying it everywhere. The irregular forms are simply memorised exceptions and come with exposure.",
      },
      {
        question: "How many adjectives should a Grade 2 sentence have?",
        answer:
          "One well-chosen adjective is stronger than three stacked ones. If your child writes 'big huge large dog', ask them to pick the best single word.",
      },
      {
        question: "Does my child need to know what a subject is?",
        answer:
          "They need to know who or what the sentence is about, which is the same idea in plainer words. The formal term usually appears around Grade 3.",
      },
      {
        question: "Are exclamation marks being overused?",
        answer:
          "Very commonly at this grade. A useful test: would you actually shout this sentence? If not, a full stop is the right choice.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "3|english|grammar": {
    objectives: [
      "Label the subject and the predicate in a sentence and see that both are needed.",
      "Use pronouns that agree with the noun they replace, and avoid unclear ones ('he' when two boys have been named).",
      "Choose the right tense across a whole paragraph instead of switching halfway through.",
      "Use apostrophes for possession (the dog's bowl) and tell them apart from plurals (two dogs).",
      "Spot and fix run-on sentences by splitting them or adding a joining word.",
      "Use adverbs to say how, when or where an action happened.",
    ],
    usage: [
      "Apostrophes are the Grade 3 sticking point, and the confusion is always plural versus possessive. Ask one question of every apostrophe on the page: does something belong to somebody? If not, it should not be there.",
      "For run-on sentences, have your child read the sentence out loud in one breath. If they run out of air, it needs splitting — a physical test works better than counting words.",
      "Tense consistency is easier to see across a whole paragraph than in one line. After the sheet is done, ask your child to underline every verb and check they all point to the same time.",
    ],
    faq: [
      {
        question: "Why does my child put an apostrophe in every word ending in s?",
        answer:
          "It is a known over-correction once apostrophes are taught. Keep to the single test — does it show belonging? — and the extra ones disappear within a few weeks of practice.",
      },
      {
        question: "What exactly is a run-on sentence?",
        answer:
          "Two complete ideas pushed together with no full stop or joining word, such as 'I like dogs they are loud'. It is one of the most common Grade 3 writing errors and easy to fix once spotted.",
      },
      {
        question: "Should my child diagram sentences?",
        answer:
          "Not necessary. Identifying who the sentence is about and what they did gives the same benefit without the extra notation.",
      },
      {
        question: "My child's grammar is fine in speech but weak on paper. Normal?",
        answer:
          "Yes. Speech is automatic; writing adds spelling and punctuation load. Short, focused sheets like this one narrow that gap faster than long writing tasks.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "4|english|grammar": {
    objectives: [
      "Tell a phrase from a clause, and know that only a clause has its own verb.",
      "Punctuate direct speech correctly, keeping the comma and full stop inside the quotation marks.",
      "Use conjunctions such as because, although and while to build complex sentences.",
      "Keep pronoun and antecedent agreement clear across two or three sentences.",
      "Fix common confusions in writing — their/there/they're and its/it's.",
      "Use commas after an opening phrase ('After lunch, we left').",
    ],
    usage: [
      "Direct speech punctuation has four separate moving parts — opening marks, the comma, the capital letter and the closing punctuation inside the marks. Have your child check one part at a time across all the sentences instead of perfecting each sentence in turn.",
      "For their/there/they're, teach the substitution test out loud: try 'they are' in the sentence. If it works, they're is right. It is the only reliable way to stop the error recurring.",
      "When your child writes a complex sentence, ask them to point at the two verbs. If there is only one, they have written a phrase rather than a second clause — this is where Grade 4 sentences usually collapse.",
    ],
    faq: [
      {
        question: "Does the full stop go inside or outside the speech marks?",
        answer:
          "Inside, when the words belong to the speaker — 'Let's go.' said with the stop before the closing mark. This is the most frequently missed detail at Grade 4.",
      },
      {
        question: "My child still writes 'there' for everything. What helps?",
        answer:
          "Only substitution practice. 'They are' for they're, and 'here' inside there for place. Repeated correction without a test to apply does not stick.",
      },
      {
        question: "Are complex sentences expected at this grade?",
        answer:
          "Yes — using because, although and while is a standard Grade 4 target, and it is one of the clearest markers of writing maturity in assessments.",
      },
      {
        question: "How much grammar practice per week is sensible?",
        answer:
          "Two or three short sheets beat one long session. Grammar accuracy improves with spacing far more than with volume.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "5|english|grammar": {
    objectives: [
      "Use active and passive voice deliberately and explain why one suits a sentence better.",
      "Punctuate relative clauses correctly, deciding when commas are needed.",
      "Use semicolons and colons for their proper jobs instead of as decorative commas.",
      "Keep modifiers next to what they describe, and correct dangling modifiers.",
      "Match verb tense and voice consistently across a full paragraph of writing.",
      "Identify and correct sentence fragments in their own drafts.",
    ],
    usage: [
      "Passive voice is where Grade 5 writing quietly loses clarity. Ask your child who did the action in each sentence; if the answer is missing or hidden at the end, rewriting it actively usually improves the sentence immediately.",
      "Semicolons only join two complete sentences. Have your child cover the semicolon and read each half alone — if either half cannot stand up, a comma or a full stop is correct instead.",
      "Dangling modifiers are funniest read literally. Reading the sentence exactly as written ('Running down the road, the bag fell') makes the error obvious without any grammatical vocabulary.",
    ],
    faq: [
      {
        question: "Is passive voice wrong?",
        answer:
          "No — it is right when the doer is unknown or unimportant, as in science writing. The Grade 5 skill is choosing it on purpose rather than drifting into it.",
      },
      {
        question: "When does a relative clause need commas?",
        answer:
          "When removing it leaves the sentence still identifying the same thing. If the clause is what tells you which one, it takes no commas.",
      },
      {
        question: "Colon or semicolon?",
        answer:
          "A colon introduces or explains what follows; a semicolon balances two related complete statements. Testing whether each side is a full sentence settles most cases.",
      },
      {
        question: "My child writes fragments for effect. Should I correct it?",
        answer:
          "In creative writing an occasional deliberate fragment is fine. In formal or assessed writing it usually counts as an error, so knowing which is which is the real target.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "3|english|phonics": {
    objectives: [
      "Read and spell words with r-controlled vowels — ar, or, er, ir, ur — and hear that er, ir and ur often sound the same.",
      "Split longer words into syllables to decode them instead of guessing from the first letter.",
      "Use common prefixes and suffixes (un-, re-, -ful, -less) to read unfamiliar words.",
      "Recognise soft c and soft g before e, i and y (city, giant).",
      "Read vowel teams such as oa, ee, ai, igh confidently in two-syllable words.",
      "Spell words where the suffix changes the base word (hoping, hopped, happiest).",
    ],
    usage: [
      "The Grade 3 phonics wall is that er, ir and ur all say the same sound, so spelling cannot be worked out by ear. Ask your child to write the word and check whether it looks right — visual memory is the only reliable route here, and short daily exposure builds it.",
      "For any long word your child stalls on, cover all but the first syllable, read it, then reveal the next. Chunking prevents the wild guess from the first letter that stalls reading at this grade.",
      "When a suffix is added, say the base word first, then the new word. That makes the doubling and the dropped e audible: hop, hopping; hope, hoping.",
    ],
    faq: [
      {
        question: "How do I know whether to write er, ir or ur?",
        answer:
          "Sound alone will not tell you — they are near-identical. This is a look-and-remember spelling pattern, which is why the sheet mixes them deliberately rather than teaching one at a time.",
      },
      {
        question: "My child reads fluently but spells badly. Is phonics still useful?",
        answer:
          "Yes, and this is common. Reading allows partial decoding; spelling demands the full pattern. Phonics practice at Grade 3 is mostly spelling insurance.",
      },
      {
        question: "Why does the c sometimes sound like s?",
        answer:
          "Because c is soft before e, i and y — city, cent, cycle. Learning the three trigger letters covers almost every case your child will meet.",
      },
      {
        question: "Should we still be doing phonics in Grade 3?",
        answer:
          "Yes. Grade 3 phonics moves from single sounds to syllables, prefixes and suffixes, which is exactly what unlocks longer subject vocabulary in science and social studies.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "4|english|phonics": {
    objectives: [
      "Read multisyllable words by finding the vowel sounds and splitting between them.",
      "Use Greek and Latin roots (tele-, port-, graph-, dict-) to work out unfamiliar words.",
      "Spell words with silent letters — knee, wrist, lamb, sign — and know where they cluster.",
      "Handle -tion, -sion and -cian endings, all of which say the same sound.",
      "Apply the doubling rule when adding endings to two-syllable words.",
      "Read homophones correctly in context (weight/wait, board/bored).",
    ],
    usage: [
      "By Grade 4 the useful skill is not sounding out letters but spotting familiar chunks. When your child meets a hard word, ask what part they already recognise — tele, port, graph — and build outwards from it.",
      "The -tion / -sion / -cian endings are pure memory, so treat them as three separate word lists rather than one rule. Grouping them by the words your child actually got wrong is more efficient than the full list.",
      "Silent letters follow patterns worth naming out loud: kn at the start, mb at the end, wr before a vowel. Naming the pattern turns a hundred odd spellings into three small groups.",
    ],
    faq: [
      {
        question: "Is phonics not finished by Grade 4?",
        answer:
          "The basic code is, but word structure is not. Roots, prefixes and endings are what let a Grade 4 reader handle subject textbooks independently.",
      },
      {
        question: "Why do knee and know have a silent k?",
        answer:
          "It used to be pronounced, and the spelling stayed behind. Knowing kn always begins these words is more useful than the history.",
      },
      {
        question: "How can my child tell -tion from -sion?",
        answer:
          "Not by ear. A rough guide: -sion often follows l or s sounds (tension, division), -tion is far more common otherwise. When in doubt, -tion is the safer guess.",
      },
      {
        question: "Do roots really help this young?",
        answer:
          "Yes. A child who knows tele means far and graph means write can attempt telegraph, telephone and photograph without being taught each one.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "5|english|phonics": {
    objectives: [
      "Break unfamiliar academic words into root, prefix and suffix to work out meaning and pronunciation.",
      "Read words where stress changes the meaning (record, present, object).",
      "Spell words with unstressed vowels that disappear in speech — separate, definite, family.",
      "Use spelling patterns to choose between -able and -ible, and -ant and -ent.",
      "Handle irregular plurals and Latin forms (cactus/cacti, analysis/analyses).",
      "Read subject-specific vocabulary in science and social studies without stalling.",
    ],
    usage: [
      "Most Grade 5 spelling errors come from unstressed vowels that simply are not pronounced — sep-a-rate, def-i-nite, fam-i-ly. Have your child deliberately over-pronounce the word syllable by syllable while writing it; exaggerating the hidden vowel is the standard fix.",
      "For stress-shift words, read the sentence both ways out loud and pick the one that sounds natural. Meaning follows stress here, which is why silent reading alone misses the error.",
      "When your child meets a long science word, cover the prefix and suffix and read the middle first. Building outwards from the root turns intimidating vocabulary into something decodable.",
    ],
    faq: [
      {
        question: "Why does my child write 'seperate'?",
        answer:
          "Because nobody pronounces the a. This is one of the most misspelled English words at every age, and slow deliberate pronunciation while writing is the reliable correction.",
      },
      {
        question: "Is there a rule for -able versus -ible?",
        answer:
          "A rough one: -able usually follows a complete word (comfortable, dependable), -ible often follows an incomplete root (visible, terrible). Exceptions exist, so the list still matters.",
      },
      {
        question: "Should a Grade 5 child still be sounding words out?",
        answer:
          "Not letter by letter, but chunking by root and affix is exactly right, and it is what carries them into secondary-school texts.",
      },
      {
        question: "How does this help subject work?",
        answer:
          "Directly. Words like photosynthesis and precipitation are built from roots; a child who splits them reads and remembers them far more easily.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "4|english|vocabulary": {
    objectives: [
      "Work out an unfamiliar word's meaning from the surrounding sentence before reaching for a dictionary.",
      "Use synonyms with attention to strength — 'furious' is not simply a longer 'angry'.",
      "Recognise antonyms formed with prefixes (possible/impossible, agree/disagree).",
      "Tell literal from figurative language in everyday idioms.",
      "Sort words by shades of meaning, from warm to hot to scalding.",
      "Use a dictionary entry properly, reading the part of speech and the example sentence, not just the first definition.",
    ],
    usage: [
      "Before your child looks a word up, ask them to guess from the sentence and say why. The guess is the skill being tested in Grade 4 assessments; the dictionary just confirms it.",
      "For synonym questions, ask which word is stronger rather than which is correct. Children this age treat synonyms as interchangeable, and grading them by intensity is what makes their writing precise.",
      "Idioms cannot be decoded, only known. When one appears, read it literally and laugh at the picture — 'it's raining cats and dogs' — because the absurd image is what fixes the phrase in memory.",
    ],
    faq: [
      {
        question: "Should my child memorise word lists?",
        answer:
          "Lists without context fade quickly. Words met in reading and then used in a sentence of their own are retained far better, which is how this sheet is structured.",
      },
      {
        question: "My child uses long words wrongly. Is that bad?",
        answer:
          "It is a normal and encouraging stage — they are reaching. Discussing the shade of meaning, not banning the word, is what turns ambition into accuracy.",
      },
      {
        question: "How many new words a week is reasonable?",
        answer:
          "Five to ten used actively in speech or writing beats thirty copied out. Active use is the whole difference.",
      },
      {
        question: "Do idioms matter for assessments?",
        answer:
          "Yes — comprehension questions frequently hinge on figurative phrases, and children who read them literally lose marks despite understanding the passage.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "5|english|vocabulary": {
    objectives: [
      "Use context, roots and affixes together to infer the meaning of academic vocabulary.",
      "Distinguish connotation from denotation — why 'thrifty' and 'stingy' describe the same behaviour differently.",
      "Choose precise verbs and nouns in place of vague ones in their own writing.",
      "Understand and use common Greek and Latin roots across subjects.",
      "Interpret similes, metaphors and personification in what they read.",
      "Use a thesaurus critically, checking the replacement actually fits the sentence.",
    ],
    usage: [
      "The thesaurus trap is the main Grade 5 problem: a technically correct synonym that no one would say in that sentence. Have your child read the sentence aloud with the new word in place — if it sounds odd, it is wrong regardless of the thesaurus.",
      "For connotation questions, ask whether the word is a compliment or a criticism. Same meaning, different attitude — that is the whole distinction, and framing it that way is quicker than defining the term.",
      "When a root appears, ask your child for two other words that share it. Building small word families is what makes vocabulary work compound rather than accumulate one word at a time.",
    ],
    faq: [
      {
        question: "My child's writing sounds forced since using a thesaurus. Why?",
        answer:
          "Because synonyms carry different tone and formality. The fix is not fewer words but the read-aloud test, which catches unnatural substitutions immediately.",
      },
      {
        question: "What is the difference between connotation and denotation?",
        answer:
          "Denotation is the dictionary meaning; connotation is the feeling attached. Thrifty and stingy share a denotation but sit on opposite sides of approval.",
      },
      {
        question: "Are roots worth the effort at this age?",
        answer:
          "Very much. Knowing a handful of roots gives access to hundreds of secondary-school science and history words without separate teaching.",
      },
      {
        question: "How do I know the vocabulary is really learned?",
        answer:
          "When the word turns up unprompted in your child's own speech or writing a week later. Recognition on a sheet is a weaker signal than spontaneous use.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "3|english|reading": {
    objectives: [
      "Find the main idea of a paragraph and separate it from supporting detail.",
      "Answer questions using evidence quoted from the passage rather than memory or opinion.",
      "Put the events of a passage in sequence, using signal words like first, then and finally.",
      "Infer how a character feels from what they do, not only from what they say.",
      "Work out an unknown word's meaning from the sentence around it.",
      "Compare two characters or two facts described in the same passage.",
    ],
    usage: [
      "The most common Grade 3 comprehension error is answering from what your child already knows about the topic rather than from the text. Ask them to underline the exact line their answer came from — if there is no line, the answer needs rethinking.",
      "Read the questions before the passage the first time through. It feels backwards but it teaches purposeful reading, which is what timed comprehension tests actually measure.",
      "For inference questions, ask what the character did and what that usually means. Feelings are almost never stated at this level, and looking for the action is the reliable route to the answer.",
    ],
    faq: [
      {
        question: "My child reads well aloud but scores poorly on comprehension. Why?",
        answer:
          "Decoding and understanding are separate skills. Fluent reading can use so much attention on accuracy that meaning is not stored — slowing down and retelling each paragraph fixes it.",
      },
      {
        question: "How many times should the passage be read?",
        answer:
          "Twice is normal at Grade 3: once for the story, once for the answers. Rereading is a strategy, not a sign of weakness.",
      },
      {
        question: "Should my child write in full sentences?",
        answer:
          "For most comprehension marking, yes — and it also forces them to reread the question, which prevents half-answers.",
      },
      {
        question: "What is an inference question?",
        answer:
          "One whose answer is not written down but is clear from the clues, such as how a character feels. They are the questions Grade 3 children most often need practice with.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "4|english|reading": {
    objectives: [
      "Summarise a passage in two or three sentences without copying whole lines.",
      "Identify the author's purpose — to inform, persuade, entertain or instruct.",
      "Support inferences with specific evidence from the text.",
      "Distinguish fact from opinion inside the same paragraph.",
      "Explain how a text is organised: sequence, cause and effect, or compare and contrast.",
      "Work out the meaning of figurative language in context.",
    ],
    usage: [
      "Summarising is where Grade 4 children struggle most, because copying feels safer than choosing. Set a hard limit of three sentences — the constraint is what forces real selection, and it is the whole point of the exercise.",
      "For fact versus opinion, ask a single question of each statement: could someone check this? Anything that depends on how a person feels is opinion, however confidently it is written.",
      "When your child gives an inference, follow every answer with 'how do you know?' That habit alone lifts comprehension marks, because most lost marks are correct answers without the supporting evidence.",
    ],
    faq: [
      {
        question: "My child's summaries are almost as long as the passage. How do I help?",
        answer:
          "Give a strict sentence count and ask what could be deleted without losing the point. Length limits teach selection better than any explanation.",
      },
      {
        question: "How can a child tell the author's purpose?",
        answer:
          "By what the text tries to make them do — buy, believe, learn or enjoy. Persuasive writing usually shows itself in strong opinion words.",
      },
      {
        question: "Should we read fiction or non-fiction?",
        answer:
          "Both. Grade 4 assessments include information texts, and children who only read stories find the structure of non-fiction unfamiliar.",
      },
      {
        question: "Is it fine to answer in note form?",
        answer:
          "Only if the question allows it. Explanation questions generally expect a sentence, since the reasoning is what earns the mark.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "5|english|reading": {
    objectives: [
      "Identify the theme of a text and distinguish it from the plot.",
      "Analyse how an author's word choice shapes the reader's opinion.",
      "Compare how two texts treat the same subject.",
      "Trace an argument through a passage and judge whether the evidence supports it.",
      "Explain a character's motivation using evidence from across the whole text.",
      "Interpret figurative and symbolic language and explain its effect.",
    ],
    usage: [
      "Theme and plot get confused at Grade 5 constantly. Plot is what happened; theme is what it is about underneath — courage, fairness, loss. Asking both questions separately about the same passage makes the difference concrete.",
      "For word-choice questions, have your child swap the author's word for a plainer one and read both. The change in feeling is what they are being asked to explain, and hearing it is far easier than describing it cold.",
      "When judging an argument, ask what evidence is offered and whether it actually proves the point. Grade 5 readers tend to accept confident writing as proven, and separating claim from evidence is the skill that changes that.",
    ],
    faq: [
      {
        question: "What is the difference between theme and main idea?",
        answer:
          "Main idea is what the text says; theme is the broader message it explores. A story can have one plot and several themes.",
      },
      {
        question: "My child understands the story but cannot explain the author's technique. Normal?",
        answer:
          "Yes, and it is the main Grade 5 growth area. Comparing the author's word with a plain alternative gives them something concrete to talk about.",
      },
      {
        question: "How long should a comprehension answer be?",
        answer:
          "As long as the reasoning needs. A one-line answer to an 'explain how' question almost always leaves marks behind.",
      },
      {
        question: "Does reading level matter more than practice?",
        answer:
          "Both matter, but analysis practice on a slightly easier text usually teaches more than struggling through a harder one.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "1|math|shapes": {
    objectives: [
      "Name circles, squares, rectangles and triangles regardless of how they are turned on the page.",
      "Count the sides and corners of a flat shape accurately.",
      "Tell flat shapes from solid ones — a circle from a ball, a square from a box.",
      "Spot shapes in everyday objects around the house.",
      "Continue a simple repeating shape pattern.",
      "Sort shapes by one property, such as number of sides or having curves.",
    ],
    usage: [
      "The classic Grade 1 mistake is refusing to call a rotated square a square, or calling a long rectangle 'not a rectangle'. Cut one shape out of paper and physically turn it — seeing the same shape in a new position is what fixes this, and pictures alone rarely do.",
      "When counting corners, have your child mark each one with a pencil dot as they count. Six-year-olds lose track of where they started, and the dots remove the double-counting.",
      "Finish with a shape hunt in one room: a clock circle, a door rectangle, a roof triangle. That two-minute walk makes the whole sheet stick better than repeating it.",
    ],
    faq: [
      {
        question: "Why won't my child accept a tilted square as a square?",
        answer:
          "Because they learned the shape in one fixed position. Turning a paper cut-out while they watch resolves it quickly — it is a very common Grade 1 stage.",
      },
      {
        question: "Should my child know 3D shape names now?",
        answer:
          "Recognising a ball, box and can shape is plenty at Grade 1. Formal names like sphere and cuboid usually arrive in Grade 2.",
      },
      {
        question: "Is a square a rectangle?",
        answer:
          "Technically yes, but Grade 1 keeps them separate to avoid confusion. If your child spots it themselves, that is worth praising rather than correcting.",
      },
      {
        question: "My child mixes up sides and corners. What helps?",
        answer:
          "Trace the sides with a finger and tap the corners. Different physical actions for the two words keeps them apart better than repeating the definitions.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "2|math|shapes": {
    objectives: [
      "Name 2D shapes up to hexagons and pentagons by counting their sides.",
      "Identify 3D shapes — cube, cuboid, sphere, cylinder, cone — and count faces, edges and vertices.",
      "Find lines of symmetry in simple shapes and letters.",
      "Recognise the same shape at different sizes and orientations.",
      "Combine two shapes to make a new one (two triangles into a square).",
      "Match a solid shape to the flat shapes on its faces.",
    ],
    usage: [
      "Faces, edges and vertices is where Grade 2 counting breaks down, because the hidden back of the shape gets forgotten. Use a real box or a ball and turn it as your child counts — flat drawings hide exactly the faces they miss.",
      "For symmetry, fold a paper copy of the shape rather than drawing the line. If the halves match, the fold is a line of symmetry; that physical check beats judging by eye.",
      "When combining shapes, let your child cut and place real paper triangles. The mental rotation involved is genuinely hard at this age and much easier with pieces in hand.",
    ],
    faq: [
      {
        question: "Why does my child undercount the faces of a cube?",
        answer:
          "Because a picture shows only three. Handling a real cube and marking each face as it is counted solves it — this is the single most common Grade 2 error in this topic.",
      },
      {
        question: "What is the difference between an edge and a vertex?",
        answer:
          "An edge is a line where two faces meet; a vertex is a point where edges meet — the pointy bit. Tracing edges and tapping vertices keeps the words apart.",
      },
      {
        question: "How many lines of symmetry does a rectangle have?",
        answer:
          "Two, not four. Children often add the diagonals, which is worth testing by folding a paper rectangle corner to corner and seeing that it does not match.",
      },
      {
        question: "Do we need shape blocks at home?",
        answer:
          "Not specially bought ones. A tissue box, a ball, a tin and an ice-cream cone cover every 3D shape on this sheet.",
      },
    ],
  },
};
