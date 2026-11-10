"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { StudioTheme, SiteConfig, ActiveRoute } from '@/types';
import { ThemeSwitcher } from './ThemeSwitcher';

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
        { id: 'work', label: 'Work' },
        { id: 'about', label: 'About' },
        { id: 'capabilities', label: 'Capabilities' },
        { id: 'experience', label: 'Experience' },
        { id: 'contact', label: 'Contact' }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed inset-0 z-40 pt-20 px-6 pb-8 md:hidden overflow-y-auto"
                    style={{ backgroundColor: theme.bg }}
                >
                    <div className="flex justify-between items-center mb-6 pb-4 border-b" style={{ borderColor: theme.border }}>
                        <span className="font-mono text-xs uppercase tracking-widest" style={{ color: theme.accent }}>
                            Navigation Menu
                        </span>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full border"
                            style={{ borderColor: theme.border, color: theme.text }}
                            aria-label="Close menu"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-3 py-2">
                        {navItems.map((item) => {
                            const isActive =
                                activeRoute.page === 'case-study'
                                    ? item.id === 'work'
                                    : activeSection === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        navigateToSection(item.id);
                                        onClose();
                                    }}
                                    className="text-left text-2xl font-display font-semibold py-2 transition-colors flex items-center justify-between"
                                    style={{
                                        color: isActive ? theme.accent : theme.text
                                    }}
                                >
                                    <span>{item.label}</span>
                                    {isActive && (
                                        <span
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: theme.accent }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div
                        className="mt-8 pt-6 border-t space-y-4"
                        style={{ borderColor: theme.border }}
                    >
                        <p
                            className="text-xs font-mono uppercase tracking-wider"
                            style={{ color: theme.textMuted }}
                        >
                            Switch Color Theme
                        </p>
                        <ThemeSwitcher
                            theme={theme}
                            activeThemeKey={activeThemeKey}
                            setActiveThemeKey={setActiveThemeKey}
                            variant="mobile"
                        />

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <a
                                href={siteConfig.contact.cvUrl}
                                download
                                className="py-3.5 rounded-full font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 border"
                                style={{
                                    backgroundColor: theme.surface,
                                    borderColor: theme.borderStrong,
                                    color: theme.text
                                }}
                            >
                                <span>Download CV</span>
                            </a>
                            <a
                                href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-3.5 rounded-full font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                                style={{
                                    backgroundColor: theme.accent,
                                    color: theme.accentText
                                }}
                            >
                                <span>Let&apos;s Talk</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

