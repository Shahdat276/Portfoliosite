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
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'activation' | 'error'>('idle');
    const [formErrorMessage, setFormErrorMessage] = useState<string>('');

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedLabel(label);
        setTimeout(() => setCopiedLabel(''), 2500);
    };

    const buildMailtoUrl = () =>
        `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
            `[Portfolio Inquiry] ${formData.subject || 'Project Inquiry'} - from ${formData.name || 'Visitor'}`
        )}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nInquiry Type: ${formData.subject}\n\nProject Details:\n${formData.message}`
        )}`;

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
        setFormErrorMessage('');

        if (siteConfig.contact.formEndpoint) {
            try {
                const payload = new FormData();
                payload.append('name', formData.name);
                payload.append('email', formData.email);
                payload.append('subject', formData.subject);
                payload.append('_subject', `[Portfolio Inquiry] ${formData.subject} — ${formData.name}`);
                payload.append('_replyto', formData.email);
                payload.append('_template', 'table');
                payload.append('message', formData.message);

                const res = await fetch(siteConfig.contact.formEndpoint, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json'
                    },
                    body: payload
                });

                const result = await res.json().catch(() => ({}));
                const msg = typeof result?.message === 'string' ? result.message : '';

                if (msg.toLowerCase().includes('activat')) {
                    setFormErrorMessage(msg);
                    setFormStatus('activation');
                    return;
                }

                if (!res.ok || result.success === false || result.success === 'false') {
                    throw new Error(msg || `Relay error (${res.status})`);
                }

                setFormStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setFormStatus('idle'), 7000);
                return;
            } catch (err) {
                setFormErrorMessage(
                    err instanceof Error && err.message
                        ? err.message
                        : 'Network or mail relay temporarily unreachable.'
                );
                setFormStatus('error');
                return;
            }
        }

        // Fallback to local mail client if no endpoint is configured
        const mailtoUrl = buildMailtoUrl();
        setTimeout(() => {
            window.location.href = mailtoUrl;
            setFormStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setFormStatus('idle'), 5000);
        }, 500);
    };

    const handleWhatsAppSubmit = () => {
        const waDigits = siteConfig.contact.whatsapp.replace(/[^0-9]/g, '');
        const lines = [
            '*New Portfolio Project Inquiry*',
            formData.name.trim() ? `*Name:* ${formData.name.trim()}` : '',
            formData.email.trim() ? `*Email:* ${formData.email.trim()}` : '',
            formData.subject.trim() ? `*Subject:* ${formData.subject.trim()}` : '',
            formData.message.trim()
                ? `\n*Project Details:*\n${formData.message.trim()}`
                : '\nHi Shahdat, I reviewed your portfolio and would like to discuss a project.'
        ].filter(Boolean);

        const waUrl = `https://wa.me/${waDigits}?text=${encodeURIComponent(lines.join('\n'))}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
    };

    const socialLinks = [
        { label: 'LinkedIn', url: siteConfig.contact.linkedin },
        { label: 'Behance', url: siteConfig.contact.behance },
        { label: 'Vimeo', url: siteConfig.contact.vimeo },
        { label: 'YouTube', url: siteConfig.contact.youtube }
    ].filter((l) => Boolean(l.url && l.url.trim()));

    return (
        <section
            id="contact"
            className="py-12 sm:py-16 md:py-24 lg:py-28"
            style={{ backgroundColor: theme.bg }}
        >
                <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mx-auto max-w-[1920px]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-16 items-start">
                        {/* Left 6 Columns: Contact Details & Direct Reaches */}
                        <div className="lg:col-span-6 space-y-5 sm:space-y-8">
                            <div>
                                <span
                                    className="font-mono text-xs uppercase tracking-[0.2em] block mb-2"
                                    style={{ color: theme.accent }}
                                >
                                    07 / Direct Connect
                                </span>
                                <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
                                    Let&apos;s Create Visuals That{' '}
                                    <span className="font-serif-italic font-normal">Resonate.</span>
                                </h2>
                                <p
                                    className="text-sm sm:text-lg mt-3 sm:mt-5 leading-relaxed max-w-lg"
                                    style={{ color: theme.textMuted }}
                                >
                                    Available for senior editorial commissions, brand campaigns, motion systems, and full-time senior agency leadership.
                                </p>
                            </div>

                            {/* Direct Channel Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                                            className="px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-200 hover:-translate-y-0.5 active:scale-95 flex items-center gap-1 border cursor-pointer"
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
                                            className="px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-200 hover:-translate-y-0.5 active:scale-95 flex items-center gap-1 border cursor-pointer"
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
                                formErrorMessage={formErrorMessage}
                                recipientEmail={siteConfig.contact.email}
                                handleFormSubmit={handleFormSubmit}
                                handleWhatsAppSubmit={handleWhatsAppSubmit}
                                fallbackMailtoUrl={buildMailtoUrl()}
                                hasDirectEndpoint={Boolean(siteConfig.contact.formEndpoint)}
                            />
                        </div>
                    </div>
                </div>
        </section>
    );
}
