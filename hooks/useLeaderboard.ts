'use client';

import { useState, useEffect, useCallback } from 'react';
import { LeaderboardEntry } from '@/types';
import { STORAGE_KEYS } from '@/lib/constants';

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Load leaderboard from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setLeaderboard(parsed);
      } catch (error) {
        console.error('Failed to parse leaderboard:', error);
        setLeaderboard([]);
      }
    }
  }, []);

  const addEntry = useCallback((entry: Omit<LeaderboardEntry, 'id'>) => {
    const newEntry: LeaderboardEntry = {
      ...entry,
      id: `${Date.now()}-${Math.random()}`,
    };

    setLeaderboard((currentLeaderboard) => {
      const updated = [...currentLeaderboard, newEntry].sort((a, b) => b.stormPoints - a.stormPoints);
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const resetLeaderboard = () => {
    setLeaderboard([]);
    localStorage.removeItem(STORAGE_KEYS.LEADERBOARD);
    localStorage.setItem(STORAGE_KEYS.STUDENT_COUNTER, '0');
  };

  const getTopEntries = (count: number = 10) => {
    return leaderboard.slice(0, count);
  };

  return {
    leaderboard,
    addEntry,
    resetLeaderboard,
    getTopEntries,
  };
}
