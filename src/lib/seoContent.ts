/**
 * Generates unique, grade-appropriate SEO content for Subject and Topic pages.
 * All content is deterministic based on grade + subject + topic combination.
 */

// ─── SUBJECT PAGE CONTENT ───────────────────────────────────────────

interface SubjectSEOContent {
  intro: string;
  keySkills: string[];
  exampleQuestions: string[];
  howToUse: string;
}

const subjectContent: Record<string, Record<string, SubjectSEOContent>> = {
  math: {
    "1": {
      intro: "In Grade 1 Math, young learners take their first steps into the world of numbers. Students explore counting, basic addition and subtraction, and learn to recognize shapes in their environment. These foundational skills build number sense and spatial awareness that will support all future math learning. Our worksheets make abstract concepts tangible through visual aids, hands-on counting activities, and real-world scenarios that first graders can relate to.",
      keySkills: [
        "Counting forward and backward from 1 to 100",
        "Adding and subtracting single-digit numbers",
        "Recognizing and naming basic 2D and 3D shapes",
        "Comparing numbers using greater than, less than, and equal to",
        "Understanding place value for tens and ones",
        "Telling time to the hour and half hour",
      ],
      exampleQuestions: [
        "What is 7 + 5? Draw objects to help you count.",
        "Circle the shape that has 4 equal sides. Is it a square or a rectangle?",
        "Which number is greater: 14 or 41? How do you know?",
      ],
      howToUse: "Print each worksheet and let your child work through problems at their own pace. Use physical objects like blocks or coins alongside the worksheets to make counting more hands-on. Celebrate small wins to build confidence — math should feel like an adventure, not a chore.",
    },
    "2": {
      intro: "Grade 2 Math builds on early number sense and introduces more complex operations. Students strengthen their addition and subtraction skills with two-digit numbers, begin exploring multiplication concepts, and deepen their understanding of measurement and data. These worksheets bridge the gap between concrete counting and abstract thinking, preparing second graders for more advanced problem solving.",
      keySkills: [
        "Adding and subtracting two-digit numbers with regrouping",
        "Skip counting by 2s, 5s, and 10s",
        "Introduction to multiplication as repeated addition",
        "Measuring length using standard and non-standard units",
        "Reading and creating simple bar graphs and picture graphs",
        "Working with money — coins and their values",
      ],
      exampleQuestions: [
        "What is 48 + 27? Show your work using place value.",
        "Skip count by 5s from 15 to 50. Write each number.",
        "You have 3 groups of 4 apples. How many apples in total?",
      ],
      howToUse: "Encourage your child to show their work on each problem — this builds mathematical reasoning. Use these worksheets alongside everyday activities: count change at the store, measure ingredients while cooking, or track weather data on a simple chart.",
    },
    "3": {
      intro: "Grade 3 Math marks a turning point where students transition from learning to add to mastering multiplication and division. Third graders tackle fractions for the first time, explore area and perimeter, and develop fluency with multi-digit arithmetic. Our worksheets provide structured practice that helps students internalize multiplication tables and build the problem-solving confidence they need for upper elementary math.",
      keySkills: [
        "Memorizing multiplication facts up to 10 × 10",
        "Understanding division as the inverse of multiplication",
        "Introducing fractions — halves, thirds, quarters, and equivalents",
        "Calculating area and perimeter of rectangles",
        "Solving two-step word problems",
        "Rounding numbers to the nearest 10 and 100",
      ],
      exampleQuestions: [
        "What is 7 × 8? Write a related division fact.",
        "Shade 3/4 of the rectangle. How many parts are shaded out of the total?",
        "A garden is 6 meters long and 4 meters wide. What is its area?",
      ],
      howToUse: "Focus on one skill at a time — master multiplication facts before moving to division. Use timed drills for fluency practice and untimed sheets for word problems. Revisit completed worksheets to track progress and identify areas that need extra attention.",
    },
    "4": {
      intro: "Grade 4 Math challenges students with multi-digit multiplication, long division, and deeper work with fractions and decimals. Fourth graders learn to think about numbers in more sophisticated ways, connecting arithmetic to geometry, measurement, and real-world data analysis. Our worksheets provide the repetition and variety needed to build true mathematical fluency at this critical stage.",
      keySkills: [
        "Multiplying multi-digit numbers using standard algorithm",
        "Long division with single-digit divisors",
        "Adding, subtracting, and comparing fractions with like denominators",
        "Understanding decimals to the hundredths place",
        "Classifying angles and geometric figures",
        "Interpreting data from line plots and graphs",
      ],
      exampleQuestions: [
        "Calculate 347 × 6 using the standard algorithm.",
        "Divide 852 by 4. What is the quotient and remainder?",
        "Which is greater: 3/8 or 5/8? Explain using a number line.",
      ],
      howToUse: "Break longer worksheets into manageable chunks across multiple sessions. Encourage students to estimate answers before calculating — this builds number sense. Use graph paper for multi-digit calculations to keep digits aligned.",
    },
    "5": {
      intro: "Grade 5 Math prepares students for middle school by solidifying operations with fractions, decimals, and introducing algebraic thinking. Fifth graders explore the coordinate plane, work with volume, and develop strategies for complex multi-step problems. These worksheets ensure students have the rock-solid foundation needed to transition confidently to pre-algebra and beyond.",
      keySkills: [
        "Adding, subtracting, multiplying, and dividing fractions and mixed numbers",
        "Performing operations with decimals through thousandths",
        "Evaluating expressions with parentheses and order of operations",
        "Plotting points on the coordinate plane",
        "Calculating volume of rectangular prisms",
        "Converting between measurement units",
      ],
      exampleQuestions: [
        "Solve: 2/3 + 3/4. Express your answer as a mixed number.",
        "Evaluate: (8 + 2) × 3 − 5. Show each step.",
        "A box is 5 cm long, 3 cm wide, and 4 cm tall. What is its volume?",
      ],
      howToUse: "At this level, students should practice explaining their reasoning in writing. After completing a worksheet, ask your child to teach you one problem — teaching deepens understanding. Mix timed fact practice with longer problem-solving sessions for balanced growth.",
    },
  },
  english: {
    "1": {
      intro: "Grade 1 English lays the groundwork for a lifetime of reading and writing. Students learn to decode words using phonics, build their sight word vocabulary, and begin writing simple sentences. Our worksheets make literacy learning engaging with colorful activities, tracing exercises, and stories that spark curiosity and a love of language.",
      keySkills: [
        "Recognizing and writing uppercase and lowercase letters",
        "Blending consonant and vowel sounds to read CVC words",
        "Reading and spelling common sight words",
        "Writing simple sentences with capital letters and periods",
        "Identifying nouns and action verbs in sentences",
        "Listening to and retelling simple stories",
      ],
      exampleQuestions: [
        "Which word rhymes with 'cat'? (bat, dog, sun)",
        "Write a sentence about your favorite animal. Remember to start with a capital letter!",
        "Circle all the nouns in this sentence: The dog ran to the big park.",
      ],
      howToUse: "Read the instructions aloud for emerging readers. Pair worksheets with read-aloud sessions — after a story, use related worksheets to practice new vocabulary. Keep sessions short (10–15 minutes) to maintain focus and enthusiasm.",
    },
    "2": {
      intro: "Grade 2 English expands reading comprehension and introduces structured writing. Students move beyond decoding to understanding what they read, learning to identify main ideas and story elements. Writing becomes more expressive as second graders learn to organize thoughts into paragraphs and use descriptive language. Our worksheets support this exciting transition from learning to read to reading to learn.",
      keySkills: [
        "Reading grade-level passages with fluency and expression",
        "Identifying the main idea and supporting details",
        "Using context clues to determine word meanings",
        "Writing organized paragraphs with topic sentences",
        "Applying correct capitalization and punctuation rules",
        "Distinguishing between common and proper nouns",
      ],
      exampleQuestions: [
        "Read the paragraph and write one sentence explaining the main idea.",
        "Add the correct punctuation: Is it going to rain today__",
        "Write three sentences describing your best day using at least two adjectives.",
      ],
      howToUse: "Have your child read passages aloud before answering questions — this builds fluency alongside comprehension. For writing worksheets, encourage drafting on scratch paper first, then copying a neat final version. Praise effort and creativity over perfection.",
    },
    "3": {
      intro: "Grade 3 English deepens reading comprehension and refines writing skills. Third graders analyze characters, settings, and plots in longer texts, while learning the mechanics of grammar that make their writing clearer and more engaging. Students begin writing multi-paragraph compositions and exploring different genres. Our worksheets provide targeted practice in the skills that transform good readers into great communicators.",
      keySkills: [
        "Analyzing characters, settings, and plot in fiction and nonfiction",
        "Using prefixes and suffixes to decode unfamiliar words",
        "Writing multi-paragraph essays with introduction, body, and conclusion",
        "Applying subject-verb agreement and proper tense usage",
        "Using quotation marks in dialogue",
        "Comparing and contrasting texts on the same topic",
      ],
      exampleQuestions: [
        "How does the main character change from the beginning to the end of the story?",
        "Add the prefix 'un-' or 're-' to complete: She had to ___do her homework.",
        "Write a short paragraph comparing cats and dogs as pets. Use transition words.",
      ],
      howToUse: "Encourage active reading — have students underline key details and circle unfamiliar words as they go. For grammar worksheets, review rules together before independent practice. Writing assignments work best when spread across multiple sittings: brainstorm, draft, revise.",
    },
    "4": {
      intro: "Grade 4 English challenges students to become analytical readers and purposeful writers. Fourth graders engage with complex texts, distinguish between fact and opinion, and learn to support arguments with evidence. Writing becomes more structured as students master essay organization, varied sentence structures, and the art of revision. Our worksheets build the critical thinking skills essential for academic success.",
      keySkills: [
        "Identifying theme, cause and effect, and author's purpose",
        "Distinguishing between fact, opinion, and inference",
        "Writing persuasive and expository essays with supporting evidence",
        "Using complex sentences with conjunctions and relative clauses",
        "Mastering homophones, synonyms, and antonyms",
        "Conducting basic research and citing sources",
      ],
      exampleQuestions: [
        "Is this statement a fact or an opinion? 'Chocolate ice cream is the best flavor.' Explain why.",
        "Write a persuasive paragraph about why recess should be longer. Include at least two reasons.",
        "Choose the correct homophone: Their/There/They're going to the library after school.",
      ],
      howToUse: "At this level, worksheets should spark discussion. After a reading comprehension exercise, talk about the text together — what did the author want readers to feel? For writing, use a checklist approach: does the piece have a clear thesis, supporting details, and a conclusion?",
    },
    "5": {
      intro: "Grade 5 English prepares students for the rigor of middle school language arts. Fifth graders tackle sophisticated literary analysis, master advanced grammar and vocabulary, and write across multiple genres including narrative, persuasive, and research-based essays. Our worksheets provide the challenging, thought-provoking practice that helps students develop the mature reading and writing skills they will need in secondary education.",
      keySkills: [
        "Analyzing figurative language: metaphor, simile, personification, and hyperbole",
        "Summarizing complex texts and drawing evidence-based conclusions",
        "Writing research reports with proper citations and bibliography",
        "Using semicolons, colons, and advanced punctuation",
        "Understanding word roots, Greek and Latin affixes",
        "Editing and revising writing for clarity, style, and voice",
      ],
      exampleQuestions: [
        "Identify the figurative language: 'The wind whispered through the trees.' Is this a simile, metaphor, or personification?",
        "Write a five-sentence summary of the passage. Include only the most important details.",
        "Use a semicolon to combine these sentences: She studied all night. She aced the test.",
      ],
      howToUse: "Fifth graders benefit from peer review — have students swap worksheets and provide feedback. For reading comprehension, encourage annotation with sticky notes. For writing, focus on the revision process: first drafts are meant to be improved, not perfected.",
    },
  },
  science: {
    "1": {
      intro: "Grade 1 Science introduces young learners to the wonders of the natural world. Students observe weather patterns, explore the five senses, learn about living and nonliving things, and begin to understand basic properties of materials. Our worksheets turn curiosity into structured learning, helping first graders develop observation skills and the habit of asking 'why?' about everything around them.",
      keySkills: [
        "Classifying objects as living or nonliving",
        "Observing and recording daily weather patterns",
        "Identifying the five senses and their associated organs",
        "Describing basic properties of materials (hard, soft, rough, smooth)",
        "Understanding basic needs of plants and animals",
        "Exploring push and pull forces through everyday examples",
      ],
      exampleQuestions: [
        "Is a rock living or nonliving? How do you know?",
        "Draw today's weather. Is it sunny, cloudy, or rainy?",
        "Which sense do you use to tell if a lemon is sour — sight, taste, or touch?",
      ],
      howToUse: "Combine these worksheets with hands-on exploration. After a worksheet about weather, step outside and observe the sky together. After learning about living things, go on a nature walk and find examples. Science is best learned by doing!",
    },
    "2": {
      intro: "Grade 2 Science expands students' understanding of life science, earth science, and physical science. Second graders investigate animal habitats, explore the water cycle, and experiment with the properties of matter. Our worksheets help students move from simple observation to making predictions and understanding cause-and-effect relationships in the world around them.",
      keySkills: [
        "Identifying animal habitats and adaptations",
        "Understanding the stages of the water cycle",
        "Classifying matter as solid, liquid, or gas",
        "Observing plant life cycles from seed to flower",
        "Exploring magnets and their properties",
        "Understanding basic food chains and ecosystems",
      ],
      exampleQuestions: [
        "Where does a polar bear live? Why is it adapted to cold weather?",
        "Put these water cycle stages in order: evaporation, condensation, precipitation, collection.",
        "Is orange juice a solid, liquid, or gas? How can you tell?",
      ],
      howToUse: "Use these worksheets as launching pads for simple experiments. After the water cycle worksheet, create a mini water cycle in a zip-lock bag. After learning about magnets, test household items to see which are magnetic. Active learning sticks!",
    },
    "3": {
      intro: "Grade 3 Science deepens inquiry skills as students investigate forces and motion, ecosystems, the solar system, and human body systems. Third graders learn to form hypotheses, conduct simple experiments, and record data. Our worksheets support the scientific method by guiding students through structured investigations while building their content knowledge across life, earth, and physical sciences.",
      keySkills: [
        "Understanding forces: gravity, friction, and magnetism",
        "Identifying parts of ecosystems and food webs",
        "Learning about the planets in our solar system",
        "Exploring the human skeletal and muscular systems",
        "Conducting simple experiments and recording observations",
        "Understanding light, sound, and energy sources",
      ],
      exampleQuestions: [
        "What force keeps you on the ground when you jump? Is it gravity or friction?",
        "Name the four inner planets of our solar system in order from the Sun.",
        "What happens to sound when you pluck a guitar string harder — does it get louder or softer?",
      ],
      howToUse: "Encourage students to predict answers before reading — this builds scientific thinking. Use the experiment worksheets as guides for real at-home investigations. Have students keep a science journal alongside these worksheets to track their observations and questions.",
    },
    "4": {
      intro: "Grade 4 Science introduces more complex systems and processes. Students explore electricity and circuits, the rock cycle, plant and animal cell structures, and the engineering design process. Fourth graders learn to analyze data, draw conclusions from evidence, and communicate scientific findings. Our worksheets challenge students to think like scientists by connecting classroom concepts to real-world phenomena.",
      keySkills: [
        "Building and understanding simple electrical circuits",
        "Identifying types of rocks and the rock cycle stages",
        "Comparing plant and animal cells",
        "Understanding the phases of the moon and Earth's rotation",
        "Exploring the engineering design process",
        "Analyzing weather data and climate patterns",
      ],
      exampleQuestions: [
        "Draw a simple circuit with a battery, wire, and light bulb. What happens if you break the circuit?",
        "How is an igneous rock different from a sedimentary rock?",
        "Why do we see different phases of the moon? Does the moon actually change shape?",
      ],
      howToUse: "These worksheets pair well with hands-on projects. Build a simple circuit after the electricity worksheet. Collect rocks to classify after studying the rock cycle. When students connect paper learning to physical experience, understanding deepens significantly.",
    },
    "5": {
      intro: "Grade 5 Science prepares students for middle school by covering advanced topics in chemistry, physics, biology, and earth science. Fifth graders explore mixtures and solutions, investigate the properties of light and sound waves, study organ systems, and analyze the interactions within Earth's spheres. Our worksheets develop higher-order thinking skills and scientific literacy that students will carry into their future studies.",
      keySkills: [
        "Distinguishing between mixtures and solutions",
        "Understanding properties of light: reflection, refraction, absorption",
        "Studying human organ systems and their interactions",
        "Analyzing the water cycle and its effects on weather and climate",
        "Exploring renewable and nonrenewable energy sources",
        "Understanding food webs and energy transfer in ecosystems",
      ],
      exampleQuestions: [
        "Is salt water a mixture or a solution? How could you separate the salt from the water?",
        "When light passes through a prism, it splits into colors. What is this called?",
        "Name three renewable energy sources and explain why they are considered renewable.",
      ],
      howToUse: "Fifth graders should be able to work through these worksheets independently, then discuss answers with a parent or teacher. Focus on the 'why' behind each answer. Encourage students to research topics that interest them beyond what the worksheet covers — curiosity is the best teacher.",
    },
  },
  "computer science": {
    "1": {
      intro: "Grade 1 Computer Science introduces young learners to technology in a fun and accessible way. Students learn to identify basic computer parts, understand the difference between hardware and software, and develop digital citizenship skills. Our worksheets make technology concepts tangible for first graders through picture-based activities, matching exercises, and simple sequencing tasks.",
      keySkills: [
        "Identifying computer parts: monitor, keyboard, mouse, CPU",
        "Understanding the difference between hardware and software",
        "Practicing basic mouse and keyboard skills",
        "Following simple step-by-step instructions (sequencing)",
        "Learning internet safety basics",
        "Recognizing technology in everyday life",
      ],
      exampleQuestions: [
        "Match each computer part to its picture: keyboard, mouse, monitor, speaker.",
        "Is a game on the computer hardware or software?",
        "Put these steps in order: 1) Turn on the computer 2) Open the program 3) Click the icon.",
      ],
      howToUse: "Use these worksheets alongside real computer time. After identifying parts on paper, have your child point to each part on a real computer. Keep sessions playful — technology learning should feel exciting, not intimidating.",
    },
    "2": {
      intro: "Grade 2 Computer Science builds on basic tech literacy by introducing simple coding concepts, file management, and expanded digital citizenship. Students learn what algorithms are through everyday examples, explore basic input and output, and practice responsible online behavior. Our worksheets use age-appropriate scenarios that connect computing ideas to activities second graders already understand.",
      keySkills: [
        "Understanding what an algorithm is through real-life examples",
        "Learning about input and output devices",
        "Practicing basic typing and keyboard shortcuts",
        "Creating and saving simple digital files",
        "Understanding online safety rules and digital footprints",
        "Recognizing patterns in sequences and data",
      ],
      exampleQuestions: [
        "Write the steps (algorithm) for making a peanut butter sandwich. Be very specific!",
        "Is a printer an input device or an output device? Why?",
        "What should you do if a stranger asks for your name online?",
      ],
      howToUse: "Connect the algorithm worksheets to real life — have your child write step-by-step instructions for daily routines. For typing practice, use the worksheets to identify keys, then practice on a real keyboard. Discuss internet safety scenarios as a family.",
    },
    "3": {
      intro: "Grade 3 Computer Science moves into structured problem-solving and introductory programming concepts. Students explore loops, conditionals, and debugging through unplugged activities and visual programming logic. They also learn about networks, data organization, and expanded digital responsibility. Our worksheets provide the logical thinking foundation that supports coding skills and computational problem solving.",
      keySkills: [
        "Understanding loops and repeating patterns in algorithms",
        "Using conditionals (if/then) in problem-solving",
        "Debugging: finding and fixing errors in instructions",
        "Learning how computers connect through networks",
        "Organizing and interpreting simple data sets",
        "Practicing responsible digital communication",
      ],
      exampleQuestions: [
        "Write an instruction using a loop: 'Repeat 4 times: draw one side of a square, turn right.'",
        "Fix the bug: The robot was told to go 'Forward, Forward, Left, Forward' but hit a wall. Which step is wrong?",
        "If it is raining, take an umbrella. If not, wear sunglasses. Write this as an if/then statement.",
      ],
      howToUse: "These worksheets work great as unplugged coding activities. Use grid paper and a toy figure to act out algorithms physically. When debugging, encourage your child to read instructions aloud step-by-step — hearing errors is often easier than seeing them.",
    },
    "4": {
      intro: "Grade 4 Computer Science introduces more sophisticated programming logic, data representation, and collaborative problem-solving. Students work with variables, nested loops, and event-driven programming concepts. They explore how data is stored and transmitted digitally, and learn about intellectual property and ethical technology use. Our worksheets build the analytical mindset essential for success in an increasingly digital world.",
      keySkills: [
        "Working with variables to store and change values",
        "Understanding nested loops and complex algorithms",
        "Exploring event-driven programming concepts",
        "Learning binary basics and how computers store data",
        "Understanding intellectual property and copyright",
        "Collaborating on technology projects and peer review",
      ],
      exampleQuestions: [
        "If score = 0, and you earn 10 points three times, what is the final value of score?",
        "Write a nested loop: For each row (1 to 3), draw 4 stars. How many stars total?",
        "Why should you not copy someone else's work from the internet without permission?",
      ],
      howToUse: "Connect variable concepts to math — they are similar to algebra. Use the worksheets as planning documents before moving to a visual programming platform. Encourage your child to work with a friend on debugging challenges to build collaboration skills.",
    },
    "5": {
      intro: "Grade 5 Computer Science prepares students for middle school technology and real-world programming. Students explore functions, abstraction, and decomposition — the building blocks of software design. They investigate how the internet works, practice cybersecurity awareness, and begin thinking about technology's impact on society. Our worksheets develop the computational thinking skills that modern employers value most.",
      keySkills: [
        "Using functions to organize and reuse code blocks",
        "Applying decomposition to break complex problems into parts",
        "Understanding how the internet and websites work",
        "Practicing cybersecurity: strong passwords and phishing awareness",
        "Exploring the societal impact of technology",
        "Designing and presenting simple technology solutions",
      ],
      exampleQuestions: [
        "Break down the task 'organize a birthday party' into 4 smaller sub-tasks (decomposition).",
        "What makes a strong password? Rate these: 'password123', 'Gx7!mK9p', 'mydog'. Explain.",
        "You create a function called 'greet' that says 'Hello!' — how would you use it three times without rewriting it?",
      ],
      howToUse: "These worksheets complement hands-on coding platforms. Use decomposition exercises before tackling any large project, whether digital or not. For cybersecurity worksheets, review your family's own passwords and online habits together — it makes the learning real and immediately useful.",
    },
  },
};

