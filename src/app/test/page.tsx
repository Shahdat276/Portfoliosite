// @ts-nocheck
"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize2,
    ArrowUpRight,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    Check,
    Copy,
    Download,
    Mail,
    MapPin,
    Menu,
    X,
    Plus,
    Minus,
    SlidersHorizontal,
    Palette,
    Sparkles,
    Film,
    Layers,
    CheckCircle2,
    ExternalLink,
    FileText,
    Clock
} from 'lucide-react';

/**
 * ============================================================================
 * 1. CURATED 4-THEME STUDIO SYSTEM
 * ============================================================================
 * Default: "Editorial Paper" (Light Architectural Luxury)
 * Instant 1-Click switching in the top navigation bar.
 */
const STUDIO_THEMES = {
    paper: {
        id: 'paper',
        name: 'Editorial Paper',
        badge: 'Light Editorial',
        isDark: false,
        bg: '#F7F5F0',
        surface: '#FFFFFF',
        surfaceAlt: '#EFECE6',
        text: '#141413',
        textMuted: '#65625A',
        accent: '#D9381E',
        accentSoft: 'rgba(217, 56, 30, 0.10)',
        accentText: '#FFFFFF',
        border: '#E4E0D8',
        borderStrong: '#CEC8BC',
        swatch: '#D9381E',
        bgSwatch: '#F7F5F0'
    },
    nordic: {
        id: 'nordic',
        name: 'Nordic Minimal',
        badge: 'Cool Gallery',
        isDark: false,
        bg: '#F3F6FA',
        surface: '#FFFFFF',
        surfaceAlt: '#E6ECF5',
        text: '#0F172A',
        textMuted: '#526077',
        accent: '#1D4ED8',
        accentSoft: 'rgba(29, 78, 216, 0.10)',
        accentText: '#FFFFFF',
        border: '#DCE3EE',
        borderStrong: '#C2CEE0',
        swatch: '#1D4ED8',
        bgSwatch: '#F3F6FA'
    },
    desert: {
        id: 'desert',
        name: 'Desert Studio',
        badge: 'Warm Architectural',
        isDark: false,
        bg: '#EFE9DF',
        surface: '#FAF7F2',
        surfaceAlt: '#E4DDD0',
        text: '#1C1917',
        textMuted: '#696259',
        accent: '#B45309',
        accentSoft: 'rgba(180, 83, 9, 0.12)',
        accentText: '#FFFFFF',
        border: '#DCD3C4',
        borderStrong: '#C5B9A5',
        swatch: '#B45309',
        bgSwatch: '#EFE9DF'
    },
    cinema: {
        id: 'cinema',
        name: 'Cinema Gold',
        badge: 'Warm Dark Lounge',
        isDark: true,
        bg: '#11100F',
        surface: '#1A1816',
        surfaceAlt: '#24211E',
        text: '#F5F2EB',
        textMuted: '#A09A90',
        accent: '#D4AF37',
        accentSoft: 'rgba(212, 175, 55, 0.14)',
        accentText: '#11100F',
        border: '#2A2723',
        borderStrong: '#3D3832',
        swatch: '#D4AF37',
        bgSwatch: '#11100F'
    }
};

/**
 * ============================================================================
 * 2. CENTRALIZED SITE CONFIGURATION (/src/config/site.ts)
 * ============================================================================
 */
const INITIAL_SITE_CONFIG = {
    name: 'Shahdat Hossain',
    wordmark: 'SHAHDAT HOSSAIN',
    title: 'Senior Video Editor & Motion Graphics Designer',
    experienceYears: '9+ Years',
    experienceFull: '9+ Years of Professional Experience',
    location: 'Dhaka, Bangladesh',
    currentOrganization: 'Amanat Shah Group (ASG)',
    availabilityText: 'Available for Select Projects & Senior Roles',
    heroPrimaryHeadline: 'Crafting Stories Through Motion.',
    heroSecondaryHeadline: 'VISUALS THAT MOVE PEOPLE.',
    heroIntro:
        "I'm Shahdat Hossain, a Senior Video Editor & Motion Graphics Designer with 9+ years of professional experience transforming ideas into compelling visual experiences.",
    aboutHeadline: 'Creativity Meets Technical Precision.',
    aboutBioParagraphs: [
        "I'm Shahdat Hossain, a Senior Video Editor and Motion Graphics Designer with over 9 years of professional experience in visual storytelling, commercial video production, and creative content development.",
        'My work combines creative thinking, technical precision, and a strong understanding of visual communication. From fashion films and product advertisements to motion graphics and brand campaigns, I enjoy transforming ideas into engaging visual experiences.',
        'I believe great visuals are not just about aesthetics. They are about communication, emotion, and storytelling.'
    ],
    philosophy:
        'Every frame has a reason to exist. I focus on rhythmic pacing, clean visual hierarchy, and emotional resonance—so the audience feels the story before they analyze the technique.',
    creativeApproach:
        'Uniting editorial storytelling, bespoke 2D/3D motion graphics, and cinema-grade color finishing into a cohesive production workflow tailored for commercial impact.',
    showreel: {
        heading: 'Selected Moments. Endless Creativity.',
        supportingText:
            'A collection of visual stories, commercial productions, and motion design experiments.',
        videoUrl: 'https://www.youtube.com/embed/ZVPus_WBp3Q?si=KMrgCrZGMVoH1S3Z',
        duration: '01:48',
        placeholderNote: 'Interactive Showreel Stage — Replace with Official Showreel MP4',
        chapters: [
            { id: '01', label: '01 Commercial', time: '00:00', progress: 18, note: 'TV & Digital Brand Spots' },
            { id: '02', label: '02 Fashion Film', time: '00:28', progress: 44, note: 'Editorial Couture & Rhythm' },
            { id: '03', label: '03 3D Motion', time: '00:56', progress: 72, note: 'Cinema 4D, Blender & After Effects' },
            { id: '04', label: '04 Brand Campaign', time: '01:22', progress: 92, note: 'Integrated Visual Storytelling' }
        ]
    },
    portrait: {
        imageUrl: '', // Paste portrait URL e.g. '/images/shahdat-portrait.jpg'
        placeholderNote: 'Editorial Portrait Placeholder — /public/images/shahdat.jpg'
    },
    contact: {
        email: 'shahdathossain0779@gmail.com',
        whatsapp: '+880 1850-993126',
        linkedin: 'https://linkedin.com',
        behance: 'https://behance.net',
        vimeo: 'https://vimeo.com',
        youtube: 'https://youtube.com',
        cvUrl: '/cv/Shahdat_Hossain_CV.pdf',
        formEndpoint: ''
    }
};

const PROJECT_CATEGORIES = [
    'All',
    'Fashion Films',
    'Commercial Advertisements',
    'Motion Graphics',
    'Product Videos',
    'Brand Campaigns',
    'Social Media Reels',
    'Logo Animation',
    'Animation & Visual Effects'
];

/**
 * ============================================================================
 * 3. PROJECT DATASET (/src/data/projects.ts)
 * Clearly labeled placeholders for all 8 required categories.
 * ============================================================================
 */
