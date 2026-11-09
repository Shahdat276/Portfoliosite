import { Capability, SoftwareTool } from '@/types';

export const CORE_CAPABILITIES: Capability[] = [
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

export const SOFTWARE_TOOLS: SoftwareTool[] = [
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
