"use client";

import React, { useRef } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
    useMotionTemplate,
    useReducedMotion
} from 'framer-motion';
import { StudioTheme } from '@/types';

/** After Effects inspired Speed-Graph deceleration curve. */
export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

/** Signature editorial masked-rise cubic-bezier curve. */
export const STUDIO_EASE = [0.65, 0, 0.2, 1] as const;

const TICKER_ITEMS = [
    'Commercial Editing',
    'Motion Graphics',
    '3D & 2D VFX',
    'Color Grading',
    'Logo Animation',
    'Brand Films',
    'After Effects',
    'Cinema 4D',
    'DaVinci Resolve',
    'Reels & Social Cuts'
];

let sharedAudioCtx: AudioContext | null = null;

/**
 * Plays a minimal Web Audio API studio click/tick cue when sound mode is enabled.
 */
export function playStudioTick(enabled: boolean, pitch = 680) {
    if (!enabled || typeof window === 'undefined') return;
    try {
        const Ctx =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Ctx) return;
        if (!sharedAudioCtx) {
            sharedAudioCtx = new Ctx();
        }
        if (sharedAudioCtx.state === 'suspended') {
            sharedAudioCtx.resume().catch(() => {});
        }
        const osc = sharedAudioCtx.createOscillator();
        const gain = sharedAudioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(pitch, sharedAudioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(pitch * 0.45, sharedAudioCtx.currentTime + 0.045);

        gain.gain.setValueAtTime(0.035, sharedAudioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, sharedAudioCtx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(sharedAudioCtx.destination);
        osc.start();
        osc.stop(sharedAudioCtx.currentTime + 0.055);
    } catch {
        // Ignore audio restrictions cleanly
    }
}

interface MonogramMarkProps {
    accentColor: string;
    className?: string;
}

/**
 * Geometric SH studio monogram mark with signature rotate-scale arrival animation.
 */
export function MonogramMark({ accentColor, className = 'w-7 h-7' }: MonogramMarkProps) {
    return (
        <svg
            viewBox="0 0 36 36"
            fill="none"
            aria-hidden="true"
            className={`cos-monogram-enter shrink-0 ${className}`}
        >
            <rect
                x="1.5"
                y="1.5"
                width="33"
                height="33"
                rx="9"
                stroke="currentColor"
                strokeOpacity="0.22"
                strokeWidth="1.5"
            />
            <path
                d="M11 23.5L11 12.5H17.5M18.5 12.5V23.5H25"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="24.5" cy="12.5" r="2.5" fill={accentColor} />
        </svg>
    );
}

interface RollTextProps {
    text: string;
    className?: string;
}

/**
 * Staggered character-by-character vertical roll hover animation ([data-roll-letter] effect).
 */
export function RollText({ text, className = '' }: RollTextProps) {
    const chars = Array.from(text);
    return (
        <span className={`inline-flex overflow-hidden leading-[1.08] cos-roll-trigger ${className}`}>
            {chars.map((char, idx) => {
                const display = char === ' ' ? '\u00A0' : char;
                const delay = `${Math.min(idx, 18) * 16}ms`;
                return (
                    <span
                        key={`${idx}-${char}`}
                        className="relative inline-block overflow-hidden h-[1.12em]"
                    >
                        <span
                            className="cos-roll-letter block leading-[1.12em]"
                            style={{ transitionDelay: delay }}
                        >
                            <span className="block">{display}</span>
                            <span aria-hidden="true" className="block">
                                {display}
                            </span>
                        </span>
                    </span>
                );
            })}
        </span>
    );
}

interface SkewMaskRevealProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

/**
 * Masked editorial headline reveal matching `@keyframes arrive` (translateY + skewY).
 */
export function SkewMaskReveal({ children, delay = 0, className = '' }: SkewMaskRevealProps) {
    const shouldReduce = useReducedMotion();

    if (shouldReduce) {
        return <div className={className}>{children}</div>;
    }

    return (
        <div className={`overflow-clip py-[0.06em] -my-[0.06em] ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: '110%', skewY: 3.5 }}
                whileInView={{ opacity: 1, y: '0%', skewY: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{
                    duration: 0.85,
                    delay,
                    ease: STUDIO_EASE
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}

interface ArchitecturalGuidesProps {
    borderColor: string;
    columns?: 3 | 5;
}

/**
 * Vertical architectural grid hairline columns expanding downward cleanly into view.
 */
export function ArchitecturalGuides({
    borderColor,
    columns = 5
}: ArchitecturalGuidesProps) {
    const shouldReduce = useReducedMotion();

    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 grid ${
                columns === 5 ? 'grid-cols-3 lg:grid-cols-5' : 'grid-cols-3'
            } px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px] z-0`}
        >
            {Array.from({ length: columns }).map((_, idx) => (
                <motion.i
                    key={idx}
                    initial={shouldReduce ? false : { scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{
                        duration: 0.9,
                        delay: idx * 0.06,
                        ease: STUDIO_EASE
                    }}
                    className={`border-l origin-top h-full ${
                        columns === 5 && idx >= 3 ? 'hidden lg:block' : 'block'
                    }`}
                    style={{
                        borderColor,
                        opacity: 0.45
                    }}
                />
            ))}
        </div>
    );
}

interface TimelineScrollBarProps {
    theme: StudioTheme;
}

/**
 * Fixed timeline playhead progress indicator synced to overall page scroll.
 */
export function TimelineScrollBar({ theme }: TimelineScrollBarProps) {
    const shouldReduce = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 260,
        damping: 32,
        restDelta: 0.001
    });

    if (shouldReduce) return null;

    return (
        <div
            aria-hidden="true"
            className="absolute bottom-0 inset-x-0 h-[2.5px] pointer-events-none overflow-hidden"
            style={{ backgroundColor: theme.accentSoft }}
        >
            <motion.div
                className="h-full w-full origin-left will-change-transform"
                style={{
                    scaleX,
                    backgroundColor: theme.accent,
                    boxShadow: `0 0 12px ${theme.accent}`
                }}
            />
        </div>
    );
}

