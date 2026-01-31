// TypeStorm Word Lists - HITS College Themed

// Easy words - Basic Hindustan/college related terms
export const EASY_WORDS = [
  "HITS", "college", "student", "learn", "study", "class", "campus", "degree", "course",
  "engineering", "computer", "science", "tech", "lab", "library", "hostel", "canteen",
  "Chennai", "education", "faculty", "exam", "semester", "grade", "skill", "code",
  "program", "project", "team", "research", "innovation", "excellence", "quality",
  "placement", "career", "future", "success", "knowledge", "growth", "develop",
  "diploma", "bachelor", "master", "doctor", "professor", "lecture", "tutorial",
  "workshop", "seminar", "conference", "event", "fest", "club", "BSPC", "coding",
  "programming", "software", "hardware", "network", "database", "web", "app",
  "design", "creative", "smart", "digital", "modern", "advance", "pioneer",
  "certified", "accredited", "ranking", "award", "achievement", "merit", "honor"
];

// Medium words - HITS achievements and departments
export const MEDIUM_WORDS = [
  "Hindustan", "Institute", "Technology", "autonomous", "university", "Chennai",
  "accreditation", "NAAC", "ranking", "placement", "infrastructure", "facilities",
  "department", "mechanical", "electrical", "civil", "aerospace", "automobile",
  "biotechnology", "architecture", "management", "artificial", "intelligence",
  "machine", "learning", "data", "analytics", "cybersecurity", "blockchain",
  "cloud", "computing", "robotics", "automation", "IoT", "embedded", "systems",
  "undergraduate", "postgraduate", "doctoral", "curriculum", "industry", "collaboration",
  "entrepreneurship", "startup", "incubation", "patents", "publications", "journals",
  "international", "standards", "global", "recognition", "distinguished", "alumni",
  "sponsored", "projects", "consultancy", "innovation", "center", "excellence",
  "laboratory", "equipped", "advanced", "technology", "simulation", "modeling",
  "competitive", "programming", "hackathon", "technical", "symposium", "cultural"
];

// Hard words - Complex technical terms (single words only, no spaces)
export const HARD_WORDS = [
  "Hindustan", "accreditation", "autonomous", "institution", "aeronautical",
  "aerospace", "infrastructure", "internationally", "curriculum", "development",
  "entrepreneurship", "incubator", "collaborations", "memorandum", "understanding",
  "excellence", "manufacturing", "computational", "intelligence", "virtualization",
  "cybersecurity", "forensics", "blockchain", "quantum", "augmented",
  "sustainable", "renewable", "interdisciplinary", "prestigious", "multinational",
  "corporations", "internships", "professional", "societies", "competitions",
  "algorithmic", "programming", "expertise", "analytical", "abilities",
  "accredited", "undergraduate", "postgraduate", "doctoral", "publications",
  "distinguished", "consultancy", "simulation", "symposium", "biotechnology",
  "architecture", "automation", "embedded", "laboratory", "competitive",
  "recognition", "achievement", "collaboration", "certificate", "qualification",
  "methodology", "implementation", "optimization", "functionality", "scalability",
  "authentication", "authorization", "encryption", "decryption", "configuration",
  "compatibility", "accessibility", "responsiveness", "performance", "efficiency",
  "documentation", "specification", "requirements", "architecture", "deployment",
  "integration", "maintenance", "troubleshooting", "debugging", "refactoring"
];

// Get words based on difficulty
export function getWordsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): string[] {
  switch (difficulty) {
    case 'easy':
      return EASY_WORDS;
    case 'medium':
      return MEDIUM_WORDS;
    case 'hard':
      return HARD_WORDS;
    default:
      return EASY_WORDS;
  }
}

// Generate random words for typing test
export function generateWords(count: number, difficulty: 'easy' | 'medium' | 'hard'): string[] {
  const wordList = getWordsByDifficulty(difficulty);
  const words: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    words.push(wordList[randomIndex]);
  }
  
  return words;
}

// Default test settings
export const DEFAULT_SETTINGS = {
  mode: 'time' as const,
  duration: 15, // 15 seconds (event default)
  wordCount: 50,
  difficulty: 'medium' as const,
};

// Admin password (will be in .env)
export const ADMIN_PASSWORD_KEY = 'TYPESTORM_ADMIN_PASSWORD';
export const DEFAULT_ADMIN_PASSWORD = 'bspc2026';

// LocalStorage keys
export const STORAGE_KEYS = {
  LEADERBOARD: 'typestorm_leaderboard',
  SETTINGS: 'typestorm_settings',
  THEME: 'typestorm_theme',
  STUDENT_COUNTER: 'typestorm_student_counter',
} as const;
