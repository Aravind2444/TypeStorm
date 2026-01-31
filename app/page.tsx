'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { TypingArea } from '@/components/typing/TypingArea';
import { ResultsDisplay } from '@/components/typing/ResultsDisplay';
import { Leaderboard } from '@/components/typing/Leaderboard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTypingTest } from '@/hooks/useTypingTest';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { useFullscreen } from '@/hooks/useFullscreen';
import { TestSettings } from '@/types';
import { DEFAULT_SETTINGS, STORAGE_KEYS } from '@/lib/constants';
import { getNextStudentName } from '@/lib/statistics';
import { Trophy } from 'lucide-react';

export default function Home() {
  const [settings, setSettings] = useState<TestSettings>(DEFAULT_SETTINGS);
  const [settingsKey, setSettingsKey] = useState(0); // Force re-render on settings change
  const [studentName, setStudentName] = useState('');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const { leaderboard, addEntry } = useLeaderboard();
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const {
    status,
    words,
    typedText,
    wordStates,
    stats,
    timer,
    elapsedTime,
    handleInput,
    restart,
  } = useTypingTest(settings);

  // Load settings from localStorage
  const loadSettings = useCallback(() => {
    const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (storedSettings) {
      try {
        const parsed = JSON.parse(storedSettings);
        setSettings(parsed);
        setSettingsKey(prev => prev + 1); // Force hook to reinitialize
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    }
  }, []);

  // Load settings on mount and listen for changes
  useEffect(() => {
    loadSettings();
    
    // Listen for storage events (from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.SETTINGS) loadSettings();
    };
    
    // Listen for custom event (same tab)
    const handleSettingsUpdate = () => loadSettings();
    
    // Listen for focus (when coming back from admin page)
    const handleFocus = () => loadSettings();

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('settingsUpdated', handleSettingsUpdate);
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('settingsUpdated', handleSettingsUpdate);
      window.removeEventListener('focus', handleFocus);
    };
  }, [loadSettings]);

  // Tab key to restart - Global keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        restart();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [restart]);

  // Save Results - generate student name only when saving
  useEffect(() => {
    if (status === 'finished' && stats.stormPoints > 0) {
      const name = getNextStudentName();
      setStudentName(name);
      addEntry({
        studentName: name,
        stormPoints: stats.stormPoints,
        wpm: stats.wpm,
        accuracy: stats.accuracy,
        timestamp: Date.now(),
        difficulty: settings.difficulty,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden selection:bg-primary/20">
      <Header onFullscreen={toggleFullscreen} isFullscreen={isFullscreen} />

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative">
        <AnimatePresence mode="wait">
          {status === 'finished' ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl"
            >
              <ResultsDisplay
                stats={stats}
                difficulty={settings.difficulty}
                duration={settings.mode === 'time' ? settings.duration : elapsedTime}
                studentName={studentName}
                onRestart={restart}
                onViewLeaderboard={() => setShowLeaderboard(true)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="typing"
              className="w-full max-w-5xl flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Info / Header Stats */}

              <div className="mb-12 flex gap-12 text-muted-foreground/50 font-mono text-lg select-none">
                {status !== 'idle' && (
                  <>
                    {settings.mode === 'time' && (
                      <div className={`transition-colors duration-300 ${status === 'running' ? 'text-primary' : ''}`}>
                        {timer.timeRemaining}s
                      </div>
                    )}
                    <div>{settings.difficulty}</div>
                  </>
                )}
              </div>

              <TypingArea
                words={words}
                typedText={typedText}
                wordStates={wordStates}
                status={status}
                timer={timer}
                onChange={handleInput}
                className="mb-8"
              />

              <div className="mt-12 text-center text-sm text-muted-foreground">
                <span className="bg-muted px-2 py-1 rounded">Tab</span> to restart
              </div>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button variant="ghost" className="text-muted-foreground hover:text-primary" onClick={() => setShowLeaderboard(true)}>
                  <Trophy className="w-4 h-4 mr-2" /> Leaderboard
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Leaderboard Dialog */}
      <Dialog open={showLeaderboard} onOpenChange={setShowLeaderboard}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-white/10 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              <Trophy className="w-6 h-6 text-primary" />
              Leaderboard
            </DialogTitle>
          </DialogHeader>
          <Leaderboard entries={leaderboard} maxEntries={20} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
