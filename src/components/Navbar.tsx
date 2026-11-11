"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Menu } from 'lucide-react';
import { StudioTheme, SiteConfig, ActiveRoute } from '@/types';
import { ThemeSwitcher } from './ThemeSwitcher';
import { MobileMenu } from './MobileMenu';
import {
    TimelineScrollBar,
    RollText,
    playStudioTick
} from './MotionPrimitives';

interface NavbarProps {
    theme: StudioTheme;
    activeThemeKey: string;
    setActiveThemeKey: (key: string) => void;
    siteConfig: SiteConfig;
    activeRoute: ActiveRoute;
    activeSection: string;
    navigateToSection: (id: string) => void;
    isScrolled: boolean;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
    soundEnabled?: boolean;
}

export function Navbar({
    theme,
    activeThemeKey,
    setActiveThemeKey,
    siteConfig,
    activeRoute,
    activeSection,
    navigateToSection,
    isScrolled,
    mobileMenuOpen,
    setMobileMenuOpen,
    soundEnabled = false
}: NavbarProps) {
    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'work', label: 'Work' },
        { id: 'about', label: 'About' },
        { id: 'capabilities', label: 'Capabilities' },
        { id: 'experience', label: 'Experience' },
        { id: 'contact', label: 'Contact' }
    ];

    return (
        <header
            className="fixed top-0 inset-x-0 z-40 transition-all duration-300 border-b backdrop-blur-xl"
            style={{
                backgroundColor: isScrolled
                    ? theme.isDark
                        ? 'rgba(15, 15, 15, 0.88)'
                        : 'rgba(236, 233, 227, 0.88)'
                    : theme.bg,
                borderColor: theme.border
            }}
        >
                <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px] h-20 flex items-center justify-between gap-4">
                    {/* Brand Wordmark */}
                    <button
                        onClick={() => {
                            playStudioTick(soundEnabled, 720);
                            navigateToSection('home');
                        }}
                        className="text-left group focus:outline-none shrink-0 cursor-pointer"
                    >
                        <div className="inline-flex flex-col w-max">
                            <span className="font-display font-bold tracking-tight text-base sm:text-lg block leading-none whitespace-nowrap">
                                {siteConfig.wordmark}
                            </span>
                            <span
                                className="w-full flex items-center justify-between font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.08em] sm:tracking-[0.1em] mt-1.5 leading-none whitespace-nowrap"
                                style={{ color: theme.textMuted }}
                            >
                                <span>Senior</span>
                                <span>Editor</span>
                                <span>&amp;</span>
                                <span>Motion</span>
                            </span>
                        </div>
                    </button>

                    {/* Center Navigation Links with CodeofSagar Character Roll */}
                    <nav className="hidden xl:flex items-center gap-7" aria-label="Main Navigation">
                        {navItems.map((item) => {
                            const isActive =
                                activeRoute.page === 'case-study'
                                    ? item.id === 'work'
                                    : activeSection === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        playStudioTick(soundEnabled, 640);
                                        navigateToSection(item.id);
                                    }}
                                    className="group text-sm font-medium transition-colors relative py-1 cursor-pointer"
                                    style={{
                                        color: isActive ? theme.text : theme.textMuted
                                    }}
                                >
                                    <RollText text={item.label} />
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

                    {/* Right Controls: 2-Theme Switcher + Let's Talk */}
                    <div className="hidden md:flex items-center gap-2.5 lg:gap-3">
                        <ThemeSwitcher
                            theme={theme}
                            activeThemeKey={activeThemeKey}
                            setActiveThemeKey={(key) => {
                                playStudioTick(soundEnabled, 780);
                                setActiveThemeKey(key);
                            }}
                            variant="pill"
                        />

                        {/* Primary Contact CTA Button */}
                        <button
                            onClick={() => {
                                playStudioTick(soundEnabled, 700);
                                navigateToSection('contact');
                            }}
                            className="group px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 flex items-center gap-1.5 shadow-sm cursor-pointer"
                            style={{
                                backgroundColor: theme.accent,
                                color: theme.accentText
                            }}
                        >
                            <RollText text="Let's Talk" />
                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="flex md:hidden items-center gap-2">
                        <button
                            onClick={() => {
                                playStudioTick(soundEnabled, 640);
                                setMobileMenuOpen(!mobileMenuOpen);
                            }}
                            className="p-2 rounded-full border transition-colors cursor-pointer"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.border,
                                color: theme.text
                            }}
                            aria-label="Toggle navigation drawer"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Drawer */}
                <MobileMenu
                    isOpen={mobileMenuOpen}
                    onClose={() => setMobileMenuOpen(false)}
                    theme={theme}
                    siteConfig={siteConfig}
                    activeRoute={activeRoute}
                    activeSection={activeSection}
                    navigateToSection={navigateToSection}
                    activeThemeKey={activeThemeKey}
                    setActiveThemeKey={setActiveThemeKey}
                />

                {/* Timeline Scrubbing Scroll Progress Indicator */}
                <TimelineScrollBar theme={theme} />
        </header>
    );
}
