"use client";

import React, { RefObject } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { StudioTheme, SiteConfig, ShowreelChapter } from '@/types';
import { EditorialVisualFrame } from './EditorialVisualFrame';

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
                                        title="YouTube video player"
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] border-0 pointer-events-none"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            ) : siteConfig.showreel.videoUrl.includes('vimeo') ? (
                                <iframe
                                    src={siteConfig.showreel.videoUrl}
                                    title="Vimeo video player"
                                    className="w-full aspect-video border-0 bg-black"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <video
                                    ref={videoRef}
                                    src={siteConfig.showreel.videoUrl}
                                    className="w-full aspect-video object-cover bg-black cursor-pointer"
                                    autoPlay={isShowreelPlaying}
                                    muted={isShowreelMuted}
                                    loop
                                    playsInline
                                    onClick={toggleShowreelPlay}
                                />
                            )
                        ) : (
                            <div
                                onClick={() => setShowreelModalOpen(true)}
                                className="cursor-pointer relative group"
                            >
                                <EditorialVisualFrame
                                    theme={theme}
                                    index={activeChapter.id}
                                    category={`${activeChapter.label} — ${activeChapter.note}`}
                                    aspectClass="aspect-video"
                                    pattern="widescreen-cinema"
                                    isHovered={isShowreelPlaying}
                                    badgeText={siteConfig.showreel.placeholderNote}
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <div
                                        className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110"
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

                    {/* Custom Player Controls & Timeline Scrubber */}
                    <div className="pt-4 px-2 flex flex-col gap-4">
                        {/* Scrubber Bar */}
                        <div
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const pct = Math.max(
                                    0,
                                    Math.min(100, Math.round(((e.clientX - rect.left) / rect.width) * 100))
                                );
                                seekShowreel(pct);
                            }}
                            className="w-full h-2 rounded-full cursor-pointer overflow-hidden relative"
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

                        {/* Transport Controls & Chapter Selector */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={toggleShowreelPlay}
                                    className="px-4 py-2 rounded-full text-xs font-medium border flex items-center gap-2"
                                    style={{
                                        backgroundColor: theme.surfaceAlt,
                                        borderColor: theme.border,
                                        color: theme.text
                                    }}
                                >
                                    {isShowreelPlaying ? (
                                        <>
                                            <Pause className="w-3.5 h-3.5" />
                                            <span>Pause</span>
                                        </>
                                    ) : (
                                        <>
                                            <Play className="w-3.5 h-3.5" />
                                            <span>Play</span>
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={toggleShowreelMute}
                                    className="px-4 py-2 rounded-full text-xs font-medium border flex items-center gap-2"
                                    style={{
                                        backgroundColor: theme.surfaceAlt,
                                        borderColor: theme.border,
                                        color: theme.text
                                    }}
                                >
                                    {isShowreelMuted ? (
                                        <>
                                            <VolumeX className="w-3.5 h-3.5" />
                                            <span>Muted</span>
                                        </>
                                    ) : (
                                        <>
                                            <Volume2 className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                                            <span>Audio On</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Chapter Quick Buttons */}
                            <div className="hidden lg:flex items-center gap-2">
                                {siteConfig.showreel.chapters.map((chap, idx) => (
                                    <button
                                        key={chap.id}
                                        onClick={() => {
                                            setActiveChapterIndex(idx);
                                            seekShowreel(chap.progress);
                                        }}
                                        className="px-3 py-1.5 rounded-full text-xs font-mono transition-colors"
                                        style={{
                                            backgroundColor:
                                                idx === activeChapterIndex ? theme.accent : theme.surfaceAlt,
                                            color:
                                                idx === activeChapterIndex ? theme.accentText : theme.textMuted
                                        }}
                                    >
                                        {chap.label}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setCmsOpen(true)}
                                    className="text-xs underline"
                                    style={{ color: theme.textMuted }}
                                >
                                    Set Video URL
                                </button>
                                <button
                                    onClick={() => setShowreelModalOpen(true)}
                                    className="px-3.5 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5"
                                    style={{
                                        backgroundColor: theme.surfaceAlt,
                                        borderColor: theme.border,
                                        color: theme.text
                                    }}
                                >
                                    <Maximize2 className="w-3.5 h-3.5" />
                                    <span>Theater Mode</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

