"use client";

import React, { RefObject } from 'react';
import { Play } from 'lucide-react';
import { StudioTheme, SiteConfig, ShowreelChapter } from '@/types';
import { EditorialVisualFrame } from './EditorialVisualFrame';
import { ShowreelControls } from './ShowreelControls';

function getYouTubeCleanEmbed(url: string) {
    if (!url) return '';
    let videoId = '';
    if (url.includes('embed/')) {
        videoId = url.split('embed/')[1].split('?')[0];
    } else if (url.includes('watch?v=')) {
        videoId = url.split('watch?v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    if (!videoId) return url;
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&loop=1&playlist=${videoId}&playsinline=1&enablejsapi=1`;
}

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
    seekShowreel: (pct: number) => void;
    setShowreelModalOpen: (open: boolean) => void;
    setCmsOpen: (open: boolean) => void;
    iframeRef: RefObject<HTMLIFrameElement | null>;
    videoRef: RefObject<HTMLVideoElement | null>;
}

export function Showreel({
    theme,
    siteConfig,
    activeChapterIndex,
    setActiveChapterIndex,
    isShowreelPlaying,
    isShowreelMuted,
    showreelProgress,
    toggleShowreelPlay,
    toggleShowreelMute,
    seekShowreel,
    setShowreelModalOpen,
    setCmsOpen,
    iframeRef,
    videoRef
}: ShowreelProps) {
    return (
        <section
            id="showreel"
            className="py-24 md:py-32 border-b"
            style={{ borderColor: theme.border }}
        >
            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <span
                            className="font-mono text-xs uppercase tracking-[0.2em] block mb-2"
                            style={{ color: theme.accent }}
                        >
                            01 / Featured Showreel
                        </span>
                        <h2 className="font-display text-3xl sm:text-5xl font-semibold">
                            Selected Moments.{' '}
                            <span className="font-serif-italic font-normal">Endless Creativity.</span>
                        </h2>
                    </div>
                    <p
                        className="text-sm sm:text-base max-w-md"
                        style={{ color: theme.textMuted }}
                    >
                        {siteConfig.showreel.supportingText}
                    </p>
                </div>

                {/* Widescreen Architectural Player Frame */}
                <div
                    className="rounded-3xl border p-3 sm:p-5 shadow-sm"
                    style={{
                        backgroundColor: theme.surface,
                        borderColor: theme.border
                    }}
                >
                    <div className="rounded-2xl overflow-hidden relative">
                        {siteConfig.showreel.videoUrl ? (
                            siteConfig.showreel.videoUrl.includes('youtube') || siteConfig.showreel.videoUrl.includes('youtu.be') ? (
                                <div
                                    className="relative w-full aspect-video bg-black overflow-hidden select-none cursor-pointer"
                                    onClick={toggleShowreelPlay}
                                >
                                    <iframe
                                        ref={iframeRef}
                                        src={getYouTubeCleanEmbed(siteConfig.showreel.videoUrl)}
                                        title="Showreel"
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] pointer-events-none"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    />
                                    <div className="absolute inset-0 z-10" />
                                </div>
                            ) : (
                                <div className="relative w-full aspect-video bg-black cursor-pointer" onClick={toggleShowreelPlay}>
                                    <video
                                        ref={videoRef}
                                        src={siteConfig.showreel.videoUrl}
                                        autoPlay
                                        loop
                                        muted={isShowreelMuted}
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )
                        ) : (
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
                                    setCmsOpen={setCmsOpen}
                                />
                            </div>
            </div>
                </section>
                );
}
