"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { StudioTheme, Project } from '@/types';
import { EditorialVisualFrame } from './EditorialVisualFrame';
import {
    ParallaxImageWindow,
    RollText,
    STUDIO_EASE
} from './MotionPrimitives';

interface ProjectCardProps {
    project: Project;
    theme: StudioTheme;
    alignRight?: boolean;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    openCaseStudy: (slug: string) => void;
}

/**
 * Pure CodeofSagar-inspired borderless editorial work tile:
 * RollText title above, 3:2 inner-parallax visual frame, mono metadata below.
 */
export function ProjectCard({
    project,
    theme,
    alignRight = false,
    isHovered,
    onMouseEnter,
    onMouseLeave,
    openCaseStudy
}: ProjectCardProps) {
    const videoCount = project.galleryVideos ? project.galleryVideos.length : 0;

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.06 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.65, ease: STUDIO_EASE }}
            onClick={() => openCaseStudy(project.slug)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="group cursor-pointer flex flex-col"
        >
            {/* Title Line (Right-aligned on desktop Col 2 matching CodeofSagar WorkSection) */}
            <h3
                className={`font-display text-2xl sm:text-3xl lg:text-4xl font-normal tracking-[-0.035em] leading-[1.1] mb-3.5 sm:mb-5 ${
                    alignRight ? 'md:text-right' : ''
                }`}
                style={{ color: isHovered ? theme.accent : theme.text }}
            >
                <RollText text={project.title} />
            </h3>

            {/* 3:2 Sharp Architectural Media Canvas with Inner Scroll Parallax */}
            <div className="aspect-[3/2] w-full relative overflow-hidden bg-black">
                {project.coverUrl ? (
                    <>
                        <ParallaxImageWindow travel={18} baseScale={1.14}>
                            <Image
                                src={project.coverUrl}
                                alt={project.title}
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                        </ParallaxImageWindow>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-25 transition-opacity duration-500" />
                    </>
                ) : (
                    <EditorialVisualFrame
                        theme={theme}
                        index={project.index}
                        category={project.category}
                        aspectClass="aspect-[3/2]"
                        pattern={project.pattern}
                        isHovered={isHovered}
                        badgeText="Open Case Study"
                    />
                )}

                {/* Centered Hover Play Affordance */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                    <div
                        className="px-5 py-2.5 rounded-full backdrop-blur-md flex items-center gap-2 shadow-2xl border border-white/25"
                        style={{
                            backgroundColor: theme.accent,
                            color: theme.accentText
                        }}
                    >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs font-mono font-semibold uppercase tracking-wider">
                            {videoCount > 0 ? `Watch ${videoCount} Works` : 'Open Study'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Clean Monospace Bottom Metadata Row */}
            <div
                className="mt-3.5 sm:mt-4 flex items-center justify-between gap-3 font-mono text-xs sm:text-sm uppercase tracking-[0.05em]"
                style={{ color: theme.textMuted }}
            >
                <span className="truncate">
                    {project.index} / {project.category}
                </span>
                <span className="shrink-0 flex items-center gap-2" style={{ color: theme.text }}>
                    <span>
                        {videoCount > 0 ? `${videoCount} Videos` : 'Case Study'}
                    </span>
                    <span style={{ color: theme.accent }}>•</span>
                    <span>{project.year}</span>
                </span>
            </div>
        </motion.article>
    );
}
