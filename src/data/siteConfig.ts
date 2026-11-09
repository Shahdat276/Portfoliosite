export interface SiteConfig {
    name: string;
    wordmark: string;
    title: string;
    experienceYears: string;
    experienceFull: string;
    location: string;
    currentOrganization: string;
    availabilityText: string;
    isAvailable: boolean;
    heroPrimaryHeadline: string;
    heroSecondaryHeadline: string;
    heroIntro: string;
    aboutHeadline: string;
    aboutBioParagraphs: string[];
    philosophy: string;
    creativeApproach: string;
    showreel: {
        heading: string;
        supportingText: string;
        videoUrl: string;
        posterUrl: string;
        durationTimecode: string;
        placeholderNotice: string;
    };
    portrait: {
        imageUrl: string;
        placeholderLabel: string;
    };
    contact: {
        email: string;
        whatsapp: string;
        linkedin: string;
        behance: string;
        vimeo: string;
        youtube: string;
        cvUrl: string;
        formEndpoint: string;
    };
    seo: {
        title: string;
        description: string;
        canonicalUrl: string;
    };
}

export const INITIAL_SITE_CONFIG: SiteConfig = {
    name: 'Shahdat Hossain',
    wordmark: 'SHAHDAT HOSSAIN',
    title: 'Senior Video Editor & Motion Graphics Designer',
    experienceYears: '9+ Years',
    experienceFull: '9+ Years of Professional Experience',
    location: 'Dhaka, Bangladesh',
    currentOrganization: 'Amanat Shah Group (ASG)',
    availabilityText: 'AVAILABLE FOR SELECT COMMERCIAL & CREATIVE PROJECTS',
    isAvailable: true,
    heroPrimaryHeadline: 'VISUALS THAT MOVE PEOPLE.',
    heroSecondaryHeadline: 'Crafting Stories Through Motion.',
    heroIntro:
        "I'm Shahdat Hossain, a Senior Video Editor & Motion Graphics Designer with 9+ years of professional experience transforming ideas into compelling visual experiences.",
    aboutHeadline: 'Creativity Meets Technical Precision.',
    aboutBioParagraphs: [
        "I'm Shahdat Hossain, a Senior Video Editor and Motion Graphics Designer with over 9 years of professional experience in visual storytelling, commercial video production, and creative content development.",
        'My work combines creative thinking, technical precision, and a strong understanding of visual communication. From fashion films and product advertisements to motion graphics and brand campaigns, I enjoy transforming ideas into engaging visual experiences.',
        'I believe great visuals are not just about aesthetics. They are about communication, emotion, and storytelling.'
    ],
    philosophy:
        'Every frame must earn its place in the timeline. From the rhythm of an editorial cut to the physics of a 3D motion keyframe, technical precision serves one ultimate master: human emotion.',
    creativeApproach:
        'Combining narrative pacing, intentional sound design synchronization, bespoke motion systems, and cinematic color pipelines that elevate commercial brand equity.',
    showreel: {
        heading: 'Selected Moments. Endless Creativity.',
        supportingText:
            'A collection of visual stories, commercial productions, and motion design experiments.',
        videoUrl: 'https://www.youtube.com/embed/ZVPus_WBp3Q?si=KMrgCrZGMVoH1S3Z',
        posterUrl: '',
        durationTimecode: '00:01:45:00',
        placeholderNotice:
            '[PLACEHOLDER ASSET: Configure siteConfig.showreel.videoUrl with your official Showreel MP4/Vimeo stream]'
    },
    portrait: {
        imageUrl: '', // Leave empty for studio viewfinder placeholder or paste portrait path e.g. '/images/shahdat-portrait.jpg'
        placeholderLabel: '[PORTRAIT PLACEHOLDER — REPLACE WITH /public/images/shahdat-portrait.jpg]'
    },
    contact: {
        email: 'shahdathossain0779@gmail.com',
        whatsapp: '+880 1850-993126',
        linkedin: 'https://linkedin.com/in/shahdat-hossain-placeholder',
        behance: 'https://behance.net/shahdat-hossain-placeholder',
        vimeo: 'https://vimeo.com/shahdat-hossain-placeholder',
        youtube: 'https://youtube.com/@shahdat-hossain-placeholder',
        cvUrl: '/cv/Shahdat_Hossain_CV.pdf',
        formEndpoint: '' // Optional Formspree / custom API endpoint URL
    },
    seo: {
        title: 'Shahdat Hossain | Senior Video Editor & Motion Graphics Designer',
        description:
            'Explore the portfolio of Shahdat Hossain, a Senior Video Editor and Motion Graphics Designer with 9+ years of experience in commercial video production, fashion films, motion graphics, and visual storytelling.',
        canonicalUrl: 'https://shahdathossain.com'
    }
};
