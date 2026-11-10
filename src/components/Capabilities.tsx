"use client";

import React, { useState, useMemo } from 'react';
import {
    Scissors,
    Layers,
    Clapperboard,
    Sparkles,
    Tv,
    Package,
    Megaphone,
    Palette,
    Wand2,
    Box,
    Compass,
    Smartphone,
    ArrowUpRight
} from 'lucide-react';
import { StudioTheme } from '@/types';
import { CORE_CAPABILITIES } from '@/data/skills';
import { SoftwareTools } from './SoftwareTools';
import { KineticReveal } from './MotionPrimitives';

interface CapabilitiesProps {
    theme: StudioTheme;
    onSelectWorkCategory?: (category: string) => void;
}

const CAPABILITY_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
    scissors: Scissors,
    layers: Layers,
    clapperboard: Clapperboard,
    sparkles: Sparkles,
    tv: Tv,
    package: Package,
    megaphone: Megaphone,
    palette: Palette,
    wand: Wand2,
    box: Box,
    compass: Compass,
    smartphone: Smartphone
};

const CAPABILITY_GROUPS = ['All', 'Editing & Film', 'Motion & 3D', 'Color & VFX', 'Strategy & Social'];

export function Capabilities({ theme, onSelectWorkCategory }: CapabilitiesProps) {
    const [selectedGroup, setSelectedGroup] = useState<string>('All');

    const filteredCapabilities = useMemo(() => {
        if (selectedGroup === 'All') return CORE_CAPABILITIES;
        return CORE_CAPABILITIES.filter((cap) => cap.group === selectedGroup);
    }, [selectedGroup]);

    return (
        <section
            id="capabilities"
            className="py-12 sm:py-16 md:py-24 lg:py-28 border-b"
            style={{ borderColor: theme.border }}
        >
            <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
                {/* 12 Core Capabilities */}
                <div className="mb-12 sm:mb-18 lg:mb-24">
                    <KineticReveal>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-6 sm:mb-10 gap-4 sm:gap-6">
                        <div className="max-w-2xl">
                            <span
                                className="font-mono text-xs uppercase tracking-[0.2em] block mb-2"
                                style={{ color: theme.accent }}
                            >
                                04 / Capabilities &amp; Craft
                            </span>
                            <h2 className="font-display text-3xl sm:text-5xl font-semibold">
                                What I Bring to the{' '}
                                <span className="font-serif-italic font-normal">Frame.</span>
                            </h2>
                            <p className="text-sm sm:text-base mt-3 max-w-xl" style={{ color: theme.textMuted }}>
                                Specialized post-production and creative direction services tailored for
                                commercial brands, fashion houses, and digital media agencies.
                            </p>
                        </div>

                        {/* Interactive Capability Discipline Filter Pills */}
                        <div className="flex flex-wrap gap-2">
                            {CAPABILITY_GROUPS.map((grp) => {
                                const isActive = selectedGroup === grp;
                                return (
                                    <button
                                        key={grp}
                                        onClick={() => setSelectedGroup(grp)}
                                        className="px-3.5 py-2 rounded-full text-xs font-medium border transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                                        style={{
                                            backgroundColor: isActive ? theme.text : theme.surface,
                                            borderColor: isActive ? theme.text : theme.border,
                                            color: isActive ? theme.bg : theme.textMuted
                                        }}
                                    >
                                        {grp}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    </KineticReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 lg:gap-6">
                        {filteredCapabilities.map((skill) => {
                            const IconComponent =
                                (skill.icon && CAPABILITY_ICON_MAP[skill.icon]) || Sparkles;

                            return (
                                <div
                                    key={skill.num}
                                    className="group p-4 sm:p-6 lg:p-7 rounded-2xl border transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col justify-between gap-3.5 sm:gap-5"
                                    style={{
                                        backgroundColor: theme.surface,
                                        borderColor: theme.border
                                    }}
                                >
                                    <div>
                                        {/* Top Row: Number + Group Label & Framed Icon Medallion */}
                                        <div className="flex items-start justify-between gap-4 mb-3 sm:mb-5">
                                            <div>
                                                <span
                                                    className="font-mono text-xs font-semibold block"
                                                    style={{ color: theme.accent }}
                                                >
                                                    {skill.num}
                                                </span>
                                                {skill.group && (
                                                    <span
                                                        className="font-mono text-[10px] uppercase tracking-wider block mt-0.5"
                                                        style={{ color: theme.textMuted }}
                                                    >
                                                        {skill.group}
                                                    </span>
                                                )}
                                            </div>

                                            <div
                                                className="w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                                                style={{
                                                    backgroundColor: theme.accentSoft,
                                                    borderColor: theme.border,
                                                    color: theme.accent
                                                }}
                                            >
                                                <IconComponent className="w-5 h-5" />
                                            </div>
                                        </div>

                                        <h3 className="font-display text-lg sm:text-xl font-semibold mb-2.5 group-hover:underline">
                                            {skill.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                                            {skill.desc}
                                        </p>
                                    </div>

                                    {/* Bottom Deliverable & Interactive Category Link */}
                                    <div
                                        className="pt-4 border-t flex items-center justify-between gap-3"
                                        style={{ borderColor: theme.border }}
                                    >
                                        <span
                                            className="font-mono text-[11px] truncate"
                                            style={{ color: theme.textMuted }}
                                        >
                                            {skill.deliverable || 'Studio Workflow'}
                                        </span>

                                        {onSelectWorkCategory && skill.relatedCategory && (
                                            <button
                                                onClick={() => onSelectWorkCategory(skill.relatedCategory!)}
                                                className="px-3 py-1.5 rounded-full text-[11px] font-mono font-medium border inline-flex items-center gap-1 shrink-0 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                                                style={{
                                                    backgroundColor: theme.surfaceAlt,
                                                    borderColor: theme.border,
                                                    color: theme.text
                                                }}
                                                title={`Browse ${skill.relatedCategory} works`}
                                            >
                                                <span>Samples</span>
                                                <ArrowUpRight className="w-3 h-3" style={{ color: theme.accent }} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Extracted 9 Software & Tools Component */}
                <KineticReveal>
                    <SoftwareTools theme={theme} />
                </KineticReveal>
            </div>
        </section>
    );
}
