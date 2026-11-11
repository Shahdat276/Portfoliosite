"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
    Download,
    ArrowUpRight,
    Volume2,
    VolumeX,
    RotateCcw,
    Play
} from 'lucide-react';
import { useInView, useReducedMotion } from 'framer-motion';
import { StudioTheme, SiteConfig } from '@/types';
import {
    KineticReveal,
    ParallaxDepthLayer,
    ParallaxImageWindow
} from './MotionPrimitives';

interface AboutProps {
    theme: StudioTheme;
    siteConfig: SiteConfig;
    navigateToSection: (id: string) => void;
}

type PortraitPlaybackPhase = 'idle' | 'playing' | 'ended';

export function About({
    theme,
    siteConfig,
    navigateToSection
}: AboutProps) {
    const portraitRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const autoPlayedRef = useRef(false);

    const shouldReduce = useReducedMotion();
    // Pre-buffer the portrait reel slightly before the visitor enters #about.
    const nearInView = useInView(portraitRef, { margin: '450px' });
    // Trigger playback once 35% of the portrait card is visible in viewport.
    const triggerInView = useInView(portraitRef, { amount: 0.35 });
    // Keep track of whether the card is still anywhere on screen to pause/reset cleanly offscreen.
    const isStillOnScreen = useInView(portraitRef, { amount: 0.01 });

    const [phase, setPhase] = useState<PortraitPlaybackPhase>('idle');
    const [videoVisible, setVideoVisible] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);

    const mutedRef = useRef(isMuted);
    useEffect(() => {
        mutedRef.current = isMuted;
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const posterSrc = siteConfig.portrait.posterUrl || siteConfig.portrait.imageUrl;
    const hasVideo = Boolean(siteConfig.portrait.videoWebmUrl || siteConfig.portrait.videoMp4Url);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !hasVideo) return;

        if (!isStillOnScreen) {
            if (autoPlayedRef.current || !video.paused || video.currentTime > 0) {
                autoPlayedRef.current = false;
                video.pause();
                video.currentTime = 0;
                const rafId = requestAnimationFrame(() => {
                    setVideoVisible(false);
                    setPhase('idle');
                    setProgress(0);
                });
                return () => cancelAnimationFrame(rafId);
            }
            return;
        }

        if (triggerInView && !autoPlayedRef.current && !shouldReduce) {
            autoPlayedRef.current = true;
            if (video.ended || video.currentTime > 0) {
                video.currentTime = 0;
            }
            video.muted = mutedRef.current;
            void video.play().catch(() => {
                // Guarantee autoplay compliance if browser blocked unmuted start.
                video.muted = true;
                mutedRef.current = true;
                setIsMuted(true);
                void video.play().catch(() => {
                    autoPlayedRef.current = false;
                });
            });
        }
    }, [triggerInView, isStillOnScreen, hasVideo, shouldReduce]);

    const handleReplay = useCallback(() => {
        const video = videoRef.current;
        if (!video || !hasVideo) return;
        autoPlayedRef.current = true;
        video.currentTime = 0;
        video.muted = mutedRef.current;
        setProgress(0);
        void video.play().catch(() => {
            video.muted = true;
            mutedRef.current = true;
            setIsMuted(true);
            void video.play().catch(() => undefined);
        });
    }, [hasVideo]);

    const handleToggleMute = useCallback(() => {
        setIsMuted((prev) => {
            const next = !prev;
            mutedRef.current = next;
            if (videoRef.current) {
                videoRef.current.muted = next;
            }
            return next;
        });
    }, []);

    return (
        <section
            id="about"
            className="py-12 sm:py-16 md:py-24 lg:py-28 border-b"
            style={{ borderColor: theme.border }}
        >
                <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-12 items-start">
                        {/* Left 5 Columns: Living Portrait Frame Card with Counter-Depth Parallax */}
                        <div className="lg:col-span-5">
                            <ParallaxDepthLayer speed={-18}>
                            <div
                                className="rounded-2xl sm:rounded-3xl border p-3 sm:p-5"
                                style={{
                                    backgroundColor: theme.surface,
                                    borderColor: theme.border
                                }}
                            >
                                <div
                                    ref={portraitRef}
                                    className="rounded-xl sm:rounded-2xl aspect-[4/5] relative overflow-hidden flex flex-col justify-between p-4 sm:p-7 border"
                                    style={{
                                        backgroundColor: theme.surfaceAlt,
                                        borderColor: theme.border
                                    }}
                                >
                                    {posterSrc ? (
                                        <>
                                            <ParallaxImageWindow travel={14} baseScale={1.12}>
                                                <Image
                                                    src={posterSrc}
                                                    alt={siteConfig.name}
                                                    fill
                                                    unoptimized
                                                    className="object-cover object-[50%_12%]"
                                                />
                                                {hasVideo && (
                                                    <video
                                                        ref={videoRef}
                                                        poster={posterSrc}
                                                        preload={nearInView ? 'auto' : 'metadata'}
                                                        playsInline
                                                        muted={isMuted}
                                                        disablePictureInPicture
                                                        aria-label={`${siteConfig.name} — Living Portrait`}
                                                        onPlaying={() => {
                                                            setVideoVisible(true);
                                                            setPhase('playing');
                                                        }}
                                                        onEnded={() => {
                                                            setPhase('ended');
                                                            setProgress(1);
                                                        }}
                                                        onTimeUpdate={(e) => {
                                                            const vid = e.currentTarget;
                                                            if (vid.duration > 0) {
                                                                setProgress(Math.min(1, vid.currentTime / vid.duration));
                                                            }
                                                        }}
                                                        className={`absolute inset-0 w-full h-full object-cover object-[50%_12%] pointer-events-none transition-opacity duration-500 ease-out ${
                                                            videoVisible ? 'opacity-100' : 'opacity-0'
                                                        }`}
                                                    >
                                                        {siteConfig.portrait.videoMp4Url && (
                                                            <source src={siteConfig.portrait.videoMp4Url} type="video/mp4" />
                                                        )}
                                                        {siteConfig.portrait.videoWebmUrl && (
                                                            <source src={siteConfig.portrait.videoWebmUrl} type="video/webm" />
                                                        )}
                                                    </video>
                                                )}
                                            </ParallaxImageWindow>

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 pointer-events-none" />

                                            {/* Top HUD: Appears discreetly during active/completed motion */}
                                            {hasVideo && (
                                                <div className="relative z-10 flex items-center justify-between gap-2">
                                                    <div
                                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/10 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-white/85 transition-opacity duration-300 ${
                                                            phase === 'playing' ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                                        }`}
                                                    >
                                                        <span
                                                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                                                            style={{ backgroundColor: theme.accent }}
                                                        />
                                                        <span>LIVE PORTRAIT</span>
                                                    </div>

                                                    <div className="flex items-center gap-1.5 ml-auto">
                                                        {phase === 'idle' && shouldReduce && (
                                                            <button
                                                                type="button"
                                                                onClick={handleReplay}
                                                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 hover:bg-black/75 backdrop-blur-md border border-white/15 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-white transition-colors"
                                                            >
                                                                <Play className="w-2.5 h-2.5 fill-current" />
                                                                <span>PLAY</span>
                                                            </button>
                                                        )}

                                                        {phase === 'ended' && (
                                                            <button
                                                                type="button"
                                                                onClick={handleReplay}
                                                                aria-label="Replay portrait video"
                                                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 hover:bg-black/75 backdrop-blur-md border border-white/15 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-white transition-colors"
                                                            >
                                                                <RotateCcw className="w-2.5 h-2.5" />
                                                                <span>REPLAY</span>
                                                            </button>
                                                        )}

                                                        {phase !== 'idle' && (
                                                            <button
                                                                type="button"
                                                                onClick={handleToggleMute}
                                                                aria-label={isMuted ? 'Unmute portrait audio' : 'Mute portrait audio'}
                                                                className="w-7 h-7 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90 transition-colors"
                                                            >
                                                                {isMuted ? (
                                                                    <VolumeX className="w-3.5 h-3.5" />
                                                                ) : (
                                                                    <Volume2 className="w-3.5 h-3.5" />
                                                                )}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="relative z-10 mt-auto flex items-end justify-between text-white pt-4">
                                                <div>
                                                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/75 block">
                                                        {siteConfig.currentOrganization}
                                                    </span>
                                                    <span className="font-display text-lg font-semibold block">
                                                        {siteConfig.name}
                                                    </span>
                                                </div>
                                                <span
                                                    className="px-2.5 py-1 rounded-full font-mono text-[10px] font-semibold uppercase tracking-wider"
                                                    style={{
                                                        backgroundColor: theme.accent,
                                                        color: theme.accentText
                                                    }}
                                                >
                                                    9+ YRS
                                                </span>
                                            </div>

                                            {/* Subtle bottom progress hairline while video layer is active */}
                                            {hasVideo && (
                                                <div
                                                    className={`absolute inset-x-0 bottom-0 h-[2px] bg-white/10 z-20 pointer-events-none transition-opacity duration-300 ${
                                                        videoVisible ? 'opacity-100' : 'opacity-0'
                                                    }`}
                                                >
                                                    <div
                                                        className="h-full origin-left transition-transform duration-150 ease-linear"
                                                        style={{
                                                            backgroundColor: theme.accent,
                                                            transform: `scaleX(${progress})`
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-center justify-between font-mono text-xs" style={{ color: theme.textMuted }}>
                                                <span>PORTRAIT / STUDIO</span>
                                                <span>DHAKA, BD</span>
                                            </div>

                                            <div className="my-auto text-center">
                                                <div
                                                    className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center font-display text-3xl font-semibold border"
                                                    style={{
                                                        backgroundColor: theme.surface,
                                                        borderColor: theme.borderStrong,
                                                        color: theme.accent
                                                    }}
                                                >
                                                    SH
                                                </div>
                                                <p className="font-display text-lg font-semibold">
                                                    {siteConfig.name}
                                                </p>
                                                <p
                                                    className="text-xs font-mono mt-1 max-w-[220px] mx-auto"
                                                    style={{ color: theme.textMuted }}
                                                >
                                                    {siteConfig.portrait.placeholderNote}
                                                </p>
                                            </div>

                                            <div
                                                className="pt-4 border-t flex items-center justify-between text-xs font-mono"
                                                style={{ borderColor: theme.border, color: theme.textMuted }}
                                            >
                                                <span>Amanat Shah Group (ASG)</span>
                                                <span style={{ color: theme.accent }}>9+ YEARS</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            </ParallaxDepthLayer>
                        </div>

                        {/* Right 7 Columns: Biography, Philosophy & CV */}
                        <div className="lg:col-span-7">
                            <KineticReveal delay={0.08}>
                            <span
                                className="font-mono text-xs uppercase tracking-[0.2em] block mb-2"
                                style={{ color: theme.accent }}
                            >
                                02 / About Me
                            </span>
                            <h2 className="font-display text-3xl sm:text-5xl font-semibold leading-[1.08] mb-5 sm:mb-8">
                                Creativity Meets{' '}
                                <span className="font-serif-italic font-normal" style={{ color: theme.accent }}>
                                    Technical Precision.
                                </span>
                            </h2>

                            <div
                                className="space-y-3.5 sm:space-y-5 text-sm sm:text-lg leading-relaxed mb-6 sm:mb-10"
                                style={{ color: theme.textMuted }}
                            >
                                {siteConfig.aboutBioParagraphs.map((paragraph, index) => (
                                    <p
                                        key={index}
                                        style={{
                                            color: index === 2 ? theme.text : theme.textMuted,
                                            fontWeight: index === 2 ? 500 : 400
                                        }}
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* Philosophy & Approach Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 mb-6 sm:mb-10">
                                <div
                                    className="p-4 sm:p-6 rounded-2xl border"
                                    style={{
                                        backgroundColor: theme.surface,
                                        borderColor: theme.border
                                    }}
                                >
                                    <span
                                        className="font-mono text-[11px] uppercase tracking-wider block mb-2"
                                        style={{ color: theme.accent }}
                                    >
                                        Professional Philosophy
                                    </span>
                                    <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                                        {siteConfig.philosophy}
                                    </p>
                                </div>

                                <div
                                    className="p-4 sm:p-6 rounded-2xl border"
                                    style={{
                                        backgroundColor: theme.surface,
                                        borderColor: theme.border
                                    }}
                                >
                                    <span
                                        className="font-mono text-[11px] uppercase tracking-wider block mb-2"
                                        style={{ color: theme.accent }}
                                    >
                                        Creative Approach
                                    </span>
                                    <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                                        {siteConfig.creativeApproach}
                                    </p>
                                </div>

                                {siteConfig.education && (
                                    <div
                                        className="p-4 sm:p-5 rounded-2xl border"
                                        style={{
                                            backgroundColor: theme.surfaceAlt,
                                            borderColor: theme.border
                                        }}
                                    >
                                        <span
                                            className="font-mono text-[10px] uppercase tracking-wider block mb-1"
                                            style={{ color: theme.accent }}
                                        >
                                            Academic Background
                                        </span>
                                        <p className="text-sm font-medium" style={{ color: theme.text }}>
                                            {siteConfig.education}
                                        </p>
                                    </div>
                                )}

                                {siteConfig.languages && (
                                    <div
                                        className="p-4 sm:p-5 rounded-2xl border"
                                        style={{
                                            backgroundColor: theme.surfaceAlt,
                                            borderColor: theme.border
                                        }}
                                    >
                                        <span
                                            className="font-mono text-[10px] uppercase tracking-wider block mb-1"
                                            style={{ color: theme.accent }}
                                        >
                                            Languages & Communication
                                        </span>
                                        <p className="text-sm font-medium" style={{ color: theme.text }}>
                                            {siteConfig.languages}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Download CV & Contact Buttons */}
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                                <a
                                    href={siteConfig.contact.cvUrl}
                                    download
                                    className="px-5 py-3 sm:px-7 sm:py-4 rounded-full text-xs sm:text-sm font-medium inline-flex items-center gap-2 sm:gap-2.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 cursor-pointer"
                                    style={{
                                        backgroundColor: theme.accent,
                                        color: theme.accentText
                                    }}
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Download Resume / CV</span>
                                </a>

                                <button
                                    onClick={() => navigateToSection('contact')}
                                    className="px-5 py-3 sm:px-7 sm:py-4 rounded-full text-xs sm:text-sm font-medium border inline-flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:scale-95 cursor-pointer"
                                    style={{
                                        backgroundColor: theme.surface,
                                        borderColor: theme.borderStrong,
                                        color: theme.text
                                    }}
                                >
                                    <span>Discuss a Project</span>
                                    <ArrowUpRight className="w-4 h-4" style={{ color: theme.accent }} />
                                </button>
                            </div>
                            </KineticReveal>
                        </div>
                    </div>
                </div>
        </section>
    );
}