export function getSubjectSEOContent(grade: string, subject: string): SubjectSEOContent | null {
  const normalizedSubject = subject.toLowerCase();
  const content = subjectContent[normalizedSubject];
  if (!content) return null;
  return content[grade] || null;
}

// ─── TOPIC PAGE CONTENT ─────────────────────────────────────────────

interface TopicSEOContent {
  intro: string;
  whatKidsLearn: string[];
  exampleQuestions: string[];
  practiceTips: string;
}

// Topic content is generated dynamically based on grade + subject + topic
// to ensure uniqueness across hundreds of combinations.

const topicIntros: Record<string, Record<string, (grade: string, topic: string) => string>> = {
  math: {
    default: (grade, topic) =>
      `${topic} is a key math skill for Grade ${grade} students. This collection of worksheets provides focused practice to help learners build confidence and accuracy with ${topic.toLowerCase()} concepts. Each worksheet is carefully designed to match Grade ${grade} curriculum standards and gradually increase in difficulty, ensuring students develop a strong foundation before moving on to more challenging problems.`,
  },
  english: {
    default: (grade, topic) =>
      `${topic} is an essential part of the Grade ${grade} English curriculum. These worksheets help students develop their ${topic.toLowerCase()} skills through engaging exercises and real-world examples. From foundational understanding to applied practice, each worksheet guides learners through progressively challenging activities that build lasting language arts competence.`,
  },
  science: {
    default: (grade, topic) =>
      `Explore ${topic} with these Grade ${grade} Science worksheets designed to spark curiosity and deepen understanding. Students will investigate key concepts through observation, analysis, and hands-on thinking activities. Each worksheet connects ${topic.toLowerCase()} to real-world phenomena, helping young scientists see how classroom learning applies to the world around them.`,
  },
  "computer science": {
    default: (grade, topic) =>
      `${topic} is part of the Grade ${grade} Computer Science curriculum, introducing students to essential technology concepts. These worksheets use age-appropriate examples and activities to make ${topic.toLowerCase()} accessible and engaging. Students build computational thinking skills while exploring how ${topic.toLowerCase()} connects to everyday technology use.`,
  },
};

