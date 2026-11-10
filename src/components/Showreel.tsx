"use client";

import React, { RefObject } from 'react';
import { Play } from 'lucide-react';
import { StudioTheme, SiteConfig, ShowreelChapter } from '@/types';
import { EditorialVisualFrame } from './EditorialVisualFrame';
import { ShowreelControls } from './ShowreelControls';
import { formatUniversalVideoEmbed } from '@/utils/video';

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
    const videoData = formatUniversalVideoEmbed(siteConfig.showreel.videoUrl, { chromeless: true });

    return (
        <section
            id="showreel"
            className="py-24 md:py-32 border-b"
            style={{ borderColor: theme.border }}
        >
            <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
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
                        {videoData.type === 'youtube' && (
                            <div 
                                className="relative w-full aspect-video bg-black overflow-hidden select-none cursor-pointer"
                                onClick={toggleShowreelPlay}
                            >
                                <iframe
                                    ref={iframeRef}
                                    src={videoData.embedUrl}
                                    title="Showreel YouTube"
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] pointer-events-none"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                />
                                <div className="absolute inset-0 z-10" />
                            </div>
                        )}

                        {videoData.type === 'drive' && (
                            <div className="relative w-full aspect-video bg-black overflow-hidden">
                                <iframe
                                    src={videoData.embedUrl}
                                    title="Showreel Google Drive"
                                    className="w-full h-full border-0"
                                    allow="autoplay"
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
                        setCmsOpen={setCmsOpen}
                    />
                </div>
            </div>
        </section>
    );
}
