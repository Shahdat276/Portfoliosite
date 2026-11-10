"use client";

import React, { useRef, RefObject } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useReducedMotion
} from 'framer-motion';
import {
    ArrowUpRight,
    Play,
    Volume2,
    VolumeX,
    Maximize2,
    Download
} from 'lucide-react';
import { StudioTheme, SiteConfig, Project } from '@/types';
import { EditorialVisualFrame } from './EditorialVisualFrame';
import { MOTION_EASE } from './MotionPrimitives';
import { formatUniversalVideoEmbed } from '@/utils/video';

interface HeroProps {
    theme: StudioTheme;
    siteConfig: SiteConfig;
    projects: Project[];
    navigateToSection: (id: string) => void;
    isShowreelPlaying: boolean;
    isShowreelMuted: boolean;
    showreelProgress: number;
    toggleShowreelPlay: () => void;
    toggleShowreelMute: () => void;
    seekShowreel: (pct: number, exactSeconds?: number) => void;
    openShowreelTheaterModal: () => void;
    iframeRef: RefObject<HTMLIFrameElement | null>;
    videoRef: RefObject<HTMLVideoElement | null>;
}

export function Hero({
    theme,
    siteConfig,
    projects,
    navigateToSection,
    isShowreelPlaying,
    isShowreelMuted,
    showreelProgress,
    toggleShowreelPlay,
    toggleShowreelMute,
    seekShowreel,
    openShowreelTheaterModal,
    iframeRef,
    videoRef
}: HeroProps) {
    const totalVideos = projects.reduce(
        (acc, p) => acc + (p.galleryVideos ? p.galleryVideos.length : 0),
        0
    );
    const videoData = formatUniversalVideoEmbed(siteConfig.showreel.videoUrl, { chromeless: true });

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
                                onClick={openShowreelTheaterModal}
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

                    {/* Right Column (5 Cols): Continuous Official Master Showreel Theater */}
                    <motion.div
                        style={shouldReduce ? undefined : { y: rightColY }}
                        className="lg:col-span-6 xl:col-span-5 will-change-transform"
                    >
                        <motion.div
                            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.12, ease: MOTION_EASE }}
                        >
                            <div
                                className="rounded-3xl border p-3.5 sm:p-5 shadow-sm transition-colors"
                                style={{
                                    backgroundColor: theme.surface,
                                    borderColor: theme.border
                                }}
                            >
                                {/* Top Card Bar */}
                                <div className="flex items-center justify-between px-1 pb-3">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-2 h-2 rounded-full animate-pulse shrink-0"
                                            style={{ backgroundColor: theme.accent }}
                                        />
                                        <span className="font-display text-xs font-semibold uppercase tracking-wider">
                                            Official Master Showreel
                                        </span>
                                    </div>
                                    <span
                                        className="font-mono text-[11px]"
                                        style={{ color: theme.textMuted }}
                                    >
                                        1080p HD • {siteConfig.showreel.duration}
                                    </span>
                                </div>

                                {/* Continuous 16:9 Live Showreel Stage */}
                                <div className="rounded-2xl overflow-hidden relative aspect-video bg-black border border-white/10">
                                    {videoData.type === 'youtube' && (
                                        <div
                                            className="relative w-full h-full bg-black overflow-hidden select-none cursor-pointer group"
                                            onClick={toggleShowreelPlay}
                                        >
                                            <iframe
                                                ref={iframeRef}
                                                src={videoData.embedUrl}
                                                title={`${siteConfig.name} Official Showreel`}
                                                className="w-full h-full border-0 pointer-events-none"
                                                allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                            />

                                            {/* Paused Center Indicator */}
                                            {!isShowreelPlaying && (
                                                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/35 backdrop-blur-[1px]">
                                                    <div
                                                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110"
                                                        style={{
                                                            backgroundColor: theme.accent,
                                                            color: theme.accentText
                                                        }}
                                                    >
                                                        <Play className="w-6 h-6 fill-current ml-0.5" />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Bottom-Right Quick Audio & Theater Controls */}
                                            <div
                                                className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <button
                                                    type="button"
                                                    onClick={toggleShowreelMute}
                                                    className="px-2.5 py-1.5 rounded-full text-[11px] font-mono bg-black/75 hover:bg-black text-white backdrop-blur-md border border-white/20 inline-flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                                                >
                                                    {isShowreelMuted ? (
                                                        <>
                                                            <VolumeX className="w-3 h-3" style={{ color: theme.accent }} />
                                                            <span>Unmute</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Volume2 className="w-3 h-3" style={{ color: theme.accent }} />
                                                            <span>Audio On</span>
                                                        </>
                                                    )}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={openShowreelTheaterModal}
                                                    aria-label="Open Theater Mode"
                                                    className="p-1.5 rounded-full bg-black/75 hover:bg-black text-white backdrop-blur-md border border-white/20 inline-flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
                                                >
                                                    <Maximize2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {videoData.type === 'drive' && (
                                        <iframe
                                            src={videoData.embedUrl}
                                            title="Showreel Google Drive"
                                            className="w-full h-full border-0"
                                            allow="autoplay"
                                            allowFullScreen
                                        />
                                    )}

                                    {videoData.type === 'vimeo' && (
                                        <iframe
                                            src={videoData.embedUrl}
                                            title="Showreel Vimeo"
                                            className="w-full h-full border-0"
                                            allow="autoplay; fullscreen; picture-in-picture"
                                            allowFullScreen
                                        />
                                    )}

                                    {videoData.type === 'video' && videoData.embedUrl && (
                                        <div
                                            className="relative w-full h-full bg-black cursor-pointer"
                                            onClick={toggleShowreelPlay}
                                        >
                                            <video
                                                ref={videoRef}
                                                src={videoData.embedUrl}
                                                autoPlay
                                                loop
                                                muted={isShowreelMuted}
                                                playsInline
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    {videoData.type === 'unknown' && (
                                        <div
                                            className="w-full h-full relative group cursor-pointer"
                                            onClick={openShowreelTheaterModal}
                                        >
                                            <EditorialVisualFrame
                                                theme={theme}
                                                index="REEL"
                                                category="Motion Direction"
                                                aspectClass="aspect-video"
                                                pattern="waveform"
                                                isHovered={false}
                                                badgeText="Interactive Showreel"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Compact Scrubber Bar */}
                                <div
                                    onClick={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const pct = Math.max(
                                            0,
                                            Math.min(100, Math.round(((e.clientX - rect.left) / rect.width) * 100))
                                        );
                                        seekShowreel(pct);
                                    }}
                                    className="mt-3 w-full h-1.5 rounded-full cursor-pointer overflow-hidden relative"
                                    style={{ backgroundColor: theme.surfaceAlt }}
                                    title="Click to scrub showreel timeline"
                                >
                                    <div
                                        className="h-full transition-all duration-300"
                                        style={{
                                            width: `${showreelProgress}%`,
                                            backgroundColor: theme.accent
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
