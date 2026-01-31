'use client';

import { LeaderboardEntry } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';
import { getDifficultyBadgeVariant } from '@/lib/statistics';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  maxEntries?: number;
}

export function Leaderboard({ entries, maxEntries = 10 }: LeaderboardProps) {
  const topEntries = entries.slice(0, maxEntries);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center font-bold text-muted-foreground">{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500/10 border-yellow-500/30';
      case 2:
        return 'bg-gray-400/10 border-gray-400/30';
      case 3:
        return 'bg-orange-600/10 border-orange-600/30';
      default:
        return 'bg-background/50 border-white/10';
    }
  };

  if (topEntries.length === 0) {
    return (
      <Card className="p-8 bg-background/50 backdrop-blur-md border-white/10">
        <div className="text-center text-muted-foreground">
          <Trophy className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p>No entries yet. Be the first to complete a test!</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {topEntries.map((entry, index) => {
        const rank = index + 1;
        
        return (
          <Card
            key={entry.id}
            className={`p-4 backdrop-blur-md border ${getRankBg(rank)} transition-all hover:scale-[1.02]`}
          >
            <div className="flex items-center gap-4">
              {/* Rank */}
              <div className="flex-shrink-0">
                {getRankIcon(rank)}
              </div>
              
              {/* Student Name */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-lg truncate">{entry.studentName}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </div>
              </div>
              
              {/* Stats */}
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">{entry.stormPoints}</div>
                  <div className="text-xs text-muted-foreground">Storm Pts</div>
                </div>
                
                <div className="text-center hidden sm:block">
                  <div className="text-xl font-semibold text-primary">{entry.wpm}</div>
                  <div className="text-xs text-muted-foreground">WPM</div>
                </div>
                
                <div className="text-center hidden sm:block">
                  <div className="text-xl font-semibold text-green-500">{entry.accuracy}%</div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
                
                <Badge variant={getDifficultyBadgeVariant(entry.difficulty)} className="hidden md:inline-flex">
                  {entry.difficulty}
                </Badge>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
