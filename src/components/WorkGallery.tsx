"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { StudioTheme, Project } from '@/types';
import { PROJECT_CATEGORIES } from '@/data/siteConfig';
import { EditorialVisualFrame } from './EditorialVisualFrame';

interface WorkGalleryProps {
    theme: StudioTheme;
    projects: Project[];
    selectedCategory: string;
    setSelectedCategory: (cat: string) => void;
    hoveredProjectSlug: string | null;
    setHoveredProjectSlug: (slug: string | null) => void;
    openCaseStudy: (slug: string) => void;
}

export function WorkGallery({
    theme,
    projects,
    selectedCategory,
    setSelectedCategory,
    hoveredProjectSlug,
    setHoveredProjectSlug,
    openCaseStudy
}: WorkGalleryProps) {
    const filteredProjects = selectedCategory === 'All'
        ? projects
        : projects.filter((p) => p.category === selectedCategory);

    return (
        <section
            id="work"
            className="py-24 md:py-32 border-b"
            style={{ borderColor: theme.border }}
        >
            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <div>
                        <span
                            className="font-mono text-xs uppercase tracking-[0.2em] block mb-2"
                            style={{ color: theme.accent }}
                        >
                            02 / Selected Works
                        </span>
                        <h2 className="font-display text-3xl sm:text-5xl font-semibold">
                            Curated Visual{' '}
                            <span className="font-serif-italic font-normal">Archive.</span>
                        </h2>
                    </div>
                    <p
                        className="text-sm sm:text-base max-w-md"
                        style={{ color: theme.textMuted }}
                    >
                        Exploring visual storytelling through editing, motion, and creative execution.
                        Click any work to inspect the full case study.
                    </p>
                </div>

                {/* Category Filter Bar */}
                <div
                    className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-12 border-b"
                    style={{ borderColor: theme.border }}
                >
                    {PROJECT_CATEGORIES.map((category) => {
                        const isActive = selectedCategory === category;
                        return (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className="px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all border"
                                style={{
                                    backgroundColor: isActive ? theme.text : theme.surface,
                                    borderColor: isActive ? theme.text : theme.border,
                                    color: isActive ? theme.bg : theme.textMuted
                                }}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>

                {/* Asymmetrical Bento/Editorial Project Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => {
                            const isHovered = hoveredProjectSlug === project.slug;
                            return (
                                <motion.article
                                    layout
                                    key={project.slug}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    transition={{ duration: 0.35 }}
                                    onClick={() => openCaseStudy(project.slug)}
                                    onMouseEnter={() => setHoveredProjectSlug(project.slug)}
                                    onMouseLeave={() => setHoveredProjectSlug(null)}
                                    className={`${selectedCategory === 'All' ? project.gridSpan : 'lg:col-span-6'
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
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
