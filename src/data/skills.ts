import { Capability, SoftwareTool } from '@/types';

export const CORE_CAPABILITIES: Capability[] = [
    {
        num: '01',
        title: 'Professional Video Editing',
        group: 'Editing & Film',
        icon: 'scissors',
        deliverable: 'Broadcast & Narrative Cuts',
        relatedCategory: 'Commercial Advertisements',
        desc: 'Narrative structure, rhythmic pacing, and frame-accurate assembly for commercial and editorial films.'
    },
    {
        num: '02',
        title: 'Motion Graphics Design',
        group: 'Motion & 3D',
        icon: 'layers',
        deliverable: 'Kinetic Type & Broadcast UI',
        relatedCategory: 'Motion Graphics',
        desc: 'Bespoke 2D/3D motion systems, kinetic typography, title sequences, and broadcast packages.'
    },
    {
        num: '03',
        title: 'Visual Storytelling',
        group: 'Editing & Film',
        icon: 'clapperboard',
        deliverable: 'Director-Led Story Arcs',
        relatedCategory: 'Commercial Advertisements',
        desc: 'Translating complex brand messages into clear, emotionally resonant visual narratives.'
    },
    {
        num: '04',
        title: 'Fashion Film Editing',
        group: 'Editing & Film',
        icon: 'sparkles',
        deliverable: 'Couture & Campaign Films',
        relatedCategory: 'Fashion Films',
        desc: 'Sensory cutting tailored to silhouette, fabric movement, music tempo, and luxury aesthetics.'
    },
    {
        num: '05',
        title: 'Commercial Video Production',
        group: 'Strategy & Social',
        icon: 'tv',
        deliverable: 'TVC & Digital Brand Spots',
        relatedCategory: 'Commercial Advertisements',
        desc: 'High-impact TVCs and digital commercials engineered for audience retention and brand recall.'
    },
    {
        num: '06',
        title: 'Product Advertising',
        group: 'Strategy & Social',
        icon: 'package',
        deliverable: 'Speed-Ramps & CGI Reveals',
        relatedCategory: 'Commercial Advertisements',
        desc: 'Macro tabletop cuts, speed-ramped reveals, and CGI-enhanced product showcases.'
    },
    {
        num: '07',
        title: 'Brand Campaigns',
        group: 'Motion & 3D',
        icon: 'megaphone',
        deliverable: 'Logo Reveals & Sonic Idents',
        relatedCategory: 'Logo Animation',
        desc: 'Cohesive visual identity and storytelling across hero anthems and multi-platform deliverables.'
    },
    {
        num: '08',
        title: 'Color Grading',
        group: 'Color & VFX',
        icon: 'palette',
        deliverable: 'DaVinci Resolve Pipeline',
        relatedCategory: 'Fashion Films',
        desc: 'Look development, shot matching, skin-tone balancing, and cinematic finishing in DaVinci Resolve.'
    },
    {
        num: '09',
        title: 'Visual Effects',
        group: 'Color & VFX',
        icon: 'wand',
        deliverable: 'Tracking, Roto & AI R&D',
        relatedCategory: 'AI Content',
        desc: '3D camera tracking, rotoscoping, keying, clean-plate cleanup, and seamless compositing.'
    },
    {
        num: '10',
        title: '2D & 3D Animation',
        group: 'Motion & 3D',
        icon: 'box',
        deliverable: 'Blender, C4D & Character Rig',
        relatedCategory: 'Animation & Visual Effects',
        desc: 'Expressive keyframe choreography, logo idents, and 3D scene animation.'
    },
    {
        num: '11',
        title: 'Creative Direction',
        group: 'Strategy & Social',
        icon: 'compass',
        deliverable: 'End-to-End Post Supervision',
        relatedCategory: 'All',
        desc: 'Guiding visual tone, edit supervision, and post-production workflows from brief to master.'
    },
    {
        num: '12',
        title: 'Social Media Content Production',
        group: 'Strategy & Social',
        icon: 'smartphone',
        deliverable: 'High-Retention 9:16 Reels',
        relatedCategory: 'Social Media Reels',
        desc: 'High-retention vertical Reels and short-form video series crafted with studio-grade polish.'
    }
];

export const SOFTWARE_TOOLS: SoftwareTool[] = [
    {
        name: 'Adobe Premiere Pro',
        code: 'Pr',
        category: 'Editing & Color',
        role: 'Nonlinear Editing & Timeline Finishing',
        proficiency: 95,
        level: 'Mastery'
    },
    {
        name: 'Adobe After Effects',
        code: 'Ae',
        category: 'Motion & VFX',
        role: '2D/3D Motion Graphics & Compositing',
        proficiency: 90,
        level: 'Expert'
    },
    {
        name: 'Adobe Photoshop',
        code: 'Ps',
        category: 'Design & Assets',
        role: 'Styleframes, Retouching & Matte Art',
        proficiency: 60,
        level: 'Proficient'
    },
    {
        name: 'Adobe Illustrator',
        code: 'Ai',
        category: 'Design & Assets',
        role: 'Vector Systems & Typography Assets',
        proficiency: 60,
        level: 'Proficient'
    },
    {
        name: 'DaVinci Resolve',
        code: 'DR',
        category: 'Editing & Color',
        role: 'Color Grading & Finishing Pipeline',
        proficiency: 50,
        level: 'Intermediate'
    },
    {
        name: 'Cinema 4D',
        code: 'C4D',
        category: '3D & CGI',
        role: '3D Motion Design & Procedural Animation',
        proficiency: 50,
        level: 'Intermediate'
    },
    {
        name: 'Blender',
        code: 'BL',
        category: '3D & CGI',
        role: '3D Modeling, Shading & Rendering',
        proficiency: 50,
        level: 'Intermediate'
    },
    {
        name: 'Autodesk 3ds Max',
        code: '3ds',
        category: '3D & CGI',
        role: '3D Visualization & Product CGI',
        proficiency: 30,
        level: 'Foundation'
    },
    {
        name: 'Autodesk Maya',
        code: 'My',
        category: '3D & CGI',
        role: '3D Animation & VFX Pipeline',
        proficiency: 30,
        level: 'Foundation'
    }
];
