import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Worksheet data organized by grade and subject
const worksheetsByGradeAndSubject: Record<string, Record<string, any[]>> = {
  "grade-1": {
    math: [
      { id: 3, title: "Introduction to Multiplication", preview: "https://images.unsplash.com/photo-1596496050755-c923e73e42e1?w=800", category: "Math", grade: "Grade 1" },
      { id: 16, title: "Simple Addition", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", category: "Math", grade: "Grade 1" },
      { id: 40, title: "Grade 1 Addition Practice - Numbers 1 to 10", preview: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400", category: "Math", grade: "Grade 1" },
      { id: 50, title: "Counting & Number Recognition (1-20)", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", category: "Math", grade: "Grade 1" },
      { id: 51, title: "Simple Subtraction (1-10)", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", category: "Math", grade: "Grade 1" },
      { id: 52, title: "Shapes & Patterns", preview: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400", category: "Math", grade: "Grade 1" },
      { id: 53, title: "Comparing Numbers (Greater/Less Than)", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", category: "Math", grade: "Grade 1" },
      { id: 54, title: "Skip Counting (2s, 5s, 10s)", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", category: "Math", grade: "Grade 1" },
    ],
    english: [
      { id: 20, title: "Alphabet Tracing", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 1" },
      { id: 14, title: "Letter Recognition", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 1" },
      { id: 41, title: "Alphabet Writing Practice (Letters A to M)", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "English", grade: "Grade 1" },
      { id: 55, title: "Vowels & Consonants", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 1" },
      { id: 56, title: "CVC Words (Cat, Dog, Sun)", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "English", grade: "Grade 1" },
      { id: 57, title: "Rhyming Words", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 1" },
      { id: 58, title: "Simple Sentences", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "English", grade: "Grade 1" },
      { id: 59, title: "Sight Words (Dolch List)", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 1" },
    ],
    science: [
      { id: 30, title: "Animal Habitats", preview: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400", category: "Science", grade: "Grade 1" },
      { id: 60, title: "Parts of a Plant", preview: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400", category: "Science", grade: "Grade 1" },
      { id: 61, title: "My Five Senses", preview: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400", category: "Science", grade: "Grade 1" },
      { id: 62, title: "Day & Night", preview: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400", category: "Science", grade: "Grade 1" },
      { id: 63, title: "Living vs Non-Living Things", preview: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400", category: "Science", grade: "Grade 1" },
      { id: 64, title: "Weather & Seasons", preview: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400", category: "Science", grade: "Grade 1" },
    ],
    hindi: [
      { id: 65, title: "हिंदी वर्णमाला (Hindi Alphabet)", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "Hindi", grade: "Grade 1" },
      { id: 66, title: "स्वर और व्यंजन (Vowels & Consonants)", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "Hindi", grade: "Grade 1" },
      { id: 67, title: "मात्राएँ (Matras)", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "Hindi", grade: "Grade 1" },
      { id: 68, title: "सरल शब्द (Simple Words)", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "Hindi", grade: "Grade 1" },
      { id: 69, title: "चित्र देखकर नाम लिखो", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "Hindi", grade: "Grade 1" },
    ],
    gk: [
      { id: 70, title: "Colors & Shapes", preview: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400", category: "General Knowledge", grade: "Grade 1" },
      { id: 71, title: "Animals & Their Babies", preview: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400", category: "General Knowledge", grade: "Grade 1" },
      { id: 72, title: "Fruits & Vegetables", preview: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400", category: "General Knowledge", grade: "Grade 1" },
      { id: 73, title: "Body Parts", preview: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400", category: "General Knowledge", grade: "Grade 1" },
      { id: 74, title: "My Family", preview: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400", category: "General Knowledge", grade: "Grade 1" },
    ],
    assignments: [
      { id: 31, title: "Grade 1 Practice Test", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 1" },
      { id: 75, title: "Weekly Test - Week 1", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 1" },
      { id: 76, title: "Monthly Test - Math & English", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 1" },
      { id: 77, title: "Revision Worksheet - Term 1", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 1" },
    ],
  },
  "grade-2": {
    math: [
      { id: 17, title: "Subtraction Practice", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", category: "Math", grade: "Grade 2" },
      { id: 42, title: "Multiplication Tables (2 and 5)", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", category: "Math", grade: "Grade 2" },
      { id: 78, title: "2-Digit Addition & Subtraction", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", category: "Math", grade: "Grade 2" },
      { id: 79, title: "Place Value (Tens & Ones)", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", category: "Math", grade: "Grade 2" },
      { id: 80, title: "Time (Hours & Minutes)", preview: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400", category: "Math", grade: "Grade 2" },
      { id: 81, title: "Money (Coins & Notes)", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", category: "Math", grade: "Grade 2" },
      { id: 82, title: "Measurement (Length & Weight)", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", category: "Math", grade: "Grade 2" },
    ],
    english: [
      { id: 18, title: "Word Building", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "English", grade: "Grade 2" },
      { id: 19, title: "Sentence Formation", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 2" },
      { id: 43, title: "Nouns and Verbs", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 2" },
      { id: 83, title: "Adjectives & Describing Words", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "English", grade: "Grade 2" },
      { id: 84, title: "Singular & Plural", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 2" },
      { id: 85, title: "Punctuation Practice", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "English", grade: "Grade 2" },
      { id: 86, title: "Story Sequencing", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 2" },
      { id: 87, title: "Simple Reading Comprehension", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "English", grade: "Grade 2" },
    ],
    science: [
      { id: 32, title: "Plants & Growth", preview: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400", category: "Science", grade: "Grade 2" },
      { id: 88, title: "Animal Classification", preview: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400", category: "Science", grade: "Grade 2" },
      { id: 89, title: "Water Cycle Basics", preview: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400", category: "Science", grade: "Grade 2" },
      { id: 90, title: "Healthy Food & Nutrition", preview: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400", category: "Science", grade: "Grade 2" },
      { id: 91, title: "Magnets & Materials", preview: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400", category: "Science", grade: "Grade 2" },
      { id: 92, title: "Human Body Parts", preview: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400", category: "Science", grade: "Grade 2" },
    ],
    hindi: [
      { id: 93, title: "दो अक्षर के शब्द (2-Letter Words)", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "Hindi", grade: "Grade 2" },
      { id: 94, title: "तीन अक्षर के शब्द (3-Letter Words)", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "Hindi", grade: "Grade 2" },
      { id: 95, title: "वाक्य बनाओ (Make Sentences)", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "Hindi", grade: "Grade 2" },
      { id: 96, title: "विलोम शब्द (Opposites)", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "Hindi", grade: "Grade 2" },
      { id: 97, title: "गिनती (Counting 1-50)", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "Hindi", grade: "Grade 2" },
    ],
    gk: [
      { id: 98, title: "Indian Festivals", preview: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400", category: "General Knowledge", grade: "Grade 2" },
      { id: 99, title: "Means of Transport", preview: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400", category: "General Knowledge", grade: "Grade 2" },
      { id: 100, title: "Community Helpers", preview: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400", category: "General Knowledge", grade: "Grade 2" },
      { id: 101, title: "Days, Months & Seasons", preview: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400", category: "General Knowledge", grade: "Grade 2" },
      { id: 102, title: "National Symbols of India", preview: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400", category: "General Knowledge", grade: "Grade 2" },
    ],
    assignments: [
      { id: 33, title: "Grade 2 Weekly Test", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 2" },
      { id: 103, title: "Monthly Test - All Subjects", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 2" },
      { id: 104, title: "Revision Sheet - Numbers & Words", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 2" },
      { id: 105, title: "Homework Pack - Week 1", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 2" },
    ],
  },
  "grade-3": {
    math: [
      { id: 1, title: "Addition Worksheet 1", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800", category: "Math", grade: "Grade 3" },
      { id: 2, title: "Addition Worksheet 2", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800", category: "Math", grade: "Grade 3" },
      { id: 20, title: "Multiplication Tables", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", category: "Math", grade: "Grade 3" },
      { id: 44, title: "Division Practice", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", category: "Math", grade: "Grade 3" },
    ],
    english: [
      { id: 21, title: "Grammar Basics", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "English", grade: "Grade 3" },
      { id: 45, title: "Reading Comprehension", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 3" },
    ],
    science: [
      { id: 22, title: "Water Cycle", preview: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400", category: "Science", grade: "Grade 3" },
    ],
    hindi: [
      { id: 106, title: "संज्ञा (Nouns)", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "Hindi", grade: "Grade 3" },
      { id: 107, title: "सर्वनाम (Pronouns)", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "Hindi", grade: "Grade 3" },
      { id: 108, title: "क्रिया (Verbs)", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "Hindi", grade: "Grade 3" },
      { id: 109, title: "पर्यायवाची शब्द (Synonyms)", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "Hindi", grade: "Grade 3" },
      { id: 110, title: "कहानी लेखन (Story Writing)", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "Hindi", grade: "Grade 3" },
    ],
    computer: [
      { id: 111, title: "Parts of a Computer", preview: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", category: "Computer Science", grade: "Grade 3" },
      { id: 112, title: "Input & Output Devices", preview: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400", category: "Computer Science", grade: "Grade 3" },
      { id: 113, title: "Keyboard Practice", preview: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", category: "Computer Science", grade: "Grade 3" },
      { id: 114, title: "Using a Mouse", preview: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400", category: "Computer Science", grade: "Grade 3" },
      { id: 115, title: "Internet Safety Basics", preview: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", category: "Computer Science", grade: "Grade 3" },
    ],
    gk: [
      { id: 116, title: "Famous Indian Leaders", preview: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400", category: "General Knowledge", grade: "Grade 3" },
      { id: 117, title: "World Continents & Oceans", preview: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400", category: "General Knowledge", grade: "Grade 3" },
      { id: 118, title: "Solar System Basics", preview: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400", category: "General Knowledge", grade: "Grade 3" },
      { id: 119, title: "Indian States & Capitals", preview: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400", category: "General Knowledge", grade: "Grade 3" },
      { id: 120, title: "Sports & Games", preview: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400", category: "General Knowledge", grade: "Grade 3" },
    ],
    assignments: [
      { id: 34, title: "Grade 3 Practice Assignment", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 3" },
      { id: 121, title: "Weekly Test - Math & Science", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 3" },
      { id: 122, title: "Monthly Assessment - All Subjects", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 3" },
      { id: 123, title: "Revision Worksheet - Term 2", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 3" },
    ],
  },
  "grade-4": {
    math: [
      { id: 23, title: "Division Practice", preview: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400", category: "Math", grade: "Grade 4" },
      { id: 46, title: "Introduction to Fractions", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", category: "Math", grade: "Grade 4" },
    ],
    english: [
      { id: 24, title: "Essay Writing", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 4" },
    ],
    science: [
      { id: 25, title: "Solar System", preview: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400", category: "Science", grade: "Grade 4" },
      { id: 47, title: "Our Solar System", preview: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400", category: "Science", grade: "Grade 4" },
    ],
    hindi: [
      { id: 124, title: "विशेषण (Adjectives)", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "Hindi", grade: "Grade 4" },
      { id: 125, title: "मुहावरे (Idioms)", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "Hindi", grade: "Grade 4" },
      { id: 126, title: "अनुच्छेद लेखन (Paragraph Writing)", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "Hindi", grade: "Grade 4" },
      { id: 127, title: "पत्र लेखन (Letter Writing)", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "Hindi", grade: "Grade 4" },
      { id: 128, title: "कविता (Poetry)", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "Hindi", grade: "Grade 4" },
    ],
    computer: [
      { id: 129, title: "MS Paint Basics", preview: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", category: "Computer Science", grade: "Grade 4" },
      { id: 130, title: "File Management", preview: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400", category: "Computer Science", grade: "Grade 4" },
      { id: 131, title: "Introduction to MS Word", preview: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", category: "Computer Science", grade: "Grade 4" },
      { id: 132, title: "Email Basics", preview: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400", category: "Computer Science", grade: "Grade 4" },
      { id: 133, title: "Computer Viruses & Safety", preview: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", category: "Computer Science", grade: "Grade 4" },
    ],
    gk: [
      { id: 134, title: "World Famous Landmarks", preview: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400", category: "General Knowledge", grade: "Grade 4" },
      { id: 135, title: "Indian History - Freedom Fighters", preview: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400", category: "General Knowledge", grade: "Grade 4" },
      { id: 136, title: "Inventions & Inventors", preview: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400", category: "General Knowledge", grade: "Grade 4" },
      { id: 137, title: "Indian Rivers & Mountains", preview: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400", category: "General Knowledge", grade: "Grade 4" },
      { id: 138, title: "World Leaders", preview: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400", category: "General Knowledge", grade: "Grade 4" },
    ],
    assignments: [
      { id: 35, title: "Grade 4 Test Paper", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 4" },
      { id: 139, title: "Weekly Quiz - English & Hindi", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 4" },
      { id: 140, title: "Monthly Test - Mathematics", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 4" },
      { id: 141, title: "Revision Pack - Mid-Term", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 4" },
    ],
  },
  "grade-5": {
    math: [
      { id: 26, title: "Fractions & Decimals", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", category: "Math", grade: "Grade 5" },
      { id: 48, title: "Decimals and Place Value", preview: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400", category: "Math", grade: "Grade 5" },
    ],
    english: [
      { id: 27, title: "Advanced Grammar", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "English", grade: "Grade 5" },
      { id: 49, title: "Essay Writing and Paragraph Structure", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "English", grade: "Grade 5" },
    ],
    science: [
      { id: 28, title: "Physics Basics", preview: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400", category: "Science", grade: "Grade 5" },
    ],
    hindi: [
      { id: 142, title: "निबंध लेखन (Essay Writing)", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "Hindi", grade: "Grade 5" },
      { id: 143, title: "अलंकार (Figures of Speech)", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "Hindi", grade: "Grade 5" },
      { id: 144, title: "रचना (Composition)", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "Hindi", grade: "Grade 5" },
      { id: 145, title: "वाक्य शुद्धिकरण (Sentence Correction)", preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", category: "Hindi", grade: "Grade 5" },
      { id: 146, title: "अपठित गद्यांश (Unseen Passage)", preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", category: "Hindi", grade: "Grade 5" },
    ],
    computer: [
      { id: 147, title: "MS PowerPoint Basics", preview: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", category: "Computer Science", grade: "Grade 5" },
      { id: 148, title: "Introduction to Spreadsheets", preview: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400", category: "Computer Science", grade: "Grade 5" },
      { id: 149, title: "Coding Basics - Scratch", preview: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", category: "Computer Science", grade: "Grade 5" },
      { id: 150, title: "Internet & Search Engines", preview: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400", category: "Computer Science", grade: "Grade 5" },
      { id: 151, title: "Cyber Security for Kids", preview: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", category: "Computer Science", grade: "Grade 5" },
    ],
    gk: [
      { id: 152, title: "United Nations & World Organizations", preview: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400", category: "General Knowledge", grade: "Grade 5" },
      { id: 153, title: "Indian Constitution Basics", preview: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400", category: "General Knowledge", grade: "Grade 5" },
      { id: 154, title: "Current Affairs & News", preview: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400", category: "General Knowledge", grade: "Grade 5" },
      { id: 155, title: "Science & Technology", preview: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400", category: "General Knowledge", grade: "Grade 5" },
      { id: 156, title: "Environmental Awareness", preview: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400", category: "General Knowledge", grade: "Grade 5" },
    ],
    assignments: [
      { id: 36, title: "Grade 5 Comprehensive Test", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 5" },
      { id: 157, title: "Pre-Board Examination", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 5" },
      { id: 158, title: "Final Revision - All Subjects", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 5" },
      { id: 159, title: "Sample Paper - Term 1", preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Assignments", grade: "Grade 5" },
    ],
  },
};

const subjectTitles: Record<string, string> = {
  math: "Math",
  english: "English",
  science: "Science",
  hindi: "Hindi",
  computer: "Computer Science",
  gk: "General Knowledge",
  assignments: "Assignments",
};

const gradeTitles: Record<string, string> = {
  "grade-1": "Grade 1",
  "grade-2": "Grade 2",
  "grade-3": "Grade 3",
  "grade-4": "Grade 4",
  "grade-5": "Grade 5",
};

const Category = () => {
  const { grade, subject } = useParams();
  const categoryWorksheets = worksheetsByGradeAndSubject[grade || ""]?.[subject || ""] || [];
  
  const gradeTitle = gradeTitles[grade || ""] || "Grade";
  const subjectTitle = subjectTitles[subject || ""] || "Worksheets";
  const pageTitle = `${gradeTitle} ${subjectTitle}`;
  
  const pageDescription = `Free printable ${pageTitle.toLowerCase()} worksheets. Download and print for classroom or home learning.`;

  const pageUrl = `https://smartkidsworksheets.com/category/${grade}/${subject}`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": pageUrl,
    "isPartOf": {
      "@type": "WebSite",
      "name": "SmartKids Worksheets",
      "url": "https://smartkidsworksheets.com"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://smartkidsworksheets.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": gradeTitle,
        "item": `https://smartkidsworksheets.com/category/${grade}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": subjectTitle,
        "item": pageUrl
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{pageTitle} Worksheets - Free Printable PDFs | SmartKids Worksheets</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        
        <meta property="og:title" content={`${pageTitle} Worksheets - Free Printable PDFs`} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>
      
      <Header />
      <div className="flex-1">
        <div className="container mx-auto max-w-[1140px] py-8 px-6">
          <Link to={`/category/${grade}`}>
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2" />
              Back to {gradeTitle}
            </Button>
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-heading">{pageTitle} Worksheets</h1>
            <p className="text-lg text-muted-foreground">
              Explore our collection of {categoryWorksheets.length} high-quality worksheets
            </p>
          </div>

          {/* Category Page Header Ad (responsive) */}
          <div className="bg-muted rounded-lg p-8 text-center border border-dashed border-border mb-8">
            {/* Google AdSense - Category Header - Replace with your ad code */}
            <p className="text-muted-foreground">Advertisement</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryWorksheets.map((worksheet) => (
            <Card key={worksheet.id} className="overflow-hidden group">
              <CardHeader className="p-0">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img 
                    src={worksheet.preview} 
                    alt={`${worksheet.title} worksheet preview - Free printable PDF for ${gradeTitle} ${subjectTitle}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors font-heading">{worksheet.title}</CardTitle>
                <p className="text-muted-foreground">High-quality educational worksheet</p>
              </CardContent>
              <CardFooter className="p-5 pt-0 flex gap-2">
                <Link to={`/worksheet/${worksheet.id}`} className="flex-1">
                  <Button className="w-full">
                    View Details
                  </Button>
                </Link>
                <Button variant="accent">
                  <Download className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Category;
