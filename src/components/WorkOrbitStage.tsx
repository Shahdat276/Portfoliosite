"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimationFrame, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, MoveHorizontal } from 'lucide-react';
import { StudioTheme, Project, SiteConfig } from '@/types';
import {
    ArchitecturalGuides,
    SkewMaskReveal,
    playStudioTick
} from './MotionPrimitives';
import { EditorialVisualFrame } from './EditorialVisualFrame';

interface WorkOrbitStageProps {
    theme: StudioTheme;
    projects: Project[];
    siteConfig: SiteConfig;
    openCaseStudy: (slug: string) => void;
    soundEnabled?: boolean;
}

/**
 * Interactive 3D Cylindrical Project Orbit inspired by CodeofSagar WorkOrbit.
 * Supports pointer drag, momentum glide, front/back 3D z-index sorting around
 * the creator portrait, and floating cursor HUD.
 */
export function WorkOrbitStage({
    theme,
    projects,
    siteConfig,
    openCaseStudy,
    soundEnabled = false
}: WorkOrbitStageProps) {
    const shouldReduce = useReducedMotion();
    const stageRef = useRef<HTMLDivElement>(null);

    const [stageWidth, setStageWidth] = useState<number>(1100);
    const [angleDeg, setAngleDeg] = useState<number>(0);
    const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
    const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const targetAngleRef = useRef<number>(0);
    const currentAngleRef = useRef<number>(0);
    const velocityRef = useRef<number>(0);
    const isDraggingRef = useRef<boolean>(false);
    const lastPointerXRef = useRef<number>(0);
    const dragDistanceRef = useRef<number>(0);
    const isHoveringStageRef = useRef<boolean>(false);

    useEffect(() => {
        const updateWidth = () => {
            if (stageRef.current) {
                setStageWidth(stageRef.current.clientWidth);
            }
        };
        updateWidth();
        const observer = new ResizeObserver(updateWidth);
        if (stageRef.current) observer.observe(stageRef.current);
        return () => observer.disconnect();
    }, []);

    // Smooth physics loop: auto-orbit + drag inertia interpolation
    useAnimationFrame((_, delta) => {
        if (shouldReduce) return;
        const dt = Math.min(delta, 48) / 1000;

        if (!isDraggingRef.current) {
            if (Math.abs(velocityRef.current) > 0.05) {
                targetAngleRef.current += velocityRef.current * dt * 60;
                velocityRef.current *= Math.pow(0.92, dt * 60);
            } else if (!isHoveringStageRef.current) {
                // Slow cinematic auto-orbit when idle
                targetAngleRef.current -= dt * 7.5;
            }
        }

        const diff = targetAngleRef.current - currentAngleRef.current;
        if (Math.abs(diff) > 0.01) {
            currentAngleRef.current += diff * Math.min(1, dt * 10);
            setAngleDeg(currentAngleRef.current);
        }
    });

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest('button, a')) return;
        isDraggingRef.current = true;
        setIsDragging(true);
        lastPointerXRef.current = e.clientX;
        dragDistanceRef.current = 0;
        velocityRef.current = 0;
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (stageRef.current) {
            const rect = stageRef.current.getBoundingClientRect();
            setCursorPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }

        if (!isDraggingRef.current) return;
        const dx = e.clientX - lastPointerXRef.current;
        lastPointerXRef.current = e.clientX;
        dragDistanceRef.current += Math.abs(dx);

        if (dragDistanceRef.current > 4 && !e.currentTarget.hasPointerCapture(e.pointerId)) {
            try {
                e.currentTarget.setPointerCapture(e.pointerId);
            } catch {
                // Ignore capture errors cleanly
            }
        }

        const sensitivity = stageWidth < 640 ? 0.36 : 0.24;
        const deltaAngle = dx * sensitivity;
        targetAngleRef.current += deltaAngle;
        velocityRef.current = deltaAngle * 0.45;
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;
        setIsDragging(false);
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            try {
                e.currentTarget.releasePointerCapture(e.pointerId);
            } catch {
                // Ignore release errors cleanly
            }
        }
    };

    const stepOrbit = (direction: 1 | -1) => {
        playStudioTick(soundEnabled, direction > 0 ? 740 : 540);
        const step = 360 / Math.max(projects.length, 1);
        targetAngleRef.current += direction * step;
    };

    const rx = Math.max(135, Math.min(460, stageWidth * 0.36));
    const ry = stageWidth < 640 ? 22 : 44;
    const cardBaseWidth = stageWidth < 640 ? 180 : stageWidth < 1024 ? 260 : 320;
    const total = projects.length;

    // Determine currently front-most centered project
    let frontIndex = 0;
    let maxFrontScore = -2;
    projects.forEach((_, idx) => {
        const theta = ((angleDeg + (idx / total) * 360) * Math.PI) / 180;
        const score = Math.cos(theta);
        if (score > maxFrontScore) {
            maxFrontScore = score;
            frontIndex = idx;
        }
    });
    const frontProject = projects[frontIndex] || projects[0];
    const hoveredProject = projects.find((p) => p.slug === hoveredSlug) || null;

    return (
        <div
            ref={stageRef}
            onPointerEnter={() => {
                isHoveringStageRef.current = true;
            }}
            onPointerLeave={() => {
                isHoveringStageRef.current = false;
                setHoveredSlug(null);
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`relative w-full min-h-[540px] sm:min-h-[650px] lg:min-h-[720px] flex flex-col justify-between overflow-hidden select-none border-b ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
                backgroundColor: theme.bg,
                borderColor: theme.border,
                touchAction: 'pan-y'
            }}
        >
            {/* Subtle Vertical Architectural Hairlines */}
            <ArchitecturalGuides borderColor={theme.border} columns={5} />

            {/* Top Center Massive Editorial Header (Matching CodeofSagar WorkOrbit) */}
            <div className="relative z-20 pt-14 sm:pt-20 px-4 text-center pointer-events-none">
                <span
                    className="font-mono text-[11px] uppercase tracking-[0.24em] block mb-2"
                    style={{ color: theme.accent }}
                >
                    01 / Interactive Reel Showcase
                </span>
                <SkewMaskReveal>
                    <h2 className="font-display text-5xl sm:text-7xl lg:text-[96px] xl:text-[112px] font-medium leading-[0.94] tracking-[-0.05em]">
                        Selected Work
                        <span
                            className="inline-block w-[0.16em] h-[0.16em] rounded-full ml-1 align-baseline"
                            style={{ backgroundColor: theme.accent }}
                        />
                    </h2>
                </SkewMaskReveal>
            </div>

            {/* Central 3D Orbital Stage */}
            <div
                className="relative w-full flex-1 min-h-[340px] sm:min-h-[420px] flex items-center justify-center"
                style={{ perspective: 1400 }}
            >
                {/* Center Portrait / Creator Core Medallion (Cards orbit in front & behind!) */}
                <div
                    className="relative z-[15] flex flex-col items-center pointer-events-none select-none"
                    style={{
                        transform: 'translateY(-14px)'
                    }}
                >
                    <div
                        className="w-36 h-48 sm:w-48 sm:h-64 lg:w-56 lg:h-72 rounded-3xl overflow-hidden border shadow-2xl relative"
                        style={{
                            backgroundColor: theme.surfaceAlt,
                            borderColor: theme.borderStrong
                        }}
                    >
                        {siteConfig.portrait.imageUrl ? (
                            <Image
                                src={siteConfig.portrait.imageUrl}
                                alt={siteConfig.name}
                                fill
                                unoptimized
                                className="object-cover object-top"
                            />
                        ) : null}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15" />
                        <div className="absolute bottom-3 inset-x-3 text-center">
                            <span
                                className="font-mono text-[9px] uppercase tracking-[0.2em] block"
                                style={{ color: theme.accent }}
                            >
                                Director
                            </span>
                            <span className="font-display text-xs sm:text-sm font-semibold text-white">
                                {siteConfig.name}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Orbiting 3D Curved Project Cards */}
                {projects.map((project, idx) => {
                    const deg = angleDeg + (idx / total) * 360;
                    const rad = (deg * Math.PI) / 180;
                    const sin = Math.sin(rad);
                    const cos = Math.cos(rad); // 1 = front-center, -1 = far back

                    const xPx = sin * rx;
                    const yPx = cos * ry + 32; // Front drops smoothly forward below portrait head
                    const scale = 0.52 + 0.5 * ((cos + 1) / 2);
                    const rotateY = sin * -34;
                    const zIndex = cos > 0.08 ? Math.round((cos + 1) * 20) : Math.round((cos + 1) * 8);
                    const opacity = cos < -0.35 ? Math.max(0.28, (cos + 1) * 0.7) : 1;
                    const videoCount = project.galleryVideos ? project.galleryVideos.length : 0;
                    const isFront = idx === frontIndex;

                    return (
                        <div
                            key={project.slug}
                            onPointerEnter={() => setHoveredSlug(project.slug)}
                            onPointerLeave={() => setHoveredSlug(null)}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (dragDistanceRef.current < 8) {
                                    playStudioTick(soundEnabled, 820);
                                    openCaseStudy(project.slug);
                                }
                            }}
                            style={{
                                width: `${cardBaseWidth}px`,
                                zIndex,
                                opacity,
                                borderColor: isFront ? theme.accent : theme.borderStrong,
                                transform: `translate3d(${xPx}px, ${yPx}px, 0) scale(${scale}) perspective(900px) rotateY(${rotateY}deg)`,
                                transition: isDragging ? 'none' : 'opacity 0.25s ease, border-color 0.25s ease'
                            }}
                            className="absolute aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden border shadow-2xl cursor-pointer group will-change-transform"
                        >
                            {project.coverUrl ? (
                                <Image
                                    src={project.coverUrl}
                                    alt={project.title}
                                    fill
                                    unoptimized
                                    draggable={false}
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <EditorialVisualFrame
                                    theme={theme}
                                    index={project.index}
                                    category={project.category}
                                    aspectClass="aspect-[16/10]"
                                    pattern={project.pattern}
                                    isHovered={isFront}
                                />
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                            {/* Card Top Badge */}
                            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                                <span
                                    className="px-2 py-0.5 rounded-md text-[9px] font-mono uppercase tracking-wider bg-black/70 text-white border border-white/15 backdrop-blur-sm"
                                >
                                    {project.index}
                                </span>
                                <span
                                    className="px-2 py-0.5 rounded-md text-[9px] font-mono uppercase tracking-wider text-white border border-white/15 backdrop-blur-sm"
                                    style={{
                                        backgroundColor: isFront ? theme.accent : 'rgba(0,0,0,0.65)'
                                    }}
                                >
                                    {videoCount} {videoCount === 1 ? 'Video' : 'Videos'}
                                </span>
                            </div>

                            {/* Bottom Info */}
                            <div className="absolute bottom-2.5 left-3 right-3 text-white flex items-end justify-between gap-2">
                                <div className="min-w-0">
                                    <p className="font-mono text-[9px] uppercase tracking-wider text-white/70 truncate">
                                        {project.category}
                                    </p>
                                    <p className="font-display text-xs sm:text-sm font-semibold truncate">
                                        {project.title}
                                    </p>
                                </div>
                                <span
                                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    style={{ backgroundColor: theme.accent, color: theme.accentText }}
                                >
                                    <Play className="w-3 h-3 fill-current ml-0.5" />
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bottom Interactive Orbit Control Bar */}
            <div className="relative z-30 pb-6 sm:pb-8 px-5 sm:px-8 flex flex-wrap items-center justify-between gap-3 max-w-[1400px] w-full mx-auto">
                <div className="flex items-center gap-2 text-xs font-mono" style={{ color: theme.textMuted }}>
                    <MoveHorizontal className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                    <span>Drag or click arrows to orbit • Click frame to watch</span>
                </div>

                <div className="flex items-center gap-3">
                    {frontProject && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                playStudioTick(soundEnabled, 820);
                                openCaseStudy(frontProject.slug);
                            }}
                            className="px-3.5 py-1.5 rounded-full border font-mono text-xs font-medium transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center gap-2"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.accent,
                                color: theme.text
                            }}
                        >
                            <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: theme.accent }}
                            />
                            <span className="truncate max-w-[180px] sm:max-w-[260px]">
                                Open {frontProject.title}
                            </span>
                        </button>
                    )}

                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                stepOrbit(1);
                            }}
                            aria-label="Orbit previous work"
                            className="p-2 rounded-full border transition-all hover:opacity-80 active:scale-95 cursor-pointer"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.borderStrong,
                                color: theme.text
                            }}
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                stepOrbit(-1);
                            }}
                            aria-label="Orbit next work"
                            className="p-2 rounded-full border transition-all hover:opacity-80 active:scale-95 cursor-pointer"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.borderStrong,
                                color: theme.text
                            }}
                        >
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* CodeofSagar-style Floating Cursor HUD when Hovering a 3D Card */}
            {hoveredProject && !isDragging && (
                <motion.div
                    aria-hidden="true"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        x: cursorPos.x + 18,
                        y: cursorPos.y + 18
                    }}
                    transition={{ type: 'spring', stiffness: 450, damping: 30, mass: 0.25 }}
                    className="hidden md:flex absolute top-0 left-0 z-50 pointer-events-none px-3.5 py-1.5 rounded-full bg-white text-[#0F0F0F] mix-blend-difference font-mono text-[11px] font-semibold uppercase tracking-wider shadow-xl items-center gap-2 whitespace-nowrap"
                >
                    <span>{hoveredProject.title}</span>
                    <span>•</span>
                    <span>{hoveredProject.galleryVideos?.length || 1} Videos</span>
                </motion.div>
            )}
        </div>
    );
}
