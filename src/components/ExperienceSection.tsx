"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { StudioTheme, ExperienceItem } from '@/types';

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
            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
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

                    {/* Right 8 Columns Expandable Cards */}
                    <div className="lg:col-span-8 space-y-4">
                        {experiences.map((exp, idx) => {
                            const isOpen = expandedExpId === exp.id;
                            return (
                                <div
                                    key={exp.id}
                                    className="rounded-2xl border overflow-hidden transition-colors"
                                    style={{
                                        backgroundColor: theme.surface,
                                        borderColor: isOpen ? theme.borderStrong : theme.border
                                    }}
                                >
                                    <button
                                        onClick={() => setExpandedExpId(isOpen ? null : exp.id)}
                                        className="w-full p-6 sm:p-7 text-left flex items-start sm:items-center justify-between gap-4"
                                    >
                                        <div className="flex items-start gap-4">
                                            <span
                                                className="font-mono text-xs pt-1"
                                                style={{ color: theme.accent }}
                                            >
                                                0{idx + 1}
                                            </span>
                                            <div>
                                                <div className="flex flex-wrap items-center gap-2.5 mb-1">
                                                    <h3 className="font-display text-lg sm:text-xl font-semibold">
                                                        {exp.organization}
                                                    </h3>
                                                    {idx === 0 && (
                                                        <span
                                                            className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider"
                                                            style={{
                                                                backgroundColor: theme.accentSoft,
                                                                color: theme.accent
                                                            }}
                                                        >
                                                            Current
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm" style={{ color: theme.textMuted }}>
                                                    {exp.role}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 shrink-0">
                                            <span
                                                className="hidden sm:inline font-mono text-xs"
                                                style={{ color: theme.textMuted }}
                                            >
                                                {exp.period}
                                            </span>
                                            <div
                                                className="w-8 h-8 rounded-full border flex items-center justify-center"
                                                style={{
                                                    borderColor: theme.border,
                                                    color: theme.text
                                                }}
                                            >
                                                {isOpen ? (
                                                    <Minus className="w-3.5 h-3.5" />
                                                ) : (
                                                    <Plus className="w-3.5 h-3.5" />
                                                )}
                                            </div>
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="overflow-hidden"
                                            >
                                                <div
                                                    className="px-6 sm:px-7 pb-7 pt-2 border-t space-y-4 text-sm"
                                                    style={{
                                                        borderColor: theme.border,
                                                        color: theme.textMuted
                                                    }}
                                                >
                                                    <p style={{ color: theme.text }}>{exp.summary}</p>
                                                    <ul className="space-y-2 pl-4 list-disc">
                                                        {exp.responsibilities.map((item, i) => (
                                                            <li key={i}>{item}</li>
                                                        ))}
                                                    </ul>
                                                    <p
                                                        className="text-xs font-mono pt-1"
                                                        style={{ color: theme.accent }}
                                                    >
                                                        {exp.contributions}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

