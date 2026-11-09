"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play, Film } from 'lucide-react';
import { StudioTheme, SiteConfig, ShowreelChapter } from '@/types';
import { EditorialVisualFrame } from './EditorialVisualFrame';

interface HeroProps {
    theme: StudioTheme;
    siteConfig: SiteConfig;
    navigateToSection: (id: string) => void;
    activeChapter: ShowreelChapter;
    activeChapterIndex: number;
    setActiveChapterIndex: (index: number) => void;
    setShowreelProgress: (progress: number) => void;
    setShowreelModalOpen: (open: boolean) => void;
}

export function Hero({
    theme,
    siteConfig,
    navigateToSection,
    activeChapter,
    activeChapterIndex,
    setActiveChapterIndex,
    setShowreelProgress,
    setShowreelModalOpen
}: HeroProps) {
    return (
        <section
            id="home"
            className="pt-28 pb-16 md:pt-36 md:pb-24 border-b transition-colors duration-500"
            style={{
                backgroundColor: theme.bg,
                borderColor: theme.border
            }}
        >
            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    {/* Left Column (7 Cols): Editorial Typography Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55 }}
                        className="lg:col-span-7"
                    >
                        {/* Availability Pill */}
                        <div
                            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border mb-7"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.border
                            }}
                        >
                            <span
                                className="w-2 h-2 rounded-full animate-pulse"
                                style={{ backgroundColor: theme.accent }}
                            />
                            <span className="text-xs font-medium" style={{ color: theme.textMuted }}>
                                {siteConfig.availabilityText}
                            </span>
                        </div>

                        {/* Oversized Headline */}
                        <p
                            className="font-mono text-xs uppercase tracking-[0.22em] mb-3"
                            style={{ color: theme.accent }}
                        >
                            {siteConfig.heroSecondaryHeadline}
                        </p>

                        <h1 className="font-display text-4xl sm:text-6xl xl:text-[68px] font-semibold leading-[1.03] tracking-tight mb-6">
                            Crafting{' '}
                            <span
                                className="font-serif-italic font-normal px-1"
                                style={{ color: theme.accent }}
                            >
                                Stories
                            </span>{' '}
                            Through{' '}
                            <span className="font-serif-italic font-normal">Motion.</span>
                        </h1>

                        {/* Supporting Introduction */}
                        <p
                            className="text-base sm:text-lg leading-relaxed max-w-2xl mb-8"
                            style={{ color: theme.textMuted }}
                        >
                            {siteConfig.heroIntro}
                        </p>

                        {/* Key Credentials Row */}
                        <div
                            className="grid grid-cols-3 gap-4 py-5 px-5 rounded-2xl border mb-8 max-w-2xl"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.border
                            }}
                        >
                            <div>
                                <span
                                    className="font-mono text-[10px] uppercase tracking-wider block"
                                    style={{ color: theme.textMuted }}
                                >
                                    Experience
                                </span>
                                <span className="font-display text-sm sm:text-base font-semibold mt-0.5 block">
                                    9+ Years Exp
                                </span>
                            </div>
                            <div className="border-l pl-4" style={{ borderColor: theme.border }}>
                                <span
                                    className="font-mono text-[10px] uppercase tracking-wider block"
                                    style={{ color: theme.textMuted }}
                                >
                                    Current Studio
                                </span>
                                <span className="font-display text-sm sm:text-base font-semibold mt-0.5 block truncate">
                                    Amanat Shah Group
                                </span>
                            </div>
                            <div className="border-l pl-4" style={{ borderColor: theme.border }}>
                                <span
                                    className="font-mono text-[10px] uppercase tracking-wider block"
                                    style={{ color: theme.textMuted }}
                                >
                                    Location
                                </span>
                                <span className="font-display text-sm sm:text-base font-semibold mt-0.5 block">
                                    Dhaka, BD
                                </span>
                            </div>
                        </div>

                        {/* Primary & Secondary CTAs */}
                        <div className="flex flex-wrap items-center gap-4">
                            <button
                                onClick={() => navigateToSection('work')}
                                className="px-7 py-4 rounded-full text-sm font-medium transition-transform active:scale-95 flex items-center gap-2.5 shadow-sm"
                                style={{
                                    backgroundColor: theme.text,
                                    color: theme.bg
                                }}
                            >
                                <span>Explore My Work</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => navigateToSection('showreel')}
                                className="px-7 py-4 rounded-full text-sm font-medium border transition-colors flex items-center gap-2.5"
                                style={{
                                    backgroundColor: theme.surface,
                                    borderColor: theme.borderStrong,
                                    color: theme.text
                                }}
                            >
                                <Play
                                    className="w-3.5 h-3.5"
                                    style={{ color: theme.accent, fill: theme.accent }}
                                />
                                <span>Watch Showreel</span>
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Column (5 Cols): Elevated Showreel Preview Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-5"
                    >
                        <div
                            className="rounded-3xl border p-3.5 sm:p-5 shadow-sm transition-colors"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.border
                            }}
                        >
                            {/* Top Card Bar */}
                            <div className="flex items-center justify-between px-1 pb-3.5">
                                <div className="flex items-center gap-2">
                                    <Film className="w-4 h-4" style={{ color: theme.accent }} />
                                    <span className="font-display text-xs font-semibold uppercase tracking-wider">
                                        Director&apos;s Reel Preview
                                    </span>
                                </div>
                                <span
                                    className="font-mono text-xs"
                                    style={{ color: theme.textMuted }}
                                >
                                    {activeChapter.time} / {siteConfig.showreel.duration}
                                </span>
                            </div>

                            {/* Interactive Preview Frame */}
                            <div
                                onClick={() => setShowreelModalOpen(true)}
                                className="rounded-2xl overflow-hidden relative cursor-pointer group"
                            >
                                <EditorialVisualFrame
                                    theme={theme}
                                    index={activeChapter.id}
                                    category={activeChapter.note}
                                    aspectClass="aspect-[4/3]"
                                    pattern={
                                        activeChapterIndex % 2 === 0 ? 'editorial-arch' : 'orbital-rings'
                                    }
                                    isHovered={true}
                                    badgeText="Click for Theater Mode"
                                />

                                {/* Centered Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
                                        style={{
                                            backgroundColor: theme.accent,
                                            color: theme.accentText
                                        }}
                                    >
                                        <Play className="w-6 h-6 fill-current ml-0.5" />
                                    </div>
                                </div>
                            </div>

                            {/* 4 Interactive Chapter Pills */}
                            <div className="mt-4 pt-3 border-t" style={{ borderColor: theme.border }}>
                                <span
                                    className="font-mono text-[10px] uppercase tracking-wider block mb-2.5"
                                    style={{ color: theme.textMuted }}
                                >
                                    Interactive Showreel Chapters:
                                </span>
                                <div className="grid grid-cols-2 gap-2">
                                    {siteConfig.showreel.chapters.map((chap, idx) => {
                                        const isCurrent = idx === activeChapterIndex;
                                        return (
                                            <button
                                                key={chap.id}
                                                onClick={() => {
                                                    setActiveChapterIndex(idx);
                                                    setShowreelProgress(chap.progress);
                                                }}
                                                className="px-3 py-2 rounded-xl text-left text-xs font-medium border transition-all flex items-center justify-between"
                                                style={{
                                                    backgroundColor: isCurrent ? theme.accentSoft : theme.surfaceAlt,
                                                    borderColor: isCurrent ? theme.accent : 'transparent',
                                                    color: isCurrent ? theme.accent : theme.text
                                                }}
                                            >
                                                <span className="truncate">{chap.label}</span>
                                                <span className="font-mono text-[10px] opacity-75">
                                                    {chap.time}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
