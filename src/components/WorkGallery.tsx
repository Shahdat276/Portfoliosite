"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { StudioTheme, Project, SiteConfig } from '@/types';
import { PROJECT_CATEGORIES } from '@/data/siteConfig';
import { ProjectCard } from './ProjectCard';
import { WorkOrbitStage } from './WorkOrbitStage';
import {
    ArchitecturalGuides,
    SkewMaskReveal,
    playStudioTick
} from './MotionPrimitives';

interface WorkGalleryProps {
    theme: StudioTheme;
    projects: Project[];
    siteConfig: SiteConfig;
    selectedCategory: string;
    setSelectedCategory: (cat: string) => void;
    hoveredProjectSlug: string | null;
    setHoveredProjectSlug: (slug: string | null) => void;
    openCaseStudy: (slug: string) => void;
    openShowreelTheaterModal?: () => void;
    soundEnabled?: boolean;
}

/**
 * Combines the interactive 3D WorkOrbit stage with CodeofSagar's staggered
 * 2-column full-bleed showcase gallery.
 */
export function WorkGallery({
    theme,
    projects,
    siteConfig,
    selectedCategory,
    setSelectedCategory,
    hoveredProjectSlug,
    setHoveredProjectSlug,
    openCaseStudy,
    openShowreelTheaterModal,
    soundEnabled = false
}: WorkGalleryProps) {
    const filteredProjects =
        selectedCategory === 'All'
            ? projects
            : projects.filter((p) => p.category === selectedCategory);

    // Split into Column 1 (even index) & staggered Column 2 (odd index) matching WorkSection
    const leftColumnProjects = filteredProjects.filter((_, idx) => idx % 2 === 0);
    const rightColumnProjects = filteredProjects.filter((_, idx) => idx % 2 === 1);

    return (
        <section id="work" className="relative overflow-x-clip">
            {/* 1. Interactive 3D Selected Work Orbit Stage */}
            <WorkOrbitStage
                theme={theme}
                projects={projects}
                siteConfig={siteConfig}
                openCaseStudy={openCaseStudy}
                soundEnabled={soundEnabled}
            />

            {/* 2. Staggered 2-Column Editorial Case Study Showcase */}
            <div
                className="relative py-20 sm:py-28 lg:py-36 border-b"
                style={{
                    backgroundColor: theme.bg,
                    borderColor: theme.border
                }}
            >
                <ArchitecturalGuides borderColor={theme.border} columns={5} />

                <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
                    {/* Minimal Filter Bar + Archive Header */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 sm:mb-20">
                        <div>
                            <span
                                className="font-mono text-xs uppercase tracking-[0.22em] block mb-2"
                                style={{ color: theme.accent }}
                            >
                                Case Studies • Archive
                            </span>
                            <SkewMaskReveal>
                                <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em]">
                                    Every Project, Start to{' '}
                                    <span className="font-serif-italic font-normal">Master.</span>
                                </h3>
                            </SkewMaskReveal>
                        </div>

                        {/* Minimalist Text Discipline Filters */}
                        <div className="flex flex-wrap gap-x-5 gap-y-2.5 font-mono text-xs uppercase tracking-wider">
                            {PROJECT_CATEGORIES.map((cat) => {
                                const isActive = selectedCategory === cat;
                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => {
                                            playStudioTick(soundEnabled, 640);
                                            setSelectedCategory(cat);
                                        }}
                                        className="pb-1 border-b transition-colors cursor-pointer"
                                        style={{
                                            borderColor: isActive ? theme.accent : 'transparent',
                                            color: isActive ? theme.text : theme.textMuted
                                        }}
                                    >
                                        {cat === 'All'
                                            ? 'All (8)'
                                            : cat.replace('Commercial Advertisements', 'Commercial')
                                                  .replace('Animation & Visual Effects', '3D & 2D')
                                                  .replace('Social Media Reels', 'Reels')}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Staggered Two-Column Layout (Matching CodeofSagar WorkSection col-2 offset) */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 gap-14 sm:gap-16 lg:gap-20 xl:gap-28 items-start"
                    >
                        <div className="flex flex-col gap-16 sm:gap-24 lg:gap-32">
                            <AnimatePresence mode="popLayout">
                                {leftColumnProjects.map((project) => (
                                    <ProjectCard
                                        key={project.slug}
                                        project={project}
                                        theme={theme}
                                        alignRight={false}
                                        isHovered={hoveredProjectSlug === project.slug}
                                        onMouseEnter={() => setHoveredProjectSlug(project.slug)}
                                        onMouseLeave={() => setHoveredProjectSlug(null)}
                                        openCaseStudy={openCaseStudy}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="flex flex-col gap-16 sm:gap-24 lg:gap-32 md:mt-28 lg:mt-40">
                            <AnimatePresence mode="popLayout">
                                {rightColumnProjects.map((project) => (
                                    <ProjectCard
                                        key={project.slug}
                                        project={project}
                                        theme={theme}
                                        alignRight={true}
                                        isHovered={hoveredProjectSlug === project.slug}
                                        onMouseEnter={() => setHoveredProjectSlug(project.slug)}
                                        onMouseLeave={() => setHoveredProjectSlug(null)}
                                        openCaseStudy={openCaseStudy}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Oversized Centered Interactive Sweep Link matching WorkSection__moreLink */}
                    {openShowreelTheaterModal && (
                        <div className="mt-20 sm:mt-28 lg:mt-36 text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    playStudioTick(soundEnabled, 820);
                                    openShowreelTheaterModal();
                                }}
                                className="group inline-flex items-baseline gap-3 sm:gap-5 font-display text-3xl sm:text-5xl lg:text-7xl font-medium tracking-[-0.045em] pb-2 border-b-2 transition-all cursor-pointer"
                                style={{
                                    borderColor: theme.accent,
                                    color: theme.text
                                }}
                            >
                                <span>Watch Master Showreel</span>
                                <ArrowUpRight
                                    className="w-7 h-7 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5"
                                    style={{ color: theme.accent }}
                                />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
