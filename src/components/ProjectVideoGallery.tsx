"use client";

import React from 'react';
import { StudioTheme, ProjectVideoItem } from '@/types';
import { UniversalVideoPlayer } from './UniversalVideoPlayer';
import { getVideoPlatformLabel, getOriginalVideoSourceUrl } from '@/utils/video';
import { ExternalLink, Film, Maximize2, Smartphone } from 'lucide-react';

interface ProjectVideoGalleryProps {
    theme: StudioTheme;
    galleryVideos: ProjectVideoItem[];
    projectTitle: string;
    onSelectStageVideo?: (video: ProjectVideoItem) => void;
    currentStageVideoUrl?: string;
}

export function ProjectVideoGallery({
    theme,
    galleryVideos,
    projectTitle,
    onSelectStageVideo,
    currentStageVideoUrl
}: ProjectVideoGalleryProps) {
    if (!galleryVideos || galleryVideos.length === 0) return null;

    const verticalReels = galleryVideos.filter((v) => v.aspect === 'vertical');
    const standardVideos = galleryVideos.filter((v) => v.aspect !== 'vertical');

    const handlePlayInTheater = (video: ProjectVideoItem) => {
        if (onSelectStageVideo) {
            onSelectStageVideo(video);
            const stageEl = document.getElementById('case-study-stage');
            if (stageEl) {
                stageEl.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="mb-20">
            {/* Main Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span
                            className="font-mono text-xs uppercase tracking-[0.2em] px-3 py-1 rounded-full border"
                            style={{
                                backgroundColor: theme.accentSoft,
                                borderColor: theme.border,
                                color: theme.accent
                            }}
                        >
                            Complete Video Gallery ({galleryVideos.length} {galleryVideos.length === 1 ? 'Work' : 'Works'})
                        </span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-4xl font-semibold">
                        Every Cut, Sequence &amp; Reel.{' '}
                        <span className="font-serif-italic font-normal">Original Portfolio.</span>
                    </h2>
                </div>
                <p className="text-sm max-w-md" style={{ color: theme.textMuted }}>
                    All individual video works synchronized from {projectTitle} on Behance. Play any
                    work in-place or select to expand into the master stage.
                </p>
            </div>

            {/* 1. Widescreen & Square Video Cuts Grid */}
            {standardVideos.length > 0 && (
                <div className="space-y-6 mb-14">
                    {verticalReels.length > 0 && (
                        <div className="flex items-center gap-2 pb-2 border-b" style={{ borderColor: theme.border }}>
                            <Film className="w-4 h-4" style={{ color: theme.accent }} />
                            <h3 className="font-display text-lg font-semibold">
                                Commercial Cuts, Infographics &amp; Animations ({standardVideos.length})
                            </h3>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                        {standardVideos.map((item, idx) => {
                            const isPlayingInTheater = currentStageVideoUrl === item.url;
                            const platformLabel = getVideoPlatformLabel(item.url);
                            const directUrl = getOriginalVideoSourceUrl(item.url);

                            return (
                                <div
                                    key={item.id || `std-${idx}`}
                                    className="rounded-2xl border overflow-hidden p-3 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-md"
                                    style={{
                                        backgroundColor: theme.surface,
                                        borderColor: isPlayingInTheater ? theme.accent : theme.border
                                    }}
                                >
                                    {/* Video Card Header */}
                                    <div className="flex items-center justify-between gap-3 mb-3 px-1">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <span
                                                className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded border shrink-0"
                                                style={{
                                                    backgroundColor: theme.surfaceAlt,
                                                    borderColor: theme.border,
                                                    color: theme.textMuted
                                                }}
                                            >
                                                Cut 0{idx + 1}
                                            </span>
                                            <h4 className="font-display text-sm font-semibold truncate">
                                                {item.title}
                                            </h4>
                                        </div>

                                        <span
                                            className="px-2.5 py-0.5 rounded-full text-[10px] font-mono shrink-0 uppercase tracking-wider"
                                            style={{
                                                backgroundColor: theme.accentSoft,
                                                color: theme.accent
                                            }}
                                        >
                                            {platformLabel}
                                        </span>
                                    </div>

                                    {/* Embedded Video Player Stage */}
                                    <div className="rounded-xl overflow-hidden bg-black mb-3">
                                        <UniversalVideoPlayer
                                            url={item.url}
                                            title={item.title}
                                            aspect={item.aspect}
                                            width={item.width}
                                            height={item.height}
                                            lazy={true}
                                        />
                                    </div>

                                    {/* Card Action Strip */}
                                    <div className="pt-2 flex items-center justify-between text-xs font-mono">
                                        <button
                                            onClick={() => handlePlayInTheater(item)}
                                            className="inline-flex items-center gap-1.5 transition-colors cursor-pointer hover:opacity-85"
                                            style={{ color: isPlayingInTheater ? theme.accent : theme.text }}
                                        >
                                            <Maximize2 className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                                            <span>
                                                {isPlayingInTheater ? 'Playing in Theater' : 'Expand in Theater'}
                                            </span>
                                        </button>

                                        {directUrl && (
                                            <a
                                                href={directUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 transition-opacity hover:opacity-75"
                                                style={{ color: theme.textMuted }}
                                            >
                                                <span>Source ↗</span>
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* 2. Vertical Short-Form Reels Grid (9:16) */}
            {verticalReels.length > 0 && (
                <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b" style={{ borderColor: theme.border }}>
                        <Smartphone className="w-4 h-4" style={{ color: theme.accent }} />
                        <h3 className="font-display text-lg font-semibold">
                            Vertical Short-Form Mobile Reels ({verticalReels.length})
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {verticalReels.map((item, idx) => {
                            const isPlayingInTheater = currentStageVideoUrl === item.url;
                            const directUrl = getOriginalVideoSourceUrl(item.url);

                            return (
                                <div
                                    key={item.id || `reel-${idx}`}
                                    className="rounded-3xl border overflow-hidden p-3.5 flex flex-col justify-between transition-all duration-300 hover:shadow-md"
                                    style={{
                                        backgroundColor: theme.surface,
                                        borderColor: isPlayingInTheater ? theme.accent : theme.border
                                    }}
                                >
                                    {/* Reel Header */}
                                    <div className="flex items-center justify-between gap-2 mb-3 px-1">
                                        <span
                                            className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border"
                                            style={{
                                                backgroundColor: theme.surfaceAlt,
                                                borderColor: theme.border,
                                                color: theme.accent
                                            }}
                                        >
                                            Reel 0{idx + 1}
                                        </span>
                                        <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: theme.textMuted }}>
                                            9:16 Vertical
                                        </span>
                                    </div>

                                    {/* Vertical Phone Screen Stage */}
                                    <div className="rounded-2xl overflow-hidden bg-black mb-3.5 shadow-sm">
                                        <UniversalVideoPlayer
                                            url={item.url}
                                            title={item.title}
                                            aspect="vertical"
                                            width={item.width}
                                            height={item.height}
                                            lazy={true}
                                        />
                                    </div>

                                    {/* Reel Title & Source Link */}
                                    <div className="px-1 pt-1 space-y-2">
                                        <h4 className="font-display text-xs font-semibold truncate">
                                            {item.title}
                                        </h4>
                                        <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t" style={{ borderColor: theme.border }}>
                                            <button
                                                onClick={() => handlePlayInTheater(item)}
                                                className="inline-flex items-center gap-1 transition-colors cursor-pointer hover:opacity-85"
                                                style={{ color: isPlayingInTheater ? theme.accent : theme.text }}
                                            >
                                                <Maximize2 className="w-3 h-3" style={{ color: theme.accent }} />
                                                <span>{isPlayingInTheater ? 'In Theater' : 'Theater'}</span>
                                            </button>

                                            {directUrl && (
                                                <a
                                                    href={directUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 transition-opacity hover:opacity-75"
                                                    style={{ color: theme.textMuted }}
                                                >
                                                    <span>Reel ↗</span>
                                                    <ExternalLink className="w-2.5 h-2.5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </section>
    );
}

