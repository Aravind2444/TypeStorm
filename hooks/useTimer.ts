'use client';

import { useState, useEffect, useCallback } from 'react';

export function useTimer(initialTime: number, onComplete?: () => void) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || timeRemaining === 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, onComplete]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback((newTime?: number) => {
    setIsRunning(false);
    setTimeRemaining(newTime ?? initialTime);
  }, [initialTime]);

  return {
    timeRemaining,
    isRunning,
    start,
    pause,
    reset,
  };
}
