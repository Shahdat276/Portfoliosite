"use client";

import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { StudioTheme, ContactFormData } from '@/types';

interface ContactFormProps {
    theme: StudioTheme;
    formData: ContactFormData;
    setFormData: (data: ContactFormData) => void;
    formErrors: Record<string, string>;
    setFormErrors: (errors: Record<string, string>) => void;
    formStatus: 'idle' | 'submitting' | 'success' | 'error';
    handleFormSubmit: (e: React.FormEvent) => Promise<void>;
}

export function ContactForm({
    theme,
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    formStatus,
    handleFormSubmit
}: ContactFormProps) {
    return (
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
                <label
                    className="block text-xs font-mono uppercase tracking-wider mb-2"
                    style={{ color: theme.textMuted }}
                >
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
                    className="w-full px-4 py-3.5 rounded-xl border text-sm focus:outline-none transition-colors"
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
                <label
                    className="block text-xs font-mono uppercase tracking-wider mb-2"
                    style={{ color: theme.textMuted }}
                >
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
                    className="w-full px-4 py-3.5 rounded-xl border text-sm focus:outline-none transition-colors"
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
                <label
                    className="block text-xs font-mono uppercase tracking-wider mb-2"
                    style={{ color: theme.textMuted }}
                >
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
                    className="w-full px-4 py-3.5 rounded-xl border text-sm focus:outline-none transition-colors"
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
                <label
                    className="block text-xs font-mono uppercase tracking-wider mb-2"
                    style={{ color: theme.textMuted }}
                >
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
                    className="w-full px-4 py-3.5 rounded-xl border text-sm focus:outline-none resize-none transition-colors"
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
                className="w-full py-4 rounded-full text-sm font-medium transition-transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
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
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Inquiry prepared! Your default mail client has opened with your message details.</span>
                </div>
            )}
        </form>
    );
}

