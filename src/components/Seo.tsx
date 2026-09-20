import { useEffect } from 'react';

/**
 * Absolute base URL of the deployed site. Currently GitHub Pages; when the site
 * moves to a custom domain (e.g. https://aurmak.com), change this one line and the
 * matching absolute URLs in index.html / robots.txt / sitemap.xml.
 */
export const SITE_URL = 'https://aurmak.github.io/aurmak-automations';
export const SITE_NAME = 'AURMAK Automations';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

interface SeoProps {
  /** Page title. The site name is appended automatically unless already present. */
  title: string;
  description: string;
  /** Path portion of the canonical URL, e.g. "/contact". */
  path?: string;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Sets document title and SEO/social meta for the current route. Renders nothing. */
export const Seo: React.FC<SeoProps> = ({ title, description, path = '' }) => {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const url = `${SITE_URL}${path}`;

    document.title = fullTitle;
    upsertMeta('name', 'description', description);
    upsertLink('canonical', url);

    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:image', OG_IMAGE);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', OG_IMAGE);
  }, [title, description, path]);

  return null;
};
