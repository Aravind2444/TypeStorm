'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { TestSettings, TestStatus, TypingStats, WordState } from '@/types';
import { generateWords } from '@/lib/constants';
import { processTypedInput, isTestCompleted } from '@/lib/typing-engine';
import { calculateStats } from '@/lib/statistics';
import { useTimer } from './useTimer';

export function useTypingTest(settings: TestSettings) {
  const [status, setStatus] = useState<TestStatus>('idle');
  const [words, setWords] = useState<string[]>([]);
  const [typedText, setTypedText] = useState('');
  const [wordStates, setWordStates] = useState<WordState[]>([]);
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    rawWpm: 0,
    accuracy: 100,
    errors: 0,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: 0,
    stormPoints: 0,
  });
  
  const startTimeRef = useRef<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const maxErrorsRef = useRef<number>(0); // Track max errors to prevent reset on backspace

  const handleTimerComplete = useCallback(() => {
    setStatus('finished');
  }, []);

  const timer = useTimer(settings.duration, handleTimerComplete);

  // Initialize words when settings change
  useEffect(() => {
    const wordCount = settings.mode === 'time' ? 30 : settings.wordCount; // Reduced from 200 to 30 for 2-line display
    const newWords = generateWords(wordCount, settings.difficulty);
    setWords(newWords);
    setStatus('ready');
  }, [settings]);

  // Update stats periodically
  useEffect(() => {
    if (status !== 'running') return;

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsed = Math.floor((currentTime - startTimeRef.current) / 1000);
      setElapsedTime(elapsed);

      const processed = processTypedInput(words, typedText);
      // Track maximum errors (don't let it decrease on backspace)
      maxErrorsRef.current = Math.max(maxErrorsRef.current, processed.incorrectChars);
      const currentStats = calculateStats(
        processed.correctChars,
        maxErrorsRef.current, // Use max errors instead of current
        processed.totalChars,
        elapsed || 1
      );
      setStats(currentStats);
    }, 100);

    return () => clearInterval(interval);
  }, [status, typedText, words]);

  const handleInput = useCallback((text: string) => {
    if (status === 'finished') return;

    // Start test on first input
    if (status === 'ready') {
      setStatus('running');
      startTimeRef.current = Date.now();
      if (settings.mode === 'time') {
        timer.start();
      }
    }

    setTypedText(text);

    // Process input and update word states
    const processed = processTypedInput(words, text);
    setWordStates(processed.wordStates);
    
    // Track maximum errors IMMEDIATELY (not just in interval)
    // This ensures errors are captured even if user quickly backspaces
    maxErrorsRef.current = Math.max(maxErrorsRef.current, processed.incorrectChars);

    // Check if test is completed
    if (isTestCompleted(settings.mode, text, settings.wordCount, timer.timeRemaining)) {
      setStatus('finished');
      timer.pause();
      
      // Final stats calculation
      const finalTime = settings.mode === 'time' ? settings.duration : elapsedTime;
      maxErrorsRef.current = Math.max(maxErrorsRef.current, processed.incorrectChars);
      const finalStats = calculateStats(
        processed.correctChars,
        maxErrorsRef.current, // Use max errors
        processed.totalChars,
        finalTime
      );
      setStats(finalStats);
    }
  }, [status, words, settings, timer, elapsedTime]);

  const restart = useCallback(() => {
    const wordCount = settings.mode === 'time' ? 30 : settings.wordCount;
    const newWords = generateWords(wordCount, settings.difficulty);
    
    setWords(newWords);
    setTypedText('');
    setWordStates([]);
    setStatus('ready');
    setStats({
      wpm: 0,
      rawWpm: 0,
      accuracy: 100,
      errors: 0,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
      stormPoints: 0,
    });
    setElapsedTime(0);
    timer.reset(settings.duration);
    startTimeRef.current = 0;
    maxErrorsRef.current = 0; // Reset max errors
  }, [settings, timer]);

  return {
    status,
    words,
    typedText,
    wordStates,
    stats,
    timer,
    elapsedTime,
    handleInput,
    restart,
  };
}
