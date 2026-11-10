"use client";

import React from 'react';
import { Palette } from 'lucide-react';
import { StudioTheme } from '@/types';
import { STUDIO_THEMES } from '@/data/themes';

interface ThemeSwitcherProps {
    theme: StudioTheme;
    activeThemeKey: string;
    setActiveThemeKey: (key: string) => void;
    variant?: 'pill' | 'compact' | 'mobile';
}

export function ThemeSwitcher({
    theme,
    activeThemeKey,
    setActiveThemeKey,
    variant = 'pill'
}: ThemeSwitcherProps) {
    if (variant === 'mobile') {
        return (
            <div className="grid grid-cols-2 gap-2">
                {Object.values(STUDIO_THEMES).map((t) => {
                    const isSelected = t.id === activeThemeKey;
                    return (
                        <button
                            key={t.id}
                            onClick={() => setActiveThemeKey(t.id)}
                            className="p-3 rounded-xl border text-left flex items-center justify-between transition-all duration-200 active:scale-95 cursor-pointer"
                            style={{
                                backgroundColor: isSelected ? theme.text : theme.surfaceAlt,
                                borderColor: isSelected ? theme.text : theme.border,
                                color: isSelected ? theme.bg : theme.text
                            }}
                        >
                            <div>
                                <p className="text-xs font-semibold">{t.name}</p>
                                <p
                                    className="text-[10px]"
                                    style={{
                                        color: isSelected ? theme.bg : theme.textMuted,
                                        opacity: isSelected ? 0.8 : 1
                                    }}
                                >
                                    {t.badge}
                                </p>
                            </div>
                            <span
                                className="w-3.5 h-3.5 rounded-full border shrink-0"
                                style={{
                                    backgroundColor: t.swatch,
                                    borderColor: 'rgba(255,255,255,0.2)'
                                }}
                            />
                        </button>
                    );
                })}
            </div>
        );
    }

    return (
        <div
            className="flex items-center gap-1 p-1 rounded-full border transition-all"
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
                        className="px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:opacity-90 active:scale-95 flex items-center gap-1.5 cursor-pointer"
                        style={{
                            backgroundColor: isSelected ? theme.text : 'transparent',
                            color: isSelected ? theme.bg : theme.textMuted
                        }}
                        title={`${t.name} (${t.badge})`}
                    >
                        <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: t.swatch }}
                        />
                        <span className="hidden xl:inline">{t.name.split(' ')[0]}</span>
                    </button>
                );
            })}
        </div>
    );
}

