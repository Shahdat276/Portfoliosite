"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SiteConfig, ShowreelChapter, ModalVideoTarget } from '@/types';
import { STUDIO_THEMES } from '@/data/themes';
import { EditorialVisualFrame } from './EditorialVisualFrame';
import { UniversalVideoPlayer } from './UniversalVideoPlayer';
import { formatUniversalVideoEmbed } from '@/utils/video';

interface ShowreelModalProps {
    isOpen: boolean;
    onClose: () => void;
    siteConfig: SiteConfig;
    activeChapter: ShowreelChapter;
    targetVideo?: ModalVideoTarget | null;
}

export function ShowreelModal({
    isOpen,
    onClose,
    siteConfig,
    activeChapter,
    targetVideo
}: ShowreelModalProps) {
    const activeUrl = targetVideo?.url || siteConfig.showreel.videoUrl;
    const activeTitle = targetVideo?.title || `${siteConfig.name} — Official Showreel`;
    const activeSubtitle = targetVideo?.subtitle || `${activeChapter.label}: ${activeChapter.note}`;
    const videoData = formatUniversalVideoEmbed(activeUrl, { chromeless: false, autoplay: true });

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xl flex items-center justify-center p-4 sm:p-10"
                >
                    <div
                        className="max-w-5xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between text-white mb-4 gap-4">
                            <div className="min-w-0">
                                <span className="font-display text-sm sm:text-base font-semibold block truncate">
                                    {activeTitle}
                                </span>
                                <span className="text-xs text-white/60 block truncate">
                                    {activeSubtitle}
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer shrink-0 transition-colors"
                                aria-label="Close Showreel Modal"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl">
                            {videoData.type !== 'unknown' ? (
                                <UniversalVideoPlayer
                                    url={activeUrl}
                                    title={activeTitle}
                                    autoplay={true}
                                    lazy={false}
                                />
                            ) : (
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
