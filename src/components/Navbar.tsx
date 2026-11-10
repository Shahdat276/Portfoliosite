"use client";

import React from 'react';
import { StudioTheme, SiteConfig, ActiveRoute } from '@/types';
import { ThemeSwitcher } from './ThemeSwitcher';
import { MobileMenu } from './MobileMenu';
import {
    TimelineScrollBar,
    MonogramMark,
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
    onToggleSound?: () => void;
}

/**
 * Minimal 3-Zone CodeofSagar-inspired header bar with boxed Monogram,
 * centered wordmark, live Sound equalizer, Theme Switcher, and MENU/CLOSE roll pill.
 */
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
    soundEnabled = false,
    onToggleSound
}: NavbarProps) {
    return (
        <>
            <header
                className="fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b backdrop-blur-xl"
                style={{
                    backgroundColor: isScrolled || mobileMenuOpen
                        ? theme.isDark
                            ? 'rgba(15, 15, 15, 0.90)'
                            : 'rgba(236, 233, 227, 0.90)'
                        : 'transparent',
                    borderColor: isScrolled || mobileMenuOpen ? theme.border : 'transparent'
                }}
            >
                <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px] h-[74px] sm:h-20 flex items-center justify-between gap-3">
                    {/* Left Boxed Monogram */}
                    <button
                        type="button"
                        onClick={() => {
                            playStudioTick(soundEnabled, 720);
                            setMobileMenuOpen(false);
                            navigateToSection('home');
                        }}
                        aria-label={`${siteConfig.name} — Home`}
                        className="h-10 px-2.5 sm:px-3 rounded-xl border flex items-center justify-center gap-2 group transition-transform duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
                        style={{
                            backgroundColor: theme.surface,
                            borderColor: theme.borderStrong
                        }}
                    >
                        <MonogramMark accentColor={theme.accent} className="w-6 h-6" />
                    </button>

                    {/* Center Boxed Brand Wordmark */}
                    <button
                        type="button"
                        onClick={() => {
                            playStudioTick(soundEnabled, 680);
                            setMobileMenuOpen(false);
                            navigateToSection('home');
                        }}
                        className="h-10 px-4 sm:px-5 rounded-xl border flex items-center justify-center cursor-pointer transition-all hover:opacity-90 active:scale-95"
                        style={{
                            backgroundColor: theme.surface,
                            borderColor: theme.borderStrong
                        }}
                    >
                        <span className="font-display font-bold tracking-tight text-sm sm:text-base whitespace-nowrap">
                            {siteConfig.wordmark}
                        </span>
                    </button>

                    {/* Right Boxed Controls: Theme + Sound Equalizer + MENU / CLOSE */}
                    <div className="flex items-center gap-2">
                        <div className="hidden md:block">
                            <ThemeSwitcher
                                theme={theme}
                                activeThemeKey={activeThemeKey}
                                setActiveThemeKey={(key) => {
                                    playStudioTick(soundEnabled, 780);
                                    setActiveThemeKey(key);
                                }}
                                variant="pill"
                            />
                        </div>

                        {onToggleSound && (
                            <button
                                type="button"
                                onClick={onToggleSound}
                                aria-label={soundEnabled ? 'Mute studio sound' : 'Enable studio sound'}
                                className="h-10 px-3 sm:px-3.5 rounded-xl border font-mono text-[11px] uppercase tracking-wider flex items-center gap-2 transition-all hover:opacity-90 active:scale-95 cursor-pointer"
                                style={{
                                    backgroundColor: theme.surface,
                                    borderColor: soundEnabled ? theme.accent : theme.borderStrong,
                                    color: soundEnabled ? theme.text : theme.textMuted
                                }}
                                title={soundEnabled ? 'Sound: On' : 'Sound: Off'}
                            >
                                <span className="hidden sm:inline">Sound</span>
                                <span className="flex items-end gap-[2px] h-3" aria-hidden="true">
                                    {[0, 0.16, 0.32, 0.1].map((delay, idx) => (
                                        <span
                                            key={idx}
                                            className={`w-[2px] rounded-full transition-all ${
                                                soundEnabled ? 'h-full cos-eq-bar' : 'h-1'
                                            }`}
                                            style={{
                                                backgroundColor: soundEnabled
                                                    ? theme.accent
                                                    : theme.textMuted,
                                                animationDelay: soundEnabled ? `${delay}s` : undefined
                                            }}
                                        />
                                    ))}
                                </span>
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() => {
                                playStudioTick(soundEnabled, mobileMenuOpen ? 520 : 740);
                                setMobileMenuOpen(!mobileMenuOpen);
                            }}
                            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileMenuOpen}
                            className="h-10 px-4 sm:px-5 rounded-xl border font-mono text-xs font-semibold uppercase tracking-widest overflow-hidden relative cursor-pointer transition-colors active:scale-95"
                            style={{
                                backgroundColor: mobileMenuOpen ? theme.accent : theme.surface,
                                borderColor: mobileMenuOpen ? theme.accent : theme.borderStrong,
                                color: mobileMenuOpen ? theme.accentText : theme.text
                            }}
                        >
                            <span
                                className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.2,1)] leading-[40px]"
                                style={{
                                    transform: mobileMenuOpen ? 'translateY(-40px)' : 'translateY(0px)'
                                }}
                            >
                                <span className="h-[40px] flex items-center justify-center">MENU</span>
                                <span className="h-[40px] flex items-center justify-center">CLOSE</span>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Timeline Scrubbing Scroll Progress Indicator */}
                <TimelineScrollBar theme={theme} />
            </header>

            {/* Fullscreen Editorial Overlay Curtain Menu (Desktop & Mobile) */}
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
        </>
    );
}