const topicLearningPoints: Record<string, Record<string, (grade: string) => string[]>> = {
  math: {
    addition: (g) => [
      `Solve addition problems appropriate for Grade ${g} difficulty level`,
      "Apply mental math strategies for quick calculations",
      "Use addition in word problems and real-life scenarios",
      "Check answers using inverse operations",
    ],
    subtraction: (g) => [
      `Master subtraction techniques at the Grade ${g} level`,
      "Understand borrowing and regrouping concepts",
      "Solve subtraction word problems with confidence",
      "Connect subtraction to real-world situations like making change",
    ],
    multiplication: (g) => [
      `Build fluency with Grade ${g} multiplication facts`,
      "Understand multiplication as repeated addition and arrays",
      "Apply multiplication to solve multi-step problems",
      "Use estimation to verify multiplication answers",
    ],
    division: (g) => [
      `Practice division at the Grade ${g} level`,
      "Understand the relationship between division and multiplication",
      "Solve division problems with and without remainders",
      "Apply division to sharing and grouping scenarios",
    ],
    fractions: (g) => [
      `Understand fraction concepts appropriate for Grade ${g}`,
      "Compare and order fractions using visual models",
      "Perform operations with fractions as required at this level",
      "Connect fractions to everyday situations like cooking and measurement",
    ],
    default: (g) => [
      `Master core concepts at the Grade ${g} level`,
      "Apply skills to solve grade-appropriate problems",
      "Build confidence through structured practice",
      "Connect math concepts to real-world applications",
      "Develop problem-solving strategies",
    ],
  },
  english: {
    grammar: (g) => [
      `Apply Grade ${g} grammar rules in writing`,
      "Identify and correct common grammatical errors",
      "Use proper sentence structure and punctuation",
      "Build stronger writing through grammar mastery",
    ],
    vocabulary: (g) => [
      `Expand word knowledge at the Grade ${g} level`,
      "Use context clues to determine word meanings",
      "Apply new vocabulary in speaking and writing",
      "Understand word relationships: synonyms, antonyms, and homophones",
    ],
    reading: (g) => [
      `Improve reading comprehension at the Grade ${g} level`,
      "Identify main ideas and supporting details in passages",
      "Make inferences and predictions based on text evidence",
      "Compare and contrast information across texts",
    ],
    writing: (g) => [
      `Develop Grade ${g} writing skills across genres`,
      "Organize ideas into clear paragraphs with topic sentences",
      "Use descriptive language and varied sentence structures",
      "Practice the writing process: brainstorm, draft, revise, edit",
    ],
    default: (g) => [
      `Strengthen language arts skills at the Grade ${g} level`,
      "Apply concepts through engaging practice activities",
      "Build reading and writing confidence",
      "Connect language skills to everyday communication",
    ],
  },
  science: {
    default: (g) => [
      `Explore key science concepts for Grade ${g}`,
      "Develop observation and inquiry skills",
      "Connect scientific ideas to everyday experiences",
      "Practice recording and analyzing observations",
      "Build vocabulary specific to this science topic",
    ],
  },
  "computer science": {
    default: (g) => [
      `Build technology skills appropriate for Grade ${g}`,
      "Develop logical thinking and problem-solving abilities",
      "Practice applying computer science concepts",
      "Connect digital skills to real-world technology use",
    ],
  },
};

