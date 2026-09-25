import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, Check, Clock3 } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { AUTOMATIONS_DATA } from '../data/automations';
import { FormInput, FormTextarea } from '../components/ui/FormControls';
import { Button } from '../components/ui/Button';
import { Seo } from '../components/Seo';
import { submitLead } from '../lib/leads';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const requested = AUTOMATIONS_DATA.find((a) => a.slug === searchParams.get('automation'));

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: requested ? `I'd like a demo of ${requested.name}.` : ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim() || !form.email.includes('@')) next.email = 'Please enter a valid email.';
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSending(true);
      setSendError(false);
      const success = await submitLead({ source: 'contact', name: form.name, email: form.email, company: form.company, message: form.message });
      setSending(false);
      setSubmitted(success);
      setSendError(!success);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12 md:py-20">
      <Seo
        title="Contact"
        description="Tell us the process you want to automate and we'll get back to you within one business day."
        path="/contact"
      />

      <div className="grid lg:grid-cols-[0.85fr_1.4fr] gap-10 lg:gap-16 items-start">
        <div className="lg:pt-7">
          <p className="text-sm font-semibold tracking-[0.16em] uppercase text-aurmak-actionText mb-6">Contact AURMAK</p>
          <h1 className="text-5xl sm:text-6xl lg:text-[4.25rem] leading-[1.05] font-semibold text-aurmak-navy tracking-tight">
            Less busywork.<br />More <span className="text-aurmak-actionText">possibility.</span>
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-aurmak-textMuted max-w-md">
            What&rsquo;s taking up your team&rsquo;s time? Tell us about it. We&rsquo;ll help you work out where automation can make a difference.
          </p>
          <div className="mt-9 flex items-center gap-3 text-sm font-medium text-aurmak-navy">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-aurmak-subtle"><Clock3 size={19} aria-hidden="true" /></span>
            We reply within one business day.
          </div>
          <div className="mt-10 pt-7 border-t border-aurmak-border max-w-md">
            <h2 className="text-base font-semibold">Not sure where to start?</h2>
            <p className="mt-2 text-base leading-relaxed text-aurmak-textMuted">A spreadsheet, a recurring task, a process that takes too many steps. That&rsquo;s enough to start a conversation.</p>
            <Link to="/#solutions" className="mt-5 inline-flex items-center gap-2 font-semibold text-sm text-aurmak-actionText hover:underline">Explore our automations <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>

      {submitted ? (
        <div role="status" className="bg-white rounded-2xl border border-aurmak-border shadow-execoore p-8 sm:p-12 space-y-5">
          <Check aria-hidden="true" className="text-aurmak-actionText" size={36} />
          <h2 className="text-3xl font-bold text-aurmak-navy font-sans">
            Thanks, {form.name.split(' ')[0]}.
          </h2>
          <p className="text-base text-aurmak-text leading-relaxed">
            We&rsquo;ve got your message and will reply to {form.email} within one business day.
          </p>
          <div className="pt-2">
            <Link to="/#solutions" className="text-base font-semibold text-aurmak-navy hover:text-aurmak-actionText transition-colors">
              Browse our automations &rarr;
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} aria-busy={sending} className="contact-form bg-white rounded-2xl border border-aurmak-border shadow-execoore p-6 sm:p-10 lg:p-12 space-y-7">
          <div className="pb-1">
            <h2 className="text-3xl font-semibold tracking-tight">Let&rsquo;s talk.</h2>
            <p className="mt-2 text-base text-aurmak-textMuted">Tell us a little about you and what you have in mind.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormInput
              label="Name"
              autoComplete="name"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={errors.name}
              required
            />
            <FormInput
              label="Work email"
              autoComplete="email"
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
              required
            />
          </div>

          <FormInput
            label="Company"
            autoComplete="organization"
            placeholder="Your company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />

          <FormTextarea
            label="What would you like to automate?"
            placeholder="Tell us about the process you'd like to automate, and the software it runs on."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={6}
          />

          {sendError && <p role="alert" className="text-sm text-aurmak-danger">Your message couldn&rsquo;t be sent. Please try again.</p>}
          <div className="pt-1 space-y-4">
            <Button type="submit" variant="primary" size="lg" disabled={sending} className="w-full !min-h-14">
              {sending ? 'Sending…' : 'Send message'} <ArrowRight size={19} aria-hidden="true" />
            </Button>
            <p className="text-sm leading-relaxed text-aurmak-textMuted">We&rsquo;ll use your details to respond to your enquiry. <Link to="/privacy" className="underline underline-offset-4 hover:text-aurmak-navy">Privacy policy</Link></p>
          </div>
        </form>
      )}
      </div>
    </div>
  );
};
