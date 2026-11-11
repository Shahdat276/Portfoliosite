export interface StudioTheme {
    id: string;
    name: string;
    badge: string;
    isDark: boolean;
    bg: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    textMuted: string;
    accent: string;
    accentSoft: string;
    accentText: string;
    border: string;
    borderStrong: string;
    swatch: string;
    bgSwatch: string;
}

export interface ShowreelChapter {
    id: string;
    label: string;
    time: string;
    seconds?: number;
    progress: number;
    note: string;
}

export interface ModalVideoTarget {
    url: string;
    title: string;
    subtitle?: string;
}

export interface SiteConfig {
    name: string;
    wordmark: string;
    title: string;
    experienceYears: string;
    experienceFull: string;
    location: string;
    currentOrganization: string;
    education?: string;
    languages?: string;
    availabilityText: string;
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
        duration: string;
        placeholderNote: string;
        chapters: ShowreelChapter[];
    };
    portrait: {
        imageUrl: string;
        posterUrl?: string;
        videoWebmUrl?: string;
        videoMp4Url?: string;
        placeholderNote: string;
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
}

export interface SupportingVisual {
    title: string;
    caption: string;
    imageUrl?: string;
}

export interface ProjectVideoItem {
    id: string;
    title: string;
    url: string;
    aspect?: 'video' | 'vertical' | 'square';
    width?: number;
    height?: number;
    caption?: string;
}

export interface Project {
    slug: string;
    index: string;
    title: string;
    client: string;
    category: string;
    year: string;
    role: string;
    gridSpan: string;
    aspectClass: string;
    palette: string[];
    pattern: string;
    shortDescription: string;
    overview: string;
    challenge: string;
    conceptAndDirection: string;
    editingWorkflow: string;
    motionGraphicsProcess: string;
    colorGradingAndFinishing: string;
    software: string[];
    supportingVisuals: SupportingVisual[];
    videoUrl?: string;
    coverUrl?: string;
    behanceUrl?: string;
    galleryVideos?: ProjectVideoItem[];
}

export interface Capability {
    num: string;
    title: string;
    desc: string;
    group?: string;
    icon?: string;
    deliverable?: string;
    relatedCategory?: string;
}

export interface SoftwareTool {
    name: string;
    code: string;
    category: string;
    role: string;
    proficiency: number;
    level?: string;
}

export interface ExperienceItem {
    id: string;
    organization: string;
    role: string;
    period: string;
    status: string;
    location: string;
    logoUrl?: string;
    logoDarkBg?: boolean;
    summary: string;
    responsibilities: string[];
    contributions: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface ActiveRoute {
    page: 'home' | 'case-study';
    slug: string | null;
}

