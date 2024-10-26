import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges CSS class names using the clsx and twMerge utilities.
 * @param {...ClassValue[]} inputs - An array of class values to be merged.
 * @returns {string} A string of merged and optimized CSS class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
