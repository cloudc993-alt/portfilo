import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Github,
  Instagram,
  Linkedin,
  Send,
} from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { useLanguage } from '../../hooks/useLanguage';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Magnetic } from '../../utils/MagneticButton';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'needs-config' | 'success' | 'error';

function SocialIcon({ id }: { id: 'github' | 'telegram' | 'instagram' | 'linkedin' }) {
  switch (id) {
    case 'github':
      return <Github className="h-5 w-5" />;
    case 'telegram':
      return <Send className="h-5 w-5" />;
    case 'instagram':
      return <Instagram className="h-5 w-5" />;
    case 'linkedin':
      return <Linkedin className="h-5 w-5" />;
  }
}

export function ContactSection() {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [copied, setCopied] = useState(false);

  const configuredSocials = siteConfig.socialLinks.filter((s) => Boolean(s.url));

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) {
      nextErrors.name = t.contact.errors.nameRequired;
    }
    if (!form.email.trim()) {
      nextErrors.email = t.contact.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = t.contact.errors.emailInvalid;
    }
    if (!form.subject.trim()) {
      nextErrors.subject = t.contact.errors.subjectRequired;
    }
    if (form.message.trim().length < 10) {
      nextErrors.message = t.contact.errors.messageRequired;
    }
    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('submitting');

    // Only attempt network submission if a real endpoint is configured
    if (!siteConfig.contactEndpoint) {
      window.setTimeout(() => {
        setStatus('needs-config');
      }, 350);
      return;
    }

    try {
      const response = await fetch(siteConfig.contactEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        setStatus('error');
        return;
      }

      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const handleCopyDraft = async () => {
    const draft = `Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\n${form.message}`;
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard failures
    }
  };

  return (
    <section id="contact" className="relative bg-[#101010] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Heading & Social Media */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between lg:col-span-5"
          >
            <div>
              <p className="font-mono text-xs font-medium tracking-[0.2em] text-[#FF5A1F]">
                {t.contact.kicker}
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white [text-wrap:balance] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                {t.contact.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#A3A3A3]">
                {t.contact.subtitle}
              </p>
            </div>

            {/* Social Media Area */}
            <div className="mt-10 rounded-2xl border border-white/10 bg-[#151515] p-6">
              <h3 className="font-display text-sm font-bold tracking-wider text-white uppercase">
                {t.contact.socialsTitle}
              </h3>

              {configuredSocials.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-3">
                  {configuredSocials.map((social) => (
                    <a
                      key={social.id}
                      href={social.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex min-h-[44px] items-center gap-2.5 rounded-xl border border-white/10 bg-[#0D0D0D] px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-[#FF2B1C] hover:text-[#FF7A24]"
                    >
                      <SocialIcon id={social.id} />
                      <span>{social.label}</span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="mt-3 space-y-3">
                  <p className="text-xs leading-relaxed text-[#A3A3A3]">
                    {t.contact.socialsUnconfigured}
                  </p>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px] text-[#737373]">
                    {siteConfig.socialLinks.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 rounded-lg border border-white/5 bg-[#0D0D0D] px-3 py-2"
                      >
                        <SocialIcon id={item.id} />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column: Validated Contact Form */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="metallic-card rounded-2xl p-6 sm:p-8 lg:col-span-7"
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold tracking-wide text-white">
                    {t.contact.fields.name} <span className="text-[#FF2B1C]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder={t.contact.fields.namePlaceholder}
                    className={`mt-2 w-full rounded-xl border bg-[#0B0B0B] px-4 py-3 text-sm text-white placeholder-[#525252] transition-colors focus:outline-none ${
                      errors.name ? 'border-[#FF2B1C]' : 'border-white/10 focus:border-[#FF5A1F]'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-[#FF5A1F]" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold tracking-wide text-white">
                    {t.contact.fields.email} <span className="text-[#FF2B1C]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder={t.contact.fields.emailPlaceholder}
                    className={`mt-2 w-full rounded-xl border bg-[#0B0B0B] px-4 py-3 text-sm text-white placeholder-[#525252] transition-colors focus:outline-none ${
                      errors.email ? 'border-[#FF2B1C]' : 'border-white/10 focus:border-[#FF5A1F]'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-[#FF5A1F]" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-semibold tracking-wide text-white">
                  {t.contact.fields.subject} <span className="text-[#FF2B1C]">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => {
                    setForm({ ...form, subject: e.target.value });
                    if (errors.subject) setErrors({ ...errors, subject: undefined });
                  }}
                  placeholder={t.contact.fields.subjectPlaceholder}
                  className={`mt-2 w-full rounded-xl border bg-[#0B0B0B] px-4 py-3 text-sm text-white placeholder-[#525252] transition-colors focus:outline-none ${
                    errors.subject ? 'border-[#FF2B1C]' : 'border-white/10 focus:border-[#FF5A1F]'
                  }`}
                />
                {errors.subject && (
                  <p className="mt-1.5 text-xs text-[#FF5A1F]" role="alert">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold tracking-wide text-white">
                  {t.contact.fields.message} <span className="text-[#FF2B1C]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  placeholder={t.contact.fields.messagePlaceholder}
                  className={`mt-2 w-full resize-y rounded-xl border bg-[#0B0B0B] px-4 py-3 text-sm text-white placeholder-[#525252] transition-colors focus:outline-none ${
                    errors.message ? 'border-[#FF2B1C]' : 'border-white/10 focus:border-[#FF5A1F]'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-[#FF5A1F]" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Feedback Banners */}
              {status === 'needs-config' && (
                <div
                  role="status"
                  className="rounded-xl border border-[#FF7A24]/45 bg-[#FF5A1F]/10 p-4 text-xs leading-relaxed text-white"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#FF7A24]" />
                    <div className="space-y-2">
                      <p className="font-semibold text-[#FF7A24]">
                        {t.contact.configRequiredTitle}
                      </p>
                      <p className="text-[#D4D4D4]">{t.contact.configRequiredBody}</p>
                      <button
                        type="button"
                        onClick={handleCopyDraft}
                        className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-white/15 bg-[#151515] px-3 py-1.5 text-xs font-medium text-white hover:border-[#FF7A24]"
                      >
                        {copied ? <Check className="h-3.5 w-3.5 text-[#FF7A24]" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copied ? t.contact.copiedDraft : t.contact.copyDraft}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {status === 'success' && (
                <div
                  role="status"
                  className="flex items-start gap-3 rounded-xl border border-white/20 bg-white/5 p-4 text-xs text-white"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FF7A24]" />
                  <div>
                    <p className="font-semibold">{t.contact.sentTitle}</p>
                    <p className="mt-0.5 text-[#A3A3A3]">{t.contact.sentBody}</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-[#FF2B1C]/50 bg-[#FF2B1C]/10 p-4 text-xs text-white"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#FF2B1C]" />
                  <div>
                    <p className="font-semibold text-[#FF2B1C]">{t.contact.sendErrorTitle}</p>
                    <p className="mt-0.5 text-[#D4D4D4]">{t.contact.sendErrorBody}</p>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <Magnetic>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#FF2B1C] to-[#FF5A1F] px-7 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_12px_32px_-8px_rgba(255,43,28,0.6)] transition-all hover:brightness-110 disabled:opacity-60 whitespace-nowrap shrink-0"
                  >
                    <Send className="h-4 w-4" />
                    <span>{status === 'submitting' ? t.contact.sending : t.contact.submit}</span>
                  </button>
                </Magnetic>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
