"use client";

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { StudioTheme } from '@/types';

interface EditorialVisualFrameProps {
    theme: StudioTheme;
    index?: string;
    category?: string;
    aspectClass?: string;
    pattern?: string;
    isHovered?: boolean;
    badgeText?: string;
    customAccent?: string | null;
}

export function EditorialVisualFrame({
    theme,
    index = '01',
    category = 'Motion Design',
    aspectClass = 'aspect-[16/10]',
    pattern = 'editorial-arch',
    isHovered = false,
    badgeText = 'Sample Placeholder',
    customAccent = null
}: EditorialVisualFrameProps) {
    const accentColor = customAccent || theme.accent;

    return (
        <div
            className={`relative w-full ${aspectClass} overflow-hidden select-none isolate transition-colors duration-500`}
            style={{
                backgroundColor: theme.isDark ? '#161513' : '#EAE5DC'
            }}
        >
            {/* Subtle Architectural Paper/Studio Gradient */}
            <div
                className="absolute inset-0 transition-transform duration-700 ease-out"
                style={{
                    transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                    background: theme.isDark
                        ? `radial-gradient(circle at 75% 25%, ${accentColor}28 0%, transparent 60%), linear-gradient(145deg, #1E1C19 0%, #11100F 100%)`
                        : `radial-gradient(circle at 78% 24%, ${accentColor}1E 0%, transparent 58%), linear-gradient(145deg, ${theme.surface} 0%, ${theme.surfaceAlt} 100%)`
                }}
            />

            {/* Architectural Grid Hairlines */}
            <div
                className="absolute inset-6 border pointer-events-none transition-colors duration-500"
                style={{ borderColor: theme.isDark ? 'rgba(255,255,255,0.07)' : 'rgba(20,20,19,0.07)' }}
            />

            {/* Minimalist Kinetic Sculpture Centerpiece */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {pattern === 'kinetic-grid' ? (
                    <div className="grid grid-cols-3 gap-3 w-2/5 aspect-square">
                        {[...Array(9)].map((_, i) => (
                            <div
                                key={i}
                                className="rounded-sm border transition-all duration-500"
                                style={{
                                    borderColor: i === 4 ? accentColor : theme.borderStrong,
                                    backgroundColor: i === 4 ? accentColor : 'transparent',
                                    transform: isHovered && i % 2 === 0 ? 'scale(0.9)' : 'scale(1)'
                                }}
                            />
                        ))}
                    </div>
                ) : pattern === 'orbital-rings' ? (
                    <div className="relative w-1/2 aspect-square flex items-center justify-center">
                        <div
                            className="w-full h-full rounded-full border transition-transform duration-700"
                            style={{
                                borderColor: theme.borderStrong,
                                transform: isHovered ? 'rotate(25deg) scale(1.06)' : 'rotate(0deg)'
                            }}
                        />
                        <div
                            className="absolute w-2/3 h-2/3 rounded-full border transition-transform duration-700"
                            style={{
                                borderColor: accentColor,
                                transform: isHovered ? 'rotate(-25deg) scale(0.95)' : 'rotate(0deg)'
                            }}
                        />
                        <div
                            className="w-3.5 h-3.5 rounded-full"
                            style={{ backgroundColor: accentColor }}
                        />
                    </div>
                ) : (
                    <div className="relative flex items-center justify-center w-1/2 aspect-square">
                        <div
                            className="w-4/5 h-4/5 rounded-full border transition-all duration-700 flex items-center justify-center"
                            style={{
                                borderColor: theme.borderStrong,
                                transform: isHovered ? 'scale(1.06)' : 'scale(1)'
                            }}
                        >
                            <div
                                className="w-1/2 h-1/2 rounded-full transition-transform duration-700"
                                style={{
                                    backgroundColor: accentColor,
                                    opacity: 0.85,
                                    transform: isHovered ? 'scale(1.12)' : 'scale(1)'
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Top Editorial Bar */}
            <div className="absolute top-4 left-5 right-5 flex items-center justify-between pointer-events-none">
                <span
                    className="font-mono text-[11px] uppercase tracking-[0.18em] font-medium"
                    style={{ color: theme.textMuted }}
                >
                    NO. {index} — {category}
                </span>
                <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border backdrop-blur-sm"
                    style={{
                        backgroundColor: theme.isDark ? 'rgba(17,16,15,0.75)' : 'rgba(255,255,255,0.82)',
                        borderColor: theme.border,
                        color: theme.textMuted
                    }}
                >
                    {badgeText}
                </span>
            </div>

            {/* Bottom Corner Action Badge */}
            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between pointer-events-none">
                <div
                    className="h-[2px] w-14 overflow-hidden"
                    style={{ backgroundColor: theme.borderStrong }}
                >
                    <div
                        className="h-full transition-all duration-500"
                        style={{
                            width: isHovered ? '100%' : '35%',
                            backgroundColor: accentColor
                        }}
                    />
                </div>

                <div
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border"
                    style={{
                        backgroundColor: isHovered ? accentColor : theme.surface,
                        borderColor: isHovered ? accentColor : theme.border,
                        color: isHovered ? theme.accentText : theme.text
                    }}
                >
                    <ArrowUpRight className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
}
