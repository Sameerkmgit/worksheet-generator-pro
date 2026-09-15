/**
 * Topic-level content bank.
 *
 * Each topic (grade + subject + topic name) has its own pool of learning
 * objectives, "How to Use" guidance and FAQ entries, written specifically for
 * what is genuinely hard or notable about that topic at that grade.
 *
 * Variants are rotated deterministically across the worksheets inside a topic
 * (see pickTopicContent) so no two worksheet pages in the same topic show the
 * same paragraphs.
 */

import { TOPIC_CONTENT_BATCH_2 } from "./topicContentBatch2";
import { TOPIC_CONTENT_BATCH_3 } from "./topicContentBatch3";

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface TopicContentBank {
  /** Pool of objectives — 4 are shown per page, rotated. */
  objectives: string[];
  /** Full "How to Use This Worksheet" paragraphs, one shown per page. */
  usage: string[];
  /** Pool of FAQ entries — 3 are shown per page, rotated. */
  faq: FaqEntry[];
}

const TOPIC_CONTENT_BATCH_1: Record<string, TopicContentBank> = {
  // ────────────────────────────────────────────────────────────────────
  "3|computer science|computer basics": {
    objectives: [
      "Identify the main parts of a computer — monitor, keyboard, mouse, and CPU — and explain what each one does in simple terms.",
      "Understand the difference between hardware (parts you can touch) and software (programs that run on the computer).",
      "Practice matching everyday computer tasks (typing, printing, browsing) to the device or program used to do them.",
      "Build vocabulary for basic computer terms like file, folder, icon, and cursor.",
      "Recognize simple input and output devices and sort them correctly.",
      "Describe the steps of starting up, using, and safely shutting down a computer.",
    ],
    usage: [
      "Because many Grade 3 students are still building hands-on comfort with computers, it helps to have an actual device nearby while completing this worksheet — even a phone or tablet works for pointing out a 'keyboard' or 'screen' in real life. Go through the worksheet together first, then let your child try labeling or answering on their own. If a real computer is available, pause and point out each part as it comes up in the questions.",
      "Start by asking your child to name every computer part they can see in the room before they read a single question — this shows you what vocabulary is already secure and what is still guesswork. Then work through the sheet. Children at this age often mix up 'monitor' and 'computer', so when that happens, tap the screen and then the box or laptop base so the difference is physical rather than verbal.",
      "Work this sheet in two short sittings rather than one long one. Do the labeling and matching questions first, then take a five-minute break to actually open a folder or type a sentence on a real device before finishing the vocabulary questions. Grade 3 students remember computer terms far better right after they have used the thing the word refers to.",
      "If your child uses a tablet at home but rarely a desktop, expect the mouse and CPU questions to be the slowest ones. Before starting, let them hold a mouse and move the cursor for a minute or two. Afterwards, review any question they answered with a shrug rather than a wrong answer — a shrug usually means the object itself is unfamiliar, not that the concept is too hard.",
    ],
    faq: [
      {
        question: "Does my child need to use a real computer to complete this worksheet?",
        answer:
          "No — this worksheet can be completed with pencil and paper alone. However, having access to a real computer or tablet nearby can help your child connect the terms and pictures to real objects they recognize.",
      },
      {
        question: "My child has never used a computer at school. Is this worksheet still appropriate?",
        answer:
          "Yes. This worksheet is designed to introduce Grade 3 students to basic computer vocabulary and concepts from the ground up, so no prior classroom computer experience is assumed.",
      },
      {
        question: "Is this worksheet aligned with a specific computer science curriculum?",
        answer:
          "It covers foundational computer literacy concepts (hardware vs. software, input vs. output, common terminology) that align with typical Grade 3 computer basics / digital literacy standards used across most school curricula.",
      },
      {
        question: "Why does my child keep calling the monitor 'the computer'?",
        answer:
          "This is the single most common Grade 3 mix-up, because the screen is the part children actually look at. Point to the screen and say 'monitor', then to the laptop base or tower and say 'the computer that does the thinking'. After two or three repetitions with a real device, most children stop swapping the words.",
      },
      {
        question: "My child uses only a tablet at home. Will the mouse and keyboard questions confuse them?",
        answer:
          "They may take a little longer, and that is expected. Tablet-only users often have no mental picture of a cursor. Let them move a mouse for a couple of minutes before the worksheet, or draw an arrow on paper and slide it around to show what a cursor does.",
      },
      {
        question: "Is there anything about online safety in this worksheet?",
        answer:
          "This sheet stays on parts, terms and devices rather than internet safety. If your child is already browsing, treat the vocabulary here as the groundwork — knowing what a file, folder and program are makes later safety rules such as 'do not open unknown files' actually make sense.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "1|math|time & money": {
    objectives: [
      "Read time to the nearest hour and half hour on an analog clock face.",
      "Recognize and name US coins — penny, nickel, dime, and quarter — by sight.",
      "Practice counting small groups of coins to find a total value.",
      "Connect everyday routines (breakfast, school, bedtime) to specific times shown on a clock.",
      "Build early number sense by relating clock numbers and coin values to counting skills already learned.",
      "Tell the difference between the short hour hand and the long minute hand without prompting.",
    ],
    usage: [
      "Time and money are two of the most abstract concepts for Grade 1 students because they can't be touched or counted the way objects can. Where possible, use a real clock (even a phone clock face) or real coins from a pocket or piggy bank alongside this worksheet — physically moving clock hands or sorting real coins into piles makes the ideas click faster than working from pictures alone.",
      "Split this sheet into a 'clock half' and a 'coin half' and do them on different days if your child tires quickly. They are separate skills that happen to share a worksheet. Before the clock questions, set a real or toy clock to 3 o'clock and then to half past 3 so your child sees the minute hand swing before they meet it on paper.",
      "Put four real coins on the table — a penny, nickel, dime and quarter — and let your child touch each one as you name it, before they answer anything. Grade 1 students often assume the bigger coin is worth more, which makes the nickel-versus-dime questions the ones to watch. When they get one wrong, go back to the real coins rather than explaining with words.",
      "Read the clock questions aloud with your child and let them point at the hour hand each time before answering. Many wrong answers at this age are hand-confusion, not number confusion. For the money questions, count out loud together in fives and tens first, since coin totals lean on skip counting your child may still be learning.",
    ],
    faq: [
      {
        question: "My child can count to 100 but still struggles with telling time. Is this normal?",
        answer:
          "Yes, very common. Counting and clock-reading use different skills — a clock face doesn't count in a straight line the way numbers on paper do. Repeated, short practice sessions like this worksheet help more than one long session.",
      },
      {
        question: "Should my child know all the coin names before starting this worksheet?",
        answer:
          "Not necessarily — this worksheet is often a child's first structured introduction to coin names and values, so it's fine to start here and learn the names as you go.",
      },
      {
        question: "Does this worksheet cover digital clocks as well as analog?",
        answer:
          "This worksheet focuses on analog clock reading, since that's the primary Grade 1 standard; digital time recognition is usually introduced as a follow-up skill.",
      },
      {
        question: "Why does my child think a nickel is worth more than a dime?",
        answer:
          "Because it is physically bigger. Size-equals-value is a very reasonable guess for a six-year-old. Lay the two coins side by side, count five pennies against one nickel and ten against one dime, and let the counting — not your explanation — settle it.",
      },
      {
        question: "My child mixes up the hour and minute hands every time. What helps?",
        answer:
          "Give the hands names based on length rather than job: the short one is the 'hour', the long one 'travels further, so it counts minutes'. Tracing the long hand around the face with a finger before answering each question fixes this for most children within a week.",
      },
      {
        question: "Do coin questions work if we don't use US currency?",
        answer:
          "The counting skill transfers, but the coin names will not match. If you are outside the US, do the clock questions as written and swap in your own coins on the table for the money questions so your child practises the same skip counting with familiar money.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "1|math|place value": {
    objectives: [
      "Break two-digit numbers into tens and ones and say how many of each there are.",
      "Build numbers up to 100 using bundles of ten and single units.",
      "Explain why the 4 in 42 stands for forty and not four.",
      "Compare two-digit numbers by looking at the tens digit first.",
      "Write the expanded form of a two-digit number (for example 36 = 30 + 6).",
      "Count on and back in tens from any two-digit number.",
    ],
    usage: [
      "Grade 1 place value is the first time a digit's position — not the digit itself — decides its value, and that is a genuine conceptual jump. Before starting, group ten small objects (pasta, beads, LEGO bricks) with an elastic band into a 'ten', and keep loose ones beside it. Let your child build each number from the worksheet with the real bundles, then write the answer.",
      "Do the first two questions together out loud, saying the number the long way: 'thirty-four is three tens and four ones.' Then let your child continue alone. The wording matters more than the writing at this stage — children who can say it correctly almost always write it correctly a few days later.",
      "Watch for the reversal error: a child who writes 13 for 'three tens and one one' has understood the digits but not the positions. If that happens, stop the worksheet, draw two boxes labelled 'tens' and 'ones', and let them place digits into the boxes for a few numbers before continuing.",
      "Use the worksheet as a five-minute daily warm-up rather than one long session. Place value settles through short repeated exposure, and Grade 1 attention for abstract number work is genuinely short. Finish each session by asking your child to make one number of their own choosing with the bundles.",
    ],
    faq: [
      {
        question: "My child can count to 100 but cannot say how many tens are in 60. Why?",
        answer:
          "Counting is a sequence learned by ear; place value asks the child to see 60 as six groups. They are different skills, and the second one always arrives later. Grouping real objects into tens is the fastest bridge between them.",
      },
      {
        question: "Why does my child write 51 instead of 15?",
        answer:
          "Digit reversal is very common in Grade 1 and is usually a position problem, not a number problem. Labelled 'tens' and 'ones' columns, used for a week or two, clear it up for most children.",
      },
      {
        question: "Do we need base-ten blocks for this worksheet?",
        answer:
          "No. The worksheet is complete with pencil and paper. Any ten identical small objects plus an elastic band do the same job as shop-bought blocks.",
      },
      {
        question: "How high should Grade 1 place value go?",
        answer:
          "Tens and ones up to 100 is the standard Grade 1 range. Hundreds are usually a Grade 2 skill, so there is no need to push past 100 before two-digit work is comfortable.",
      },
      {
        question: "Is expanded form (30 + 6) really necessary this early?",
        answer:
          "It is worth doing because it makes the value of each digit visible, and it is the exact idea your child will lean on for two-digit addition next year. Keep it short — a few numbers per session is plenty.",
      },
      {
        question: "How do I know when to move on to the next worksheet?",
        answer:
          "When your child can say a two-digit number as tens and ones without pausing, and build it with objects on the first try, the concept is secure enough to move on.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "5|computer science|computer basics": {
    objectives: [
      "Explain how input, processing, storage and output fit together as stages of how a computer works.",
      "Compare storage devices — hard drive, SSD, USB drive, cloud storage — and say when each is the sensible choice.",
      "Distinguish an operating system from the applications that run on top of it.",
      "Describe what happens when a file is saved, moved, renamed or deleted.",
      "Use accurate vocabulary for memory and storage, including the difference between RAM and disk space.",
      "Identify common units of digital storage (KB, MB, GB) and put them in order of size.",
    ],
    usage: [
      "By Grade 5 most students can use a computer confidently but cannot explain what it is doing, so this worksheet is about naming what they already do by habit. Have them complete it near a device, and after each section ask them to find the real thing on screen — the storage figures in system settings, the list of installed applications, the file they saved last week.",
      "The RAM-versus-storage question is the one Grade 5 students most often get wrong, because both are measured in gigabytes. Before starting, use the desk analogy out loud: the desktop is RAM (what you are working on right now, cleared when you leave) and the drawer is storage (what stays). Then let them answer, and revisit the analogy for anything they miss.",
      "Work through the sheet, then ask your child to explain one answer back to you as if teaching a younger sibling. At this level, being able to describe the input-process-output chain in their own words is a better sign of understanding than a correct multiple-choice mark.",
      "If your child is comfortable, turn two of the worksheet questions into a real task afterwards: check how much free space the family computer has, or find the size of a photo in kilobytes or megabytes. Grade 5 students hold onto storage units much more firmly once they have seen real numbers rather than textbook examples.",
    ],
    faq: [
      {
        question: "What is the difference between RAM and storage, in words my child will accept?",
        answer:
          "RAM is the desk your work sits on while you are working; storage is the drawer that keeps things after you finish. Turning the computer off clears the desk but not the drawer. That single comparison resolves most Grade 5 confusion here.",
      },
      {
        question: "My child is already good with computers. Is this worksheet too easy?",
        answer:
          "Fluent users often score well on the device questions and stumble on the vocabulary and unit questions, because using a computer and explaining one are different skills. Let them try it — the gaps usually appear in the second half.",
      },
      {
        question: "Does this cover coding or programming?",
        answer:
          "No. This sheet is computer literacy — parts, storage, operating systems and file handling. It is the vocabulary layer that makes later programming lessons easier to follow.",
      },
      {
        question: "Is cloud storage included?",
        answer:
          "Yes, as one storage option among several. Grade 5 students often think 'the cloud' means nowhere; it is worth saying plainly that it is someone else's computer in a data centre, reached over the internet.",
      },
      {
        question: "How should we handle the KB / MB / GB questions?",
        answer:
          "Order matters more than exact conversion at this level: a text document in kilobytes, a photo in megabytes, a film in gigabytes. Anchoring each unit to a real file type is more useful than memorising 1,024.",
      },
      {
        question: "Does this align with Grade 5 digital literacy standards?",
        answer:
          "It covers the standard Grade 5 territory: how a computer processes information, hardware and software roles, storage types and file management, which appears in most school digital-literacy frameworks at this level.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "1|math|addition": {
    objectives: [
      "Add two single-digit numbers within 20 accurately and confidently.",
      "Use 'counting on' from the larger number instead of counting both sets from one.",
      "Recognise number pairs that make 10 and use them to add quickly.",
      "Solve simple picture and word problems that involve joining two groups.",
      "Understand that 4 + 7 gives the same total as 7 + 4.",
      "Begin recalling small addition facts from memory rather than recounting each time.",
    ],
    usage: [
      "The main goal in Grade 1 addition is moving from counting everything to counting on. Watch your child's fingers: if they count both groups from one every time, that is the habit to change. For 8 + 3, cover the 8 with your hand, say 'eight', then count three fingers up — nine, ten, eleven. Do this for the first few questions before letting them continue alone.",
      "Keep the session to ten or fifteen minutes and stop while your child is still succeeding. Speed comes from many short sessions, not one long one. Small objects — buttons, coins, dry beans — should stay on the table so your child can check any answer they are unsure of instead of guessing.",
      "Before starting, run through the pairs that make 10 out loud (1 and 9, 2 and 8, 3 and 7, 4 and 6, 5 and 5). Sums that cross 10, such as 7 + 5, are where Grade 1 students slow down most, and knowing these pairs is what makes those questions manageable.",
      "Let your child answer, then ask 'how did you get that?' on two or three questions. A child who says 'I just knew it' is building fact recall; one who recounts from one each time still needs objects and counting-on practice. The explanation tells you more than the score does.",
    ],
    faq: [
      {
        question: "Should I stop my child from using their fingers?",
        answer:
          "No. Finger counting is a normal and useful stage in Grade 1. What is worth changing is counting both groups from one — encourage starting at the larger number and counting on instead.",
      },
      {
        question: "Why is 7 + 5 so much harder than 7 + 2?",
        answer:
          "Because it crosses ten, so your child must regroup rather than count a short distance. Practising the pairs that make ten, and splitting the 5 into 3 and 2, makes these sums much less daunting.",
      },
      {
        question: "How fast should a Grade 1 student be at addition?",
        answer:
          "Accuracy comes before speed. By the end of Grade 1, sums within 10 are usually quick and within 20 are reliable with some thinking time. Recall of larger facts continues developing through Grade 2.",
      },
      {
        question: "My child gets the answer right but takes a long time. Is that a problem?",
        answer:
          "Not at all — slow and correct is a good place to be. Timing pressure at this age tends to produce guessing. Fluency arrives from repetition over weeks, not from being hurried.",
      },
      {
        question: "Does my child need to know that 4 + 7 equals 7 + 4?",
        answer:
          "Yes, and it is a real time-saver rather than a technicality. Once your child trusts that order does not change the total, they can always start from the larger number, which halves the counting.",
      },
      {
        question: "Are word problems included?",
        answer:
          "Grade 1 addition sheets typically mix number sums with short picture or story problems about joining two groups, so your child practises recognising when addition is the right operation, not only how to compute it.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "1|math|subtraction": {
    objectives: [
      "Subtract within 20 using counting back and taking away from a group.",
      "Understand subtraction as both 'take away' and 'find the difference between'.",
      "Use known addition facts to work out related subtraction facts (if 6 + 3 = 9, then 9 − 3 = 6).",
      "Solve simple story problems where something is lost, eaten, given away or left over.",
      "Notice that subtraction cannot be reversed the way addition can — 9 − 4 is not 4 − 9.",
      "Read and complete number sentences with a missing number, such as 8 − ? = 5.",
    ],
    usage: [
      "Subtraction is harder than addition for Grade 1 students mainly because counting backwards is harder than counting forwards. Practise counting back from 15 out loud before you start the sheet. Keep ten or twenty small objects on the table so your child can physically remove items for any question that stalls.",
      "Read each word problem aloud and ask your child what is happening in the story before they write anything. Many Grade 1 errors here are story errors, not number errors — the child adds because two numbers appeared. Words like 'left', 'gave away' and 'ate' are the signals worth pointing out explicitly.",
      "Try the addition link on a few questions: for 9 − 3, ask 'three and what makes nine?' Some children find this route far easier than counting backwards, and it also strengthens the addition facts they already know. Use whichever method your child answers more confidently with, then compare the two.",
      "Keep sessions short and stop before frustration appears — subtraction is where Grade 1 confidence wobbles most. Finish by having your child make up one subtraction story of their own using objects on the table; being able to invent the situation shows the concept has landed.",
    ],
    faq: [
      {
        question: "Why does my child find subtraction so much harder than addition?",
        answer:
          "Counting backwards is genuinely harder than counting forwards, and 'taking away' is a less familiar action than joining. Both usually improve with objects to move and short daily practice rather than longer sessions.",
      },
      {
        question: "My child adds instead of subtracting in word problems. How do I fix that?",
        answer:
          "Have them retell the story in their own words before touching the pencil. Once they can say 'she had some and gave some away', the operation follows. Highlighting words like 'left' and 'gave away' also helps.",
      },
      {
        question: "Should my child count backwards or use addition to subtract?",
        answer:
          "Either is fine in Grade 1. Counting back suits small differences; 'what plus 3 makes 9?' suits larger ones. Showing both gives your child a choice rather than one fragile method.",
      },
      {
        question: "Is it a problem that my child writes 4 − 9 instead of 9 − 4?",
        answer:
          "It is a common early mistake and worth correcting directly: in subtraction the order matters. Modelling it with objects — you cannot take nine buttons from a pile of four — makes the reason obvious.",
      },
      {
        question: "How far should Grade 1 subtraction go?",
        answer:
          "Within 20 is the usual Grade 1 expectation, with facts within 10 becoming quick and reliable first. Two-digit subtraction with borrowing belongs to later grades.",
      },
      {
        question: "What about missing-number questions like 8 − ? = 5?",
        answer:
          "These look harder but build real flexibility, because your child has to think about the relationship rather than follow a procedure. If they stall, lay out eight objects and remove some until five remain.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "1|math|measurement": {
    objectives: [
      "Compare two objects directly and describe them as longer, shorter, heavier or lighter.",
      "Measure length using repeated non-standard units such as paper clips, cubes or hand spans.",
      "Line up the start of an object with the start of the ruler or unit before measuring.",
      "Order three or more objects from shortest to longest, or lightest to heaviest.",
      "Use comparison vocabulary correctly: taller, wider, holds more, about the same.",
      "Begin reading whole-number lengths in centimetres or inches on a simple ruler.",
    ],
    usage: [
      "Grade 1 measurement is a hands-on topic pretending to be a paper one. Before answering, have your child measure two or three real objects from the room with paper clips or cubes — a pencil, a spoon, a shoe. The paper questions make far more sense once the physical act of laying units end to end with no gaps has been done for real.",
      "Watch where your child starts measuring. Beginning at 1 on the ruler instead of 0, or leaving gaps between paper clips, is the classic Grade 1 measurement error and produces answers that are consistently one unit out. Correct the starting point physically rather than explaining it in words.",
      "Do the comparison questions first and the ruler questions second. Longer, shorter and heavier come naturally from handling objects, while reading a scale is the newer skill. If your child has no ruler to hand, cut a strip of paper into equal marked segments and use that instead.",
      "Turn the last few minutes into a real measuring game: find something taller than a book but shorter than the table. This kind of open task shows whether your child can apply the comparison language, which is the actual Grade 1 goal, rather than just repeating the words back.",
    ],
    faq: [
      {
        question: "Why does my child's measurement always come out one unit too long?",
        answer:
          "Almost always because they started at 1 rather than 0 on the ruler, or left small gaps between units. Have them place the very end of the object at the very start of the ruler and re-measure — the error usually disappears at once.",
      },
      {
        question: "Should Grade 1 use centimetres and inches, or paper clips and cubes?",
        answer:
          "Non-standard units first. Repeating a paper clip along an object teaches what measuring actually is; the ruler is a shortcut that makes sense afterwards. Most Grade 1 curricula do both, in that order.",
      },
      {
        question: "Do we need a real ruler for this worksheet?",
        answer:
          "No. The worksheet can be completed as printed, and a marked paper strip works for the practical parts if no ruler is available.",
      },
      {
        question: "My child says the longer object is always the heavier one. Is that normal?",
        answer:
          "Very. Length and weight get bundled together at this age. Let them hold a long empty box and a small full jar — feeling the contradiction separates the two ideas better than any explanation.",
      },
      {
        question: "Does this worksheet cover capacity as well as length and weight?",
        answer:
          "Grade 1 measurement sheets often include simple 'holds more / holds less' comparisons alongside length and weight, since all three rest on the same comparing-and-ordering skill.",
      },
      {
        question: "How much measuring practice is enough at this age?",
        answer:
          "Short and frequent beats long and occasional. Ten minutes with real objects a few times a week builds the vocabulary and the careful lining-up habit that later grades depend on.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "2|math|measurement": {
    objectives: [
      "Measure length in standard units — centimetres and inches — to the nearest whole unit.",
      "Choose a sensible unit and tool for what is being measured (ruler, tape measure, scale).",
      "Estimate a length first, then measure, and compare the estimate with the result.",
      "Add and subtract lengths to answer questions such as 'how much longer is A than B?'",
      "Understand that a larger unit gives a smaller count for the same object.",
      "Read simple scales and rulers where not every mark is numbered.",
    ],
    usage: [
      "Grade 2 measurement moves from comparing to quantifying, so accuracy of technique now matters. Have your child estimate each length aloud before measuring, then check. The estimate-then-measure habit is what turns measuring from a mechanical task into something they can sanity-check themselves.",
      "The most common Grade 2 error is reading a ruler where only every fifth or tenth mark is numbered. Before starting, point at three unnumbered marks and ask what they are. Getting this right on a real ruler prevents a whole column of near-miss answers on the worksheet.",
      "Do the 'how much longer' questions with two real objects and the ruler in front of you the first time. These questions are measurement plus subtraction, and children who can do each separately still trip when the two are combined. Once they have measured and subtracted physically, the paper version follows quickly.",
      "Split the sheet by tool: rulers first, then anything involving weight or capacity. Switching tools mid-page is where Grade 2 students lose track of which unit they are working in. Ask them to say the unit out loud with each answer — '14 centimetres', not just '14'.",
    ],
    faq: [
      {
        question: "My child measures accurately but forgets to write the unit. Does it matter?",
        answer:
          "Yes, and it is worth insisting on early. A bare '14' cannot be checked or compared. Asking them to say the number and unit aloud before writing fixes the habit within a few sessions.",
      },
      {
        question: "Why does my child struggle with rulers where not every line is numbered?",
        answer:
          "Because they are counting numerals rather than intervals. Have them count the unnumbered marks aloud between two labelled numbers a few times; once they see each gap as one unit, the reading becomes reliable.",
      },
      {
        question: "Should Grade 2 work in centimetres or inches?",
        answer:
          "Whichever your school uses primarily, and ideally some exposure to both. The important idea is that the same object gives different numbers in different units — which is exactly why the unit must be written down.",
      },
      {
        question: "How close should estimates be?",
        answer:
          "Roughly right is the aim, not exact. An estimate within about a quarter of the true length shows good sense of size at this age. The value is in noticing the gap between estimate and measurement, not in being nearly perfect.",
      },
      {
        question: "Do we need a tape measure and a scale for this worksheet?",
        answer:
          "No — the worksheet stands alone. If you have them, measuring one or two real objects afterwards makes the tool-choice questions considerably more concrete.",
      },
      {
        question: "Why does a bigger unit give a smaller number?",
        answer:
          "Because fewer large units fit into the same length. Measuring one object twice — first in centimetres, then in hand spans — makes this land immediately and heads off a very common Grade 2 misconception.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "2|math|place value": {
    objectives: [
      "Read, write and model three-digit numbers as hundreds, tens and ones.",
      "Explain what each digit in a number such as 407 represents, including the role of the zero.",
      "Compare and order three-digit numbers using the hundreds digit first, then tens, then ones.",
      "Write numbers in expanded form (for example 358 = 300 + 50 + 8).",
      "Count on and back in tens and hundreds from any three-digit number.",
      "Regroup ten ones as one ten and ten tens as one hundred.",
    ],
    usage: [
      "Grade 2 place value adds the hundreds column, and the hardest part is not big numbers but zeros. Ask your child what the 0 in 407 means before they start; if the answer is 'nothing', spend a few minutes on it with three labelled columns, because that misunderstanding produces wrong answers all the way through the sheet.",
      "Use hundreds, tens and ones columns drawn on scrap paper alongside the worksheet. Have your child place each number's digits into the columns before answering comparison questions. Once digits are in columns, 'compare the hundreds first' becomes something they can see rather than a rule to remember.",
      "Do the counting-in-tens questions out loud rather than in writing. Crossing a hundred — 290, 300, 310 — is where Grade 2 students hesitate, and hearing themselves cross the boundary correctly a few times is what makes it automatic.",
      "Finish with a regrouping demonstration: count out ten single objects, bundle them, then ten bundles into a hundred. Children who have physically made a hundred from tens handle the expanded-form and regrouping questions much more confidently than those who have only read about it.",
    ],
    faq: [
      {
        question: "My child says the 0 in 407 means nothing. How should I explain it?",
        answer:
          "It means no tens, and it holds the 4 in the hundreds place. Write 47 and 407 in labelled columns side by side — seeing the 4 shift columns when the zero is removed makes the zero's job obvious.",
      },
      {
        question: "Why does my child think 89 is bigger than 102?",
        answer:
          "Because 8 and 9 are bigger digits than 1, 0 and 2. Comparing digit sizes instead of place values is the standard Grade 2 slip. Put both numbers in hundreds-tens-ones columns and compare the leftmost column first.",
      },
      {
        question: "Do we need base-ten blocks?",
        answer:
          "They help but are not required. Ten bundles of ten straws, beans or pasta pieces do the same job, and making the hundred by hand is arguably more memorable than using ready-made blocks.",
      },
      {
        question: "How does this connect to two-digit addition?",
        answer:
          "Directly. Carrying is regrouping ten ones into a ten, and borrowing is the reverse. Solid place value in Grade 2 is what stops column addition from becoming a memorised set of steps.",
      },
      {
        question: "Should my child still be saying numbers the long way?",
        answer:
          "Yes, when they are unsure. Saying 'three hundreds, five tens and eight ones' before writing 358 catches most errors before they reach the page, and can be dropped once accuracy is consistent.",
      },
      {
        question: "How high should Grade 2 place value go?",
        answer:
          "Up to 1,000 is the usual Grade 2 range. Thousands can wait until three-digit work — including numbers with zeros in the middle — is comfortable.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  "4|math|addition": {
    objectives: [
      "Add multi-digit numbers using column addition with carrying across several places.",
      "Add numbers with different digit lengths by aligning place values correctly.",
      "Estimate a total by rounding first, then use it to check the exact answer is sensible.",
      "Solve multi-step word problems that combine addition with other operations.",
      "Use mental strategies — compensating, adding in parts — for numbers that suit them.",
      "Add amounts of money and measurements, keeping the decimal point aligned.",
    ],
    usage: [
      "By Grade 4 the arithmetic is rarely the problem — alignment and carrying across two or three places are. Have your child estimate each total by rounding before they calculate, then compare. An answer that is wildly different from the estimate is usually a carrying slip they can find themselves, which is a far more valuable skill than being told where the error is.",
      "Watch specifically for carries that chain, such as 4,897 + 3,156, where a carry creates another carry. If errors cluster there, slow down and have your child write the small carried digits above the columns rather than holding them in their head. Neatness here is not fussiness; it is the fix.",
      "For the word problems, ask your child to underline what is being asked before they compute anything. Grade 4 multi-step problems are usually lost at the reading stage, not the adding stage — a correct sum answering the wrong question is the most common wasted effort on these pages.",
      "Mix methods deliberately: have your child solve two questions in columns and two mentally, then discuss which suited which. Numbers such as 199 + 246 are quicker by compensating than by columns, and recognising that choice is a genuine Grade 4 objective rather than a shortcut.",
    ],
    faq: [
      {
        question: "My child understands addition but keeps getting multi-digit answers wrong. Why?",
        answer:
          "Nearly always alignment or a dropped carry rather than a gap in understanding. Squared paper, one digit per square, and writing carried digits above the columns removes most of these errors immediately.",
      },
      {
        question: "Should my child still be estimating at Grade 4?",
        answer:
          "Yes — it is what lets them catch their own mistakes. Rounding to the nearest hundred or thousand first gives a target; if the exact answer is far off, they know to check before you do.",
      },
      {
        question: "How do we handle adding numbers with different digit lengths?",
        answer:
          "Line up the place values, not the left edges. Writing a zero in the empty leading places (0,347 for 347) helps some children keep the columns straight while the habit forms.",
      },
      {
        question: "Are mental strategies still important once column addition is learned?",
        answer:
          "Very. Grade 4 standards expect flexibility: 199 + 246 is faster as 200 + 246 − 1. Always defaulting to columns is slower and hides whether the child understands the numbers.",
      },
      {
        question: "Why does my child solve the sum correctly but still get the word problem wrong?",
        answer:
          "Because multi-step problems fail at the reading stage. Underlining the question, and saying what the answer will describe before calculating, fixes far more of these than extra arithmetic practice.",
      },
      {
        question: "Does this worksheet include money and decimals?",
        answer:
          "Grade 4 addition sheets often include money amounts, where the rule is the same as whole numbers: align the decimal points and the place values take care of themselves.",
      },
    ],
  },
};

const TOPIC_CONTENT: Record<string, TopicContentBank> = {
  ...TOPIC_CONTENT_BATCH_1,
  ...TOPIC_CONTENT_BATCH_2,
};

/** Normalise a topic key so lookups are tolerant of casing and spacing. */
function makeKey(grade: string | number, subject: string, topic: string): string {
  const g = String(grade).replace(/[^0-9]/g, "");
  const s = subject.trim().toLowerCase();
  const t = topic
    .trim()
    .toLowerCase()
    .replace(/\s*\(.*?\)\s*/g, "")
    .replace(/\s+and\s+/g, " & ")
    .replace(/\s+/g, " ");
  return `${g}|${s}|${t}`;
}

/** Stable small hash so the same worksheet always gets the same variant. */
function variantSeed(worksheetId: string, title: string): number {
  const numeric = title.match(/worksheet\s*(\d+)/i)?.[1] ?? worksheetId.match(/\d+/)?.[0];
  if (numeric) return parseInt(numeric, 10);
  let h = 0;
  for (const ch of `${worksheetId}${title}`) h = (h * 31 + ch.charCodeAt(0)) % 100000;
  return h;
}

function rotate<T>(pool: T[], seed: number, take: number): T[] {
  if (pool.length === 0) return [];
  const start = seed % pool.length;
  const out: T[] = [];
  for (let i = 0; i < Math.min(take, pool.length); i++) {
    out.push(pool[(start + i) % pool.length]);
  }
  return out;
}

export interface ResolvedTopicContent {
  objectives: string[];
  usage: string;
  faq: FaqEntry[];
}

/**
 * Returns topic-specific objectives, usage guidance and FAQs for a worksheet,
 * or null when the topic is not in the content bank yet (caller falls back to
 * its generic generators).
 */
export function pickTopicContent(params: {
  worksheetId: string;
  title: string;
  grade: string | number;
  subject: string;
  topic?: string | null;
}): ResolvedTopicContent | null {
  const { worksheetId, title, grade, subject, topic } = params;
  if (!topic) return null;

  const bank = TOPIC_CONTENT[makeKey(grade, subject, topic)];
  if (!bank) return null;

  const seed = variantSeed(worksheetId, title);
  return {
    objectives: rotate(bank.objectives, seed, 4),
    usage: bank.usage[seed % bank.usage.length],
    faq: rotate(bank.faq, seed, 3),
  };
}

/** Topics currently covered by the bank (for auditing / reporting). */
export const COVERED_TOPIC_KEYS = Object.keys(TOPIC_CONTENT);
