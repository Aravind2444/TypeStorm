import { TypingStats } from "@/types";

/**
 * Calculate Words Per Minute (WPM)
 * Standard: 1 word = 5 characters (including spaces)
 */
export function calculateWPM(correctChars: number, timeInSeconds: number): number {
  if (timeInSeconds === 0) return 0;
  const minutes = timeInSeconds / 60;
  const words = correctChars / 5;
  return Math.round(words / minutes);
}

/**
 * Calculate Raw WPM (including errors)
 */
export function calculateRawWPM(totalChars: number, timeInSeconds: number): number {
  if (timeInSeconds === 0) return 0;
  const minutes = timeInSeconds / 60;
  const words = totalChars / 5;
  return Math.round(words / minutes);
}

/**
 * Calculate Accuracy Percentage
 * Formula: (correctChars / (correctChars + incorrectChars)) * 100
 */
export function calculateAccuracy(correctChars: number, incorrectChars: number): number {
  const total = correctChars + incorrectChars;
  if (total === 0) return 100;
  return Math.round((correctChars / total) * 100 * 10) / 10; // Round to 1 decimal
}

/**
 * Calculate Storm Points
 * Formula: WPM × (Accuracy / 100)
 * This rewards both speed and accuracy
 */
export function calculateStormPoints(wpm: number, accuracy: number): number {
  return Math.round(wpm * (accuracy / 100));
}

/**
 * Calculate complete typing statistics
 */
export function calculateStats(
  correctChars: number,
  incorrectChars: number,
  totalChars: number,
  timeInSeconds: number
): TypingStats {
  const wpm = calculateWPM(correctChars, timeInSeconds);
  const rawWpm = calculateRawWPM(totalChars, timeInSeconds);
  const accuracy = calculateAccuracy(correctChars, incorrectChars);
  const stormPoints = calculateStormPoints(wpm, accuracy);

  return {
    wpm,
    rawWpm,
    accuracy,
    errors: incorrectChars,
    correctChars,
    incorrectChars,
    totalChars,
    stormPoints,
  };
}

/**
 * Format time in MM:SS format
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Get next student name (student1, student2, etc.)
 */
export function getNextStudentName(): string {
  if (typeof window === 'undefined') return 'student1';
  
  const counterKey = 'typestorm_student_counter';
  
  // Get current counter (starts at 0)
  const currentCounter = parseInt(localStorage.getItem(counterKey) || '0', 10);
  const nextCounter = currentCounter + 1;
  
  // Save incremented counter
  localStorage.setItem(counterKey, nextCounter.toString());
  
  return `student${nextCounter}`;
}

/**
 * Reset student counter
 */
export function resetStudentCounter(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('typestorm_student_counter', '0');
}

/**
 * Get difficulty color
 */
export function getDifficultyColor(difficulty: 'easy' | 'medium' | 'hard'): string {
  switch (difficulty) {
    case 'easy':
      return 'text-green-500';
    case 'medium':
      return 'text-yellow-500';
    case 'hard':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
}

/**
 * Get difficulty badge variant
 */
export function getDifficultyBadgeVariant(difficulty: 'easy' | 'medium' | 'hard'): 'default' | 'secondary' | 'destructive' {
  switch (difficulty) {
    case 'easy':
      return 'default';
    case 'medium':
      return 'secondary';
    case 'hard':
      return 'destructive';
    default:
      return 'default';
  }
}
