"use client";

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useReducedMotion,
    useAnimationFrame
} from 'framer-motion';
import { StudioTheme, ExperienceItem, SoftwareTool } from '@/types';
import { SOFTWARE_TOOLS } from '@/data/skills';
import { SoftwareIcon } from './SoftwareIcon';
import {
    ArchitecturalGuides,
    SkewMaskReveal,
    RollText,
    playStudioTick
} from './MotionPrimitives';

interface BrandOrbitSectionProps {
    theme: StudioTheme;
    experiences: ExperienceItem[];
    soundEnabled?: boolean;
}

/**
 * Interactive trusted-brands scroll parallax rows + draggable/interactive orbital tool showcase
 * modeled after ClientsSection & ToolOrbit.
 */
export function BrandOrbitSection({
    theme,
    experiences,
    soundEnabled = false
}: BrandOrbitSectionProps) {
    const [activeToolIdx, setActiveToolIdx] = useState(0);
    const activeTool: SoftwareTool = SOFTWARE_TOOLS[activeToolIdx] || SOFTWARE_TOOLS[0];

    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const shouldReduce = useReducedMotion();

    // 360-degree Continuous Animated Orbit
    const [orbitAngle, setOrbitAngle] = useState(0);
    const angleRef = useRef(0);
    const velocityRef = useRef(0);
    const isHoveredRef = useRef(false);
    const isDraggingRef = useRef(false);
    const lastPointerAngleRef = useRef(0);

    const getPointerAngle = useCallback((clientX: number, clientY: number) => {
        if (!ringRef.current) return 0;
        const rect = ringRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI;
    }, []);

    useAnimationFrame((_, delta) => {
        if (shouldReduce) return;
        const dt = Math.min(delta / 1000, 0.1);

        if (isDraggingRef.current) return;

        if (Math.abs(velocityRef.current) > 0.08) {
            angleRef.current = (angleRef.current + velocityRef.current * dt * 60) % 360;
            velocityRef.current *= Math.pow(0.92, dt * 60);
            setOrbitAngle(angleRef.current);
        } else if (!isHoveredRef.current) {
            // Smooth, graceful orbital revolution (~11 deg/sec)
            angleRef.current = (angleRef.current + dt * 11) % 360;
            setOrbitAngle(angleRef.current);
        }
    });

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest('button')) return;
        isDraggingRef.current = true;
        velocityRef.current = 0;
        lastPointerAngleRef.current = getPointerAngle(e.clientX, e.clientY);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDraggingRef.current) return;
        const currentAngle = getPointerAngle(e.clientX, e.clientY);
        let diff = currentAngle - lastPointerAngleRef.current;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        angleRef.current = (angleRef.current + diff) % 360;
        velocityRef.current = diff * 0.45;
        lastPointerAngleRef.current = currentAngle;
        setOrbitAngle(angleRef.current);
    };

    const handlePointerUp = () => {
        isDraggingRef.current = false;
    };

    const { scrollYProgress } = useScroll({
        target: scrollAreaRef,
        offset: ['start end', 'end start']
    });
    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 140,
        damping: 26,
        mass: 0.25
    });

    const row1X = useTransform(smoothScroll, [0, 1], ['2%', '-10%']);

    return (
        <section
            ref={scrollAreaRef}
            className="relative py-16 sm:py-24 lg:py-32 border-b overflow-hidden"
            style={{
                backgroundColor: theme.bg,
                borderColor: theme.border
            }}
        >
            <ArchitecturalGuides borderColor={theme.border} columns={5} />

            <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
                {/* Header */}
                <div className="max-w-3xl mb-12 sm:mb-16">
                    <span
                        className="font-mono text-xs uppercase tracking-[0.22em] block mb-3"
                        style={{ color: theme.accent }}
                    >
                        In Good Company
                    </span>
                    <SkewMaskReveal>
                        <h2 className="font-display text-3xl sm:text-5xl xl:text-6xl font-semibold leading-[1.04] tracking-[-0.04em]">
                            Organizations &amp; Tools{' '}
                            <span className="font-serif-italic font-normal">Behind the Cut.</span>
                        </h2>
                    </SkewMaskReveal>
                    <p className="text-sm sm:text-base mt-4 max-w-xl" style={{ color: theme.textMuted }}>
                        Nine years across corporate broadcast teams, fashion houses, and digital media
                        organizations—driven by an integrated 2D, 3D &amp; finishing software pipeline.
                    </p>
                </div>

                {/* Scroll-Driven Trusted Organizations Row */}
                <div className="mb-14 sm:mb-20 overflow-hidden">
                    <motion.div
                        style={shouldReduce ? undefined : { x: row1X }}
                        className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 will-change-transform"
                    >
                        {experiences.map((exp) => (
                            <div
                                key={exp.id}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl border shrink-0 transition-transform duration-300 hover:-translate-y-1"
                                style={{
                                    backgroundColor: theme.surface,
                                    borderColor: theme.border
                                }}
                            >
                                {exp.logoUrl && (
                                    <div
                                        className={`w-9 h-9 rounded-lg border relative overflow-hidden shrink-0 ${
                                            exp.logoDarkBg ? 'bg-[#171615]' : 'bg-white'
                                        }`}
                                        style={{ borderColor: theme.border }}
                                    >
                                        <Image
                                            src={exp.logoUrl}
                                            alt={exp.organization}
                                            fill
                                            unoptimized
                                            className={
                                                exp.logoDarkBg
                                                    ? 'object-cover'
                                                    : 'object-contain p-1'
                                            }
                                        />
                                    </div>
                                )}
                                <div className="pr-1">
                                    <p className="font-display text-xs sm:text-sm font-semibold whitespace-nowrap">
                                        {exp.organization}
                                    </p>
                                    <p className="font-mono text-[10px]" style={{ color: theme.textMuted }}>
                                        {exp.period.split('(')[0].trim()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Interactive Orbital Tool Stage */}
                <div
                    className="rounded-3xl border p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
                    style={{
                        backgroundColor: theme.surface,
                        borderColor: theme.border
                    }}
                >
                    {/* Left 5 Cols: Active Orbiting Tool Inspector HUD */}
                    <div className="lg:col-span-5 space-y-6">
                        <div>
                            <span
                                className="font-mono text-[11px] uppercase tracking-[0.2em] block mb-2"
                                style={{ color: theme.accent }}
                            >
                                Tools Behind the Vision • Interactive Orbit
                            </span>
                            <h3 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight">
                                <RollText text={activeTool.name} />
                            </h3>
                            <p
                                className="font-mono text-xs uppercase tracking-wider mt-1.5"
                                style={{ color: theme.textMuted }}
                            >
                                {activeTool.category} — {activeTool.role}
                            </p>
                        </div>

                        {/* Live Animated Proficiency Meter */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between font-mono text-xs">
                                <span style={{ color: theme.textMuted }}>Studio Mastery</span>
                                <span className="font-semibold" style={{ color: theme.accent }}>
                                    {activeTool.proficiency}%
                                </span>
                            </div>
                            <div
                                className="h-2 w-full rounded-full overflow-hidden"
                                style={{ backgroundColor: theme.surfaceAlt }}
                            >
                                <motion.div
                                    key={activeTool.code}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${activeTool.proficiency}%` }}
                                    transition={{ duration: 0.65, ease: [0.65, 0, 0.2, 1] }}
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: theme.accent }}
                                />
                            </div>
                        </div>

                        <p className="text-xs font-mono" style={{ color: theme.textMuted }}>
                            Click any orbiting software icon to inspect workflow role and proficiency.
                        </p>
                    </div>

                    {/* Right 7 Cols: Interactive Animated Concentric Orbital Diagram */}
                    <div className="lg:col-span-7 flex items-center justify-center py-4">
                        <div
                            ref={ringRef}
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onPointerCancel={handlePointerUp}
                            onPointerEnter={() => { isHoveredRef.current = true; }}
                            onPointerLeave={() => { isHoveredRef.current = false; isDraggingRef.current = false; }}
                            className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
                        >
                            {/* Outer Orbit Ring (Rotates smoothly in sync with tool revolution) */}
                            <div
                                className="absolute inset-4 rounded-full border border-dashed pointer-events-none transition-transform will-change-transform"
                                style={{
                                    borderColor: theme.borderStrong,
                                    transform: `rotate(${orbitAngle}deg)`
                                }}
                                aria-hidden="true"
                            />
                            {/* Middle Orbit Ring (Gentle counter-spin for visual depth) */}
                            <div
                                className="absolute inset-10 sm:inset-12 rounded-full border border-dashed pointer-events-none transition-transform will-change-transform opacity-35"
                                style={{
                                    borderColor: theme.border,
                                    transform: `rotate(${-orbitAngle * 0.5}deg)`
                                }}
                                aria-hidden="true"
                            />
                            {/* Inner Accent Ring with Subtle Breathing Pulse */}
                            <motion.div
                                animate={shouldReduce ? undefined : { scale: [1, 1.05, 1], opacity: [0.55, 0.95, 0.55] }}
                                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute inset-16 sm:inset-20 rounded-full border pointer-events-none"
                                style={{ borderColor: theme.accent }}
                                aria-hidden="true"
                            />

                            {/* Center Studio Core */}
                            <div
                                className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full border flex flex-col items-center justify-center text-center p-3 shadow-xl backdrop-blur-md pointer-events-none"
                                style={{
                                    backgroundColor: theme.bg,
                                    borderColor: theme.accent
                                }}
                            >
                                <motion.div
                                    key={activeTool.code}
                                    initial={{ scale: 0.82, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                    className="flex flex-col items-center justify-center"
                                >
                                    <SoftwareIcon code={activeTool.code} className="w-8 h-8 mb-1.5" />
                                    <span className="font-mono text-[10px] uppercase tracking-widest font-semibold" style={{ color: theme.accent }}>
                                        {activeTool.code} • {activeTool.proficiency}%
                                    </span>
                                </motion.div>
                            </div>

                            {/* 9 Orbiting Software Nodes revolving in continuous animated orbit */}
                            {SOFTWARE_TOOLS.map((tool, idx) => {
                                const baseDeg = (idx / SOFTWARE_TOOLS.length) * 360 - 90;
                                const currentDeg = baseDeg + orbitAngle;
                                const angleRad = (currentDeg * Math.PI) / 180;
                                const radiusPct = 42;
                                const leftPct = 50 + radiusPct * Math.cos(angleRad);
                                const topPct = 50 + radiusPct * Math.sin(angleRad);
                                const isSelected = idx === activeToolIdx;

                                return (
                                    <button
                                        key={tool.code}
                                        type="button"
                                        onPointerEnter={() => {
                                            isHoveredRef.current = true;
                                        }}
                                        onPointerLeave={() => {
                                            isHoveredRef.current = false;
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            playStudioTick(soundEnabled, 700 + idx * 30);
                                            setActiveToolIdx(idx);
                                        }}
                                        style={{
                                            left: `${leftPct}%`,
                                            top: `${topPct}%`,
                                            transform: 'translate(-50%, -50%)',
                                            backgroundColor: isSelected ? theme.accent : theme.surfaceAlt,
                                            borderColor: isSelected ? theme.accent : theme.borderStrong
                                        }}
                                        title={`${tool.name} (${tool.proficiency}%)`}
                                        className={`absolute z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl border flex items-center justify-center transition-all duration-200 hover:scale-125 shadow-sm cursor-pointer ${
                                            isSelected ? 'scale-115 shadow-[0_0_24px_rgba(255,87,34,0.45)] ring-2 ring-white/20' : 'hover:border-white/40'
                                        }`}
                                    >
                                        <SoftwareIcon code={tool.code} className="w-6 h-6 sm:w-7 sm:h-7 pointer-events-none" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

