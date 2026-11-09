"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MapPin, Check } from 'lucide-react';
import { StudioTheme, ExperienceItem } from '@/types';

interface ExperienceCardProps {
    exp: ExperienceItem;
    idx: number;
    isOpen: boolean;
    onToggle: () => void;
    theme: StudioTheme;
}

export function ExperienceCard({
    exp,
    idx,
    isOpen,
    onToggle,
    theme
}: ExperienceCardProps) {
    return (
        <div
            className="rounded-2xl border overflow-hidden transition-colors"
            style={{
                backgroundColor: theme.surface,
                borderColor: isOpen ? theme.borderStrong : theme.border
            }}
        >
            <button
                onClick={onToggle}
                className="w-full p-6 sm:p-7 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer"
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
                        <p className="text-sm font-medium" style={{ color: theme.textMuted }}>
                            {exp.role}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right hidden sm:block">
                        <span className="font-mono text-xs block" style={{ color: theme.text }}>
                            {exp.period}
                        </span>
                        <span className="text-xs flex items-center justify-end gap-1" style={{ color: theme.textMuted }}>
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                        </span>
                    </div>
                    <div
                        className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors"
                        style={{
                            borderColor: theme.border,
                            backgroundColor: isOpen ? theme.text : 'transparent',
                            color: isOpen ? theme.bg : theme.text
                        }}
                    >
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
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
                        className="border-t overflow-hidden"
                        style={{ borderColor: theme.border }}
                    >
                        <div className="p-6 sm:p-7 space-y-5" style={{ backgroundColor: theme.surfaceAlt }}>
                            <p className="text-sm leading-relaxed" style={{ color: theme.text }}>
                                {exp.summary}
                            </p>

                            <div>
                                <span
                                    className="text-xs font-mono uppercase tracking-wider block mb-2"
                                    style={{ color: theme.accent }}
                                >
                                    Key Responsibilities & Scope
                                </span>
                                <ul className="space-y-2">
                                    {exp.responsibilities.map((r, i) => (
                                        <li
                                            key={i}
                                            className="text-xs sm:text-sm flex items-start gap-2.5"
                                            style={{ color: theme.textMuted }}
                                        >
                                            <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: theme.accent }} />
                                            <span>{r}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {exp.contributions && (
                                <div className="pt-2">
                                    <span
                                        className="text-xs font-mono uppercase tracking-wider block mb-1"
                                        style={{ color: theme.accent }}
                                    >
                                        Contributions & Milestones
                                    </span>
                                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                                        {exp.contributions}
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