const topicExampleQs: Record<string, Record<string, (grade: string) => string[]>> = {
  math: {
    addition: (g) => {
      const n = parseInt(g);
      if (n <= 2) return ["What is 15 + 28?", "Sam has 12 stickers and gets 9 more. How many does he have now?", "Fill in the blank: 34 + ___ = 50."];
      return ["Calculate 456 + 289. Show your work.", "A store sold 178 items in the morning and 243 in the afternoon. How many total?", "Find the missing number: ___ + 375 = 812."];
    },
    subtraction: (g) => {
      const n = parseInt(g);
      if (n <= 2) return ["What is 43 − 17?", "You had 25 candies and gave away 8. How many are left?", "Fill in the blank: 50 − ___ = 32."];
      return ["Calculate 704 − 368. Show your work.", "A library had 952 books. If 487 were checked out, how many remain?", "Find the missing number: 1000 − ___ = 635."];
    },
    multiplication: (g) => [
      `What is ${parseInt(g) <= 3 ? "6 × 7" : "24 × 15"}?`,
      `A box has ${parseInt(g) <= 3 ? "5" : "12"} rows of ${parseInt(g) <= 3 ? "4" : "8"} chocolates. How many chocolates in total?`,
      `Write a multiplication word problem using the numbers ${parseInt(g) <= 3 ? "3 and 9" : "15 and 7"}.`,
    ],
    division: (g) => {
      const n = parseInt(g);
      if (n <= 3) return ["Share 24 stickers equally among 4 friends. How many does each get?", "What is 36 ÷ 6?", "Is 15 divisible by 4? If not, what is the remainder?"];
      return ["Divide 1,248 by 6. Show your work.", "A farmer packs 864 eggs into cartons of 12. How many cartons does he need?", "What is 945 ÷ 7? Check your answer using multiplication."];
    },
    fractions: (g) => {
      const n = parseInt(g);
      if (n <= 3) return ["Color 2/4 of the shape. Is 2/4 the same as 1/2?", "Which is larger: 1/3 or 1/4? Draw a picture to show why.", "A pizza has 8 slices. You eat 3. What fraction is left?"];
      return ["Add: 3/5 + 1/5 = ?", "Convert 7/4 to a mixed number.", "Order these fractions from least to greatest: 2/3, 1/2, 5/6."];
    },
    default: (g) => [
      "Solve the practice problems on the worksheet.",
      "Show your work for each question.",
      "Check your answers and correct any mistakes.",
    ],
  },
  english: {
    grammar: (g) => {
      const n = parseInt(g);
      if (n <= 2) return ["Circle the verb in the sentence: The cat jumped over the fence.", "Add the correct punctuation: Where are you going___", "Write a sentence using the word 'because'."];
      return ["Rewrite the sentence using the correct verb tense: Yesterday, she walk to the store.", "Combine these sentences using a conjunction: I like apples. I like oranges.", "Identify the adverb: She quickly finished her homework."];
    },
    vocabulary: (g) => [
      "Use context clues to figure out the meaning of the underlined word in the passage.",
      "Write a sentence using each vocabulary word correctly.",
      "Match each word to its synonym and antonym.",
    ],
    reading: (g) => [
      "Read the passage and answer: What is the main idea?",
      "How does the character feel at the end of the story? Use evidence from the text.",
      "What do you think will happen next? Support your prediction with details.",
    ],
    default: (g) => [
      "Complete the practice exercises on the worksheet.",
      "Read the passage carefully before answering questions.",
      "Check your spelling and punctuation in all written answers.",
    ],
  },
  science: {
    default: (g) => [
      "Observe the diagram and label each part correctly.",
      "Explain in your own words how this process works.",
      "What would happen if one part of the system changed? Make a prediction.",
    ],
  },
  "computer science": {
    default: (g) => [
      "Identify the technology concept shown in the worksheet.",
      "Follow the step-by-step instructions and complete the activity.",
      "Explain in your own words why this concept matters.",
    ],
  },
};

