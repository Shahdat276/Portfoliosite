"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    motion,
    useReducedMotion,
    useScroll
} from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import * as THREE from 'three';
import { StudioTheme, Project, SiteConfig } from '@/types';
import {
    ArchitecturalGuides,
    SkewMaskReveal,
    playStudioTick
} from './MotionPrimitives';

interface WorkOrbitStageProps {
    theme: StudioTheme;
    projects: Project[];
    siteConfig: SiteConfig;
    openCaseStudy: (slug: string) => void;
    focusedCategory?: string | null;
    soundEnabled?: boolean;
}

/**
 * 3D Cylindrical Project Orbit in Three.js WebGL
 * Inspired by the reference 3D cylinder ribbon video:
 * - Real 3D continuous circular cylinder ring rotating 360° around Shahdat's body
 * - Authentic mathematically curved thumbnail panels (CylinderGeometry)
 * - Tilted elevated perspective showing the open circular rim and depth
 * - Drag scrubbing, hover HUD, click-to-open case study, and category focus
 */
export function WorkOrbitStage({
    theme,
    projects,
    siteConfig: _siteConfig,
    openCaseStudy,
    focusedCategory,
    soundEnabled = false
}: WorkOrbitStageProps) {
    void _siteConfig;
    const shouldReduce = useReducedMotion();
    const pinRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
    const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState<boolean>(false);

    // Animation & interaction refs
    const targetAngleRef = useRef<number>(0);
    const currentAngleRef = useRef<number>(0);
    const scrollOffsetRef = useRef<number>(0);
    const velocityRef = useRef<number>(0);
    const isDraggingRef = useRef<boolean>(false);
    const pointerStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const dragDistanceRef = useRef<number>(0);
    const hoveredSlugRef = useRef<string | null>(null);

    // Three.js object refs
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cylinderGroupRef = useRef<THREE.Group | null>(null);
    const cardMeshesRef = useRef<THREE.Mesh[]>([]);
    const texturesRef = useRef<Map<string, THREE.CanvasTexture>>(new Map());
    const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());
    const animFrameRef = useRef<number | null>(null);
    const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
    const pointerRef = useRef<THREE.Vector2>(new THREE.Vector2(-999, -999));

    const { scrollYProgress } = useScroll({
        target: pinRef,
        offset: ['start end', 'end start']
    });

    useEffect(() => {
        return scrollYProgress.on('change', (v) => {
            scrollOffsetRef.current = v * 2.2;
        });
    }, [scrollYProgress]);

    // Handle focused category selection
    useEffect(() => {
        if (!focusedCategory || focusedCategory === 'All') return;
        const targetIdx = projects.findIndex((p) => p.category === focusedCategory);
        if (targetIdx < 0) return;
        const total = Math.max(projects.length, 1);
        const desiredBase = -((targetIdx / total) * Math.PI * 2);
        targetAngleRef.current = desiredBase - scrollOffsetRef.current;
        velocityRef.current = 0;
    }, [focusedCategory, projects]);

    // Helper: redraw texture for a specific project
    const redrawCardTexture = useCallback((slug: string) => {
        const project = projects.find((p) => p.slug === slug);
        if (!project) return;
        const tex = texturesRef.current.get(slug);
        if (!tex) return;

        const canvas = tex.image as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const isHovered = hoveredSlugRef.current === slug;
        renderCanvasCard(ctx, canvas.width, canvas.height, project, isHovered, theme, imageCacheRef.current);
        tex.needsUpdate = true;
    }, [projects, theme]);

    // Preload project cover images locally
    useEffect(() => {
        projects.forEach((p) => {
            if (p.coverUrl && !imageCacheRef.current.has(p.coverUrl)) {
                const img = new window.Image();
                img.src = p.coverUrl;
                img.onload = () => {
                    imageCacheRef.current.set(p.coverUrl!, img);
                    redrawCardTexture(p.slug);
                };
            }
        });
    }, [projects, redrawCardTexture]);

    // Step orbit by one project
    const stepOrbit = (direction: 1 | -1) => {
        playStudioTick(soundEnabled, direction > 0 ? 740 : 540);
        const total = Math.max(projects.length, 1);
        const step = (Math.PI * 2) / total;
        targetAngleRef.current += direction * step;
    };

    // Initialize Three.js Scene
    useEffect(() => {
        const stage = stageRef.current;
        const canvas = canvasRef.current;
        if (!stage || !canvas) return;

        const width = stage.clientWidth || 1280;
        const height = stage.clientHeight || 800;
        const isMobile = width < 640;

        // Scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
        camera.position.set(0, 0, isMobile ? 9.2 : 10.6);
        camera.lookAt(0, isMobile ? -0.4 : -0.35, 0);
        cameraRef.current = camera;

        // WebGL Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;
        rendererRef.current = renderer;

        // Avatar Plane in the Center of 3D World (standing tall at center)
        const textureLoader = new THREE.TextureLoader();
        const avatarTex = textureLoader.load('/images/shahdat-avatar.png', () => {
            avatarTex.colorSpace = THREE.SRGBColorSpace;
            avatarTex.needsUpdate = true;
        });

        const avatarHeight = isMobile ? 4.9 : 5.8;
        const avatarWidth = avatarHeight * (4 / 5);
        const avatarGeo = new THREE.PlaneGeometry(avatarWidth, avatarHeight);
        const avatarMat = new THREE.MeshBasicMaterial({
            map: avatarTex,
            transparent: true,
            alphaTest: 0.12, // Discard transparent pixels so back cards show through
            depthWrite: true,
            depthTest: true,
            side: THREE.DoubleSide
        });
        const avatarMesh = new THREE.Mesh(avatarGeo, avatarMat);
        avatarMesh.position.set(0, isMobile ? -0.45 : -0.38, 0);
        avatarMesh.renderOrder = 10;
        scene.add(avatarMesh);

        // Cylinder Orbit Group (contains the rotating 3D curved cards)
        const cylinderGroup = new THREE.Group();
        // Lower vertical position so front arc passes across waist/belt
        cylinderGroup.position.set(0, isMobile ? -1.05 : -1.08, 0);
        // Tilt forward by 17.5° to reveal the open circular cylinder rim
        cylinderGroup.rotation.x = THREE.MathUtils.degToRad(17.5);
        scene.add(cylinderGroup);
        cylinderGroupRef.current = cylinderGroup;

        // Geometry & Dimensions of Curved Cylinder Panels
        const total = Math.max(projects.length, 1);
        const R = isMobile ? 3.4 : 4.25; // True circular cylinder radius
        const H = isMobile ? 1.55 : 1.95; // Card height
        const slotAngle = (Math.PI * 2) / total;
        const cardArc = slotAngle * 0.76; // Card arc length with breathing gaps between

        const cardMeshes: THREE.Mesh[] = [];
        cardMeshesRef.current = cardMeshes;

        // Top & Bottom Glowing Orbital Guide Rails (matching reference video cylinder ribbon)
        const railPoints: THREE.Vector3[] = [];
        const railSegments = 120;
        for (let i = 0; i <= railSegments; i++) {
            const a = (i / railSegments) * Math.PI * 2;
            railPoints.push(new THREE.Vector3(Math.sin(a) * R, 0, Math.cos(a) * R));
        }
        const railGeo = new THREE.BufferGeometry().setFromPoints(railPoints);
        const railMat = new THREE.LineBasicMaterial({
            color: new THREE.Color(theme.accent),
            transparent: true,
            opacity: 0.38
        });
        const topRail = new THREE.LineLoop(railGeo, railMat);
        topRail.position.y = H / 2 + 0.03;
        const bottomRail = new THREE.LineLoop(railGeo, railMat);
        bottomRail.position.y = -H / 2 - 0.03;
        cylinderGroup.add(topRail);
        cylinderGroup.add(bottomRail);

        // Build authentic curved cylinder geometry for each card
        projects.forEach((project, idx) => {
            const cardGeo = new THREE.CylinderGeometry(
                R,
                R,
                H,
                24, // 24 radial segments: ultra-smooth cylindrical curvature
                1,
                true, // open-ended
                -cardArc / 2, // centered around 0
                cardArc
            );

            // Create 2D offscreen canvas for high-res card texture
            const canvasTex = document.createElement('canvas');
            canvasTex.width = 1024;
            canvasTex.height = 640;
            const ctx = canvasTex.getContext('2d');
            if (ctx) {
                renderCanvasCard(ctx, 1024, 640, project, false, theme, imageCacheRef.current);
            }

            const texture = new THREE.CanvasTexture(canvasTex);
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.generateMipmaps = true;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texturesRef.current.set(project.slug, texture);

            const cardMat = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                side: THREE.DoubleSide,
                depthWrite: true,
                depthTest: true
            });

            const cardMesh = new THREE.Mesh(cardGeo, cardMat);
            // Rotate each card around the cylinder perimeter
            cardMesh.rotation.y = idx * slotAngle;
            cardMesh.userData = { slug: project.slug, index: idx };
            cylinderGroup.add(cardMesh);
            cardMeshes.push(cardMesh);
        });

        // Resize Observer
        const handleResize = () => {
            if (!stage || !camera || !renderer) return;
            const w = stage.clientWidth || 1280;
            const h = stage.clientHeight || 800;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        const resizeObs = new ResizeObserver(handleResize);
        resizeObs.observe(stage);

        // Animation Loop (60-120fps continuous smooth 360 rotation)
        let lastTime = performance.now();
        const renderLoop = (time: number) => {
            const dt = Math.min((time - lastTime) / 1000, 0.05);
            lastTime = time;

            if (!shouldReduce && !isDraggingRef.current) {
                if (Math.abs(velocityRef.current) > 0.001) {
                    targetAngleRef.current += velocityRef.current * dt * 60;
                    velocityRef.current *= Math.pow(0.92, dt * 60);
                } else if (!hoveredSlugRef.current) {
                    // Continuous gentle auto-spin
                    targetAngleRef.current -= dt * 0.22;
                }
            }

            const combinedTarget = targetAngleRef.current + scrollOffsetRef.current;
            const diff = combinedTarget - currentAngleRef.current;
            if (Math.abs(diff) > 0.0001) {
                currentAngleRef.current += diff * Math.min(1, dt * 10);
            }

            if (cylinderGroupRef.current) {
                cylinderGroupRef.current.rotation.y = currentAngleRef.current;
            }

            renderer.render(scene, camera);
            animFrameRef.current = requestAnimationFrame(renderLoop);
        };
        animFrameRef.current = requestAnimationFrame(renderLoop);

        // Cleanup
        return () => {
            resizeObs.disconnect();
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
            renderer.dispose();
            avatarGeo.dispose();
            avatarMat.dispose();
            railGeo.dispose();
            railMat.dispose();
            cardMeshes.forEach((mesh) => {
                mesh.geometry.dispose();
                if (Array.isArray(mesh.material)) {
                    mesh.material.forEach((m) => m.dispose());
                } else {
                    mesh.material.dispose();
                }
            });
        };
    }, [projects, shouldReduce, theme]);

    // Update hovered slug & trigger texture refresh for border highlights
    useEffect(() => {
        hoveredSlugRef.current = hoveredSlug;
        projects.forEach((p) => redrawCardTexture(p.slug));
    }, [hoveredSlug, projects, redrawCardTexture]);

    // Pointer Interaction Handlers
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest('button, a')) return;
        isDraggingRef.current = true;
        setIsDragging(true);
        dragDistanceRef.current = 0;
        pointerStartRef.current = { x: e.clientX, y: e.clientY };
        velocityRef.current = 0;

        try {
            e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
            // Ignore capture errors cleanly
        }
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const stage = stageRef.current;
        if (!stage) return;
        const rect = stage.getBoundingClientRect();
        const curX = e.clientX - rect.left;
        const curY = e.clientY - rect.top;
        setCursorPos({ x: curX, y: curY });

        if (isDraggingRef.current) {
            const dx = e.clientX - pointerStartRef.current.x;
            const dy = e.clientY - pointerStartRef.current.y;
            dragDistanceRef.current = Math.hypot(dx, dy);

            const width = stage.clientWidth || 1280;
            const deltaRad = (dx / width) * 2.8;
            targetAngleRef.current += deltaRad;
            velocityRef.current = deltaRad * 0.45;
            pointerStartRef.current = { x: e.clientX, y: e.clientY };
            return;
        }

        // Raycasting for card hover
        if (!cameraRef.current || cardMeshesRef.current.length === 0) return;
        pointerRef.current.x = (curX / rect.width) * 2 - 1;
        pointerRef.current.y = -(curY / rect.height) * 2 + 1;

        raycasterRef.current.setFromCamera(pointerRef.current, cameraRef.current);
        const hits = raycasterRef.current.intersectObjects(cardMeshesRef.current);

        if (hits.length > 0) {
            const slug = hits[0].object.userData.slug;
            if (hoveredSlug !== slug) {
                setHoveredSlug(slug);
            }
        } else if (hoveredSlug !== null) {
            setHoveredSlug(null);
        }
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

        // Click detection via raycasting
        if (dragDistanceRef.current < 8 && cameraRef.current) {
            const stage = stageRef.current;
            if (!stage) return;
            const rect = stage.getBoundingClientRect();
            pointerRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            pointerRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            raycasterRef.current.setFromCamera(pointerRef.current, cameraRef.current);
            const hits = raycasterRef.current.intersectObjects(cardMeshesRef.current);
            if (hits.length > 0) {
                const slug = hits[0].object.userData.slug;
                playStudioTick(soundEnabled, 820);
                openCaseStudy(slug);
            }
        }
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
                    hoveredSlugRef.current = null;
                    setHoveredSlug(null);
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className={`sticky top-0 h-[100svh] w-full flex flex-col justify-between overflow-hidden select-none ${
                    isDragging ? 'cursor-grabbing' : hoveredSlug ? 'cursor-pointer' : 'cursor-grab'
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

                {/* Fullscreen Three.js WebGL 3D Cylinder Orbit Canvas (z-[10]) */}
                <div className="absolute inset-0 z-[10] flex items-center justify-center pointer-events-auto">
                    <canvas ref={canvasRef} className="w-full h-full block" />
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

/**
 * Renders high-definition card texture onto an offscreen 2D canvas:
 * - Rounded OLED curved glass silhouette
 * - High-contrast project cover image
 * - Cylindrical specular gloss and top rim sheen
 * - Bold typography, category label, and video counter pill
 * - Glowing accent border on hover
 */
function renderCanvasCard(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    project: Project,
    isHovered: boolean,
    theme: StudioTheme,
    imageCache: Map<string, HTMLImageElement>
) {
    ctx.clearRect(0, 0, width, height);

    const pad = 12;
    const innerW = width - pad * 2;
    const innerH = height - pad * 2;
    const radius = 32;

    // Rounded card mask
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(pad, pad, innerW, innerH, radius);
    ctx.clip();

    // Base background
    ctx.fillStyle = '#080808';
    ctx.fillRect(pad, pad, innerW, innerH);

    // Draw project cover image
    const img = project.coverUrl ? imageCache.get(project.coverUrl) : undefined;
    if (img && img.complete) {
        ctx.drawImage(img, pad, pad, innerW, innerH);
    } else {
        // Geometric studio placeholder
        const grad = ctx.createLinearGradient(pad, pad, innerW, innerH);
        grad.addColorStop(0, '#1a1816');
        grad.addColorStop(0.5, '#121110');
        grad.addColorStop(1, '#080808');
        ctx.fillStyle = grad;
        ctx.fillRect(pad, pad, innerW, innerH);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        for (let i = 0; i < innerW; i += 40) {
            ctx.fillRect(pad + i, pad, 1, innerH);
        }
    }

    // Cylindrical curved glass sheen (specular lighting along cylinder curvature)
    const sheenGrad = ctx.createLinearGradient(pad, pad, pad + innerW, pad);
    sheenGrad.addColorStop(0, 'rgba(0, 0, 0, 0.40)');
    sheenGrad.addColorStop(0.2, 'rgba(255, 255, 255, 0.06)');
    sheenGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.14)');
    sheenGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0.06)');
    sheenGrad.addColorStop(1, 'rgba(0, 0, 0, 0.40)');
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(pad, pad, innerW, innerH);

    // Top rim specular highlight line
    const topRimGrad = ctx.createLinearGradient(pad, pad, pad + innerW, pad);
    topRimGrad.addColorStop(0, 'transparent');
    topRimGrad.addColorStop(0.25, 'rgba(255, 255, 255, 0.5)');
    topRimGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
    topRimGrad.addColorStop(0.75, 'rgba(255, 255, 255, 0.5)');
    topRimGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = topRimGrad;
    ctx.fillRect(pad, pad, innerW, 3.5);

    // Bottom dark vignette for typography legibility
    const textVignette = ctx.createLinearGradient(pad, pad + innerH * 0.48, pad, pad + innerH);
    textVignette.addColorStop(0, 'transparent');
    textVignette.addColorStop(1, 'rgba(0, 0, 0, 0.88)');
    ctx.fillStyle = textVignette;
    ctx.fillRect(pad, pad + innerH * 0.48, innerW, innerH * 0.52);

    // Top-Right Pill: Video count badge
    const videoCount = project.galleryVideos?.length || 1;
    const pillText = `${videoCount} ${videoCount === 1 ? 'VIDEO' : 'VIDEOS'}`;
    const pillW = 126;
    const pillH = 34;
    const pillX = pad + innerW - pillW - 20;
    const pillY = pad + 20;

    ctx.fillStyle = theme.accent;
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, 17);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(pillText, pillX + pillW / 2, pillY + pillH / 2);

    // Bottom-Left: Category & Title
    ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
    ctx.font = '600 14px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillText(project.category.toUpperCase(), pad + 28, pad + innerH - 58);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 28px "Inter", system-ui, sans-serif';
    ctx.fillText(project.title, pad + 28, pad + innerH - 24);

    ctx.restore();

    // Glowing Bezel Border (accent on hover, clean glass border on normal)
    ctx.beginPath();
    ctx.roundRect(pad, pad, innerW, innerH, radius);
    ctx.lineWidth = isHovered ? 6 : 3;
    ctx.strokeStyle = isHovered ? theme.accent : 'rgba(255, 255, 255, 0.32)';
    ctx.stroke();
}
