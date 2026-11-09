"use client";

import React, { useState, useMemo } from 'react';
import { StudioTheme } from '@/types';
import { SOFTWARE_TOOLS } from '@/data/skills';

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
                        05 / Software & Tools
                    </span>
                    <h2 className="font-display text-3xl sm:text-5xl font-semibold">
                        Tools Behind the{' '}
                        <span className="font-serif-italic font-normal">Vision.</span>
                    </h2>
                </div>

                {/* Workflow Group Filter */}
                <div className="flex flex-wrap gap-2">
                    {softwareGroups.map((grp) => (
                        <button
                            key={grp}
                            onClick={() => setSelectedSoftwareGroup(grp)}
                            className="px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredSoftware.map((tool) => (
                    <div
                        key={tool.name}
                        className="p-6 rounded-2xl border transition-all hover:shadow-sm flex flex-col justify-between gap-4"
                        style={{
                            backgroundColor: theme.surface,
                            borderColor: theme.border
                        }}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="font-display font-semibold text-base sm:text-lg">
                                    {tool.name}
                                </h4>
                                <span
                                    className="font-mono text-xs uppercase tracking-wider block mt-0.5"
                                    style={{ color: theme.accent }}
                                >
                                    {tool.category}
                                </span>
                            </div>
                            <span
                                className="px-2.5 py-1 rounded-full text-[11px] font-mono border"
                                style={{
                                    backgroundColor: theme.surfaceAlt,
                                    borderColor: theme.border,
                                    color: theme.textMuted
                                }}
                            >
                                {tool.code}
                            </span>
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                            {tool.role}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
