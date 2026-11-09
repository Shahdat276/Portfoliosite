/**
 * Universal Video Formatter Utility
 * Supports YouTube, Google Drive, Vimeo, and direct MP4/WebM video files.
 */
export interface VideoEmbedResult {
    type: 'youtube' | 'drive' | 'vimeo' | 'video' | 'unknown';
    embedUrl: string;
}

export function formatUniversalVideoEmbed(url: string): VideoEmbedResult {
    if (!url || typeof url !== 'string') {
        return { type: 'unknown', embedUrl: '' };
    }

    const trimmed = url.trim();

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
            return {
                type: 'youtube',
                embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&loop=1&playlist=${videoId}&playsinline=1&enablejsapi=1`
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
                embedUrl: `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&autopause=0`
            };
        }
    }

    // 4. Default / Direct Video File (e.g., .mp4, .webm, /videos/...)
    return {
        type: 'video',
        embedUrl: trimmed
    };
}

