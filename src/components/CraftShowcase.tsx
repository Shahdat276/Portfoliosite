"use client";

import React, { useRef } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useReducedMotion
} from 'framer-motion';
import { StudioTheme } from '@/types';
import { SkewMaskReveal, ArchitecturalGuides } from './MotionPrimitives';

interface CraftShowcaseProps {
    theme: StudioTheme;
}

/**
 * Giant typographic centerpiece inspired by CodeofSagar CraftSection
 * ("Where Motion Meets Story.") with scroll-linked cinema aperture rotation.
 */
export function CraftShowcase({ theme }: CraftShowcaseProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const shouldReduce = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 26,
        mass: 0.3
    });

    const ringRotate = useTransform(smoothProgress, [0, 1], [-28, 36]);
    const innerRotate = useTransform(smoothProgress, [0, 1], [45, -45]);
    const stageScale = useTransform(smoothProgress, [0, 0.5, 1], [0.88, 1.04, 0.94]);

    return (
        <section
            ref={sectionRef}
            className="relative py-20 sm:py-28 lg:py-36 border-b overflow-hidden select-none"
            style={{
                backgroundColor: theme.surfaceAlt,
                borderColor: theme.border
            }}
        >
            <ArchitecturalGuides borderColor={theme.border} columns={3} />

            {/* Scroll-Reactive Geometric Aperture / Bezier Speed-Graph Visual */}
            <motion.div
                aria-hidden="true"
                style={
                    shouldReduce
                        ? undefined
                        : { rotate: ringRotate, scale: stageScale }
                }
                className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-35 will-change-transform"
            >
                <div className="relative w-[320px] sm:w-[480px] lg:w-[560px] aspect-square flex items-center justify-center">
                    <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
                        <circle
                            cx="200"
                            cy="200"
                            r="185"
                            stroke={theme.borderStrong}
                            strokeWidth="1"
                            strokeDasharray="6 8"
                        />
                        <circle
                            cx="200"
                            cy="200"
                            r="138"
                            stroke={theme.accent}
                            strokeOpacity="0.45"
                            strokeWidth="1.5"
                        />
                        {/* Stylized After Effects Speed Graph Bezier Arc */}
                        <path
                            d="M 55 305 C 155 305, 145 95, 345 95"
                            stroke={theme.accent}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                        <circle cx="55" cy="305" r="5" fill={theme.accent} />
                        <circle cx="345" cy="95" r="5" fill={theme.accent} />
                    </svg>

                    <motion.div
                        style={shouldReduce ? undefined : { rotate: innerRotate }}
                        className="absolute inset-24 rounded-full border border-dashed"
                    />
                </div>
            </motion.div>

            <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
                <div className="min-h-[42vh] sm:min-h-[54vh] flex flex-col justify-between gap-12">
                    {/* Top Left Oversized Phrase */}
                    <div>
                        <span
                            className="font-mono text-xs uppercase tracking-[0.22em] block mb-3"
                            style={{ color: theme.accent }}
                        >
                            Philosophy In Practice
                        </span>
                        <SkewMaskReveal>
                            <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-[108px] font-semibold leading-[0.94] tracking-[-0.045em]">
                                Where Motion
                            </h2>
                        </SkewMaskReveal>
                    </div>

                    {/* Bottom Split: Left Copy Note + Right Completing Phrase */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <p
                            className="text-sm sm:text-base max-w-sm leading-relaxed order-2 lg:order-1"
                            style={{ color: theme.textMuted }}
                        >
                            Every cut on the timeline and every speed-graph curve in After Effects is
                            hand-timed—so your audience feels the narrative momentum before they notice the
                            technique.
                        </p>

                        <div className="lg:text-right order-1 lg:order-2">
                            <SkewMaskReveal delay={0.1}>
                                <p className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-[108px] font-semibold leading-[0.94] tracking-[-0.045em]">
                                    Meets{' '}
                                    <span
                                        className="font-serif-italic font-normal"
                                        style={{ color: theme.accent }}
                                    >
                                        Story.
                                    </span>
                                </p>
                            </SkewMaskReveal>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
