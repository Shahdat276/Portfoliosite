"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { StudioTheme, SiteConfig } from '@/types';
import { RollText } from './MotionPrimitives';

interface FooterProps {
    theme: StudioTheme;
    siteConfig: SiteConfig;
}

export function Footer({ theme, siteConfig }: FooterProps) {
    const [dhakaTime, setDhakaTime] = useState<string>('--:--');

    useEffect(() => {
        const formatDhaka = () => {
            try {
                const formatted = new Intl.DateTimeFormat('en-US', {
                    timeZone: 'Asia/Dhaka',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                }).format(new Date());
                setDhakaTime(formatted);
            } catch {
                setDhakaTime('GMT +6:00');
            }
        };

        formatDhaka();
        const interval = setInterval(formatDhaka, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer
            className="border-t pt-12 pb-8 sm:pt-16 sm:pb-12"
            style={{
                backgroundColor: theme.surface,
                borderColor: theme.border
            }}
        >
            <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px] space-y-10">
                {/* Signature Top Meta Grid (Matching CodeofSagar Footer Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-8 border-b" style={{ borderColor: theme.border }}>
                    <div>
                        <span
                            className="font-mono text-[10px] uppercase tracking-[0.2em] block mb-2"
                            style={{ color: theme.textMuted }}
                        >
                            Local Studio Time
                        </span>
                        <p className="font-display text-lg sm:text-xl font-semibold tracking-tight tabular-nums">
                            {dhakaTime}
                        </p>
                        <span className="font-mono text-xs" style={{ color: theme.textMuted }}>
                            Dhaka, Bangladesh (GMT +6:00)
                        </span>
                    </div>

                    <div>
                        <span
                            className="font-mono text-[10px] uppercase tracking-[0.2em] block mb-2"
                            style={{ color: theme.textMuted }}
                        >
                            Current Availability
                        </span>
                        <div
                            className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border cos-status-pulse"
                            style={{
                                backgroundColor: theme.surfaceAlt,
                                borderColor: theme.borderStrong
                            }}
                        >
                            <span
                                className="w-2 h-2 rounded-full animate-pulse shrink-0"
                                style={{ backgroundColor: theme.accent }}
                            />
                            <span className="font-mono text-xs font-medium">
                                Open for new projects
                            </span>
                        </div>
                    </div>

                    <div className="sm:text-right flex flex-col sm:items-end justify-between">
                        <span
                            className="font-mono text-[10px] uppercase tracking-[0.2em] block mb-2"
                            style={{ color: theme.textMuted }}
                        >
                            Direct Inquiry
                        </span>
                        <a
                            href={`mailto:${siteConfig.contact.email}`}
                            className="font-display text-base sm:text-lg font-medium cos-link-underline w-fit"
                        >
                            {siteConfig.contact.email}
                        </a>
                    </div>
                </div>

                {/* Bottom Copyright & Brand Row */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-center sm:text-left"
                    style={{ color: theme.textMuted }}
                >
                    <div className="flex items-center gap-2.5">
                        <span className="font-display font-semibold" style={{ color: theme.text }}>
                            {siteConfig.name}
                        </span>
                        <span>—</span>
                        <span>{siteConfig.title}</span>
                    </div>

                    <div className="flex items-center gap-5">
                        <span>© 2026 All Rights Reserved</span>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="group px-4 py-2 rounded-full border font-mono text-xs font-medium inline-flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                            style={{
                                backgroundColor: theme.surfaceAlt,
                                borderColor: theme.border,
                                color: theme.text
                            }}
                        >
                            <RollText text="Back to Top" />
                            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" style={{ color: theme.accent }} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
