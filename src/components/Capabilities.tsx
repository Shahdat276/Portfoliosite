"use client";

import React from 'react';
import { StudioTheme } from '@/types';
import { CORE_CAPABILITIES } from '@/data/skills';
import { SoftwareTools } from './SoftwareTools';

interface CapabilitiesProps {
    theme: StudioTheme;
}

export function Capabilities({ theme }: CapabilitiesProps) {
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

                {/* Extracted 9 Software & Tools Component */}
                <SoftwareTools theme={theme} />
            </div>
        </section>
    );
}
