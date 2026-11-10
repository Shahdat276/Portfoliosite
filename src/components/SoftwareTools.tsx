"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { StudioTheme } from '@/types';
import { SOFTWARE_TOOLS } from '@/data/skills';
import { SoftwareIcon } from './SoftwareIcon';

interface SoftwareToolsProps {
    theme: StudioTheme;
}

export function SoftwareTools({ theme }: SoftwareToolsProps) {
    const [selectedSoftwareGroup, setSelectedSoftwareGroup] = useState('All');

    const filteredSoftware = useMemo(() => {
        if (selectedSoftwareGroup === 'All') return SOFTWARE_TOOLS;
        return SOFTWARE_TOOLS.filter((s) => s.category === selectedSoftwareGroup);
    }, [selectedSoftwareGroup]);

    const softwareGroups = ['All', 'Editing & Color', 'Motion & VFX', '3D & CGI', 'Design & Assets'];

    return (
        <div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
                <div>
                    <span
                        className="font-mono text-xs uppercase tracking-[0.2em] block mb-2"
                        style={{ color: theme.accent }}
                    >
                        05 / Software &amp; Tools
                    </span>
                    <h2 className="font-display text-3xl sm:text-5xl font-semibold">
                        Tools Behind the{' '}
                        <span className="font-serif-italic font-normal">Vision.</span>
                    </h2>
                    <p className="text-sm sm:text-base mt-3 max-w-xl" style={{ color: theme.textMuted }}>
                        Core post-production, 3D CGI, and visual design pipeline ranked by hands-on production
                        proficiency.
                    </p>
                </div>

                {/* Workflow Group Filter */}
                <div className="flex flex-wrap gap-2">
                    {softwareGroups.map((grp) => (
                        <button
                            key={grp}
                            onClick={() => setSelectedSoftwareGroup(grp)}
                            className="px-3.5 py-2 rounded-full text-xs font-medium border transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                            style={{
                                backgroundColor:
                                    selectedSoftwareGroup === grp ? theme.text : theme.surface,
                                borderColor:
                                    selectedSoftwareGroup === grp ? theme.text : theme.border,
                                color: selectedSoftwareGroup === grp ? theme.bg : theme.textMuted
                            }}
                        >
                            {grp}
                        </button>
                    ))}
                </div>
            </div>

            {/* Software Tool Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSoftware.map((tool, index) => (
                    <div
                        key={tool.name}
                        className="group p-6 sm:p-7 rounded-2xl border transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col justify-between gap-5 cursor-default"
                        style={{
                            backgroundColor: theme.surface,
                            borderColor: theme.border
                        }}
                    >
                        <div>
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span
                                            className="font-mono text-[10px]"
                                            style={{ color: theme.textMuted }}
                                        >
                                            {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                        </span>
                                        <span
                                            className="font-mono text-[10px] uppercase tracking-wider"
                                            style={{ color: theme.accent }}
                                        >
                                            • {tool.category}
                                        </span>
                                    </div>
                                    <h4 className="font-display font-semibold text-base sm:text-lg group-hover:underline transition-all">
                                        {tool.name}
                                    </h4>
                                </div>

                                {/* Official Software App Icon */}
                                <div className="shrink-0 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm">
                                    <SoftwareIcon
                                        code={tool.code}
                                        name={tool.name}
                                        className="w-12 h-12 rounded-xl"
                                    />
                                </div>
                            </div>

                            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                                {tool.role}
                            </p>
                        </div>

                        {/* Animated Expertise / Proficiency Meter */}
                        <div className="pt-4 border-t space-y-2.5" style={{ borderColor: theme.border }}>
                            <div className="flex items-center justify-between text-xs font-mono">
                                <span className="uppercase tracking-wider" style={{ color: theme.textMuted }}>
                                    Expertise •{' '}
                                    <span style={{ color: theme.text }}>{tool.level || 'Proficient'}</span>
                                </span>
                                <span
                                    className="px-2 py-0.5 rounded-md font-semibold"
                                    style={{
                                        backgroundColor: theme.accentSoft,
                                        color: theme.accent
                                    }}
                                >
                                    {tool.proficiency}%
                                </span>
                            </div>

                            {/* Progress Bar Track */}
                            <div
                                className="h-2.5 w-full rounded-full overflow-hidden border relative"
                                style={{
                                    backgroundColor: theme.surfaceAlt,
                                    borderColor: theme.border
                                }}
                                role="progressbar"
                                aria-valuenow={tool.proficiency}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-label={`${tool.name} expertise ${tool.proficiency}%`}
                            >
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${tool.proficiency}%` }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{
                                        duration: 0.85,
                                        delay: Math.min(index * 0.05, 0.3),
                                        ease: 'easeOut'
                                    }}
                                    className="h-full rounded-full relative"
                                    style={{
                                        background: `linear-gradient(90deg, ${theme.accent}CC 0%, ${theme.accent} 100%)`
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
