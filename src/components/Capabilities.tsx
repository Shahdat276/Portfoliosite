"use client";

import React, { useState, useMemo } from 'react';
import { StudioTheme } from '@/types';
import { CORE_CAPABILITIES, SOFTWARE_TOOLS } from '@/data/skills';

interface CapabilitiesProps {
    theme: StudioTheme;
}

export function Capabilities({ theme }: CapabilitiesProps) {
    const [selectedSoftwareGroup, setSelectedSoftwareGroup] = useState('All');

    const filteredSoftware = useMemo(() => {
        if (selectedSoftwareGroup === 'All') return SOFTWARE_TOOLS;
        return SOFTWARE_TOOLS.filter((s) => s.category === selectedSoftwareGroup);
    }, [selectedSoftwareGroup]);

    return (
        <section
            id="capabilities"
            className="py-24 md:py-32 border-b"
            style={{ borderColor: theme.border }}
        >
            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                {/* 12 Core Capabilities */}
                <div className="mb-24">
                    <div className="max-w-2xl mb-12">
                        <span
                            className="font-mono text-xs uppercase tracking-[0.2em] block mb-2"
                            style={{ color: theme.accent }}
                        >
                            04 / Capabilities
                        </span>
                        <h2 className="font-display text-3xl sm:text-5xl font-semibold">
                            What I Bring to the{' '}
                            <span className="font-serif-italic font-normal">Frame.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {CORE_CAPABILITIES.map((skill) => (
                            <div
                                key={skill.num}
                                className="p-6 sm:p-7 rounded-2xl border transition-all hover:shadow-sm"
                                style={{
                                    backgroundColor: theme.surface,
                                    borderColor: theme.border
                                }}
                            >
                                <span
                                    className="font-mono text-xs font-medium block mb-3"
                                    style={{ color: theme.accent }}
                                >
                                    {skill.num}
                                </span>
                                <h3 className="font-display text-lg font-semibold mb-2">
                                    {skill.title}
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                                    {skill.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 9 Software & Tools */}
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
                            {['All', 'Editing & Color', 'Motion & VFX', '3D & CGI', 'Design & Assets'].map(
                                (grp) => (
                                    <button
                                        key={grp}
                                        onClick={() => setSelectedSoftwareGroup(grp)}
                                        className="px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors"
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
                                )
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredSoftware.map((tool) => (
                            <div
                                key={tool.name}
                                className="p-5 rounded-2xl border flex items-center gap-4 transition-all"
                                style={{
                                    backgroundColor: theme.surface,
                                    borderColor: theme.border
                                }}
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-sm shrink-0 border"
                                    style={{
                                        backgroundColor: theme.accentSoft,
                                        borderColor: theme.border,
                                        color: theme.accent
                                    }}
                                >
                                    {tool.code}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-display text-base font-semibold">{tool.name}</h3>
                                    </div>
                                    <p className="text-xs mt-0.5" style={{ color: theme.textMuted }}>
                                        {tool.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
