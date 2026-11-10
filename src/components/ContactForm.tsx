"use client";

import React from 'react';
import { ArrowUpRight, CheckCircle2, AlertCircle, MessageCircle, Mail, Info } from 'lucide-react';
import { StudioTheme, ContactFormData } from '@/types';

interface ContactFormProps {
    theme: StudioTheme;
    formData: ContactFormData;
    setFormData: (data: ContactFormData) => void;
    formErrors: Record<string, string>;
    setFormErrors: (errors: Record<string, string>) => void;
    formStatus: 'idle' | 'submitting' | 'success' | 'activation' | 'error';
    formErrorMessage?: string;
    recipientEmail?: string;
    handleFormSubmit: (e: React.FormEvent) => Promise<void>;
    handleWhatsAppSubmit?: () => void;
    fallbackMailtoUrl?: string;
    hasDirectEndpoint?: boolean;
}

export function ContactForm({
    theme,
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    formStatus,
    formErrorMessage = '',
    recipientEmail = '',
    handleFormSubmit,
    handleWhatsAppSubmit,
    fallbackMailtoUrl,
    hasDirectEndpoint = false
}: ContactFormProps) {
    return (
        <form
            onSubmit={handleFormSubmit}
            noValidate
            className="p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border space-y-4 sm:space-y-6"
            style={{
                backgroundColor: theme.surface,
                borderColor: theme.border
            }}
        >
            <h3 className="font-display text-xl sm:text-2xl font-semibold">
                Send a Project Inquiry
            </h3>

            <div>
                <label
                    className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider mb-1.5 sm:mb-2"
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
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3.5 rounded-xl border text-sm focus:outline-none transition-colors"
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
                    className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider mb-1.5 sm:mb-2"
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
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3.5 rounded-xl border text-sm focus:outline-none transition-colors"
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
                    className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider mb-1.5 sm:mb-2"
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
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3.5 rounded-xl border text-sm focus:outline-none transition-colors"
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
                    className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider mb-1.5 sm:mb-2"
                    style={{ color: theme.textMuted }}
                >
                    Project Details *
                </label>
                <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                    }}
                    placeholder="Share timeline, deliverables, or role details..."
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3.5 rounded-xl border text-sm focus:outline-none resize-none transition-colors"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full py-3.5 sm:py-4 px-5 rounded-full text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-60"
                    style={{
                        backgroundColor: theme.accent,
                        color: theme.accentText
                    }}
                >
                    <Mail className="w-4 h-4" />
                    <span>
                        {formStatus === 'submitting' ? 'Sending to Inbox...' : 'Send Message'}
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                </button>

                {handleWhatsAppSubmit && (
                    <button
                        type="button"
                        onClick={handleWhatsAppSubmit}
                        className="w-full py-3.5 sm:py-4 px-5 rounded-full text-sm font-medium border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                        style={{
                            backgroundColor: theme.surfaceAlt,
                            borderColor: theme.borderStrong,
                            color: theme.text
                        }}
                    >
                        <MessageCircle className="w-4 h-4 text-emerald-500" />
                        <span>Send via WhatsApp</span>
                        <ArrowUpRight className="w-4 h-4" style={{ color: theme.accent }} />
                    </button>
                )}
            </div>

            {formStatus === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>
                        {hasDirectEndpoint
                            ? 'Message sent directly to Shahdat’s Gmail inbox! Thank you for reaching out.'
                            : 'Inquiry prepared! Your default email client has opened with your message details.'}
                    </span>
                </div>
            )}

            {formStatus === 'activation' && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-800 dark:text-amber-300 text-xs sm:text-sm space-y-2.5">
                    <div className="flex items-start gap-2.5">
                        <Info className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" />
                        <div className="space-y-1">
                            <p className="font-semibold">
                                One-Time Form Activation Sent!
                            </p>
                            <p>
                                FormSubmit has sent an activation email to{' '}
                                <span className="font-mono font-semibold">{recipientEmail}</span>.
                                Please open Gmail (check Spam/Promotions too) and click{' '}
                                <strong>&ldquo;Activate Form&rdquo;</strong> once so future messages deliver automatically.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pl-7">
                        {fallbackMailtoUrl && (
                            <a
                                href={fallbackMailtoUrl}
                                className="px-3.5 py-1.5 rounded-full text-xs font-mono border bg-black/5 hover:bg-black/10 inline-flex items-center gap-1.5"
                            >
                                Open Email App ↗
                            </a>
                        )}
                        {handleWhatsAppSubmit && (
                            <button
                                type="button"
                                onClick={handleWhatsAppSubmit}
                                className="px-3.5 py-1.5 rounded-full text-xs font-mono border bg-emerald-500/15 hover:bg-emerald-500/25 inline-flex items-center gap-1.5 cursor-pointer"
                            >
                                Send via WhatsApp ↗
                            </button>
                        )}
                    </div>
                </div>
            )}

            {formStatus === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-700 dark:text-red-400 text-xs sm:text-sm space-y-2.5">
                    <div className="flex items-start gap-2.5">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                            <p>
                                Could not reach automated mail relay right now. You can send directly using your
                                email app or WhatsApp below:
                            </p>
                            {formErrorMessage && (
                                <p className="font-mono text-[11px] opacity-80">
                                    Details: {formErrorMessage}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pl-7">
                        {fallbackMailtoUrl && (
                            <a
                                href={fallbackMailtoUrl}
                                className="px-3.5 py-1.5 rounded-full text-xs font-mono border bg-black/5 hover:bg-black/10 inline-flex items-center gap-1.5"
                            >
                                Open Email App ↗
                            </a>
                        )}
                        {handleWhatsAppSubmit && (
                            <button
                                type="button"
                                onClick={handleWhatsAppSubmit}
                                className="px-3.5 py-1.5 rounded-full text-xs font-mono border bg-emerald-500/15 hover:bg-emerald-500/25 inline-flex items-center gap-1.5 cursor-pointer"
                            >
                                Send via WhatsApp ↗
                            </button>
                        )}
                    </div>
                </div>
            )}
        </form>
    );
}
