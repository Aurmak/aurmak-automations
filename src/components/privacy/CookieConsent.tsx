import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ANALYTICS_ID, startAnalytics, stopAnalytics, recordPageView } from '../../lib/analytics';
import { Button } from '../ui/Button';

const KEY = 'aurmak-privacy-v1';
const VERSION = 2;
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
const FONT_URL = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap';
type Preference = { version: number; externalFonts: boolean; analytics: boolean; analyticsId: string; savedAt: number };

export function readPreference(): Preference | null {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (value?.version === VERSION && typeof value.externalFonts === 'boolean' && typeof value.analytics === 'boolean' && value.analyticsId === ANALYTICS_ID &&
        typeof value.savedAt === 'number' && value.savedAt <= Date.now() &&
        Date.now() - value.savedAt < MAX_AGE) return value;
  } catch { /* Storage may be disabled. Default to no optional requests. */ }
  return null;
}

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preference, setPreference] = useState<Preference | null>(readPreference);
  const { pathname } = useLocation();
  const [storageWarning, setStorageWarning] = useState(false);

  useEffect(() => {
    if (preference?.analytics) startAnalytics();
    else stopAnalytics();
    return () => stopAnalytics();
  }, [preference?.analytics]);

  useEffect(() => {
    if (preference?.analytics) recordPageView(pathname);
  }, [pathname, preference?.analytics]);

  useEffect(() => {
    if (!preference?.externalFonts) return;
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = FONT_URL;
    stylesheet.dataset.aurmakOptional = 'fonts';
    document.head.appendChild(stylesheet);
    return () => stylesheet.remove();
  }, [preference?.externalFonts]);

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === KEY || event.key === null) setPreference(readPreference());
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  useEffect(() => {
    if (!preference) return;
    const refresh = () => {
      if (Date.now() - preference.savedAt >= MAX_AGE) setPreference(null);
    };
    const interval = window.setInterval(refresh, 60_000);
    window.addEventListener('focus', refresh);
    return () => { window.clearInterval(interval); window.removeEventListener('focus', refresh); };
  }, [preference]);

  const save = (accept: boolean) => {
    const next = { version: VERSION, externalFonts: accept, analytics: Boolean(ANALYTICS_ID) && accept, analyticsId: ANALYTICS_ID, savedAt: Date.now() };
    if (!next.analytics) stopAnalytics();
    try { localStorage.setItem(KEY, JSON.stringify(next)); setStorageWarning(false); }
    catch { setStorageWarning(true); }
    setPreference(next);
  };

  return <>
    {children}
    {!preference && <section aria-labelledby="cookie-heading" className="fixed bottom-0 inset-x-0 z-50 border-t border-aurmak-border bg-white shadow-[0_-8px_40px_#12363418] max-h-[80dvh] overflow-y-auto">
      <div className="max-w-7xl mx-auto p-5 sm:p-7 lg:flex lg:items-center lg:gap-10">
        <div className="flex-1">
          <h2 id="cookie-heading" className="text-xl font-semibold">Your privacy, your choice.</h2>
          <p className="mt-2 text-sm leading-relaxed text-aurmak-textMuted">With your permission, we load fonts from Google, which receives your IP address and browser details. {ANALYTICS_ID ? 'Optional Google Analytics helps us understand visits using cookies. It stays off until you agree.' : 'Analytics is not currently enabled.'} We do not use advertising cookies. <Link className="underline underline-offset-2 text-aurmak-actionText" to="/cookies">Read our cookies policy</Link>.</p>
        </div>
        <div className="mt-4 lg:mt-0 flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => save(false)}>Reject</Button>
          <Button onClick={() => save(true)}>Accept</Button>
        </div>
      </div>
    </section>}
    {storageWarning && <p role="status" className="fixed bottom-3 inset-x-4 z-50 mx-auto max-w-xl rounded-lg border border-aurmak-border bg-white p-4 text-sm shadow-lg">Your choice applies to this page session. Your browser blocked storage, so we may ask again on your next visit. <button className="underline font-semibold ml-2" onClick={() => setStorageWarning(false)}>Dismiss</button></p>}
  </>;
};