interface KineticRevealProps {
    children: React.ReactNode;
    delay?: number;
    yOffset?: number;
    className?: string;
}

/**
 * Viewport reveal matching a tight motion-design speed-graph entrance.
 */
export function KineticReveal({
    children,
    delay = 0,
    yOffset = 22,
    className = ''
}: KineticRevealProps) {
    const shouldReduce = useReducedMotion();

    if (shouldReduce) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: yOffset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.06 }}
            transition={{
                duration: 0.62,
                delay,
                ease: MOTION_EASE
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface ParallaxDepthLayerProps {
    children: React.ReactNode;
    speed?: number;
    className?: string;
}

/**
 * Scroll-linked depth layer that smoothly offsets children along the Y-axis.
 */
export function ParallaxDepthLayer({
    children,
    speed = -22,
    className = ''
}: ParallaxDepthLayerProps) {
    const shouldReduce = useReducedMotion();
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    const rawY = useTransform(scrollYProgress, [0, 1], [-speed, speed]);
    const y = useSpring(rawY, {
        stiffness: 150,
        damping: 26,
        mass: 0.25
    });

    if (shouldReduce) {
        return <div className={className}>{children}</div>;
    }

    return (
        <div ref={containerRef} className={className}>
            <motion.div style={{ y }} className="will-change-transform">
                {children}
            </motion.div>
        </div>
    );
}

interface ParallaxImageWindowProps {
    children: React.ReactNode;
    travel?: number;
    baseScale?: number;
    className?: string;
}

/**
 * Inner media window parallax: shifts media vertically inside an overflow-hidden frame
 * while preserving a clean overscan buffer so borders never clip.
 */
export function ParallaxImageWindow({
    children,
    travel = 14,
    baseScale = 1.12,
    className = ''
}: ParallaxImageWindowProps) {
    const shouldReduce = useReducedMotion();
    const frameRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: frameRef,
        offset: ['start end', 'end start']
    });

    const rawY = useTransform(scrollYProgress, [0, 1], [-travel, travel]);
    const y = useSpring(rawY, {
        stiffness: 165,
        damping: 28,
        mass: 0.22
    });

    if (shouldReduce) {
        return <div className={`absolute inset-0 overflow-hidden ${className}`}>{children}</div>;
    }

    return (
        <div ref={frameRef} className={`absolute inset-0 overflow-hidden ${className}`}>
            <motion.div
                style={{ y, scale: baseScale }}
                className="relative w-full h-full will-change-transform"
            >
                {children}
            </motion.div>
        </div>
    );
}

