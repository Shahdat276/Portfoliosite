"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SiteConfig, ShowreelChapter } from '@/types';
import { STUDIO_THEMES } from '@/data/themes';
import { EditorialVisualFrame } from './EditorialVisualFrame';
import { formatUniversalVideoEmbed } from '@/utils/video';

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
    const videoData = formatUniversalVideoEmbed(siteConfig.showreel.videoUrl);

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
                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                                aria-label="Close Showreel Modal"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="rounded-2xl overflow-hidden border border-white/15 bg-black">
                            {videoData.type === 'youtube' && (
                                <div className="relative w-full aspect-video bg-black overflow-hidden select-none">
                                    <iframe
                                        src={videoData.embedUrl}
                                        title="YouTube showreel player"
                                        className="w-full h-full border-0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            )}

                            {videoData.type === 'drive' && (
                                <div className="w-full aspect-video bg-black">
                                    <iframe
                                        src={videoData.embedUrl}
                                        title="Google Drive showreel player"
                                        className="w-full h-full border-0"
                                        allow="autoplay"
                                        allowFullScreen
                                    />
                                </div>
                            )}

                            {videoData.type === 'vimeo' && (
                                <iframe
                                    src={videoData.embedUrl}
                                    title="Vimeo showreel player"
                                    className="w-full aspect-video border-0 bg-black"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                />
                            )}

                            {videoData.type === 'video' && videoData.embedUrl && (
                                <video
                                    src={videoData.embedUrl}
                                    controls
                                    autoPlay
                                    className="w-full aspect-video"
                                />
                            )}

                            {videoData.type === 'unknown' && (
                                <div className="aspect-video relative">
                                    <EditorialVisualFrame
                                        theme={STUDIO_THEMES.cinema}
                                        index="REEL"
                                        category="Showreel Cinema Stage"
                                        aspectClass="aspect-video"
                                        pattern="waveform"
                                        isHovered={false}
                                        badgeText="Active Theatrical Session"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
