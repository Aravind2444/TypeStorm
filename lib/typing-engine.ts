import { CharacterState, WordState } from "@/types";

/**
 * Validate a typed character against the expected character
 */
export function validateCharacter(typed: string, expected: string): 'correct' | 'incorrect' {
  return typed === expected ? 'correct' : 'incorrect';
}

/**
 * Process typed input and update word states
 */
export function processTypedInput(
  words: string[],
  typedText: string
): {
  wordStates: WordState[];
  currentWordIndex: number;
  currentCharIndex: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
} {
  const typedWords = typedText.split(' ');
  const wordStates: WordState[] = [];
  let correctChars = 0;
  let incorrectChars = 0;
  let totalChars = 0;

  words.forEach((word, wordIndex) => {
    const typedWord = typedWords[wordIndex] || '';
    const characters: CharacterState[] = [];

    // Process each character in the word
    word.split('').forEach((char, charIndex) => {
      const typedChar = typedWord[charIndex];
      
      if (typedChar === undefined) {
        characters.push({ char, status: 'pending' });
      } else {
        const status = typedChar === char ? 'correct' : 'incorrect';
        characters.push({ char, status });
        
        if (status === 'correct') {
          correctChars++;
        } else {
          incorrectChars++;
        }
        totalChars++;
      }
    });

    // Handle extra characters
    if (typedWord.length > word.length) {
      for (let i = word.length; i < typedWord.length; i++) {
        characters.push({
          char: typedWord[i],
          status: 'incorrect',
          isExtra: true,
        });
        incorrectChars++;
        totalChars++;
      }
    }

    wordStates.push({
      word,
      characters,
      isActive: wordIndex === typedWords.length - 1 && typedText[typedText.length - 1] !== ' ',
      isCompleted: wordIndex < typedWords.length - 1 || (typedText[typedText.length - 1] === ' ' && wordIndex === typedWords.length - 1),
    });
  });

  const currentWordIndex = Math.min(typedWords.length - 1, words.length - 1);
  const currentTypedWord = typedWords[currentWordIndex] || '';
  const currentCharIndex = currentTypedWord.length;

  return {
    wordStates,
    currentWordIndex: Math.max(0, currentWordIndex),
    currentCharIndex,
    correctChars,
    incorrectChars,
    totalChars,
  };
}

/**
 * Check if the typing test is completed
 */
export function isTestCompleted(
  mode: 'time' | 'words',
  typedText: string,
  targetWordCount: number,
  timeRemaining: number
): boolean {
  if (mode === 'time') {
    return timeRemaining === 0;
  } else {
    const typedWords = typedText.trim().split(/\s+/).filter(w => w.length > 0);
    return typedWords.length >= targetWordCount;
  }
}

/**
 * Get character class for styling
 */
export function getCharacterClass(status: 'correct' | 'incorrect' | 'pending', isExtra?: boolean): string {
  if (isExtra) {
    return 'text-red-500 bg-red-500/20';
  }
  
  switch (status) {
    case 'correct':
      return 'text-foreground font-medium';
    case 'incorrect':
      return 'text-destructive decoration-destructive underline decoration-2 underline-offset-4';
    case 'pending':
      return 'text-muted-foreground opacity-50';
    default:
      return '';
  }
}
