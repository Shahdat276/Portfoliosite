"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { StudioTheme, ExperienceItem } from '@/types';
import {
    SkewMaskReveal,
    ArchitecturalGuides,
    MOTION_EASE,
    playStudioTick
} from './MotionPrimitives';

interface ImpactDeckSectionProps {
    theme: StudioTheme;
    experiences: ExperienceItem[];
    soundEnabled?: boolean;
}

const VALUE_PILLARS = [
    'Frame-Accurate Narrative Rhythm',
    'Broadcast & Cinema Color Grading',
    'Custom 2D / 3D Motion Systems',
    'Fast Agency-Ready Turnaround'
];

/**
 * Editorial contrast section featuring an auto-advancing career endorsement deck
 * inspired by WhyCustomSection.
 */
export function ImpactDeckSection({
    theme,
    experiences,
    soundEnabled = false
}: ImpactDeckSectionProps) {
    const [activeIdx, setActiveIdx] = useState(0);
    const shouldReduce = useReducedMotion();
    const total = experiences.length;
    const currentExp = experiences[activeIdx] || experiences[0];

    // Inverted high-contrast surface matching CodeofSagar alternating editorial paper/obsidian rhythm
    const panelBg = theme.isDark ? '#ECE6DC' : '#0F0F0F';
    const panelInk = theme.isDark ? '#0F0F0F' : '#FFFFFF';
    const panelMuted = theme.isDark ? '#58544D' : '#A09C94';
    const panelBorder = theme.isDark ? 'rgba(15, 15, 15, 0.14)' : 'rgba(255, 255, 255, 0.14)';

    useEffect(() => {
        if (shouldReduce || total <= 1) return;
        const timer = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % total);
        }, 5800);
        return () => clearInterval(timer);
    }, [shouldReduce, total, activeIdx]);

    const goPrev = () => {
        playStudioTick(soundEnabled, 520);
        setActiveIdx((prev) => (prev - 1 + total) % total);
    };

    const goNext = () => {
        playStudioTick(soundEnabled, 740);
        setActiveIdx((prev) => (prev + 1) % total);
    };

    return (
        <section
            className="relative py-16 sm:py-24 lg:py-32 border-b overflow-hidden transition-colors duration-500"
            style={{
                backgroundColor: panelBg,
                color: panelInk,
                borderColor: panelBorder
            }}
        >
            <ArchitecturalGuides borderColor={panelBorder} columns={5} />

            <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                    {/* Left 6 Cols: Bold Editorial Statement + 4 Craft Pillars */}
                    <div className="lg:col-span-6 space-y-8 lg:space-y-12">
                        <div>
                            <span
                                className="font-mono text-xs uppercase tracking-[0.22em] block mb-4"
                                style={{ color: theme.accent }}
                            >
                                Track Record • 9+ Years
                            </span>
                            <SkewMaskReveal>
                                <h2 className="font-display text-4xl sm:text-6xl xl:text-[68px] font-semibold leading-[1.01] tracking-[-0.04em]">
                                    Frames that hold{' '}
                                    <span className="font-serif-italic font-normal">attention.</span>
                                </h2>
                            </SkewMaskReveal>
                            <SkewMaskReveal delay={0.08}>
                                <p
                                    className="font-display text-2xl sm:text-4xl xl:text-[42px] font-medium leading-[1.08] tracking-[-0.03em] mt-2"
                                    style={{ color: panelMuted }}
                                >
                                    Edits built to convert.
                                </p>
                            </SkewMaskReveal>
                        </div>

                        {/* 4 Concise Value Pillars */}
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 border-t" style={{ borderColor: panelBorder }}>
                            {VALUE_PILLARS.map((point) => (
                                <li key={point} className="flex items-center gap-2.5 text-sm font-medium">
                                    <CheckCircle2
                                        className="w-4 h-4 shrink-0"
                                        style={{ color: theme.accent }}
                                    />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right 6 Cols: Interactive 01 / 05 Employer Milestone Deck */}
                    <div className="lg:col-span-6 lg:pl-6">
                        <div
                            className="rounded-3xl p-6 sm:p-8 lg:p-10 border relative"
                            style={{
                                backgroundColor: theme.isDark
                                    ? 'rgba(255,255,255,0.55)'
                                    : 'rgba(255,255,255,0.04)',
                                borderColor: panelBorder
                            }}
                        >
                            {/* Auto-progress track bar */}
                            <div
                                className="w-full h-[2px] rounded-full overflow-hidden relative"
                                style={{ backgroundColor: panelBorder }}
                            >
                                <motion.div
                                    key={`deck-progress-${activeIdx}`}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={
                                        shouldReduce
                                            ? { duration: 0 }
                                            : { duration: 5.8, ease: 'linear' }
                                    }
                                    className="h-full w-full origin-left"
                                    style={{ backgroundColor: theme.accent }}
                                />
                            </div>

                            {/* Deck Navigation & Counter */}
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={goPrev}
                                        aria-label="Previous highlight"
                                        className="p-2 rounded-full border transition-all hover:opacity-75 active:scale-95 cursor-pointer"
                                        style={{ borderColor: panelBorder }}
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={goNext}
                                        aria-label="Next highlight"
                                        className="p-2 rounded-full border transition-all hover:opacity-75 active:scale-95 cursor-pointer"
                                        style={{ borderColor: panelBorder }}
                                    >
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                <span
                                    className="font-mono text-xs tracking-widest uppercase"
                                    style={{ color: panelMuted }}
                                >
                                    0{activeIdx + 1} / 0{total}
                                </span>
                            </div>

                            {/* Animated Quote / Production Impact */}
                            <div className="mt-7 min-h-[210px] flex flex-col justify-between">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentExp.id}
                                        initial={shouldReduce ? false : { opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={shouldReduce ? undefined : { opacity: 0, y: -8 }}
                                        transition={{ duration: 0.45, ease: MOTION_EASE }}
                                    >
                                        <span
                                            className="font-mono text-[11px] uppercase tracking-[0.2em] block mb-3"
                                            style={{ color: theme.accent }}
                                        >
                                            {currentExp.status} • {currentExp.period}
                                        </span>

                                        <p className="font-display text-lg sm:text-2xl font-medium leading-snug mb-6">
                                            &ldquo;{currentExp.contributions}&rdquo;
                                        </p>

                                        <div className="flex items-center gap-3.5 pt-4 border-t" style={{ borderColor: panelBorder }}>
                                            {currentExp.logoUrl && (
                                                <div
                                                    className={`w-11 h-11 rounded-xl border relative overflow-hidden shrink-0 ${
                                                        currentExp.logoDarkBg ? 'bg-[#171615]' : 'bg-white'
                                                    }`}
                                                    style={{ borderColor: panelBorder }}
                                                >
                                                    <Image
                                                        src={currentExp.logoUrl}
                                                        alt={currentExp.organization}
                                                        fill
                                                        unoptimized
                                                        className={
                                                            currentExp.logoDarkBg
                                                                ? 'object-cover'
                                                                : 'object-contain p-1.5'
                                                        }
                                                    />
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <p className="font-display text-sm sm:text-base font-semibold truncate">
                                                    {currentExp.organization}
                                                </p>
                                                <p
                                                    className="font-mono text-[11px] uppercase tracking-wider truncate"
                                                    style={{ color: panelMuted }}
                                                >
                                                    {currentExp.role}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
