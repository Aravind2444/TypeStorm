'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WordState } from '@/types';
import { getCharacterClass } from '@/lib/typing-engine';
import { cn } from '@/lib/utils'; // Assuming this exists or I'll standardise roughly

interface TypingAreaProps {
    words: string[];
    typedText: string;
    wordStates: WordState[];
    status: 'idle' | 'ready' | 'running' | 'finished';
    timer: any;
    onChange: (val: string) => void;
    className?: string; // Allow external positioning
}

export function TypingArea({ words, typedText, wordStates, status, timer, onChange, className }: TypingAreaProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isFocused, setIsFocused] = useState(false);

    // Auto focus
    useEffect(() => {
        if (status !== 'finished') {
            inputRef.current?.focus();
        }
    }, [status]);

    const handleRefocus = () => {
        inputRef.current?.focus();
    };

    // Calculate cursor position
    useEffect(() => {
        if (!containerRef.current) return;

        // Find the active character
        // We add a specific data attribute to the active character in the render loop
        const activeChar = containerRef.current.querySelector('[data-active="true"]');

        if (activeChar) {
            const rect = activeChar.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            setCursorPos({
                x: rect.left - containerRect.left,
                y: rect.top - containerRect.top
            });
        } else {
            // Fallback for end of line or start
            // If we are at the very start
            if (typedText.length === 0) {
                const firstChar = containerRef.current.querySelector('[data-index="0-0"]');
                if (firstChar) {
                    const rect = firstChar.getBoundingClientRect();
                    const containerRect = containerRef.current.getBoundingClientRect();
                    setCursorPos({ x: rect.left - containerRect.left, y: rect.top - containerRect.top });
                }
            }
        }
    }, [typedText, words, wordStates, status]);


    // We want to show a "window" of words, simpler than full scroll for now.
    // Or just render all and let it wrap naturally.
    // Monkeytype usually masks lines that are done. 
    // Let's hide previous lines or fade them out.

    // Calculate current word index to maybe scroll/offset
    const currentWordIndex = typedText.split(' ').length - 1;

    return (
        <div
            className={cn("relative w-full max-w-5xl mx-auto min-h-[200px] outline-none", className)}
            onClick={handleRefocus}
        >
            {/* Hidden Input */}
            <input
                ref={inputRef}
                type="text"
                className="opacity-0 absolute inset-0 -z-10 cursor-default"
                value={typedText}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoComplete="off"
                disabled={status === 'finished'}
            />

            {/* Focus Indicator (Blur overlay if not focused) */}
            {!isFocused && status !== 'finished' && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-all duration-300">
                    <div className="text-xl font-medium text-muted-foreground animate-pulse">
                        Click to Focus
                    </div>
                </div>
            )}

            {/* Text Display area */}
            <div
                ref={containerRef}
                className="relative font-mono text-3xl leading-relaxed tracking-wide select-none break-all whitespace-pre-wrap"
                style={{ perspective: '1000px' }}
            >
                {/* Cursor */}
                {(status === 'running' || status === 'ready') && isFocused && (
                    <motion.div
                        layoutId="cursor"
                        className="absolute w-[2px] h-[1.2em] bg-primary rounded-full shadow-[0_0_15px_var(--color-primary)] z-10"
                        initial={false}
                        animate={{
                            x: cursorPos.x - 1, // Slight offset to look like it's before the char
                            y: cursorPos.y + 2,
                            opacity: 1
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 28,
                            mass: 0.5
                        }}
                    />
                )}

                {/* Words and Characters */}
                {wordStates.length > 0 ? (
                    wordStates.map((word, wIdx) => {
                        // Logic to hide/fade words that are far behind?
                        // For now, let's keep it simple: just render.
                        // Maybe strict window: current - 10 to current + 30
                        if (wIdx < currentWordIndex - 20 || wIdx > currentWordIndex + 50) return null;

                        return (
                            <div key={wIdx} className="inline-block mr-[0.5em] mb-2 relative">
                                {word.characters.map((char, cIdx) => {
                                    const isCurrent = wIdx === currentWordIndex && cIdx === (typedText.split(' ')[wIdx] || '').length;
                                    // Check if this is the EXACT character implementation
                                    // Actually `isCurrent` logic above is slightly flawed if we backspace.
                                    // Better: relying on the engine's state or simply recalculating.

                                    // Let's use the unique ID approach for finding the cursor position.
                                    // The engine doesn't explicitly tell us "this is the active cursor char", 
                                    // but we can infer it.

                                    // If this is the character we are about to type (or just typed wrong and sticking)
                                    const isNextToType = (wIdx === currentWordIndex) && (cIdx === (typedText.split(' ')[wIdx] || '').length);

                                    return (
                                        <span
                                            key={cIdx}
                                            data-active={isNextToType}
                                            data-index={`${wIdx}-${cIdx}`}
                                            className={cn(
                                                "transition-colors duration-100",
                                                getCharacterClass(char.status, char.isExtra),
                                                // Extra logic for active highlighting if needed
                                            )}
                                        >
                                            {char.char}
                                        </span>
                                    );
                                })}
                                {/* 
                           Handle case where cursor is at the END of the word (space needed).
                           Technically the cursor should be after the last char. 
                           We can use a dummy element for the cursor target if at end of word.
                        */}
                                {(wIdx === currentWordIndex && (typedText.split(' ')[wIdx] || '').length === word.characters.length) && (
                                    <span data-active="true" className="inline-block w-[1px] h-4 opacity-0 align-middle">|</span>
                                )}
                            </div>
                        );
                    })
                ) : (
                    /* Loading / Initial State showing words from props if wordStates empty */
                    words.slice(0, 50).map((w, i) => (
                        <span key={i} className="text-muted-foreground opacity-50 mr-[0.5em] inline-block">{w}</span>
                    ))
                )}
            </div>

            {/* Floating Timer / Stats */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-8 text-xl font-bold text-muted-foreground/50 transition-all duration-500 hover:text-primary">
                {status === 'running' && (
                    <>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2"
                        >
                            <span>{timer.timeRemaining}s</span>
                        </motion.div>
                    </>
                )}
            </div>
        </div>
    );
}