const INITIAL_PROJECTS = [
    {
        slug: 'atelier-silence-fashion-film',
        index: '01',
        title: 'Atelier in Motion — Seasonal Fashion Film',
        client: '[Client / Brand Name Placeholder]',
        category: 'Fashion Films',
        year: '[Year]',
        role: 'Senior Video Editor & Colorist',
        gridSpan: 'lg:col-span-7',
        aspectClass: 'aspect-[16/10]',
        palette: ['#D9381E', '#E8D8C8', '#1F1D1A'],
        pattern: 'editorial-arch',
        shortDescription:
            'An editorial fashion film built on tactile fabric movement, rhythmic J-cuts, and warm film-print color grading.',
        overview:
            '[Editable Case Study Overview] Commissioned to present a seasonal collection through atmospheric pacing, architectural framing, and expressive sound design.',
        challenge:
            '[Editable Creative Challenge] Maintaining visual intimacy and fabric texture detail while transitioning seamlessly between studio portraits and kinetic exterior sequences.',
        conceptAndDirection:
            '[Editable Concept & Direction] Inspired by print fashion magazines—combining poised negative space with sudden bursts of rhythmic motion.',
        editingWorkflow:
            'Multi-camera assembly, music stem rearrangement, and frame-accurate pacing in Adobe Premiere Pro.',
        motionGraphicsProcess:
            'Minimalist editorial title cards, credits typography, and subtle split-screen compositions in Adobe After Effects.',
        colorGradingAndFinishing:
            'Custom film-emulation LUT development, skin-tone balancing, and halation finishing in DaVinci Resolve.',
        software: ['Adobe Premiere Pro', 'DaVinci Resolve', 'Adobe After Effects', 'Adobe Photoshop'],
        supportingVisuals: [
            { title: '01 / Opening Title Card', caption: ' minimalist serif kinetic typography over warm studio grain.' },
            { title: '02 / Rhythmic Cut Sequence', caption: 'Multi-frame editorial layout matching garment movement.' },
            { title: '03 / Color Grading Node Tree', caption: 'Warm highlight roll-off and deep shadow preservation in DaVinci Resolve.' },
            { title: '04 / Final Master Frame', caption: '2.39:1 widescreen theatrical delivery frame.' }
        ]
    },
    {
        slug: 'urban-pulse-commercial-spot',
        index: '02',
        title: 'Urban Pulse — Flagship Commercial Production',
        client: '[Client / Brand Name Placeholder]',
        category: 'Commercial Advertisements',
        year: '[Year]',
        role: 'Lead Video Editor & Motion Designer',
        gridSpan: 'lg:col-span-5',
        aspectClass: 'aspect-[4/3]',
        palette: ['#1D4ED8', '#DBEAFE', '#0F172A'],
        pattern: 'kinetic-grid',
        shortDescription:
            'High-impact television and digital commercial structured around match-cuts, dynamic sound design, and clear brand recall.',
        overview:
            '[Editable Case Study Overview] A flagship commercial campaign designed for broadcast TV and digital platforms, uniting fast-paced lifestyle storytelling with crisp motion callouts.',
        challenge:
            '[Editable Creative Challenge] Delivering a complete emotional arc and clear product value proposition within a strict 45-second master and 15-second cutdowns.',
        conceptAndDirection:
            '[Editable Concept & Direction] Seamless visual momentum—using geometric match-cuts to connect diverse locations into one continuous camera movement.',
        editingWorkflow:
            'Three-act commercial story structure, speed-ramping, and broadcast audio mixing in Adobe Premiere Pro.',
        motionGraphicsProcess:
            '3D-tracked callout graphics, lower thirds, and animated end-slate lockups in Adobe After Effects.',
        colorGradingAndFinishing:
            'Broadcast-safe Rec.709 color calibration and high-contrast polish in DaVinci Resolve.',
        software: ['Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve', 'Adobe Illustrator'],
        supportingVisuals: [
            { title: '01 / Storyboard to Edit Match', caption: 'Side-by-side comparison of animatic timing and final cut.' },
            { title: '02 / Motion Callout System', caption: 'Tracked HUD typography integrated into live-action footage.' },
            { title: '03 / Sound & Beat Map', caption: 'Percussive audio stems locked to transition frames.' },
            { title: '04 / Broadcast End-Slate', caption: 'Brand identity lockup animated at 60fps.' }
        ]
    },
    {
        slug: 'kinetic-form-3d-motion-system',
        index: '03',
        title: 'Kinetic Form — 2D/3D Motion Design System',
        client: '[Client / Brand Name Placeholder]',
        category: 'Motion Graphics',
        year: '[Year]',
        role: 'Motion Graphics Designer & 3D Generalist',
        gridSpan: 'lg:col-span-5',
        aspectClass: 'aspect-[4/3]',
        palette: ['#B45309', '#FDE68A', '#1C1917'],
        pattern: 'orbital-rings',
        shortDescription:
            'Modular motion identity combining tactile 3D geometry, procedural lighting, and Swiss kinetic typography.',
        overview:
            '[Editable Case Study Overview] A comprehensive motion design system engineered for brand launches, event screens, and digital broadcast packaging.',
        challenge:
            '[Editable Creative Challenge] Creating a flexible set of 2D and 3D motion templates that maintain sculptural elegance across 16:9, 1:1, and 9:16 ratios.',
        conceptAndDirection:
            '[Editable Concept & Direction] Architectural minimalism meets kinetic physics—warm brushed metals, glass refraction, and crisp typographic grids.',
        editingWorkflow:
            'Animatic timing, sequence assembly, and multi-format mastering in Adobe Premiere Pro.',
        motionGraphicsProcess:
            '3D modeling and cloner dynamics in Cinema 4D and Blender, composited with optical glow and typography in Adobe After Effects.',
        colorGradingAndFinishing:
            'ACES color space management and tonal unification in DaVinci Resolve.',
        software: ['Cinema 4D', 'Blender', 'Adobe After Effects', 'Adobe Illustrator'],
        supportingVisuals: [
            { title: '01 / 3D Clay & Wireframe Pass', caption: 'Procedural geometry setup in Cinema 4D and Blender.' },
            { title: '02 / Shader & Lighting Study', caption: 'Physically based glass and warm metallic surface shaders.' },
            { title: '03 / Kinetic Type Choreography', caption: 'Custom bezier velocity curves in After Effects.' },
            { title: '04 / Multi-Format System', caption: 'Unified visual language across widescreen and vertical formats.' }
        ]
    },
    {
        slug: 'monolith-macro-product-film',
        index: '04',
        title: 'Monolith — Macro Product Advertisement',
        client: '[Client / Brand Name Placeholder]',
        category: 'Product Videos',
        year: '[Year]',
        role: 'Senior Video Editor & CGI Artist',
        gridSpan: 'lg:col-span-7',
        aspectClass: 'aspect-[16/10]',
        palette: ['#0F766E', '#CCFBF1', '#134E4A'],
        pattern: 'macro-prism',
        shortDescription:
            'Luxury product film blending high-speed tabletop cinematography with photorealistic 3D exploded views.',
        overview:
            '[Editable Case Study Overview] Designed to showcase engineering craftsmanship and material finishes through dramatic rim lighting and macro motion control.',
        challenge:
            '[Editable Creative Challenge] Blending live-action macro lens footage seamlessly with full-CG product renders and internal component animations.',
        conceptAndDirection:
            '[Editable Concept & Direction] Sculpting with light—revealing product contours gradually from clean architectural shadows.',
        editingWorkflow:
            'Optical-flow speed ramping and precision micro-cutting in Adobe Premiere Pro.',
        motionGraphicsProcess:
            '3D CAD preparation and rendering in Autodesk 3ds Max and Cinema 4D; multi-pass compositing in After Effects.',
        colorGradingAndFinishing:
            'Specular highlight control and micro-contrast enhancement in DaVinci Resolve.',
        software: ['Adobe Premiere Pro', 'Adobe After Effects', 'Autodesk 3ds Max', 'Cinema 4D'],
        supportingVisuals: [
            { title: '01 / Macro Rim-Light Frame', caption: 'High-contrast studio lighting accentuating surface texture.' },
            { title: '02 / 3D Exploded Assembly', caption: 'Internal product architecture animated in 3ds Max & C4D.' },
            { title: '03 / Speed-Ramp Transition', caption: 'Time-remapped whip pan linking two macro angles.' },
            { title: '04 / Hero Packshot', caption: 'Final retouched and graded hero product presentation.' }
        ]
    },
    {
        slug: 'heritage-horizon-brand-campaign',
        index: '05',
        title: 'Heritage & Horizon — Integrated Brand Campaign',
        client: '[Client / Brand Name Placeholder]',
        category: 'Brand Campaigns',
        year: '[Year]',
        role: 'Senior Video Editor & Visual Storyteller',
        gridSpan: 'lg:col-span-12',
        aspectClass: 'aspect-[21/9]',
        palette: ['#D9381E', '#FDE8E4', '#141413'],
        pattern: 'widescreen-cinema',
        shortDescription:
            'Widescreen brand anthem uniting documentary authenticity, executive storytelling, and refined editorial graphics.',
        overview:
            '[Editable Case Study Overview] An flagship brand campaign film communicating industrial scale, human dedication, and forward-looking vision.',
        challenge:
            '[Editable Creative Challenge] Weaving together multi-day location footage, interviews, and archival material into an inspiring 2-minute narrative.',
        conceptAndDirection:
            '[Editable Concept & Direction] Editorial documentary warmth supported by structured chapter titles and a cinematic orchestral build.',
        editingWorkflow:
            'Narrative story arc construction, dialogue editing, and sound mixing in Adobe Premiere Pro.',
        motionGraphicsProcess:
            'Minimalist chapter supers, infographic callouts, and brand signature animations in After Effects.',
        colorGradingAndFinishing:
            'Shot-to-shot color continuity and widescreen mastering in DaVinci Resolve.',
        software: ['Adobe Premiere Pro', 'DaVinci Resolve', 'Adobe After Effects', 'Adobe Photoshop'],
        supportingVisuals: [
            { title: '01 / Widescreen Chapter Title', caption: 'Editorial typography framing location cinematography.' },
            { title: '02 / Documentary Portrait Grade', caption: 'Natural skin-tone preservation under industrial lighting.' },
            { title: '03 / Data & Scale Graphic', caption: 'Clean architectural motion graphics integrated into aerial footage.' },
            { title: '04 / Campaign Finale Frame', caption: 'Unified brand anthem closing sequence.' }
        ]
    },
    {
        slug: 'vertical-rhythm-social-reels',
        index: '06',
        title: 'Vertical Rhythm — Social Media Video Series',
        client: '[Client / Brand Name Placeholder]',
        category: 'Social Media Reels',
        year: '[Year]',
        role: 'Video Editor & Motion Designer',
        gridSpan: 'lg:col-span-4',
        aspectClass: 'aspect-[4/3]',
        palette: ['#7C3AED', '#EDE9FE', '#1E1B4B'],
        pattern: 'vertical-frames',
        shortDescription:
            'High-retention 9:16 vertical video series crafted with rotoscoped transitions, kinetic captions, and studio polish.',
        overview:
            '[Editable Case Study Overview] A series of short-form vertical productions designed for Instagram Reels, YouTube Shorts, and TikTok without sacrificing luxury brand standards.',
        challenge:
            '[Editable Creative Challenge] Stopping the scroll within 1.5 seconds while maintaining a clean, uncluttered editorial aesthetic.',
        conceptAndDirection:
            '[Editable Concept & Direction] Fast visual hooks, custom masked transitions, and bold typography designed specifically for vertical ergonomics.',
        editingWorkflow:
            'Beat-synced micro-cuts and punchy sound design in Adobe Premiere Pro.',
        motionGraphicsProcess:
            'Rotoscoped object masks and kinetic typography in Adobe After Effects.',
        colorGradingAndFinishing:
            'Vibrant sRGB mobile screen optimization.',
        software: ['Adobe Premiere Pro', 'Adobe After Effects', 'Adobe Photoshop'],
        supportingVisuals: [
            { title: '01 / 9:16 Safe-Zone Grid', caption: 'Ergonomic vertical layout for maximum mobile legibility.' },
            { title: '02 / Rotoscoped Mask Transition', caption: 'Seamless subject foreground wipe.' },
            { title: '03 / Kinetic Caption System', caption: 'Custom animated typography following voiceover cadence.' },
            { title: '04 / Loop Mechanics', caption: 'Frame-accurate end-to-start loop transition.' }
        ]
    },
    {
        slug: 'signature-monogram-logo-animation',
        index: '07',
        title: 'Signature Mark — Bespoke Logo Animation',
        client: '[Client / Brand Name Placeholder]',
        category: 'Logo Animation',
        year: '[Year]',
        role: 'Motion Graphics Designer',
        gridSpan: 'lg:col-span-4',
        aspectClass: 'aspect-[4/3]',
        palette: ['#D97706', '#FEF3C7', '#1C1917'],
        pattern: 'vector-emblem',
        shortDescription:
            'Timeless animated brand ident engineered with custom velocity curves, vector precision, and 3D light sweeps.',
        overview:
            '[Editable Case Study Overview] A signature 5-second animated brand mark created for video intros, broadcast stingers, and digital presentations.',
        challenge:
            '[Editable Creative Challenge] Distilling a brand’s personality into a concise, memorable motion signature.',
        conceptAndDirection:
            '[Editable Concept & Direction] Geometric vector lines unfolding with effortless physics into a dimensional emblem.',
        editingWorkflow:
            'Vector path preparation and layering in Adobe Illustrator.',
        motionGraphicsProcess:
            'Graph-editor velocity choreography in After Effects paired with 3D lighting in Blender.',
        colorGradingAndFinishing:
            'ProRes 4444 alpha channel and multi-aspect ratio delivery.',
        software: ['Adobe After Effects', 'Adobe Illustrator', 'Blender', 'Cinema 4D'],
        supportingVisuals: [
            { title: '01 / Vector Construction Grid', caption: 'Geometric spline preparation in Adobe Illustrator.' },
            { title: '02 / Velocity Graph Curves', caption: 'Custom ease-in/ease-out speed curves in After Effects.' },
            { title: '03 / 3D Specular Light Sweep', caption: 'Subtle dimensional highlight pass.' },
            { title: '04 / Final Lockup Master', caption: 'Delivered in dark, light, and transparent alpha versions.' }
        ]
    },
    {
        slug: 'invisible-world-vfx-compositing',
        index: '08',
        title: 'Invisible Craft — Animation & Visual Effects',
        client: '[Client / Brand Name Placeholder]',
        category: 'Animation & Visual Effects',
        year: '[Year]',
        role: 'VFX Compositor & 3D Artist',
        gridSpan: 'lg:col-span-4',
        aspectClass: 'aspect-[4/3]',
        palette: ['#2563EB', '#DBEAFE', '#0F172A'],
        pattern: 'vfx-wireframe',
        shortDescription:
            '3D camera tracking, set extension, clean-plate reconstruction, and photorealistic CGI compositing.',
        overview:
            '[Editable Case Study Overview] Visual effects production showcasing seamless integration of 3D elements and environmental extensions into live-action plates.',
        challenge:
            '[Editable Creative Challenge] Matching real-world camera lens distortion, directional sunlight, and natural sensor grain.',
        conceptAndDirection:
            '[Editable Concept & Direction] Invisible effects that expand production value while keeping the viewer immersed in the story.',
        editingWorkflow:
            'VFX plate pulls, handle management, and conform in Premiere Pro and DaVinci Resolve.',
        motionGraphicsProcess:
            '3D asset creation in Autodesk Maya and 3ds Max; planar and 3D camera tracking in After Effects.',
        colorGradingAndFinishing:
            'Multi-pass EXR compositing, grain matching, and final color grade in DaVinci Resolve.',
        software: ['Adobe After Effects', 'Autodesk Maya', 'Autodesk 3ds Max', 'DaVinci Resolve'],
        supportingVisuals: [
            { title: '01 / Raw Live-Action Plate', caption: 'Original camera footage with tracking markers.' },
            { title: '02 / 3D Matchmove & Wireframe', caption: 'Solved 3D camera track and proxy geometry.' },
            { title: '03 / Multi-Pass CG Integration', caption: 'Shadow, reflection, and ambient occlusion passes.' },
            { title: '04 / Final Graded Composite', caption: 'Seamless photorealistic master shot.' }
        ]
    }
];

/**
 * ============================================================================
 * 4. 12 CORE CAPABILITIES & 9 SOFTWARE TOOLS (/src/data/skills.ts)
 * ============================================================================
 */
const CORE_CAPABILITIES = [
    { num: '01', title: 'Professional Video Editing', desc: 'Narrative structure, rhythmic pacing, and frame-accurate assembly for commercial and editorial films.' },
    { num: '02', title: 'Motion Graphics Design', desc: 'Bespoke 2D/3D motion systems, kinetic typography, title sequences, and broadcast packages.' },
    { num: '03', title: 'Visual Storytelling', desc: 'Translating complex brand messages into clear, emotionally resonant visual narratives.' },
    { num: '04', title: 'Fashion Film Editing', desc: 'Sensory cutting tailored to silhouette, fabric movement, music tempo, and luxury aesthetics.' },
    { num: '05', title: 'Commercial Video Production', desc: 'High-impact TVCs and digital commercials engineered for audience retention and brand recall.' },
    { num: '06', title: 'Product Advertising', desc: 'Macro tabletop cuts, speed-ramped reveals, and CGI-enhanced product showcases.' },
    { num: '07', title: 'Brand Campaigns', desc: 'Cohesive visual identity and storytelling across hero anthems and multi-platform deliverables.' },
    { num: '08', title: 'Color Grading', desc: 'Look development, shot matching, skin-tone balancing, and cinematic finishing in DaVinci Resolve.' },
    { num: '09', title: 'Visual Effects', desc: '3D camera tracking, rotoscoping, keying, clean-plate cleanup, and seamless compositing.' },
    { num: '10', title: 'Animation', desc: 'Expressive keyframe choreography, logo idents, and 3D scene animation.' },
    { num: '11', title: 'Creative Direction', desc: 'Guiding visual tone, edit supervision, and post-production workflows from brief to master.' },
    { num: '12', title: 'Social Media Content Production', desc: 'High-retention vertical Reels and short-form video series crafted with studio-grade polish.' }
];

const SOFTWARE_TOOLS = [
    { name: 'Adobe Premiere Pro', code: 'Pr', category: 'Editing & Color', role: 'Nonlinear Editing & Timeline Finishing' },
    { name: 'Adobe After Effects', code: 'Ae', category: 'Motion & VFX', role: '2D/3D Motion Graphics & Compositing' },
    { name: 'DaVinci Resolve', code: 'DR', category: 'Editing & Color', role: 'Color Grading & Finishing Pipeline' },
    { name: 'Cinema 4D', code: 'C4D', category: '3D & CGI', role: '3D Motion Design & Procedural Animation' },
    { name: 'Blender', code: 'BL', category: '3D & CGI', role: '3D Modeling, Shading & Rendering' },
    { name: 'Autodesk 3ds Max', code: '3ds', category: '3D & CGI', role: '3D Visualization & Product CGI' },
    { name: 'Autodesk Maya', code: 'My', category: '3D & CGI', role: '3D Animation & VFX Pipeline' },
    { name: 'Adobe Photoshop', code: 'Ps', category: 'Design & Assets', role: 'Styleframes, Retouching & Matte Art' },
    { name: 'Adobe Illustrator', code: 'Ai', category: 'Design & Assets', role: 'Vector Systems & Typography Assets' }
];

/**
 * ============================================================================
 * 5. PROFESSIONAL EXPERIENCE (/src/data/experience.ts)
 * ============================================================================
 */
