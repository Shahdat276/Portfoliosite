"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
    motion,
    useAnimationFrame,
    useInView,
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
 * Fullscreen 3D Cylindrical Project Orbit around Shahdat's body:
 * - Pristine high-resolution avatar with perfect native aspect ratio and deep drop-shadow
 * - Upright / straight ("soja") 3D cylinder ring positioned cleanly at mid-torso/waist
 * - Subtle 2.5° perspective tilt ("halka baka") so cards wrap 360° around the body
 * - Curved OLED display thumbnails with rounded corners, specular glass reflections, and glowing borders
 * - Drag scrubbing, hover pause, cursor HUD, click-to-open case study, and audio ticks
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
    const isInView = useInView(stageRef, { amount: 0.05 });
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [stageWidth, setStageWidth] = useState<number>(1280);
    const [stageHeight, setStageHeight] = useState<number>(800);
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
            scrollOffsetRef.current = v * 90;
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

    // 3D Cylinder Orbit Proportions: Straight & Upright ("soja") with subtle depth ("halka baka")
    const isMobile = stageWidth < 640;
    const isTablet = stageWidth >= 640 && stageWidth < 1024;

    const rx = isMobile
        ? stageWidth * 0.40
        : isTablet
        ? Math.min(460, stageWidth * 0.38)
        : Math.min(540, stageWidth * 0.38);

    const rz = isMobile
        ? 180
        : isTablet
        ? Math.min(360, rx * 0.82)
        : Math.min(440, rx * 0.82);

    const tiltDeg = isMobile ? 2.0 : 2.5;
    const tiltRad = (tiltDeg * Math.PI) / 180;

    const cardBaseWidth = isMobile
        ? 210
        : isTablet
        ? 280
        : Math.min(340, stageWidth * 0.23);

    const orbitVerticalOffset = isMobile
        ? Math.round(stageHeight * 0.08)
        : Math.round(stageHeight * 0.07);

    const total = projects.length;

    // Direct GPU DOM update -> 0 React re-renders per animation frame
    const applyOrbitTransforms = useCallback(
        (degValue: number) => {
            const count = Math.max(projects.length, 1);
            for (let idx = 0; idx < projects.length; idx++) {
                const el = cardRefs.current[idx];
                if (!el) continue;
                const project = projects[idx];
                const deg = degValue + (idx / count) * 360;
                const rad = (deg * Math.PI) / 180;
                const sin = Math.sin(rad);
                const cos = Math.cos(rad);

                const xPx = sin * rx;
                const yPx = cos * rz * Math.sin(tiltRad) + orbitVerticalOffset;
                const zPx = cos * rz;
                const rotateY = -sin * 54;
                const rotateX = -cos * tiltDeg;

                const isFront = cos > 0.05;
                const zIndex = isFront
                    ? Math.round(20 + cos * 15)
                    : Math.round(3 + (cos + 1) * 3);
                const opacity = cos < -0.3 ? Math.max(0.45, (cos + 1) * 0.85) : 1;
                const brightness = cos < 0 ? Math.max(0.75, 1 + cos * 0.25) : 1;
                const isCardHovered = hoveredCardRef.current === project.slug;

                el.style.zIndex = String(zIndex);
                el.style.opacity = String(opacity);
                el.style.filter = `brightness(${isCardHovered ? 1.06 : brightness})`;
                el.style.borderColor = isCardHovered
                    ? theme.accent
                    : isFront
                    ? 'rgba(255,255,255,0.32)'
                    : 'rgba(255,255,255,0.12)';
                el.style.transform = `translate3d(${xPx}px, ${yPx}px, ${zPx}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)${
                    isCardHovered ? ' scale(1.04)' : ''
                }`;
            }
        },
        [projects, rx, rz, tiltDeg, tiltRad, orbitVerticalOffset, theme.accent]
    );

    useEffect(() => {
        applyOrbitTransforms(currentAngleRef.current);
    }, [applyOrbitTransforms, hoveredSlug]);

    // Smooth continuous rotation loop (pauses completely when off-screen)
    useAnimationFrame((_, delta) => {
        if (shouldReduce || !isInView) return;
        const dt = Math.min(delta, 48) / 1000;

        if (!isDraggingRef.current) {
            if (Math.abs(velocityRef.current) > 0.05) {
                targetAngleRef.current += velocityRef.current * dt * 60;
                velocityRef.current *= Math.pow(0.92, dt * 60);
            } else if (!hoveredCardRef.current) {
                targetAngleRef.current -= dt * 13;
            }
        }

        const combinedTarget = targetAngleRef.current + scrollOffsetRef.current;
        const diff = combinedTarget - currentAngleRef.current;
        if (Math.abs(diff) > 0.01) {
            currentAngleRef.current += diff * Math.min(1, dt * 11);
            applyOrbitTransforms(currentAngleRef.current);
        }
    });

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest('button, a')) return;
        isDraggingRef.current = true;
        setIsDragging(true);
        dragDistanceRef.current = 0;
        lastPointerXRef.current = e.clientX;
        velocityRef.current = 0;

        try {
            e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
            // Ignore capture errors
        }
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const rect = stageRef.current?.getBoundingClientRect();
        if (rect) {
            setCursorPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }

        if (!isDraggingRef.current) return;
        const deltaX = e.clientX - lastPointerXRef.current;
        lastPointerXRef.current = e.clientX;
        dragDistanceRef.current += Math.abs(deltaX);

        const deltaAngle = (deltaX / Math.max(stageWidth, 1)) * 160;
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
                // Ignore release errors
            }
        }
    };

    const stepOrbit = (direction: 1 | -1) => {
        playStudioTick(soundEnabled, direction > 0 ? 740 : 540);
        const step = 360 / Math.max(projects.length, 1);
        targetAngleRef.current += direction * step;
    };

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

                {/* Headline Positioned High Behind 3D Arena */}
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

                {/* Fullscreen 3D Orbital Arena (z-[10]) */}
                <div
                    className="absolute inset-0 z-[10] flex items-center justify-center pointer-events-auto"
                    style={{ perspective: 1200 }}
                >
                    {/* Subtle Orbital Guide Ring Rail */}
                    <div
                        aria-hidden="true"
                        className="absolute pointer-events-none rounded-[50%] border"
                        style={{
                            width: `${rx * 2}px`,
                            height: `${rz * 2}px`,
                            borderColor: theme.accent,
                            opacity: 0.18,
                            transform: `translate3d(0, ${orbitVerticalOffset}px, 0) rotateX(${90 - tiltDeg}deg)`
                        }}
                    />

                    {/* Pristine Razor-Sharp Original Avatar (z-[15]) */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[15] pointer-events-none select-none h-[78svh] sm:h-[86svh] lg:h-[90svh] w-[min(94vw,620px)] flex items-end justify-center">
                        <Image
                            src="/images/shahdat-avatar.png"
                            alt={siteConfig.name}
                            fill
                            unoptimized
                            priority
                            className="object-contain object-bottom drop-shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
                        />
                    </div>

                    {/* True 3D Cylinder Orbit Cards: 360° around body */}
                    {projects.map((project, idx) => {
                        const deg = (idx / total) * 360;
                        const rad = (deg * Math.PI) / 180;
                        const sin = Math.sin(rad);
                        const cos = Math.cos(rad);

                        const xPx = sin * rx;
                        const yPx = cos * rz * Math.sin(tiltRad) + orbitVerticalOffset;
                        const zPx = cos * rz;
                        const rotateY = -sin * 54;
                        const rotateX = -cos * tiltDeg;

                        const isFront = cos > 0.05;
                        const zIndex = isFront
                            ? Math.round(20 + cos * 15)
                            : Math.round(3 + (cos + 1) * 3);
                        const opacity = cos < -0.3 ? Math.max(0.45, (cos + 1) * 0.85) : 1;
                        const brightness = cos < 0 ? Math.max(0.75, 1 + cos * 0.25) : 1;

                        const videoCount = project.galleryVideos ? project.galleryVideos.length : 0;
                        const isCardHovered = hoveredSlug === project.slug;

                        return (
                            <div
                                key={project.slug}
                                ref={(el) => {
                                    cardRefs.current[idx] = el;
                                }}
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
                                    filter: `brightness(${isCardHovered ? 1.06 : brightness})`,
                                    borderColor: isCardHovered
                                        ? theme.accent
                                        : isFront
                                        ? 'rgba(255,255,255,0.32)'
                                        : 'rgba(255,255,255,0.12)',
                                    transform: `translate3d(${xPx}px, ${yPx}px, ${zPx}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)${
                                        isCardHovered ? ' scale(1.04)' : ''
                                    }`,
                                    transition: isDragging
                                        ? 'none'
                                        : 'border-color 0.25s ease'
                                }}
                                className="absolute aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border shadow-[0_18px_40px_rgba(0,0,0,0.6)] cursor-pointer group will-change-transform bg-black"
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

                                {/* Cylindrical Curved OLED Glass Sheen & Specular Lighting */}
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 pointer-events-none rounded-[inherit] bg-gradient-to-r from-black/25 via-white/[0.10] to-black/25"
                                />
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-x-0 top-0 h-[2.5px] pointer-events-none bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-90"
                                />
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-x-0 bottom-0 h-[1.5px] pointer-events-none bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-60"
                                />

                                {/* Video Count Pill */}
                                <div className="absolute top-3 right-3 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                                    <span
                                        className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-white border border-white/20 shadow-md"
                                        style={{ backgroundColor: theme.accent }}
                                    >
                                        {videoCount} {videoCount === 1 ? 'Video' : 'Videos'}
                                    </span>
                                </div>

                                {/* Bottom Title Bar Overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white flex items-center justify-between gap-2">
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-mono text-white/70 uppercase tracking-wider truncate">
                                            {project.category}
                                        </p>
                                        <p className="font-display text-xs sm:text-sm font-semibold truncate">
                                            {project.title}
                                        </p>
                                    </div>
                                    <span
                                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform"
                                        style={{ backgroundColor: theme.accent, color: theme.accentText }}
                                    >
                                        <Play className="w-3 h-3 fill-current ml-0.5" />
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Minimal Discreet Bottom-Right Arrows */}
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
