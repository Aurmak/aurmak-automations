/**
 * Where wizard and contact submissions are sent.
 *
 * public/api.php, reached through the /api/lead rewrite in public/.htaccess. It reads
 * `source` to decide which emails to send — see that file for the full contract this
 * payload shape has to satisfy.
 */
const LEAD_ENDPOINT = '/api/lead';

export interface Lead {
  source: 'wizard' | 'contact';
  name?: string;
  email: string;
  company?: string;
  message?: string;
  answers?: Record<string, string | string[]>;
  /** Wizard only — the impact estimate shown on the last step, so the email can show the
   *  same numbers instead of the backend re-deriving them from a second copy of the
   *  pricing model. moneyYear is pre-formatted (e.g. "$48k") for the same reason. */
  estimate?: { hoursMonth: number; pct: number; moneyYear: string };
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
