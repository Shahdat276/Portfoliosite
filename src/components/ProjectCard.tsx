"use client";

import React from 'react';
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
            <div className="rounded-2xl overflow-hidden mb-5">
                <EditorialVisualFrame
                    theme={theme}
                    index={project.index}
                    category={project.category}
                    aspectClass={
                        selectedCategory === 'All'
                            ? project.aspectClass
                            : 'aspect-[16/10]'
                    }
                    pattern={project.pattern}
                    isHovered={isHovered}
                    badgeText="Open Case Study"
                />
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

