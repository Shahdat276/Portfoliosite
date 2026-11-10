"use client";

import React, { RefObject, useRef } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useReducedMotion
} from 'framer-motion';
import { Play, VolumeX } from 'lucide-react';
import { StudioTheme, SiteConfig, ShowreelChapter } from '@/types';
import { EditorialVisualFrame } from './EditorialVisualFrame';
import { ShowreelControls } from './ShowreelControls';
import { formatUniversalVideoEmbed } from '@/utils/video';
import { KineticReveal } from './MotionPrimitives';

interface ShowreelProps {
    theme: StudioTheme;
    siteConfig: SiteConfig;
    activeChapter: ShowreelChapter;
    activeChapterIndex: number;
    setActiveChapterIndex: (index: number) => void;
    isShowreelPlaying: boolean;
    isShowreelMuted: boolean;
    showreelProgress: number;
    toggleShowreelPlay: () => void;
    toggleShowreelMute: () => void;
    seekShowreel: (pct: number, exactSeconds?: number) => void;
    setShowreelModalOpen: (open: boolean) => void;
    iframeRef: RefObject<HTMLIFrameElement | null>;
    videoRef: RefObject<HTMLVideoElement | null>;
}

export function Showreel({
    theme,
    siteConfig,
    activeChapter,
    activeChapterIndex,
    setActiveChapterIndex,
    isShowreelPlaying,
    isShowreelMuted,
    showreelProgress,
    toggleShowreelPlay,
    toggleShowreelMute,
    seekShowreel,
    setShowreelModalOpen,
    iframeRef,
    videoRef
}: ShowreelProps) {
    const videoData = formatUniversalVideoEmbed(siteConfig.showreel.videoUrl, { chromeless: true });
    const stageRef = useRef<HTMLDivElement>(null);
    const shouldReduce = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: stageRef,
        offset: ['start end', 'center center']
    });
    const smoothStage = useSpring(scrollYProgress, {
        stiffness: 175,
        damping: 28,
        mass: 0.25
    });
    const stageScale = useTransform(smoothStage, [0, 1], [0.94, 1]);
    const stageY = useTransform(smoothStage, [0, 1], [28, 0]);

    return (
        <section
            id="showreel"
            className="py-12 sm:py-16 md:py-24 lg:py-28 border-b"
            style={{ borderColor: theme.border }}
        >
            <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
                <KineticReveal>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-6 max-w-[980px] xl:max-w-[1040px] mx-auto">
                        <div>
                            <span
                                className="font-mono text-xs uppercase tracking-[0.2em] block mb-2"
                                style={{ color: theme.accent }}
                            >
                                01 / Official Master Showreel
                            </span>
                            <h2 className="font-display text-3xl sm:text-5xl font-semibold">
                                Selected Moments.{' '}
                                <span className="font-serif-italic font-normal">Endless Creativity.</span>
                            </h2>
                        </div>
                        <div className="md:text-right">
                            <span
                                className="font-mono text-[11px] uppercase tracking-wider block mb-1"
                                style={{ color: theme.accent }}
                            >
                                Now Playing Chapter {activeChapter.id} • {activeChapter.time}
                            </span>
                            <p
                                className="text-sm sm:text-base max-w-md"
                                style={{ color: theme.textMuted }}
                            >
                                {siteConfig.showreel.supportingText}
                            </p>
                        </div>
                    </div>
                </KineticReveal>

                {/* Constrained Cinema Widescreen Stage (Scales cleanly into place on scroll) */}
                <div ref={stageRef}>
                    <motion.div
                        style={
                            shouldReduce
                                ? { backgroundColor: theme.surface, borderColor: theme.border }
                                : {
                                      scale: stageScale,
                                      y: stageY,
                                      backgroundColor: theme.surface,
                                      borderColor: theme.border
                                  }
                        }
                        className="max-w-[980px] xl:max-w-[1040px] mx-auto rounded-3xl border p-3 sm:p-4 shadow-sm will-change-transform"
                    >
                    <div className="rounded-2xl overflow-hidden relative bg-black">
                        {videoData.type === 'youtube' && (
                            <div
                                className="relative w-full aspect-video bg-black overflow-hidden select-none cursor-pointer group"
                                onClick={toggleShowreelPlay}
                            >
                                <iframe
                                    ref={iframeRef}
                                    src={videoData.embedUrl}
                                    title="Showreel YouTube"
                                    className="w-full h-full border-0 pointer-events-none"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                                {/* Subtle Interactive Overlay Badges */}
                                <div className="absolute inset-0 z-10 flex items-center justify-center">
                                    {!isShowreelPlaying && (
                                        <div
                                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110"
                                            style={{
                                                backgroundColor: theme.accent,
                                                color: theme.accentText
                                            }}
                                        >
                                            <Play className="w-7 h-7 fill-current ml-1" />
                                        </div>
                                    )}
                                </div>

                                {isShowreelMuted && isShowreelPlaying && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleShowreelMute();
                                        }}
                                        className="absolute bottom-4 right-4 z-20 px-3.5 py-1.5 rounded-full text-xs font-mono bg-black/75 hover:bg-black text-white backdrop-blur-md border border-white/20 inline-flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                                    >
                                        <VolumeX className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                                        <span>Click for Audio</span>
                                    </button>
                                )}
                            </div>
                        )}

                        {videoData.type === 'drive' && (
                            <div className="relative w-full aspect-video bg-black overflow-hidden">
                                <iframe
                                    src={videoData.embedUrl}
                                    title="Showreel Google Drive"
                                    className="w-full h-full border-0"
                                    allow="autoplay"
                                    allowFullScreen
                                />
                            </div>
                        )}

                        {videoData.type === 'vimeo' && (
                            <div className="relative w-full aspect-video bg-black overflow-hidden">
                                <iframe
                                    src={videoData.embedUrl}
                                    title="Showreel Vimeo"
                                    className="w-full h-full border-0"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        )}

                        {videoData.type === 'video' && videoData.embedUrl && (
                            <div className="relative w-full aspect-video bg-black cursor-pointer" onClick={toggleShowreelPlay}>
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
                            <div className="aspect-video relative group cursor-pointer" onClick={() => setShowreelModalOpen(true)}>
                                <EditorialVisualFrame
                                    theme={theme}
                                    index="REEL"
                                    category="Motion Direction"
                                    aspectClass="aspect-video"
                                    pattern="waveform"
                                    isHovered={false}
                                    badgeText="Interactive Showreel"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity group-hover:bg-black/25">
                                    <div
                                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110"
                                        style={{
                                            backgroundColor: theme.accent,
                                            color: theme.accentText
                                        }}
                                    >
                                        <Play className="w-7 h-7 fill-current ml-1" />
                                    </div>
                                    <span
                                        className="mt-4 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest border"
                                        style={{
                                            backgroundColor: theme.surface,
                                            borderColor: theme.border,
                                            color: theme.text
                                        }}
                                    >
                                        Launch Fullscreen Showreel
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Extracted Modular Player Controls */}
                    <ShowreelControls
                        theme={theme}
                        siteConfig={siteConfig}
                        activeChapterIndex={activeChapterIndex}
                        setActiveChapterIndex={setActiveChapterIndex}
                        isShowreelPlaying={isShowreelPlaying}
                        isShowreelMuted={isShowreelMuted}
                        showreelProgress={showreelProgress}
                        toggleShowreelPlay={toggleShowreelPlay}
                        toggleShowreelMute={toggleShowreelMute}
                        seekShowreel={seekShowreel}
                        setShowreelModalOpen={setShowreelModalOpen}
                    />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
