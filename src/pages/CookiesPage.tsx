import React from 'react';
import { Link } from 'react-router-dom';
import { ANALYTICS_ID } from '../lib/analytics';
import { PolicyLayout, PolicySection } from '../components/privacy/PolicyLayout';

export const CookiesPage: React.FC = () => <PolicyLayout title="Cookies policy" description="The browser storage and optional external fonts used on the AURMAK Automations website, and how to change your choices." path="/cookies">
  <PolicySection title="What this website uses">
    <p>Cookies are small files stored by your browser. Local storage is a similar technology that lets a website remember information on your device. This website uses local storage to remember your privacy choice. {ANALYTICS_ID ? 'Google Analytics cookies are optional and only enabled with your permission.' : 'Google Analytics is not currently enabled. When available, it will require a separate opt-in.'} We do not use advertising cookies.</p>
    <p>You can browse the website and send an enquiry without accepting optional services.</p>
  </PolicySection>
  <PolicySection title="Necessary: your privacy choice">
    <p>We store a record named <code className="break-all">aurmak-privacy-v1</code> in your browser&rsquo;s local storage. It contains your choices about external fonts and analytics, the configured analytics identifier, the time you saved it, and the preference version. It contains no name, email address or advertising identifier and is not sent to our enquiry service.</p>
    <p>The choice is valid for 180 days. After that, we ask again when you revisit or return to the tab. Local storage has no automatic expiry: an old record may remain on your device until you replace it or clear site data, but we do not use it to authorise optional services after it expires. If browser storage is blocked, your choice applies only to the current page session.</p>
  </PolicySection>
  <PolicySection title="Optional: external fonts">
    <p>If you accept optional services or enable external fonts in your settings, your browser requests typefaces from Google Fonts at fonts.googleapis.com and fonts.gstatic.com. These requests disclose your IP address, browser information and request details to Google. Google states that its Fonts API does not set or log cookies.</p>
    <p>If you decline, the site uses fonts available on your device. We do not load the Google Fonts stylesheet or preconnect to its servers before you agree. Font files may be cached by your browser according to Google&rsquo;s response headers and your browser settings.</p>
    <p>Read <a className="underline text-aurmak-actionText" href="https://developers.google.com/fonts/faq/privacy">Google&rsquo;s Fonts privacy information</a> for details of how it handles these requests.</p>
  </PolicySection>
  <PolicySection title="Optional: Google Analytics">
    <p>{ANALYTICS_ID ? 'Google Analytics is available only if you enable it in Cookie settings.' : 'Google Analytics is not currently enabled on this website. When it is configured, we will ask for a new choice before loading it.'} It helps us understand page visits and device usage. This involves visitor data, including browser and device information and cookie identifiers; it is not anonymous simply because it is used for statistics.</p>
    <p>When enabled, the first-party cookies <code>_ga</code> and <code>_ga_&lt;identifier&gt;</code> distinguish browsers and maintain session information. Our configuration limits their lifetime to 180 days without refreshing it on each visit. The cookie period is separate from Google Analytics server-side data retention.</p>
    <p>We keep the Google tag entirely blocked until consent. Advertising storage, advertising personalisation and Google Signals are disabled. We do not send enquiry contents, query strings, URL fragments or incoming referrer URLs through our page-view integration. Withdrawing analytics consent disables measurement and clears accessible Google Analytics cookies for this site. It does not delete information already received by Google.</p>
    <p>See <a href="https://policies.google.com/technologies/partner-sites" className="underline text-aurmak-actionText">how Google uses information from sites that use its services</a>.</p>
  </PolicySection>
  <PolicySection title="Change or withdraw your choice">
    <p>Clear this site&rsquo;s cookies and site data through your browser settings to withdraw your choice; we will ask again on your next visit. Optional services are off until you accept them.</p>
    <p>Withdrawing permission cannot undo requests already sent to Google or erase files already held in your browser cache. You can clear cached files and site data through your browser settings.</p>
    <p>We will ask again if we introduce a new optional purpose. Adding or changing our Google Analytics configuration requires a new choice. Your current choice does not authorise future advertising services.</p>
  </PolicySection>
  <PolicySection title="Questions"><p>Contact <Link className="underline text-aurmak-actionText" to="/contact">our contact team</Link> about this policy or your privacy choices.</p></PolicySection>
</PolicyLayout>;
