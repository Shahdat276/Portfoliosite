"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Film } from 'lucide-react';
import { StudioTheme, Project, ProjectVideoItem } from '@/types';
import { EditorialVisualFrame } from './EditorialVisualFrame';
import { UniversalVideoPlayer } from './UniversalVideoPlayer';
import { ProjectVideoGallery } from './ProjectVideoGallery';
import { SoftwareIcon } from './SoftwareIcon';
import { getVideoPlatformLabel, getOriginalVideoSourceUrl } from '@/utils/video';

interface CaseStudyViewProps {
    theme: StudioTheme;
    currentCaseStudy: Project;
    adjacentProjects: { prev: Project | null; next: Project | null };
    navigateToSection: (id: string) => void;
    openCaseStudy: (slug: string) => void;
}

export function CaseStudyView({
    theme,
    currentCaseStudy,
    adjacentProjects,
    navigateToSection,
    openCaseStudy
}: CaseStudyViewProps) {
    const initialVideo: ProjectVideoItem | null =
        currentCaseStudy.galleryVideos && currentCaseStudy.galleryVideos.length > 0
            ? currentCaseStudy.galleryVideos[0]
            : currentCaseStudy.videoUrl
            ? {
                  id: 'master-video',
                  title: `${currentCaseStudy.title} — Master Cut`,
                  url: currentCaseStudy.videoUrl,
                  aspect: 'video'
              }
            : null;

    const [activeVideo, setActiveVideo] = useState<ProjectVideoItem | null>(initialVideo);

    const hasGallery = Boolean(
        currentCaseStudy.galleryVideos && currentCaseStudy.galleryVideos.length > 0
    );

    return (
        <motion.main
            key={`case-study-${currentCaseStudy.slug}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
            className="pt-24 sm:pt-28 pb-16 sm:pb-24"
        >
            <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
                {/* Back to Selected Works */}
                <div className="flex items-center justify-between mb-6 sm:mb-10">
                    <button
                        onClick={() => navigateToSection('work')}
                        className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-75 cursor-pointer"
                        style={{ color: theme.text }}
                    >
                        <ArrowLeft className="w-4 h-4" style={{ color: theme.accent }} />
                        <span>Back to Selected Works</span>
                    </button>
                    <span className="font-mono text-xs" style={{ color: theme.textMuted }}>
                        /work/{currentCaseStudy.slug}
                    </span>
                </div>

                {/* Case Study Title & Header */}
                <div className="max-w-4xl mb-7 sm:mb-12">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span
                            className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider"
                            style={{
                                backgroundColor: theme.accentSoft,
                                color: theme.accent
                            }}
                        >
                            {currentCaseStudy.category}
                        </span>
                        <span className="font-mono text-xs" style={{ color: theme.textMuted }}>
                            Case Study No. {currentCaseStudy.index}
                        </span>
                        {currentCaseStudy.galleryVideos && currentCaseStudy.galleryVideos.length > 0 && (
                            <span
                                className="px-3 py-1 rounded-full text-xs font-mono border inline-flex items-center gap-1.5"
                                style={{
                                    backgroundColor: theme.surfaceAlt,
                                    borderColor: theme.border,
                                    color: theme.text
                                }}
                            >
                                <Film className="w-3 h-3" style={{ color: theme.accent }} />
                                <span>
                                    {currentCaseStudy.galleryVideos.length}{' '}
                                    {currentCaseStudy.galleryVideos.length === 1 ? 'Video Work' : 'Video Works'}
                                </span>
                            </span>
                        )}
                        {currentCaseStudy.behanceUrl && (
                            <a
                                href={currentCaseStudy.behanceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 rounded-full text-xs font-mono transition-colors border inline-flex items-center gap-1.5 hover:opacity-85"
                                style={{
                                    backgroundColor: theme.surface,
                                    borderColor: theme.border,
                                    color: theme.text
                                }}
                            >
                                <span>Behance Project</span>
                                <ExternalLink className="w-3 h-3" style={{ color: theme.accent }} />
                            </a>
                        )}
                    </div>

                    <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.06] mb-5">
                        {currentCaseStudy.title}
                    </h1>
                    <p
                        className="text-base sm:text-xl leading-relaxed"
                        style={{ color: theme.textMuted }}
                    >
                        {currentCaseStudy.shortDescription}
                    </p>
                </div>

                {/* Metadata Specification Strip */}
                <div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-8 rounded-2xl border mb-8 sm:mb-12"
                    style={{
                        backgroundColor: theme.surface,
                        borderColor: theme.border
                    }}
                >
                    <div>
                        <span
                            className="font-mono text-[11px] uppercase tracking-wider block mb-1"
                            style={{ color: theme.textMuted }}
                        >
                            Client / Brand
                        </span>
                        <span className="font-display text-sm sm:text-base font-medium">
                            {currentCaseStudy.client}
                        </span>
                    </div>
                    <div>
                        <span
                            className="font-mono text-[11px] uppercase tracking-wider block mb-1"
                            style={{ color: theme.textMuted }}
                        >
                            My Creative Role
                        </span>
                        <span className="font-display text-sm sm:text-base font-medium">
                            {currentCaseStudy.role}
                        </span>
                    </div>
                    <div>
                        <span
                            className="font-mono text-[11px] uppercase tracking-wider block mb-1"
                            style={{ color: theme.textMuted }}
                        >
                            Category
                        </span>
                        <span className="font-display text-sm sm:text-base font-medium">
                            {currentCaseStudy.category}
                        </span>
                    </div>
                    <div>
                        <span
                            className="font-mono text-[11px] uppercase tracking-wider block mb-1"
                            style={{ color: theme.textMuted }}
                        >
                            Production Year
                        </span>
                        <span className="font-display text-sm sm:text-base font-medium">
                            {currentCaseStudy.year}
                        </span>
                    </div>
                </div>

                {/* Project Master Theater Presentation */}
                <div
                    id="case-study-stage"
                    className="rounded-3xl overflow-hidden border mb-16 p-2.5 sm:p-4 scroll-mt-24"
                    style={{
                        backgroundColor: theme.surface,
                        borderColor: theme.border
                    }}
                >
                    {activeVideo && (
                        <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-3 mb-2 border-b" style={{ borderColor: theme.border }}>
                            <div className="flex items-center gap-2.5 min-w-0">
                                <span
                                    className="w-2 h-2 rounded-full shrink-0 animate-pulse"
                                    style={{ backgroundColor: theme.accent }}
                                />
                                <span className="font-display text-xs sm:text-sm font-semibold truncate">
                                    Theater Stage: {activeVideo.title}
                                </span>
                                <span
                                    className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider"
                                    style={{
                                        backgroundColor: theme.surfaceAlt,
                                        color: theme.textMuted
                                    }}
                                >
                                    {getVideoPlatformLabel(activeVideo.url)}
                                </span>
                            </div>

                            <a
                                href={getOriginalVideoSourceUrl(activeVideo.url)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-mono hover:opacity-75 transition-opacity"
                                style={{ color: theme.accent }}
                            >
                                <span>Open Source</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    )}

                    <div className="rounded-2xl overflow-hidden relative bg-black">
                        {activeVideo ? (
                            <UniversalVideoPlayer
                                key={activeVideo.id + activeVideo.url}
                                url={activeVideo.url}
                                title={activeVideo.title}
                                aspect={activeVideo.aspect}
                                width={activeVideo.width}
                                height={activeVideo.height}
                                lazy={false}
                            />
                        ) : currentCaseStudy.coverUrl ? (
                            <div className="relative w-full aspect-video bg-black overflow-hidden">
                                <Image
                                    src={currentCaseStudy.coverUrl}
                                    alt={currentCaseStudy.title}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                {currentCaseStudy.behanceUrl && (
                                    <div className="absolute bottom-5 right-5 z-10">
                                        <a
                                            href={currentCaseStudy.behanceUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 rounded-full text-xs font-mono bg-black/75 hover:bg-black text-white backdrop-blur-sm border border-white/20 inline-flex items-center gap-2 transition-transform active:scale-95"
                                        >
                                            <span>View Original on Behance</span>
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <EditorialVisualFrame
                                theme={theme}
                                index={currentCaseStudy.index}
                                category={currentCaseStudy.category}
                                aspectClass="aspect-video"
                                pattern={currentCaseStudy.pattern}
                                isHovered={true}
                                badgeText="Final Master Video Presentation"
                            />
                        )}
                    </div>

                    {/* Quick Playlist Switcher Ribbon (when project has multiple videos) */}
                    {currentCaseStudy.galleryVideos && currentCaseStudy.galleryVideos.length > 1 && (
                        <div className="mt-3 pt-3 px-1 flex items-center gap-2 overflow-x-auto pb-1">
                            <span
                                className="font-mono text-[10px] uppercase tracking-wider shrink-0 mr-1"
                                style={{ color: theme.textMuted }}
                            >
                                Quick Switch:
                            </span>
                            {currentCaseStudy.galleryVideos.map((vid, idx) => {
                                const isSelected = activeVideo?.url === vid.url;
                                return (
                                    <button
                                        key={vid.id || idx}
                                        onClick={() => setActiveVideo(vid)}
                                        className="px-3 py-1.5 rounded-full text-xs font-mono shrink-0 border transition-all cursor-pointer"
                                        style={{
                                            backgroundColor: isSelected ? theme.accent : theme.surfaceAlt,
                                            borderColor: isSelected ? theme.accent : theme.border,
                                            color: isSelected ? theme.accentText : theme.text
                                        }}
                                    >
                                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1} • {vid.aspect === 'vertical' ? 'Reel' : 'Cut'}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Complete Multi-Video Project Gallery (All Behance Videos) */}
                {hasGallery && currentCaseStudy.galleryVideos && (
                    <ProjectVideoGallery
                        theme={theme}
                        galleryVideos={currentCaseStudy.galleryVideos}
                        projectTitle={currentCaseStudy.title}
                        onSelectStageVideo={(vid) => setActiveVideo(vid)}
                        currentStageVideoUrl={activeVideo?.url}
                    />
                )}

                {/* Editorial Breakdown Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
                    {/* Left Sidebar: Software Used */}
                    <div className="lg:col-span-4 space-y-6">
                        <div
                            className="p-6 sm:p-8 rounded-2xl border"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.border
                            }}
                        >
                            <h2 className="font-display text-lg font-semibold mb-2">
                                Software &amp; Pipeline
                            </h2>
                            <p className="text-xs leading-relaxed mb-5" style={{ color: theme.textMuted }}>
                                Tools utilized across editing, motion design, 3D visualization, and color finishing.
                            </p>
                            <div className="flex flex-wrap gap-2.5">
                                {currentCaseStudy.software.map((sw) => (
                                    <span
                                        key={sw}
                                        className="px-3 py-2 rounded-xl text-xs font-medium border inline-flex items-center gap-2"
                                        style={{
                                            backgroundColor: theme.surfaceAlt,
                                            borderColor: theme.border,
                                            color: theme.text
                                        }}
                                    >
                                        <SoftwareIcon name={sw} code="" className="w-5 h-5 rounded-md shrink-0" />
                                        <span>{sw}</span>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div
                            className="p-6 sm:p-8 rounded-2xl border"
                            style={{
                                backgroundColor: theme.surfaceAlt,
                                borderColor: theme.border
                            }}
                        >
                            <span
                                className="font-mono text-[11px] uppercase tracking-wider block mb-2"
                                style={{ color: theme.accent }}
                            >
                                Editorial Case Study
                            </span>
                            <p className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>
                                All case study works and videos are synchronized with Behance deliverables and
                                centralized in studio configuration data.
                            </p>
                        </div>
                    </div>

                    {/* Right 8 Columns: Narrative & Technical Process Cards */}
                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { num: '01', title: 'Project Overview', body: currentCaseStudy.overview },
                            { num: '02', title: 'Creative Challenge', body: currentCaseStudy.challenge },
                            { num: '03', title: 'Concept & Direction', body: currentCaseStudy.conceptAndDirection },
                            { num: '04', title: 'Editing Workflow', body: currentCaseStudy.editingWorkflow },
                            { num: '05', title: 'Motion Graphics Process', body: currentCaseStudy.motionGraphicsProcess },
                            { num: '06', title: 'Color Grading & Finishing', body: currentCaseStudy.colorGradingAndFinishing }
                        ].map((block) => (
                            <div
                                key={block.num}
                                className="p-6 sm:p-7 rounded-2xl border"
                                style={{
                                    backgroundColor: theme.surface,
                                    borderColor: theme.border
                                }}
                            >
                                <span
                                    className="font-mono text-xs font-medium block mb-2"
                                    style={{ color: theme.accent }}
                                >
                                    {block.num} / PROCESS
                                </span>
                                <h3 className="font-display text-lg font-semibold mb-2">
                                    {block.title}
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                                    {block.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Supporting Visuals Gallery */}
                <div className="mb-20">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <span
                                className="font-mono text-xs uppercase tracking-widest block mb-2"
                                style={{ color: theme.accent }}
                            >
                                Supporting Visuals
                            </span>
                            <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                                Styleframes, Breakdowns &amp; Stills
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {currentCaseStudy.supportingVisuals.map((vis, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl border p-3 transition-all"
                                style={{
                                    backgroundColor: theme.surface,
                                    borderColor: theme.border
                                }}
                            >
                                <div className="rounded-xl overflow-hidden mb-4">
                                    <EditorialVisualFrame
                                        theme={theme}
                                        index={`0${idx + 1}`}
                                        category={vis.title}
                                        aspectClass="aspect-[16/10]"
                                        pattern={idx % 2 === 0 ? 'orbital-rings' : 'kinetic-grid'}
                                        badgeText="Supporting Still"
                                    />
                                </div>
                                <div className="px-2 pb-1">
                                    <h4 className="font-display text-base font-semibold">{vis.title}</h4>
                                    <p className="text-xs mt-1" style={{ color: theme.textMuted }}>
                                        {vis.caption}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Previous / Next Project Navigation */}
                <div
                    className="pt-10 border-t grid grid-cols-1 sm:grid-cols-2 gap-6"
                    style={{ borderColor: theme.border }}
                >
                    {adjacentProjects.prev && (
                        <button
                            onClick={() => adjacentProjects.prev && openCaseStudy(adjacentProjects.prev.slug)}
                            className="p-6 rounded-2xl border text-left group transition-all cursor-pointer"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.border
                            }}
                        >
                            <span
                                className="font-mono text-xs uppercase tracking-wider flex items-center gap-2 mb-2"
                                style={{ color: theme.textMuted }}
                            >
                                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                                Previous Case Study
                            </span>
                            <span className="font-display text-lg sm:text-xl font-semibold block">
                                {adjacentProjects.prev.title}
                            </span>
                        </button>
                    )}

                    {adjacentProjects.next && (
                        <button
                            onClick={() => adjacentProjects.next && openCaseStudy(adjacentProjects.next.slug)}
                            className="p-6 rounded-2xl border text-left sm:text-right group transition-all cursor-pointer"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.border
                            }}
                        >
                            <span
                                className="font-mono text-xs uppercase tracking-wider flex items-center sm:justify-end gap-2 mb-2"
                                style={{ color: theme.textMuted }}
                            >
                                Next Case Study
                                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                            </span>
                            <span className="font-display text-lg sm:text-xl font-semibold block">
                                {adjacentProjects.next.title}
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </motion.main>
    );
}
