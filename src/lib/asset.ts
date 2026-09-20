/**
 * Resolve a public asset path against Vite's base URL, so runtime string paths
 * (logos, video) work whether the site is served from the domain root or from a
 * GitHub Pages subpath like /aurmak-automations/.
 */
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
