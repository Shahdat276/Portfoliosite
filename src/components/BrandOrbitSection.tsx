"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
    useInView,
    useReducedMotion,
    useAnimationFrame
} from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { StudioTheme, ExperienceItem, SoftwareTool } from '@/types';
import { SOFTWARE_TOOLS } from '@/data/skills';
import { SoftwareIcon } from './SoftwareIcon';
import {
    ArchitecturalGuides,
    SkewMaskReveal,
    playStudioTick
} from './MotionPrimitives';

const TOOL_GLOW_COLORS: Record<string, string> = {
    Pr: '#9999FF',
    Ae: '#D291FF',
    Ps: '#31A8FF',
    Ai: '#FF9A00',
    DR: '#00E676',
    C4D: '#00A3E0',
    BL: '#EA7600',
    '3ds': '#00D2D2',
    My: '#00B4B4'
};

interface BrandOrbitSectionProps {
    theme: StudioTheme;
    experiences: ExperienceItem[];
    soundEnabled?: boolean;
}

/**
 * Interactive trusted-brands scroll parallax rows + 120fps GPU-composited orbital tool dial
 * with calibrated radial mastery gauge, targeting beam, and weighted drag inertia.
 */
export function BrandOrbitSection({
    theme,
    experiences,
    soundEnabled = false
}: BrandOrbitSectionProps) {
    const [activeDial, setActiveDial] = useState({ idx: 0, beamAngle: 0 });
    const [autoTour, setAutoTour] = useState(true);
    const [isDragging, setIsDragging] = useState(false);

    const activeToolIdx = activeDial.idx;
    const beamAngle = activeDial.beamAngle;
    const totalTools = SOFTWARE_TOOLS.length;
    const activeTool: SoftwareTool = SOFTWARE_TOOLS[activeToolIdx] || SOFTWARE_TOOLS[0];
    const activeGlow = theme.isDark
        ? TOOL_GLOW_COLORS[activeTool.code] || theme.accent
        : theme.accent;

    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const shouldReduce = useReducedMotion();
    const isInView = useInView(scrollAreaRef, { amount: 0.15 });

    // Pure GPU MotionValues -> zero React re-renders per animation frame
    const orbitDeg = useMotionValue(0);
    const counterDeg = useTransform(orbitDeg, (v) => -v);
    const counterRingDeg = useTransform(orbitDeg, (v) => -v * 0.55);

    const rawTiltX = useMotionValue(0);
    const rawTiltY = useMotionValue(0);
    const dialTiltX = useSpring(rawTiltX, { stiffness: 150, damping: 24, mass: 0.4 });
    const dialTiltY = useSpring(rawTiltY, { stiffness: 150, damping: 24, mass: 0.4 });

    const speedRef = useRef(13);
    const velocityRef = useRef(0);
    const isStageHoveredRef = useRef(false);
    const isNodeHoveredRef = useRef(false);
    const isDraggingRef = useRef(false);
    const lastPointerAngleRef = useRef(0);
    const dragDistanceRef = useRef(0);

    const selectTool = useCallback(
        (nextIdx: number, playAudio: boolean, pauseTour: boolean) => {
            const normalized = ((nextIdx % totalTools) + totalTools) % totalTools;
            if (playAudio) {
                playStudioTick(soundEnabled, 700 + normalized * 28);
            }
            if (pauseTour) {
                setAutoTour(false);
            }
            setActiveDial((prev) => {
                const stepAngle = 360 / totalTools;
                let deltaIdx = (normalized - prev.idx + totalTools) % totalTools;
                if (deltaIdx > totalTools / 2) deltaIdx -= totalTools;
                return {
                    idx: normalized,
                    beamAngle: prev.beamAngle + deltaIdx * stepAngle
                };
            });
        },
        [soundEnabled, totalTools]
    );

    // Gentle auto-tour spotlight when visible and idle
    useEffect(() => {
        if (!autoTour || shouldReduce || !isInView) return;
        const id = window.setInterval(() => {
            if (isStageHoveredRef.current || isNodeHoveredRef.current || isDraggingRef.current) {
                return;
            }
            setActiveDial((prev) => ({
                idx: (prev.idx + 1) % totalTools,
                beamAngle: prev.beamAngle + 360 / totalTools
            }));
        }, 3800);
        return () => window.clearInterval(id);
    }, [autoTour, shouldReduce, isInView, totalTools]);

    const getPointerAngle = useCallback((clientX: number, clientY: number) => {
        if (!ringRef.current) return 0;
        const rect = ringRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI;
    }, []);

    useAnimationFrame((_, delta) => {
        if (shouldReduce || !isInView) return;
        const dt = Math.min(delta / 1000, 0.05);

        if (isDraggingRef.current) return;

        if (Math.abs(velocityRef.current) > 0.04) {
            orbitDeg.set(orbitDeg.get() + velocityRef.current * dt * 60);
            velocityRef.current *= Math.pow(0.93, dt * 60);
            return;
        }

        // Smooth velocity damping for fluid camera-lens deceleration on hover
        const targetSpeed = isNodeHoveredRef.current
            ? 0
            : isStageHoveredRef.current
            ? 3.2
            : 13.5;
        speedRef.current += (targetSpeed - speedRef.current) * Math.min(1, dt * 6.5);

        if (Math.abs(speedRef.current) > 0.02) {
            orbitDeg.set(orbitDeg.get() + speedRef.current * dt);
        }
    });

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        isDraggingRef.current = true;
        setIsDragging(true);
        velocityRef.current = 0;
        dragDistanceRef.current = 0;
        lastPointerAngleRef.current = getPointerAngle(e.clientX, e.clientY);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (ringRef.current) {
            const rect = ringRef.current.getBoundingClientRect();
            const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
            const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
            rawTiltX.set(Math.max(-1, Math.min(1, ny)) * -6);
            rawTiltY.set(Math.max(-1, Math.min(1, nx)) * 6);
        }

        if (!isDraggingRef.current) return;
        const currentAngle = getPointerAngle(e.clientX, e.clientY);
        let diff = currentAngle - lastPointerAngleRef.current;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        dragDistanceRef.current += Math.abs(diff);

        if (dragDistanceRef.current > 3 && !e.currentTarget.hasPointerCapture(e.pointerId)) {
            try {
                e.currentTarget.setPointerCapture(e.pointerId);
            } catch {
                // Ignore capture restrictions
            }
        }

        orbitDeg.set(orbitDeg.get() + diff);
        velocityRef.current = diff * 0.42;
        lastPointerAngleRef.current = currentAngle;
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;
        setIsDragging(false);
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            try {
                e.currentTarget.releasePointerCapture(e.pointerId);
            } catch {
                // Ignore release errors
            }
        }
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
            className="relative py-12 sm:py-14 lg:py-20 border-b overflow-hidden"
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

                {/* Interactive Studio Tool Pipeline Stage */}
                <div
                    className="relative rounded-3xl border p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center overflow-hidden"
                    style={{
                        backgroundColor: theme.surface,
                        borderColor: theme.border
                    }}
                >
                    {/* Subtle dynamic ambient glow linked to active tool */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full blur-[110px] opacity-15 transition-colors duration-700"
                        style={{ backgroundColor: activeGlow }}
                    />

                    {/* Left 5 Cols: Active Tool Telemetry & Controls */}
                    <div className="lg:col-span-5 space-y-6 relative z-10">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <span
                                className="font-mono text-[11px] uppercase tracking-[0.2em] flex items-center gap-2"
                                style={{ color: theme.accent }}
                            >
                                <span
                                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                                    style={{ backgroundColor: activeGlow }}
                                />
                                Studio Pipeline • Dial
                            </span>

                            {/* Auto-Tour Toggle & Stepper Controls */}
                            <div className="flex items-center gap-1.5">
                                <button
                                    type="button"
                                    onClick={() => {
                                        playStudioTick(soundEnabled, 660);
                                        setAutoTour((prev) => !prev);
                                    }}
                                    className="px-2.5 py-1 rounded-full border font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer hover:opacity-85"
                                    style={{
                                        backgroundColor: theme.surfaceAlt,
                                        borderColor: autoTour ? theme.accent : theme.borderStrong,
                                        color: autoTour ? theme.accent : theme.textMuted
                                    }}
                                    aria-label={autoTour ? 'Pause auto tour' : 'Resume auto tour'}
                                >
                                    {autoTour ? (
                                        <>
                                            <Pause className="w-2.5 h-2.5" />
                                            <span>Auto</span>
                                        </>
                                    ) : (
                                        <>
                                            <Play className="w-2.5 h-2.5" />
                                            <span>Paused</span>
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => selectTool(activeToolIdx - 1, true, true)}
                                    aria-label="Previous tool"
                                    className="p-1.5 rounded-full border transition-colors hover:opacity-80 cursor-pointer"
                                    style={{
                                        backgroundColor: theme.surfaceAlt,
                                        borderColor: theme.borderStrong,
                                        color: theme.text
                                    }}
                                >
                                    <ChevronLeft className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => selectTool(activeToolIdx + 1, true, true)}
                                    aria-label="Next tool"
                                    className="p-1.5 rounded-full border transition-colors hover:opacity-80 cursor-pointer"
                                    style={{
                                        backgroundColor: theme.surfaceAlt,
                                        borderColor: theme.borderStrong,
                                        color: theme.text
                                    }}
                                >
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        {/* Index + Tier Badge + Smooth Animated Title */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTool.code}
                                initial={shouldReduce ? false : { opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={shouldReduce ? undefined : { opacity: 0, y: -8 }}
                                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                                className="space-y-2.5"
                            >
                                <div className="flex items-center gap-2.5">
                                    <span
                                        className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-md border"
                                        style={{
                                            borderColor: theme.borderStrong,
                                            color: theme.textMuted
                                        }}
                                    >
                                        {String(activeToolIdx + 1).padStart(2, '0')} / {String(totalTools).padStart(2, '0')}
                                    </span>
                                    {activeTool.level && (
                                        <span
                                            className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-semibold"
                                            style={{
                                                backgroundColor: theme.accentSoft,
                                                color: theme.accent
                                            }}
                                        >
                                            {activeTool.level}
                                        </span>
                                    )}
                                </div>

                                <h3 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight leading-[1.1]">
                                    {activeTool.name}
                                </h3>
                                <p
                                    className="font-mono text-xs uppercase tracking-wider"
                                    style={{ color: theme.textMuted }}
                                >
                                    {activeTool.category} — {activeTool.role}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Segmented Studio Mastery Telemetry Meter */}
                        <div className="space-y-2.5 pt-1">
                            <div className="flex items-center justify-between font-mono text-xs">
                                <span style={{ color: theme.textMuted }}>Studio Mastery</span>
                                <span className="font-semibold tabular-nums" style={{ color: theme.accent }}>
                                    {activeTool.proficiency}%
                                </span>
                            </div>
                            <div
                                className="relative h-2.5 w-full rounded-full overflow-hidden border"
                                style={{
                                    backgroundColor: theme.surfaceAlt,
                                    borderColor: theme.border
                                }}
                            >
                                <motion.div
                                    initial={false}
                                    animate={{ width: `${activeTool.proficiency}%` }}
                                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                                    className="h-full rounded-full"
                                    style={{
                                        background: `linear-gradient(90deg, ${theme.accent}, ${activeGlow})`
                                    }}
                                />
                            </div>
                            <div
                                className="flex justify-between font-mono text-[9px] uppercase tracking-wider opacity-60"
                                style={{ color: theme.textMuted }}
                            >
                                <span>0%</span>
                                <span>25%</span>
                                <span>50%</span>
                                <span>75%</span>
                                <span>100%</span>
                            </div>
                        </div>

                        <p className="text-xs font-mono" style={{ color: theme.textMuted }}>
                            Drag dial to spin • Hover icon to lock • Click to inspect
                        </p>
                    </div>

                    {/* Right 7 Cols: 120fps GPU Concentric Orbital Dial + 3D Mouse Tilt */}
                    <div
                        className="lg:col-span-7 flex items-center justify-center py-4"
                        style={{ perspective: 1000 }}
                    >
                        <motion.div
                            ref={ringRef}
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onPointerCancel={handlePointerUp}
                            onPointerEnter={() => {
                                isStageHoveredRef.current = true;
                            }}
                            onPointerLeave={() => {
                                isStageHoveredRef.current = false;
                                isNodeHoveredRef.current = false;
                                isDraggingRef.current = false;
                                setIsDragging(false);
                                rawTiltX.set(0);
                                rawTiltY.set(0);
                            }}
                            style={shouldReduce ? undefined : { rotateX: dialTiltX, rotateY: dialTiltY }}
                            className={`relative w-full max-w-[440px] aspect-square flex items-center justify-center select-none will-change-transform ${
                                isDragging ? 'cursor-grabbing' : 'cursor-grab'
                            }`}
                        >
                            {/* Rotating GPU Orbital Layer (Zero React re-renders per frame) */}
                            <motion.div
                                style={shouldReduce ? undefined : { rotate: orbitDeg }}
                                className="absolute inset-0 pointer-events-none will-change-transform"
                            >
                                {/* Calibrated Cinema Dial SVG Track + Degree Ticks */}
                                <svg
                                    viewBox="0 0 420 420"
                                    className="w-full h-full pointer-events-none"
                                    aria-hidden="true"
                                >
                                    <circle
                                        cx="210"
                                        cy="210"
                                        r="176.4"
                                        fill="none"
                                        stroke={theme.borderStrong}
                                        strokeWidth="1"
                                        strokeDasharray="4 6"
                                    />
                                    {Array.from({ length: 36 }).map((_, tickIdx) => {
                                        const deg = tickIdx * 10 - 90;
                                        const rad = (deg * Math.PI) / 180;
                                        const isMajor = tickIdx % 4 === 0;
                                        const rInner = isMajor ? 191 : 194;
                                        const rOuter = 199;
                                        const x1 = Number((210 + rInner * Math.cos(rad)).toFixed(2));
                                        const y1 = Number((210 + rInner * Math.sin(rad)).toFixed(2));
                                        const x2 = Number((210 + rOuter * Math.cos(rad)).toFixed(2));
                                        const y2 = Number((210 + rOuter * Math.sin(rad)).toFixed(2));
                                        return (
                                            <line
                                                key={tickIdx}
                                                x1={x1}
                                                y1={y1}
                                                x2={x2}
                                                y2={y2}
                                                stroke={isMajor ? theme.accent : theme.borderStrong}
                                                strokeOpacity={isMajor ? 0.65 : 0.45}
                                                strokeWidth={isMajor ? 1.5 : 1}
                                                strokeLinecap="round"
                                            />
                                        );
                                    })}
                                </svg>

                                {/* Locked Targeting Beam Pointing Directly to Active Orbiting Tool */}
                                <motion.div
                                    initial={false}
                                    animate={{ rotate: beamAngle }}
                                    transition={{ type: 'spring', stiffness: 190, damping: 24, mass: 0.65 }}
                                    className="absolute inset-0 pointer-events-none"
                                >
                                    <div
                                        className="absolute left-1/2 bottom-1/2 -translate-x-1/2 w-[1.5px] origin-bottom rounded-full"
                                        style={{
                                            height: '42%',
                                            background: `linear-gradient(to top, ${activeGlow}99 0%, ${activeGlow}44 72%, transparent 100%)`
                                        }}
                                    />
                                    {!shouldReduce && (
                                        <motion.div
                                            animate={{ bottom: ['58%', '89%'], opacity: [0, 1, 0] }}
                                            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
                                            className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                                            style={{
                                                backgroundColor: activeGlow,
                                                boxShadow: `0 0 10px ${activeGlow}`
                                            }}
                                        />
                                    )}
                                </motion.div>

                                {/* 9 Orbiting Software Nodes anchored statically to circle & counter-rotated smoothly */}
                                {SOFTWARE_TOOLS.map((tool, idx) => {
                                    const angleDeg = (idx / totalTools) * 360 - 90;
                                    const angleRad = (angleDeg * Math.PI) / 180;
                                    const radiusPct = 42;
                                    const leftPct = (50 + radiusPct * Math.cos(angleRad)).toFixed(3);
                                    const topPct = (50 + radiusPct * Math.sin(angleRad)).toFixed(3);
                                    const isSelected = idx === activeToolIdx;
                                    const nodeGlow = theme.isDark
                                        ? TOOL_GLOW_COLORS[tool.code] || theme.accent
                                        : theme.accent;

                                    return (
                                        <div
                                            key={tool.code}
                                            style={{
                                                left: `${leftPct}%`,
                                                top: `${topPct}%`,
                                                transform: 'translate(-50%, -50%)'
                                            }}
                                            className="absolute z-20 pointer-events-auto"
                                        >
                                            <motion.div
                                                style={shouldReduce ? undefined : { rotate: counterDeg }}
                                                className="will-change-transform"
                                            >
                                                <button
                                                    type="button"
                                                    onPointerEnter={() => {
                                                        isNodeHoveredRef.current = true;
                                                    }}
                                                    onPointerLeave={() => {
                                                        isNodeHoveredRef.current = false;
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (dragDistanceRef.current < 5) {
                                                            selectTool(idx, true, true);
                                                        }
                                                    }}
                                                    style={{
                                                        backgroundColor: isSelected ? theme.accent : theme.surfaceAlt,
                                                        borderColor: isSelected ? theme.accent : theme.borderStrong,
                                                        boxShadow: isSelected
                                                            ? `0 0 24px ${nodeGlow}55`
                                                            : undefined
                                                    }}
                                                    title={`${tool.name} (${tool.proficiency}%)`}
                                                    aria-label={`Inspect ${tool.name} (${tool.proficiency}%)`}
                                                    className={`group relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border flex items-center justify-center transition-[transform,border-color,background-color,box-shadow] duration-200 ease-out cursor-pointer ${
                                                        isSelected
                                                            ? 'scale-[1.16] ring-2 ring-white/25'
                                                            : 'hover:scale-[1.16] hover:border-white/40 shadow-sm'
                                                    }`}
                                                >
                                                    <SoftwareIcon
                                                        code={tool.code}
                                                        className="w-6 h-6 sm:w-7 sm:h-7 pointer-events-none"
                                                    />
                                                </button>
                                            </motion.div>
                                        </div>
                                    );
                                })}
                            </motion.div>

                            {/* Middle Counter-Rotating Reticle Ring */}
                            <motion.div
                                style={
                                    shouldReduce
                                        ? { borderColor: theme.borderStrong }
                                        : { rotate: counterRingDeg, borderColor: theme.borderStrong }
                                }
                                className="absolute inset-[19%] rounded-full border border-dashed opacity-45 pointer-events-none will-change-transform"
                                aria-hidden="true"
                            />

                            {/* Center Studio Core with Radial SVG Mastery Arc */}
                            <div
                                className="relative z-10 w-32 h-32 sm:w-36 sm:h-36 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-md pointer-events-none"
                                style={{ backgroundColor: theme.bg }}
                            >
                                <svg
                                    viewBox="0 0 144 144"
                                    className="absolute inset-0 w-full h-full pointer-events-none"
                                    aria-hidden="true"
                                >
                                    <g transform="rotate(-90 72 72)">
                                        <circle
                                            cx="72"
                                            cy="72"
                                            r="65"
                                            fill="none"
                                            stroke={theme.borderStrong}
                                            strokeOpacity="0.4"
                                            strokeWidth="2"
                                        />
                                        <motion.circle
                                            cx="72"
                                            cy="72"
                                            r="65"
                                            fill="none"
                                            stroke={activeGlow}
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeDasharray={408.41}
                                            initial={false}
                                            animate={{
                                                strokeDashoffset: Number(
                                                    (408.41 * (1 - activeTool.proficiency / 100)).toFixed(2)
                                                )
                                            }}
                                            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                                        />
                                    </g>
                                </svg>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTool.code}
                                        initial={shouldReduce ? false : { scale: 0.85, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={shouldReduce ? undefined : { scale: 0.88, opacity: 0 }}
                                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                        className="flex flex-col items-center justify-center text-center px-2"
                                    >
                                        <SoftwareIcon code={activeTool.code} className="w-9 h-9 mb-1.5" />
                                        <span
                                            className="font-mono text-[10px] uppercase tracking-widest font-semibold tabular-nums"
                                            style={{ color: theme.accent }}
                                        >
                                            {activeTool.code} • {activeTool.proficiency}%
                                        </span>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

