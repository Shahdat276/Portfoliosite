import { StudioTheme } from '@/types';

export const STUDIO_THEMES: Record<string, StudioTheme> = {
    cinema: {
        id: 'cinema',
        name: 'Cinema Gold',
        badge: 'Warm Dark Lounge',
        isDark: true,
        bg: '#11100F',
        surface: '#1A1816',
        surfaceAlt: '#24211E',
        text: '#F5F2EB',
        textMuted: '#A09A90',
        accent: '#D4AF37',
        accentSoft: 'rgba(212, 175, 55, 0.14)',
        accentText: '#11100F',
        border: '#2A2723',
        borderStrong: '#3D3832',
        swatch: '#D4AF37',
        bgSwatch: '#11100F'
    },
    paper: {
        id: 'paper',
        name: 'Editorial Paper',
        badge: 'Light Editorial',
        isDark: false,
        bg: '#F7F5F0',
        surface: '#FFFFFF',
        surfaceAlt: '#EFECE6',
        text: '#141413',
        textMuted: '#65625A',
        accent: '#D9381E',
        accentSoft: 'rgba(217, 56, 30, 0.10)',
        accentText: '#FFFFFF',
        border: '#E4E0D8',
        borderStrong: '#CEC8BC',
        swatch: '#D9381E',
        bgSwatch: '#F7F5F0'
    }
};

