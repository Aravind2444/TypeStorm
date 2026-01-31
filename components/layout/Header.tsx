'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Maximize, Settings } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface HeaderProps {
  onFullscreen?: () => void;
  isFullscreen?: boolean;
}

export function Header({ onFullscreen, isFullscreen }: HeaderProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Choose the appropriate HITS logo based on theme
  const hitsLogo = mounted && theme === 'dark'
    ? '/HITS logo-black background.png'
    : '/HITS logo-white background.png';

  return (
    <header className="sticky top-0 z-50 w-full glass">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: HITS Logo */}
        <Link href="/" className="flex items-center gap-4 transition-opacity hover:opacity-80">
          <Image
            src={hitsLogo}
            alt="HITS Logo"
            width={180}
            height={60}
            className="h-16 w-auto"
            priority
          />
        </Link>

        {/* Center: Title */}
        <div className="hidden md:flex flex-col items-center text-center">
          <h1 className="text-4xl font-black tracking-widest uppercase bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient drop-shadow-lg">
            ⚡ TypeStorm ⚡
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Computer Science & Engineering • BSPC</p>
        </div>

        {/* Right: BSPC Logo & Controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {onFullscreen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onFullscreen}
              className="hover:bg-primary/10 hover:text-primary transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              <Maximize className="h-5 w-5" />
            </Button>
          )}

          <Link href="/admin">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10 hover:text-primary transition-colors"
              title="Admin Settings"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </Link>

          <div className="pl-3 border-l border-border/50">
            <Image
              src="/bspc-logo.svg"
              alt="BSPC Logo"
              width={50}
              height={50}
              className="h-12 w-12"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
