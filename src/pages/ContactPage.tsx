import React, { useState } from 'react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim() || !form.email.includes('@')) next.email = 'Please enter a valid email.';
    setErrors(next);
    if (Object.keys(next).length === 0) {
      submitLead({ source: 'contact', name: form.name, email: form.email, company: form.company, message: form.message });
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <Seo
        title="Contact"
        description="Tell us the process you want to automate and we'll get back to you within one business day."
        path="/contact"
      />

      <div className="space-y-3 mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-aurmak-navy tracking-tight font-sans">
          Contact us
        </h1>
        <p className="text-lg text-aurmak-text leading-relaxed">
          Tell us the process you want to automate and we&rsquo;ll get back to you within one business day.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-sm border border-aurmak-border shadow-execoore p-8 space-y-3">
          <h2 className="text-xl font-bold text-aurmak-navy font-sans">
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
        <form onSubmit={handleSubmit} className="bg-white rounded-sm border border-aurmak-border shadow-execoore p-6 md:p-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Name"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={errors.name}
              required
            />
            <FormInput
              label="Work email"
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
            placeholder="Your company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />

          <FormTextarea
            label="Message"
            placeholder="Tell us about the process you'd like to automate, and the software it runs on."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={4}
          />

          <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto">
            Send message
          </Button>
        </form>
      )}
    </div>
  );
};
