"use client";

import React from 'react';
import { formatUniversalVideoEmbed } from '@/utils/video';

interface UniversalVideoPlayerProps {
    url: string;
    title: string;
    aspect?: 'video' | 'vertical' | 'square';
    width?: number;
    height?: number;
    autoplay?: boolean;
    lazy?: boolean;
    className?: string;
}

export function UniversalVideoPlayer({
    url,
    title,
    aspect = 'video',
    width,
    height,
    autoplay = false,
    lazy = true,
    className = ''
}: UniversalVideoPlayerProps) {
    const videoData = formatUniversalVideoEmbed(url, { chromeless: false, autoplay });

    if (videoData.type === 'youtube') {
        return (
            <div className={`relative w-full aspect-video bg-black overflow-hidden ${className}`}>
                <iframe
                    src={videoData.embedUrl}
                    title={title}
                    loading={lazy ? 'lazy' : undefined}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            </div>
        );
    }

    if (videoData.type === 'adobe-ccv') {
        const isSquare = aspect === 'square';
        return (
            <div
                className={`relative w-full bg-[#191919] flex items-center justify-center overflow-hidden ${
                    isSquare ? 'aspect-video sm:aspect-square max-h-[520px]' : 'aspect-video'
                } ${className}`}
            >
                <div
                    className={`w-full h-full relative ${
                        isSquare ? 'max-w-[520px] aspect-square' : 'aspect-video'
                    }`}
                >
                    <iframe
                        src={videoData.embedUrl}
                        title={title}
                        loading={lazy ? 'lazy' : undefined}
                        className="w-full h-full border-0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        );
    }

    if (videoData.type === 'facebook') {
        const containerMaxW = width
            ? `${width}px`
            : aspect === 'vertical'
            ? '267px'
            : aspect === 'square'
            ? '476px'
            : '560px';

        const containerRatio =
            width && height
                ? `${width} / ${height}`
                : aspect === 'vertical'
                ? '267 / 476'
                : aspect === 'square'
                ? '1 / 1'
                : '16 / 9';

        return (
            <div
                className={`w-full flex items-center justify-center bg-[#0A0A0C] overflow-hidden p-2 sm:p-4 ${
                    aspect === 'vertical'
                        ? 'min-h-[490px]'
                        : aspect === 'square'
                        ? 'min-h-[340px] sm:min-h-[460px]'
                        : 'aspect-video'
                } ${className}`}
            >
                <div
                    className="relative w-full overflow-hidden rounded-lg bg-black shadow-md mx-auto"
                    style={{
                        maxWidth: containerMaxW,
                        aspectRatio: containerRatio
                    }}
                >
                    <iframe
                        src={videoData.embedUrl}
                        title={title}
                        loading={lazy ? 'lazy' : undefined}
                        scrolling="no"
                        className="w-full h-full border-0"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            </div>
        );
    }

    if (videoData.type === 'drive') {
        return (
            <div className={`relative w-full aspect-video bg-black overflow-hidden ${className}`}>
                <iframe
                    src={videoData.embedUrl}
                    title={title}
                    loading={lazy ? 'lazy' : undefined}
                    className="w-full h-full border-0"
                    allow="autoplay"
                    allowFullScreen
                />
            </div>
        );
    }

    if (videoData.type === 'vimeo') {
        return (
            <div className={`relative w-full aspect-video bg-black overflow-hidden ${className}`}>
                <iframe
                    src={videoData.embedUrl}
                    title={title}
                    loading={lazy ? 'lazy' : undefined}
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                />
            </div>
        );
    }

    if (videoData.type === 'video' && videoData.embedUrl) {
        return (
            <div className={`relative w-full aspect-video bg-black overflow-hidden ${className}`}>
                <video
                    src={videoData.embedUrl}
                    controls
                    className="w-full h-full object-cover"
                />
            </div>
        );
    }

    return null;
}

