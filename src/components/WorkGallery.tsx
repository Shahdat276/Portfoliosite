"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StudioTheme, Project } from '@/types';
import { CategoryFilter } from './CategoryFilter';
import { ProjectCard } from './ProjectCard';

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
            className="py-12 sm:py-16 md:py-24 lg:py-28 border-b"
            style={{ borderColor: theme.border }}
        >
                <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 gap-3 sm:gap-6">
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
                            {projects.reduce((s, p) => s + (p.galleryVideos?.length || 0), 0)}+ curated video
                            works organized by discipline. Select any collection below to watch every cut, film, and
                            reel inside.
                        </p>
                    </div>

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
