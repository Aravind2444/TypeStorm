'use client';

import { useState, useEffect } from 'react';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { TestSettings } from '@/types';
import { DEFAULT_SETTINGS, STORAGE_KEYS } from '@/lib/constants';
import { resetStudentCounter } from '@/lib/statistics';

export default function AdminPage() {
  const [settings, setSettings] = useState<TestSettings>(DEFAULT_SETTINGS);

  // Load settings from localStorage
  useEffect(() => {
    const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (storedSettings) {
      try {
        setSettings(JSON.parse(storedSettings));
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    }
  }, []);

  const handleSettingsChange = (newSettings: TestSettings) => {
    setSettings(newSettings);
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('settingsUpdated'));
  };

  const handleResetLeaderboard = () => {
    localStorage.removeItem(STORAGE_KEYS.LEADERBOARD);
    resetStudentCounter();
    // Dispatch event to refresh leaderboard in main page
    window.dispatchEvent(new CustomEvent('leaderboardReset'));
  };

  return (
    <AdminPanel
      settings={settings}
      onSettingsChange={handleSettingsChange}
      onResetLeaderboard={handleResetLeaderboard}
    />
  );
}
