/**
 * Where wizard and contact submissions are sent.
 *
 * Set LEAD_ENDPOINT to your own destination: a form service (Formspree, Web3Forms),
 * a serverless function, or a CRM webhook that accepts a JSON POST. While it is empty
 * the form still works and each submission is logged to the browser console, so nothing
 * is lost during development.
 */
const LEAD_ENDPOINT = '';

export interface Lead {
  source: 'wizard' | 'contact';
  name?: string;
  email: string;
  company?: string;
  message?: string;
  answers?: Record<string, string | string[]>;
}

export async function submitLead(lead: Lead): Promise<boolean> {
  const payload = { ...lead, submittedAt: new Date().toISOString() };

  if (!LEAD_ENDPOINT) {
    // No destination configured yet: keep the flow working and surface the data.
    console.info('[AURMAK lead]', payload);
    return true;
  }

  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.ok;
  } catch {
    return false;
  }
}
