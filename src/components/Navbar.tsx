"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ArrowUpRight, Menu } from 'lucide-react';
import { StudioTheme, SiteConfig, ActiveRoute } from '@/types';
import { ThemeSwitcher } from './ThemeSwitcher';
import { MobileMenu } from './MobileMenu';

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
    setCmsOpen: (open: boolean) => void;
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
    setCmsOpen
}: NavbarProps) {
    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'showreel', label: 'Showreel' },
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
                        ? 'rgba(17, 16, 15, 0.88)'
                        : 'rgba(247, 245, 240, 0.88)'
                    : theme.bg,
                borderColor: theme.border
            }}
        >
                <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px] h-20 flex items-center justify-between gap-4">
                    {/* Brand Wordmark */}
                    <button
                        onClick={() => navigateToSection('home')}
                        className="flex items-center gap-3 text-left group focus:outline-none shrink-0 cursor-pointer"
                    >
                        <span
                            className="w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125 shrink-0"
                            style={{ backgroundColor: theme.accent }}
                        />
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

                    {/* Center Navigation Links */}
                    <nav className="hidden xl:flex items-center gap-7" aria-label="Main Navigation">
                        {
                            navItems.map((item) => {
                                const isActive =
                                    activeRoute.page === 'case-study'
                                        ? item.id === 'work'
                                        : activeSection === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => navigateToSection(item.id)}
                                        className="text-sm font-medium transition-colors relative py-1 cursor-pointer hover:opacity-80"
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
                            })
                        }
                    </nav>

                    {/* Right Controls: 1-Click 4-Theme Switcher + Studio CMS + Let's Talk */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* 4-Theme Switcher Pill */}
                        <ThemeSwitcher
                            theme={theme}
                            activeThemeKey={activeThemeKey}
                            setActiveThemeKey={setActiveThemeKey}
                            variant="pill"
                        />

                        {/* Studio CMS Drawer Trigger */}
                        <button
                            onClick={() => setCmsOpen(true)}
                            className="p-2 rounded-full border text-xs font-mono transition-colors flex items-center justify-center cursor-pointer"
                            style={{
                                backgroundColor: theme.surfaceAlt,
                                borderColor: theme.border,
                                color: theme.textMuted
                            }}
                            title="Studio Theme & Configuration"
                            aria-label="Studio Theme & Configuration"
                        >
                            <SlidersHorizontal className="w-3.5 h-3.5" />
                        </button>

                        {/* Primary Contact CTA Button */}
                        <button
                            onClick={() => navigateToSection('contact')}
                            className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 flex items-center gap-1.5 shadow-sm cursor-pointer"
                            style={{
                                backgroundColor: theme.accent,
                                color: theme.accentText
                            }}
                        >
                            <span>Let&apos;s Talk</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Mobile Menu & Theme Trigger */}
                    <div className="flex md:hidden items-center gap-2">
                        <button
                            onClick={() => setCmsOpen(true)}
                            className="p-2 rounded-full border text-xs"
                            style={{
                                backgroundColor: theme.surfaceAlt,
                                borderColor: theme.border,
                                color: theme.text
                            }}
                            aria-label="Open CMS"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-full border transition-colors"
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
        </header>
    );
}