const topicPracticeTips: Record<string, Record<string, (grade: string, topic: string) => string>> = {
  math: {
    default: (g, t) =>
      `For the best results with ${t} practice, work through problems in order from easiest to hardest. If your child gets stuck, encourage them to re-read the problem and try drawing a picture or using objects to visualize it. Aim for 10–15 minutes of focused practice daily rather than long, tiring sessions. Review completed worksheets together to celebrate correct answers and learn from mistakes — both are valuable!`,
  },
  english: {
    default: (g, t) =>
      `To get the most from these ${t} worksheets, create a quiet reading and writing space free from distractions. Encourage your child to read questions twice before answering. For writing exercises, remind them that a first draft doesn't need to be perfect — the goal is to get ideas down, then polish them. Reading aloud helps with fluency and comprehension, so pair worksheet time with a daily read-aloud session.`,
  },
  science: {
    default: (g, t) =>
      `Science learning thrives on curiosity. Before starting a ${t} worksheet, ask your child what they already know about the topic and what questions they have. After completing the worksheet, explore the concept further with a simple at-home experiment or a nature observation. Encourage your child to keep a science notebook where they record interesting facts and questions — this builds lifelong scientific thinking habits.`,
  },
  "computer science": {
    default: (g, t) =>
      `When practicing ${t}, connect worksheet concepts to real technology your child uses every day. Discuss how the concepts apply to phones, tablets, and computers around your home. For algorithm and coding worksheets, try acting out the instructions physically before writing answers — this makes abstract concepts concrete. Keep sessions interactive and discussion-based rather than purely written.`,
  },
};

export function getTopicSEOContent(grade: string, subject: string, topic: string): TopicSEOContent {
  const subj = subject.toLowerCase();
  const topicKey = topic.toLowerCase().replace(/[^a-z ]/g, "").trim();

  // Intro
  const introFns = topicIntros[subj] || topicIntros.math;
  const introFn = introFns[topicKey] || introFns.default;
  const intro = introFn(grade, topic);

  // Learning points
  const learnFns = topicLearningPoints[subj] || { default: (g: string) => topicLearningPoints.math.default(g) };
  const learnFn = learnFns[topicKey] || learnFns.default;
  const whatKidsLearn = learnFn(grade);

  // Example questions
  const exQFns = topicExampleQs[subj] || { default: () => topicExampleQs.math.default("3") };
  const exQFn = exQFns[topicKey] || exQFns.default;
  const exampleQuestions = exQFn(grade);

  // Practice tips
  const tipFns = topicPracticeTips[subj] || { default: topicPracticeTips.math.default };
  const tipFn = tipFns[topicKey] || tipFns.default;
  const practiceTips = tipFn(grade, topic);

  return { intro, whatKidsLearn, exampleQuestions, practiceTips };
}
