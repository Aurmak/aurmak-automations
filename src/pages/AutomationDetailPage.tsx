import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { AUTOMATIONS_DATA } from '../data/automations';
import { AutomationCard } from '../components/catalogue/AutomationCard';
import { Button } from '../components/ui/Button';
import { Seo } from '../components/Seo';
import { getAutomationIcon } from '../lib/automationIcons';

/** A label / dotted-leader / value row, the signature of the Execoore detail sidebar. */
const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-baseline gap-2">
    <span className="font-body text-base font-semibold text-aurmak-navy shrink-0">{label}</span>
    <span aria-hidden="true" className="flex-1 self-end mb-1.5 border-b border-dotted border-aurmak-borderHover" />
    <span className="font-body text-base text-aurmak-text shrink-0 text-right">{value}</span>
  </div>
);

export const AutomationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const index = AUTOMATIONS_DATA.findIndex((a) => a.slug === id || a.id === id);
  const automation = index >= 0 ? AUTOMATIONS_DATA[index] : undefined;

  if (!automation) {
    return <Navigate to="/#solutions" replace />;
  }

  const total = AUTOMATIONS_DATA.length;
  const prev = AUTOMATIONS_DATA[(index - 1 + total) % total];
  const next = AUTOMATIONS_DATA[(index + 1) % total];
  const related = AUTOMATIONS_DATA.filter((_, i) => i !== index).slice(0, 3);
  const Icon = getAutomationIcon(automation.id);

  return (
    <div className="pb-16">
      <Seo title={automation.name} description={automation.tagline} path={`/solutions/${automation.slug}`} />
      {/* Hero banner */}
      <section className="relative bg-aurmak-navy text-white overflow-hidden border-b-4 border-aurmak-action">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '44px 44px'
          }}
        />
        {/* The automation's own icon, matching its card, as a hero watermark */}
        <Icon
          aria-hidden="true"
          className="hidden md:block absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 w-56 h-56 lg:w-72 lg:h-72 text-aurmak-action/15 pointer-events-none"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10 space-y-5">
          <div className="flex items-center gap-3 text-base">
            <Link to="/#solutions" className="text-aurmak-action hover:text-white transition-colors font-semibold">
              &larr; All solutions
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-stone-200">{automation.category}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.05] font-sans max-w-3xl">
            {automation.name}
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed font-body">
            {automation.tagline}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link to={`/contact?automation=${automation.slug}`}>
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Request a Demonstration
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outlineInverse" size="lg" className="w-full sm:w-auto">
                Request Custom Rules
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Two-column body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Main column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Lead */}
            <p className="text-lg text-aurmak-text leading-relaxed font-body">
              {automation.problemDescription}
            </p>

            {/* Three hairline-divided sub-columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-aurmak-border divide-y sm:divide-y-0 sm:divide-x divide-aurmak-border">
              <div className="py-6 sm:py-0 sm:pt-8 sm:pr-8 space-y-3">
                <h2 className="text-lg font-bold text-aurmak-navy font-sans">What it does</h2>
                <ul className="space-y-2 text-base text-aurmak-text font-body">
                  {automation.actions.map((action, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-aurmak-actionText font-bold mt-px">✓</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="py-6 sm:py-0 sm:pt-8 sm:px-8 space-y-3">
                <h2 className="text-lg font-bold text-aurmak-navy font-sans">When a human steps in</h2>
                <ul className="space-y-2 text-base text-aurmak-text font-body">
                  {automation.exceptions.map((exception, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-aurmak-exception font-bold mt-px">&rarr;</span>
                      <span>{exception}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="py-6 sm:py-0 sm:pt-8 sm:pl-8 space-y-3">
                <h2 className="text-lg font-bold text-aurmak-navy font-sans">The result</h2>
                <p className="text-base text-aurmak-text leading-relaxed font-body">
                  {automation.operationalResult}
                </p>
              </div>
            </div>

            {/* How it runs - workflow sequence */}
            <section className="border-t border-aurmak-border pt-8 space-y-6">
              <h2 className="text-2xl font-extrabold text-aurmak-navy tracking-tight font-sans">
                How it runs
              </h2>

              <ol className="relative border-l border-aurmak-border ml-3 space-y-6">
                {automation.workflowStages.map((stage, i) => (
                  <li key={i} className="pl-6 relative">
                    <span className="absolute -left-3 top-0 w-6 h-6 rounded-sm bg-aurmak-navy text-white text-sm font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <h3 className="text-base font-bold text-aurmak-navy font-sans">{stage.title}</h3>
                    <p className="text-base text-aurmak-text leading-relaxed font-body mt-1">{stage.detail}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {/* Details sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="bg-white border border-aurmak-border rounded-sm shadow-execoore p-6 space-y-5">
                <h2 className="text-2xl font-extrabold text-aurmak-navy tracking-tight font-sans">
                  At a glance
                </h2>

                <div className="space-y-3 border-t border-aurmak-border pt-4">
                  <DetailRow label="Category" value={automation.category} />
                  <DetailRow label="Execution" value="Autonomous & exception" />
                  <DetailRow label="Primary system" value={automation.compatibility.platforms[0]} />
                </div>

                <div className="border-t border-aurmak-border pt-4 space-y-1.5">
                  <p className="text-base font-semibold text-aurmak-navy">Also runs on</p>
                  <p className="text-base text-aurmak-text leading-relaxed">
                    {automation.compatibility.platforms.slice(1).join(', ')}
                  </p>
                </div>

                <div className="border-t border-aurmak-border pt-4 space-y-1.5">
                  <p className="text-base font-semibold text-aurmak-navy">Access &amp; AI</p>
                  <p className="text-base text-aurmak-text leading-relaxed">
                    Scoped read/write through your own API, fully logged. The AI reads and extracts, running in our cloud or on your servers when data can&rsquo;t leave.
                  </p>
                </div>

                <div className="border-t border-aurmak-border pt-4">
                  <Link to={`/contact?automation=${automation.slug}`}>
                    <Button variant="primary" size="md" className="w-full">
                      Request a Demonstration
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related automations */}
        <section className="mt-16 border-t border-aurmak-border pt-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <h2 className="text-2xl font-extrabold text-aurmak-navy tracking-tight font-sans">
              Explore other automations
            </h2>
            <Link to="/#solutions" className="text-base font-sans font-semibold text-aurmak-navy hover:text-aurmak-actionText transition-colors whitespace-nowrap">
              See all solutions &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((a) => (
              <AutomationCard key={a.id} automation={a} />
            ))}
          </div>
        </section>

        {/* Prev / next + share */}
        <div className="mt-14 border-t border-aurmak-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Link
              to={`/solutions/${prev.slug}`}
              aria-label={`Previous automation: ${prev.name}`}
              className="group flex items-center gap-2 min-h-11 py-2 text-sm font-mono font-bold uppercase tracking-wider text-aurmak-navy hover:text-aurmak-actionText transition-colors"
            >
              <span aria-hidden="true">&larr;</span>
              <span className="hidden sm:inline">Previous</span>
            </Link>
            <Link
              to="/#solutions"
              aria-label="All solutions"
              className="w-11 h-11 mx-1 rounded-sm bg-aurmak-navy text-white flex items-center justify-center hover:bg-aurmak-action transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <rect x="1" y="1" width="6" height="6" rx="1" />
                <rect x="9" y="1" width="6" height="6" rx="1" />
                <rect x="1" y="9" width="6" height="6" rx="1" />
                <rect x="9" y="9" width="6" height="6" rx="1" />
              </svg>
            </Link>
            <Link
              to={`/solutions/${next.slug}`}
              aria-label={`Next automation: ${next.name}`}
              className="group flex items-center gap-2 min-h-11 py-2 text-sm font-mono font-bold uppercase tracking-wider text-aurmak-navy hover:text-aurmak-actionText transition-colors"
            >
              <span className="hidden sm:inline">Next</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <Link to="/contact" className="text-base font-sans font-semibold text-aurmak-navy hover:text-aurmak-actionText transition-colors">
            Book a demonstration &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
