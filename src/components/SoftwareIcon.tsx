"use client";

import React from 'react';

interface SoftwareIconProps {
    code: string;
    name?: string;
    className?: string;
}

export function SoftwareIcon({ code, name = '', className = 'w-11 h-11' }: SoftwareIconProps) {
    const normalized = (code || name).toLowerCase().trim();

    // 1. Adobe Premiere Pro
    if (normalized === 'pr' || normalized.includes('premiere')) {
        return (
            <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="11" fill="#00005B" />
                <rect x="0.75" y="0.75" width="46.5" height="46.5" rx="10.25" stroke="#9999FF" strokeOpacity="0.4" strokeWidth="1.5" />
                <rect width="48" height="48" rx="11" fill="url(#pr-grad)" opacity="0.2" />
                <path d="M12 14.5H20C23.5 14.5 25.5 16.5 25.5 19.8C25.5 23.2 23.4 25.2 20 25.2H16.2V33.5H12V14.5ZM16.2 21.6H19.5C21.3 21.6 22.2 20.8 22.2 19.8C22.2 18.8 21.3 18.1 19.5 18.1H16.2V21.6Z" fill="#9999FF" />
                <path d="M28.5 20.5H32.4V22.8C33.2 21.2 34.8 20.2 36.8 20.2C37.4 20.2 38 20.4 38.5 20.6V24.6C37.8 24.3 37.1 24.2 36.4 24.2C34.4 24.2 32.7 25.6 32.7 28.5V33.5H28.5V20.5Z" fill="#9999FF" />
                <defs>
                    <linearGradient id="pr-grad" x1="0" y1="0" x2="48" y2="48">
                        <stop stopColor="#EA77FF" />
                        <stop offset="1" stopColor="#00005B" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }

    // 2. Adobe After Effects
    if (normalized === 'ae' || normalized.includes('after effects')) {
        return (
            <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="11" fill="#00005B" />
                <rect x="0.75" y="0.75" width="46.5" height="46.5" rx="10.25" stroke="#D291FF" strokeOpacity="0.4" strokeWidth="1.5" />
                <rect width="48" height="48" rx="11" fill="url(#ae-grad)" opacity="0.2" />
                <path d="M11 33.5L17.5 14.5H21.8L28.3 33.5H24L22.6 29H16.7L15.3 33.5H11ZM17.8 25.5H21.5L19.7 19.2H19.5L17.8 25.5Z" fill="#D291FF" />
                <path d="M30 27C30 31.2 32.8 33.8 36.6 33.8C38.8 33.8 40.4 32.9 41.3 31.6L39 29.5C38.4 30.2 37.6 30.6 36.6 30.6C35 30.6 34 29.6 33.8 28H41.5C41.6 27.5 41.6 27 41.6 26.5C41.6 22.8 39.2 20.2 35.8 20.2C32.4 20.2 30 22.9 30 27ZM35.8 23.2C37.3 23.2 38.1 24.1 38.3 25.5H33.8C34 24.1 34.8 23.2 35.8 23.2Z" fill="#D291FF" />
                <defs>
                    <linearGradient id="ae-grad" x1="0" y1="0" x2="48" y2="48">
                        <stop stopColor="#9999FF" />
                        <stop offset="1" stopColor="#00005B" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }

    // 3. DaVinci Resolve
    if (normalized === 'dr' || normalized.includes('davinci') || normalized.includes('resolve')) {
        return (
            <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="11" fill="#141419" />
                <rect x="0.75" y="0.75" width="46.5" height="46.5" rx="10.25" stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="1.5" />
                <g transform="translate(24, 24)">
                    {/* Top Petal - Red */}
                    <path d="M0 -15C4 -15 10 -9 9 -3C8 2 2 3 0 0C-2 3 -8 2 -9 -3C-10 -9 -4 -15 0 -15Z" fill="url(#dvr-red)" />
                    {/* Bottom Right Petal - Green */}
                    <path d="M13 7.5C15 4 16 -3 11 -5C6 -7 3 -3 0 0C3 2 4 8 8 11C11 13 15 10 13 7.5Z" fill="url(#dvr-green)" />
                    {/* Bottom Left Petal - Blue */}
                    <path d="M-13 7.5C-15 10 -11 13 -8 11C-4 8 -3 2 0 0C-3 -3 -6 -7 -11 -5C-16 -3 -15 4 -13 7.5Z" fill="url(#dvr-blue)" />
                    {/* Center Ring */}
                    <circle cx="0" cy="0" r="3.2" fill="#141419" />
                    <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" opacity="0.8" />
                </g>
                <defs>
                    <linearGradient id="dvr-red" x1="0" y1="-15" x2="0" y2="3">
                        <stop stopColor="#FF4B4B" />
                        <stop offset="1" stopColor="#D91E1E" />
                    </linearGradient>
                    <linearGradient id="dvr-green" x1="0" y1="0" x2="15" y2="10">
                        <stop stopColor="#00E676" />
                        <stop offset="1" stopColor="#00A854" />
                    </linearGradient>
                    <linearGradient id="dvr-blue" x1="0" y1="0" x2="-15" y2="10">
                        <stop stopColor="#29B6F6" />
                        <stop offset="1" stopColor="#0277BD" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }

    // 4. Cinema 4D
    if (normalized === 'c4d' || normalized.includes('cinema')) {
        return (
            <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="11" fill="#001438" />
                <rect x="0.75" y="0.75" width="46.5" height="46.5" rx="10.25" stroke="#0077FF" strokeOpacity="0.4" strokeWidth="1.5" />
                {/* 3D Isometric Cube Facets */}
                <g transform="translate(24, 24)">
                    {/* Top Face */}
                    <path d="M0 -13L11.5 -6.5L0 0L-11.5 -6.5Z" fill="#00D2FF" />
                    {/* Right Face */}
                    <path d="M0 0L11.5 -6.5V6.5L0 13Z" fill="#0066FF" />
                    {/* Left Face */}
                    <path d="M-11.5 -6.5L0 0V13L-11.5 6.5Z" fill="#003EAF" />
                    {/* Geometric Center Eye */}
                    <circle cx="0" cy="0" r="3.2" fill="#FFFFFF" />
                </g>
            </svg>
        );
    }

    // 5. Blender
    if (normalized === 'bl' || normalized.includes('blender')) {
        return (
            <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="11" fill="#0E1726" />
                <rect x="0.75" y="0.75" width="46.5" height="46.5" rx="10.25" stroke="#EA7600" strokeOpacity="0.4" strokeWidth="1.5" />
                <g transform="translate(24, 24)">
                    {/* 3 Orange Radiating Arms */}
                    <path d="M1 -2L10 -11C11.2 -12 12.8 -10.5 11.5 -9.2L3 0Z" fill="#EA7600" />
                    <path d="M-2 -1L-11 -10C-12.2 -11 -10.8 -12.5 -9.5 -11.2L0 1.5Z" fill="#EA7600" />
                    <path d="M-2 1.5L-11 8C-12.2 9.2 -13 7.8 -11.8 6.5L-0.5 0Z" fill="#EA7600" />
                    {/* Main Orange Circle */}
                    <circle cx="1.5" cy="1.5" r="9.5" fill="#EA7600" />
                    {/* Dark Blue Center Eye */}
                    <circle cx="1.5" cy="1.5" r="5" fill="#225785" />
                    {/* White Pupil */}
                    <circle cx="2.5" cy="0.5" r="1.8" fill="#FFFFFF" />
                </g>
            </svg>
        );
    }

    // 6. Autodesk 3ds Max
    if (normalized === '3ds' || normalized.includes('3ds') || normalized.includes('max')) {
        return (
            <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="11" fill="#081826" />
                <rect x="0.75" y="0.75" width="46.5" height="46.5" rx="10.25" stroke="#00A3E0" strokeOpacity="0.4" strokeWidth="1.5" />
                {/* 3ds Max Origami M Ribbon */}
                <g transform="translate(11, 12)">
                    <path d="M0 24L6.5 0L13 12L19.5 0L26 24H21L17.5 7L13 15H13L8.5 7L5 24H0Z" fill="url(#max-ribbon)" />
                </g>
                <defs>
                    <linearGradient id="max-ribbon" x1="0" y1="0" x2="26" y2="24">
                        <stop stopColor="#00D2D2" />
                        <stop offset="0.5" stopColor="#00A3E0" />
                        <stop offset="1" stopColor="#006699" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }

    // 7. Autodesk Maya
    if (normalized === 'my' || normalized.includes('maya')) {
        return (
            <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="11" fill="#061E22" />
                <rect x="0.75" y="0.75" width="46.5" height="46.5" rx="10.25" stroke="#00B4B4" strokeOpacity="0.4" strokeWidth="1.5" />
                {/* Maya Origami M Ribbon */}
                <g transform="translate(11, 12)">
                    <path d="M0 24L6.5 2L13 14L19.5 2L26 24H21L17.5 8L13 17H13L8.5 8L5 24H0Z" fill="url(#maya-ribbon)" />
                </g>
                <defs>
                    <linearGradient id="maya-ribbon" x1="0" y1="0" x2="26" y2="24">
                        <stop stopColor="#00F5B8" />
                        <stop offset="0.5" stopColor="#00B4B4" />
                        <stop offset="1" stopColor="#007A7A" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }

    // 8. Adobe Photoshop
    if (normalized === 'ps' || normalized.includes('photoshop')) {
        return (
            <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="11" fill="#001E36" />
                <rect x="0.75" y="0.75" width="46.5" height="46.5" rx="10.25" stroke="#31A8FF" strokeOpacity="0.4" strokeWidth="1.5" />
                <rect width="48" height="48" rx="11" fill="url(#ps-grad)" opacity="0.2" />
                <path d="M13 14.5H21C24.5 14.5 26.5 16.5 26.5 19.8C26.5 23.2 24.4 25.2 21 25.2H17.2V33.5H13V14.5ZM17.2 21.6H20.5C22.3 21.6 23.2 20.8 23.2 19.8C23.2 18.8 22.3 18.1 20.5 18.1H17.2V21.6Z" fill="#31A8FF" />
                <path d="M29.5 29.2C30 31.6 32 33.8 35.5 33.8C38.6 33.8 40.5 32.1 40.5 29.8C40.5 27.2 38.6 26.2 35.8 25.4L34.3 25C32.8 24.5 31.8 24 31.8 22.8C31.8 21.6 33 20.5 34.8 20.5C36.7 20.5 38 21.6 38.3 23.4H41.8C41.4 19.8 38.7 17.5 34.8 17.5C31 17.5 28.5 19.8 28.5 23C28.5 25.8 30.6 26.9 33.2 27.6L34.8 28.1C36.6 28.6 37.6 29.2 37.6 30.4C37.6 31.6 36.2 32.5 34.6 32.5C32.8 32.5 31.5 31.4 31.1 29.2H29.5Z" fill="#31A8FF" />
                <defs>
                    <linearGradient id="ps-grad" x1="0" y1="0" x2="48" y2="48">
                        <stop stopColor="#31A8FF" />
                        <stop offset="1" stopColor="#001E36" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }

    // 9. Adobe Illustrator
    if (normalized === 'ai' || normalized.includes('illustrator')) {
        return (
            <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="11" fill="#261300" />
                <rect x="0.75" y="0.75" width="46.5" height="46.5" rx="10.25" stroke="#FF9A00" strokeOpacity="0.4" strokeWidth="1.5" />
                <rect width="48" height="48" rx="11" fill="url(#ai-grad)" opacity="0.2" />
                <path d="M12 33.5L18.5 14.5H22.8L29.3 33.5H25L23.6 29H17.7L16.3 33.5H12ZM18.8 25.5H22.5L20.7 19.2H20.5L18.8 25.5Z" fill="#FF9A00" />
                <circle cx="34" cy="16.5" r="2.5" fill="#FF9A00" />
                <rect x="31.8" y="21.5" width="4.4" height="12" fill="#FF9A00" />
                <defs>
                    <linearGradient id="ai-grad" x1="0" y1="0" x2="48" y2="48">
                        <stop stopColor="#FF9A00" />
                        <stop offset="1" stopColor="#261300" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }

    // Fallback Icon
    return (
        <div className={`${className} rounded-xl bg-neutral-800 text-white flex items-center justify-center font-mono text-xs font-bold border border-white/10`}>
            {code}
        </div>
    );
}
