import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Globe, MapPin } from 'lucide-react';
import { IntegrationsGrid } from '../components/integrations/IntegrationsGrid';
import { FindAutomation } from '../components/home/FindAutomation';
import { SolutionsCatalogue } from '../components/home/SolutionsCatalogue';
import { TiltCard } from '../components/ui/tilt-card';
import { Button } from '../components/ui/Button';
import { ScopeWizard } from '../components/wizard/ScopeWizard';
import { asset } from '../lib/asset';
import { Seo } from '../components/Seo';

export const HomePage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Force muted + play so the background video autoplays inline across browsers
  // (React does not always set the muted property from the attribute alone).
  // Respect reduced-motion: leave the video paused on its first frame.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      v.removeAttribute('autoplay');
      v.pause();
    } else {
      v.play().catch(() => {});
    }
  }, []);

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      <Seo
        title="Business Process Automation Layer"
        description="An external automation layer for your existing business applications. Our AI reads your documents and feeds, checks each record against live ERP data, posts what clears your rules, and routes exceptions to your team."
        path="/"
      />
      {/* 1. Hero - the thesis: automation that sits beside your system of record */}
      <section className="relative flex items-center min-h-[calc(100svh-5.5rem)] bg-aurmak-navyDark text-white py-16 border-b-4 border-aurmak-action overflow-hidden">
        {/* Background video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={asset('new.mp4')} type="video/mp4" />
        </video>
        {/* Contrast overlay: an even 80% black wash across the whole video */}
        <div aria-hidden="true" className="absolute inset-0 bg-black/80" />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl space-y-6">
            <h1 className="reveal reveal-2 text-4xl sm:text-5xl lg:text-[3.7rem] font-bold text-white leading-[1.08] font-sans">
              Cut the <span className="text-aurmak-action">manual work</span><br className="hidden sm:block" /> out of your back office.
            </h1>

            <p className="reveal reveal-3 text-base sm:text-lg text-stone-300 max-w-4xl leading-relaxed font-body">
              AURMAK automates the repetitive checking, matching, and data entry that eats your team&rsquo;s day. Our AI reads your documents, checks each one against your live records, handles everything that follows your rules, and sends only the odd ones to a person.
            </p>
            <p className="reveal reveal-3 text-base text-stone-300 max-w-4xl leading-relaxed font-body">
              It works inside the tools you already run, like Odoo, Zoho, and Xero. Your logins stay with you, your data can stay on your own servers, and someone on your team signs off anything that matters.
            </p>

            <div className="reveal reveal-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <ScopeWizard label="Get my free plan" variant="primary" size="lg" className="w-full sm:w-auto" />
              <Link to="/#solutions">
                <Button variant="outlineInverse" size="lg" className="w-full sm:w-auto">
                  Explore Solutions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Manual vs automated - three self-contained panels, one per scene, so each stacks cleanly on mobile */}
      <section id="comparison" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {[
            {
              img: 'chaos.png',
              accent: 'bg-red-500',
              title: 'Operational chaos',
              detail: 'Files pile up and get keyed in by hand, one typo away from a costly mistake.',
              alt: 'Manual ERP entry: a clock at 20 minutes, buried in CSV files, flagged with a typo and data error.'
            },
            {
              img: 'aurmak.png',
              accent: 'bg-emerald-500',
              title: 'The AURMAK automated layer',
              detail: 'Data flows straight from the source into your ERP, checked and fully synced.',
              alt: 'The AURMAK layer: a bank feed syncing straight into the ERP in 3 seconds, 100 percent synced.'
            },
            {
              img: 'results.png',
              accent: 'bg-aurmak-action',
              title: 'The outcome',
              detail: 'Minutes of manual work become seconds, done for you and verified.',
              alt: '20 minutes versus 3 seconds, and manual keying versus autonomous write-back.'
            }
          ].map((c) => (
            <div key={c.title} className="space-y-7 text-center">
              <TiltCard>
                <img
                  src={asset(c.img)}
                  alt={c.alt}
                  width={439}
                  height={607}
                  loading="lazy"
                  className="w-full h-auto rounded-xl border border-aurmak-border shadow-execoore"
                />
              </TiltCard>
              <div className="space-y-3">
                <div className={`h-1.5 w-12 rounded-full mx-auto ${c.accent}`} />
                <h3 className="text-xl sm:text-2xl font-bold text-aurmak-navy font-sans leading-snug">{c.title}</h3>
                <p className="text-base sm:text-lg text-aurmak-text leading-relaxed font-body">{c.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Find your automation - tabbed entry points */}
      <FindAutomation />

      {/* 2. Solutions - the automations we've already built */}
      <section id="solutions" className="scroll-mt-24 bg-white border-y border-aurmak-border py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-aurmak-navy tracking-tight font-sans">
              Automations we build
            </h2>
            <p className="text-lg text-aurmak-text leading-relaxed font-body max-w-3xl">
              A look at the kind of work we automate. Each one is built for your own systems and shaped to your process and your rules.
            </p>
          </div>

          <SolutionsCatalogue />
        </div>
      </section>

      {/* How working with us goes - answers the "do I need engineers?" worry */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-aurmak-navy tracking-tight font-sans">
              You don&rsquo;t need an engineering team
            </h2>
            <p className="text-lg text-aurmak-text leading-relaxed font-body">
              We handle the technical side. You bring the process and the sign-off; we build, test, and run the automation inside your own systems. Most are live in a matter of weeks, not months.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Tell us the process',
                detail: 'A short call and a look at a few of your real documents. No preparation and no technical detail needed from you.'
              },
              {
                step: '2',
                title: 'We build and test it',
                detail: 'We connect to the tools you already use and run the automation alongside your team, so every result is checked before it counts.'
              },
              {
                step: '3',
                title: 'It goes live, you stay in control',
                detail: 'It handles the routine work on its own and sends anything odd to a person. You can pause it or change the rules at any time.'
              }
            ].map((s) => (
              <li key={s.step} className="rounded-xl bg-white border border-aurmak-border shadow-execoore p-6 space-y-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-aurmak-human text-white text-base font-bold font-sans">
                  {s.step}
                </span>
                <h3 className="text-lg font-bold text-aurmak-navy font-sans leading-snug">{s.title}</h3>
                <p className="text-base text-aurmak-textMuted leading-relaxed font-body">{s.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Integrations - what we connect to, with access + local-AI woven in */}
      <section id="integrations" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-aurmak-navy tracking-tight font-sans">
              Automate across all your apps
            </h2>
            <p className="text-lg text-aurmak-text leading-relaxed font-body">
              Automations use only the access they need, your logins stay with you, and everything they do is written down. If your data can&rsquo;t leave the building, the AI runs on your own servers.
            </p>
          </div>

          <IntegrationsGrid />

          <p className="text-lg text-aurmak-text font-body text-center">
            Don&rsquo;t see yours? If it has an API or exports a file, we can connect to it.{' '}
            <ScopeWizard label="Tell us your stack &rarr;" variant="link" />
          </p>
        </div>
      </section>

      {/* Who we are - identity, not proof. Offices in three countries, clients worldwide. */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-sm bg-aurmak-navyDark text-white border-t-4 border-aurmak-action p-8 md:p-12">
          {/* Soft amber glow for a bit of depth */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-aurmak-action/10 blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Identity */}
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans text-white">
                Built by AURMAK
              </h2>
              <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-body max-w-2xl">
                Automations is the automation arm of AURMAK. We build and run software for clients around the world, backed by a real team and a named person accountable for every project, not a faceless platform.
              </p>
              <a
                href="https://aurmak.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-aurmak-action px-5 py-2.5 text-base font-semibold font-sans text-aurmak-action transition-colors hover:bg-aurmak-action hover:text-aurmak-navy"
              >
                More about AURMAK &rarr;
              </a>
            </div>

            {/* Global reach + offices */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                  <Globe className="h-5 w-5 text-aurmak-action" aria-hidden="true" />
                  <span className="text-base font-bold text-white font-sans">Clients worldwide</span>
                </div>
                <ul className="divide-y divide-white/10">
                  {[
                    { city: 'London', country: 'United Kingdom' },
                    { city: 'Dubai', country: 'United Arab Emirates' },
                    { city: 'Lahore', country: 'Pakistan' }
                  ].map((office) => (
                    <li key={office.city} className="flex items-center justify-between py-3">
                      <span className="inline-flex items-center gap-2.5">
                        <MapPin className="h-4 w-4 text-aurmak-action/80" aria-hidden="true" />
                        <span className="text-base font-bold text-white font-sans">{office.city}</span>
                      </span>
                      <span className="text-sm text-stone-400 font-body">{office.country}</span>
                    </li>
                  ))}
                </ul>
                <p className="pt-3 text-xs text-stone-400 font-body">Three offices, one accountable team.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA - the final ask */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-sm border border-aurmak-border bg-white shadow-execoore p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-aurmak-navy tracking-tight font-sans">
              Ready to get your hours back?
            </h2>
            <p className="text-base text-aurmak-text leading-relaxed font-body max-w-3xl">
              Answer a few questions and we&rsquo;ll map out a plan for your own systems, with the same checks and human sign-off as everything we build. No cost, and no obligation.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <ScopeWizard label="Get my free plan" variant="primary" size="lg" className="w-full lg:w-auto" />
          </div>
        </div>
      </section>

    </div>
  );
};
