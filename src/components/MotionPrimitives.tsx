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

/** After Effects inspired Speed-Graph cubic-bezier easing curve. */
export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

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
                duration: 0.58,
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

        // Steady base drift + velocity boost mapped smoothly in -50%..0% loop
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
