"use client";

import React, { useState } from 'react';
import {
    Mail,
    Copy,
    Check,
    ArrowUpRight
} from 'lucide-react';
import { StudioTheme, SiteConfig, ContactFormData } from '@/types';
import { ContactForm } from './ContactForm';

interface ContactSectionProps {
    theme: StudioTheme;
    siteConfig: SiteConfig;
}

export function ContactSection({
    theme,
    siteConfig
}: ContactSectionProps) {
    const [copiedLabel, setCopiedLabel] = useState<string>('');
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedLabel(label);
        setTimeout(() => setCopiedLabel(''), 2500);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs: Record<string, string> = {};
        if (!formData.name.trim()) errs.name = 'Please provide your name';
        if (!formData.email.trim() || !formData.email.includes('@'))
            errs.email = 'Valid email is required';
        if (!formData.subject.trim()) errs.subject = 'Please provide a subject';
        if (!formData.message.trim()) errs.message = 'Please provide project details';

        if (Object.keys(errs).length > 0) {
            setFormErrors(errs);
            return;
        }

        setFormStatus('submitting');

        const mailtoUrl = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
            `[Portfolio Inquiry] ${formData.subject} - from ${formData.name}`
        )}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nInquiry Type: ${formData.subject}\n\nProject Details:\n${formData.message}`
        )}`;

        setTimeout(() => {
            window.location.href = mailtoUrl;
            setFormStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setFormStatus('idle'), 5000);
        }, 600);
    };

    const socialLinks = [
        { label: 'LinkedIn', url: siteConfig.contact.linkedin },
        { label: 'Behance', url: siteConfig.contact.behance },
        { label: 'Vimeo', url: siteConfig.contact.vimeo },
        { label: 'YouTube', url: siteConfig.contact.youtube }
    ];

    return (
        <section
            id="contact"
            className="py-24 md:py-32"
            style={{ backgroundColor: theme.bg }}
        >
                <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        {/* Left 6 Columns: Contact Details & Direct Reaches */}
                        <div className="lg:col-span-6 space-y-8">
                            <div>
                                <span
                                    className="font-mono text-xs uppercase tracking-[0.2em] block mb-2"
                                    style={{ color: theme.accent }}
                                >
                                    06 / Direct Connect
                                </span>
                                <h2 className="font-display text-4xl sm:text-6xl font-semibold leading-tight">
                                    Let&apos;s Create Visuals That{' '}
                                    <span className="font-serif-italic font-normal">Resonate.</span>
                                </h2>
                                <p
                                    className="text-base sm:text-lg mt-5 leading-relaxed max-w-lg"
                                    style={{ color: theme.textMuted }}
                                >
                                    Available for senior editorial commissions, brand campaigns, motion systems, and full-time senior agency leadership.
                                </p>
                            </div>

                            {/* Direct Channel Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Email Card */}
                                <div
                                    className="p-5 rounded-2xl border flex flex-col justify-between gap-4 transition-all"
                                    style={{
                                        backgroundColor: theme.surface,
                                        borderColor: theme.border
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                                            style={{ backgroundColor: theme.surfaceAlt }}
                                        >
                                            <Mail className="w-5 h-5" style={{ color: theme.accent }} />
                                        </div>
                                        <button
                                            onClick={() => handleCopy(siteConfig.contact.email, 'email')}
                                            className="px-2.5 py-1 rounded-md text-xs font-mono transition-colors flex items-center gap-1 border"
                                            style={{
                                                backgroundColor: theme.surfaceAlt,
                                                borderColor: theme.border,
                                                color: theme.textMuted
                                            }}
                                            title="Copy Email Address"
                                        >
                                            {copiedLabel === 'email' ? (
                                                <>
                                                    <Check className="w-3 h-3 text-emerald-500" />
                                                    <span className="text-emerald-500 font-semibold">Copied</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-3 h-3" />
                                                    <span>Copy</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <div>
                                        <span className="text-xs font-mono uppercase tracking-wider block mb-1" style={{ color: theme.textMuted }}>
                                            Email Address
                                        </span>
                                        <a
                                            href={`mailto:${siteConfig.contact.email}`}
                                            className="text-sm font-semibold truncate block hover:underline"
                                            style={{ color: theme.text }}
                                        >
                                            {siteConfig.contact.email}
                                        </a>
                                    </div>
                                </div>

                                {/* WhatsApp Card */}
                                <div
                                    className="p-5 rounded-2xl border flex flex-col justify-between gap-4 transition-all"
                                    style={{
                                        backgroundColor: theme.surface,
                                        borderColor: theme.border
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                                            style={{ backgroundColor: theme.surfaceAlt }}
                                        >
                                            <span className="font-mono text-xs font-bold" style={{ color: theme.accent }}>
                                                WA
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => handleCopy(siteConfig.contact.whatsapp, 'wa')}
                                            className="px-2.5 py-1 rounded-md text-xs font-mono transition-colors flex items-center gap-1 border"
                                            style={{
                                                backgroundColor: theme.surfaceAlt,
                                                borderColor: theme.border,
                                                color: theme.textMuted
                                            }}
                                            title="Copy WhatsApp Number"
                                        >
                                            {copiedLabel === 'wa' ? (
                                                <>
                                                    <Check className="w-3 h-3 text-emerald-500" />
                                                    <span className="text-emerald-500 font-semibold">Copied</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-3 h-3" />
                                                    <span>Copy</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <div>
                                        <span className="text-xs font-mono uppercase tracking-wider block mb-1" style={{ color: theme.textMuted }}>
                                            WhatsApp Direct
                                        </span>
                                        <a
                                            href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-semibold truncate block hover:underline"
                                            style={{ color: theme.text }}
                                        >
                                            {siteConfig.contact.whatsapp}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links Row */}
                            <div className="pt-2">
                                <span className="font-mono text-xs uppercase tracking-wider block mb-3" style={{ color: theme.textMuted }}>
                                    Creative Networks & Portfolios
                                </span>
                                <div className="flex flex-wrap gap-2.5">
                                    {socialLinks.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2.5 rounded-full border text-xs font-mono font-medium transition-transform hover:-translate-y-0.5 flex items-center gap-1.5"
                                            style={{
                                                backgroundColor: theme.surfaceAlt,
                                                borderColor: theme.border,
                                                color: theme.text
                                            }}
                                        >
                                            <span>{link.label}</span>
                                            <ArrowUpRight className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right 6 Columns: Extracted Validated Contact Form */}
                        <div className="lg:col-span-6">
                            <ContactForm
                                theme={theme}
                                formData={formData}
                                setFormData={setFormData}
                                formErrors={formErrors}
                                setFormErrors={setFormErrors}
                                formStatus={formStatus}
                                handleFormSubmit={handleFormSubmit}
                            />
                        </div>
                    </div>
                </div>
        </section>
    );
}
