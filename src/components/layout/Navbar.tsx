import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AurmakMark } from './AurmakMark';
import { ScopeWizard } from '../wizard/ScopeWizard';

// Nav link style matched to the cyber site: prominent body-lg label with a 3px
// underline indicator that fills in the accent on the active page and a soft line on hover.
const NAV_LINK =
  'relative inline-flex items-center gap-1.5 whitespace-nowrap py-2 text-[1.0625rem] font-bold font-sans transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[3px] after:rounded-full after:transition-all';
const NAV_ACTIVE = 'text-aurmak-navy after:bg-aurmak-action';
const NAV_IDLE = 'text-aurmak-textMuted after:bg-transparent hover:text-aurmak-navy hover:after:bg-aurmak-border';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Solutions', path: '/#solutions' },
    { name: 'Integrations', path: '/#integrations' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path.includes('#')) {
      return location.pathname + location.hash === path;
    }
    return location.pathname === path;
  };

  // Border and shadow arrive once the page moves, matching the cyber header.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled || mobileMenuOpen
          ? 'border-b border-aurmak-border shadow-[0_1px_12px_-6px_rgb(11_14_20_/_0.25)]'
          : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.75rem] items-center justify-between gap-4 md:h-[5.5rem] xl:gap-8">
          {/* Brand lockup: AURMAK mark | rule | AUTOMATIONS */}
          <Link to="/" className="group inline-flex items-center" aria-label="AURMAK Automations, home">
            <span className="inline-flex items-center gap-3.5 md:gap-4">
              <AurmakMark className="h-9 w-auto shrink-0 md:h-11" />
              <span aria-hidden="true" className="hidden sm:block h-[2em] w-px shrink-0 bg-aurmak-border" />
              <span className="hidden sm:inline font-sans text-[1.05rem] md:text-[1.3rem] font-bold leading-none tracking-[0.2em] text-aurmak-navy">
                AUTOMATIONS
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden items-center gap-8 xl:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                aria-current={isActive(link.path) ? 'page' : undefined}
                className={`${NAV_LINK} ${isActive(link.path) ? NAV_ACTIVE : NAV_IDLE}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden xl:block">
              <ScopeWizard label="Get my free plan" variant="primary" size="md" />
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-aurmak-navy xl:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurmak-action"
            >
              <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                {mobileMenuOpen ? (
                  <path d="M4 4l12 12M16 4L4 16" strokeLinecap="square" />
                ) : (
                  <path d="M2.5 6h15M2.5 14h15" strokeLinecap="square" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-aurmak-border bg-white px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col" aria-label="Primary, mobile">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isActive(link.path) ? 'page' : undefined}
                className={`flex min-h-12 items-center text-lg font-bold font-sans ${
                  isActive(link.path) ? 'text-aurmak-action' : 'text-aurmak-navy'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-aurmak-border">
            <ScopeWizard label="Get my free plan" variant="primary" size="md" className="w-full" />
          </div>
        </div>
      )}
    </header>
  );
};
