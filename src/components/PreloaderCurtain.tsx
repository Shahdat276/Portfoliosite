"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { StudioTheme } from '@/types';
import { STUDIO_EASE } from './MotionPrimitives';

interface PreloaderCurtainProps {
    theme: StudioTheme;
}

/**
 * Brief digit-roll preloader curtain inspired by CodeofSagar initial reveal (00 -> 100).
 * Runs once per browser session and clears in <1s without blocking SSR content.
 */
export function PreloaderCurtain({ theme }: PreloaderCurtainProps) {
    const shouldReduce = useReducedMotion();
    const [visible, setVisible] = useState(false);
    const [pct, setPct] = useState(0);

    useEffect(() => {
        if (shouldReduce) return;
        try {
            if (sessionStorage.getItem('sh_preloader_seen')) return;
            sessionStorage.setItem('sh_preloader_seen', '1');
        } catch {
            // Continue smoothly if sessionStorage is blocked
        }

        const rafShow = requestAnimationFrame(() => {
            setVisible(true);
            setPct(24);
        });

        const t1 = setTimeout(() => setPct(68), 160);
        const t2 = setTimeout(() => setPct(100), 420);
        const t3 = setTimeout(() => setVisible(false), 920);

        return () => {
            cancelAnimationFrame(rafShow);
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [shouldReduce]);

    const digits = String(pct).padStart(2, '0');

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: '0%' }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.72, ease: STUDIO_EASE }}
                    aria-hidden="true"
                    className="fixed inset-0 z-[100] pointer-events-none flex items-end justify-between px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 pb-8 sm:pb-12"
                    style={{
                        backgroundColor: theme.isDark ? '#141312' : '#ECE9E3',
                        color: theme.text
                    }}
                >
                    <div className="max-w-xs sm:max-w-md">
                        <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.16em] opacity-80">
                            Shahdat Hossain · Senior Editor &amp; Motion
                        </p>
                    </div>

                    <div className="flex items-baseline font-mono text-3xl sm:text-5xl font-semibold tabular-nums tracking-tight">
                        <span>{digits}</span>
                        <span className="text-base sm:text-xl ml-1" style={{ color: theme.accent }}>
                            %
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
