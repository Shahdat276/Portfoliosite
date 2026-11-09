"use client";

import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy, CheckCircle2 } from 'lucide-react';
import { StudioTheme, SiteConfig } from '@/types';

interface ContactSectionProps {
    theme: StudioTheme;
    siteConfig: SiteConfig;
}

export function ContactSection({ theme, siteConfig }: ContactSectionProps) {
    const [copiedLabel, setCopiedLabel] = useState('');
    const [formData, setFormData] = useState({
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
        setTimeout(() => setCopiedLabel(''), 2200);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs: Record<string, string> = {};
        if (!formData.name.trim()) errs.name = 'Please enter your name';
        if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
            errs.email = 'Please enter a valid email address';
        if (!formData.subject.trim()) errs.subject = 'Please enter a subject';
        if (!formData.message.trim() || formData.message.trim().length < 10)
            errs.message = 'Please write a short project message (10+ characters)';

        setFormErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setFormStatus('submitting');
        await new Promise((r) => setTimeout(r, 600));
        setFormStatus('success');
    };

    return (
        <section id="contact" className="py-24 md:py-32">
            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left 6 Columns: Direct Contact Cards & Socials */}
                    <div className="lg:col-span-6 flex flex-col justify-between">
                        <div>
                            <span
                                className="font-mono text-xs uppercase tracking-[0.2em] block mb-2"
                                style={{ color: theme.accent }}
                            >
                                07 / Contact
                            </span>
                            <h2 className="font-display text-4xl sm:text-6xl font-semibold leading-[1.04] mb-5">
                                Have a{' '}
                                <span className="font-serif-italic font-normal" style={{ color: theme.accent }}>
                                    Story
                                </span>{' '}
                                Worth Telling?
                            </h2>
                            <p
                                className="text-base sm:text-lg max-w-md mb-10"
                                style={{ color: theme.textMuted }}
                            >
                                Let&apos;s create something extraordinary together. Available for senior roles,
                                commercial campaigns, and freelance collaborations.
                            </p>

                            {/* Direct Contact Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                <div
                                    className="p-5 rounded-2xl border"
                                    style={{
                                        backgroundColor: theme.surface,
                                        borderColor: theme.border
                                    }}
                                >
                                    <span
                                        className="font-mono text-[10px] uppercase tracking-wider block mb-1"
                                        style={{ color: theme.textMuted }}
                                    >
                                        Professional Email
                                    </span>
                                    <div className="flex items-center justify-between gap-2">
                                        <a
                                            href={`mailto:${siteConfig.contact.email}`}
                                            className="font-display text-sm font-semibold truncate hover:underline"
                                        >
                                            {siteConfig.contact.email}
                                        </a>
                                        <button
                                            onClick={() => handleCopy(siteConfig.contact.email, 'Email')}
                                            className="p-1.5 rounded-lg border shrink-0"
                                            style={{ borderColor: theme.border }}
                                            title="Copy Email"
                                        >
                                            {copiedLabel === 'Email' ? (
                                                <Check className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                                            ) : (
                                                <Copy className="w-3.5 h-3.5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div
                                    className="p-5 rounded-2xl border"
                                    style={{
                                        backgroundColor: theme.surface,
                                        borderColor: theme.border
                                    }}
                                >
                                    <span
                                        className="font-mono text-[10px] uppercase tracking-wider block mb-1"
                                        style={{ color: theme.textMuted }}
                                    >
                                        WhatsApp / Direct
                                    </span>
                                    <span className="font-display text-sm font-semibold block">
                                        {siteConfig.contact.whatsapp}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Social Profiles & Resume Bar */}
                        <div
                            className="p-6 rounded-2xl border"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.border
                            }}
                        >
                            <span
                                className="font-mono text-[10px] uppercase tracking-wider block mb-3"
                                style={{ color: theme.textMuted }}
                            >
                                Networks & Portfolio Channels
                            </span>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { label: 'LinkedIn', url: siteConfig.contact.linkedin },
                                    { label: 'Behance', url: siteConfig.contact.behance },
                                    { label: 'Vimeo', url: siteConfig.contact.vimeo },
                                    { label: 'YouTube', url: siteConfig.contact.youtube },
                                    { label: 'Download Resume', url: siteConfig.contact.cvUrl }
                                ].map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-3.5 py-2 rounded-full text-xs font-medium border inline-flex items-center gap-1.5 transition-colors"
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

                    {/* Right 6 Columns: Contact Form */}
                    <div className="lg:col-span-6">
                        <form
                            onSubmit={handleFormSubmit}
                            noValidate
                            className="p-8 sm:p-10 rounded-3xl border space-y-6"
                            style={{
                                backgroundColor: theme.surface,
                                borderColor: theme.border
                            }}
                        >
                            <h3 className="font-display text-2xl font-semibold">
                                Send a Project Inquiry
                            </h3>

                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider mb-2" style={{ color: theme.textMuted }}>
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => {
                                        setFormData({ ...formData, name: e.target.value });
                                        if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                                    }}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3.5 rounded-xl border text-sm focus:outline-none"
                                    style={{
                                        backgroundColor: theme.bg,
                                        borderColor: formErrors.name ? '#DC2626' : theme.border,
                                        color: theme.text
                                    }}
                                />
                                {formErrors.name && (
                                    <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider mb-2" style={{ color: theme.textMuted }}>
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData({ ...formData, email: e.target.value });
                                        if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                                    }}
                                    placeholder="name@company.com"
                                    className="w-full px-4 py-3.5 rounded-xl border text-sm focus:outline-none"
                                    style={{
                                        backgroundColor: theme.bg,
                                        borderColor: formErrors.email ? '#DC2626' : theme.border,
                                        color: theme.text
                                    }}
                                />
                                {formErrors.email && (
                                    <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider mb-2" style={{ color: theme.textMuted }}>
                                    Subject / Inquiry Type *
                                </label>
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => {
                                        setFormData({ ...formData, subject: e.target.value });
                                        if (formErrors.subject) setFormErrors({ ...formErrors, subject: '' });
                                    }}
                                    placeholder="Commercial Edit, Fashion Film, Motion Design, or Senior Role"
                                    className="w-full px-4 py-3.5 rounded-xl border text-sm focus:outline-none"
                                    style={{
                                        backgroundColor: theme.bg,
                                        borderColor: formErrors.subject ? '#DC2626' : theme.border,
                                        color: theme.text
                                    }}
                                />
                                {formErrors.subject && (
                                    <p className="text-xs text-red-500 mt-1">{formErrors.subject}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider mb-2" style={{ color: theme.textMuted }}>
                                    Project Details *
                                </label>
                                <textarea
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => {
                                        setFormData({ ...formData, message: e.target.value });
                                        if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                                    }}
                                    placeholder="Share timeline, deliverables, or role details..."
                                    className="w-full px-4 py-3.5 rounded-xl border text-sm focus:outline-none resize-none"
                                    style={{
                                        backgroundColor: theme.bg,
                                        borderColor: formErrors.message ? '#DC2626' : theme.border,
                                        color: theme.text
                                    }}
                                />
                                {formErrors.message && (
                                    <p className="text-xs text-red-500 mt-1">{formErrors.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={formStatus === 'submitting'}
                                className="w-full py-4 rounded-full text-sm font-medium transition-transform active:scale-98 flex items-center justify-center gap-2"
                                style={{
                                    backgroundColor: theme.accent,
                                    color: theme.accentText
                                }}
                            >
                                <span>
                                    {formStatus === 'submitting' ? 'Preparing Message...' : 'Send Message'}
                                </span>
                                <ArrowUpRight className="w-4 h-4" />
                            </button>

                            {formStatus === 'success' && (
                                <div
                                    className="p-4 rounded-xl border text-xs flex items-center justify-between gap-4"
                                    style={{
                                        backgroundColor: theme.accentSoft,
                                        borderColor: theme.accent,
                                        color: theme.text
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: theme.accent }} />
                                        <span>Message validated and ready to send.</span>
                                    </div>
                                    <a
                                        href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
                                            formData.subject
                                        )}&body=${encodeURIComponent(formData.message)}`}
                                        className="font-semibold underline shrink-0"
                                        style={{ color: theme.accent }}
                                    >
                                        Launch Email App →
                                    </a>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
