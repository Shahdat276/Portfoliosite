export interface ProjectGalleryItem {
    label: string;
    ratio: string;
    tc: string;
    imageUrl?: string;
}

export interface Project {
    slug: string;
    index: string;
    title: string;
    client: string;
    category: string;
    year: string;
    role: string;
    aspectRatio: string;
    gridSpan: string;
    featured: boolean;
    timecode: string;
    videoUrl: string;
    thumbnailUrl?: string;
    palette: string[];
    patternType: string;
    shortDescription: string;
    overview: string;
    challenge: string;
    conceptAndDirection: string;
    editingWorkflow: string;
    motionGraphicsProcess: string;
    colorGradingAndFinishing: string;
    software: string[];
    galleryPlaceholders: ProjectGalleryItem[];
}

export const PROJECT_CATEGORIES = [
    'All',
    'Fashion Films',
    'Commercial Advertisements',
    'Motion Graphics',
    'Product Videos',
    'Brand Campaigns',
    'Social Media Reels',
    'Logo Animation',
    'Animation & Visual Effects'
] as const;

export const INITIAL_PROJECTS: Project[] = [
    {
        slug: 'editorial-fashion-film-placeholder',
        index: '01',
        title: '[PLACEHOLDER 01] — Haute Couture Seasonal Fashion Film',
        client: '[CLIENT / BRAND NAME PLACEHOLDER]',
        category: 'Fashion Films',
        year: '[YEAR PLACEHOLDER]',
        role: 'Senior Video Editor & Colorist',
        aspectRatio: '16/9',
        gridSpan: 'lg:col-span-8',
        featured: true,
        timecode: '00:02:18:14',
        videoUrl: '', // Add YouTube, Vimeo or MP4 URL here
        palette: ['#C7FF4A', '#1E293B', '#0F172A'],
        patternType: 'fashion',
        shortDescription:
            'High-contrast rhythmic fashion film edit combining anamorphic cinematography, kinetic typography, and bespoke film-print color emulation.',
        overview:
            '[PLACEHOLDER OVERVIEW — Replace with actual project summary] This case study template demonstrates how a flagship fashion film is presented. It highlights narrative pacing, fabric movement synchronization, and editorial sound design.',
        challenge:
            '[PLACEHOLDER CHALLENGE] Translating multi-camera studio and location footage into a cohesive, emotionally arresting 2-minute seasonal campaign film with zero visual drag.',
        conceptAndDirection:
            '[PLACEHOLDER CONCEPT] Built around stark chiaroscuro lighting, rapid J-cuts and L-cuts synced to percussive Foley, and minimalist title cards.',
        editingWorkflow:
            'Assembled in Adobe Premiere Pro using proxy-optimized multi-cam sequences, frame-accurate rhythm markers, and dynamic link round-tripping.',
        motionGraphicsProcess:
            'Created custom editorial title Lockups, subtle frame-border mattes, and kinetic credits in Adobe After Effects.',
        colorGradingAndFinishing:
            'Graded in DaVinci Resolve using a custom node tree for halation, skin-tone isolation, and 2383 film print LUT finishing.',
        software: ['Adobe Premiere Pro', 'DaVinci Resolve', 'Adobe After Effects', 'Adobe Photoshop'],
        galleryPlaceholders: [
            { label: 'Frame 01 — Opening Wide Anamorphic Cut', ratio: '16/9', tc: '00:00:12:04' },
            { label: 'Frame 02 — Node Graph & Color Pipeline', ratio: '16/9', tc: '00:00:48:19' },
            { label: 'Frame 03 — Kinetic Typography Overlay', ratio: '16/9', tc: '00:01:22:08' },
            { label: 'Frame 04 — Final Mastering Spec Frame', ratio: '16/9', tc: '00:02:09:00' }
        ]
    },
    {
        slug: 'commercial-advertisement-flagship-placeholder',
        index: '02',
        title: '[PLACEHOLDER 02] — National Television & Digital Commercial',
        client: '[CLIENT / BRAND NAME PLACEHOLDER]',
        category: 'Commercial Advertisements',
        year: '[YEAR PLACEHOLDER]',
        role: 'Lead Video Editor & Motion Designer',
        aspectRatio: '4/5',
        gridSpan: 'lg:col-span-4',
        featured: true,
        timecode: '00:00:45:00',
        videoUrl: '',
        palette: ['#38BDF8', '#C7FF4A', '#090D16'],
        patternType: 'commercial',
        shortDescription:
            'High-impact commercial spot engineered for broadcast and digital conversion with tight 45-second storytelling and motion callouts.',
        overview:
            '[PLACEHOLDER OVERVIEW — Replace with actual project summary] Commercial advertisement production showcasing fast-paced storytelling, product hero moments, and broadcast-compliant mastering.',
        challenge:
            '[PLACEHOLDER CHALLENGE] Delivering a high-retention commercial across 16:9 broadcast, 1:1 feed, and 9:16 vertical formats without losing compositional power.',
        conceptAndDirection:
            '[PLACEHOLDER CONCEPT] High-energy match-cuts transitioning seamlessly between lifestyle scenes and studio macro shots.',
        editingWorkflow:
            'Structured three-act commercial hook, build, and payoff in Adobe Premiere Pro with custom sound design stems.',
        motionGraphicsProcess:
            'Designed tracked callout graphics, lower thirds, and end-slate packshot animations in Adobe After Effects.',
        colorGradingAndFinishing:
            'Broadcast-safe Rec.709 color grading and loudness normalization (-14 LUFS digital / -24 LKFS broadcast) in DaVinci Resolve.',
        software: ['Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve', 'Adobe Illustrator'],
        galleryPlaceholders: [
            { label: 'Frame 01 — 3-Second Hook Sequence', ratio: '16/9', tc: '00:00:02:15' },
            { label: 'Frame 02 — Motion Tracked Callouts', ratio: '16/9', tc: '00:00:19:02' },
            { label: 'Frame 03 — Multi-Aspect Ratio Deliverables', ratio: '16/9', tc: '00:00:34:11' },
            { label: 'Frame 04 — Broadcast Packshot Slate', ratio: '16/9', tc: '00:00:43:20' }
        ]
    },
    {
        slug: '3d-motion-graphics-system-placeholder',
        index: '03',
        title: '[PLACEHOLDER 03] — Abstract 3D & Kinetic Motion Design System',
        client: '[CLIENT / BRAND NAME PLACEHOLDER]',
        category: 'Motion Graphics',
        year: '[YEAR PLACEHOLDER]',
        role: 'Motion Graphics Designer & 3D Artist',
        aspectRatio: '16/9',
        gridSpan: 'lg:col-span-5',
        featured: true,
        timecode: '00:01:12:08',
        videoUrl: '',
        palette: ['#A855F7', '#C7FF4A', '#111216'],
        patternType: 'motion',
        shortDescription:
            'Procedural 3D geometry, Physically Based Rendering (PBR) shaders, and bespoke kinetic typography system.',
        overview:
            '[PLACEHOLDER OVERVIEW — Replace with actual project summary] A comprehensive motion identity package combining 3D procedural simulations with razor-sharp 2D typographic choreography.',
        challenge:
            '[PLACEHOLDER CHALLENGE] Creating a modular motion design toolkit capable of scaling across event LED walls, broadcast stingers, and digital campaigns.',
        conceptAndDirection:
            '[PLACEHOLDER CONCEPT] Tactile metallic and glass materials interacting with bold Space Grotesk kinetic typography in dark void lighting.',
        editingWorkflow:
            'Animatic timing and beat-mapping established in Premiere Pro prior to 3D scene camera blocking.',
        motionGraphicsProcess:
            'Modeled and animated in Cinema 4D and Blender, rendered via multi-pass EXR, and composited with optical glow and chromatic aberration in After Effects.',
        colorGradingAndFinishing:
            'ACEScg color space management ensuring deep shadow roll-off and vibrant neon lime highlights.',
        software: ['Cinema 4D', 'Blender', 'Adobe After Effects', 'DaVinci Resolve'],
        galleryPlaceholders: [
            { label: 'Frame 01 — Wireframe & Cloner Setup', ratio: '16/9', tc: '00:00:08:10' },
            { label: 'Frame 02 — Multi-Pass EXR Compositing', ratio: '16/9', tc: '00:00:27:04' },
            { label: 'Frame 03 — Kinetic Typography Grid', ratio: '16/9', tc: '00:00:51:16' },
            { label: 'Frame 04 — Final Shader Render', ratio: '16/9', tc: '00:01:08:22' }
        ]
    },
    {
        slug: 'luxury-product-advertisement-placeholder',
        index: '04',
        title: '[PLACEHOLDER 04] — Macro CGI & Live-Action Product Film',
        client: '[CLIENT / BRAND NAME PLACEHOLDER]',
        category: 'Product Videos',
        year: '[YEAR PLACEHOLDER]',
        role: 'Senior Video Editor & CGI Generalist',
        aspectRatio: '16/9',
        gridSpan: 'lg:col-span-7',
        featured: true,
        timecode: '00:00:58:19',
        videoUrl: '',
        palette: ['#F59E0B', '#C7FF4A', '#08090B'],
        patternType: 'product',
        shortDescription:
            'Precision product advertisement blending high-speed phantom macro cinematography with photorealistic 3D product reveals.',
        overview:
            '[PLACEHOLDER OVERVIEW — Replace with actual project summary] Designed to highlight industrial design craftsmanship through dramatic rim lighting, speed-ramped macro transitions, and 3D exploded views.',
        challenge:
            '[PLACEHOLDER CHALLENGE] Seamlessly matching live-action tabletop footage with CG product internals and particle simulations.',
        conceptAndDirection:
            '[PLACEHOLDER CONCEPT] Precision engineering meets dark luxury aesthetics—every specular highlight reveals product form.',
        editingWorkflow:
            'Speed-ramping, time-remapping, and optical flow smoothing in Adobe Premiere Pro and After Effects.',
        motionGraphicsProcess:
            '3D product visualization and camera match-moving using Autodesk 3ds Max, Maya, and Cinema 4D.',
        colorGradingAndFinishing:
            'Specular control, metallic sheen enhancement, and dust/scratch cleanup in DaVinci Resolve.',
        software: ['Adobe Premiere Pro', 'Adobe After Effects', 'Autodesk 3ds Max', 'Cinema 4D', 'DaVinci Resolve'],
        galleryPlaceholders: [
            { label: 'Frame 01 — Rim-Lit Silhouette Reveal', ratio: '16/9', tc: '00:00:06:12' },
            { label: 'Frame 02 — 3D Exploded Component View', ratio: '16/9', tc: '00:00:24:09' },
            { label: 'Frame 03 — Speed-Ramped Macro Transition', ratio: '16/9', tc: '00:00:41:18' },
            { label: 'Frame 04 — Hero Product Lockup', ratio: '16/9', tc: '00:00:55:00' }
        ]
    },
    {
        slug: 'integrated-brand-campaign-placeholder',
        index: '05',
        title: '[PLACEHOLDER 05] — Multi-Platform Brand Anthem Campaign',
        client: '[CLIENT / BRAND NAME PLACEHOLDER]',
        category: 'Brand Campaigns',
        year: '[YEAR PLACEHOLDER]',
        role: 'Senior Video Editor & Visual Storyteller',
        aspectRatio: '21/9',
        gridSpan: 'lg:col-span-12',
        featured: true,
        timecode: '00:03:10:00',
        videoUrl: '',
        palette: ['#10B981', '#C7FF4A', '#08090B'],
        patternType: 'campaign',
        shortDescription:
            'Widescreen brand anthem uniting documentary authenticity, kinetic brand messaging, and emotive orchestral pacing.',
        overview:
            '[PLACEHOLDER OVERVIEW — Replace with actual project summary] Flagship corporate and consumer brand campaign developed to communicate heritage, scale, and future vision.',
        challenge:
            '[PLACEHOLDER CHALLENGE] Weaving together diverse footage sources, voiceover narratives, and brand guidelines into a unified cinematic experience.',
        conceptAndDirection:
            '[PLACEHOLDER CONCEPT] Human-centric visual storytelling elevated by subtle motion design chapters and cohesive color architecture.',
        editingWorkflow:
            'Long-form narrative assembly, dialogue editing, and music stem remixing in Adobe Premiere Pro.',
        motionGraphicsProcess:
            'Bespoke chapter titles, data visualization overlays, and brand watermark integration in After Effects and Illustrator.',
        colorGradingAndFinishing:
            'Widescreen 2.39:1 cinema crop mastering and unified look development across multi-camera log profiles.',
        software: ['Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve', 'Adobe Photoshop', 'Adobe Illustrator'],
        galleryPlaceholders: [
            { label: 'Frame 01 — 2.39:1 Anamorphic Establishing Frame', ratio: '16/9', tc: '00:00:18:00' },
            { label: 'Frame 02 — Narrative Montage Sequence', ratio: '16/9', tc: '00:01:14:22' },
            { label: 'Frame 03 — Brand Data Motion Infographic', ratio: '16/9', tc: '00:02:05:11' },
            { label: 'Frame 04 — Anthem Finale & Identity', ratio: '16/9', tc: '00:03:02:04' }
        ]
    },
    {
        slug: 'high-retention-social-media-reels-placeholder',
        index: '06',
        title: '[PLACEHOLDER 06] — High-Velocity Vertical Reels & Short-Form Series',
        client: '[CLIENT / BRAND NAME PLACEHOLDER]',
        category: 'Social Media Reels',
        year: '[YEAR PLACEHOLDER]',
        role: 'Senior Video Editor & Motion Designer',
        aspectRatio: '4/5',
        gridSpan: 'lg:col-span-4',
        featured: false,
        timecode: '00:00:30:00',
        videoUrl: '',
        palette: ['#EC4899', '#C7FF4A', '#111216'],
        patternType: 'reels',
        shortDescription:
            '9:16 vertical visual storytelling engineered for maximum audience retention, dynamic captions, and seamless loop transitions.',
        overview:
            '[PLACEHOLDER OVERVIEW — Replace with actual project summary] A series of mobile-first vertical videos combining studio-grade motion graphics with high-velocity editorial pacing.',
        challenge:
            '[PLACEHOLDER CHALLENGE] Stopping scroll within the first 1.2 seconds while maintaining luxury brand aesthetics rather than generic template styles.',
        conceptAndDirection:
            '[PLACEHOLDER CONCEPT] Custom rotoscoped transitions, 3D camera projection in 9:16 space, and bespoke kinetic typography.',
        editingWorkflow:
            'Beat-synced micro-cuts, seamless infinite loop engineering, and punchy SFX layering in Premiere Pro.',
        motionGraphicsProcess:
            'Custom animated typography, rotoscoping, and depth-map parallax effects in After Effects.',
        colorGradingAndFinishing:
            'Mobile OLED-optimized contrast and saturation calibration.',
        software: ['Adobe Premiere Pro', 'Adobe After Effects', 'Adobe Photoshop'],
        galleryPlaceholders: [
            { label: 'Frame 01 — 9:16 Hook Composition', ratio: '16/9', tc: '00:00:01:08' },
            { label: 'Frame 02 — Roto-Mask Transition', ratio: '16/9', tc: '00:00:11:14' },
            { label: 'Frame 03 — Kinetic Caption System', ratio: '16/9', tc: '00:00:21:00' },
            { label: 'Frame 04 — Infinite Loop Seam', ratio: '16/9', tc: '00:00:29:23' }
        ]
    },
    {
        slug: 'bespoke-logo-animation-ident-placeholder',
        index: '07',
        title: '[PLACEHOLDER 07] — Sonic & Visual Brand Ident / Logo Animation',
        client: '[CLIENT / BRAND NAME PLACEHOLDER]',
        category: 'Logo Animation',
        year: '[YEAR PLACEHOLDER]',
        role: 'Motion Graphics Designer',
        aspectRatio: '16/9',
        gridSpan: 'lg:col-span-4',
        featured: false,
        timecode: '00:00:08:12',
        videoUrl: '',
        palette: ['#C7FF4A', '#3B82F6', '#08090B'],
        patternType: 'logo',
        shortDescription:
            'Signature 8-second brand mnemonic and logo animation system built with custom graph-editor easing and 3D light sweeps.',
        overview:
            '[PLACEHOLDER OVERVIEW — Replace with actual project summary] A timeless sonic and visual logo reveal engineered for broadcast intros, digital pre-rolls, and presentation decks.',
        challenge:
            '[PLACEHOLDER CHALLENGE] Distilling a brand’s core personality into a memorable 5-to-8 second motion signature.',
        conceptAndDirection:
            '[PLACEHOLDER CONCEPT] Geometric vector construction morphing into dimensional form with custom speed-graph curves.',
        editingWorkflow:
            'Vector preparation in Adobe Illustrator with clean spline hierarchy for After Effects and Cinema 4D import.',
        motionGraphicsProcess:
            'Custom bezier velocity curves in After Effects combined with 3D specular light sweeps in Blender / Cinema 4D.',
        colorGradingAndFinishing:
            'Delivered in ProRes 4444 with Alpha channel, MP4 H.264, and Lottie-ready vector variants.',
        software: ['Adobe After Effects', 'Adobe Illustrator', 'Cinema 4D', 'Blender'],
        galleryPlaceholders: [
            { label: 'Frame 01 — Vector Construction Grid', ratio: '16/9', tc: '00:00:01:12' },
            { label: 'Frame 02 — Graph Editor Velocity Curves', ratio: '16/9', tc: '00:00:03:18' },
            { label: 'Frame 03 — 3D Light Sweep Pass', ratio: '16/9', tc: '00:00:05:20' },
            { label: 'Frame 04 — Final Brand Lockup', ratio: '16/9', tc: '00:00:08:00' }
        ]
    },
    {
        slug: 'vfx-compositing-animation-showcase-placeholder',
        index: '08',
        title: '[PLACEHOLDER 08] — CGI Environment & Visual Effects Compositing',
        client: '[CLIENT / BRAND NAME PLACEHOLDER]',
        category: 'Animation & Visual Effects',
        year: '[YEAR PLACEHOLDER]',
        role: 'VFX Artist & Motion Designer',
        aspectRatio: '16/9',
        gridSpan: 'lg:col-span-4',
        featured: false,
        timecode: '00:01:36:04',
        videoUrl: '',
        palette: ['#22D3EE', '#C7FF4A', '#090A0F'],
        patternType: 'vfx',
        shortDescription:
            '3D camera tracking, set extension, Chroma keying, particle dynamics, and seamless live-action VFX integration.',
        overview:
            '[PLACEHOLDER OVERVIEW — Replace with actual project summary] Visual effects breakdown and final sequence demonstrating clean plate reconstruction, 3D match-moving, and CG integration.',
        challenge:
            '[PLACEHOLDER CHALLENGE] Integrating complex 3D assets and atmospheric effects into handheld live-action plates with accurate perspective and lighting match.',
        conceptAndDirection:
            '[PLACEHOLDER CONCEPT] Invisible VFX and stylized hyper-reality supporting the director’s narrative vision.',
        editingWorkflow:
            'VFX shot pulls, handles management, and ACES plate export in Premiere Pro and DaVinci Resolve.',
        motionGraphicsProcess:
            '3D asset creation in Autodesk Maya, 3ds Max, and Blender; compositing, keying, and tracking in After Effects.',
        colorGradingAndFinishing:
            'Grain matching, lens distortion restoration, and final theatrical color pass in DaVinci Resolve.',
        software: ['Adobe After Effects', 'Autodesk Maya', 'Autodesk 3ds Max', 'Blender', 'DaVinci Resolve'],
        galleryPlaceholders: [
            { label: 'Frame 01 — Raw Green Screen / Live Plate', ratio: '16/9', tc: '00:00:14:02' },
            { label: 'Frame 02 — 3D Camera Track & Point Cloud', ratio: '16/9', tc: '00:00:39:11' },
            { label: 'Frame 03 — CG Lighting & Shadow Pass', ratio: '16/9', tc: '00:01:02:19' },
            { label: 'Frame 04 — Final Graded Composite', ratio: '16/9', tc: '00:01:28:06' }
        ]
    }
];

