"use client";

import Home from '@/app/page';

/**
 * Modular Test Route
 * Renders the clean modular Portfolio Home orchestrator.
 * All site components are individually separated in /src/components/
 * and all content data is separated in /src/data/
 */
    export default function TestPage() {
        return <Home />;
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
                    videoRef.current.play().catch(() => { });
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