const INITIAL_EXPERIENCE = [
    {
        id: 'exp-1',
        organization: 'Amanat Shah Group (ASG)',
        role: 'Senior Video Editor & Motion Graphics Designer',
        period: 'Present — [Insert Start Year]',
        status: 'Current Organization',
        location: 'Dhaka, Bangladesh',
        summary:
            'Leading commercial video editing, fashion & textile film production, brand campaign visuals, and motion graphics systems.',
        responsibilities: [
            'Directing end-to-end post-production for commercial campaigns, fashion films, and corporate brand communications.',
            'Designing bespoke 2D/3D motion graphics packages, kinetic typography, and visual identity animations.',
            'Overseeing color grading, audio finishing, and multi-platform mastering across digital and broadcast channels.'
        ],
        contributions: '[Editable Placeholder — Add key campaign milestones & projects at Amanat Shah Group]'
    },
    {
        id: 'exp-2',
        organization: 'Neways International Company Limited',
        role: 'Video Editor & Motion Graphics Designer [Editable Title]',
        period: '[Start Year — End Year]',
        status: 'Previous Experience',
        location: 'Dhaka, Bangladesh',
        summary:
            'Produced commercial video advertisements, promotional campaigns, and motion graphics for digital and corporate channels.',
        responsibilities: [
            'Edited commercial spots, product showcases, and social media video campaigns.',
            'Created custom motion graphics, lower thirds, logo reveals, and visual effects sequences.',
            'Collaborated closely with creative and marketing teams from concept to final delivery.'
        ],
        contributions: '[Editable Placeholder — Add key achievements at Neways International]'
    },
    {
        id: 'exp-3',
        organization: 'Ingenium BD',
        role: 'Video Editor & Motion Designer [Editable Title]',
        period: '[Start Year — End Year]',
        status: 'Previous Experience',
        location: 'Dhaka, Bangladesh',
        summary:
            'Delivered visual storytelling, video editing, and animated motion graphics across diverse client briefs.',
        responsibilities: [
            'Assembled and refined commercial edits, brand stories, and product videos.',
            'Developed 2D and 3D motion design assets using Adobe After Effects and 3D software.'
        ],
        contributions: '[Editable Placeholder — Add key achievements at Ingenium BD]'
    },
    {
        id: 'exp-4',
        organization: 'Computer World',
        role: 'Multimedia & Video Specialist [Editable Title]',
        period: '[Start Year — End Year]',
        status: 'Previous Experience',
        location: 'Bangladesh',
        summary:
            'Focused on digital video production, visual design, and multimedia post-production workflows.',
        responsibilities: [
            'Executed video editing, visual design, and digital media asset preparation.',
            'Supported creative production pipelines across Adobe Creative Cloud applications.'
        ],
        contributions: '[Editable Placeholder — Add key achievements at Computer World]'
    },
    {
        id: 'exp-5',
        organization: 'Dewan ICT Institute',
        role: 'Video Editing & Multimedia Role [Editable Title]',
        period: '[Start Year — End Year]',
        status: 'Previous Experience',
        location: 'Bangladesh',
        summary:
            'Built strong technical and creative foundations in digital media, video editing, and motion design.',
        responsibilities: [
            'Applied core video editing, graphic design, and animation principles across practical projects.',
            'Developed deep fluency in industry-standard post-production software.'
        ],
        contributions: '[Editable Placeholder — Add role details at Dewan ICT Institute]'
    }
];

/**
 * ============================================================================
 * FINE-ART ARCHITECTURAL VISUAL CANVAS COMPONENT
 * Renders clean, gallery-grade kinetic artwork for project thumbnails & stages.
 * ============================================================================
 */
