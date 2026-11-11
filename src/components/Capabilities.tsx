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
    ArrowUpRight,
    Plus,
    Minus
} from 'lucide-react';
import { StudioTheme } from '@/types';
import { CORE_CAPABILITIES } from '@/data/skills';
import { KineticReveal, playStudioTick } from './MotionPrimitives';

interface CapabilitiesProps {
    theme: StudioTheme;
    soundEnabled?: boolean;
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

export function Capabilities({
    theme,
    soundEnabled = false,
    onSelectWorkCategory
}: CapabilitiesProps) {
    const [selectedGroup, setSelectedGroup] = useState<string>('All');
    const [expandedNum, setExpandedNum] = useState<string | null>(null);

    const groupCounts = useMemo(() => {
        const counts: Record<string, number> = { All: CORE_CAPABILITIES.length };
        for (const cap of CORE_CAPABILITIES) {
            if (cap.group) {
                counts[cap.group] = (counts[cap.group] || 0) + 1;
            }
        }
        return counts;
    }, []);

    const filteredCapabilities = useMemo(() => {
        if (selectedGroup === 'All') return CORE_CAPABILITIES;
        return CORE_CAPABILITIES.filter((cap) => cap.group === selectedGroup);
    }, [selectedGroup]);

    const isFocusedFilter = selectedGroup !== 'All';
    const gridColsClass =
        filteredCapabilities.length === 3
            ? 'grid-cols-1 lg:grid-cols-3'
            : 'grid-cols-1 lg:grid-cols-2';

    return (
        <section
            id="capabilities"
            className="py-10 sm:py-14 lg:py-16 border-b"
            style={{ borderColor: theme.border }}
        >
            <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
                <KineticReveal>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-6 sm:mb-8 gap-4">
                    <div className="max-w-xl">
                        <span
                            className="font-mono text-xs uppercase tracking-[0.2em] block mb-1.5"
                            style={{ color: theme.accent }}
                        >
                            03 / Capabilities &amp; Craft
                        </span>
                        <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight">
                            What I Bring to the{' '}
                            <span className="font-serif-italic font-normal">Frame.</span>
                        </h2>
                        <p className="text-xs sm:text-sm mt-2 max-w-lg leading-relaxed" style={{ color: theme.textMuted }}>
                            End-to-end post-production and creative direction built for commercial brands,
                            fashion campaigns, and digital media teams.
                        </p>
                    </div>

                    {/* Interactive Discipline Filter Pills */}
                    <div className="flex flex-wrap gap-1.5">
                        {CAPABILITY_GROUPS.map((grp) => {
                            const isActive = selectedGroup === grp;
                            const count = groupCounts[grp] ?? 0;
                            return (
                                <button
                                    key={grp}
                                    type="button"
                                    onClick={() => {
                                        playStudioTick(soundEnabled, 620);
                                        setSelectedGroup(grp);
                                        setExpandedNum(null);
                                    }}
                                    className="px-3 py-1.5 rounded-full text-xs font-medium border inline-flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                                    style={{
                                        backgroundColor: isActive ? theme.text : theme.surface,
                                        borderColor: isActive ? theme.text : theme.border,
                                        color: isActive ? theme.bg : theme.textMuted
                                    }}
                                >
                                    <span>{grp}</span>
                                    <span
                                        className="font-mono text-[10px] opacity-65"
                                        style={{ color: isActive ? theme.bg : theme.accent }}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
                </KineticReveal>

                {/* Architectural Hairline Matrix: Compact at-a-glance index with zero card bloat */}
                <div
                    className={`rounded-2xl border overflow-hidden grid ${gridColsClass} gap-px`}
                    style={{
                        backgroundColor: theme.border,
                        borderColor: theme.border
                    }}
                >
                    {filteredCapabilities.map((skill) => {
                        const IconComponent =
                            (skill.icon && CAPABILITY_ICON_MAP[skill.icon]) || Sparkles;
                        const isExpanded = isFocusedFilter || expandedNum === skill.num;

                        return (
                            <div
                                key={skill.num}
                                className="group px-4 py-3.5 sm:px-5 sm:py-4 transition-colors duration-200 flex flex-col justify-between"
                                style={{
                                    backgroundColor: isExpanded ? theme.surfaceAlt : theme.surface
                                }}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    {/* Interactive Title / Expand Trigger */}
                                    <button
                                        type="button"
                                        aria-expanded={isExpanded}
                                        disabled={isFocusedFilter}
                                        onClick={() => {
                                            if (isFocusedFilter) return;
                                            playStudioTick(soundEnabled, isExpanded ? 520 : 680);
                                            setExpandedNum((prev) =>
                                                prev === skill.num ? null : skill.num
                                            );
                                        }}
                                        className={`flex items-center gap-3 min-w-0 flex-1 text-left ${
                                            isFocusedFilter ? 'cursor-default' : 'cursor-pointer'
                                        }`}
                                    >
                                        <span
                                            className="font-mono text-[11px] font-semibold shrink-0 tabular-nums"
                                            style={{ color: theme.accent }}
                                        >
                                            {skill.num}
                                        </span>

                                        <span
                                            className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
                                            style={{
                                                backgroundColor: theme.accentSoft,
                                                borderColor: theme.border,
                                                color: theme.accent
                                            }}
                                        >
                                            <IconComponent className="w-4 h-4" />
                                        </span>

                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-display text-sm sm:text-base font-semibold tracking-tight truncate group-hover:underline">
                                                {skill.title}
                                            </h3>
                                            <p
                                                className="font-mono text-[10px] sm:text-[11px] truncate mt-0.5"
                                                style={{ color: theme.textMuted }}
                                            >
                                                {skill.group ? `${skill.group} · ` : ''}
                                                {skill.deliverable || 'Studio Workflow'}
                                            </p>
                                        </div>
                                    </button>

                                    {/* Right Micro-Actions */}
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        {onSelectWorkCategory && skill.relatedCategory && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    playStudioTick(soundEnabled, 740);
                                                    onSelectWorkCategory(skill.relatedCategory!);
                                                }}
                                                className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-medium border inline-flex items-center gap-1 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                                                style={{
                                                    backgroundColor: theme.bg,
                                                    borderColor: theme.border,
                                                    color: theme.text
                                                }}
                                                title={`Browse ${skill.relatedCategory} works`}
                                            >
                                                <span>Samples</span>
                                                <ArrowUpRight className="w-3 h-3" style={{ color: theme.accent }} />
                                            </button>
                                        )}

                                        {!isFocusedFilter && (
                                            <button
                                                type="button"
                                                aria-label={isExpanded ? `Collapse ${skill.title}` : `Expand ${skill.title}`}
                                                onClick={() => {
                                                    playStudioTick(soundEnabled, isExpanded ? 520 : 680);
                                                    setExpandedNum((prev) =>
                                                        prev === skill.num ? null : skill.num
                                                    );
                                                }}
                                                className="w-7 h-7 rounded-full border flex items-center justify-center transition-colors cursor-pointer"
                                                style={{
                                                    borderColor: isExpanded ? theme.accent : theme.border,
                                                    color: isExpanded ? theme.accent : theme.textMuted
                                                }}
                                            >
                                                {isExpanded ? (
                                                    <Minus className="w-3 h-3" />
                                                ) : (
                                                    <Plus className="w-3 h-3" />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Smooth CSS grid-template-rows expand for description */}
                                <div
                                    className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                    style={{
                                        gridTemplateRows: isExpanded ? '1fr' : '0fr'
                                    }}
                                >
                                    <div className="overflow-hidden">
                                        <p
                                            className="pt-2.5 pl-11 sm:pl-[68px] text-xs sm:text-sm leading-relaxed"
                                            style={{ color: theme.textMuted }}
                                        >
                                            {skill.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
