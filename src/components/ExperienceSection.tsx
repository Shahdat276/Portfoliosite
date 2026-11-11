"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { StudioTheme, ExperienceItem } from '@/types';
import { ExperienceCard } from './ExperienceCard';
import { KineticReveal } from './MotionPrimitives';

interface ExperienceSectionProps {
    theme: StudioTheme;
    experiences: ExperienceItem[];
}

export function ExperienceSection({ theme, experiences }: ExperienceSectionProps) {
    const [expandedExpId, setExpandedExpId] = useState<string | null>('exp-1');

    return (
        <section
            id="experience"
            className="py-10 sm:py-14 lg:py-16 border-b"
            style={{ borderColor: theme.border }}
        >
            <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-12 items-start">
                    {/* Left 4 Columns Sticky Summary + Employer Logos */}
                    <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4 sm:space-y-6">
                        <KineticReveal>
                        <div>
                            <span
                                className="font-mono text-xs uppercase tracking-[0.2em] block mb-2"
                                style={{ color: theme.accent }}
                            >
                                05 / Career Timeline
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
                        </KineticReveal>

                        {/* Interactive Company Emblem Wall */}
                        <div
                            className="p-4 sm:p-5 rounded-2xl border"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.border
                            }}
                        >
                            <div className="flex items-center justify-between mb-3.5">
                                <span
                                    className="font-mono text-[10px] uppercase tracking-wider"
                                    style={{ color: theme.textMuted }}
                                >
                                    Organizations &amp; Brands ({experiences.length})
                                </span>
                                <span className="font-mono text-[10px]" style={{ color: theme.accent }}>
                                    2017 — Present
                                </span>
                            </div>

                            <div className="grid grid-cols-5 lg:grid-cols-3 gap-2.5">
                                {experiences.map((exp) => {
                                    const isSelected = expandedExpId === exp.id;
                                    if (!exp.logoUrl) return null;
                                    return (
                                        <button
                                            key={exp.id}
                                            onClick={() => setExpandedExpId(exp.id)}
                                            title={`${exp.organization} (${exp.period})`}
                                            className={`aspect-square rounded-xl border relative overflow-hidden transition-all cursor-pointer ${
                                                exp.logoDarkBg ? 'bg-[#1B1B1D]' : 'bg-white'
                                            }`}
                                            style={{
                                                borderColor: isSelected ? theme.accent : theme.border,
                                                boxShadow: isSelected ? `0 0 0 2px ${theme.accentSoft}` : undefined
                                            }}
                                        >
                                            <Image
                                                src={exp.logoUrl}
                                                alt={exp.organization}
                                                fill
                                                unoptimized
                                                className={
                                                    exp.logoDarkBg
                                                        ? 'object-cover'
                                                        : 'object-contain p-2'
                                                }
                                            />
                                        </button>
                                    );
                                })}
                            </div>

                            <p className="text-[11px] font-mono mt-3" style={{ color: theme.textMuted }}>
                                Click any company emblem to inspect responsibilities &amp; key milestones.
                            </p>
                        </div>
                    </div>

                    {/* Right 8 Columns Extracted Expandable Cards */}
                    <div className="lg:col-span-8 space-y-3 sm:space-y-4">
                        <KineticReveal delay={0.06} className="space-y-3 sm:space-y-4">
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
                        </KineticReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
