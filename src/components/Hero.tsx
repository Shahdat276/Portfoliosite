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
    ArrowDown,
    Play,
    Volume2,
    VolumeX,
    Maximize2,
    Download
} from 'lucide-react';
import { StudioTheme, SiteConfig } from '@/types';
import { EditorialVisualFrame } from './EditorialVisualFrame';
import {
    ArchitecturalGuides,
    RollText,
    STUDIO_EASE
} from './MotionPrimitives';
import { formatUniversalVideoEmbed } from '@/utils/video';

interface HeroProps {
    theme: StudioTheme;
    siteConfig: SiteConfig;
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

/**
 * Centered CodeofSagar-inspired fullscreen editorial Hero featuring bold masked typography
 * anchored above a continuous edge-to-edge Official Master Showreel theater stage.
 */
export function Hero({
    theme,
    siteConfig,
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
    const videoData = formatUniversalVideoEmbed(siteConfig.showreel.videoUrl, { chromeless: true });
    const heroRef = useRef<HTMLElement>(null);
    const shouldReduce = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start']
    });
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 160,
        damping: 26,
        mass: 0.25
    });

    const headlineY = useTransform(smoothProgress, [0, 1], [0, -48]);
    const headlineOpacity = useTransform(smoothProgress, [0, 0.7], [1, 0.25]);
    const reelScale = useTransform(smoothProgress, [0, 0.8], [1, 1.04]);
    const reelY = useTransform(smoothProgress, [0, 1], [0, 28]);

    return (
        <section
            ref={heroRef}
            id="home"
            className="relative overflow-x-clip min-h-[100svh] pt-24 pb-8 sm:pt-28 sm:pb-12 flex flex-col justify-between border-b transition-colors duration-500"
            style={{
                backgroundColor: theme.bg,
                borderColor: theme.border
            }}
        >
            <ArchitecturalGuides borderColor={theme.border} columns={5} />

            {/* Atmospheric Ambient Accent Radiance */}
            {!shouldReduce && (
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-[14%] left-1/2 -translate-x-1/2 w-[360px] sm:w-[680px] aspect-square rounded-full blur-[140px] opacity-[0.1]"
                    style={{ backgroundColor: theme.accent }}
                />
            )}

            <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px] flex-1 flex flex-col justify-between gap-7 sm:gap-9">
                {/* 1. Top Centered Editorial Typography (CodeofSagar Headline Style) */}
                <motion.div
                    style={
                        shouldReduce
                            ? undefined
                            : { y: headlineY, opacity: headlineOpacity }
                    }
                    className="text-center max-w-5xl mx-auto pt-2 sm:pt-4 will-change-transform"
                >
                    <p
                        className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.26em] mb-3"
                        style={{ color: theme.accent }}
                    >
                        {siteConfig.name} · Senior Video Editor &amp; Motion Designer
                    </p>

                    <h1 className="font-display text-4xl sm:text-6xl lg:text-[68px] xl:text-[82px] font-semibold leading-[0.98] tracking-[-0.045em]">
                        <span className="block overflow-clip py-[0.04em] -my-[0.04em]">
                            <motion.span
                                initial={shouldReduce ? false : { opacity: 0, y: '105%', skewY: 3.5 }}
                                animate={{ opacity: 1, y: '0%', skewY: 0 }}
                                transition={{ duration: 0.8, ease: STUDIO_EASE }}
                                className="block"
                            >
                                Visuals that{' '}
                                <span
                                    className="font-serif-italic font-normal"
                                    style={{ color: theme.accent }}
                                >
                                    move.
                                </span>
                            </motion.span>
                        </span>
                        <span className="block overflow-clip py-[0.04em] -my-[0.04em]">
                            <motion.span
                                initial={shouldReduce ? false : { opacity: 0, y: '105%', skewY: 3.5 }}
                                animate={{ opacity: 1, y: '0%', skewY: 0 }}
                                transition={{ duration: 0.85, delay: 0.08, ease: STUDIO_EASE }}
                                className="block"
                            >
                                Stories that{' '}
                                <span className="font-serif-italic font-normal">sell.</span>
                            </motion.span>
                        </span>
                    </h1>
                </motion.div>

                {/* 2. Prominent Centered Auto-Playing Master Showreel Canvas */}
                <motion.div
                    style={shouldReduce ? undefined : { scale: reelScale, y: reelY }}
                    className="w-full max-w-[980px] xl:max-w-[1060px] mx-auto will-change-transform"
                >
                    <div
                        className="rounded-2xl sm:rounded-3xl border p-2 sm:p-3 shadow-2xl"
                        style={{
                            backgroundColor: theme.surface,
                            borderColor: theme.borderStrong
                        }}
                    >
                        <div className="rounded-xl sm:rounded-2xl overflow-hidden relative aspect-video bg-black">
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

                                    {!isShowreelPlaying && (
                                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                                            <div
                                                className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110"
                                                style={{
                                                    backgroundColor: theme.accent,
                                                    color: theme.accentText
                                                }}
                                            >
                                                <Play className="w-6 h-6 fill-current ml-0.5" />
                                            </div>
                                        </div>
                                    )}

                                    {/* Bottom Floating Overlay Controls */}
                                    <div
                                        className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 text-white backdrop-blur-md border border-white/15 font-mono text-[10px] uppercase tracking-wider">
                                            <span
                                                className="w-1.5 h-1.5 rounded-full animate-pulse"
                                                style={{ backgroundColor: theme.accent }}
                                            />
                                            <span>Official Showreel • {siteConfig.showreel.duration}</span>
                                        </div>

                                        <div className="ml-auto flex items-center gap-1.5">
                                            <button
                                                type="button"
                                                onClick={toggleShowreelMute}
                                                className="px-3 py-1.5 rounded-full text-[11px] font-mono bg-black/75 hover:bg-black text-white backdrop-blur-md border border-white/20 inline-flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
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
                                                aria-label="Open Fullscreen Showreel"
                                                className="px-3 py-1.5 rounded-full text-[11px] font-mono bg-black/75 hover:bg-black text-white backdrop-blur-md border border-white/20 inline-flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                                            >
                                                <Maximize2 className="w-3 h-3" />
                                                <span className="hidden sm:inline">Fullscreen</span>
                                            </button>
                                        </div>
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
                                    className="w-full h-full relative cursor-pointer"
                                    onClick={openShowreelTheaterModal}
                                >
                                    <EditorialVisualFrame
                                        theme={theme}
                                        index="REEL"
                                        category="Master Showreel"
                                        aspectClass="aspect-video"
                                        pattern="waveform"
                                        isHovered={false}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Thin Timeline Scrub Progress */}
                        <div
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const pct = Math.max(
                                    0,
                                    Math.min(100, Math.round(((e.clientX - rect.left) / rect.width) * 100))
                                );
                                seekShowreel(pct);
                            }}
                            className="mt-2.5 w-full h-1 rounded-full cursor-pointer overflow-hidden relative"
                            style={{ backgroundColor: theme.surfaceAlt }}
                            title="Click to scrub timeline"
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

                {/* 3. Bottom Editorial Metadata & Actions Strip (Exact CodeofSagar Bottom Corners) */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-1">
                    {/* Left Metrics */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-xs" style={{ color: theme.textMuted }}>
                        <span>9+ Years Experience</span>
                        <span style={{ color: theme.accent }}>•</span>
                        <span className="font-semibold" style={{ color: theme.text }}>1000+ Works</span>
                        <span style={{ color: theme.accent }}>•</span>
                        <span>Amanat Shah Group</span>
                    </div>

                    {/* Center Scroll Hint on Desktop */}
                    <button
                        type="button"
                        onClick={() => navigateToSection('work')}
                        className="hidden lg:inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] cursor-pointer transition-opacity hover:opacity-75"
                        style={{ color: theme.textMuted }}
                    >
                        <span>Scroll</span>
                        <ArrowDown className="w-3 h-3 animate-bounce" style={{ color: theme.accent }} />
                    </button>

                    {/* Right Minimal RollText Links */}
                    <div className="flex flex-wrap items-center gap-5 font-mono text-xs uppercase tracking-wider">
                        <button
                            type="button"
                            onClick={() => navigateToSection('work')}
                            className="group inline-flex items-center gap-1.5 cos-link-underline pb-0.5 cursor-pointer"
                            style={{ color: theme.text }}
                        >
                            <RollText text="Selected Work" />
                            <ArrowUpRight className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                        </button>
                        <a
                            href={siteConfig.contact.cvUrl}
                            download
                            className="group inline-flex items-center gap-1.5 cos-link-underline pb-0.5 cursor-pointer"
                            style={{ color: theme.textMuted }}
                        >
                            <Download className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                            <RollText text="CV / Resume" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
