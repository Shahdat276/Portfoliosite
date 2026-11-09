"use client";

import React from 'react';
import Image from 'next/image';
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
    let youtubeThumbnail = '';
    if (siteConfig.showreel.videoUrl) {
        let videoId = '';
        const url = siteConfig.showreel.videoUrl;
        if (url.includes('embed/')) videoId = url.split('embed/')[1].split('?')[0];
        else if (url.includes('watch?v=')) videoId = url.split('watch?v=')[1].split('&')[0];
        else if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1].split('?')[0];
        if (videoId) {
            youtubeThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
    }
    return (
        <section
            id="home"
            className="pt-28 pb-16 md:pt-32 md:pb-20 min-h-[calc(100vh-5rem)] flex items-center border-b transition-colors duration-500"
            style={{
                backgroundColor: theme.bg,
                borderColor: theme.border
            }}
        >
            <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
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

                        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-[76px] 2xl:text-[88px] font-semibold leading-[1.02] tracking-tight mb-6">
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
                            className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mb-8"
                            style={{ color: theme.textMuted }}
                        >
                            {siteConfig.heroIntro}
                        </p>

                        {/* Key Credentials Row */}
                        <div
                            className="grid grid-cols-3 gap-4 py-5 px-5 rounded-2xl border mb-8 max-w-3xl"
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
                                className="rounded-2xl overflow-hidden relative cursor-pointer group aspect-[4/3] bg-black"
                            >
                                {youtubeThumbnail ? (
                                    <>
                                        <Image
                                            src={youtubeThumbnail}
                                            alt="Showreel Preview Thumbnail"
                                            fill
                                            unoptimized
                                            className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

                                            {/* Chapter Badge */}
                                            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                                                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm border border-white/10">
                                                    No. {activeChapter.id} — {activeChapter.note}
                                                </span>
                                                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm border border-white/10">
                                                    Theater Mode
                                                </span>
                                            </div>
                                        </>
                                        ) : (
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
                                )}

                                        {/* Centered Glowing Play Button */}
                                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                            <div
                                                className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-115"
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

