"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StudioTheme, Project } from '@/types';
import { CategoryFilter } from './CategoryFilter';
import { ProjectCard } from './ProjectCard';
import {
    ArchitecturalGuides,
    KineticReveal,
    SkewMaskReveal
} from './MotionPrimitives';

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
    const filteredProjects =
        selectedCategory === 'All'
            ? projects
            : projects.filter((p) => p.category === selectedCategory);

    return (
        <section
            id="work"
            className="relative py-14 sm:py-20 md:py-24 lg:py-28 border-b overflow-x-clip"
            style={{ borderColor: theme.border }}
        >
            <ArchitecturalGuides borderColor={theme.border} columns={5} />

            <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
                <KineticReveal>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-5 sm:gap-8">
                        <div>
                            <span
                                className="font-mono text-xs uppercase tracking-[0.22em] block mb-3"
                                style={{ color: theme.accent }}
                            >
                                01 / Selected Works
                            </span>
                            <div className="relative inline-block">
                                <SkewMaskReveal>
                                    <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-[104px] font-semibold uppercase leading-[0.86] tracking-[-0.045em]">
                                        Selected{' '}
                                        <span className="font-serif-italic font-normal lowercase">
                                            Work
                                        </span>
                                    </h2>
                                </SkewMaskReveal>
                                <span
                                    className="font-mono text-xs sm:text-sm font-semibold ml-2 sm:ml-4 align-top"
                                    style={{ color: theme.accent }}
                                >
                                    2026
                                </span>
                            </div>
                        </div>
                        <p
                            className="text-sm sm:text-base max-w-md lg:text-right"
                            style={{ color: theme.textMuted }}
                        >
                            {projects.reduce((s, p) => s + (p.galleryVideos?.length || 0), 0)}+ curated video
                            works organized by discipline. Select any collection below to watch every cut, film, and
                            reel inside.
                        </p>
                    </div>
                </KineticReveal>

                    {/* Extracted Category Filter Bar */}
                    <CategoryFilter
                        theme={theme}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        projects={projects}
                    />

                    {/* Asymmetrical Bento/Editorial Project Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <ProjectCard
                                    key={project.slug}
                                    project={project}
                                    theme={theme}
                                    selectedCategory={selectedCategory}
                                    isHovered={hoveredProjectSlug === project.slug}
                                    onMouseEnter={() => setHoveredProjectSlug(project.slug)}
                                    onMouseLeave={() => setHoveredProjectSlug(null)}
                                    openCaseStudy={openCaseStudy}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
        </section>
    );
}
