/**
 * Topic content bank — batch 3.
 *
 * Next 15 highest-volume topics not covered by batches 1 and 2.
 * Same quality bar: grade-specific, names the real difficulty and what a
 * parent should physically do.
 */

import type { TopicContentBank } from "./topicContent";

export const TOPIC_CONTENT_BATCH_3: Record<string, TopicContentBank> = {
  // ──────────────────────────────────────────────────────────────────
  "1|computer science|computer basics": {
    objectives: [
      "Name the four parts a Grade 1 child actually touches — screen, keyboard, mouse and power button — and point to each in a picture.",
      "Learn that a click means press and let go once, and that holding the button down does something different.",
      "Find letter keys, the space bar and the Enter key on a keyboard picture.",
      "Sort pictures into things that are part of a computer and things that are not (book, pencil, mouse, monitor).",
      "Understand that a computer only does what someone tells it to do — it does not decide by itself.",
      "Practise the safe habits of clean dry hands, no food near the keys, and asking a grown-up before switching anything off.",
    ],
    usage: [
      "At Grade 1 the words are harder than the ideas. Read each label out loud for your child before they write it — 'monitor' and 'mouse' both start with M and get swapped constantly. If a real computer or tablet is in the room, point at the part as you say its name, then come back to the paper.",
      "Do this sheet in two short sittings rather than one. Six new technical words is a lot for a six-year-old, and recall improves sharply when the second half happens the next day.",
      "If your child cannot yet read the labels independently, let them draw a line or colour instead of writing the word. The goal at this grade is recognising the parts, not spelling them.",
    ],
    faq: [
      {
        question: "My child has never touched a computer. Can they still do this?",
        answer:
          "Yes. Everything is answered on paper from pictures, and the sheet assumes no prior experience. Showing them a phone or tablet screen while you work is enough real-world reference.",
      },
      {
        question: "Why does my child keep mixing up mouse and monitor?",
        answer:
          "Both start with the same sound, which is the single most common Grade 1 error here. Saying 'monitor — the one you look at' every time you read the word clears it up faster than correcting the written answer.",
      },
      {
        question: "Should I teach typing at this stage?",
        answer:
          "Not formal touch typing. Finding a named letter on the keyboard is the Grade 1 skill; correct finger placement is usually introduced around Grade 3 or 4.",
      },
      {
        question: "Is a tablet fine instead of a desktop computer?",
        answer:
          "For the screen and touch ideas, yes. For keyboard and mouse questions a laptop helps, because a tablet has no separate mouse to point at.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "4|computer science|computer basics": {
    objectives: [
      "Explain the input, process, output cycle using a familiar example such as typing a document and printing it.",
      "Tell the difference between storage (hard disk, pen drive) and memory (RAM) — one keeps files when the power goes off, the other does not.",
      "Organise files into folders and describe why file names and file types (.jpg, .pdf, .docx) matter.",
      "Identify common software categories: operating system, application, browser.",
      "Convert between simple units of digital storage — bits, bytes, kilobytes, megabytes.",
      "Describe basic online safety rules: strong passwords, not sharing personal details, telling an adult about anything uncomfortable.",
    ],
    usage: [
      "The RAM-versus-storage question is where Grade 4 students lose marks, and the fix is a demonstration rather than a definition: open something without saving, cut the power, and show that the work is gone. Do that once and the worksheet answers stop being guesses.",
      "Have a real computer open while working through the file-and-folder questions. Ask your child to actually create a folder, drop two files in and rename one — then the written answers describe something they did rather than something they read.",
      "For the storage-unit conversions, let your child check a real file's size on screen. Seeing that a photo is a few megabytes makes the numbers in the questions mean something.",
    ],
    faq: [
      {
        question: "Does my child need a computer to finish this worksheet?",
        answer:
          "No, it is fully answerable on paper. But the file, folder and storage questions land much better if a laptop is available for a two-minute demonstration.",
      },
      {
        question: "Is this aligned with school computer syllabuses?",
        answer:
          "It covers the standard Grade 4 computer-literacy block — the input-process-output cycle, hardware and software, file management, storage units and basic internet safety — which appears in most school ICT curricula.",
      },
      {
        question: "My child confuses memory and storage constantly. Is that normal?",
        answer:
          "It is the most common misconception at this level, largely because everyday speech uses 'memory' for both. Anchor it to 'RAM forgets when the power stops' and the confusion usually clears.",
      },
      {
        question: "Should I let my child answer the internet safety questions from experience?",
        answer:
          "Yes — those questions work best as a conversation. Ask what they would do before they write, then compare with the answer they choose.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "1|science|environment": {
    objectives: [
      "Sort everyday things into living and non-living, and give one reason for each choice.",
      "Name the three things every living thing needs: air, water and food.",
      "Recognise the difference between clean and dirty surroundings and say what causes each.",
      "Learn simple ways a Grade 1 child can help — put litter in a bin, close a tap, switch off a light, reuse paper.",
      "Identify where things belong: plants in soil, fish in water, birds in the air.",
      "Talk about the weather they can see today and how it changes what people wear and do.",
    ],
    usage: [
      "Take this sheet outside or to a window before writing anything. Grade 1 environment questions are about noticing, and a child who has just looked at a real tree, tap or bin answers from memory instead of from a picture.",
      "Living versus non-living trips up almost every Grade 1 child on the same three items: a car (it moves but is not alive), a seed (looks still but is alive) and water. Talk through those three specifically before your child fills the boxes.",
      "Pair each 'how can we help' answer with one thing you actually do together that day — closing the tap while brushing, or carrying a wrapper to a bin. The written answer sticks when it describes something real.",
    ],
    faq: [
      {
        question: "My child says a car is living because it moves. How do I explain it?",
        answer:
          "Movement alone is not the test. Ask whether it eats, drinks, grows or has babies — a car does none of those, so it is non-living. That four-part check works for almost every item at this grade.",
      },
      {
        question: "Is this worksheet the same as EVS at school?",
        answer:
          "Yes, it covers the environment portion of Grade 1 EVS or general science — living and non-living, needs of living things, clean surroundings and simple conservation habits.",
      },
      {
        question: "Do the answers need full sentences?",
        answer:
          "No. One or two words, or a drawing, is fine at Grade 1. The thinking matters more than the writing here.",
      },
      {
        question: "Can we do this worksheet without going outdoors?",
        answer:
          "Yes, all the questions can be answered indoors from the pictures. A quick look out of a window still helps with the weather and surroundings questions.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "3|science|food & water": {
    objectives: [
      "Group foods into energy-giving, body-building and protective foods, with examples of each.",
      "Explain why a meal needs items from more than one group to count as balanced.",
      "Describe where common foods come from — plant or animal — and trace one food back to its source.",
      "Name simple ways water is made safe to drink at home: boiling, filtering, letting it settle.",
      "Recognise signs that food has spoiled and explain why covered, refrigerated food stays safe longer.",
      "List everyday habits that prevent water-borne illness — washing hands, washing fruit, drinking stored covered water.",
    ],
    usage: [
      "Answer the food-group questions using what is actually in your kitchen rather than the textbook list. Grade 3 students remember 'rice is energy-giving' far better when they have just looked at the rice tin.",
      "The classic Grade 3 error is treating 'healthy' and 'protective' as the same word. Protective food means fruits and vegetables that guard against illness; milk is healthy but body-building. Sort three real items out loud together before writing.",
      "For the water-safety section, boil or filter water while the sheet is on the table and let your child describe what happened in their own words. That paragraph is usually the strongest answer on the page.",
    ],
    faq: [
      {
        question: "Which foods count as protective foods?",
        answer:
          "Fruits and vegetables, because their vitamins and minerals help the body resist illness. Grains are energy-giving; milk, eggs, pulses and meat are body-building.",
      },
      {
        question: "Is boiling really enough to make water safe?",
        answer:
          "Boiling kills germs, which is what the Grade 3 syllabus focuses on. It does not remove mud or chemicals, which is why the worksheet also asks about filtering and settling.",
      },
      {
        question: "Does this cover the Grade 3 EVS food chapter?",
        answer:
          "Yes — food groups, balanced meals, food sources, food spoilage and safe drinking water are the standard Grade 3 topics in this chapter.",
      },
      {
        question: "My child listed junk food as energy-giving. Is that wrong?",
        answer:
          "Not entirely, and it is worth discussing: sugary food does give quick energy but lacks the other nutrients, which is exactly why balanced meals are the point of the chapter.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "4|science|food & water": {
    objectives: [
      "Name the main nutrients — carbohydrates, proteins, fats, vitamins, minerals, water and roughage — and give one food source for each.",
      "Explain what a deficiency disease is and match common ones to the missing nutrient.",
      "Describe why roughage and water are needed even though they give no energy.",
      "Compare methods of food preservation — drying, salting, refrigeration, canning — and say when each is used.",
      "Trace the journey of water from a source to a tap, and identify where it can get contaminated.",
      "Explain how everyday water wastage happens at home and calculate a simple way to reduce it.",
    ],
    usage: [
      "Read the nutrition labels on two packets from your kitchen before starting. Grade 4 nutrient questions become concrete the moment a child sees 'carbohydrates' and 'protein' printed in grams on a real packet.",
      "Deficiency diseases are pure memorisation unless linked to a symptom, so say them as pairs out loud — no vitamin A, poor night vision; no vitamin C, bleeding gums; no iron, tiredness. Then let your child fill the table from memory.",
      "For the preservation section, find one dried, one salted and one refrigerated item at home and line them up. Writing the answers next to three real examples beats reciting the list.",
    ],
    faq: [
      {
        question: "Why is water called a nutrient if it gives no energy?",
        answer:
          "Because the body cannot carry out digestion, transport nutrients or remove waste without it. Grade 4 syllabuses class both water and roughage as essential even though neither supplies energy.",
      },
      {
        question: "Which deficiency diseases should my child know?",
        answer:
          "Typically night blindness (vitamin A), scurvy (vitamin C), rickets (vitamin D), anaemia (iron), goitre (iodine) and beri-beri (vitamin B1) — the set most Grade 4 textbooks use.",
      },
      {
        question: "Does the worksheet need a science lab or experiment?",
        answer:
          "No. Everything is answerable on paper, though a two-minute look at kitchen labels and preserved foods makes the answers noticeably stronger.",
      },
      {
        question: "Is roughage the same as fibre?",
        answer:
          "Yes. Textbooks at this level use 'roughage', and it means the fibre from vegetables, fruit skins and whole grains that helps the body pass waste.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "5|science|food & water": {
    objectives: [
      "Explain how a balanced diet changes with age, activity level and health condition.",
      "Describe the main stages of digestion and where each nutrient is absorbed.",
      "Compare food adulteration examples and simple home tests used to detect them.",
      "Explain the water cycle and connect it to the availability of fresh water for drinking.",
      "Evaluate water purification methods — sedimentation, filtration, chlorination, boiling, RO — by what each removes.",
      "Analyse causes of water pollution and propose realistic community-level solutions.",
    ],
    usage: [
      "Grade 5 answers are judged on reasoning, not recall, so push for the 'because' on every question. 'Chlorination is used because it kills germs but does not remove mud' is a Grade 5 answer; 'chlorination cleans water' is a Grade 3 one.",
      "Only about three per cent of the world's water is fresh, and most of that is frozen. Give your child that figure before the water-cycle questions — it reframes the conservation answers from slogans into arithmetic.",
      "For the adulteration section, discuss one real example you have heard of in the news or at a market. Grade 5 students write far better proposals when the problem is local rather than textbook.",
    ],
    faq: [
      {
        question: "How is this different from the Grade 4 food chapter?",
        answer:
          "Grade 4 identifies nutrients and preservation methods; Grade 5 explains processes — digestion and absorption, the water cycle, why each purification method suits a particular impurity, and pollution analysis.",
      },
      {
        question: "Does RO water need boiling too?",
        answer:
          "Generally no, since reverse osmosis removes both dissolved impurities and most microbes. The worksheet asks this to test whether a child can match a method to the impurity it targets.",
      },
      {
        question: "Should answers be written in full paragraphs?",
        answer:
          "For the 'explain' and 'suggest' questions, yes — two or three sentences with a reason. Labelling and matching questions can stay short.",
      },
      {
        question: "Is a diagram expected for the water cycle?",
        answer:
          "A labelled sketch with evaporation, condensation, precipitation and collection is a strong answer at Grade 5 and usually earns full credit.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "4|science|plants & animals": {
    objectives: [
      "Explain how roots, stems, leaves, flowers and fruit each contribute to a plant's survival.",
      "Describe adaptations that suit a plant or animal to its habitat — desert, aquatic, mountain, forest.",
      "Compare herbivores, carnivores and omnivores using teeth and diet as evidence.",
      "Build a simple food chain and explain what happens when one link is removed.",
      "Describe how seeds are dispersed by wind, water, animals and bursting, with an example of each.",
      "Explain how animals protect themselves through camouflage, mimicry, shells and speed.",
    ],
    usage: [
      "Work through one real plant before answering. Pull up a weed with roots intact, or use any potted plant, and name each part aloud — Grade 4 adaptation questions ask why a part is shaped as it is, which is hard to answer from a diagram alone.",
      "Food-chain questions are marked on arrow direction, and arrows point from the eaten to the eater because they show energy flow. Check the direction on the first chain together; most lost marks come from that single detail.",
      "For the adaptation section, ask 'what would go wrong if this animal lived somewhere else?' before writing. That question turns a memorised list of features into the reasoning Grade 4 papers are actually looking for.",
    ],
    faq: [
      {
        question: "Which way should food-chain arrows point?",
        answer:
          "From the organism being eaten towards the one eating it, because the arrow shows energy moving. Grass to grasshopper to frog, not the reverse.",
      },
      {
        question: "Is a cactus spine a leaf or a thorn?",
        answer:
          "Cactus spines are modified leaves — the reduced surface cuts water loss, and the thick green stem takes over photosynthesis. This is a favourite Grade 4 adaptation question.",
      },
      {
        question: "Does my child need to memorise habitat lists?",
        answer:
          "Not lists. What is assessed is matching a feature to a reason — thick fur for cold, webbed feet for water — so understanding a few clear examples beats memorising many.",
      },
      {
        question: "How is this different from the Grade 3 sheet on the same topic?",
        answer:
          "Grade 3 names parts and habitats; Grade 4 explains adaptation, food chains, seed dispersal and self-defence, and expects a reason with each answer.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "3|science|family & home": {
    objectives: [
      "Describe the difference between a nuclear and a joint family, with an example of each.",
      "Name relationships correctly — cousin, aunt, uncle, grandparent — and place them on a simple family tree.",
      "Explain how family members share work at home and why sharing matters.",
      "Identify the parts of a house and what each room is used for.",
      "List safety rules at home for electricity, fire, sharp objects and medicines.",
      "Explain how families help each other during illness, festivals and difficulties.",
    ],
    usage: [
      "Draw your own family tree on a spare sheet first. Grade 3 students confuse cousin with brother and aunt with sister constantly, and the confusion disappears once they have written their real relatives into boxes.",
      "For the shared-work questions, let your child list who actually does what in your home today rather than the textbook version. The answers are more honest and much easier for them to remember.",
      "Read the home-safety questions as a walk-around: check where the medicines are kept, which socket is loose, where matches are stored. The written answers then describe your house, not a generic one.",
    ],
    faq: [
      {
        question: "What is the difference between a nuclear and a joint family?",
        answer:
          "A nuclear family is parents and their children living together; a joint family also includes grandparents, uncles, aunts and cousins in the same home.",
      },
      {
        question: "My child calls a cousin 'brother'. Is that a mistake on the worksheet?",
        answer:
          "In everyday speech it is common, but the worksheet asks for the formal relationship: your uncle's or aunt's child is a cousin. Drawing the tree makes the distinction visible.",
      },
      {
        question: "Is this part of EVS?",
        answer:
          "Yes. Family types, relationships, shared responsibilities, parts of a home and home safety form the family-and-home unit of Grade 3 EVS.",
      },
      {
        question: "Are the questions about our own family or a general one?",
        answer:
          "Both. Some ask for standard definitions, others invite your child to describe their own family, and personal answers are fully acceptable there.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "3|math|addition": {
    objectives: [
      "Add three-digit numbers with regrouping in the ones and tens columns.",
      "Add three numbers in one sum by looking for pairs that make ten first.",
      "Estimate a sum by rounding to the nearest ten or hundred, then check the exact answer against it.",
      "Solve one- and two-step word problems and write the answer with its unit.",
      "Use the fact that addition can be done in any order to check a sum a second way.",
      "Find the missing number in sums such as 34 + __ = 71.",
    ],
    usage: [
      "Check the carried digit before checking the answer. Almost every wrong sum on a Grade 3 addition sheet is a carry written in the wrong column or forgotten entirely, not a fact your child does not know.",
      "Have your child estimate before calculating on the larger sums — 298 + 405 is 'about 700'. An answer of 1,203 then looks obviously wrong to them without you saying anything.",
      "For word problems, ask them to say what the answer will be about — rupees, books, minutes — before they touch the numbers. Most lost marks here come from solving correctly and labelling the wrong thing.",
    ],
    faq: [
      {
        question: "My child knows the facts but still gets sums wrong. Why?",
        answer:
          "Almost always column alignment or the carry. Squared paper, or one digit per box, fixes more Grade 3 addition errors than extra fact drill.",
      },
      {
        question: "Should my child still use fingers or counters?",
        answer:
          "Occasionally is fine, but by Grade 3 the aim is recall of facts to twenty plus a written method for larger numbers. If counters are used for every single fact, short daily fact practice will help more than this sheet.",
      },
      {
        question: "Is mental addition or the column method expected?",
        answer:
          "Both. Small sums are meant to be mental, while three-digit sums with regrouping are meant to be written in columns.",
      },
      {
        question: "Why does the worksheet ask for estimates?",
        answer:
          "Because estimating is the self-checking habit Grade 3 syllabuses introduce here — it catches answers that are wildly out before the answer key does.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "3|math|multiplication": {
    objectives: [
      "Recall multiplication tables up to 10 and use them without counting up.",
      "Understand multiplication as repeated addition and as equal groups or rows.",
      "Multiply a two-digit number by a one-digit number with carrying.",
      "Use the fact that 6 x 4 equals 4 x 6 to halve the number of facts to remember.",
      "Solve word problems that need multiplication, and explain how you knew it was not addition.",
      "Recognise multiplication patterns for 5, 10 and 9 and use them to check answers.",
    ],
    usage: [
      "Start with the two tables your child is least sure of rather than the whole sheet — usually 7 and 8 at Grade 3. Five minutes on those two makes the rest of the page much faster.",
      "When carrying in two-digit multiplication, the carried digit is added after multiplying, not before. That single sequencing mistake accounts for most wrong answers here, so watch the first two sums closely.",
      "For word problems, ask 'are the groups the same size?' If yes, it is multiplication; if not, it is addition. That one question sorts nearly every Grade 3 word problem correctly.",
    ],
    faq: [
      {
        question: "How much of the tables should be memorised by Grade 3?",
        answer:
          "Most syllabuses expect tables to 10 to be recalled without counting. Repeated addition remains a valid backup, but it slows down two-digit work considerably.",
      },
      {
        question: "My child adds when they should multiply. How do I fix it?",
        answer:
          "Have them draw the groups. Four boxes of three pencils drawn out makes the difference between 4 + 3 and 4 x 3 immediately obvious.",
      },
      {
        question: "Is the grid or box method acceptable?",
        answer:
          "Yes, if the school teaches it. What matters is that the method is used consistently and the answer can be explained.",
      },
      {
        question: "Why practise the 9 times table pattern?",
        answer:
          "Because the digits of each answer add to nine, which gives your child a quick way to check that 9 x 7 is 63 and not 62.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "3|math|time & money": {
    objectives: [
      "Read analog clocks to the nearest five minutes and use past and to correctly.",
      "Convert between hours and minutes, and between the 12-hour and 24-hour clock.",
      "Calculate elapsed time between two given times within the same day.",
      "Add and subtract money amounts, including rupees and paise, keeping columns aligned.",
      "Work out change from a given amount and check that the total makes sense.",
      "Read a simple timetable or bill and answer questions from it.",
    ],
    usage: [
      "Elapsed time is the hardest part of this topic at Grade 3, because children subtract times as if they were ordinary numbers. Count on in jumps instead — to the next hour, then whole hours, then the leftover minutes. Do the first question that way together.",
      "Use real coins and notes for the money questions. Working out change by physically making the amount is far more reliable at this age than a subtraction sum on paper, and the written answer follows easily afterwards.",
      "Twenty-five past and twenty-five to look almost identical on a clock face. Before starting, have your child say which side of the clock 'past' and 'to' live on — that single check prevents most reading errors.",
    ],
    faq: [
      {
        question: "Why does my child get elapsed-time questions wrong?",
        answer:
          "Because an hour has 60 minutes, not 100, so column subtraction breaks. Counting forward in jumps to the next hour is the method that works at Grade 3.",
      },
      {
        question: "Does this cover the 24-hour clock?",
        answer:
          "Yes, converting between 12-hour and 24-hour time is a standard Grade 3 skill and appears in these sheets, usually alongside a timetable question.",
      },
      {
        question: "Should my child know decimals to handle rupees and paise?",
        answer:
          "Only the idea that two digits after the point are paise. Full decimal arithmetic comes later; here the requirement is aligning the point and carrying correctly.",
      },
      {
        question: "Analog or digital clocks?",
        answer:
          "Mainly analog, since that is where the reading skill sits, with some digital and 24-hour conversion included.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "4|math|fractions": {
    objectives: [
      "Identify the numerator and denominator and say what each one counts.",
      "Recognise equivalent fractions and explain why 2/4 and 1/2 name the same amount.",
      "Compare and order fractions with the same denominator, and with the same numerator.",
      "Add and subtract fractions that share a denominator without changing the denominator.",
      "Convert between improper fractions and mixed numbers.",
      "Find a fraction of a quantity, such as three quarters of 20.",
    ],
    
    usage: [
      "The one misconception that causes most Grade 4 fraction errors is thinking a bigger denominator means a bigger fraction. Cut something real into halves and then into eighths — once your child sees that eighths are smaller pieces, 1/8 < 1/2 stops being confusing.",
      "When adding fractions with the same denominator, only the top numbers are added; the denominator names the size of the piece and does not change. Watch the first two sums for 1/5 + 2/5 = 3/10, which is the classic slip.",
      "Fold paper strips for the equivalent-fraction questions. A strip folded into quarters laid over one folded into halves proves 2/4 = 1/2 in a way no explanation matches, and the written answers get much faster afterwards.",
    ],
    faq: [
      {
        question: "Why did my child write 1/4 + 1/4 = 2/8?",
        answer:
          "They added the denominators too. The denominator says how big each piece is, so it stays the same; only the count of pieces is added, giving 2/4.",
      },
      {
        question: "Do these sheets include unlike denominators?",
        answer:
          "Grade 4 sheets focus on the same denominator, plus comparing and equivalent fractions. Adding unlike denominators with a common denominator is usually a Grade 5 skill.",
      },
      {
        question: "Are mixed numbers expected at Grade 4?",
        answer:
          "Yes, converting between improper fractions and mixed numbers is standard here, and these worksheets include both directions.",
      },
      {
        question: "How do I explain equivalent fractions simply?",
        answer:
          "Same amount, different sized pieces. Half a chapati and two quarters of the same chapati are the same food — that comparison usually settles it.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "1|english|phonics": {
    objectives: [
      "Match each letter to the sound it makes and blend three sounds into a word (c-a-t).",
      "Read and write short-vowel CVC words and hear the difference between pin and pen.",
      "Identify beginning and ending sounds in a spoken word.",
      "Recognise common digraphs sh, ch and th as one sound made by two letters.",
      "Read the first set of sight words — the, is, was, said — that cannot be sounded out.",
      "Segment a spoken word into its sounds before spelling it.",
    ],
    usage: [
      "Say every word out loud before writing it. Phonics is a listening skill first, and a Grade 1 child who has said 'sun' slowly almost always spells it correctly afterwards.",
      "The short vowels e and i are the hardest pair at this stage. Read the vowel-sound rows together, exaggerating each vowel, before your child fills any blanks.",
      "Keep sessions to ten minutes. Blending tires young readers quickly, and two short sessions produce noticeably better accuracy than one long one.",
    ],
    faq: [
      {
        question: "My child knows letter names but cannot blend. What now?",
        answer:
          "Names and sounds are different skills. Practise sounds only — /s/ not 'ess' — and stretch the word slowly, s-u-n, before speeding it up. Blending usually follows within a few weeks.",
      },
      {
        question: "Why do some words have to be memorised?",
        answer:
          "Words like 'said' and 'was' break the usual rules, so they are learnt by sight. The worksheet keeps them separate from the words meant to be sounded out.",
      },
      {
        question: "Should my child read the whole sheet aloud?",
        answer:
          "Yes. Reading aloud is how you catch a sound being guessed rather than decoded, and it is the fastest correction available.",
      },
      {
        question: "Is it a problem if b and d get reversed?",
        answer:
          "Very common at Grade 1 and usually resolves with practice. Point out that b has its belly at the back of the stick and move on rather than dwelling on it.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "2|english|reading": {
    objectives: [
      "Read a short passage and answer literal questions about who, what and where.",
      "Put the events of a story in the order they happened.",
      "Work out the meaning of an unfamiliar word from the sentence around it.",
      "Identify the main idea of a short paragraph in one sentence.",
      "Make a simple prediction about what happens next and give a reason from the text.",
      "Read aloud with attention to full stops, question marks and expression.",
    ],
    usage: [
      "Have your child read the passage twice: once aloud for accuracy, once silently for meaning. Grade 2 comprehension errors are usually reading-speed problems rather than thinking problems, and the second read fixes most of them.",
      "For every answer, ask your child to point at the line in the passage that proves it. This single habit is the difference between comprehension marks and confident guessing, and it transfers to every future reading test.",
      "If a word blocks them, cover it and read the rest of the sentence first. Working out meaning from context is one of the objectives on this sheet, not a shortcut around it.",
    ],
    faq: [
      {
        question: "My child reads well but answers questions wrongly. Why?",
        answer:
          "Decoding and comprehending are separate skills. Slowing the reading down and having them retell the passage in their own words before answering usually closes the gap.",
      },
      {
        question: "Should I read the passage to my child?",
        answer:
          "Only if independent reading is still very hard. Otherwise let them read and support only on stuck words, so the comprehension work stays theirs.",
      },
      {
        question: "Do the answers need full sentences?",
        answer:
          "Short answers are acceptable at Grade 2, but writing one full sentence for at least the main-idea question is good preparation for later grades.",
      },
      {
        question: "How long should this take?",
        answer:
          "Usually 15 to 20 minutes. If it stretches much beyond that, split it — passage and reading today, questions tomorrow.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  "2|english|vocabulary": {
    objectives: [
      "Match new words to their meanings and use each one in a sentence of your own.",
      "Identify simple synonyms and antonyms — big and large, hot and cold.",
      "Sort words into groups such as animals, food, weather and feelings.",
      "Recognise compound words and split them into the two words they came from.",
      "Choose the right word for a sentence when two options look similar.",
      "Use singular and plural forms of new words correctly, including the -es endings.",
    ],
    usage: [
      "A word is only learnt when your child uses it themselves, so ask for one spoken sentence per new word before anything is written. That step matters more than the matching exercise.",
      "Antonyms are easier than synonyms at Grade 2, because opposites feel obvious while 'nearly the same' does not. Do the antonym rows first to build momentum, then work on synonyms with a pair of examples in front of you.",
      "Keep the new words visible for the rest of the week — on a fridge note or a bookmark. Grade 2 vocabulary fades quickly without a second and third encounter after the worksheet.",
    ],
    faq: [
      {
        question: "How many new words should we tackle in one sitting?",
        answer:
          "Five to eight is plenty at Grade 2. Recall drops sharply beyond that, so a shorter list revisited twice beats a long list done once.",
      },
      {
        question: "Should we use a dictionary?",
        answer:
          "A children's picture dictionary is helpful, but try guessing from the sentence first — that guessing skill is one of the objectives here.",
      },
      {
        question: "My child mixes up synonyms and antonyms. Any tip?",
        answer:
          "Anchor the words themselves: antonym starts with 'anti', which means against, so it is the opposite. Most children stop swapping them once that link sticks.",
      },
      {
        question: "Are spellings tested too?",
        answer:
          "Spelling of the new words is practised but the focus is meaning and use. Getting the meaning right with an imperfect spelling is still a good answer at Grade 2.",
      },
    ],
  },
};
