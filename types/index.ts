// TypeStorm Type Definitions

export type TestMode = 'time' | 'words';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type TestStatus = 'idle' | 'ready' | 'running' | 'finished';

export interface TestSettings {
  mode: TestMode;
  duration: number; // seconds for time mode
  wordCount: number; // words for word mode
  difficulty: Difficulty;
}

export interface CharacterState {
  char: string;
  status: 'correct' | 'incorrect' | 'pending';
  isExtra?: boolean; // for extra characters typed
}

export interface WordState {
  word: string;
  characters: CharacterState[];
  isActive: boolean;
  isCompleted: boolean;
}

export interface TypingStats {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  errors: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  stormPoints: number; // WPM × (Accuracy / 100)
}

export interface TestResult extends TypingStats {
  timestamp: number;
  duration: number;
  difficulty: Difficulty;
  mode: TestMode;
  studentName: string;
}

export interface LeaderboardEntry {
  id: string;
  studentName: string;
  stormPoints: number;
  wpm: number;
  accuracy: number;
  timestamp: number;
  difficulty: Difficulty;
}

export interface AdminSettings {
  password: string;
  testMode: TestMode;
  testDuration: number;
  wordCount: number;
  difficulty: Difficulty;
}
