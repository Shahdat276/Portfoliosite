import { Project } from '@/types';

export const INITIAL_PROJECTS: Project[] = [
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
            { title: '01 / Opening Title Card', caption: 'Minimalist serif kinetic typography over warm studio grain.' },
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