function EditorialVisualFrame({
    theme,
    index = '01',
    category = 'Motion Design',
    aspectClass = 'aspect-[16/10]',
    pattern = 'editorial-arch',
    isHovered = false,
    badgeText = 'Sample Placeholder',
    customAccent = null
}) {
    const accentColor = customAccent || theme.accent;

    return (
        <div
            className={`relative w-full ${aspectClass} overflow-hidden select-none isolate transition-colors duration-500`}
            style={{
                backgroundColor: theme.isDark ? '#161513' : '#EAE5DC'
            }}
        >
            {/* Subtle Architectural Paper/Studio Gradient */}
            <div
                className="absolute inset-0 transition-transform duration-700 ease-out"
                style={{
                    transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                    background: theme.isDark
                        ? `radial-gradient(circle at 75% 25%, ${accentColor}28 0%, transparent 60%), linear-gradient(145deg, #1E1C19 0%, #11100F 100%)`
                        : `radial-gradient(circle at 78% 24%, ${accentColor}1E 0%, transparent 58%), linear-gradient(145deg, ${theme.surface} 0%, ${theme.surfaceAlt} 100%)`
                }}
            />

            {/* Architectural Grid Hairlines */}
            <div
                className="absolute inset-6 border pointer-events-none transition-colors duration-500"
                style={{ borderColor: theme.isDark ? 'rgba(255,255,255,0.07)' : 'rgba(20,20,19,0.07)' }}
            />

            {/* Minimalist Kinetic Sculpture Centerpiece */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {pattern === 'kinetic-grid' ? (
                    <div className="grid grid-cols-3 gap-3 w-2/5 aspect-square">
                        {[...Array(9)].map((_, i) => (
                            <div
                                key={i}
                                className="rounded-sm border transition-all duration-500"
                                style={{
                                    borderColor: i === 4 ? accentColor : theme.borderStrong,
                                    backgroundColor: i === 4 ? accentColor : 'transparent',
                                    transform: isHovered && i % 2 === 0 ? 'scale(0.9)' : 'scale(1)'
                                }}
                            />
                        ))}
                    </div>
                ) : pattern === 'orbital-rings' ? (
                    <div className="relative w-1/2 aspect-square flex items-center justify-center">
                        <div
                            className="w-full h-full rounded-full border transition-transform duration-700"
                            style={{
                                borderColor: theme.borderStrong,
                                transform: isHovered ? 'rotate(25deg) scale(1.06)' : 'rotate(0deg)'
                            }}
                        />
                        <div
                            className="absolute w-2/3 h-2/3 rounded-full border transition-transform duration-700"
                            style={{
                                borderColor: accentColor,
                                transform: isHovered ? 'rotate(-25deg) scale(0.95)' : 'rotate(0deg)'
                            }}
                        />
                        <div
                            className="w-3.5 h-3.5 rounded-full"
                            style={{ backgroundColor: accentColor }}
                        />
                    </div>
                ) : (
                    <div className="relative flex items-center justify-center w-1/2 aspect-square">
                        <div
                            className="w-4/5 h-4/5 rounded-full border transition-all duration-700 flex items-center justify-center"
                            style={{
                                borderColor: theme.borderStrong,
                                transform: isHovered ? 'scale(1.06)' : 'scale(1)'
                            }}
                        >
                            <div
                                className="w-1/2 h-1/2 rounded-full transition-transform duration-700"
                                style={{
                                    backgroundColor: accentColor,
                                    opacity: 0.85,
                                    transform: isHovered ? 'scale(1.12)' : 'scale(1)'
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Top Editorial Bar */}
            <div className="absolute top-4 left-5 right-5 flex items-center justify-between pointer-events-none">
                <span
                    className="font-mono text-[11px] uppercase tracking-[0.18em] font-medium"
                    style={{ color: theme.textMuted }}
                >
                    NO. {index} — {category}
                </span>
                <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border backdrop-blur-sm"
                    style={{
                        backgroundColor: theme.isDark ? 'rgba(17,16,15,0.75)' : 'rgba(255,255,255,0.82)',
                        borderColor: theme.border,
                        color: theme.textMuted
                    }}
                >
                    {badgeText}
                </span>
            </div>

            {/* Bottom Corner Action Badge */}
            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between pointer-events-none">
                <div
                    className="h-[2px] w-14 overflow-hidden"
                    style={{ backgroundColor: theme.borderStrong }}
                >
                    <div
                        className="h-full transition-all duration-500"
                        style={{
                            width: isHovered ? '100%' : '35%',
                            backgroundColor: accentColor
                        }}
                    />
                </div>

                <div
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border"
                    style={{
                        backgroundColor: isHovered ? accentColor : theme.surface,
                        borderColor: isHovered ? accentColor : theme.border,
                        color: isHovered ? theme.accentText : theme.text
                    }}
                >
                    <ArrowUpRight className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
}

function getYouTubeCleanEmbed(url) {
    if (!url) return '';
    let videoId = '';
    if (url.includes('embed/')) {
        videoId = url.split('embed/')[1].split('?')[0];
    } else if (url.includes('watch?v=')) {
        videoId = url.split('watch?v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    if (!videoId) return url;
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&loop=1&playlist=${videoId}&playsinline=1&enablejsapi=1`;
}

/**
 * ============================================================================
 * MAIN PORTFOLIO APPLICATION
 * ============================================================================
 */
export default function App() {
    // Active Theme State (Defaults to "Editorial Paper" light theme)
    const [activeThemeKey, setActiveThemeKey] = useState('paper');
    const theme = STUDIO_THEMES[activeThemeKey];

    // Centralized Content State
    const [siteConfig, setSiteConfig] = useState(INITIAL_SITE_CONFIG);
    const [projects] = useState(INITIAL_PROJECTS);
    const [experiences] = useState(INITIAL_EXPERIENCE);

    // Navigation & Route State
    const [activeRoute, setActiveRoute] = useState({ page: 'home', slug: null });
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Showreel Interactive State
    const [activeChapterIndex, setActiveChapterIndex] = useState(0);
    const [isShowreelPlaying, setIsShowreelPlaying] = useState(true);
    const [isShowreelMuted, setIsShowreelMuted] = useState(true);
    const [showreelProgress, setShowreelProgress] = useState(28);
    const [showreelModalOpen, setShowreelModalOpen] = useState(false);
    const videoRef = useRef(null);
    const iframeRef = useRef(null);

    // YouTube / Video Unified Controls
    const sendYouTubeCommand = (func, args = []) => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func, args }),
                '*'
            );
        }
    };

    const toggleShowreelPlay = () => {
        const nextState = !isShowreelPlaying;
        setIsShowreelPlaying(nextState);

        const isYT = siteConfig.showreel.videoUrl?.includes('youtube') || siteConfig.showreel.videoUrl?.includes('youtu.be');
        if (isYT) {
            sendYouTubeCommand(nextState ? 'playVideo' : 'pauseVideo');
        } else if (videoRef.current) {
            if (nextState) {
                videoRef.current.play().catch(() => {});
            } else {
                videoRef.current.pause();
            }
        }
    };

    const toggleShowreelMute = () => {
        const nextMuted = !isShowreelMuted;
        setIsShowreelMuted(nextMuted);

        const isYT = siteConfig.showreel.videoUrl?.includes('youtube') || siteConfig.showreel.videoUrl?.includes('youtu.be');
        if (isYT) {
            sendYouTubeCommand(nextMuted ? 'mute' : 'unMute');
        } else if (videoRef.current) {
            videoRef.current.muted = nextMuted;
        }
    };

    const seekShowreel = (progressPercent) => {
        setShowreelProgress(progressPercent);
        const targetSeconds = (progressPercent / 100) * 108;

        const isYT = siteConfig.showreel.videoUrl?.includes('youtube') || siteConfig.showreel.videoUrl?.includes('youtu.be');
        if (isYT) {
            sendYouTubeCommand('seekTo', [targetSeconds, true]);
        } else if (videoRef.current && videoRef.current.duration) {
            videoRef.current.currentTime = (progressPercent / 100) * videoRef.current.duration;
        }
    };

    // Selected Works Filter & Software Filter
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [hoveredProjectSlug, setHoveredProjectSlug] = useState(null);
    const [selectedSoftwareGroup, setSelectedSoftwareGroup] = useState('All');

    // Experience Accordion
    const [expandedExpId, setExpandedExpId] = useState('exp-1');

    // Studio CMS Drawer
    const [cmsOpen, setCmsOpen] = useState(false);
    const [copiedLabel, setCopiedLabel] = useState('');

    // Contact Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [formStatus, setFormStatus] = useState('idle');

    // Filtered Projects
    const filteredProjects = useMemo(() => {
        if (selectedCategory === 'All') return projects;
        return projects.filter((p) => p.category === selectedCategory);
    }, [projects, selectedCategory]);

    // Filtered Software
    const filteredSoftware = useMemo(() => {
        if (selectedSoftwareGroup === 'All') return SOFTWARE_TOOLS;
        return SOFTWARE_TOOLS.filter((s) => s.category === selectedSoftwareGroup);
    }, [selectedSoftwareGroup]);

    // Current Case Study & Adjacent Navigation
    const currentCaseStudy = useMemo(() => {
        if (activeRoute.page !== 'case-study' || !activeRoute.slug) return null;
        return projects.find((p) => p.slug === activeRoute.slug) || projects[0];
    }, [activeRoute, projects]);

    const adjacentProjects = useMemo(() => {
        if (!currentCaseStudy) return { prev: null, next: null };
        const idx = projects.findIndex((p) => p.slug === currentCaseStudy.slug);
        return {
            prev: projects[(idx - 1 + projects.length) % projects.length],
            next: projects[(idx + 1) % projects.length]
        };
    }, [currentCaseStudy, projects]);

    // Track Scroll Position
    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 24);
            if (activeRoute.page === 'home') {
                const ids = ['home', 'showreel', 'work', 'about', 'capabilities', 'experience', 'contact'];
                const scrollY = window.scrollY + 260;
                for (const id of ids) {
                    const el = document.getElementById(id);
                    if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
                        setActiveSection(id);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [activeRoute.page]);

    const navigateToSection = (sectionId) => {
        setMobileMenuOpen(false);
        if (activeRoute.page !== 'home') {
            setActiveRoute({ page: 'home', slug: null });
            setTimeout(() => {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 80);
        } else {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const openCaseStudy = (slug) => {
        setActiveRoute({ page: 'case-study', slug });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCopy = (text, label) => {
        navigator.clipboard.writeText(text);
        setCopiedLabel(label);
        setTimeout(() => setCopiedLabel(''), 2200);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const errs = {};
        if (!formData.name.trim()) errs.name = 'Please enter your name';
        if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
            errs.email = 'Please enter a valid email address';
        if (!formData.subject.trim()) errs.subject = 'Please enter a subject';
        if (!formData.message.trim() || formData.message.trim().length < 10)
            errs.message = 'Please write a short project message (10+ characters)';

        setFormErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setFormStatus('submitting');
        await new Promise((r) => setTimeout(r, 600));
        setFormStatus('success');
    };

    const activeChapter = siteConfig.showreel.chapters[activeChapterIndex] || siteConfig.showreel.chapters[0];

    return (
        <div
            className="min-h-screen transition-colors duration-500 font-sans antialiased"
            style={{
                backgroundColor: theme.bg,
                color: theme.text
            }}
        >
            {/* Editorial Typography Imports */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .font-display {
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: -0.025em;
        }
        .font-serif-italic {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-weight: 400;
        }
        .font-sans {
          font-family: 'Inter', sans-serif;
        }
        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

            {/* =====================================================================
          A. STICKY EDITORIAL NAVIGATION BAR + 4-THEME SWITCHER
          ===================================================================== */}
            <header
                className="fixed top-0 inset-x-0 z-40 transition-all duration-300 border-b backdrop-blur-xl"
                style={{
                    backgroundColor: isScrolled
                        ? theme.isDark
                            ? 'rgba(17, 16, 15, 0.88)'
                            : 'rgba(247, 245, 240, 0.88)'
                        : theme.bg,
                    borderColor: theme.border
                }}
            >
                <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-4">
                    {/* Brand Wordmark */}
                    <button
                        onClick={() => navigateToSection('home')}
                        className="flex items-center gap-3 text-left group focus:outline-none shrink-0"
                    >
                        <span
                            className="w-2.5 h-2.5 rounded-full transition-transform duration-300 group-hover:scale-125"
                            style={{ backgroundColor: theme.accent }}
                        />
                        <div>
                            <span className="font-display font-bold text-sm sm:text-base tracking-tight block leading-none">
                                {siteConfig.wordmark}
                            </span>
                            <span
                                className="font-mono text-[10px] tracking-widest uppercase block mt-1"
                                style={{ color: theme.textMuted }}
                            >
                                Senior Editor & Motion
                            </span>
                        </div>
                    </button>

                    {/* Center Navigation Links */}
                    <nav className="hidden xl:flex items-center gap-7" aria-label="Main Navigation">
                        {[
                            { id: 'home', label: 'Home' },
                            { id: 'work', label: 'Work' },
                            { id: 'showreel', label: 'Showreel' },
                            { id: 'about', label: 'About' },
                            { id: 'experience', label: 'Experience' },
                            { id: 'contact', label: 'Contact' }
                        ].map((item) => {
                            const isActive =
                                activeRoute.page === 'case-study'
                                    ? item.id === 'work'
                                    : activeSection === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => navigateToSection(item.id)}
                                    className="text-sm font-medium transition-colors relative py-1"
                                    style={{
                                        color: isActive ? theme.text : theme.textMuted
                                    }}
                                >
                                    {item.label}
                                    {isActive && (
                                        <motion.span
                                            layoutId="editorialNavUnderline"
                                            className="absolute -bottom-1 left-0 right-0 h-[2px]"
                                            style={{ backgroundColor: theme.accent }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Right Controls: 1-Click 4-Theme Switcher + Studio CMS + Let's Talk */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* 4-Theme Switcher Pill */}
                        <div
                            className="flex items-center gap-1 p-1 rounded-full border"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.border
                            }}
                            role="group"
                            aria-label="Studio Theme Switcher"
                        >
                            <span
                                className="pl-2.5 pr-1 text-[11px] font-mono uppercase tracking-wider hidden lg:inline-flex items-center gap-1"
                                style={{ color: theme.textMuted }}
                            >
                                <Palette className="w-3 h-3" />
                                Theme:
                            </span>
                            {Object.values(STUDIO_THEMES).map((t) => {
                                const isSelected = t.id === activeThemeKey;
                                return (
                                    <button
                                        key={t.id}
                                        onClick={() => setActiveThemeKey(t.id)}
                                        className="px-2.5 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5"
                                        style={{
                                            backgroundColor: isSelected ? theme.text : 'transparent',
                                            color: isSelected ? theme.bg : theme.textMuted
                                        }}
                                        title={`Switch to ${t.name} theme`}
                                    >
                                        <span
                                            className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                                            style={{ backgroundColor: t.swatch }}
                                        />
                                        <span className="hidden 2xl:inline">{t.name.split(' ')[0]}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Studio CMS Button */}
                        <button
                            onClick={() => setCmsOpen(true)}
                            className="px-3.5 py-2 rounded-full border text-xs font-medium transition-colors flex items-center gap-1.5"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.border,
                                color: theme.text
                            }}
                        >
                            <SlidersHorizontal className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                            <span>Studio CMS</span>
                        </button>

                        {/* Primary CTA */}
                        <button
                            onClick={() => navigateToSection('contact')}
                            className="px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-transform active:scale-95 flex items-center gap-1.5"
                            style={{
                                backgroundColor: theme.accent,
                                color: theme.accentText
                            }}
                        >
                            <span>Let&apos;s Talk</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex items-center gap-2 md:hidden">
                        {/* Compact Mobile Theme CycIer */}
                        <button
                            onClick={() => {
                                const keys = Object.keys(STUDIO_THEMES);
                                const nextIndex = (keys.indexOf(activeThemeKey) + 1) % keys.length;
                                setActiveThemeKey(keys[nextIndex]);
                            }}
                            className="px-3 py-2 rounded-full border text-xs font-medium flex items-center gap-1.5"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.border,
                                color: theme.text
                            }}
                        >
                            <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: theme.accent }}
                            />
                            <span>Theme</span>
                        </button>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2.5 rounded-full border"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.border,
                                color: theme.text
                            }}
                            aria-label="Toggle Menu"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t overflow-hidden"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.border
                            }}
                        >
                            <div className="px-6 py-6 space-y-5">
                                {/* Mobile Theme Selector */}
                                <div>
                                    <span
                                        className="text-[11px] font-mono uppercase tracking-wider block mb-2"
                                        style={{ color: theme.textMuted }}
                                    >
                                        Select Studio Theme
                                    </span>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.values(STUDIO_THEMES).map((t) => (
                                            <button
                                                key={t.id}
                                                onClick={() => setActiveThemeKey(t.id)}
                                                className="px-3 py-2 rounded-lg border text-xs font-medium flex items-center gap-2 text-left"
                                                style={{
                                                    backgroundColor: t.id === activeThemeKey ? theme.surfaceAlt : 'transparent',
                                                    borderColor: t.id === activeThemeKey ? theme.accent : theme.border,
                                                    color: theme.text
                                                }}
                                            >
                                                <span
                                                    className="w-3 h-3 rounded-full shrink-0"
                                                    style={{ backgroundColor: t.swatch }}
                                                />
                                                <span>{t.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Mobile Nav Links */}
                                <div className="flex flex-col divide-y" style={{ borderColor: theme.border }}>
                                    {[
                                        { id: 'home', label: 'Home' },
                                        { id: 'work', label: 'Selected Works' },
                                        { id: 'showreel', label: 'Showreel' },
                                        { id: 'about', label: 'About Me' },
                                        { id: 'capabilities', label: 'Capabilities & Tools' },
                                        { id: 'experience', label: 'Experience' },
                                        { id: 'contact', label: 'Contact' }
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => navigateToSection(item.id)}
                                            className="py-3 text-left font-display text-lg font-medium flex items-center justify-between"
                                            style={{ color: theme.text }}
                                        >
                                            <span>{item.label}</span>
                                            <ArrowUpRight className="w-4 h-4" style={{ color: theme.accent }} />
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        setCmsOpen(true);
                                    }}
                                    className="w-full py-3 rounded-full border text-xs font-medium flex items-center justify-center gap-2"
                                    style={{
                                        borderColor: theme.borderStrong,
                                        color: theme.text
                                    }}
                                >
                                    <SlidersHorizontal className="w-3.5 h-3.5" />
                                    <span>Open Studio CMS Editor</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* =====================================================================
          VIEW ROUTER: INDIVIDUAL CASE STUDY VIEW vs HOME PORTFOLIO
          ===================================================================== */}
            <AnimatePresence mode="wait">
                {activeRoute.page === 'case-study' && currentCaseStudy ? (
                    /* =================================================================
                       E. INDIVIDUAL PROJECT CASE STUDY PAGE (/work/[slug])
                       Includes all 16 required case study elements
                       ================================================================= */
                    <motion.main
                        key={`case-study-${currentCaseStudy.slug}`}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.35 }}
                        className="pt-28 pb-24"
                    >
                        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                            {/* Back to Selected Works */}
                            <div className="flex items-center justify-between mb-10">
                                <button
                                    onClick={() => navigateToSection('work')}
                                    className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-75"
                                    style={{ color: theme.text }}
                                >
                                    <ArrowLeft className="w-4 h-4" style={{ color: theme.accent }} />
                                    <span>Back to Selected Works</span>
                                </button>
                                <span className="font-mono text-xs" style={{ color: theme.textMuted }}>
                                    /work/{currentCaseStudy.slug}
                                </span>
                            </div>

                            {/* Case Study Title & Header */}
                            <div className="max-w-4xl mb-12">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <span
                                        className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider"
                                        style={{
                                            backgroundColor: theme.accentSoft,
                                            color: theme.accent
                                        }}
                                    >
                                        {currentCaseStudy.category}
                                    </span>
                                    <span className="font-mono text-xs" style={{ color: theme.textMuted }}>
                                        Case Study No. {currentCaseStudy.index}
                                    </span>
                                </div>

                                <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.06] mb-5">
                                    {currentCaseStudy.title}
                                </h1>
                                <p
                                    className="text-base sm:text-xl leading-relaxed"
                                    style={{ color: theme.textMuted }}
                                >
                                    {currentCaseStudy.shortDescription}
                                </p>
                            </div>

                            {/* Metadata Specification Strip (Client, Role, Category, Year) */}
                            <div
                                className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 rounded-2xl border mb-12"
                                style={{
                                    backgroundColor: theme.surface,
                                    borderColor: theme.border
                                }}
                            >
                                <div>
                                    <span
                                        className="font-mono text-[11px] uppercase tracking-wider block mb-1"
                                        style={{ color: theme.textMuted }}
                                    >
                                        Client / Brand
                                    </span>
                                    <span className="font-display text-sm sm:text-base font-medium">
                                        {currentCaseStudy.client}
                                    </span>
                                </div>
                                <div>
                                    <span
                                        className="font-mono text-[11px] uppercase tracking-wider block mb-1"
                                        style={{ color: theme.textMuted }}
                                    >
                                        My Creative Role
                                    </span>
                                    <span className="font-display text-sm sm:text-base font-medium">
                                        {currentCaseStudy.role}
                                    </span>
                                </div>
                                <div>
                                    <span
                                        className="font-mono text-[11px] uppercase tracking-wider block mb-1"
                                        style={{ color: theme.textMuted }}
                                    >
                                        Category
                                    </span>
                                    <span className="font-display text-sm sm:text-base font-medium">
                                        {currentCaseStudy.category}
                                    </span>
                                </div>
                                <div>
                                    <span
                                        className="font-mono text-[11px] uppercase tracking-wider block mb-1"
                                        style={{ color: theme.textMuted }}
                                    >
                                        Production Year
                                    </span>
                                    <span className="font-display text-sm sm:text-base font-medium">
                                        {currentCaseStudy.year}
                                    </span>
                                </div>
                            </div>

                            {/* 1 & 13. Cinematic Project Cover & Final Video Presentation */}
                            <div
                                className="rounded-2xl overflow-hidden border mb-16 p-2 sm:p-3"
                                style={{
                                    backgroundColor: theme.surface,
                                    borderColor: theme.border
                                }}
                            >
                                <div className="rounded-xl overflow-hidden relative">
                                    <EditorialVisualFrame
                                        theme={theme}
                                        index={currentCaseStudy.index}
                                        category={currentCaseStudy.category}
                                        aspectClass="aspect-video"
                                        pattern={currentCaseStudy.pattern}
                                        isHovered={true}
                                        badgeText="Final Master Video Presentation Placeholder"
                                    />
                                </div>
                            </div>

                            {/* 7-12 & 15. Editorial Breakdown Grid (Overview, Challenge, Direction, Editing, Motion, Color, Software) */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
                                {/* Left Sidebar: Software Used & Quick Actions */}
                                <div className="lg:col-span-4 space-y-6">
                                    <div
                                        className="p-6 sm:p-8 rounded-2xl border"
                                        style={{
                                            backgroundColor: theme.surface,
                                            borderColor: theme.border
                                        }}
                                    >
                                        <h2 className="font-display text-lg font-semibold mb-2">
                                            15. Software & Pipeline
                                        </h2>
                                        <p className="text-xs leading-relaxed mb-5" style={{ color: theme.textMuted }}>
                                            Tools utilized across editing, motion design, 3D visualization, and color finishing.
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {currentCaseStudy.software.map((sw) => (
                                                <span
                                                    key={sw}
                                                    className="px-3 py-1.5 rounded-full text-xs font-medium border"
                                                    style={{
                                                        backgroundColor: theme.surfaceAlt,
                                                        borderColor: theme.border,
                                                        color: theme.text
                                                    }}
                                                >
                                                    {sw}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div
                                        className="p-6 sm:p-8 rounded-2xl border"
                                        style={{
                                            backgroundColor: theme.surfaceAlt,
                                            borderColor: theme.border
                                        }}
                                    >
                                        <span
                                            className="font-mono text-[11px] uppercase tracking-wider block mb-2"
                                            style={{ color: theme.accent }}
                                        >
                                            Editable Case Study
                                        </span>
                                        <p className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>
                                            All 16 case study fields are structured in centralized data so you can replace
                                            placeholder notes with real client deliverables anytime.
                                        </p>
                                    </div>
                                </div>

                                {/* Right 8 Columns: 6 Narrative & Technical Process Cards */}
                                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {[
                                        { num: '07', title: 'Project Overview', body: currentCaseStudy.overview },
                                        { num: '08', title: 'Creative Challenge', body: currentCaseStudy.challenge },
                                        { num: '09', title: 'Concept & Direction', body: currentCaseStudy.conceptAndDirection },
                                        { num: '10', title: 'Editing Workflow', body: currentCaseStudy.editingWorkflow },
                                        { num: '11', title: 'Motion Graphics Process', body: currentCaseStudy.motionGraphicsProcess },
                                        { num: '12', title: 'Color Grading & Finishing', body: currentCaseStudy.colorGradingAndFinishing }
                                    ].map((block) => (
                                        <div
                                            key={block.num}
                                            className="p-6 sm:p-7 rounded-2xl border"
                                            style={{
                                                backgroundColor: theme.surface,
                                                borderColor: theme.border
                                            }}
                                        >
                                            <span
                                                className="font-mono text-xs font-medium block mb-2"
                                                style={{ color: theme.accent }}
                                            >
                                                {block.num} / PROCESS
                                            </span>
                                            <h3 className="font-display text-lg font-semibold mb-2">
                                                {block.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                                                {block.body}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 14. 4 Supporting Visuals Gallery */}
                            <div className="mb-20">
                                <div className="flex items-end justify-between mb-8">
                                    <div>
                                        <span
                                            className="font-mono text-xs uppercase tracking-widest block mb-2"
                                            style={{ color: theme.accent }}
                                        >
                                            14 / Supporting Visuals
                                        </span>
                                        <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                                            Styleframes, Breakdowns & Stills
                                        </h2>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {currentCaseStudy.supportingVisuals.map((vis, idx) => (
                                        <div
                                            key={idx}
                                            className="rounded-2xl border p-3 transition-all"
                                            style={{
                                                backgroundColor: theme.surface,
                                                borderColor: theme.border
                                            }}
                                        >
                                            <div className="rounded-xl overflow-hidden mb-4">
                                                <EditorialVisualFrame
                                                    theme={theme}
                                                    index={`0${idx + 1}`}
                                                    category={vis.title}
                                                    aspectClass="aspect-[16/10]"
                                                    pattern={idx % 2 === 0 ? 'orbital-rings' : 'kinetic-grid'}
                                                    badgeText="Supporting Still"
                                                />
                                            </div>
                                            <div className="px-2 pb-1">
                                                <h4 className="font-display text-base font-semibold">{vis.title}</h4>
                                                <p className="text-xs mt-1" style={{ color: theme.textMuted }}>
                                                    {vis.caption}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 16. Previous / Next Project Navigation */}
                            <div
                                className="pt-10 border-t grid grid-cols-1 sm:grid-cols-2 gap-6"
                                style={{ borderColor: theme.border }}
                            >
                                {adjacentProjects.prev && (
                                    <button
                                        onClick={() => openCaseStudy(adjacentProjects.prev.slug)}
                                        className="p-6 rounded-2xl border text-left group transition-all"
                                        style={{
                                            backgroundColor: theme.surface,
                                            borderColor: theme.border
                                        }}
                                    >
                                        <span
                                            className="font-mono text-xs uppercase tracking-wider flex items-center gap-2 mb-2"
                                            style={{ color: theme.textMuted }}
                                        >
                                            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                                            Previous Case Study
                                        </span>
                                        <span className="font-display text-lg sm:text-xl font-semibold block">
                                            {adjacentProjects.prev.title}
                                        </span>
                                    </button>
                                )}

                                {adjacentProjects.next && (
                                    <button
                                        onClick={() => openCaseStudy(adjacentProjects.next.slug)}
                                        className="p-6 rounded-2xl border text-left sm:text-right group transition-all"
                                        style={{
                                            backgroundColor: theme.surface,
                                            borderColor: theme.border
                                        }}
                                    >
                                        <span
                                            className="font-mono text-xs uppercase tracking-wider flex items-center sm:justify-end gap-2 mb-2"
                                            style={{ color: theme.textMuted }}
                                        >
                                            Next Case Study
                                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                        </span>
                                        <span className="font-display text-lg sm:text-xl font-semibold block">
                                            {adjacentProjects.next.title}
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.main>
                ) : (
                    /* =================================================================
                       HOME PORTFOLIO FLOW
                       ================================================================= */
                    <motion.main key="home-portfolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {/* ===============================================================
                B. HERO SECTION — SPACIOUS 2-COLUMN MAGAZINE COMPOSITION
                =============================================================== */}
                        <section
                            id="home"
                            className="pt-32 pb-20 md:pt-40 md:pb-28 border-b"
                            style={{ borderColor: theme.border }}
                        >
                            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
                                    {/* Left Column (7 Cols): Editorial Typography & Credentials */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 18 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.55 }}
                                        className="lg:col-span-7"
                                    >
                                        {/* Editable Availability Pill */}
                                        <div
                                            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border mb-7"
                                            style={{
                                                backgroundColor: theme.surface,
                                                borderColor: theme.border
                                            }}
                                        >
                                            <span
                                                className="w-2 h-2 rounded-full animate-pulse"
                                                style={{ backgroundColor: theme.accent }}
                                            />
                                            <span className="text-xs font-medium" style={{ color: theme.textMuted }}>
                                                {siteConfig.availabilityText}
                                            </span>
                                        </div>

                                        {/* Oversized Editorial Headline with Italic Serif Accent */}
                                        <p
                                            className="font-mono text-xs uppercase tracking-[0.22em] mb-3"
                                            style={{ color: theme.accent }}
                                        >
                                            {siteConfig.heroSecondaryHeadline}
                                        </p>

                                        <h1 className="font-display text-4xl sm:text-6xl xl:text-[68px] font-semibold leading-[1.03] tracking-tight mb-6">
                                            Crafting{' '}
                                            <span
                                                className="font-serif-italic font-normal px-1"
                                                style={{ color: theme.accent }}
                                            >
                                                Stories
                                            </span>{' '}
                                            Through{' '}
                                            <span className="font-serif-italic font-normal">Motion.</span>
                                        </h1>

                                        {/* Supporting Introduction */}
                                        <p
                                            className="text-base sm:text-lg leading-relaxed max-w-2xl mb-8"
                                            style={{ color: theme.textMuted }}
                                        >
                                            {siteConfig.heroIntro}
                                        </p>

                                        {/* Key Credentials Row */}
                                        <div
                                            className="grid grid-cols-3 gap-4 py-5 px-5 rounded-2xl border mb-8 max-w-2xl"
                                            style={{
                                                backgroundColor: theme.surface,
                                                borderColor: theme.border
                                            }}
                                        >
                                            <div>
                                                <span
                                                    className="font-mono text-[10px] uppercase tracking-wider block"
                                                    style={{ color: theme.textMuted }}
                                                >
                                                    Experience
                                                </span>
                                                <span className="font-display text-sm sm:text-base font-semibold mt-0.5 block">
                                                    9+ Years Exp
                                                </span>
                                            </div>
                                            <div className="border-l pl-4" style={{ borderColor: theme.border }}>
                                                <span
                                                    className="font-mono text-[10px] uppercase tracking-wider block"
                                                    style={{ color: theme.textMuted }}
                                                >
                                                    Current Studio
                                                </span>
                                                <span className="font-display text-sm sm:text-base font-semibold mt-0.5 block truncate">
                                                    Amanat Shah Group
                                                </span>
                                            </div>
                                            <div className="border-l pl-4" style={{ borderColor: theme.border }}>
                                                <span
                                                    className="font-mono text-[10px] uppercase tracking-wider block"
                                                    style={{ color: theme.textMuted }}
                                                >
                                                    Location
                                                </span>
                                                <span className="font-display text-sm sm:text-base font-semibold mt-0.5 block">
                                                    Dhaka, BD
                                                </span>
                                            </div>
                                        </div>

                                        {/* Primary & Secondary CTAs */}
                                        <div className="flex flex-wrap items-center gap-4">
                                            <button
                                                onClick={() => navigateToSection('work')}
                                                className="px-7 py-4 rounded-full text-sm font-medium transition-transform active:scale-95 flex items-center gap-2.5 shadow-sm"
                                                style={{
                                                    backgroundColor: theme.text,
                                                    color: theme.bg
                                                }}
                                            >
                                                <span>Explore My Work</span>
                                                <ArrowUpRight className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={() => navigateToSection('showreel')}
                                                className="px-7 py-4 rounded-full text-sm font-medium border transition-colors flex items-center gap-2.5"
                                                style={{
                                                    backgroundColor: theme.surface,
                                                    borderColor: theme.borderStrong,
                                                    color: theme.text
                                                }}
                                            >
                                                <Play
                                                    className="w-3.5 h-3.5"
                                                    style={{ color: theme.accent, fill: theme.accent }}
                                                />
                                                <span>Watch Showreel</span>
                                            </button>
                                        </div>
                                    </motion.div>

                                    {/* Right Column (5 Cols): Elevated Showreel Preview Card */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 22 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.1 }}
                                        className="lg:col-span-5"
                                    >
                                        <div
                                            className="rounded-3xl border p-3.5 sm:p-5 shadow-sm transition-colors"
                                            style={{
                                                backgroundColor: theme.surface,
                                                borderColor: theme.border
                                            }}
                                        >
                                            {/* Top Card Bar */}
                                            <div className="flex items-center justify-between px-1 pb-3.5">
                                                <div className="flex items-center gap-2">
                                                    <Film className="w-4 h-4" style={{ color: theme.accent }} />
                                                    <span className="font-display text-xs font-semibold uppercase tracking-wider">
                                                        Director&apos;s Reel Preview
                                                    </span>
                                                </div>
                                                <span
                                                    className="font-mono text-xs"
                                                    style={{ color: theme.textMuted }}
                                                >
                                                    {activeChapter.time} / {siteConfig.showreel.duration}
                                                </span>
                                            </div>

                                            {/* Interactive Preview Frame */}
                                            <div
                                                onClick={() => setShowreelModalOpen(true)}
                                                className="rounded-2xl overflow-hidden relative cursor-pointer group"
                                            >
                                                <EditorialVisualFrame
                                                    theme={theme}
                                                    index={activeChapter.id}
                                                    category={activeChapter.note}
                                                    aspectClass="aspect-[4/3]"
                                                    pattern={
                                                        activeChapterIndex % 2 === 0 ? 'editorial-arch' : 'orbital-rings'
                                                    }
                                                    isHovered={true}
                                                    badgeText="Click for Theater Mode"
                                                />

                                                {/* Centered Play Button */}
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                    <div
                                                        className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
                                                        style={{
                                                            backgroundColor: theme.accent,
                                                            color: theme.accentText
                                                        }}
                                                    >
                                                        <Play className="w-6 h-6 fill-current ml-0.5" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 4 Interactive Chapter Pills */}
                                            <div className="mt-4 pt-3 border-t" style={{ borderColor: theme.border }}>
                                                <span
                                                    className="font-mono text-[10px] uppercase tracking-wider block mb-2.5"
                                                    style={{ color: theme.textMuted }}
                                                >
                                                    Interactive Showreel Chapters:
                                                </span>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {siteConfig.showreel.chapters.map((chap, idx) => {
                                                        const isCurrent = idx === activeChapterIndex;
                                                        return (
                                                            <button
                                                                key={chap.id}
                                                                onClick={() => {
                                                                    setActiveChapterIndex(idx);
                                                                    setShowreelProgress(chap.progress);
                                                                }}
                                                                className="px-3 py-2 rounded-xl text-left text-xs font-medium border transition-all flex items-center justify-between"
                                                                style={{
                                                                    backgroundColor: isCurrent ? theme.accentSoft : theme.surfaceAlt,
                                                                    borderColor: isCurrent ? theme.accent : 'transparent',
                                                                    color: isCurrent ? theme.accent : theme.text
                                                                }}
                                                            >
                                                                <span className="truncate">{chap.label}</span>
                                                                <span className="font-mono text-[10px] opacity-75">
                                                                    {chap.time}
                                                                </span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </section>

                        {/* ===============================================================
                C. FEATURED SHOWREEL SECTION — WIDESCREEN PRESENTATION
                =============================================================== */}
                        <section
                            id="showreel"
                            className="py-24 md:py-32 border-b"
                            style={{ borderColor: theme.border }}
                        >
                            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                                    <div>
                                        <span
                                            className="font-mono text-xs uppercase tracking-[0.2em] block mb-2"
                                            style={{ color: theme.accent }}
                                        >
                                            01 / Featured Showreel
                                        </span>
                                        <h2 className="font-display text-3xl sm:text-5xl font-semibold">
                                            Selected Moments.{' '}
                                            <span className="font-serif-italic font-normal">Endless Creativity.</span>
                                        </h2>
                                    </div>
                                    <p
                                        className="text-sm sm:text-base max-w-md"
                                        style={{ color: theme.textMuted }}
                                    >
                                        {siteConfig.showreel.supportingText}
                                    </p>
                                </div>

                                {/* Widescreen Architectural Player Frame */}
                                <div
                                    className="rounded-3xl border p-3 sm:p-5 shadow-sm"
                                    style={{
                                        backgroundColor: theme.surface,
                                        borderColor: theme.border
                                    }}
                                >
                                    <div className="rounded-2xl overflow-hidden relative">
                                        {siteConfig.showreel.videoUrl ? (
                                            siteConfig.showreel.videoUrl.includes('youtube') || siteConfig.showreel.videoUrl.includes('youtu.be') ? (
                                                <div 
                                                    className="relative w-full aspect-video bg-black overflow-hidden select-none cursor-pointer"
                                                    onClick={toggleShowreelPlay}
                                                >
                                                    <iframe
                                                        ref={iframeRef}
                                                        src={getYouTubeCleanEmbed(siteConfig.showreel.videoUrl)}
                                                        title="YouTube video player"
                                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] border-0 pointer-events-none"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            ) : siteConfig.showreel.videoUrl.includes('vimeo') ? (
                                                <iframe
                                                    src={siteConfig.showreel.videoUrl}
                                                    title="Vimeo video player"
                                                    className="w-full aspect-video border-0 bg-black"
                                                    allow="autoplay; fullscreen; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            ) : (
                                                <video
                                                    ref={videoRef}
                                                    src={siteConfig.showreel.videoUrl}
                                                    className="w-full aspect-video object-cover bg-black cursor-pointer"
                                                    autoPlay={isShowreelPlaying}
                                                    muted={isShowreelMuted}
                                                    loop
                                                    playsInline
                                                    onClick={toggleShowreelPlay}
                                                />
                                            )
                                        ) : (
                                            <div
                                                onClick={() => setShowreelModalOpen(true)}
                                                className="cursor-pointer relative group"
                                            >
                                                <EditorialVisualFrame
                                                    theme={theme}
                                                    index={activeChapter.id}
                                                    category={`${activeChapter.label} — ${activeChapter.note}`}
                                                    aspectClass="aspect-video"
                                                    pattern="widescreen-cinema"
                                                    isHovered={isShowreelPlaying}
                                                    badgeText={siteConfig.showreel.placeholderNote}
                                                />
                                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                                    <div
                                                        className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110"
                                                        style={{
                                                            backgroundColor: theme.accent,
                                                            color: theme.accentText
                                                        }}
                                                    >
                                                        <Play className="w-7 h-7 fill-current ml-1" />
                                                    </div>
                                                    <span
                                                        className="mt-4 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest border"
                                                        style={{
                                                            backgroundColor: theme.surface,
                                                            borderColor: theme.border,
                                                            color: theme.text
                                                        }}
                                                    >
                                                        Launch Fullscreen Showreel
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Custom Player Controls & Timeline Scrubber */}
                                    <div className="pt-4 px-2 flex flex-col gap-4">
                                        {/* Scrubber Bar */}
                                        <div
                                            onClick={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                const pct = Math.max(
                                                    0,
                                                    Math.min(100, Math.round(((e.clientX - rect.left) / rect.width) * 100))
                                                );
                                                seekShowreel(pct);
                                            }}
                                            className="w-full h-2 rounded-full cursor-pointer overflow-hidden relative"
                                            style={{ backgroundColor: theme.surfaceAlt }}
                                            title="Click to scrub timeline"
                                        >
                                            <div
                                                className="h-full transition-all duration-300"
                                                style={{
                                                    width: `${showreelProgress}%`,
                                                    backgroundColor: theme.accent
                                                }}
                                            />
                                        </div>

                                        {/* Transport Controls & Chapter Selector */}
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={toggleShowreelPlay}
                                                    className="px-4 py-2 rounded-full text-xs font-medium border flex items-center gap-2"
                                                    style={{
                                                        backgroundColor: theme.surfaceAlt,
                                                        borderColor: theme.border,
                                                        color: theme.text
                                                    }}
                                                >
                                                    {isShowreelPlaying ? (
                                                        <>
                                                            <Pause className="w-3.5 h-3.5" />
                                                            <span>Pause</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Play className="w-3.5 h-3.5" />
                                                            <span>Play</span>
                                                        </>
                                                    )}
                                                </button>

                                                <button
                                                    onClick={toggleShowreelMute}
                                                    className="px-4 py-2 rounded-full text-xs font-medium border flex items-center gap-2"
                                                    style={{
                                                        backgroundColor: theme.surfaceAlt,
                                                        borderColor: theme.border,
                                                        color: theme.text
                                                    }}
                                                >
                                                    {isShowreelMuted ? (
                                                        <>
                                                            <VolumeX className="w-3.5 h-3.5" />
                                                            <span>Muted</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Volume2 className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                                                            <span>Audio On</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>

                                            {/* Chapter Quick Buttons */}
                                            <div className="hidden lg:flex items-center gap-2">
                                                {siteConfig.showreel.chapters.map((chap, idx) => (
                                                    <button
                                                        key={chap.id}
                                                        onClick={() => {
                                                            setActiveChapterIndex(idx);
                                                            seekShowreel(chap.progress);
                                                        }}
                                                        className="px-3 py-1.5 rounded-full text-xs font-mono transition-colors"
                                                        style={{
                                                            backgroundColor:
                                                                idx === activeChapterIndex ? theme.accent : theme.surfaceAlt,
                                                            color:
                                                                idx === activeChapterIndex ? theme.accentText : theme.textMuted
                                                        }}
                                                    >
                                                        {chap.label}
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setCmsOpen(true)}
                                                    className="text-xs underline"
                                                    style={{ color: theme.textMuted }}
                                                >
                                                    Replace Video URL
                                                </button>
                                                <button
                                                    onClick={() => setShowreelModalOpen(true)}
                                                    className="px-4 py-2 rounded-full text-xs font-medium border flex items-center gap-1.5"
                                                    style={{
                                                        backgroundColor: theme.surfaceAlt,
                                                        borderColor: theme.border,
                                                        color: theme.text
                                                    }}
                                                >
                                                    <Maximize2 className="w-3.5 h-3.5" />
                                                    <span>Theater</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ===============================================================
                D. SELECTED WORKS — SPACIOUS ASYMMETRICAL EDITORIAL GALLERY
                =============================================================== */}
                        <section
                            id="work"
                            className="py-24 md:py-32 border-b"
                            style={{ borderColor: theme.border }}
                        >
                            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                                    <div>
                                        <span
                                            className="font-mono text-xs uppercase tracking-[0.2em] block mb-2"
                                            style={{ color: theme.accent }}
                                        >
                                            02 / Selected Works
                                        </span>
                                        <h2 className="font-display text-3xl sm:text-5xl font-semibold">
                                            Curated Visual{' '}
                                            <span className="font-serif-italic font-normal">Archive.</span>
                                        </h2>
                                    </div>
                                    <p
                                        className="text-sm sm:text-base max-w-md"
                                        style={{ color: theme.textMuted }}
                                    >
                                        Exploring visual storytelling through editing, motion, and creative execution.
                                        Click any work to inspect the full case study.
                                    </p>
                                </div>

                                {/* Category Filter Bar (All 8 Required Categories) */}
                                <div
                                    className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-12 border-b"
                                    style={{ borderColor: theme.border }}
                                >
                                    {PROJECT_CATEGORIES.map((category) => {
                                        const isActive = selectedCategory === category;
                                        return (
                                            <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className="px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all border"
                                                style={{
                                                    backgroundColor: isActive ? theme.text : theme.surface,
                                                    borderColor: isActive ? theme.text : theme.border,
                                                    color: isActive ? theme.bg : theme.textMuted
                                                }}
                                            >
                                                {category}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* 12-Column Asymmetrical Bento/Editorial Project Grid */}
                                <motion.div
                                    layout
                                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                                >
                                    <AnimatePresence mode="popLayout">
                                        {filteredProjects.map((project) => {
                                            const isHovered = hoveredProjectSlug === project.slug;
                                            return (
                                                <motion.article
                                                    layout
                                                    key={project.slug}
                                                    initial={{ opacity: 0, y: 18 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.97 }}
                                                    transition={{ duration: 0.35 }}
                                                    onClick={() => openCaseStudy(project.slug)}
                                                    onMouseEnter={() => setHoveredProjectSlug(project.slug)}
                                                    onMouseLeave={() => setHoveredProjectSlug(null)}
                                                    className={`${selectedCategory === 'All' ? project.gridSpan : 'lg:col-span-6'
                                                        } group cursor-pointer rounded-3xl border p-3.5 sm:p-5 transition-all duration-300 hover:shadow-md flex flex-col justify-between`}
                                                    style={{
                                                        backgroundColor: theme.surface,
                                                        borderColor: isHovered ? theme.borderStrong : theme.border
                                                    }}
                                                >
                                                    {/* Crisp Framed Thumbnail */}
                                                    <div className="rounded-2xl overflow-hidden mb-5">
                                                        <EditorialVisualFrame
                                                            theme={theme}
                                                            index={project.index}
                                                            category={project.category}
                                                            aspectClass={
                                                                selectedCategory === 'All'
                                                                    ? project.aspectClass
                                                                    : 'aspect-[16/10]'
                                                            }
                                                            pattern={project.pattern}
                                                            isHovered={isHovered}
                                                            badgeText="Open Case Study"
                                                        />
                                                    </div>

                                                    {/* Clean Typography Below Visual */}
                                                    <div className="px-1">
                                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                                            <div className="flex items-center gap-2 text-xs">
                                                                <span
                                                                    className="font-mono uppercase tracking-wider font-medium"
                                                                    style={{ color: theme.accent }}
                                                                >
                                                                    {project.category}
                                                                </span>
                                                                <span style={{ color: theme.borderStrong }}>•</span>
                                                                <span style={{ color: theme.textMuted }}>{project.role}</span>
                                                            </div>
                                                            <span
                                                                className="font-mono text-xs"
                                                                style={{ color: theme.textMuted }}
                                                            >
                                                                {project.year}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-baseline justify-between gap-4">
                                                            <h3 className="font-display text-xl sm:text-2xl font-semibold group-hover:underline">
                                                                {project.title}
                                                            </h3>
                                                            <span
                                                                className="text-xs font-mono shrink-0 hidden sm:inline-flex items-center gap-1"
                                                                style={{ color: theme.textMuted }}
                                                            >
                                                                Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                                                            </span>
                                                        </div>

                                                        <p
                                                            className="text-sm mt-2 line-clamp-2 leading-relaxed"
                                                            style={{ color: theme.textMuted }}
                                                        >
                                                            {project.shortDescription}
                                                        </p>
                                                    </div>
                                                </motion.article>
                                            );
                                        })}
                                    </AnimatePresence>
                                </motion.div>
                            </div>
                        </section>

                        {/* ===============================================================
                F. ABOUT ME — EDITORIAL PORTRAIT & BIOGRAPHY
                =============================================================== */}
                        <section
                            id="about"
                            className="py-24 md:py-32 border-b"
                            style={{ borderColor: theme.border }}
                        >
                            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                                    {/* Left 5 Columns: Portrait Frame Card */}
                                    <div className="lg:col-span-5">
                                        <div
                                            className="rounded-3xl border p-4 sm:p-5"
                                            style={{
                                                backgroundColor: theme.surface,
                                                borderColor: theme.border
                                            }}
                                        >
                                            <div
                                                className="rounded-2xl aspect-[4/5] relative overflow-hidden flex flex-col justify-between p-7 border"
                                                style={{
                                                    backgroundColor: theme.surfaceAlt,
                                                    borderColor: theme.border
                                                }}
                                            >
                                                {siteConfig.portrait.imageUrl ? (
                                                    <img
                                                        src={siteConfig.portrait.imageUrl}
                                                        alt={siteConfig.name}
                                                        className="absolute inset-0 w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <>
                                                        <div className="flex items-center justify-between font-mono text-xs" style={{ color: theme.textMuted }}>
                                                            <span>PORTRAIT / STUDIO</span>
                                                            <span>DHAKA, BD</span>
                                                        </div>

                                                        <div className="my-auto text-center">
                                                            <div
                                                                className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center font-display text-3xl font-semibold border"
                                                                style={{
                                                                    backgroundColor: theme.surface,
                                                                    borderColor: theme.borderStrong,
                                                                    color: theme.accent
                                                                }}
                                                            >
                                                                SH
                                                            </div>
                                                            <p className="font-display text-lg font-semibold">
                                                                {siteConfig.name}
                                                            </p>
                                                            <p
                                                                className="text-xs font-mono mt-1 max-w-[220px] mx-auto"
                                                                style={{ color: theme.textMuted }}
                                                            >
                                                                {siteConfig.portrait.placeholderNote}
                                                            </p>
                                                        </div>

                                                        <div
                                                            className="pt-4 border-t flex items-center justify-between text-xs font-mono"
                                                            style={{ borderColor: theme.border, color: theme.textMuted }}
                                                        >
                                                            <span>Amanat Shah Group (ASG)</span>
                                                            <span style={{ color: theme.accent }}>9+ YEARS</span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right 7 Columns: Biography, Philosophy & CV */}
                                    <div className="lg:col-span-7">
                                        <span
                                            className="font-mono text-xs uppercase tracking-[0.2em] block mb-2"
                                            style={{ color: theme.accent }}
                                        >
                                            03 / About Me
                                        </span>
                                        <h2 className="font-display text-3xl sm:text-5xl font-semibold leading-[1.08] mb-8">
                                            Creativity Meets{' '}
                                            <span className="font-serif-italic font-normal" style={{ color: theme.accent }}>
                                                Technical Precision.
                                            </span>
                                        </h2>

                                        <div
                                            className="space-y-5 text-base sm:text-lg leading-relaxed mb-10"
                                            style={{ color: theme.textMuted }}
                                        >
                                            {siteConfig.aboutBioParagraphs.map((paragraph, index) => (
                                                <p
                                                    key={index}
                                                    style={{
                                                        color: index === 2 ? theme.text : theme.textMuted,
                                                        fontWeight: index === 2 ? 500 : 400
                                                    }}
                                                >
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>

                                        {/* Philosophy & Approach Cards */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                                            <div
                                                className="p-6 rounded-2xl border"
                                                style={{
                                                    backgroundColor: theme.surface,
                                                    borderColor: theme.border
                                                }}
                                            >
                                                <span
                                                    className="font-mono text-[11px] uppercase tracking-wider block mb-2"
                                                    style={{ color: theme.accent }}
                                                >
                                                    Professional Philosophy
                                                </span>
                                                <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                                                    {siteConfig.philosophy}
                                                </p>
                                            </div>

                                            <div
                                                className="p-6 rounded-2xl border"
                                                style={{
                                                    backgroundColor: theme.surface,
                                                    borderColor: theme.border
                                                }}
                                            >
                                                <span
                                                    className="font-mono text-[11px] uppercase tracking-wider block mb-2"
                                                    style={{ color: theme.accent }}
                                                >
                                                    Creative Approach
                                                </span>
                                                <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                                                    {siteConfig.creativeApproach}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Download CV & Contact Buttons */}
                                        <div className="flex flex-wrap items-center gap-4">
                                            <a
                                                href={siteConfig.contact.cvUrl}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setCmsOpen(true);
                                                }}
                                                className="px-7 py-4 rounded-full text-sm font-medium inline-flex items-center gap-2.5"
                                                style={{
                                                    backgroundColor: theme.accent,
                                                    color: theme.accentText
                                                }}
                                            >
                                                <Download className="w-4 h-4" />
                                                <span>Download Resume / CV</span>
                                            </a>

                                            <button
                                                onClick={() => navigateToSection('contact')}
                                                className="px-7 py-4 rounded-full text-sm font-medium border"
                                                style={{
                                                    backgroundColor: theme.surface,
                                                    borderColor: theme.borderStrong,
                                                    color: theme.text
                                                }}
                                            >
                                                Discuss a Project
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ===============================================================
                G & H. CAPABILITIES (12) & SOFTWARE SUITE (9)
                =============================================================== */}
                        <section
                            id="capabilities"
                            className="py-24 md:py-32 border-b"
                            style={{ borderColor: theme.border }}
                        >
                            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                                {/* 12 Core Capabilities */}
                                <div className="mb-24">
                                    <div className="max-w-2xl mb-12">
                                        <span
                                            className="font-mono text-xs uppercase tracking-[0.2em] block mb-2"
                                            style={{ color: theme.accent }}
                                        >
                                            04 / Capabilities
                                        </span>
                                        <h2 className="font-display text-3xl sm:text-5xl font-semibold">
                                            What I Bring to the{' '}
                                            <span className="font-serif-italic font-normal">Frame.</span>
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {CORE_CAPABILITIES.map((skill) => (
                                            <div
                                                key={skill.num}
                                                className="p-6 sm:p-7 rounded-2xl border transition-all hover:shadow-sm"
                                                style={{
                                                    backgroundColor: theme.surface,
                                                    borderColor: theme.border
                                                }}
                                            >
                                                <span
                                                    className="font-mono text-xs font-medium block mb-3"
                                                    style={{ color: theme.accent }}
                                                >
                                                    {skill.num}
                                                </span>
                                                <h3 className="font-display text-lg font-semibold mb-2">
                                                    {skill.title}
                                                </h3>
                                                <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                                                    {skill.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 9 Software & Tools */}
                                <div>
                                    <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
                                        <div>
                                            <span
                                                className="font-mono text-xs uppercase tracking-[0.2em] block mb-2"
                                                style={{ color: theme.accent }}
                                            >
                                                05 / Software & Tools
                                            </span>
                                            <h2 className="font-display text-3xl sm:text-5xl font-semibold">
                                                Tools Behind the{' '}
                                                <span className="font-serif-italic font-normal">Vision.</span>
                                            </h2>
                                        </div>

                                        {/* Workflow Group Filter */}
                                        <div className="flex flex-wrap gap-2">
                                            {['All', 'Editing & Color', 'Motion & VFX', '3D & CGI', 'Design & Assets'].map(
                                                (grp) => (
                                                    <button
                                                        key={grp}
                                                        onClick={() => setSelectedSoftwareGroup(grp)}
                                                        className="px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors"
                                                        style={{
                                                            backgroundColor:
                                                                selectedSoftwareGroup === grp ? theme.text : theme.surface,
                                                            borderColor:
                                                                selectedSoftwareGroup === grp ? theme.text : theme.border,
                                                            color: selectedSoftwareGroup === grp ? theme.bg : theme.textMuted
                                                        }}
                                                    >
                                                        {grp}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {filteredSoftware.map((tool) => (
                                            <div
                                                key={tool.name}
                                                className="p-5 rounded-2xl border flex items-center gap-4 transition-all"
                                                style={{
                                                    backgroundColor: theme.surface,
                                                    borderColor: theme.border
                                                }}
                                            >
                                                <div
                                                    className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-sm shrink-0 border"
                                                    style={{
                                                        backgroundColor: theme.accentSoft,
                                                        borderColor: theme.border,
                                                        color: theme.accent
                                                    }}
                                                >
                                                    {tool.code}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-display text-base font-semibold">{tool.name}</h3>
                                                    </div>
                                                    <p className="text-xs mt-0.5" style={{ color: theme.textMuted }}>
                                                        {tool.role}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ===============================================================
                I. PROFESSIONAL EXPERIENCE — CLEAN EXPANDABLE EDITORIAL TIMELINE
                =============================================================== */}
                        <section
                            id="experience"
                            className="py-24 md:py-32 border-b"
                            style={{ borderColor: theme.border }}
                        >
                            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                    {/* Left 4 Columns Heading */}
                                    <div className="lg:col-span-4">
                                        <span
                                            className="font-mono text-xs uppercase tracking-[0.2em] block mb-2"
                                            style={{ color: theme.accent }}
                                        >
                                            06 / Career Timeline
                                        </span>
                                        <h2 className="font-display text-3xl sm:text-5xl font-semibold leading-[1.08] mb-4">
                                            Experience That Shapes{' '}
                                            <span className="font-serif-italic font-normal">Creativity.</span>
                                        </h2>
                                        <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                                            9+ years of professional experience across commercial production, fashion films,
                                            and multimedia organizations.
                                        </p>
                                    </div>

                                    {/* Right 8 Columns Expandable Cards */}
                                    <div className="lg:col-span-8 space-y-4">
                                        {experiences.map((exp, idx) => {
                                            const isOpen = expandedExpId === exp.id;
                                            return (
                                                <div
                                                    key={exp.id}
                                                    className="rounded-2xl border overflow-hidden transition-colors"
                                                    style={{
                                                        backgroundColor: theme.surface,
                                                        borderColor: isOpen ? theme.borderStrong : theme.border
                                                    }}
                                                >
                                                    <button
                                                        onClick={() => setExpandedExpId(isOpen ? null : exp.id)}
                                                        className="w-full p-6 sm:p-7 text-left flex items-start sm:items-center justify-between gap-4"
                                                    >
                                                        <div className="flex items-start gap-4">
                                                            <span
                                                                className="font-mono text-xs pt-1"
                                                                style={{ color: theme.accent }}
                                                            >
                                                                0{idx + 1}
                                                            </span>
                                                            <div>
                                                                <div className="flex flex-wrap items-center gap-2.5 mb-1">
                                                                    <h3 className="font-display text-lg sm:text-xl font-semibold">
                                                                        {exp.organization}
                                                                    </h3>
                                                                    {idx === 0 && (
                                                                        <span
                                                                            className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider"
                                                                            style={{
                                                                                backgroundColor: theme.accentSoft,
                                                                                color: theme.accent
                                                                            }}
                                                                        >
                                                                            Current
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="text-sm" style={{ color: theme.textMuted }}>
                                                                    {exp.role}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-4 shrink-0">
                                                            <span
                                                                className="hidden sm:inline font-mono text-xs"
                                                                style={{ color: theme.textMuted }}
                                                            >
                                                                {exp.period}
                                                            </span>
                                                            <div
                                                                className="w-8 h-8 rounded-full border flex items-center justify-center"
                                                                style={{
                                                                    borderColor: theme.border,
                                                                    color: theme.text
                                                                }}
                                                            >
                                                                {isOpen ? (
                                                                    <Minus className="w-3.5 h-3.5" />
                                                                ) : (
                                                                    <Plus className="w-3.5 h-3.5" />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </button>

                                                    <AnimatePresence>
                                                        {isOpen && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.25 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div
                                                                    className="px-6 sm:px-7 pb-7 pt-2 border-t space-y-4 text-sm"
                                                                    style={{
                                                                        borderColor: theme.border,
                                                                        color: theme.textMuted
                                                                    }}
                                                                >
                                                                    <p style={{ color: theme.text }}>{exp.summary}</p>
                                                                    <ul className="space-y-2 pl-4 list-disc">
                                                                        {exp.responsibilities.map((item, i) => (
                                                                            <li key={i}>{item}</li>
                                                                        ))}
                                                                    </ul>
                                                                    <p
                                                                        className="text-xs font-mono pt-1"
                                                                        style={{ color: theme.accent }}
                                                                    >
                                                                        {exp.contributions}
                                                                    </p>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ===============================================================
                J. CONTACT SECTION — DIRECT CARDS & VALIDATED INQUIRY FORM
                =============================================================== */}
                        <section id="contact" className="py-24 md:py-32">
                            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                    {/* Left 6 Columns: Direct Contact Cards & Socials */}
                                    <div className="lg:col-span-6 flex flex-col justify-between">
                                        <div>
                                            <span
                                                className="font-mono text-xs uppercase tracking-[0.2em] block mb-2"
                                                style={{ color: theme.accent }}
                                            >
                                                07 / Contact
                                            </span>
                                            <h2 className="font-display text-4xl sm:text-6xl font-semibold leading-[1.04] mb-5">
                                                Have a{' '}
                                                <span className="font-serif-italic font-normal" style={{ color: theme.accent }}>
                                                    Story
                                                </span>{' '}
                                                Worth Telling?
                                            </h2>
                                            <p
                                                className="text-base sm:text-lg max-w-md mb-10"
                                                style={{ color: theme.textMuted }}
                                            >
                                                Let&apos;s create something extraordinary together. Available for senior roles,
                                                commercial campaigns, and freelance collaborations.
                                            </p>

                                            {/* Direct Contact Cards */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                                <div
                                                    className="p-5 rounded-2xl border"
                                                    style={{
                                                        backgroundColor: theme.surface,
                                                        borderColor: theme.border
                                                    }}
                                                >
                                                    <span
                                                        className="font-mono text-[10px] uppercase tracking-wider block mb-1"
                                                        style={{ color: theme.textMuted }}
                                                    >
                                                        Professional Email
                                                    </span>
                                                    <div className="flex items-center justify-between gap-2">
                                                        <a
                                                            href={`mailto:${siteConfig.contact.email}`}
                                                            className="font-display text-sm font-semibold truncate hover:underline"
                                                        >
                                                            {siteConfig.contact.email}
                                                        </a>
                                                        <button
                                                            onClick={() => handleCopy(siteConfig.contact.email, 'Email')}
                                                            className="p-1.5 rounded-lg border shrink-0"
                                                            style={{ borderColor: theme.border }}
                                                            title="Copy Email"
                                                        >
                                                            {copiedLabel === 'Email' ? (
                                                                <Check className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                                                            ) : (
                                                                <Copy className="w-3.5 h-3.5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div
                                                    className="p-5 rounded-2xl border"
                                                    style={{
                                                        backgroundColor: theme.surface,
                                                        borderColor: theme.border
                                                    }}
                                                >
                                                    <span
                                                        className="font-mono text-[10px] uppercase tracking-wider block mb-1"
                                                        style={{ color: theme.textMuted }}
                                                    >
                                                        WhatsApp / Direct
                                                    </span>
                                                    <span className="font-display text-sm font-semibold block">
                                                        {siteConfig.contact.whatsapp}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Social Profiles & Resume Bar */}
                                        <div
                                            className="p-6 rounded-2xl border"
                                            style={{
                                                backgroundColor: theme.surface,
                                                borderColor: theme.border
                                            }}
                                        >
                                            <span
                                                className="font-mono text-[10px] uppercase tracking-wider block mb-3"
                                                style={{ color: theme.textMuted }}
                                            >
                                                Networks & Portfolio Channels
                                            </span>
                                            <div className="flex flex-wrap gap-3">
                                                {[
                                                    { label: 'LinkedIn', url: siteConfig.contact.linkedin },
                                                    { label: 'Behance', url: siteConfig.contact.behance },
                                                    { label: 'Vimeo', url: siteConfig.contact.vimeo },
                                                    { label: 'YouTube', url: siteConfig.contact.youtube },
                                                    { label: 'Download Resume', url: siteConfig.contact.cvUrl }
                                                ].map((link) => (
                                                    <a
                                                        key={link.label}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="px-3.5 py-2 rounded-full text-xs font-medium border inline-flex items-center gap-1.5 transition-colors"
                                                        style={{
                                                            backgroundColor: theme.surfaceAlt,
                                                            borderColor: theme.border,
                                                            color: theme.text
                                                        }}
                                                    >
                                                        <span>{link.label}</span>
                                                        <ArrowUpRight className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right 6 Columns: Contact Form */}
                                    <div className="lg:col-span-6">
                                        <form
                                            onSubmit={handleFormSubmit}
                                            noValidate
                                            className="p-8 sm:p-10 rounded-3xl border space-y-6"
                                            style={{
                                                backgroundColor: theme.surface,
                                                borderColor: theme.border
                                            }}
                                        >
                                            <h3 className="font-display text-2xl font-semibold">
                                                Send a Project Inquiry
                                            </h3>

                                            <div>
                                                <label className="block text-xs font-mono uppercase tracking-wider mb-2" style={{ color: theme.textMuted }}>
                                                    Your Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, name: e.target.value });
                                                        if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                                                    }}
                                                    placeholder="Enter your full name"
                                                    className="w-full px-4 py-3.5 rounded-xl border text-sm focus:outline-none"
                                                    style={{
                                                        backgroundColor: theme.bg,
                                                        borderColor: formErrors.name ? '#DC2626' : theme.border,
                                                        color: theme.text
                                                    }}
                                                />
                                                {formErrors.name && (
                                                    <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-mono uppercase tracking-wider mb-2" style={{ color: theme.textMuted }}>
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, email: e.target.value });
                                                        if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                                                    }}
                                                    placeholder="name@company.com"
                                                    className="w-full px-4 py-3.5 rounded-xl border text-sm focus:outline-none"
                                                    style={{
                                                        backgroundColor: theme.bg,
                                                        borderColor: formErrors.email ? '#DC2626' : theme.border,
                                                        color: theme.text
                                                    }}
                                                />
                                                {formErrors.email && (
                                                    <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-mono uppercase tracking-wider mb-2" style={{ color: theme.textMuted }}>
                                                    Subject / Inquiry Type *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.subject}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, subject: e.target.value });
                                                        if (formErrors.subject) setFormErrors({ ...formErrors, subject: '' });
                                                    }}
                                                    placeholder="Commercial Edit, Fashion Film, Motion Design, or Senior Role"
                                                    className="w-full px-4 py-3.5 rounded-xl border text-sm focus:outline-none"
                                                    style={{
                                                        backgroundColor: theme.bg,
                                                        borderColor: formErrors.subject ? '#DC2626' : theme.border,
                                                        color: theme.text
                                                    }}
                                                />
                                                {formErrors.subject && (
                                                    <p className="text-xs text-red-500 mt-1">{formErrors.subject}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-mono uppercase tracking-wider mb-2" style={{ color: theme.textMuted }}>
                                                    Project Details *
                                                </label>
                                                <textarea
                                                    rows={4}
                                                    value={formData.message}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, message: e.target.value });
                                                        if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                                                    }}
                                                    placeholder="Share timeline, deliverables, or role details..."
                                                    className="w-full px-4 py-3.5 rounded-xl border text-sm focus:outline-none resize-none"
                                                    style={{
                                                        backgroundColor: theme.bg,
                                                        borderColor: formErrors.message ? '#DC2626' : theme.border,
                                                        color: theme.text
                                                    }}
                                                />
                                                {formErrors.message && (
                                                    <p className="text-xs text-red-500 mt-1">{formErrors.message}</p>
                                                )}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={formStatus === 'submitting'}
                                                className="w-full py-4 rounded-full text-sm font-medium transition-transform active:scale-98 flex items-center justify-center gap-2"
                                                style={{
                                                    backgroundColor: theme.accent,
                                                    color: theme.accentText
                                                }}
                                            >
                                                <span>
                                                    {formStatus === 'submitting' ? 'Preparing Message...' : 'Send Message'}
                                                </span>
                                                <ArrowUpRight className="w-4 h-4" />
                                            </button>

                                            {formStatus === 'success' && (
                                                <div
                                                    className="p-4 rounded-xl border text-xs flex items-center justify-between gap-4"
                                                    style={{
                                                        backgroundColor: theme.accentSoft,
                                                        borderColor: theme.accent,
                                                        color: theme.text
                                                    }}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: theme.accent }} />
                                                        <span>Message validated and ready to send.</span>
                                                    </div>
                                                    <a
                                                        href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
                                                            formData.subject
                                                        )}&body=${encodeURIComponent(formData.message)}`}
                                                        className="font-semibold underline shrink-0"
                                                        style={{ color: theme.accent }}
                                                    >
                                                        Launch Email App →
                                                    </a>
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </motion.main>
                )}
            </AnimatePresence>

            {/* =====================================================================
          K. MINIMALIST ARCHITECTURAL FOOTER
          ===================================================================== */}
            <footer
                className="border-t py-10"
                style={{
                    backgroundColor: theme.surface,
                    borderColor: theme.border
                }}
            >
                <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: theme.textMuted }}>
                    <div className="flex items-center gap-3">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: theme.accent }}
                        />
                        <span className="font-display font-semibold" style={{ color: theme.text }}>
                            {siteConfig.name}
                        </span>
                        <span>—</span>
                        <span>{siteConfig.title}</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <span>© 2026 All Rights Reserved</span>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="font-medium inline-flex items-center gap-1 hover:underline"
                            style={{ color: theme.text }}
                        >
                            <span>Back to Top</span>
                            <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </footer>

            {/* =====================================================================
          FULLSCREEN SHOWREEL THEATER MODAL
          ===================================================================== */}
            <AnimatePresence>
                {showreelModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-10"
                    >
                        <div className="max-w-5xl w-full">
                            <div className="flex items-center justify-between text-white mb-4">
                                <div>
                                    <span className="font-display text-sm font-semibold">
                                        {siteConfig.name} — Official Showreel
                                    </span>
                                    <span className="text-xs text-white/60 block">
                                        {activeChapter.label}: {activeChapter.note}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setShowreelModalOpen(false)}
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="rounded-2xl overflow-hidden border border-white/15 bg-black">
                                {siteConfig.showreel.videoUrl ? (
                                    siteConfig.showreel.videoUrl.includes('youtube') || siteConfig.showreel.videoUrl.includes('youtu.be') ? (
                                        <div className="relative w-full aspect-video bg-black overflow-hidden select-none">
                                            <iframe
                                                src={getYouTubeCleanEmbed(siteConfig.showreel.videoUrl)}
                                                title="YouTube showreel player"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] border-0 pointer-events-none"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    ) : siteConfig.showreel.videoUrl.includes('vimeo') ? (
                                        <iframe
                                            src={siteConfig.showreel.videoUrl}
                                            title="Vimeo showreel player"
                                            className="w-full aspect-video border-0 bg-black"
                                            allow="autoplay; fullscreen; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <video
                                            src={siteConfig.showreel.videoUrl}
                                            controls
                                            autoPlay
                                            className="w-full aspect-video"
                                        />
                                    )
                                ) : (
                                    <EditorialVisualFrame
                                        theme={STUDIO_THEMES.cinema}
                                        index={activeChapter.id}
                                        category={activeChapter.label}
                                        aspectClass="aspect-video"
                                        pattern="widescreen-cinema"
                                        isHovered={true}
                                        badgeText={siteConfig.showreel.placeholderNote}
                                    />
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* =====================================================================
          LIVE STUDIO CMS & THEME CONFIG DRAWER
          ===================================================================== */}
            <AnimatePresence>
                {cmsOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end"
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.25 }}
                            className="w-full max-w-md h-full p-6 sm:p-8 overflow-y-auto flex flex-col justify-between border-l"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.border,
                                color: theme.text
                            }}
                        >
                            <div className="space-y-6">
                                <div
                                    className="flex items-center justify-between pb-4 border-b"
                                    style={{ borderColor: theme.border }}
                                >
                                    <div>
                                        <h3 className="font-display text-lg font-semibold">Studio CMS & Theme</h3>
                                        <p className="text-xs" style={{ color: theme.textMuted }}>
                                            Live portfolio configuration & JSON exporter
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setCmsOpen(false)}
                                        className="p-2 rounded-full border"
                                        style={{ borderColor: theme.border }}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Theme Selector inside CMS */}
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider mb-2" style={{ color: theme.textMuted }}>
                                        Active Color Theme
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.values(STUDIO_THEMES).map((t) => (
                                            <button
                                                key={t.id}
                                                onClick={() => setActiveThemeKey(t.id)}
                                                className="p-2.5 rounded-xl border text-left text-xs font-medium flex items-center gap-2"
                                                style={{
                                                    backgroundColor: t.id === activeThemeKey ? theme.surfaceAlt : 'transparent',
                                                    borderColor: t.id === activeThemeKey ? theme.accent : theme.border
                                                }}
                                            >
                                                <span
                                                    className="w-3.5 h-3.5 rounded-full shrink-0"
                                                    style={{ backgroundColor: t.swatch }}
                                                />
                                                <span>{t.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Editable Fields */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-mono uppercase mb-1" style={{ color: theme.textMuted }}>
                                            Availability Status
                                        </label>
                                        <input
                                            type="text"
                                            value={siteConfig.availabilityText}
                                            onChange={(e) =>
                                                setSiteConfig({ ...siteConfig, availabilityText: e.target.value })
                                            }
                                            className="w-full px-3.5 py-2.5 rounded-xl border text-xs"
                                            style={{
                                                backgroundColor: theme.bg,
                                                borderColor: theme.border,
                                                color: theme.text
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono uppercase mb-1" style={{ color: theme.textMuted }}>
                                            Showreel MP4 Video URL
                                        </label>
                                        <input
                                            type="text"
                                            value={siteConfig.showreel.videoUrl}
                                            placeholder="https://.../showreel.mp4"
                                            onChange={(e) =>
                                                setSiteConfig({
                                                    ...siteConfig,
                                                    showreel: { ...siteConfig.showreel, videoUrl: e.target.value }
                                                })
                                            }
                                            className="w-full px-3.5 py-2.5 rounded-xl border text-xs"
                                            style={{
                                                backgroundColor: theme.bg,
                                                borderColor: theme.border,
                                                color: theme.text
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono uppercase mb-1" style={{ color: theme.textMuted }}>
                                            Portrait Image URL
                                        </label>
                                        <input
                                            type="text"
                                            value={siteConfig.portrait.imageUrl}
                                            placeholder="/images/shahdat-portrait.jpg"
                                            onChange={(e) =>
                                                setSiteConfig({
                                                    ...siteConfig,
                                                    portrait: { ...siteConfig.portrait, imageUrl: e.target.value }
                                                })
                                            }
                                            className="w-full px-3.5 py-2.5 rounded-xl border text-xs"
                                            style={{
                                                backgroundColor: theme.bg,
                                                borderColor: theme.border,
                                                color: theme.text
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono uppercase mb-1" style={{ color: theme.textMuted }}>
                                            Direct Email
                                        </label>
                                        <input
                                            type="email"
                                            value={siteConfig.contact.email}
                                            onChange={(e) =>
                                                setSiteConfig({
                                                    ...siteConfig,
                                                    contact: { ...siteConfig.contact, email: e.target.value }
                                                })
                                            }
                                            className="w-full px-3.5 py-2.5 rounded-xl border text-xs"
                                            style={{
                                                backgroundColor: theme.bg,
                                                borderColor: theme.border,
                                                color: theme.text
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono uppercase mb-1" style={{ color: theme.textMuted }}>
                                            WhatsApp / Phone
                                        </label>
                                        <input
                                            type="text"
                                            value={siteConfig.contact.whatsapp}
                                            onChange={(e) =>
                                                setSiteConfig({
                                                    ...siteConfig,
                                                    contact: { ...siteConfig.contact, whatsapp: e.target.value }
                                                })
                                            }
                                            className="w-full px-3.5 py-2.5 rounded-xl border text-xs"
                                            style={{
                                                backgroundColor: theme.bg,
                                                borderColor: theme.border,
                                                color: theme.text
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 space-y-2.5">
                                <button
                                    onClick={() =>
                                        handleCopy(JSON.stringify(siteConfig, null, 2), 'Config JSON')
                                    }
                                    className="w-full py-3 rounded-full border text-xs font-medium flex items-center justify-center gap-2"
                                    style={{
                                        borderColor: theme.borderStrong,
                                        color: theme.text
                                    }}
                                >
                                    {copiedLabel === 'Config JSON' ? (
                                        <>
                                            <Check className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                                            <span>Copied Config JSON!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3.5 h-3.5" />
                                            <span>Export / Copy Config JSON</span>
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={() => setCmsOpen(false)}
                                    className="w-full py-3 rounded-full text-xs font-medium"
                                    style={{
                                        backgroundColor: theme.accent,
                                        color: theme.accentText
                                    }}
                                >
                                    Save & Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}