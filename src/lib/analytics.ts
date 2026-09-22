// Basic consent mode: no Google tag or cookieless pings before opt-in.
const configuredId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() ?? '';
export const ANALYTICS_ID = /^G-[A-Z0-9]+$/.test(configuredId) ? configuredId : '';

type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; [key: `ga-disable-${string}`]: boolean };
const analyticsWindow = window as unknown as AnalyticsWindow;
let active = false;
let script: HTMLScriptElement | null = null;

export function stopAnalytics() {
  if (!ANALYTICS_ID) return;
  analyticsWindow[`ga-disable-${ANALYTICS_ID}`] = true;
  // Disable measurement before updating consent, so withdrawal sends no analytics hits.
  analyticsWindow.gtag?.('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  script?.remove();
  script = null;
  active = false;
  // Cookies are explicitly host-only below; also clear domain cookies from earlier deployments.
  const domains = location.hostname.split('.').map((_, i, parts) => parts.slice(i).join('.'));
  for (const item of document.cookie.split(';')) {
    const name = item.trim().split('=')[0];
    if (name === '_ga' || name.startsWith('_ga_')) {
      document.cookie = `${name}=; Max-Age=0; Path=/`;
      for (const domain of domains) document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${domain}`;
    }
  }
}

export function startAnalytics() {
  if (!ANALYTICS_ID || active) return;
  analyticsWindow[`ga-disable-${ANALYTICS_ID}`] = false;
  analyticsWindow.dataLayer ??= [];
  analyticsWindow.gtag ??= function () { analyticsWindow.dataLayer!.push(arguments); };
  const gtag = analyticsWindow.gtag;
  gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  gtag('js', new Date());
  gtag('config', ANALYTICS_ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_domain: 'none',
    cookie_expires: 180 * 24 * 60 * 60,
    cookie_update: false,
    page_location: location.origin + location.pathname,
    page_referrer: '',
  });
  script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`;
  document.head.appendChild(script);
  active = true;
}

export function recordPageView(pathname: string) {
  if (!active) return;
  // No form values, URL query strings, fragment identifiers or incoming referrers.
  analyticsWindow.gtag?.('event', 'page_view', {
    page_location: location.origin + pathname,
    page_title: pathname,
    page_referrer: '',
    send_to: ANALYTICS_ID,
  });
}
