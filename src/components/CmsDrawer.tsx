"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Copy } from 'lucide-react';
import { StudioTheme, SiteConfig } from '@/types';
import { STUDIO_THEMES } from '@/data/themes';

interface CmsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    theme: StudioTheme;
    activeThemeKey: string;
    setActiveThemeKey: (key: string) => void;
    siteConfig: SiteConfig;
    setSiteConfig: (config: SiteConfig) => void;
}

export function CmsDrawer({
    isOpen,
    onClose,
    theme,
    activeThemeKey,
    setActiveThemeKey,
    siteConfig,
    setSiteConfig
}: CmsDrawerProps) {
    const [copiedLabel, setCopiedLabel] = useState('');

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedLabel(label);
        setTimeout(() => setCopiedLabel(''), 2200);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end"
                >
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.25 }}
                        className="w-full max-w-md h-full p-6 sm:p-8 overflow-y-auto flex flex-col justify-between border-l"
                        style={{
                            backgroundColor: theme.surface,
                            borderColor: theme.border,
                            color: theme.text
                        }}
                    >
                        <div className="space-y-6">
                            <div
                                className="flex items-center justify-between pb-4 border-b"
                                style={{ borderColor: theme.border }}
                            >
                                <div>
                                    <h3 className="font-display text-lg font-semibold">Studio CMS & Theme</h3>
                                    <p className="text-xs" style={{ color: theme.textMuted }}>
                                        Live portfolio configuration & JSON exporter
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full border"
                                    style={{ borderColor: theme.border }}
                                    aria-label="Close CMS Drawer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Theme Selector inside CMS */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider mb-2" style={{ color: theme.textMuted }}>
                                    Active Color Theme
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {Object.values(STUDIO_THEMES).map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => setActiveThemeKey(t.id)}
                                            className="p-2.5 rounded-xl border text-left text-xs font-medium flex items-center gap-2"
                                            style={{
                                                backgroundColor: t.id === activeThemeKey ? theme.surfaceAlt : 'transparent',
                                                borderColor: t.id === activeThemeKey ? theme.accent : theme.border
                                            }}
                                        >
                                            <span
                                                className="w-3.5 h-3.5 rounded-full shrink-0"
                                                style={{ backgroundColor: t.swatch }}
                                            />
                                            <span>{t.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Editable Fields */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-mono uppercase mb-1" style={{ color: theme.textMuted }}>
                                        Availability Status
                                    </label>
                                    <input
                                        type="text"
                                        value={siteConfig.availabilityText}
                                        onChange={(e) =>
                                            setSiteConfig({ ...siteConfig, availabilityText: e.target.value })
                                        }
                                        className="w-full px-3.5 py-2.5 rounded-xl border text-xs"
                                        style={{
                                            backgroundColor: theme.bg,
                                            borderColor: theme.border,
                                            color: theme.text
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono uppercase mb-1" style={{ color: theme.textMuted }}>
                                        Showreel Video URL (YouTube / Vimeo / MP4)
                                    </label>
                                    <input
                                        type="text"
                                        value={siteConfig.showreel.videoUrl}
                                        placeholder="https://.../showreel.mp4"
                                        onChange={(e) =>
                                            setSiteConfig({
                                                ...siteConfig,
                                                showreel: { ...siteConfig.showreel, videoUrl: e.target.value }
                                            })
                                        }
                                        className="w-full px-3.5 py-2.5 rounded-xl border text-xs"
                                        style={{
                                            backgroundColor: theme.bg,
                                            borderColor: theme.border,
                                            color: theme.text
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono uppercase mb-1" style={{ color: theme.textMuted }}>
                                        Portrait Image URL
                                    </label>
                                    <input
                                        type="text"
                                        value={siteConfig.portrait.imageUrl}
                                        placeholder="/images/shahdat-portrait.jpg"
                                        onChange={(e) =>
                                            setSiteConfig({
                                                ...siteConfig,
                                                portrait: { ...siteConfig.portrait, imageUrl: e.target.value }
                                            })
                                        }
                                        className="w-full px-3.5 py-2.5 rounded-xl border text-xs"
                                        style={{
                                            backgroundColor: theme.bg,
                                            borderColor: theme.border,
                                            color: theme.text
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono uppercase mb-1" style={{ color: theme.textMuted }}>
                                        Direct Email
                                    </label>
                                    <input
                                        type="email"
                                        value={siteConfig.contact.email}
                                        onChange={(e) =>
                                            setSiteConfig({
                                                ...siteConfig,
                                                contact: { ...siteConfig.contact, email: e.target.value }
                                            })
                                        }
                                        className="w-full px-3.5 py-2.5 rounded-xl border text-xs"
                                        style={{
                                            backgroundColor: theme.bg,
                                            borderColor: theme.border,
                                            color: theme.text
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono uppercase mb-1" style={{ color: theme.textMuted }}>
                                        WhatsApp / Phone
                                    </label>
                                    <input
                                        type="text"
                                        value={siteConfig.contact.whatsapp}
                                        onChange={(e) =>
                                            setSiteConfig({
                                                ...siteConfig,
                                                contact: { ...siteConfig.contact, whatsapp: e.target.value }
                                            })
                                        }
                                        className="w-full px-3.5 py-2.5 rounded-xl border text-xs"
                                        style={{
                                            backgroundColor: theme.bg,
                                            borderColor: theme.border,
                                            color: theme.text
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 space-y-2.5">
                            <button
                                onClick={() =>
                                    handleCopy(JSON.stringify(siteConfig, null, 2), 'Config JSON')
                                }
                                className="w-full py-3 rounded-full border text-xs font-medium flex items-center justify-center gap-2"
                                style={{
                                    borderColor: theme.borderStrong,
                                    color: theme.text
                                }}
                            >
                                {copiedLabel === 'Config JSON' ? (
                                    <>
                                        <Check className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                                        <span>Copied Config JSON!</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3.5 h-3.5" />
                                        <span>Export / Copy Config JSON</span>
                                    </>
                                )}
                            </button>

                            <button
                                onClick={onClose}
                                className="w-full py-3 rounded-full text-xs font-medium"
                                style={{
                                    backgroundColor: theme.accent,
                                    color: theme.accentText
                                }}
                            >
                                Save & Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
