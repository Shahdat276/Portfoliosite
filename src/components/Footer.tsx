"use client";

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { StudioTheme, SiteConfig } from '@/types';

interface FooterProps {
    theme: StudioTheme;
    siteConfig: SiteConfig;
}

export function Footer({ theme, siteConfig }: FooterProps) {
    return (
        <footer
            className="border-t py-10"
            style={{
                backgroundColor: theme.surface,
                borderColor: theme.border
            }}
        >
            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: theme.textMuted }}>
                <div className="flex items-center gap-3">
                    <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: theme.accent }}
                    />
                    <span className="font-display font-semibold" style={{ color: theme.text }}>
                        {siteConfig.name}
                    </span>
                    <span>—</span>
                    <span>{siteConfig.title}</span>
                </div>

                <div className="flex items-center gap-6">
                    <span>© 2026 All Rights Reserved</span>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="font-medium inline-flex items-center gap-1 hover:underline"
                        style={{ color: theme.text }}
                    >
                        <span>Back to Top</span>
                        <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
