import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a string to Title Case (first letter of each word capitalized).
 * Preserves special formatting:
 * - "WS" remains fully uppercase
 * - Ampersands (&) are preserved as-is
 * - Numbers are preserved
 * 
 * @example
 * toTitleCase("computer science") // "Computer Science"
 * toTitleCase("addition WS") // "Addition WS"
 * toTitleCase("teeth & microbes") // "Teeth & Microbes"
 */
export function toTitleCase(str: string | null | undefined): string {
  if (!str) return "";
  
  return str
    .split(" ")
    .map((word) => {
      // Preserve "WS" as uppercase
      if (word.toUpperCase() === "WS") return "WS";
      // Preserve ampersands
      if (word === "&") return "&";
      // Preserve numbers
      if (/^\d+$/.test(word)) return word;
      // Capitalize first letter, lowercase the rest
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

/**
 * Cleans display titles by removing unwanted labels like "(MCQ)" and "Regen".
 * This is a UI-only cleanup to keep database titles stable for SEO.
 * 
 * @example
 * cleanDisplayTitle("Addition Practice (MCQ)") // "Addition Practice"
 * cleanDisplayTitle("Regen Math Quiz") // "Math Quiz"
 * cleanDisplayTitle("Multiplication Regen WS") // "Multiplication WS"
 */
export function cleanDisplayTitle(str: string | null | undefined): string {
  if (!str) return "";
  
  return str
    // Remove "(MCQ)" including any surrounding spaces
    .replace(/\s*\(MCQ\)\s*/gi, " ")
    // Remove standalone "Regen" word (case-insensitive)
    .replace(/\bRegen\b\s*/gi, "")
    // Clean up any double spaces and trim
    .replace(/\s+/g, " ")
    .trim();
}
