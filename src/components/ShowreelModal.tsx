"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SiteConfig, ShowreelChapter } from '@/types';
import { STUDIO_THEMES } from '@/data/themes';
import { EditorialVisualFrame } from './EditorialVisualFrame';

function getYouTubeCleanEmbed(url: string) {
    if (!url) return '';
    let videoId = '';
    if (url.includes('embed/')) {
        videoId = url.split('embed/')[1].split('?')[0];
    } else if (url.includes('watch?v=')) {
        videoId = url.split('watch?v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    if (!videoId) return url;
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&loop=1&playlist=${videoId}&playsinline=1&enablejsapi=1`;
}

interface ShowreelModalProps {
    isOpen: boolean;
    onClose: () => void;
    siteConfig: SiteConfig;
    activeChapter: ShowreelChapter;
}

export function ShowreelModal({
    isOpen,
    onClose,
    siteConfig,
    activeChapter
}: ShowreelModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-10"
                >
                    <div className="max-w-5xl w-full">
                        <div className="flex items-center justify-between text-white mb-4">
                            <div>
                                <span className="font-display text-sm font-semibold">
                                    {siteConfig.name} — Official Showreel
                                </span>
                                <span className="text-xs text-white/60 block">
                                    {activeChapter.label}: {activeChapter.note}
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                                aria-label="Close Showreel Modal"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="rounded-2xl overflow-hidden border border-white/15 bg-black">
                            {siteConfig.showreel.videoUrl ? (
                                siteConfig.showreel.videoUrl.includes('youtube') || siteConfig.showreel.videoUrl.includes('youtu.be') ? (
                                    <div className="relative w-full aspect-video bg-black overflow-hidden select-none">
                                        <iframe
                                            src={getYouTubeCleanEmbed(siteConfig.showreel.videoUrl)}
                                            title="YouTube showreel player"
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] border-0 pointer-events-none"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                ) : siteConfig.showreel.videoUrl.includes('vimeo') ? (
                                    <iframe
                                        src={siteConfig.showreel.videoUrl}
                                        title="Vimeo showreel player"
                                        className="w-full aspect-video border-0 bg-black"
                                        allow="autoplay; fullscreen; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <video
                                        src={siteConfig.showreel.videoUrl}
                                        controls
                                        autoPlay
                                        className="w-full aspect-video"
                                    />
                                )
                            ) : (
                                <EditorialVisualFrame
                                    theme={STUDIO_THEMES.cinema}
                                    index={activeChapter.id}
                                    category={activeChapter.label}
                                    aspectClass="aspect-video"
                                    pattern="widescreen-cinema"
                                    isHovered={true}
                                    badgeText={siteConfig.showreel.placeholderNote}
                                />
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
