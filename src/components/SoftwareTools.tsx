"use client";

import React, { useState, useMemo } from 'react';
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredSoftware.map((tool) => (
                    <div
                        key={tool.name}
                        className="group p-6 sm:p-7 rounded-2xl border transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col justify-between gap-5 cursor-default"
                        style={{
                            backgroundColor: theme.surface,
                            borderColor: theme.border
                        }}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h4 className="font-display font-semibold text-base sm:text-lg group-hover:underline transition-all">
                                    {tool.name}
                                </h4>
                                <span
                                    className="font-mono text-xs uppercase tracking-wider block mt-1"
                                    style={{ color: theme.accent }}
                                >
                                    {tool.category}
                                </span>
                            </div>

                            {/* Official Software App Icon */}
                            <div className="shrink-0 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm">
                                <SoftwareIcon code={tool.code} name={tool.name} className="w-12 h-12 rounded-xl" />
                            </div>
                        </div>

                        <div className="pt-3 border-t" style={{ borderColor: theme.border }}>
                            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                                {tool.role}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
