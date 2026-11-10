"use client";

import React, { useState } from 'react';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { StudioTheme } from '@/types';
import { CORE_CAPABILITIES } from '@/data/skills';
import {
    ArchitecturalGuides,
    SkewMaskReveal,
    RollText,
    playStudioTick
} from './MotionPrimitives';

interface ServicesIntroSectionProps {
    theme: StudioTheme;
    onSelectWorkCategory: (category: string) => void;
    soundEnabled?: boolean;
}

const FEATURED_DISCIPLINES = [
    {
        title: 'Commercials',
        desc: 'high-retention brand spots & TVCs',
        category: 'Commercial Advertisements'
    },
    {
        title: 'Motion & VFX',
        desc: '2D / 3D graphics built in After Effects & C4D',
        category: 'Motion Graphics'
    },
    {
        title: 'Fashion Films',
        desc: 'rhythmic luxury edits & cinema grading',
        category: 'Fashion Films'
    },
    {
        title: 'Social Reels',
        desc: 'scroll-stopping 9:16 short-form stories',
        category: 'Social Media Reels'
    }
];

/**
 * Architectural pinned-style Creative Capabilities showcase inspired by CodeofSagar ServicesIntro.
 */
export function ServicesIntroSection({
    theme,
    onSelectWorkCategory,
    soundEnabled = false
}: ServicesIntroSectionProps) {
    const [showAllCapabilities, setShowAllCapabilities] = useState(false);

    return (
        <section
            id="services"
            className="relative py-20 sm:py-28 lg:py-36 border-b overflow-hidden"
            style={{
                backgroundColor: theme.bg,
                borderColor: theme.border
            }}
        >
            <ArchitecturalGuides borderColor={theme.border} columns={5} />

            <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
                {/* Top-Left Blurb matching ServicesIntro__why */}
                <div className="max-w-md mb-14 sm:mb-20">
                    <span
                        className="font-mono text-xs uppercase tracking-[0.22em] block mb-3"
                        style={{ color: theme.accent }}
                    >
                        Capabilities &amp; Craft
                    </span>
                    <p className="text-base sm:text-lg font-medium leading-relaxed">
                        Nine years uniting rhythmic editorial cuts, bespoke 2D/3D motion systems, and
                        DaVinci cinema color—engineered to hold attention across every screen.
                    </p>
                </div>

                {/* Massive Centered Statement matching ServicesIntro__title */}
                <div className="text-center my-10 sm:my-16">
                    <SkewMaskReveal>
                        <h2 className="font-display text-5xl sm:text-8xl lg:text-[116px] xl:text-[138px] font-medium leading-[0.92] tracking-[-0.05em]">
                            Creative{' '}
                            <span className="font-serif-italic font-normal">Director</span>
                            <span
                                className="inline-block w-[0.15em] h-[0.15em] rounded-full ml-1 align-baseline"
                                style={{ backgroundColor: theme.accent }}
                            />
                        </h2>
                    </SkewMaskReveal>
                </div>

                {/* Bottom-Right Interactive Capabilities List matching ServicesIntro__what */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mt-14 sm:mt-20">
                    {/* Left Trigger to Expand All 12 Core Services */}
                    <div>
                        <button
                            type="button"
                            onClick={() => {
                                playStudioTick(soundEnabled, 660);
                                setShowAllCapabilities((prev) => !prev);
                            }}
                            className="group inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] pb-1 cos-link-underline cursor-pointer"
                            style={{ color: theme.text }}
                        >
                            {showAllCapabilities ? (
                                <Minus className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                            ) : (
                                <Plus className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                            )}
                            <RollText
                                text={
                                    showAllCapabilities
                                        ? 'Hide All 12 Services'
                                        : 'Inspect All 12 Capabilities'
                                }
                            />
                        </button>
                    </div>

                    {/* Right-Aligned Interactive List */}
                    <ol className="space-y-4 sm:space-y-5 w-full max-w-xl">
                        {FEATURED_DISCIPLINES.map((item) => (
                            <li
                                key={item.title}
                                className="border-b pb-3.5"
                                style={{ borderColor: theme.border }}
                            >
                                <button
                                    type="button"
                                    onClick={() => {
                                        playStudioTick(soundEnabled, 740);
                                        onSelectWorkCategory(item.category);
                                    }}
                                    className="w-full flex items-baseline justify-between gap-4 text-left group cursor-pointer"
                                >
                                    <span className="font-display text-2xl sm:text-3xl font-medium tracking-tight group-hover:translate-x-1 transition-transform">
                                        <RollText text={item.title} />
                                    </span>
                                    <span className="flex items-center gap-2 font-mono text-xs text-right" style={{ color: theme.textMuted }}>
                                        <span className="hidden sm:inline">{item.desc}</span>
                                        <ArrowUpRight
                                            className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            style={{ color: theme.accent }}
                                        />
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Expandable Full 12-Service Architectural Drawer */}
                <div
                    className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                        gridTemplateRows: showAllCapabilities ? '1fr' : '0fr'
                    }}
                >
                    <div className="overflow-hidden">
                        <div className="pt-12 mt-10 border-t grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ borderColor: theme.border }}>
                            {CORE_CAPABILITIES.map((cap) => (
                                <button
                                    key={cap.num}
                                    type="button"
                                    onClick={() => {
                                        if (cap.relatedCategory) {
                                            onSelectWorkCategory(cap.relatedCategory);
                                        }
                                    }}
                                    className="p-5 rounded-2xl border text-left group transition-all hover:-translate-y-0.5 cursor-pointer"
                                    style={{
                                        backgroundColor: theme.surface,
                                        borderColor: theme.border
                                    }}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-mono text-xs" style={{ color: theme.accent }}>
                                            {cap.num} / {cap.group}
                                        </span>
                                        <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                                    </div>
                                    <h3 className="font-display text-lg font-semibold mb-1.5">
                                        {cap.title}
                                    </h3>
                                    <p className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>
                                        {cap.desc}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Geographic Footer Strip matching ServicesIntro__where */}
                <div
                    className="mt-16 pt-6 border-t flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.14em]"
                    style={{ borderColor: theme.border, color: theme.textMuted }}
                >
                    <span>Independent &amp; Senior Lead</span>
                    <span>Based in Dhaka, Bangladesh</span>
                    <span>1000+ Works Worldwide</span>
                </div>
            </div>
        </section>
    );
}
