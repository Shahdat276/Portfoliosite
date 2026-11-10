"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';
import { StudioTheme, SiteConfig, ActiveRoute } from '@/types';
import { ThemeSwitcher } from './ThemeSwitcher';
import { RollText, STUDIO_EASE } from './MotionPrimitives';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    theme: StudioTheme;
    siteConfig: SiteConfig;
    activeRoute: ActiveRoute;
    activeSection: string;
    navigateToSection: (id: string) => void;
    activeThemeKey: string;
    setActiveThemeKey: (key: string) => void;
}

/**
 * Fullscreen editorial navigation curtain overlay triggered by the header MENU/CLOSE button.
 */
export function MobileMenu({
    isOpen,
    onClose,
    theme,
    siteConfig,
    activeRoute,
    activeSection,
    navigateToSection,
    activeThemeKey,
    setActiveThemeKey
}: MobileMenuProps) {
    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'work', label: 'Selected Work' },
        { id: 'services', label: 'Capabilities' },
        { id: 'brands', label: 'Brands & Orbit' },
        { id: 'process', label: 'Process' },
        { id: 'contact', label: 'Contact' }
    ];

    const socialLinks = [
        { label: 'Behance', url: siteConfig.contact.behance },
        { label: 'LinkedIn', url: siteConfig.contact.linkedin },
        { label: 'YouTube', url: siteConfig.contact.youtube }
    ].filter((s) => Boolean(s.url));

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: '-100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.6, ease: STUDIO_EASE }}
                    className="fixed inset-0 z-40 pt-24 pb-10 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-y-auto flex flex-col justify-between"
                    style={{
                        backgroundColor: theme.bg,
                        color: theme.text
                    }}
                >
                    <div className="w-full max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 my-auto py-4">
                        {/* Left 7 Cols: Giant Editorial Numbered Navigation */}
                        <div className="lg:col-span-7 flex flex-col justify-center space-y-2 sm:space-y-3">
                            <span
                                className="font-mono text-xs uppercase tracking-[0.22em] mb-2"
                                style={{ color: theme.accent }}
                            >
                                Navigation Directory
                            </span>
                            {navItems.map((item, idx) => {
                                const isActive =
                                    activeRoute.page === 'case-study'
                                        ? item.id === 'work'
                                        : activeSection === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => {
                                            navigateToSection(item.id);
                                            onClose();
                                        }}
                                        className="group text-left py-1.5 flex items-baseline gap-4 sm:gap-6 border-b transition-colors cursor-pointer"
                                        style={{
                                            borderColor: theme.border,
                                            color: isActive ? theme.accent : theme.text
                                        }}
                                    >
                                        <span
                                            className="font-mono text-xs sm:text-sm"
                                            style={{ color: theme.textMuted }}
                                        >
                                            0{idx + 1}
                                        </span>
                                        <span className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em]">
                                            <RollText text={item.label} />
                                        </span>
                                        <ArrowUpRight
                                            className="w-5 h-5 sm:w-6 sm:h-6 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                                            style={{ color: theme.accent }}
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right 5 Cols: Bio Snapshot, Theme Selector, CV & Direct Contacts */}
                        <div className="lg:col-span-5 flex flex-col justify-between gap-8 lg:pl-8">
                            <div
                                className="p-6 sm:p-7 rounded-2xl border space-y-4"
                                style={{
                                    backgroundColor: theme.surface,
                                    borderColor: theme.border
                                }}
                            >
                                <span
                                    className="font-mono text-[11px] uppercase tracking-[0.2em] block"
                                    style={{ color: theme.accent }}
                                >
                                    Profile • {siteConfig.experienceYears}
                                </span>
                                <p className="text-sm sm:text-base leading-relaxed" style={{ color: theme.textMuted }}>
                                    {siteConfig.heroIntro}
                                </p>
                                <div className="pt-2 border-t text-xs font-mono space-y-1" style={{ borderColor: theme.border, color: theme.textMuted }}>
                                    <p>Current: {siteConfig.currentOrganization}</p>
                                    {siteConfig.education && <p>Education: {siteConfig.education}</p>}
                                    {siteConfig.languages && <p>Languages: {siteConfig.languages}</p>}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <span
                                    className="font-mono text-xs uppercase tracking-[0.18em] block"
                                    style={{ color: theme.textMuted }}
                                >
                                    Appearance Theme
                                </span>
                                <ThemeSwitcher
                                    theme={theme}
                                    activeThemeKey={activeThemeKey}
                                    setActiveThemeKey={setActiveThemeKey}
                                    variant="mobile"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <a
                                    href={siteConfig.contact.cvUrl}
                                    download
                                    className="group py-3.5 px-5 rounded-full font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 border cursor-pointer"
                                    style={{
                                        backgroundColor: theme.surface,
                                        borderColor: theme.borderStrong,
                                        color: theme.text
                                    }}
                                >
                                    <Download className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                                    <RollText text="Download CV" />
                                </a>
                                <a
                                    href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group py-3.5 px-5 rounded-full font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                                    style={{
                                        backgroundColor: theme.accent,
                                        color: theme.accentText
                                    }}
                                >
                                    <RollText text="WhatsApp Chat" />
                                    <ArrowUpRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Directory Strip */}
                    <div
                        className="w-full max-w-[1920px] mx-auto pt-6 border-t flex flex-wrap items-center justify-between gap-4 text-xs font-mono"
                        style={{ borderColor: theme.border, color: theme.textMuted }}
                    >
                        <span>{siteConfig.contact.email}</span>
                        <div className="flex flex-wrap gap-5">
                            {socialLinks.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cos-link-underline hover:opacity-100"
                                    style={{ color: theme.text }}
                                >
                                    {s.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
