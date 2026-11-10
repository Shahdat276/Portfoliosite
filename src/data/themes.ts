import { StudioTheme } from '@/types';

export const STUDIO_THEMES: Record<string, StudioTheme> = {
    cinema: {
        id: 'cinema',
        name: 'Cinema Obsidian',
        badge: 'Dark Studio',
        isDark: true,
        bg: '#0F0F0F',
        surface: '#171615',
        surfaceAlt: '#211F1D',
        text: '#FFFFFF',
        textMuted: '#9B9892',
        accent: '#EB5E28',
        accentSoft: 'rgba(235, 94, 40, 0.14)',
        accentText: '#FFFFFF',
        border: '#262421',
        borderStrong: '#3B3833',
        swatch: '#EB5E28',
        bgSwatch: '#0F0F0F'
    },
    paper: {
        id: 'paper',
        name: 'Editorial Stone',
        badge: 'Light Studio',
        isDark: false,
        bg: '#ECE9E3',
        surface: '#FFFFFF',
        surfaceAlt: '#E2DDD4',
        text: '#0F0F0F',
        textMuted: '#615E58',
        accent: '#EB5E28',
        accentSoft: 'rgba(235, 94, 40, 0.11)',
        accentText: '#FFFFFF',
        border: '#D8D2C8',
        borderStrong: '#BFB8AC',
        swatch: '#0F0F0F',
        bgSwatch: '#ECE9E3'
    }
};

