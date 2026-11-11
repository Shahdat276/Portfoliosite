import { SiteConfig } from '@/types';

export const INITIAL_SITE_CONFIG: SiteConfig = {
    name: 'Shahdat Hossain',
    wordmark: 'SHAHDAT HOSSAIN',
    title: 'Senior Video Editor & Motion Graphics Designer',
    experienceYears: '9+ Years',
    experienceFull: '9+ Years of Professional Experience',
    location: 'Dhaka, Bangladesh',
    currentOrganization: 'Amanat Shah Group (ASG)',
    education: 'B.Sc. in Multimedia & Creative Technology (MCT) — DIU',
    languages: 'Bengali (Native), English (Fluent)',
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
            { id: '01', label: '01 Commercial', time: '00:00', seconds: 0, progress: 5, note: 'TV & Digital Brand Spots' },
            { id: '02', label: '02 Fashion Film', time: '00:28', seconds: 28, progress: 26, note: 'Editorial Couture & Rhythm' },
            { id: '03', label: '03 3D Motion', time: '00:56', seconds: 56, progress: 52, note: 'Cinema 4D, Blender & After Effects' },
            { id: '04', label: '04 Brand Campaign', time: '01:22', seconds: 82, progress: 76, note: 'Integrated Visual Storytelling' }
        ]
    },
    portrait: {
        imageUrl: '/images/shahdat.jpg',
        posterUrl: '/images/shahdat-portrait-poster.jpg',
        videoWebmUrl: '/videos/shahdat-portrait.webm',
        videoMp4Url: '/videos/shahdat-portrait.mp4',
        placeholderNote: 'Shahdat Hossain — Senior Video Editor & Motion Designer'
    },
    contact: {
        email: 'shahdathossain0779@gmail.com',
        whatsapp: '+880 1850-993126',
        linkedin: 'https://www.linkedin.com/in/shahdatofficial/',
        behance: 'https://www.behance.net/shahdathossain6',
        vimeo: '',
        youtube: 'https://www.youtube.com/@samtutsofficial',
        cvUrl: '/cv/Shahdat_Hossain_CV.pdf',
        formEndpoint: 'https://formsubmit.co/ajax/shahdathossain0779@gmail.com'
    }
};

export const PROJECT_CATEGORIES = [
    'All',
    'Commercial Advertisements',
    'Fashion Films',
    'Motion Graphics',
    'Logo Animation',
    'Animation & Visual Effects',
    'Social Media Reels',
    'AI Content'
] as const;
