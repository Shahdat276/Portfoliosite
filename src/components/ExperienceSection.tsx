"use client";

import React, { useState } from 'react';
import { StudioTheme, ExperienceItem } from '@/types';
import { ExperienceCard } from './ExperienceCard';

interface ExperienceSectionProps {
    theme: StudioTheme;
    experiences: ExperienceItem[];
}

export function ExperienceSection({ theme, experiences }: ExperienceSectionProps) {
    const [expandedExpId, setExpandedExpId] = useState<string | null>('exp-1');

    return (
        <section
            id="experience"
            className="py-24 md:py-32 border-b"
            style={{ borderColor: theme.border }}
        >
                <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left 4 Columns Heading */}
                        <div className="lg:col-span-4">
                            <span
                                className="font-mono text-xs uppercase tracking-[0.2em] block mb-2"
                                style={{ color: theme.accent }}
                            >
                                06 / Career Timeline
                            </span>
                            <h2 className="font-display text-3xl sm:text-5xl font-semibold leading-[1.08] mb-4">
                                Experience That Shapes{' '}
                                <span className="font-serif-italic font-normal">Creativity.</span>
                            </h2>
                            <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                                9+ years of professional experience across commercial production, fashion films,
                                and multimedia organizations.
                            </p>
                        </div>

                        {/* Right 8 Columns Extracted Expandable Cards */}
                        <div className="lg:col-span-8 space-y-4">
                            {experiences.map((exp, idx) => (
                                <ExperienceCard
                                    key={exp.id}
                                    exp={exp}
                                    idx={idx}
                                    isOpen={expandedExpId === exp.id}
                                    onToggle={() => setExpandedExpId(expandedExpId === exp.id ? null : exp.id)}
                                    theme={theme}
                                />
                            ))}
                        </div>
                    </div>
                </div>
        </section>
    );
}
