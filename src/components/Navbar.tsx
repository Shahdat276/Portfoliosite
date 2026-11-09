"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Palette,
    SlidersHorizontal,
    ArrowUpRight,
    Menu,
    X
} from 'lucide-react';
import { StudioTheme, SiteConfig, ActiveRoute } from '@/types';
import { STUDIO_THEMES } from '@/data/themes';

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
                    {/* Compact Mobile Theme Cycler */}
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
    );
}

