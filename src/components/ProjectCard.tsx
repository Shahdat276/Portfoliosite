"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import { StudioTheme, Project } from '@/types';
import { EditorialVisualFrame } from './EditorialVisualFrame';
import { SoftwareIcon } from './SoftwareIcon';
import { MOTION_EASE, ParallaxImageWindow } from './MotionPrimitives';

interface ProjectCardProps {
    project: Project;
    theme: StudioTheme;
    selectedCategory: string;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    openCaseStudy: (slug: string) => void;
}

export function ProjectCard({
    project,
    theme,
    selectedCategory,
    isHovered,
    onMouseEnter,
    onMouseLeave,
    openCaseStudy
}: ProjectCardProps) {
    const aspectClass =
        selectedCategory === 'All'
            ? project.aspectClass
            : 'aspect-[16/10]';

    const videoCount = project.galleryVideos ? project.galleryVideos.length : 0;

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.52, ease: MOTION_EASE }}
            onClick={() => openCaseStudy(project.slug)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`${
                selectedCategory === 'All' ? project.gridSpan : 'lg:col-span-6'
            } group cursor-pointer rounded-2xl sm:rounded-3xl border p-3 sm:p-5 transition-all duration-300 hover:shadow-md flex flex-col justify-between`}
            style={{
                backgroundColor: theme.surface,
                borderColor: isHovered ? theme.borderStrong : theme.border
            }}
        >
            {/* Crisp Framed Thumbnail with Inner Scroll Parallax */}
            <div className={`rounded-xl sm:rounded-2xl overflow-hidden mb-3.5 sm:mb-5 relative bg-black ${aspectClass}`}>
                {project.coverUrl ? (
                    <>
                        <ParallaxImageWindow travel={14} baseScale={1.12}>
                            <Image
                                src={project.coverUrl}
                                alt={project.title}
                                fill
                                unoptimized
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </ParallaxImageWindow>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-65 group-hover:opacity-45 transition-opacity" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-black/65 text-white backdrop-blur-sm border border-white/15">
                                No. {project.index} — {project.category}
                            </span>
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-black/70 text-white backdrop-blur-sm border border-white/15">
                                {videoCount > 0
                                    ? `${videoCount} ${videoCount === 1 ? 'Video' : 'Videos'}`
                                    : 'Case Study'}
                            </span>
                        </div>

                        {/* Centered Hover Play Affordance */}
                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                            <div
                                className="px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2 shadow-2xl border border-white/25"
                                style={{
                                    backgroundColor: theme.accent,
                                    color: theme.accentText
                                }}
                            >
                                <Play className="w-3.5 h-3.5 fill-current" />
                                <span className="text-xs font-mono font-semibold uppercase tracking-wider">
                                    Watch {videoCount > 0 ? `${videoCount} Works` : 'Case Study'}
                                </span>
                            </div>
                        </div>
                    </>
                ) : (
                    <EditorialVisualFrame
                        theme={theme}
                        index={project.index}
                        category={project.category}
                        aspectClass={aspectClass}
                        pattern={project.pattern}
                        isHovered={isHovered}
                        badgeText="Open Case Study"
                    />
                )}
            </div>

            {/* Clean Typography & Pipeline Tools Below Visual */}
            <div className="px-1 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 text-xs">
                            <span
                                className="font-mono uppercase tracking-wider font-medium"
                                style={{ color: theme.accent }}
                            >
                                {project.category}
                            </span>
                            <span style={{ color: theme.borderStrong }}>•</span>
                            <span style={{ color: theme.textMuted }}>{project.role}</span>
                        </div>
                        <span
                            className="font-mono text-xs"
                            style={{ color: theme.textMuted }}
                        >
                            {project.year}
                        </span>
                    </div>

                    <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-display text-xl sm:text-2xl font-semibold group-hover:underline">
                            {project.title}
                        </h3>
                    </div>

                    <p
                        className="text-sm mt-2 line-clamp-2 leading-relaxed"
                        style={{ color: theme.textMuted }}
                    >
                        {project.shortDescription}
                    </p>
                </div>

                {/* Bottom Pipeline Icons & Watch Action */}
                <div
                    className="mt-4 pt-3.5 border-t flex items-center justify-between gap-3"
                    style={{ borderColor: theme.border }}
                >
                    <div className="flex items-center gap-1.5">
                        {project.software.slice(0, 4).map((sw) => (
                            <span key={sw} title={sw}>
                                <SoftwareIcon
                                    name={sw}
                                    code=""
                                    className="w-5 h-5 rounded-md shadow-xs transition-transform group-hover:scale-105"
                                />
                            </span>
                        ))}
                    </div>

                    <span
                        className="text-xs font-mono font-medium inline-flex items-center gap-1 transition-colors"
                        style={{ color: isHovered ? theme.accent : theme.text }}
                    >
                        <span>
                            {videoCount > 0 ? `View ${videoCount} ${videoCount === 1 ? 'Video' : 'Videos'}` : 'Open Case Study'}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                </div>
            </div>
        </motion.article>
    );
}
