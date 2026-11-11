"use client";

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { StudioTheme } from '@/types';
import { SkewMaskReveal, playStudioTick } from './MotionPrimitives';

interface ProcessWorkflowSectionProps {
    theme: StudioTheme;
    soundEnabled?: boolean;
}

const PROCESS_STEPS = [
    {
        num: '01',
        title: 'Listen & Brief',
        line: 'We align on target audience, platform deliverables, music mood, and campaign KPIs before a single cut happens.'
    },
    {
        num: '02',
        title: 'Cut & Rhythm',
        line: 'Multi-cam narrative assembly and frame-accurate pacing in Premiere Pro synchronized cleanly to voiceover and beats.'
    },
    {
        num: '03',
        title: 'Motion & Grade',
        line: 'Custom 2D/3D typography, After Effects VFX compositing, and DaVinci Resolve cinema color finishing.'
    },
    {
        num: '04',
        title: 'Master & Deliver',
        line: 'Broadcast-safe 16:9, 1:1, and 9:16 master exports plus organized project files delivered cleanly on schedule.'
    }
];

/**
 * Interactive 4-step workflow accordion + subtle animated film-grain cinema viewport
 * modeled after CodeofSagar ProcessSection.
 */
export function ProcessWorkflowSection({
    theme,
    soundEnabled = false
}: ProcessWorkflowSectionProps) {
    const [activeStep, setActiveStep] = useState<number>(0);

    return (
        <section
            className="py-10 sm:py-14 lg:py-16 border-b relative overflow-hidden"
            style={{
                backgroundColor: theme.bg,
                borderColor: theme.border
            }}
        >
            <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left 6 Cols: Film Grain Preview Frame + Direct Statement */}
                    <div className="lg:col-span-6 space-y-5">
                        <span
                            className="font-mono text-xs uppercase tracking-[0.22em] block"
                            style={{ color: theme.accent }}
                        >
                            How We Work Together
                        </span>

                        {/* Atmospheric Animated Film-Grain Cinema Box */}
                        <div
                            className="rounded-2xl border aspect-video relative overflow-hidden p-6 sm:p-8 flex flex-col justify-between"
                            style={{
                                backgroundColor: theme.isDark ? '#141312' : '#171615',
                                borderColor: theme.borderStrong,
                                color: '#FFFFFF'
                            }}
                        >
                            <div
                                aria-hidden="true"
                                className="cos-film-grain pointer-events-none absolute -inset-12 opacity-40"
                            />
                            <div className="relative z-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-white/70">
                                <span>STAGE {PROCESS_STEPS[activeStep].num} / 04</span>
                                <span style={{ color: theme.accent }}>DIRECT COLLABORATION</span>
                            </div>

                            <div className="relative z-10">
                                <p className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
                                    {PROCESS_STEPS[activeStep].title}
                                </p>
                                <p className="text-xs sm:text-sm text-white/75 max-w-md leading-relaxed">
                                    {PROCESS_STEPS[activeStep].line}
                                </p>
                            </div>
                        </div>

                        <SkewMaskReveal>
                            <p className="font-display text-2xl sm:text-4xl font-semibold leading-tight tracking-[-0.03em]">
                                Direct senior execution—{' '}
                                <span className="font-serif-italic font-normal" style={{ color: theme.accent }}>
                                    zero middlemen.
                                </span>
                            </p>
                        </SkewMaskReveal>
                    </div>

                    {/* Right 6 Cols: Oversized Interactive Accordion Steps */}
                    <div className="lg:col-span-6 lg:pl-8">
                        <ul className="divide-y" style={{ borderColor: theme.border }}>
                            {PROCESS_STEPS.map((step, idx) => {
                                const isOpen = idx === activeStep;
                                return (
                                    <li
                                        key={step.num}
                                        className="py-3.5 sm:py-4"
                                        style={{ borderColor: theme.border }}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => {
                                                playStudioTick(soundEnabled, 580 + idx * 50);
                                                setActiveStep(idx);
                                            }}
                                            className="w-full flex items-center justify-between gap-4 text-left group cursor-pointer"
                                        >
                                            <div className="flex items-baseline gap-3 sm:gap-5">
                                                <span
                                                    className="font-mono text-xs transition-colors"
                                                    style={{
                                                        color: isOpen ? theme.accent : theme.textMuted
                                                    }}
                                                >
                                                    {step.num}
                                                </span>
                                                <span
                                                    className="font-display text-2xl sm:text-4xl font-semibold tracking-[-0.03em] transition-colors"
                                                    style={{
                                                        color: isOpen ? theme.text : theme.textMuted
                                                    }}
                                                >
                                                    {step.title}
                                                </span>
                                            </div>
                                            <span
                                                className="w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                                                style={{
                                                    borderColor: isOpen ? theme.accent : theme.border,
                                                    color: isOpen ? theme.accent : theme.textMuted
                                                }}
                                            >
                                                {isOpen ? (
                                                    <Minus className="w-4 h-4" />
                                                ) : (
                                                    <Plus className="w-4 h-4" />
                                                )}
                                            </span>
                                        </button>

                                        {/* Smooth CSS grid-template-rows Accordion matching CodeofSagar */}
                                        <div
                                            className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                            style={{
                                                gridTemplateRows: isOpen ? '1fr' : '0fr'
                                            }}
                                        >
                                            <div className="overflow-hidden">
                                                <p
                                                    className="pt-3 pl-8 sm:pl-10 text-sm sm:text-base leading-relaxed max-w-lg"
                                                    style={{ color: theme.textMuted }}
                                                >
                                                    {step.line}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

