/**
 * Topic-level content bank — batch 2.
 *
 * Covers the next highest-volume topics after the first ten. Same shape and
 * rotation rules as topicContent.ts: objectives, usage paragraphs and FAQ
 * entries written for what is specifically hard about that topic at that grade.
 */

import type { TopicContentBank } from "./topicContent";

export const TOPIC_CONTENT_BATCH_2: Record<string, TopicContentBank> = {
  // ────────────────────────────────────────────────────────────────────
  "1|science|plants & animals": {
    objectives: [
      "Name the main parts of a plant — roots, stem, leaf, flower — and say what each part does for the plant.",
      "Sort living things into plants and animals, and explain what makes something living.",
      "Match common animals to where they live: water, land, trees or underground.",
      "Describe what plants need to grow: water, sunlight, air and soil.",
      "Recognise that baby animals often look different from their parents and match a few common pairs.",
      "Group animals by an obvious feature such as feathers, fur, scales or number of legs.",
    ],
    usage: [
      "Grade 1 students learn plant and animal facts fastest when they can point at a real example, so do this worksheet near a window, a houseplant or a garden if you can. When a question asks about roots, tip a small potted plant sideways so the soil and roots are visible — the part hidden underground is the one children forget most often.",
      "Read each question aloud before your child writes. At this age reading load, not science knowledge, is usually what slows the sheet down. If your child answers correctly when you read the question but not when they read it alone, the science is fine and the reading is the thing to keep practising.",
      "After the sheet, go on a two-minute hunt: find one plant, one animal and one thing that is not living at all. Grade 1 children often think anything that moves is alive, so pointing at a car or a fan and saying 'moves, but not living' clears up the most common misunderstanding in this whole topic.",
    ],
    faq: [
      {
        question: "My child thinks anything that moves is alive. Is that normal?",
        answer:
          "Very normal at Grade 1. Cars, fans and clouds all move, so movement feels like the rule. Point out that living things grow, need food or water, and make young ones — a toy car does none of those.",
      },
      {
        question: "Does my child need to know animal names in English before starting?",
        answer:
          "The pictures and the common animal names in this worksheet are chosen to be familiar ones — cat, cow, fish, bird. If a name is new, say it aloud once and let your child repeat it; the worksheet then doubles as vocabulary practice.",
      },
      {
        question: "Why does the worksheet keep asking about roots?",
        answer:
          "Roots are the part children cannot see, so they get left out of drawings and labels. Repeated practice with roots, plus one look at a real plant out of its pot, fixes it quickly.",
      },
      {
        question: "Is any of this tested at Grade 1?",
        answer:
          "Most Grade 1 curricula assess exactly these basics: living versus non-living, plant parts, and where animals live. The worksheet stays inside that scope rather than adding harder classification.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "2|science|plants & animals": {
    objectives: [
      "Explain the job of each plant part, including how roots take in water and leaves make food.",
      "Sort animals into groups such as birds, fish, insects and mammals using visible features.",
      "Describe simple life cycles, for example seed to plant or egg to chick.",
      "Compare how different animals move, eat and protect themselves.",
      "Identify what a habitat is and match animals to the habitat that suits them.",
      "Recognise that plants and animals depend on each other, such as bees visiting flowers.",
    ],
    usage: [
      "Grade 2 is where children move from naming to explaining, so after each answer ask 'why?' once. If your child writes that roots take in water, ask what would happen without them. The spoken answer usually shows more understanding than the written one and tells you whether to re-read the section.",
      "If you can spare a jar and a bean, start a seed soaking the day before this worksheet. Life-cycle questions are much easier when a real sprout is sitting on the windowsill, because Grade 2 students find the order of stages easier to remember than the words for them.",
      "Work through the sorting questions with a pencil first, not a pen. Grade 2 children commonly place bats with birds and whales with fish, and being able to erase and re-sort after you talk about fur and feeding young keeps the focus on the reasoning rather than on the mistake.",
    ],
    faq: [
      {
        question: "My child put the bat with the birds. Is the worksheet too hard?",
        answer:
          "No — that mix-up is one of the most common in Grade 2, because flying looks like the deciding feature. Talk about fur and feeding milk to babies, then let your child re-sort. The mistake is a normal step, not a sign the sheet is too advanced.",
      },
      {
        question: "How much writing does this worksheet need?",
        answer:
          "Answers are short — a word, a label or a single sentence. It is designed so that limited spelling confidence does not block a child who understands the science.",
      },
      {
        question: "Do we need to grow a real plant to complete it?",
        answer:
          "No. Everything can be answered from the worksheet itself, though growing a bean in a jar alongside it makes the life-cycle questions noticeably easier to remember.",
      },
      {
        question: "What comes after this topic?",
        answer:
          "Grade 3 usually moves from parts and groups to how living things depend on their surroundings — food chains, adaptation and habitats in more detail. Solid plant parts and animal groups now make that step much smoother.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "3|science|plants & animals": {
    objectives: [
      "Describe how a plant makes its own food using sunlight, water and air.",
      "Explain how seeds are spread by wind, water, animals and bursting pods.",
      "Build simple food chains showing producer, consumer and predator.",
      "Explain how features such as beak shape, claws or thick fur suit an animal to where it lives.",
      "Compare life cycles that include a big change, such as caterpillar to butterfly or tadpole to frog.",
      "Give reasons why a plant or animal might not survive if its habitat changes.",
    ],
    usage: [
      "The hardest idea in Grade 3 is that plants make their own food rather than eating it from the soil. Before the sheet, ask your child where a plant's food comes from and note the answer. Work through the worksheet, then ask the same question again — comparing the two answers shows whether the key idea actually landed.",
      "Draw food-chain answers with arrows, and say out loud what the arrow means: 'is eaten by'. Grade 3 students frequently draw the arrows backwards, which looks like a careless slip but is really a sign the arrow's meaning was never stated. One sentence fixes it for good.",
      "Take the adaptation questions outside if possible. Looking at one real bird, insect or tree and naming a single feature that helps it survive turns a memorised list into something your child can reason about, which is what Grade 3 questions increasingly ask for.",
    ],
    faq: [
      {
        question: "My child says plants eat soil. How do I correct that?",
        answer:
          "Explain that soil gives water and minerals, while the food is made in the leaves using sunlight. A plant grown in water alone, such as a spring onion in a glass, is a quick and convincing demonstration.",
      },
      {
        question: "Why do the food-chain arrows keep getting reversed?",
        answer:
          "Because children read the arrow as 'eats' rather than 'is eaten by'. Say the phrase aloud each time an arrow is drawn and the direction becomes obvious.",
      },
      {
        question: "Is this worksheet only about animals?",
        answer:
          "No. Grade 3 questions deliberately connect plants and animals — seeds spread by animals, food chains that start with a plant — because the link between them is the point of the topic at this level.",
      },
      {
        question: "Does it include diagrams to label?",
        answer:
          "Most sheets in this topic mix labelling with short explanation questions, so your child practises both recognising parts and giving a reason.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "5|science|plants & animals": {
    objectives: [
      "Explain photosynthesis and respiration in simple terms and say where in the plant each happens.",
      "Classify animals into vertebrate groups and justify the choice with more than one feature.",
      "Trace energy through a food web and predict what happens if one organism is removed.",
      "Explain how structural and behavioural adaptations help survival in a specific habitat.",
      "Describe reproduction in flowering plants, including pollination, fertilisation and seed formation.",
      "Use accurate vocabulary such as habitat, species, producer, consumer and decomposer.",
    ],
    usage: [
      "Grade 5 questions reward precise wording, so read your child's written answers for the exact terms rather than the general idea. 'The plant makes food' is a Grade 2 answer; by Grade 5 it should mention sunlight, carbon dioxide, water and the leaf. Ask them to add the missing word rather than rewriting the sentence.",
      "Use the food-web questions as a prediction exercise. Cover one organism with a finger and ask what happens to the rest. Grade 5 students who can only recite a chain often struggle the moment a link is removed, and this is exactly what exam-style questions test.",
      "If a flower is available, take it apart alongside the reproduction questions. Naming the stamen and stigma on a real flower takes a few minutes and saves a lot of confusion later, because the diagram in a worksheet rarely matches the shape of the flower a child actually knows.",
    ],
    faq: [
      {
        question: "How much detail should a Grade 5 answer contain?",
        answer:
          "Enough to name the process and its inputs — for photosynthesis, sunlight, water and carbon dioxide, and the leaf as the place it happens. Correct terminology matters more at this grade than at any earlier one.",
      },
      {
        question: "My child confuses photosynthesis and respiration. Any tips?",
        answer:
          "Very common, because both involve gases. Anchor it by purpose: photosynthesis makes food and happens mainly in the light; respiration releases energy from that food and happens all the time, in plants as well as animals.",
      },
      {
        question: "Are decomposers included?",
        answer:
          "Yes, food-web questions at Grade 5 usually include decomposers, since energy returning to the soil is part of the expected picture at this level.",
      },
      {
        question: "Is this suitable revision before a test?",
        answer:
          "Yes. The mix of labelling, classification and short explanation questions matches the format of most Grade 5 science assessments on living things.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "2|science|environment": {
    objectives: [
      "Name everyday ways to save water and electricity at home and at school.",
      "Sort waste into materials that can be reused, recycled or thrown away.",
      "Explain why litter harms animals and plants in a place children know.",
      "Describe simple differences between clean and polluted air, water and land.",
      "Identify things people do that help the environment and things that harm it.",
      "Explain why trees matter, including shade, air and homes for animals.",
    ],
    usage: [
      "Environment questions land best when they point at your own home. As each answer is written, ask where that happens in your house — which tap drips, which light is left on. Grade 2 students remember a rule far better when it is attached to a room they walk through every day.",
      "Do the sorting questions with real items if you can. Hold up a paper bag, a plastic bottle and a banana peel and let your child place each one. Deciding with an object in hand is easier than deciding from a picture, and the reason your child gives will tell you whether the idea of a material has clicked.",
      "Finish by choosing one action from the worksheet to actually do for the rest of the week — turning off a tap while brushing teeth, or carrying litter to a bin. At Grade 2 the aim of this topic is habit as much as knowledge, and one kept promise teaches more than a full page of correct answers.",
    ],
    faq: [
      {
        question: "Is this topic just about recycling?",
        answer:
          "No. Grade 2 environment worksheets cover saving water and electricity, litter, clean air and water, and the role of trees. Recycling is one part of a wider set of everyday habits.",
      },
      {
        question: "My child says pollution is only smoke. How do I widen that?",
        answer:
          "Point out water pollution and litter as well. A blocked drain or a bottle in a park are things children can see, and they make the idea broader than chimneys and vehicles.",
      },
      {
        question: "Does the worksheet need any craft materials?",
        answer:
          "No, pencil and paper are enough. Having a few household items nearby to sort makes the material questions easier but is entirely optional.",
      },
      {
        question: "Will this frighten a sensitive child?",
        answer:
          "The tone stays practical and hopeful — mostly what we can do rather than what is going wrong — because Grade 2 students respond to actions they can take themselves.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "3|science|environment": {
    objectives: [
      "Explain where household waste goes and why reducing it matters.",
      "Describe the main causes of air, water and land pollution in everyday life.",
      "Explain how trees and plants keep air and soil healthy.",
      "Compare natural resources that can be replaced with those that cannot.",
      "Suggest practical school or neighbourhood actions that reduce waste or save water.",
      "Explain how pollution in one place affects living things somewhere else.",
    ],
    usage: [
      "By Grade 3 the expectation shifts from listing good habits to giving reasons, so after each answer ask 'and what happens next?' once. If your child writes that litter is bad, push gently for the chain: litter reaches the drain, the drain reaches the water, animals live in that water. That chain is what the topic is really assessing.",
      "Use your own bin as the demonstration. Look at what your family threw away yesterday, and ask which items could have been avoided, reused or recycled. Grade 3 students often know the recycling rules in theory but have never applied them to a real, mixed pile of rubbish.",
      "Split the sheet across two sittings, doing the pollution questions first and the 'what can we do' questions second, after a short walk outside. Noticing one real problem nearby makes the action questions specific instead of a list of memorised phrases.",
    ],
    faq: [
      {
        question: "My child gives very short answers. Is that a problem?",
        answer:
          "At Grade 3, examiners look for a reason attached to the answer. Encourage the word 'because' in at least half the answers — that one habit lifts the quality of a whole page.",
      },
      {
        question: "Are renewable and non-renewable resources covered here?",
        answer:
          "In simple form, yes — resources that can be replaced, such as trees and water, compared with fuels and minerals that cannot. Detailed energy sources come later.",
      },
      {
        question: "How do I answer 'why does it matter if only I do it?'",
        answer:
          "A fair question at this age. Multiply it: one person, one class, one school. Comparing one dripping tap with thirty makes the scale visible without a lecture.",
      },
      {
        question: "Can this be used in class?",
        answer:
          "Yes. The action questions work well as a group discussion or a small class project, and the pollution questions work as individual written practice.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "5|science|environment": {
    objectives: [
      "Explain the causes and effects of air, water, soil and noise pollution with specific examples.",
      "Describe how human activity such as deforestation changes a habitat and the species living in it.",
      "Compare renewable and non-renewable energy sources and give a reason for using each.",
      "Explain the water cycle and how pollution enters it at different points.",
      "Evaluate which conservation actions have the biggest effect and justify the choice.",
      "Use accurate vocabulary such as ecosystem, conservation, biodegradable and emissions.",
    ],
    usage: [
      "Grade 5 environment answers are judged on cause and effect, so ask your child to underline the effect in each of their own answers. If nothing can be underlined, the answer has named a problem without explaining what it does — the single most common reason for lost marks in this topic.",
      "Turn the energy questions into a household audit. List which appliances your family uses most, then ask which of them could run on a renewable source. Grade 5 students find renewable versus non-renewable abstract until it is attached to something that is actually plugged in.",
      "Take the evaluation questions slowly and allow disagreement. Asking whether planting trees or reducing plastic matters more has no single answer, and defending a choice with a reason is exactly the skill Grade 5 science is building. Write the reason down even if it is only one sentence.",
    ],
    faq: [
      {
        question: "Does my child need to memorise statistics?",
        answer:
          "No. Grade 5 questions ask for processes and reasons, not figures. Understanding how deforestation removes habitat matters far more than remembering a number.",
      },
      {
        question: "Is climate change part of this topic?",
        answer:
          "It appears in a simple form through emissions, fuels and tree cover. The worksheets stay on observable causes and effects rather than detailed climate science.",
      },
      {
        question: "My child gets anxious about environmental problems. Any advice?",
        answer:
          "Spend proportionally more time on the conservation and action questions than the pollution ones, and end each session with something your family can control. Agency reduces worry more effectively than reassurance does.",
      },
      {
        question: "Is this useful revision before an exam?",
        answer:
          "Yes. The vocabulary and cause-and-effect structure match how Grade 5 environment questions are usually worded in tests.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "1|science|food & water": {
    objectives: [
      "Sort familiar foods into groups such as fruits, vegetables, grains and dairy.",
      "Explain why the body needs food and water every day.",
      "Identify healthy choices and 'sometimes' foods from everyday examples.",
      "Describe where common foods come from — plants, animals or both.",
      "Explain simple rules for safe, clean drinking water.",
      "Practise good habits such as washing hands and washing fruit before eating.",
    ],
    usage: [
      "Do this worksheet near the kitchen. When a question names a food, open the fridge or a cupboard and find it. Grade 1 students sort foods much more accurately when they are looking at the real thing than when they are reading a word they may only half recognise.",
      "Avoid labelling any food as 'bad' while you work. The Grade 1 goal is 'every day' foods versus 'sometimes' foods, and keeping that wording protects a young child from an all-or-nothing idea about eating while still giving the right answer on the page.",
      "Use your child's own day as the example set: what they ate for breakfast, what they drank at school. Answering the healthy-choice questions using real meals from the last day makes the sheet concrete and usually starts a better conversation than the questions alone.",
    ],
    faq: [
      {
        question: "Will this make my child worry about food?",
        answer:
          "It is written around 'every day' and 'sometimes' foods rather than good and bad ones, which is the wording most Grade 1 curricula use and the least likely to create anxiety.",
      },
      {
        question: "My child does not recognise some vegetables. Is that a problem?",
        answer:
          "Not at all — that is part of what the sheet builds. Name the unfamiliar item, show a real one or a photo, and the vocabulary usually sticks after one or two mentions.",
      },
      {
        question: "How much writing is involved?",
        answer:
          "Very little. Most questions use circling, matching or sorting, so a child who is still learning to write can complete the whole page.",
      },
      {
        question: "Does it cover drinking water safety?",
        answer:
          "Yes, at a Grade 1 level — clean water, covered containers, and washing hands and fruit before eating.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "1|science|my body": {
    objectives: [
      "Name the main external body parts and point to each one.",
      "Match each of the five senses to the body part that does the sensing.",
      "Describe daily habits that keep the body clean and healthy.",
      "Explain what teeth do and how to care for them.",
      "Recognise that bodies need food, water, sleep and exercise.",
      "Talk about ways bodies are different and still work in the same way.",
    ],
    usage: [
      "This is the easiest science topic to make physical: for every part named on the page, have your child touch it on themselves. Grade 1 students learn body vocabulary through movement far faster than through reading, and the touching also keeps a wriggly child engaged for the whole sheet.",
      "Turn the senses questions into a quick game before writing. Close your child's eyes and hand them something to smell, hear or touch, then ask which body part told them what it was. When they then meet the same idea on paper, the answer is already theirs rather than something to be memorised.",
      "If your child is at the wobbly-tooth stage, do the teeth questions first — interest is highest right then. Afterwards, brush teeth together and count the strokes, so the health habit and the worksheet answer happen within a few minutes of each other.",
    ],
    faq: [
      {
        question: "Does this worksheet cover internal organs?",
        answer:
          "Only in the simplest terms if at all. Grade 1 focuses on external parts, the five senses and healthy habits, with organs like the heart and lungs introduced in later grades.",
      },
      {
        question: "My child is shy about body topics. Is the content sensitive?",
        answer:
          "No. The content stays on parts such as hands, eyes, ears and teeth, plus washing, sleeping and eating well, which is the standard Grade 1 scope.",
      },
      {
        question: "Can this be done without reading help?",
        answer:
          "Many children can, since the questions use short, familiar words and pictures. Reading the questions aloud once still helps most Grade 1 students work faster.",
      },
      {
        question: "How does this connect to other science topics?",
        answer:
          "It sits alongside food and water: what the body needs, and what the body does with it. Doing the two topics near each other reinforces both.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "2|english|phonics": {
    objectives: [
      "Blend and read words containing common digraphs such as sh, ch, th and wh.",
      "Identify long and short vowel sounds inside familiar one-syllable words.",
      "Read and spell words with consonant blends at the start and end, such as st, br and nd.",
      "Use the silent-e rule to read pairs like hop and hope.",
      "Break two-syllable words into parts to read them accurately.",
      "Spell common sight words that do not follow regular sound patterns.",
    ],
    usage: [
      "Say every word out loud before writing anything. Phonics is a sound skill printed on paper, and a Grade 2 child who reads silently will guess from the first letter. If a word is read wrongly, cover all but the first sound and uncover the rest slowly rather than correcting the whole word at once.",
      "Watch specifically for the silent-e pairs. When a child reads 'hope' as 'hop', the letters were all seen but the final e was treated as decoration. Point at the e, say 'this one makes the o say its name', then let them try the pair again — this single rule accounts for a large share of Grade 2 reading errors.",
      "Keep sessions to about ten minutes. Phonics accuracy drops sharply once attention fades, and two short sittings on one worksheet produce noticeably better results than one long push. If your child starts guessing rather than sounding out, that is the moment to stop.",
    ],
    faq: [
      {
        question: "My child reads well but spells the same words wrongly. Why?",
        answer:
          "Reading recognises a pattern; spelling has to reproduce it from memory, which is harder. Phonics worksheets that ask for both are deliberately building the second, slower skill.",
      },
      {
        question: "Should my child sound out every word, even known ones?",
        answer:
          "No. Familiar words should be read at sight; sounding out is for unfamiliar ones. If your child sounds out every single word, fluency practice with easy text will help alongside this sheet.",
      },
      {
        question: "What are sight words doing on a phonics sheet?",
        answer:
          "Words such as said, come and one break the usual rules, so they must be learned by memory. Mixing a few into phonics practice stops a child from trying to sound out words that cannot be sounded out.",
      },
      {
        question: "Is this suitable if my child is behind in reading?",
        answer:
          "Yes. The words are short and patterned, so the worksheet can be used with support at Grade 2 level or as catch-up practice for an older child working on the same patterns.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "3|english|vocabulary": {
    objectives: [
      "Work out the meaning of an unfamiliar word from the rest of the sentence.",
      "Match words to accurate synonyms and antonyms rather than loose alternatives.",
      "Use common prefixes and suffixes such as un-, re-, -ful and -less to build new words.",
      "Choose the correct word among similar-sounding options such as their, there and they're.",
      "Use new words in a sentence of your own to show the meaning is understood.",
      "Recognise that some words have more than one meaning depending on the sentence.",
    ],
    usage: [
      "Insist on one written sentence for every new word, even if the question does not ask for it. A Grade 3 student can match a word to a definition by elimination without knowing what it means; using it in a sentence of their own is the check that catches this immediately.",
      "For the meaning-from-context questions, cover the answer choices first and ask what your child thinks the word means from the sentence alone. Then uncover the options. This order builds the actual skill; the reverse order just tests guessing between four printed choices.",
      "Keep a short running list of the words your child got wrong across several worksheets and revisit it a few days later. Vocabulary needs spaced repetition rather than volume — five words seen again next week beat twenty words seen once.",
    ],
    faq: [
      {
        question: "My child matches words correctly but cannot use them in speech. Is that real learning?",
        answer:
          "It is partial. Recognising a word comes first, using it comes later. Asking for one sentence of their own for each word is the fastest way to move from one to the other.",
      },
      {
        question: "Should we use a dictionary while doing the worksheet?",
        answer:
          "Try the sentence clues first, then check the dictionary. Reaching for the dictionary immediately skips the context skill that these questions are designed to build.",
      },
      {
        question: "Are prefixes and suffixes Grade 3 level?",
        answer:
          "Yes, the common ones — un-, re-, -ful, -less. They are valuable because one rule unlocks many words at once, which is why they appear repeatedly at this grade.",
      },
      {
        question: "How often should we do vocabulary practice?",
        answer:
          "Short and frequent beats long and rare. Two or three ten-minute sessions a week, with earlier mistakes revisited, produces better retention than one long weekend session.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "1|math|word problems": {
    objectives: [
      "Read a short story problem and decide whether it needs adding or taking away.",
      "Pick out the two numbers that matter in a sentence problem.",
      "Draw or use objects to model a word problem before writing the number sentence.",
      "Write a number sentence that matches the story, then solve it.",
      "Check that an answer makes sense against the story, not just the arithmetic.",
      "Explain in words how the answer was found.",
    ],
    usage: [
      "Read the problem aloud twice: once for the story, once for the numbers. Grade 1 students who read only once tend to grab the two numbers and add them regardless of what the question asked. The second read is where 'how many are left' gets noticed.",
      "Let your child act the problem out with buttons, coins or blocks before writing anything. Word problems are the first place maths meets reading, and moving real objects removes the reading load long enough for the child to see whether the set is getting bigger or smaller.",
      "Ask 'more or fewer?' before any calculating. If your child can say the answer should be smaller than the number they started with, they have understood the problem, and the subtraction that follows is the easy part. If they cannot, re-read the story rather than practising the sum.",
    ],
    faq: [
      {
        question: "My child can add but not solve word problems. Why?",
        answer:
          "Because word problems test reading and choosing an operation as well as calculating. The arithmetic is fine; the missing step is deciding what the story is asking, which needs its own practice.",
      },
      {
        question: "Should I read the problems to my child?",
        answer:
          "Yes, at Grade 1 that is normal and helpful. Read the words, but let your child decide the operation and do the working — that is the part being learned.",
      },
      {
        question: "Do answers need a number sentence, or is the answer enough?",
        answer:
          "Write the number sentence. It shows the thinking, makes mistakes easy to spot, and is the format expected as problems get longer in later grades.",
      },
      {
        question: "My child always adds. How do I break that habit?",
        answer:
          "Ask whether the answer should be bigger or smaller than the starting number before any writing. Once that question becomes a habit, the automatic adding stops.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "4|math|multiplication": {
    objectives: [
      "Recall multiplication facts up to 10 x 10 with growing speed and accuracy.",
      "Multiply a two- or three-digit number by a single digit using column method with carrying.",
      "Multiply by 10, 100 and multiples of 10 and explain the shift in place value.",
      "Use the relationship between multiplication and division to check an answer.",
      "Solve word problems that need multiplication, including repeated groups and area.",
      "Estimate a product first to judge whether the calculated answer is reasonable.",
    ],
    usage: [
      "Check the carried digits before checking the answer. In Grade 4 column multiplication, most wrong answers come from a carry written in the wrong column or forgotten at the last step, not from unknown tables. Circle each carried digit as it is written and errors drop sharply.",
      "Time only the facts, never the long multiplication. Recall of tables benefits from a little speed pressure; multi-digit working needs care, and a timer there produces exactly the rushed carrying mistakes this topic is trying to eliminate.",
      "Ask for an estimate before each long multiplication: 48 x 6 is about 50 x 6, so about 300. Grade 4 students who estimate first catch their own place-value slips, which is a far more useful habit than being told the answer is wrong afterwards.",
    ],
    faq: [
      {
        question: "Must my child memorise all the tables before this worksheet?",
        answer:
          "Not all of them. Keep a table chart to hand for the facts that are still shaky, so the worksheet can build the column method rather than stalling on recall.",
      },
      {
        question: "Why is my child good at tables but wrong on long multiplication?",
        answer:
          "Almost always carrying and column alignment. Use squared paper or draw the columns, and circle every carried digit — this fixes the majority of these errors.",
      },
      {
        question: "Should the worksheet be timed?",
        answer:
          "Time the fact recall if you like, but leave the multi-digit questions untimed. Speed there causes exactly the slips you are trying to remove.",
      },
      {
        question: "How does this connect to division?",
        answer:
          "Closely. Every multiplication fact is a division fact reversed, and checking 7 x 8 = 56 by dividing 56 by 8 makes both topics stronger at the same time.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "4|math|division": {
    objectives: [
      "Divide two- and three-digit numbers by a single digit using long or short division.",
      "Interpret remainders correctly, including deciding what a remainder means in a story problem.",
      "Use known multiplication facts to find a quotient quickly.",
      "Recognise when a division has no remainder and check by multiplying back.",
      "Solve word problems involving sharing equally and grouping.",
      "Estimate a quotient before calculating to judge whether the result is sensible.",
    ],
    usage: [
      "Have your child multiply the answer back every time. Division is the one Grade 4 operation with a built-in check: quotient times divisor plus remainder should return the original number. Making this automatic turns a wrong answer into something your child finds themselves.",
      "Say the steps aloud while working — how many, multiply, subtract, bring down. Grade 4 students who lose their place mid-division almost always skipped the subtract or the bring-down step, and speaking the cycle keeps the order intact until it becomes habit.",
      "Give the remainder a meaning in every word problem. Four cars for nine children is not 'two remainder one' — it is a third car. Grade 4 questions increasingly ask what the remainder means in the story, and treating it as a leftover number is the commonest way marks are lost.",
    ],
    faq: [
      {
        question: "My child gets lost partway through a long division. What helps?",
        answer:
          "Saying the four steps aloud — how many, multiply, subtract, bring down — and using squared paper so each digit sits in its own column. Losing the place is nearly always a skipped step, not a maths gap.",
      },
      {
        question: "How should remainders be written?",
        answer:
          "At Grade 4 a remainder is usually written as 'r 3'. What matters more is interpreting it in word problems, where the answer may need rounding up rather than reporting a leftover.",
      },
      {
        question: "Is it fine to use multiplication tables while dividing?",
        answer:
          "Yes, and it is a good habit. Division depends on recall, so a chart keeps the focus on the method while the facts are still being learned.",
      },
      {
        question: "Should division be practised before multiplication is fluent?",
        answer:
          "They support each other, so some overlap is fine. If tables are very shaky, spend a few sessions there first and division will come together much faster.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "2|computer science|computer basics": {
    objectives: [
      "Point out and name the monitor, keyboard, mouse and speakers on a real or pictured computer.",
      "Say what a computer is used for at home and at school, with examples.",
      "Match the mouse actions click, double-click and drag to what each one does.",
      "Find letters, numbers, the space bar and the enter key on a keyboard.",
      "Explain the difference between turning a computer on and shutting it down properly.",
      "Learn early screen-time and care rules, such as clean hands and no food near the keyboard.",
    ],
    usage: [
      "Keep a real keyboard, laptop or tablet within reach. Grade 2 students answer computer-part questions from memory of an object, not from a word, so letting them press the space bar or move the mouse as each question comes up makes the whole sheet quicker and more accurate.",
      "Practise the mouse actions physically before writing. Ask your child to click once, then twice quickly, then drag something across the screen, and name each action out loud. Double-click is the one Grade 2 students find hardest because it depends on timing rather than knowledge.",
      "Do the shutting-down question last and then actually do it. Turning the computer off properly right after answering ties the answer to the action, and it is the habit most worth building at this age since it is the one children skip.",
    ],
    faq: [
      {
        question: "Is a real computer needed for this worksheet?",
        answer:
          "No, pencil and paper are enough. A real device nearby makes the parts and mouse questions considerably easier for a Grade 2 child to picture.",
      },
      {
        question: "My child only uses a touchscreen. Will the mouse questions be too hard?",
        answer:
          "They will be slower rather than too hard. A few minutes holding a mouse and watching the cursor move fills the gap before the questions come up.",
      },
      {
        question: "Does it teach typing?",
        answer:
          "Only key finding — letters, numbers, space and enter. Proper typing technique comes in later grades.",
      },
      {
        question: "Is internet safety part of this?",
        answer:
          "Only in the gentlest form, such as asking an adult before using a device. Digital safety has its own worksheets for this age group.",
      },
    ],
  },
};
