"use client";

import React from 'react';
import Image from 'next/image';
import { Download } from 'lucide-react';
import { StudioTheme, SiteConfig } from '@/types';

interface AboutProps {
    theme: StudioTheme;
    siteConfig: SiteConfig;
    navigateToSection: (id: string) => void;
}

export function About({
    theme,
    siteConfig,
    navigateToSection
}: AboutProps) {
    return (
        <section
            id="about"
            className="py-24 md:py-32 border-b"
            style={{ borderColor: theme.border }}
        >
                <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
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
                                        <>
                                            <Image
                                                src={siteConfig.portrait.imageUrl}
                                                alt={siteConfig.name}
                                                fill
                                                unoptimized
                                                className="object-cover object-top"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                            <div className="relative z-10 mt-auto flex items-end justify-between text-white pt-4">
                                                <div>
                                                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/75 block">
                                                        {siteConfig.currentOrganization}
                                                    </span>
                                                    <span className="font-display text-lg font-semibold block">
                                                        {siteConfig.name}
                                                    </span>
                                                </div>
                                                <span
                                                    className="px-2.5 py-1 rounded-full font-mono text-[10px] font-semibold uppercase tracking-wider"
                                                    style={{
                                                        backgroundColor: theme.accent,
                                                        color: theme.accentText
                                                    }}
                                                >
                                                    9+ YRS
                                                </span>
                                            </div>
                                        </>
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

                                {siteConfig.education && (
                                    <div
                                        className="p-5 rounded-2xl border"
                                        style={{
                                            backgroundColor: theme.surfaceAlt,
                                            borderColor: theme.border
                                        }}
                                    >
                                        <span
                                            className="font-mono text-[10px] uppercase tracking-wider block mb-1"
                                            style={{ color: theme.accent }}
                                        >
                                            Academic Background
                                        </span>
                                        <p className="text-sm font-medium" style={{ color: theme.text }}>
                                            {siteConfig.education}
                                        </p>
                                    </div>
                                )}

                                {siteConfig.languages && (
                                    <div
                                        className="p-5 rounded-2xl border"
                                        style={{
                                            backgroundColor: theme.surfaceAlt,
                                            borderColor: theme.border
                                        }}
                                    >
                                        <span
                                            className="font-mono text-[10px] uppercase tracking-wider block mb-1"
                                            style={{ color: theme.accent }}
                                        >
                                            Languages & Communication
                                        </span>
                                        <p className="text-sm font-medium" style={{ color: theme.text }}>
                                            {siteConfig.languages}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Download CV & Contact Buttons */}
                            <div className="flex flex-wrap items-center gap-4">
                                <a
                                    href={siteConfig.contact.cvUrl}
                                    download
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
    );
}
