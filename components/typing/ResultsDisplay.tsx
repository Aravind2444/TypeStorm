'use client';

import { TypingStats, Difficulty } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResultsDisplayProps {
  stats: TypingStats;
  difficulty: Difficulty;
  duration: number;
  studentName: string;
  onRestart: () => void;
  onViewLeaderboard: () => void;
}

export function ResultsDisplay({
  stats,
  difficulty,
  studentName,
  onRestart,
  onViewLeaderboard,
}: ResultsDisplayProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto flex flex-col gap-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <motion.div variants={item} className="col-span-2 md:col-span-2 flex flex-col justify-end">
          <div className="text-6xl md:text-8xl font-black text-primary tracking-tighter leading-none">
            {stats.wpm}
          </div>
          <div className="text-2xl text-muted-foreground font-medium mt-2">wpm</div>
        </motion.div>

        <motion.div variants={item} className="flex flex-col justify-end">
          <div className="text-4xl md:text-6xl font-black text-accent tracking-tighter leading-none">
            {stats.accuracy}%
          </div>
          <div className="text-xl text-muted-foreground font-medium mt-2">acc</div>
        </motion.div>

        <motion.div variants={item} className="flex flex-col justify-end">
          <div className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-none">
            {stats.stormPoints}
          </div>
          <div className="text-xl text-muted-foreground font-medium mt-2">storm points</div>
        </motion.div>
      </div>

      <motion.div variants={item} className="h-px w-full bg-border" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div variants={item}>
          <div className="text-muted-foreground text-sm uppercase tracking-widest font-semibold mb-1">Type</div>
          <div className="text-xl">{difficulty}</div>
        </motion.div>
        <motion.div variants={item}>
          <div className="text-muted-foreground text-sm uppercase tracking-widest font-semibold mb-1">Errors</div>
          <div className="text-xl text-destructive">{stats.errors}</div>
        </motion.div>
        <motion.div variants={item}>
          <div className="text-muted-foreground text-sm uppercase tracking-widest font-semibold mb-1">Characters</div>
          <div className="text-xl">{stats.correctChars}/{stats.incorrectChars}</div>
        </motion.div>
        <motion.div variants={item}>
          <div className="text-muted-foreground text-sm uppercase tracking-widest font-semibold mb-1">Student</div>
          <div className="text-xl truncate" title={studentName}>{studentName}</div>
        </motion.div>
      </div>

      <motion.div variants={item} className="flex gap-4 mt-8 justify-center">
        <Button
          onClick={onRestart}
          size="icon"
          className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_var(--color-primary)] transition-transform hover:scale-110 active:scale-95"
        >
          <RefreshCw className="w-8 h-8" />
        </Button>
        <Button
          onClick={onViewLeaderboard}
          variant="outline"
          size="icon"
          className="w-16 h-16 rounded-full border-2 border-muted-foreground/20 hover:border-primary hover:text-primary transition-all hover:scale-110 active:scale-95"
        >
          <Trophy className="w-6 h-6" />
        </Button>
      </motion.div>

    </motion.div>
  );
}