interface TiltSpotlightCardProps {
    children: React.ReactNode;
    accentColor: string;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * Interactive 3D perspective tilt card with pointer-tracking radial sheen for desktop cursors.
 */
export function TiltSpotlightCard({
    children,
    accentColor,
    className = '',
    style
}: TiltSpotlightCardProps) {
    const shouldReduce = useReducedMotion();
    const cardRef = useRef<HTMLDivElement>(null);

    const rotateXRaw = useMotionValue(0);
    const rotateYRaw = useMotionValue(0);
    const pointerX = useMotionValue(50);
    const pointerY = useMotionValue(50);
    const glowOpacityRaw = useMotionValue(0);

    const springConfig = { stiffness: 220, damping: 24, mass: 0.5 };
    const rotateX = useSpring(rotateXRaw, springConfig);
    const rotateY = useSpring(rotateYRaw, springConfig);
    const glowOpacity = useSpring(glowOpacityRaw, { stiffness: 200, damping: 26 });

    const glareBackground = useMotionTemplate`radial-gradient(420px circle at ${pointerX}% ${pointerY}%, ${accentColor}22, transparent 70%)`;

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (shouldReduce || e.pointerType === 'touch' || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        rotateYRaw.set((px - 0.5) * 6);
        rotateXRaw.set((0.5 - py) * 6);
        pointerX.set(px * 100);
        pointerY.set(py * 100);
        glowOpacityRaw.set(1);
    };

    const handlePointerLeave = () => {
        rotateXRaw.set(0);
        rotateYRaw.set(0);
        glowOpacityRaw.set(0);
    };

    return (
        <div style={{ perspective: 1200 }} className="w-full">
            <motion.div
                ref={cardRef}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                style={
                    shouldReduce
                        ? style
                        : {
                              ...style,
                              rotateX,
                              rotateY,
                              transformStyle: 'preserve-3d'
                          }
                }
                className={`relative will-change-transform ${className}`}
            >
                {!shouldReduce && (
                    <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-[inherit] z-20"
                        style={{
                            background: glareBackground,
                            opacity: glowOpacity
                        }}
                    />
                )}
                {children}
            </motion.div>
        </div>
    );
}

interface MotionVelocityTickerProps {
    theme: StudioTheme;
}

/**
 * Infinite horizontal discipline marquee whose drift accelerates and shifts direction
 * smoothly with page scroll velocity.
 */
export function MotionVelocityTicker({ theme }: MotionVelocityTickerProps) {
    const shouldReduce = useReducedMotion();
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 350
    });

    const velocityFactor = useTransform(smoothVelocity, [-1800, 0, 1800], [-3.5, 0, 3.5], {
        clamp: true
    });

    const baseX = useMotionValue(0);
    const directionRef = useRef<number>(1);

    useAnimationFrame((_, delta) => {
        if (shouldReduce) return;
        const clampedDelta = Math.min(delta, 48);
        const vFactor = velocityFactor.get();

        if (vFactor < -0.08) {
            directionRef.current = -1;
        } else if (vFactor > 0.08) {
            directionRef.current = 1;
        }

        const baseStep = directionRef.current * -2.2 * (clampedDelta / 1000);
        const velocityBoost = -vFactor * 3.8 * (clampedDelta / 1000);
        let next = baseX.get() + baseStep + velocityBoost;

        if (next <= -50) next += 50;
        if (next > 0) next -= 50;

        baseX.set(next);
    });

    const x = useTransform(baseX, (val) => `${val}%`);

    const renderGroup = (groupKey: string) => (
        <div key={groupKey} className="flex items-center shrink-0">
            {TICKER_ITEMS.map((item, idx) => (
                <div key={`${groupKey}-${idx}`} className="flex items-center shrink-0">
                    <span
                        className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] px-4 sm:px-6 whitespace-nowrap"
                        style={{ color: theme.textMuted }}
                    >
                        {item}
                    </span>
                    <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: theme.accent }}
                    />
                </div>
            ))}
        </div>
    );

    return (
        <div
            aria-hidden="true"
            className="w-full py-2.5 sm:py-3.5 border-b overflow-hidden select-none"
            style={{
                backgroundColor: theme.surfaceAlt,
                borderColor: theme.border
            }}
        >
            {shouldReduce ? (
                <div className="flex items-center overflow-x-auto no-scrollbar">
                    {renderGroup('static')}
                </div>
            ) : (
                <motion.div
                    style={{ x }}
                    className="flex w-max items-center will-change-transform"
                >
                    {renderGroup('copy-a')}
                    {renderGroup('copy-b')}
                </motion.div>
            )}
        </div>
    );
}
