"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
    motion,
    useAnimationFrame,
    useReducedMotion,
    useScroll
} from 'framer-motion';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
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
    focusedCategory?: string | null;
    soundEnabled?: boolean;
}

/**
 * Fullscreen (100svh sticky inside 175svh scroll-pin) 3D Cylindrical Project Orbit
 * matching CodeofSagar WorkOrbit: continuous orbital motion until hovering a thumbnail card,
 * wide screen-spanning curved thumbnails, and centered background-free cutout portrait.
 */
export function WorkOrbitStage({
    theme,
    projects,
    siteConfig,
    openCaseStudy,
    focusedCategory,
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
    const hoveredCardRef = useRef<string | null>(null);

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
        if (!focusedCategory || focusedCategory === 'All') return;
        const targetIdx = projects.findIndex((p) => p.category === focusedCategory);
        if (targetIdx < 0) return;
        const desiredBase = -((targetIdx / Math.max(projects.length, 1)) * 360);
        targetAngleRef.current = desiredBase - scrollOffsetRef.current;
        velocityRef.current = 0;
    }, [focusedCategory, projects]);

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

    // Physics loop: continuously animates unless dragging OR cursor is directly over a thumbnail
    useAnimationFrame((_, delta) => {
        if (shouldReduce) return;
        const dt = Math.min(delta, 48) / 1000;

        if (!isDraggingRef.current) {
            if (Math.abs(velocityRef.current) > 0.05) {
                targetAngleRef.current += velocityRef.current * dt * 60;
                velocityRef.current *= Math.pow(0.92, dt * 60);
            } else if (!hoveredCardRef.current) {
                targetAngleRef.current -= dt * 13.5;
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

    // Centered full-page 3D ellipse matching CodeofSagar WorkOrbit (middle of screen)
    const rx = stageWidth < 640
        ? stageWidth * 0.44
        : Math.min(880, stageWidth * 0.48);
    const ry = stageWidth < 640
        ? 34
        : Math.min(86, stageHeight * 0.10);
    const cardBaseWidth = stageWidth < 640
        ? 220
        : stageWidth < 1024
        ? 350
        : Math.min(540, stageWidth * 0.31);
    // Orbit is placed right in the middle of the screen
    const orbitVerticalOffset = stageWidth < 640
        ? 6
        : Math.round(stageHeight * -0.015);
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
    const hoveredProject = projects.find((p) => p.slug === hoveredSlug) || null;

    return (
        <div
            ref={pinRef}
            className="relative w-full h-[175svh] border-b"
            style={{ borderColor: theme.border }}
        >
            <div
                ref={stageRef}
                onPointerLeave={() => {
                    hoveredCardRef.current = null;
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

                {/* Headline Positioned High at User-Marked Line, Emerging Behind Hair (z-[1] < Arena z-[10]) */}
                <div className="absolute top-[8svh] sm:top-[8.5svh] lg:top-[9svh] inset-x-0 z-[1] px-4 text-center pointer-events-none">
                    <SkewMaskReveal>
                        <h2 className="font-display text-5xl sm:text-8xl lg:text-[124px] xl:text-[150px] font-medium leading-[0.88] tracking-[-0.05em]">
                            Selected Work
                            <span
                                className="inline-block w-[0.15em] h-[0.15em] rounded-full ml-1 align-baseline"
                                style={{ backgroundColor: theme.accent }}
                            />
                        </h2>
                    </SkewMaskReveal>
                </div>

                {/* Fullscreen 3D Orbital Arena Centered Vertically in Middle of Viewport (z-[10]) */}
                <div
                    className="absolute inset-0 z-[10] flex items-center justify-center pointer-events-auto"
                    style={{ perspective: 1200 }}
                >
                    {/* Transparent 3D Stylized Character Centerpiece Standing Tall from Bottom (z-[10]) */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[10] pointer-events-none select-none h-[78svh] sm:h-[86svh] lg:h-[90svh] w-[min(94vw,760px)] flex items-end justify-center">
                        <Image
                            src="/images/shahdat-avatar.png"
                            alt={siteConfig.name}
                            fill
                            unoptimized
                            priority
                            className="object-contain object-bottom drop-shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
                        />
                    </div>

                    {/* Wide 3D Curved Orbit Cards */}
                    {projects.map((project, idx) => {
                        const deg = angleDeg + (idx / total) * 360;
                        const rad = (deg * Math.PI) / 180;
                        const sin = Math.sin(rad);
                        const cos = Math.cos(rad); // +1 = dead front, -1 = far distant back

                        const xPx = sin * rx;
                        const yPx = cos * ry + orbitVerticalOffset + sin * 22;
                        const scale = 0.28 + 0.72 * ((cos + 1) / 2);
                        const rotateY = sin * -44;
                        const rotateX = cos * -4;
                        const rotateZ = sin * 3.5;
                        const zIndex = cos > 0.05
                            ? Math.round((cos + 1) * 20) + 12
                            : Math.round((cos + 1) * 4) + 1;
                        const opacity = cos < -0.45 ? Math.max(0.26, (cos + 1) * 0.7) : 1;
                        const videoCount = project.galleryVideos ? project.galleryVideos.length : 0;
                        const isFront = idx === frontIndex;
                        const isCardHovered = hoveredSlug === project.slug;

                        return (
                            <div
                                key={project.slug}
                                onPointerEnter={() => {
                                    hoveredCardRef.current = project.slug;
                                    setHoveredSlug(project.slug);
                                }}
                                onPointerLeave={() => {
                                    if (hoveredCardRef.current === project.slug) {
                                        hoveredCardRef.current = null;
                                    }
                                    setHoveredSlug((prev) => (prev === project.slug ? null : prev));
                                }}
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
                                    borderColor: isCardHovered
                                        ? theme.accent
                                        : isFront
                                        ? 'rgba(255,255,255,0.28)'
                                        : 'rgba(255,255,255,0.12)',
                                    transform: `translate3d(${xPx}px, ${yPx}px, 0) scale(${
                                        isCardHovered ? scale * 1.03 : scale
                                    }) perspective(950px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
                                    transition: isDragging
                                        ? 'none'
                                        : 'opacity 0.25s ease, border-color 0.25s ease'
                                }}
                                className="absolute aspect-[16/10] rounded-md sm:rounded-lg overflow-hidden border shadow-[0_28px_70px_rgba(0,0,0,0.5)] cursor-pointer group will-change-transform bg-black"
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

                                {/* Subtle Hover Overlay & Play Pill */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span
                                        className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider text-white border border-white/20 backdrop-blur-sm"
                                        style={{ backgroundColor: theme.accent }}
                                    >
                                        {videoCount} {videoCount === 1 ? 'Video' : 'Videos'}
                                    </span>
                                </div>
                                <div className="absolute bottom-3 left-3.5 right-3.5 text-white flex items-center justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

                {/* Minimal Discreet Bottom-Right Arrows (No Heavy Bar Blocking Center Stage) */}
                <div className="absolute bottom-4 right-5 sm:bottom-6 sm:right-8 z-40 flex items-center gap-1.5">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            stepOrbit(1);
                        }}
                        aria-label="Orbit previous work"
                        className="p-2.5 rounded-full border backdrop-blur-md transition-all hover:opacity-80 active:scale-95 cursor-pointer shadow-lg"
                        style={{
                            backgroundColor: theme.isDark ? 'rgba(23,22,21,0.72)' : 'rgba(255,255,255,0.8)',
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
                        className="p-2.5 rounded-full border backdrop-blur-md transition-all hover:opacity-80 active:scale-95 cursor-pointer shadow-lg"
                        style={{
                            backgroundColor: theme.isDark ? 'rgba(23,22,21,0.72)' : 'rgba(255,255,255,0.8)',
                            borderColor: theme.borderStrong,
                            color: theme.text
                        }}
                    >
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* CodeofSagar-style Floating Cursor HUD on Thumbnail Hover */}
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
