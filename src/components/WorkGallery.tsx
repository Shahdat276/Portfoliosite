"use client";

import React from 'react';
import { StudioTheme, Project, SiteConfig } from '@/types';
import { WorkOrbitStage } from './WorkOrbitStage';

interface WorkGalleryProps {
    theme: StudioTheme;
    projects: Project[];
    siteConfig: SiteConfig;
    openCaseStudy: (slug: string) => void;
    focusedCategory?: string | null;
    soundEnabled?: boolean;
}

/**
 * Single unified Selected Work showcase featuring the full-page 3D Orbit Stage
 * without redundant duplicate cards underneath.
 */
export function WorkGallery({
    theme,
    projects,
    siteConfig,
    openCaseStudy,
    focusedCategory = null,
    soundEnabled = false
}: WorkGalleryProps) {
    return (
        <section id="work" className="relative overflow-x-clip">
            <WorkOrbitStage
                theme={theme}
                projects={projects}
                siteConfig={siteConfig}
                openCaseStudy={openCaseStudy}
                focusedCategory={focusedCategory}
                soundEnabled={soundEnabled}
            />
        </section>
    );
}
