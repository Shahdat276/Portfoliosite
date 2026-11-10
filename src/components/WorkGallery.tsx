"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StudioTheme, Project, SiteConfig } from '@/types';
import { CategoryFilter } from './CategoryFilter';
import { ProjectCard } from './ProjectCard';
import { WorkOrbitStage } from './WorkOrbitStage';
import { ArchitecturalGuides, KineticReveal } from './MotionPrimitives';

interface WorkGalleryProps {
    theme: StudioTheme;
    projects: Project[];
    siteConfig: SiteConfig;
    selectedCategory: string;
    setSelectedCategory: (cat: string) => void;
    hoveredProjectSlug: string | null;
    setHoveredProjectSlug: (slug: string | null) => void;
    openCaseStudy: (slug: string) => void;
    soundEnabled?: boolean;
}

export function WorkGallery({
    theme,
    projects,
    siteConfig,
    selectedCategory,
    setSelectedCategory,
    hoveredProjectSlug,
    setHoveredProjectSlug,
    openCaseStudy,
    soundEnabled = false
}: WorkGalleryProps) {
    const filteredProjects =
        selectedCategory === 'All'
            ? projects
            : projects.filter((p) => p.category === selectedCategory);

    const totalCuratedVideos = projects.reduce(
        (s, p) => s + (p.galleryVideos?.length || 0),
        0
    );

    return (
        <section id="work" className="relative overflow-x-clip">
            {/* 1. Interactive 3D Selected Work Orbit Stage (Matching CodeofSagar WorkOrbit) */}
            <WorkOrbitStage
                theme={theme}
                projects={projects}
                siteConfig={siteConfig}
                openCaseStudy={openCaseStudy}
                soundEnabled={soundEnabled}
            />

            {/* 2. Complete Filterable Archive Grid */}
            <div
                className="relative py-14 sm:py-20 md:py-24 lg:py-28 border-b"
                style={{ borderColor: theme.border }}
            >
                <ArchitecturalGuides borderColor={theme.border} columns={5} />

                <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
                    <KineticReveal>
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 gap-3 sm:gap-6">
                            <div>
                                <span
                                    className="font-mono text-xs uppercase tracking-[0.22em] block mb-2"
                                    style={{ color: theme.accent }}
                                >
                                    Archive Index • 2026
                                </span>
                                <h3 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight">
                                    All Collections by{' '}
                                    <span className="font-serif-italic font-normal">Discipline.</span>
                                </h3>
                            </div>
                            <p
                                className="text-sm sm:text-base max-w-md md:text-right"
                                style={{ color: theme.textMuted }}
                            >
                                {totalCuratedVideos}+ curated video works across commercials, fashion films,
                                motion systems, and 3D VFX. Filter by discipline or open any case study.
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
            </div>
        </section>
    );
}
