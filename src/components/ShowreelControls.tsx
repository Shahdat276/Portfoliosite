"use client";

import React from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { StudioTheme, SiteConfig } from '@/types';

interface ShowreelControlsProps {
    theme: StudioTheme;
    siteConfig: SiteConfig;
    activeChapterIndex: number;
    setActiveChapterIndex: (index: number) => void;
    isShowreelPlaying: boolean;
    isShowreelMuted: boolean;
    showreelProgress: number;
    toggleShowreelPlay: () => void;
    toggleShowreelMute: () => void;
    seekShowreel: (pct: number, exactSeconds?: number) => void;
    setShowreelModalOpen: (open: boolean) => void;
}

export function ShowreelControls({
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
    setShowreelModalOpen
}: ShowreelControlsProps) {
    return (
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
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleShowreelPlay}
                        className="px-4 py-2 rounded-full text-xs font-medium border flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                        style={{
                            backgroundColor: isShowreelPlaying ? theme.accent : theme.surfaceAlt,
                            borderColor: isShowreelPlaying ? theme.accent : theme.border,
                            color: isShowreelPlaying ? theme.accentText : theme.text
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
                        className="px-4 py-2 rounded-full text-xs font-medium border flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
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

                {/* Chapter Quick Buttons (Responsive on Tablet & Desktop) */}
                <div className="flex flex-wrap items-center gap-2">
                    {siteConfig.showreel.chapters.map((chap, idx) => (
                        <button
                            key={chap.id}
                            onClick={() => {
                                setActiveChapterIndex(idx);
                                seekShowreel(chap.progress, chap.seconds);
                            }}
                            className="px-3 py-1.5 rounded-full text-xs font-mono border transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                            style={{
                                backgroundColor:
                                    idx === activeChapterIndex ? theme.accent : theme.surfaceAlt,
                                borderColor:
                                    idx === activeChapterIndex ? theme.accent : theme.border,
                                color:
                                    idx === activeChapterIndex ? theme.accentText : theme.textMuted
                            }}
                        >
                            {chap.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <span className="font-mono text-xs hidden sm:inline" style={{ color: theme.textMuted }}>
                        1080p HD • {siteConfig.showreel.duration}
                    </span>
                    <button
                        onClick={() => setShowreelModalOpen(true)}
                        className="px-3.5 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
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
    );
}

