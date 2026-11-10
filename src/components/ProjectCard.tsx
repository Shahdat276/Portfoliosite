"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { StudioTheme, Project } from '@/types';
import { EditorialVisualFrame } from './EditorialVisualFrame';

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

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35 }}
            onClick={() => openCaseStudy(project.slug)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`${
                selectedCategory === 'All' ? project.gridSpan : 'lg:col-span-6'
            } group cursor-pointer rounded-3xl border p-3.5 sm:p-5 transition-all duration-300 hover:shadow-md flex flex-col justify-between`}
            style={{
                backgroundColor: theme.surface,
                borderColor: isHovered ? theme.borderStrong : theme.border
            }}
        >
            {/* Crisp Framed Thumbnail */}
            <div className={`rounded-2xl overflow-hidden mb-5 relative bg-black ${aspectClass}`}>
                {project.coverUrl ? (
                    <>
                        <Image
                            src={project.coverUrl}
                            alt={project.title}
                            fill
                            unoptimized
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm border border-white/10">
                                No. {project.index} — {project.category}
                            </span>
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                Case Study
                            </span>
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

            {/* Clean Typography Below Visual */}
            <div className="px-1">
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
                    <span
                        className="text-xs font-mono shrink-0 hidden sm:inline-flex items-center gap-1"
                        style={{ color: theme.textMuted }}
                    >
                        Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                </div>

                <p
                    className="text-sm mt-2 line-clamp-2 leading-relaxed"
                    style={{ color: theme.textMuted }}
                >
                    {project.shortDescription}
                </p>
            </div>
        </motion.article>
    );
}
