'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { TestSettings, Difficulty, TestMode } from '@/types';
import { Trash2, Settings, Save, Lock, ArrowLeft } from 'lucide-react';
import { DEFAULT_ADMIN_PASSWORD } from '@/lib/constants';
import { useRouter } from 'next/navigation';

interface AdminPanelProps {
  settings: TestSettings;
  onSettingsChange: (settings: TestSettings) => void;
  onResetLeaderboard: () => void;
}

export function AdminPanel({ settings, onSettingsChange, onResetLeaderboard }: AdminPanelProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);

  const handleLogin = () => {
    // Simple password check (in production, use proper auth)
    if (password === DEFAULT_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password!');
      setPassword('');
    }
  };

  const handleSaveSettings = () => {
    onSettingsChange(tempSettings);
    alert('Settings saved successfully!');
  };

  const handleResetConfirm = () => {
    onResetLeaderboard();
    setShowResetDialog(false);
    alert('Leaderboard has been reset!');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <Card className="w-full max-w-md p-8 bg-background/50 backdrop-blur-md border-white/10">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-primary/10">
                <Lock className="w-12 h-12 text-primary" />
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
              <p className="text-muted-foreground">Enter password to access settings</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className="mt-2"
                  placeholder="Enter admin password"
                />
              </div>
              
              <Button onClick={handleLogin} className="w-full" size="lg">
                Login
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Settings className="w-8 h-8" />
              Admin Settings
            </h1>
            <p className="text-muted-foreground mt-1">Configure TypeStorm test settings</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Test
            </Button>
            <Button variant="ghost" onClick={() => setIsAuthenticated(false)}>
              Logout
            </Button>
          </div>
        </div>

        {/* Test Settings */}
        <Card className="p-6 bg-background/50 backdrop-blur-md border-white/10">
          <h2 className="text-xl font-semibold mb-6">Test Configuration</h2>
          
          <div className="space-y-6">
            {/* Test Mode */}
            <div className="space-y-2">
              <Label htmlFor="mode">Test Mode</Label>
              <Select
                value={tempSettings.mode}
                onValueChange={(value: TestMode) =>
                  setTempSettings({ ...tempSettings, mode: value })
                }
              >
                <SelectTrigger id="mode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="time">Time-based</SelectItem>
                  <SelectItem value="words">Word-count based</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {tempSettings.mode === 'time' 
                  ? 'Test runs for a specific duration'
                  : 'Test completes after typing a specific number of words'}
              </p>
            </div>

            {/* Duration (for time mode) */}
            {tempSettings.mode === 'time' && (
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (seconds)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={tempSettings.duration}
                  onChange={(e) =>
                    setTempSettings({ ...tempSettings, duration: parseInt(e.target.value) || 60 })
                  }
                  min={15}
                  max={300}
                />
                <p className="text-xs text-muted-foreground">
                  Test duration in seconds (15-300)
                </p>
              </div>
            )}

            {/* Word Count (for words mode) */}
            {tempSettings.mode === 'words' && (
              <div className="space-y-2">
                <Label htmlFor="wordCount">Word Count</Label>
                <Input
                  id="wordCount"
                  type="number"
                  value={tempSettings.wordCount}
                  onChange={(e) =>
                    setTempSettings({ ...tempSettings, wordCount: parseInt(e.target.value) || 50 })
                  }
                  min={10}
                  max={200}
                />
                <p className="text-xs text-muted-foreground">
                  Number of words to type (10-200)
                </p>
              </div>
            )}

            {/* Difficulty */}
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select
                value={tempSettings.difficulty}
                onValueChange={(value: Difficulty) =>
                  setTempSettings({ ...tempSettings, difficulty: value })
                }
              >
                <SelectTrigger id="difficulty">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Word difficulty: Easy (basic terms), Medium (achievements), Hard (complex phrases)
              </p>
            </div>

            <Button onClick={handleSaveSettings} className="w-full" size="lg">
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </Card>

        {/* Leaderboard Management */}
        <Card className="p-6 bg-background/50 backdrop-blur-md border-white/10">
          <h2 className="text-xl font-semibold mb-4">Leaderboard Management</h2>
          <p className="text-muted-foreground mb-6">
            Reset the leaderboard and student counter when a new class arrives
          </p>
          
          <Button
            onClick={() => setShowResetDialog(true)}
            variant="destructive"
            size="lg"
            className="w-full"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Reset Leaderboard
          </Button>
        </Card>

        {/* Current Settings Display */}
        <Card className="p-6 bg-background/50 backdrop-blur-md border-white/10">
          <h2 className="text-xl font-semibold mb-4">Current Active Settings</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Mode:</span>
              <span className="ml-2 font-semibold">{settings.mode === 'time' ? 'Time-based' : 'Word-count'}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Difficulty:</span>
              <span className="ml-2 font-semibold capitalize">{settings.difficulty}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Duration:</span>
              <span className="ml-2 font-semibold">{settings.duration}s</span>
            </div>
            <div>
              <span className="text-muted-foreground">Word Count:</span>
              <span className="ml-2 font-semibold">{settings.wordCount}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Reset Confirmation Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="bg-background/95 backdrop-blur-md border-white/10">
          <DialogHeader>
            <DialogTitle>Reset Leaderboard?</DialogTitle>
            <DialogDescription>
              This will permanently delete all leaderboard entries and reset the student counter. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResetDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleResetConfirm}>
              Reset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
