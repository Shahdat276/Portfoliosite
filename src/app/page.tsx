"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    StudioTheme,
    SiteConfig,
    Project,
    ExperienceItem,
    ActiveRoute
} from '@/types';
import { STUDIO_THEMES } from '@/data/themes';
import { INITIAL_SITE_CONFIG } from '@/data/siteConfig';
import { INITIAL_PROJECTS } from '@/data/projects';
import { INITIAL_EXPERIENCE } from '@/data/experience';

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { WorkGallery } from '@/components/WorkGallery';
import { CaseStudyView } from '@/components/CaseStudyView';
import { About } from '@/components/About';
import { Capabilities } from '@/components/Capabilities';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { ShowreelModal } from '@/components/ShowreelModal';
import {
    MotionVelocityTicker,
    playStudioTick
} from '@/components/MotionPrimitives';
import { ImpactDeckSection } from '@/components/ImpactDeckSection';
import { BrandOrbitSection } from '@/components/BrandOrbitSection';
import { CraftShowcase } from '@/components/CraftShowcase';
import { ProcessWorkflowSection } from '@/components/ProcessWorkflowSection';

export default function Home() {
    // 1. Theme & Studio Sound State (Default: Cinema Obsidian)
    const [activeThemeKey, setActiveThemeKey] = useState<string>('cinema');
    const theme: StudioTheme = STUDIO_THEMES[activeThemeKey] || STUDIO_THEMES.cinema;
    const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

    const handleToggleSound = () => {
        const next = !soundEnabled;
        setSoundEnabled(next);
        if (next) {
            playStudioTick(true, 880);
        }
    };

    // 2. Data State
    const [siteConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);
    const [projects] = useState<Project[]>(INITIAL_PROJECTS);
    const [experiences] = useState<ExperienceItem[]>(INITIAL_EXPERIENCE);

    // 3. Navigation & Route State
    const [activeRoute, setActiveRoute] = useState<ActiveRoute>({ page: 'home', slug: null });
    const [activeSection, setActiveSection] = useState<string>('home');
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    // 4. Showreel & Modal Player State
    const [isShowreelPlaying, setIsShowreelPlaying] = useState<boolean>(true);
    const [isShowreelMuted, setIsShowreelMuted] = useState<boolean>(true);
    const [showreelProgress, setShowreelProgress] = useState<number>(8);
    const [showreelModalOpen, setShowreelModalOpen] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    // 5. Work Gallery Filter State
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [hoveredProjectSlug, setHoveredProjectSlug] = useState<string | null>(null);

    // Active Chapter
    const activeChapter = siteConfig.showreel.chapters[0];

    // Case Study Project
    const currentCaseStudy = useMemo(() => {
        if (activeRoute.page !== 'case-study' || !activeRoute.slug) return null;
        return projects.find((p) => p.slug === activeRoute.slug) || projects[0];
    }, [activeRoute, projects]);

    // Adjacent Projects for Navigation
    const adjacentProjects = useMemo(() => {
        if (!currentCaseStudy) return { prev: null, next: null };
        const idx = projects.findIndex((p) => p.slug === currentCaseStudy.slug);
        const prev = projects[(idx - 1 + projects.length) % projects.length];
        const next = projects[(idx + 1) % projects.length];
        return { prev, next };
    }, [currentCaseStudy, projects]);

    // URL Query Sync & Browser Back/Forward Navigation (?project=slug)
    useEffect(() => {
        const syncFromLocation = () => {
            const params = new URLSearchParams(window.location.search);
            const projectSlug = params.get('project');
            if (projectSlug && projects.some((p) => p.slug === projectSlug)) {
                setActiveRoute({ page: 'case-study', slug: projectSlug });
            } else {
                setActiveRoute({ page: 'home', slug: null });
            }
        };

        const timer = setTimeout(syncFromLocation, 0);
        window.addEventListener('popstate', syncFromLocation);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('popstate', syncFromLocation);
        };
    }, [projects]);

    // Keep browser tab favicon synced dynamically with About portrait image
    useEffect(() => {
        if (!siteConfig.portrait.imageUrl) return;
        const iconLinks = document.querySelectorAll<HTMLLinkElement>(
            'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]'
        );
        iconLinks.forEach((link) => {
            link.href = siteConfig.portrait.imageUrl;
        });
    }, [siteConfig.portrait.imageUrl]);

    // Scroll & Active Section Spy
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
            if (activeRoute.page === 'home') {
                const sections = ['home', 'work', 'about', 'capabilities', 'experience', 'contact'];
                const scrollPos = window.scrollY + 200;
                for (const id of sections) {
                    const el = document.getElementById(id);
                    if (el) {
                        const top = el.offsetTop;
                        const height = el.offsetHeight;
                        if (scrollPos >= top && scrollPos < top + height) {
                            setActiveSection(id);
                            break;
                        }
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeRoute.page]);

    // Showreel Progress Simulation
    useEffect(() => {
        if (!isShowreelPlaying) return;
        const interval = setInterval(() => {
            setShowreelProgress((prev) => (prev >= 100 ? 0 : +(prev + 0.35).toFixed(1)));
        }, 200);
        return () => clearInterval(interval);
    }, [isShowreelPlaying]);

    // YouTube Controller
    const sendYouTubeCommand = (func: string, args: unknown[] = []) => {
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

    const seekShowreel = (progressPercent: number, exactSeconds?: number) => {
        setShowreelProgress(progressPercent);
        const targetSeconds = typeof exactSeconds === 'number' ? exactSeconds : (progressPercent / 100) * 108;

        const isYT = siteConfig.showreel.videoUrl?.includes('youtube') || siteConfig.showreel.videoUrl?.includes('youtu.be');
        if (isYT) {
            sendYouTubeCommand('seekTo', [targetSeconds, true]);
            if (!isShowreelPlaying) {
                sendYouTubeCommand('playVideo');
                setIsShowreelPlaying(true);
            }
        } else if (videoRef.current && videoRef.current.duration) {
            videoRef.current.currentTime =
                typeof exactSeconds === 'number'
                    ? exactSeconds
                    : (progressPercent / 100) * videoRef.current.duration;
        }
    };

    // Modal Video Handlers
    const openShowreelTheaterModal = () => {
        if (isShowreelPlaying) {
            const isYT =
                siteConfig.showreel.videoUrl?.includes('youtube') ||
                siteConfig.showreel.videoUrl?.includes('youtu.be');
            if (isYT) {
                sendYouTubeCommand('pauseVideo');
            } else if (videoRef.current) {
                videoRef.current.pause();
            }
            setIsShowreelPlaying(false);
        }
        setShowreelModalOpen(true);
    };

    const closeShowreelModal = () => {
        setShowreelModalOpen(false);
        const isYT =
            siteConfig.showreel.videoUrl?.includes('youtube') ||
            siteConfig.showreel.videoUrl?.includes('youtu.be');
        if (isYT) {
            sendYouTubeCommand('mute');
            sendYouTubeCommand('playVideo');
        } else if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
        }
        setIsShowreelMuted(true);
        setIsShowreelPlaying(true);
    };

    // Navigation Handlers
    const navigateToSection = (sectionId: string) => {
        setMobileMenuOpen(false);
        if (activeRoute.page !== 'home') {
            setActiveRoute({ page: 'home', slug: null });
            if (typeof window !== 'undefined' && window.location.search.includes('project=')) {
                window.history.pushState({}, '', window.location.pathname);
            }
            setTimeout(() => {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 90);
        } else {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const openCaseStudy = (slug: string) => {
        setActiveRoute({ page: 'case-study', slug });
        if (typeof window !== 'undefined') {
            window.history.pushState({ project: slug }, '', `?project=${encodeURIComponent(slug)}`);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div
            className="min-h-screen overflow-x-clip transition-colors duration-500 font-sans antialiased"
            style={{
                backgroundColor: theme.bg,
                color: theme.text
            }}
        >
            {/* Header Navigation */}
            <Navbar
                theme={theme}
                activeThemeKey={activeThemeKey}
                setActiveThemeKey={setActiveThemeKey}
                siteConfig={siteConfig}
                activeRoute={activeRoute}
                activeSection={activeSection}
                navigateToSection={navigateToSection}
                isScrolled={isScrolled}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                soundEnabled={soundEnabled}
                onToggleSound={handleToggleSound}
            />

            {/* View Router */}
            <AnimatePresence mode="wait">
                {activeRoute.page === 'case-study' && currentCaseStudy ? (
                    <CaseStudyView
                        key={`case-study-${currentCaseStudy.slug}`}
                        theme={theme}
                        currentCaseStudy={currentCaseStudy}
                        adjacentProjects={adjacentProjects}
                        navigateToSection={navigateToSection}
                        openCaseStudy={openCaseStudy}
                    />
                ) : (
                    <motion.main key="home-portfolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Hero
                            theme={theme}
                            siteConfig={siteConfig}
                            navigateToSection={navigateToSection}
                            isShowreelPlaying={isShowreelPlaying}
                            isShowreelMuted={isShowreelMuted}
                            showreelProgress={showreelProgress}
                            toggleShowreelPlay={toggleShowreelPlay}
                            toggleShowreelMute={toggleShowreelMute}
                            seekShowreel={seekShowreel}
                            openShowreelTheaterModal={openShowreelTheaterModal}
                            iframeRef={iframeRef}
                            videoRef={videoRef}
                        />

                        <MotionVelocityTicker theme={theme} />

                        <ImpactDeckSection
                            theme={theme}
                            experiences={experiences}
                            soundEnabled={soundEnabled}
                        />

                        <WorkGallery
                            theme={theme}
                            projects={projects}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            hoveredProjectSlug={hoveredProjectSlug}
                            setHoveredProjectSlug={setHoveredProjectSlug}
                            openCaseStudy={openCaseStudy}
                        />

                        <BrandOrbitSection
                            theme={theme}
                            experiences={experiences}
                            soundEnabled={soundEnabled}
                        />

                        <CraftShowcase theme={theme} />

                        <About
                            theme={theme}
                            siteConfig={siteConfig}
                            navigateToSection={navigateToSection}
                        />

                        <Capabilities
                            theme={theme}
                            onSelectWorkCategory={(cat) => {
                                setSelectedCategory(cat);
                                navigateToSection('work');
                            }}
                        />

                        <ProcessWorkflowSection
                            theme={theme}
                            soundEnabled={soundEnabled}
                        />

                        <ExperienceSection theme={theme} experiences={experiences} />

                        <ContactSection theme={theme} siteConfig={siteConfig} />
                    </motion.main>
                )}
            </AnimatePresence>

            {/* Footer */}
            <Footer theme={theme} siteConfig={siteConfig} />

            {/* Theater Showreel Modal */}
            <ShowreelModal
                isOpen={showreelModalOpen}
                onClose={closeShowreelModal}
                siteConfig={siteConfig}
                activeChapter={activeChapter}
            />
        </div>
    );
}
