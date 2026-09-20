import React from 'react';
import { Badge } from '../components/ui/Badge';
import { Seo } from '../components/Seo';

export const CookiesPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      <Seo
        title="Cookies Policy"
        description="How AURMAK uses cookies on this website: strictly necessary cookies for the site to function and optional analytics you can decline."
        path="/cookies"
      />
      <div className="border-b border-aurmak-border pb-6 space-y-3">
        <Badge variant="navy">Legal & Compliance</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-aurmak-navy tracking-tight">
          Cookies Policy
        </h1>
        <p className="text-sm text-aurmak-textMuted font-mono">
          Last revised: September 2026 | Scope: automations.aurmak.com
        </p>
      </div>

      <div className="bg-white rounded-sm border border-aurmak-border shadow-execoore p-8 md:p-10 space-y-8 text-sm text-aurmak-text leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-aurmak-navy tracking-tight">1. What Cookies Are</h2>
          <p>
            Cookies are small text files a website stores in your browser. They let a site remember your preferences between pages and visits, and help us understand which pages are useful. This page explains which cookies this website sets and how you control them.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-aurmak-navy tracking-tight">2. Strictly Necessary Cookies</h2>
          <p>
            These are required for the website to work: they remember your session, keep the site secure, and store your cookie preferences. They do not track you across other sites and cannot be switched off through this site, as the pages will not function correctly without them.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-aurmak-navy tracking-tight">3. Analytics Cookies</h2>
          <p>
            With your consent, we use privacy-respecting analytics to count page views and referrers so we can improve the site. These are optional. We do not sell behavioural data or share visitor records with advertising brokers, and analytics stay off until you accept them.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-aurmak-navy tracking-tight">4. Managing Your Cookies</h2>
          <p>
            You can accept or decline optional cookies at any time, and every modern browser lets you view, block, or delete cookies through its settings. Blocking strictly necessary cookies may stop parts of this website from working.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-aurmak-navy tracking-tight">5. Contact</h2>
          <p>
            Questions about how we use cookies can be sent to privacy@aurmak.com. This policy is read together with our Privacy and Data Handling Policy.
          </p>
        </section>
      </div>
    </div>
  );
};
