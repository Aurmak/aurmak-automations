import React from 'react';
import { Link } from 'react-router-dom';
import { AUTOMATIONS_DATA } from '../../data/automations';
import { asset } from '../../lib/asset';

const SOCIAL_PATHS: Record<string, string> = {
  linkedin:
    'M4.983 3.5C4.983 4.88 3.869 6 2.492 6A2.49 2.49 0 0 1 0 3.5C0 2.12 1.115 1 2.492 1a2.49 2.49 0 0 1 2.491 2.5ZM.395 8h4.194v13.5H.395V8ZM8.36 8h4.02v1.845h.057c.56-1.062 1.93-2.182 3.972-2.182 4.246 0 5.03 2.8 5.03 6.44V21.5h-4.19v-6.555c0-1.564-.028-3.575-2.18-3.575-2.184 0-2.518 1.705-2.518 3.462V21.5H8.36V8Z',
  x: 'M18.244 2H21.5l-7.117 8.134L22.75 22h-6.555l-5.133-6.71L5.19 22H1.93l7.61-8.7L1.25 2h6.721l4.64 6.13L18.244 2Zm-1.141 18h1.804L6.998 3.895H5.062L17.103 20Z',
  youtube:
    'M23.499 6.203a2.98 2.98 0 0 0-2.098-2.11C19.548 3.6 12 3.6 12 3.6s-7.548 0-9.401.493A2.98 2.98 0 0 0 .5 6.203C0 8.068 0 12 0 12s0 3.932.5 5.797a2.98 2.98 0 0 0 2.099 2.11C4.452 20.4 12 20.4 12 20.4s7.548 0 9.401-.493a2.98 2.98 0 0 0 2.098-2.11C24 15.932 24 12 24 12s0-3.932-.501-5.797ZM9.6 15.6V8.4l6 3.6-6 3.6Z'
};

const SOCIALS: Array<{ label: string; href: string; icon: keyof typeof SOCIAL_PATHS }> = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/aurmak', icon: 'linkedin' },
  { label: 'X', href: 'https://x.com/aurmakdigital', icon: 'x' },
  { label: 'YouTube', href: 'https://www.youtube.com/@Aurmak', icon: 'youtube' }
];

const PROPOSITION =
  'An external automation layer around your existing applications. We connect your inputs, apply your rules, post approved actions to your software, and route the exceptions to your team.';

const FOOTER_NAV: Array<{ title: string; items: { label: string; to: string }[] }> = [
  {
    title: 'Solutions',
    items: AUTOMATIONS_DATA.map((a) => ({
      label: a.name.replace(/ Automation$| & Subscription Sync$/, ''),
      to: `/solutions/${a.slug}`
    }))
  },
  {
    title: 'Company',
    items: [
      { label: 'All Solutions', to: '/#solutions' },
      { label: 'Integrations', to: '/#integrations' },
      { label: 'Contact', to: '/contact' }
    ]
  }
];

const LEGAL_NAV = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Cookies Policy', to: '/cookies' },
  { label: 'Terms & Conditions', to: '/terms' }
];

/** The AURMAK mark, a hairline rule, then AUTOMATIONS - the dark-ground lockup. */
const FooterLockup: React.FC = () => (
  <Link to="/" className="group inline-flex items-center" aria-label="AURMAK Automations, home">
    <span className="inline-flex items-center gap-3.5 md:gap-4">
      <img src={asset('logo-footer.svg')} alt="AURMAK" width="154" height="34" className="h-9 w-auto shrink-0 md:h-11" />
      <span aria-hidden="true" className="h-[2em] w-px shrink-0 bg-white/25" />
      <span className="font-sans text-[1.05rem] md:text-[1.3rem] font-bold leading-none tracking-[0.2em] text-white">
        AUTOMATIONS
      </span>
    </span>
  </Link>
);

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-aurmak-navyDark text-white">
      <div className="mx-auto w-full max-w-[78rem] px-6 md:px-10">
        {/* Identity and navigation */}
        <div className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.6fr)] lg:gap-16">
          <div className="flex flex-col">
            <div>
              <FooterLockup />
              <p className="max-w-[54ch] mt-5 text-[0.9375rem] leading-relaxed text-white/80">
                {PROPOSITION}
              </p>
            </div>
            <ul className="flex items-center -ml-3 mt-6 lg:mt-auto lg:pt-8">
              {SOCIALS.map((account) => (
                <li key={account.href}>
                  <a
                    href={account.href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="flex size-11 items-center justify-center text-white/70 hover:text-white transition-colors"
                  >
                    <span className="sr-only">{account.label}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d={SOCIAL_PATHS[account.icon]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-7 sm:grid sm:grid-cols-2 sm:gap-10">
            {FOOTER_NAV.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <span className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.1em] leading-tight text-white/60">
                  {group.title}
                </span>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5 sm:flex-col sm:flex-nowrap">
                  {group.items.map((item) => (
                    <li key={item.to}>
                      <Link to={item.to} className="text-[0.9375rem] leading-snug text-white/80 transition-colors hover:text-white">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Ownership, legal and consent */}
        <div className="flex flex-col gap-4 border-t border-white/15 py-6 md:flex-row md:items-center md:justify-between">
          <p className="flex flex-wrap gap-x-5 gap-y-2 text-[0.75rem] leading-relaxed text-white/70">
            <span>&copy; {year} AURMAK.</span>
            <a href="https://www.aurmak.com" className="text-white/80 transition-colors hover:text-white" rel="noopener">
              AURMAK
            </a>
            <a href="https://cyber.aurmak.com" className="text-white/80 transition-colors hover:text-white" rel="noopener">
              Cybersecurity
            </a>
            <a href="https://aurmak.io" className="text-white/80 transition-colors hover:text-white" rel="noopener">
              Building Intelligence
            </a>
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            {LEGAL_NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-[0.75rem] text-white/70 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
