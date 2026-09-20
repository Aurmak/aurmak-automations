export interface IntegrationLogo {
  name: string;
  /** Basename of the self-hosted SVG in /public/logos. */
  slug: string;
  /** Optional full URL override (e.g. a Brandfetch asset) used instead of the local file. */
  src?: string;
}

/**
 * Systems automations connect to, shown as a centered grid of brand logos self-hosted in
 * /public/logos. These are the apps we integrate with, not customer logos. Only apps with
 * a real, available logo are listed here so nothing falls back to initials.
 */
export const INTEGRATION_LOGOS: IntegrationLogo[] = [
  { name: 'SAP', slug: 'sap' },
  { name: 'Odoo', slug: 'odoo' },
  { name: 'Xero', slug: 'xero' },
  { name: 'QuickBooks', slug: 'quickbooks' },
  { name: 'Sage', slug: 'sage' },
  { name: 'Zoho', slug: 'zoho', src: 'https://cdn.brandfetch.io/idssig0_jY/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B' },
  { name: 'Stripe', slug: 'stripe' },
  { name: 'Adyen', slug: 'adyen' },
  { name: 'PayPal', slug: 'paypal' },
  { name: 'Wise', slug: 'wise' },
  { name: 'Shopify', slug: 'shopify' },
  { name: 'WooCommerce', slug: 'woocommerce' },
  { name: 'HubSpot', slug: 'hubspot' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'MySQL', slug: 'mysql' },
  { name: 'Google Sheets', slug: 'googlesheets' },
  { name: 'Google Drive', slug: 'googledrive' },
  { name: 'Dropbox', slug: 'dropbox' },
  { name: 'Gmail', slug: 'gmail' },
  { name: 'Outlook', slug: 'outlook' },
  { name: 'Mailchimp', slug: 'mailchimp' }
];
