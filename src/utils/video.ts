/**
 * Universal Video Formatter Utility
 * Supports YouTube, Google Drive, Vimeo, Adobe CCV (Behance), Facebook Videos/Reels, and direct MP4/WebM files.
 */
export interface VideoEmbedResult {
    type: 'youtube' | 'drive' | 'vimeo' | 'adobe-ccv' | 'facebook' | 'video' | 'unknown';
    embedUrl: string;
}

export interface VideoEmbedOptions {
    chromeless?: boolean;
    autoplay?: boolean;
}

export function formatUniversalVideoEmbed(
    url: string,
    options?: VideoEmbedOptions
): VideoEmbedResult {
    if (!url || typeof url !== 'string') {
        return { type: 'unknown', embedUrl: '' };
    }

    // Clean up whitespace and HTML entities
    const trimmed = url.trim().replace(/&amp;/g, '&');
    const isChromeless = Boolean(options?.chromeless);
    const shouldAutoplay = Boolean(options?.autoplay);

    // 1. YouTube Formats
    if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) {
        let videoId = '';
        if (trimmed.includes('/shorts/')) {
            videoId = trimmed.split('/shorts/')[1].split('?')[0].split('/')[0];
        } else if (trimmed.includes('embed/')) {
            videoId = trimmed.split('embed/')[1].split('?')[0];
        } else if (trimmed.includes('watch?v=')) {
            videoId = trimmed.split('watch?v=')[1].split('&')[0];
        } else if (trimmed.includes('youtu.be/')) {
            videoId = trimmed.split('youtu.be/')[1].split('?')[0];
        }

        if (videoId) {
            if (isChromeless) {
                return {
                    type: 'youtube',
                    embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&loop=1&playlist=${videoId}&playsinline=1&enablejsapi=1`
                };
            }

            return {
                type: 'youtube',
                embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${shouldAutoplay ? '1' : '0'}&mute=${shouldAutoplay ? '1' : '0'}&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=0&loop=1&playlist=${videoId}&playsinline=1&enablejsapi=1`
            };
        }
    }

    // 2. Google Drive Video Formats
    if (trimmed.includes('drive.google.com')) {
        let fileId = '';
        if (trimmed.includes('/file/d/')) {
            fileId = trimmed.split('/file/d/')[1].split('/')[0].split('?')[0];
        } else if (trimmed.includes('id=')) {
            fileId = trimmed.split('id=')[1].split('&')[0];
        }

        if (fileId) {
            return {
                type: 'drive',
                embedUrl: `https://drive.google.com/file/d/${fileId}/preview`
            };
        }
    }

    // 3. Vimeo Video Formats
    if (trimmed.includes('vimeo.com')) {
        const match = trimmed.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/);
        const vimeoId = match ? match[3] : trimmed.split('/').filter(Boolean).pop()?.split('?')[0];
        if (vimeoId && !isNaN(Number(vimeoId))) {
            return {
                type: 'vimeo',
                embedUrl: `https://player.vimeo.com/video/${vimeoId}?autoplay=${shouldAutoplay ? '1' : '0'}&muted=0&loop=1&autopause=0`
            };
        }
    }

    // 4. Adobe Creative Cloud Video (Behance native video player)
    if (trimmed.includes('www-ccv.adobe.io') || trimmed.includes('adobe.io/v1/player/ccv/')) {
        return {
            type: 'adobe-ccv',
            embedUrl: trimmed
        };
    }

    // 5. Facebook Videos & Reels
    if (trimmed.includes('facebook.com')) {
        if (trimmed.includes('plugins/video.php')) {
            return {
                type: 'facebook',
                embedUrl: trimmed
            };
        }
        // Encode raw Facebook video URL into embed plugin
        return {
            type: 'facebook',
            embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(trimmed)}&show_text=false&t=0`
        };
    }

    // 6. Direct Video File (e.g., .mp4, .webm, /videos/...)
    return {
        type: 'video',
        embedUrl: trimmed
    };
}

export function getOriginalVideoSourceUrl(url: string): string {
    const clean = (url || '').trim().replace(/&amp;/g, '&');
    if (clean.includes('facebook.com/plugins/video.php')) {
        try {
            const parsed = new URL(clean);
            const href = parsed.searchParams.get('href');
            if (href) return href;
        } catch {
            return clean;
        }
    }
    if (clean.includes('youtube.com/embed/')) {
        const videoId = clean.split('youtube.com/embed/')[1].split('?')[0];
        if (videoId) return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return clean;
}

export function getVideoPlatformLabel(url: string): string {
    const clean = (url || '').toLowerCase();
    if (clean.includes('youtube.com') || clean.includes('youtu.be')) return 'YouTube';
    if (clean.includes('www-ccv.adobe.io') || clean.includes('adobe.io')) return 'Adobe Video';
    if (clean.includes('facebook.com')) return clean.includes('%2freel%2f') || clean.includes('/reel/') ? 'Facebook Reel' : 'Facebook Video';
    if (clean.includes('vimeo.com')) return 'Vimeo';
    if (clean.includes('drive.google.com')) return 'Google Drive';
    return 'Video Cut';
}
