"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
    motion,
    useAnimationFrame,
    useReducedMotion,
    useScroll
} from 'framer-motion';
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
 * Fullscreen (100svh sticky inside 175svh scroll-pin) 3D Cylindrical Project Orbit
 * matching CodeofSagar WorkOrbit: huge Selected Work. behind transparent PNG cutout,
 * with wide 3D cards orbiting cleanly across chest/waist height so portrait stays clear.
 */
export function WorkOrbitStage({
    theme,
    projects,
    siteConfig,
    openCaseStudy,
    soundEnabled = false
}: WorkOrbitStageProps) {
    const shouldReduce = useReducedMotion();
    const pinRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);

    const [stageWidth, setStageWidth] = useState<number>(1280);
    const [stageHeight, setStageHeight] = useState<number>(800);
    const [angleDeg, setAngleDeg] = useState<number>(0);
    const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
    const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const targetAngleRef = useRef<number>(0);
    const currentAngleRef = useRef<number>(0);
    const scrollOffsetRef = useRef<number>(0);
    const velocityRef = useRef<number>(0);
    const isDraggingRef = useRef<boolean>(false);
    const lastPointerXRef = useRef<number>(0);
    const dragDistanceRef = useRef<number>(0);
    const isHoveringStageRef = useRef<boolean>(false);

    const { scrollYProgress } = useScroll({
        target: pinRef,
        offset: ['start end', 'end start']
    });

    useEffect(() => {
        return scrollYProgress.on('change', (v) => {
            scrollOffsetRef.current = v * 110;
        });
    }, [scrollYProgress]);

    useEffect(() => {
        const updateSize = () => {
            if (stageRef.current) {
                setStageWidth(stageRef.current.clientWidth);
                setStageHeight(stageRef.current.clientHeight);
            }
        };
        updateSize();
        const observer = new ResizeObserver(updateSize);
        if (stageRef.current) observer.observe(stageRef.current);
        return () => observer.disconnect();
    }, []);

    // Physics loop combining scroll scrub rotation + pointer drag inertia + gentle idle spin
    useAnimationFrame((_, delta) => {
        if (shouldReduce) return;
        const dt = Math.min(delta, 48) / 1000;

        if (!isDraggingRef.current) {
            if (Math.abs(velocityRef.current) > 0.05) {
                targetAngleRef.current += velocityRef.current * dt * 60;
                velocityRef.current *= Math.pow(0.92, dt * 60);
            } else if (!isHoveringStageRef.current) {
                targetAngleRef.current -= dt * 6.5;
            }
        }

        const combinedTarget = targetAngleRef.current + scrollOffsetRef.current;
        const diff = combinedTarget - currentAngleRef.current;
        if (Math.abs(diff) > 0.01) {
            currentAngleRef.current += diff * Math.min(1, dt * 11);
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
                // Ignore pointer capture restrictions cleanly
            }
        }

        const sensitivity = stageWidth < 640 ? 0.36 : 0.22;
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

    // Wide full-screen ellipse matching CodeofSagar WorkOrbit spacing
    const rx = Math.max(150, Math.min(720, stageWidth * 0.42));
    const ry = stageWidth < 640 ? 24 : Math.min(56, stageHeight * 0.068);
    const cardBaseWidth = stageWidth < 640 ? 185 : stageWidth < 1024 ? 275 : Math.min(390, stageWidth * 0.24);
    const orbitVerticalOffset = stageWidth < 640 ? 52 : Math.round(stageHeight * 0.08);
    const total = projects.length;

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
        <div ref={pinRef} className="relative w-full h-[175svh] border-b" style={{ borderColor: theme.border }}>
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
                className={`sticky top-0 h-[100svh] w-full flex flex-col justify-between overflow-hidden select-none ${
                    isDragging ? 'cursor-grabbing' : 'cursor-grab'
                }`}
                style={{
                    backgroundColor: theme.bg,
                    touchAction: 'pan-y'
                }}
            >
                {/* Vertical Architectural Hairline Grid */}
                <ArchitecturalGuides borderColor={theme.border} columns={5} />

                {/* Top Giant Headline positioned behind Cutout's Crown (z-[5] < Portrait z-[15]) */}
                <div className="relative z-[5] pt-20 sm:pt-24 lg:pt-24 px-4 text-center pointer-events-none">
                    <SkewMaskReveal>
                        <h2 className="font-display text-5xl sm:text-8xl lg:text-[116px] xl:text-[138px] font-medium leading-[0.88] tracking-[-0.05em]">
                            Selected Work
                            <span
                                className="inline-block w-[0.15em] h-[0.15em] rounded-full ml-1 align-baseline"
                                style={{ backgroundColor: theme.accent }}
                            />
                        </h2>
                    </SkewMaskReveal>
                </div>

                {/* Fullscreen 3D Orbital Arena + Center Transparent Cutout Portrait */}
                <div
                    className="relative w-full flex-1 flex items-center justify-center"
                    style={{ perspective: 1500 }}
                >
                    {/* Transparent Background-Free Director PNG Standing Tall from Bottom (z-[15]) */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[15] pointer-events-none select-none h-[68svh] sm:h-[78svh] lg:h-[82svh] w-[min(86vw,540px)] flex items-end justify-center">
                        <Image
                            src="/images/shahdat-cutout.png"
                            alt={siteConfig.name}
                            fill
                            unoptimized
                            priority
                            className="object-contain object-bottom drop-shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
                        />
                    </div>

                    {/* Wide 3D Curved Orbit Cards (Back Half Behind Cutout, Front Half Across Waist) */}
                    {projects.map((project, idx) => {
                        const deg = angleDeg + (idx / total) * 360;
                        const rad = (deg * Math.PI) / 180;
                        const sin = Math.sin(rad);
                        const cos = Math.cos(rad); // +1 = dead front, -1 = dead back

                        const xPx = sin * rx;
                        const yPx = cos * ry + orbitVerticalOffset;
                        const scale = 0.46 + 0.54 * ((cos + 1) / 2);
                        const rotateY = sin * -36;
                        const rotateX = cos * -3;
                        const zIndex = cos > 0.08 ? Math.round((cos + 1) * 20) : Math.round((cos + 1) * 7);
                        const opacity = cos < -0.35 ? Math.max(0.24, (cos + 1) * 0.65) : 1;
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
                                    borderColor: isFront ? theme.accent : 'rgba(255,255,255,0.14)',
                                    transform: `translate3d(${xPx}px, ${yPx}px, 0) scale(${scale}) perspective(1100px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
                                    transition: isDragging ? 'none' : 'opacity 0.25s ease, border-color 0.25s ease'
                                }}
                                className="absolute aspect-[16/10] rounded-lg sm:rounded-xl overflow-hidden border shadow-[0_24px_60px_rgba(0,0,0,0.45)] cursor-pointer group will-change-transform bg-black"
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

                                {/* Clean Minimal Hover Vignette + Title Reveal */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span
                                        className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider text-white border border-white/20 backdrop-blur-sm"
                                        style={{ backgroundColor: theme.accent }}
                                    >
                                        {videoCount} {videoCount === 1 ? 'Video' : 'Videos'}
                                    </span>
                                </div>
                                <div className="absolute bottom-2.5 left-3 right-3 text-white flex items-center justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="font-display text-xs sm:text-sm font-semibold truncate">
                                        {project.title}
                                    </p>
                                    <span
                                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: theme.accent, color: theme.accentText }}
                                    >
                                        <Play className="w-3 h-3 fill-current ml-0.5" />
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Floating Orbit Controls Bar */}
                <div className="relative z-40 pb-5 sm:pb-7 px-5 sm:px-8 flex flex-wrap items-center justify-between gap-3 w-full max-w-[1680px] mx-auto pointer-events-none">
                    <div
                        className="pointer-events-auto hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md font-mono text-[11px]"
                        style={{
                            backgroundColor: theme.isDark ? 'rgba(15,15,15,0.75)' : 'rgba(236,233,227,0.82)',
                            borderColor: theme.border,
                            color: theme.textMuted
                        }}
                    >
                        <MoveHorizontal className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                        <span>Drag, scroll, or click any film to open</span>
                    </div>

                    <div className="pointer-events-auto flex items-center gap-2.5 ml-auto">
                        {frontProject && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    playStudioTick(soundEnabled, 820);
                                    openCaseStudy(frontProject.slug);
                                }}
                                className="px-3.5 py-1.5 rounded-full border backdrop-blur-md font-mono text-xs font-medium transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center gap-2 shadow-lg"
                                style={{
                                    backgroundColor: theme.isDark ? 'rgba(23,22,21,0.88)' : 'rgba(255,255,255,0.9)',
                                    borderColor: theme.accent,
                                    color: theme.text
                                }}
                            >
                                <span
                                    className="w-1.5 h-1.5 rounded-full shrink-0"
                                    style={{ backgroundColor: theme.accent }}
                                />
                                <span className="truncate max-w-[175px] sm:max-w-[260px]">
                                    {frontProject.title}
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
                                className="p-2 rounded-full border backdrop-blur-md transition-all hover:opacity-80 active:scale-95 cursor-pointer shadow-lg"
                                style={{
                                    backgroundColor: theme.isDark ? 'rgba(23,22,21,0.88)' : 'rgba(255,255,255,0.9)',
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
                                className="p-2 rounded-full border backdrop-blur-md transition-all hover:opacity-80 active:scale-95 cursor-pointer shadow-lg"
                                style={{
                                    backgroundColor: theme.isDark ? 'rgba(23,22,21,0.88)' : 'rgba(255,255,255,0.9)',
                                    borderColor: theme.borderStrong,
                                    color: theme.text
                                }}
                            >
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* CodeofSagar-style Floating Cursor HUD */}
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
        </div>
    );
}
