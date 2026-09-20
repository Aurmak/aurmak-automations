import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AUTOMATIONS_DATA } from '../data/automations';
import { AutomationCard } from '../components/catalogue/AutomationCard';
import { IntegrationsGrid } from '../components/integrations/IntegrationsGrid';
import { FindAutomation } from '../components/home/FindAutomation';
import { Button } from '../components/ui/Button';
import { ScopeWizard } from '../components/wizard/ScopeWizard';
import { asset } from '../lib/asset';
import { Seo } from '../components/Seo';

export const HomePage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Force muted + play so the background video autoplays inline across browsers
  // (React does not always set the muted property from the attribute alone).
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
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
              Automation that runs <span className="text-aurmak-action">beside</span><br className="hidden sm:block" /> your ERP, not inside it.
            </h1>

            <p className="reveal reveal-3 text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed font-body">
              Our AI reads your documents and files, checks every transaction against your live records, handles the ones that follow your rules, and sends anything odd to your team.
            </p>
            <p className="reveal reveal-3 text-base text-stone-300 max-w-2xl leading-relaxed font-body">
              It works inside your own systems, in our cloud or on your own servers when your data can&rsquo;t leave.
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

      {/* Find your automation - tabbed entry points */}
      <FindAutomation />

      {/* 2. Solutions - the automations we've already built */}
      <section id="solutions" className="scroll-mt-24 bg-white border-y border-aurmak-border py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-aurmak-navy tracking-tight font-sans">
              Automations we&rsquo;ve built
            </h2>
            <p className="text-lg text-aurmak-text leading-relaxed font-body max-w-2xl">
              Automations already up and running, fitted to your process and to your own systems and rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AUTOMATIONS_DATA.map((automation) => (
              <AutomationCard key={automation.id} automation={automation} />
            ))}
          </div>
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

      {/* 3. Custom automation - if it isn't a preset, we build it */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-sm border border-aurmak-border bg-white shadow-execoore p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-aurmak-navy tracking-tight font-sans">
              Whatever your process, we can automate it
            </h2>
            <p className="text-base text-aurmak-text leading-relaxed font-body max-w-2xl">
              If your work runs on documents, files, or an app, we&rsquo;ll build an automation for your own systems, with the same checks and human sign-off as our ready-made ones.
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
