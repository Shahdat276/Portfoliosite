"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useReducedMotion
} from 'framer-motion';
import { ArrowUpRight, Play, Sparkles, Download, Film } from 'lucide-react';
import { StudioTheme, SiteConfig, Project, ModalVideoTarget } from '@/types';
import { EditorialVisualFrame } from './EditorialVisualFrame';
import {
    TiltSpotlightCard,
    ParallaxImageWindow,
    MOTION_EASE
} from './MotionPrimitives';

interface HeroProps {
    theme: StudioTheme;
    siteConfig: SiteConfig;
    projects: Project[];
    navigateToSection: (id: string) => void;
    openCaseStudy: (slug: string) => void;
    openVideoModal: (target: ModalVideoTarget) => void;
}

const FEATURED_HERO_SLUGS = [
    'commercial-video-editing',
    'fashion-campaign-video',
    'motion-graphics-systems',
    'logo-animation-reveals'
];

const HERO_TAB_LABELS: Record<string, string> = {
    'commercial-video-editing': '01 Commercial',
    'fashion-campaign-video': '02 Fashion Film',
    'motion-graphics-systems': '03 Motion VFX',
    'logo-animation-reveals': '04 Logo Ident'
};

export function Hero({
    theme,
    siteConfig,
    projects,
    navigateToSection,
    openCaseStudy,
    openVideoModal
}: HeroProps) {
    const spotlightProjects = FEATURED_HERO_SLUGS.map((slug) =>
        projects.find((p) => p.slug === slug)
    ).filter((p): p is Project => Boolean(p));

    const [activeIdx, setActiveIdx] = useState(0);
    const activeProject = spotlightProjects[activeIdx] || projects[0];
    const totalVideos = projects.reduce(
        (acc, p) => acc + (p.galleryVideos ? p.galleryVideos.length : 0),
        0
    );

    const handlePlaySpotlight = () => {
        if (activeProject?.videoUrl) {
            openVideoModal({
                url: activeProject.videoUrl,
                title: `${activeProject.title} — Featured Cut`,
                subtitle: `${activeProject.category} • ${activeProject.client}`
            });
        } else if (activeProject?.galleryVideos && activeProject.galleryVideos[0]) {
            openVideoModal({
                url: activeProject.galleryVideos[0].url,
                title: activeProject.galleryVideos[0].title,
                subtitle: `${activeProject.category} • ${activeProject.client}`
            });
        } else {
            openVideoModal({
                url: siteConfig.showreel.videoUrl,
                title: `${siteConfig.name} — Official Showreel`,
                subtitle: siteConfig.title
            });
        }
    };

    const heroRef = useRef<HTMLElement>(null);
    const shouldReduce = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start']
    });
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 180,
        damping: 28,
        mass: 0.25
    });

    const leftColY = useTransform(smoothProgress, [0, 1], [0, -34]);
    const rightColY = useTransform(smoothProgress, [0, 1], [0, 26]);
    const orbY = useTransform(smoothProgress, [0, 1], [0, 72]);
    const orbScale = useTransform(smoothProgress, [0, 1], [1, 1.08]);

    return (
        <section
            ref={heroRef}
            id="home"
            className="relative overflow-x-clip pt-24 pb-10 sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-20 lg:min-h-[calc(100vh-5rem)] flex items-center border-b transition-colors duration-500"
            style={{
                backgroundColor: theme.bg,
                borderColor: theme.border
            }}
        >
            {/* Ambient Key-Light Studio Glow (Slowest Parallax Plane) */}
            {!shouldReduce && (
                <motion.div
                    aria-hidden="true"
                    style={{
                        y: orbY,
                        scale: orbScale,
                        backgroundColor: theme.accent
                    }}
                    className="pointer-events-none absolute -top-24 right-[-10%] sm:right-[4%] w-[320px] sm:w-[540px] aspect-square rounded-full blur-[120px] opacity-[0.09] will-change-transform"
                />
            )}

            <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 items-center">
                    {/* Left Column (7 Cols): Editorial Typography Hero (Faster Upward Parallax) */}
                    <motion.div
                        style={shouldReduce ? undefined : { y: leftColY }}
                        className="lg:col-span-6 xl:col-span-7 will-change-transform"
                    >
                        <motion.div
                            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: MOTION_EASE }}
                        >
                        {/* Availability Pill */}
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 rounded-full border mb-4 sm:mb-7"
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
                            className="font-mono text-xs uppercase tracking-[0.22em] mb-2 sm:mb-3"
                            style={{ color: theme.accent }}
                        >
                            {siteConfig.heroSecondaryHeadline}
                        </p>

                        <h1 className="font-display text-4xl sm:text-6xl lg:text-6xl xl:text-[74px] 2xl:text-[86px] font-semibold leading-[1.02] tracking-tight mb-4 sm:mb-6">
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
                            className="text-sm sm:text-lg lg:text-xl leading-relaxed max-w-2xl mb-5 sm:mb-8"
                            style={{ color: theme.textMuted }}
                        >
                            {siteConfig.heroIntro}
                        </p>

                        {/* Key Credentials Row */}
                        <div
                            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 py-3.5 px-4 sm:py-4 sm:px-5 rounded-2xl border mb-6 sm:mb-8 max-w-3xl"
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
                            <div className="sm:border-l sm:pl-4" style={{ borderColor: theme.border }}>
                                <span
                                    className="font-mono text-[10px] uppercase tracking-wider block"
                                    style={{ color: theme.textMuted }}
                                >
                                    Portfolio
                                </span>
                                <span className="font-display text-sm sm:text-base font-semibold mt-0.5 block">
                                    {totalVideos}+ Works
                                </span>
                            </div>
                            <div className="sm:border-l sm:pl-4" style={{ borderColor: theme.border }}>
                                <span
                                    className="font-mono text-[10px] uppercase tracking-wider block"
                                    style={{ color: theme.textMuted }}
                                >
                                    Current Role
                                </span>
                                <span className="font-display text-sm sm:text-base font-semibold mt-0.5 block truncate">
                                    Amanat Shah Group
                                </span>
                            </div>
                            <div className="sm:border-l sm:pl-4" style={{ borderColor: theme.border }}>
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
                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
                            <button
                                onClick={() => navigateToSection('work')}
                                className="px-5 py-3 sm:px-7 sm:py-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 flex items-center gap-2 shadow-sm cursor-pointer"
                                style={{
                                    backgroundColor: theme.text,
                                    color: theme.bg
                                }}
                            >
                                <span>Explore All Works</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => navigateToSection('showreel')}
                                className="px-5 py-3 sm:px-7 sm:py-4 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:scale-95 flex items-center gap-2 cursor-pointer"
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
                                <span>Master Showreel</span>
                            </button>

                            <a
                                href={siteConfig.contact.cvUrl}
                                download
                                className="px-4 py-3 sm:px-5 sm:py-4 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                                style={{
                                    backgroundColor: theme.surfaceAlt,
                                    borderColor: theme.border,
                                    color: theme.text
                                }}
                            >
                                <Download className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                                <span>CV / Resume</span>
                            </a>
                        </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column (5 Cols): Discipline Spotlight Showcase (Counter-Depth Parallax + 3D Tilt) */}
                    <motion.div
                        style={shouldReduce ? undefined : { y: rightColY }}
                        className="lg:col-span-6 xl:col-span-5 will-change-transform"
                    >
                        <motion.div
                            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.12, ease: MOTION_EASE }}
                        >
                            <TiltSpotlightCard
                                accentColor={theme.accent}
                                className="rounded-3xl border p-3.5 sm:p-5 shadow-sm transition-colors"
                                style={{
                                    backgroundColor: theme.surface,
                                    borderColor: theme.border
                                }}
                            >
                            {/* Top Card Bar */}
                            <div className="flex items-center justify-between px-1 pb-3.5">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" style={{ color: theme.accent }} />
                                    <span className="font-display text-xs font-semibold uppercase tracking-wider">
                                        Discipline Spotlight
                                    </span>
                                </div>
                                <span
                                    className="font-mono text-xs"
                                    style={{ color: theme.textMuted }}
                                >
                                    {activeProject?.galleryVideos?.length || 1} Videos in Category
                                </span>
                            </div>

                            {/* Interactive Preview Frame (16:10 Clean Framing - Zero Letterbox Bars) */}
                            <div
                                onClick={handlePlaySpotlight}
                                className="rounded-2xl overflow-hidden relative cursor-pointer group aspect-[16/10] bg-black"
                            >
                                {activeProject?.coverUrl ? (
                                    <>
                                        <ParallaxImageWindow travel={10} baseScale={1.08}>
                                            <Image
                                                key={activeProject.slug}
                                                src={activeProject.coverUrl}
                                                alt={activeProject.title}
                                                fill
                                                unoptimized
                                                className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                            />
                                        </ParallaxImageWindow>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />

                                        {/* Top Badges */}
                                        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                                            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-black/65 text-white backdrop-blur-sm border border-white/15">
                                                {activeProject.category}
                                            </span>
                                            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-black/65 text-white backdrop-blur-sm border border-white/15">
                                                Play Feature Cut
                                            </span>
                                        </div>

                                        {/* Bottom Info Strip on Preview */}
                                        <div className="absolute bottom-3.5 left-4 right-4 z-10 flex items-end justify-between gap-2 text-white">
                                            <div className="min-w-0">
                                                <p className="font-display text-sm sm:text-base font-semibold truncate">
                                                    {activeProject.title}
                                                </p>
                                                <p className="text-[11px] text-white/75 truncate">
                                                    {activeProject.client}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <EditorialVisualFrame
                                        theme={theme}
                                        index={activeProject?.index || '01'}
                                        category={activeProject?.category || 'Commercial'}
                                        aspectClass="aspect-[16/10]"
                                        pattern={activeIdx % 2 === 0 ? 'editorial-arch' : 'orbital-rings'}
                                        isHovered={true}
                                        badgeText="Play Feature Cut"
                                    />
                                )}

                                {/* Centered Glowing Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                    <div
                                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110"
                                        style={{
                                            backgroundColor: theme.accent,
                                            color: theme.accentText
                                        }}
                                    >
                                        <Play className="w-6 h-6 fill-current ml-0.5" />
                                    </div>
                                </div>
                            </div>

                            {/* Active Discipline Action Row */}
                            {activeProject && (
                                <div className="mt-3.5 px-1 flex items-center justify-between gap-2 text-xs">
                                    <span className="truncate font-mono" style={{ color: theme.textMuted }}>
                                        Role: {activeProject.role}
                                    </span>
                                    <button
                                        onClick={() => openCaseStudy(activeProject.slug)}
                                        className="px-3 py-1.5 rounded-full border font-mono text-[11px] font-semibold shrink-0 inline-flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                                        style={{
                                            backgroundColor: theme.accentSoft,
                                            borderColor: theme.border,
                                            color: theme.accent
                                        }}
                                    >
                                        <Film className="w-3 h-3" />
                                        <span>Open {activeProject.galleryVideos?.length || 1} Videos</span>
                                        <ArrowUpRight className="w-3 h-3" />
                                    </button>
                                </div>
                            )}

                            {/* 4 Interactive Discipline Pills */}
                            <div className="mt-3.5 pt-3 border-t" style={{ borderColor: theme.border }}>
                                <span
                                    className="font-mono text-[10px] uppercase tracking-wider block mb-2.5"
                                    style={{ color: theme.textMuted }}
                                >
                                    Switch Creative Discipline Preview:
                                </span>
                                <div className="grid grid-cols-2 gap-2">
                                    {spotlightProjects.map((proj, idx) => {
                                        const isCurrent = idx === activeIdx;
                                        return (
                                            <button
                                                key={proj.slug}
                                                onClick={() => setActiveIdx(idx)}
                                                className="px-3 py-2.5 rounded-xl text-left text-xs font-medium border transition-all duration-200 hover:-translate-y-0.5 active:scale-95 flex items-center justify-between cursor-pointer"
                                                style={{
                                                    backgroundColor: isCurrent ? theme.accentSoft : theme.surfaceAlt,
                                                    borderColor: isCurrent ? theme.accent : theme.border,
                                                    color: isCurrent ? theme.accent : theme.text
                                                }}
                                            >
                                                <span className="truncate">
                                                    {HERO_TAB_LABELS[proj.slug] || proj.title}
                                                </span>
                                                <span className="font-mono text-[10px] opacity-75 shrink-0 ml-1">
                                                    {proj.galleryVideos?.length || 1}v
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            </TiltSpotlightCard>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
