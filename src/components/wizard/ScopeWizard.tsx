import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, X, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { submitLead } from '../../lib/leads';

/**
 * A short, playful click-through scoping wizard in a modal.
 *
 * It reads the person before the process: who they are, the world they work in,
 * and the pain they live with today, then what they want automated. Every
 * question is multiple choice with an emoji cue, so a visitor taps rather than
 * types; only the final step asks for a name, email, and company.
 */

type Option = { label: string; emoji?: string; logo?: string };
type Question = { id: string; kind: 'single' | 'multi'; prompt: string; hint?: string; options: Option[] };

const QUESTIONS: Question[] = [
  {
    id: 'role',
    kind: 'single',
    prompt: 'Which of these sounds like you?',
    options: [
      { label: 'Finance / accounting', emoji: '💼' },
      { label: 'Accounts payable / receivable', emoji: '🧾' },
      { label: 'Operations', emoji: '⚙️' },
      { label: 'Founder / owner', emoji: '🚀' },
      { label: 'IT / systems', emoji: '💻' },
      { label: 'Something else', emoji: '🙋' }
    ]
  },
  {
    id: 'industry',
    kind: 'single',
    prompt: 'What does your business do?',
    options: [
      { label: 'Financial services & accounting', emoji: '🏦' },
      { label: 'Manufacturing & distribution', emoji: '🏭' },
      { label: 'Retail & e-commerce', emoji: '🛒' },
      { label: 'Professional services & agencies', emoji: '📐' },
      { label: 'Logistics & supply chain', emoji: '🚚' },
      { label: 'SaaS & subscription', emoji: '🔁' },
      { label: 'Something else', emoji: '✨' }
    ]
  },
  {
    id: 'size',
    kind: 'single',
    prompt: 'How big is the team doing this work?',
    options: [
      { label: 'Just me', emoji: '🧍' },
      { label: '2 to 10', emoji: '👥' },
      { label: '11 to 50', emoji: '👨‍👩‍👧' },
      { label: '51 to 200', emoji: '🏢' },
      { label: '200+', emoji: '🏙️' }
    ]
  },
  {
    id: 'pain',
    kind: 'multi',
    prompt: "What's eating your time right now?",
    hint: 'Pick whatever hurts most.',
    options: [
      { label: 'Hours lost to manual data entry', emoji: '⏳' },
      { label: 'Errors and mismatches', emoji: '❌' },
      { label: 'Slow month-end close', emoji: '🐌' },
      { label: 'Chasing approvals back and forth', emoji: '🔁' },
      { label: 'Data stuck in emails & PDFs', emoji: '📧' },
      { label: "Systems that don't talk to each other", emoji: '🔌' },
      { label: 'Team stretched too thin', emoji: '😮‍💨' }
    ]
  },
  {
    id: 'automate',
    kind: 'multi',
    prompt: 'What would you like to automate?',
    hint: 'Pick as many as you like.',
    options: [
      { label: 'Reconcile payments', emoji: '💸' },
      { label: 'Match invoices to POs', emoji: '🧮' },
      { label: 'Onboard customers', emoji: '🤝' },
      { label: 'Adjust stock counts', emoji: '📦' },
      { label: 'Bill by milestone', emoji: '📅' },
      { label: 'Handle email attachments', emoji: '📎' },
      { label: 'Something else', emoji: '🛠️' }
    ]
  },
  {
    id: 'volume',
    kind: 'single',
    prompt: 'Roughly how many of these do you handle a month?',
    hint: 'A rough number is fine.',
    options: [
      { label: 'Under 50', emoji: '🐣' },
      { label: '50 to 500', emoji: '📈' },
      { label: '500 to 5,000', emoji: '🚀' },
      { label: '5,000+', emoji: '🔥' }
    ]
  },
  {
    id: 'system',
    kind: 'single',
    prompt: 'Where do your records live?',
    options: [
      { label: 'Odoo', logo: 'odoo' },
      { label: 'Zoho', logo: 'zoho' },
      { label: 'SAP', logo: 'sap' },
      { label: 'QuickBooks', logo: 'quickbooks' },
      { label: 'Xero', logo: 'xero' },
      { label: 'A custom database', emoji: '🗄️' },
      { label: 'Not sure yet', emoji: '🤷' }
    ]
  }
];

// --- Estimate model -------------------------------------------------------
// A rough, honest payoff worked out from what the visitor tells us, so the last
// step shows real numbers rather than the same line for everyone. Change CURRENCY
// and RATE_PER_HOUR to suit your market.
const CURRENCY = '$';
const RATE_PER_HOUR = 30; // blended cost of the person doing this work, per hour
const AUTOMATED_SHARE = 0.85; // share of the manual work automation takes off their plate

// Representative items per month for each volume band.
const VOLUME_MID: Record<string, number> = {
  'Under 50': 25,
  '50 to 500': 250,
  '500 to 5,000': 2500,
  '5,000+': 8000
};

// Minutes a person spends handling one item by hand, per task.
const TASK_MINUTES: Record<string, number> = {
  'Reconcile payments': 3,
  'Match invoices to POs': 6,
  'Onboard customers': 20,
  'Adjust stock counts': 4,
  'Bill by milestone': 8,
  'Handle email attachments': 5,
  'Something else': 6
};

interface Estimate {
  hoursMonth: number;
  pct: number;
  moneyYear: number;
}

function computeEstimate(answers: Record<string, string | string[]>): Estimate {
  const volume = typeof answers['volume'] === 'string' ? VOLUME_MID[answers['volume'] as string] ?? 250 : 250;
  const tasks = Array.isArray(answers['automate']) ? (answers['automate'] as string[]) : [];
  const avgMinutes =
    tasks.length > 0 ? tasks.reduce((sum, t) => sum + (TASK_MINUTES[t] ?? 6), 0) / tasks.length : 6;

  const savedMinutesMonth = volume * avgMinutes * AUTOMATED_SHARE;
  const hoursMonth = Math.max(1, Math.round(savedMinutesMonth / 60));
  const moneyYearRaw = hoursMonth * 12 * RATE_PER_HOUR;
  const moneyYear = moneyYearRaw >= 10000 ? Math.round(moneyYearRaw / 1000) * 1000 : Math.round(moneyYearRaw / 100) * 100;

  return { hoursMonth, pct: Math.round(AUTOMATED_SHARE * 100), moneyYear };
}

type Answers = Record<string, string | string[]>;

interface ScopeWizardProps {
  label: string;
  /** 'primary'/'secondary' render a solid button; 'link' renders an inline text link. */
  variant?: 'primary' | 'secondary' | 'link';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ScopeWizard: React.FC<ScopeWizardProps> = ({ label, variant = 'secondary', size = 'lg', className = '' }) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState({ name: '', email: '', company: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const totalSteps = QUESTIONS.length + 1; // + contact step

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const reset = () => {
    setStep(0);
    setAnswers({});
    setContact({ name: '', email: '', company: '' });
    setErrors({});
    setDone(false);
  };

  const close = () => {
    setOpen(false);
    setTimeout(reset, 200);
  };

  const goNext = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const chooseSingle = (id: string, value: string) => {
    setAnswers((a) => ({ ...a, [id]: value })); // select only; user taps Continue
  };

  const toggleMulti = (id: string, value: string) => {
    setAnswers((a) => {
      const current = Array.isArray(a[id]) ? (a[id] as string[]) : [];
      return {
        ...a,
        [id]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
      };
    });
  };

  const submit = () => {
    const next: Record<string, string> = {};
    if (!contact.name.trim()) next.name = 'Please enter your name.';
    if (!contact.company.trim()) next.company = 'Please enter your company.';
    if (!contact.email.trim() || !contact.email.includes('@')) next.email = 'Please enter a valid email.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    submitLead({ source: 'wizard', name: contact.name, email: contact.email, company: contact.company, answers });
    setDone(true);
  };

  const isContactStep = step === QUESTIONS.length;
  const picks = Array.isArray(answers['automate']) ? (answers['automate'] as string[]) : [];
  const estimate = computeEstimate(answers);

  const currentAnswered = (() => {
    if (isContactStep) return true;
    const q = QUESTIONS[step];
    const a = answers[q.id];
    return q.kind === 'single' ? typeof a === 'string' && a.length > 0 : Array.isArray(a) && a.length > 0;
  })();

  const trigger =
    variant === 'link' ? (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`text-base font-sans font-semibold text-aurmak-navy hover:text-aurmak-actionText transition-colors cursor-pointer ${className}`}
      >
        {label}
      </button>
    ) : (
      <Button variant={variant} size={size} className={className} onClick={() => setOpen(true)}>
        {label}
      </Button>
    );

  const modal =
    open &&
    createPortal(
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Scope your automation"
      >
        {/* Backdrop (does not close on click; use the X button) */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" aria-hidden="true" />

        {/* Panel */}
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Progress + close */}
          <div className="px-6 pt-5 pb-4 border-b border-aurmak-border">
            <div className="flex items-center justify-between gap-4">
              <span className="text-base font-semibold text-aurmak-textMuted">
                {done ? '🎉 All set' : `Step ${step + 1} of ${totalSteps}`}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-aurmak-textMuted hover:bg-aurmak-subtle hover:text-aurmak-navy transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* Segmented level bar */}
            <div className="mt-3 flex items-center gap-1.5" aria-hidden="true">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                    done || i <= step ? 'bg-aurmak-action' : 'bg-aurmak-subtle'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-7 overflow-y-auto flex-1 min-h-[360px]">
            {done ? (
              <div className="space-y-4 text-center py-6">
                <div className="mx-auto w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center animate-bounce">
                  <Check className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-bold text-aurmak-navy font-sans">
                  Nice{contact.name ? `, ${contact.name.split(' ')[0]}` : ''}! 🎯
                </h2>
                {picks.length > 0 && (
                  <p className="text-lg text-aurmak-textMuted">
                    We&rsquo;ll scope: <span className="font-semibold text-aurmak-navy">{picks.join(', ')}</span>
                  </p>
                )}
                <p className="text-lg text-aurmak-text leading-relaxed">
                  We&rsquo;ll email {contact.email} within one business day with a detailed proposal built around your process.
                </p>
                <div className="pt-3">
                  <Button variant="primary" size="md" onClick={close}>
                    Done
                  </Button>
                </div>
              </div>
            ) : isContactStep ? (
              <div className="space-y-5">
                {/* A payoff worked out from their own answers */}
                <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-200 p-5 space-y-4 shadow-md">
                  <div className="text-xl font-bold text-emerald-800 font-sans">Here&rsquo;s what automating this could do for you 🚀</div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-xl bg-white py-4 px-1 shadow-sm">
                      <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-sans leading-none">
                        ~{estimate.hoursMonth}
                      </div>
                      <div className="text-sm sm:text-base text-aurmak-textMuted mt-1.5 leading-tight">hours you&rsquo;ll save a month</div>
                    </div>
                    <div className="rounded-xl bg-white py-4 px-1 shadow-sm">
                      <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-sans leading-none">
                        ~{estimate.pct}%
                      </div>
                      <div className="text-sm sm:text-base text-aurmak-textMuted mt-1.5 leading-tight">less manual work</div>
                    </div>
                    <div className="rounded-xl bg-white py-4 px-1 shadow-sm">
                      <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-sans leading-none">
                        {CURRENCY}{estimate.moneyYear.toLocaleString()}
                      </div>
                      <div className="text-sm sm:text-base text-aurmak-textMuted mt-1.5 leading-tight">you&rsquo;ll save a year</div>
                    </div>
                  </div>
                  <p className="text-base text-emerald-900/80 leading-relaxed">
                    Projected from your answers. We&rsquo;ll confirm the details in your plan.
                  </p>
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-[1.6rem] font-bold text-aurmak-navy font-sans">Get your tailored plan 📩</h2>
                  <p className="text-lg text-aurmak-textMuted">
                    We&rsquo;ll send a detailed proposal within one business day. No meeting, no pressure.
                  </p>
                </div>
                <div className="space-y-3">
                  {([
                    { key: 'name', type: 'text', placeholder: 'Your name' },
                    { key: 'company', type: 'text', placeholder: 'Company' },
                    { key: 'email', type: 'email', placeholder: 'Work email' }
                  ] as const).map((f) => (
                    <div key={f.key}>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={contact[f.key]}
                        onChange={(e) => {
                          setContact({ ...contact, [f.key]: e.target.value });
                          if (errors[f.key]) setErrors((prev) => ({ ...prev, [f.key]: '' }));
                        }}
                        aria-invalid={errors[f.key] ? true : undefined}
                        className={`w-full px-4 py-3.5 text-lg bg-white border rounded-lg text-aurmak-text placeholder:text-aurmak-textDim focus:outline-none focus:ring-2 focus:ring-aurmak-action ${
                          errors[f.key] ? 'border-aurmak-danger' : 'border-aurmak-border focus:border-aurmak-action'
                        }`}
                      />
                      {errors[f.key] && <p className="mt-1.5 text-base text-aurmak-danger">{errors[f.key]}</p>}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-[1.6rem] font-bold text-aurmak-navy font-sans leading-snug">
                    {QUESTIONS[step].prompt}
                  </h2>
                  {QUESTIONS[step].hint && <p className="text-lg text-aurmak-textMuted">{QUESTIONS[step].hint}</p>}
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {QUESTIONS[step].options.map((option) => {
                    const q = QUESTIONS[step];
                    const selected =
                      q.kind === 'single'
                        ? answers[q.id] === option.label
                        : Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(option.label);
                    return (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => (q.kind === 'single' ? chooseSingle(q.id, option.label) : toggleMulti(q.id, option.label))}
                        aria-pressed={selected}
                        className={`flex items-center gap-3 w-full text-left px-4 py-4 rounded-xl border-2 text-lg transition-all duration-150 active:scale-[0.99] ${
                          selected
                            ? 'border-aurmak-action bg-aurmak-action/15 text-aurmak-navy font-semibold shadow-md ring-2 ring-aurmak-action/25'
                            : 'border-aurmak-border bg-white text-aurmak-text font-medium hover:border-aurmak-navy hover:bg-aurmak-subtle/40'
                        }`}
                      >
                        {option.logo ? (
                          <img src={`/logos/${option.logo}.svg`} alt="" aria-hidden="true" className="h-7 w-7 object-contain shrink-0" />
                        ) : (
                          <span className="text-2xl leading-none w-7 text-center" aria-hidden="true">{option.emoji}</span>
                        )}
                        <span className="flex-1">{option.label}</span>
                        <span
                          className={`shrink-0 inline-flex h-5 w-5 items-center justify-center border-2 transition-all ${
                            q.kind === 'multi' ? 'rounded-md' : 'rounded-full'
                          } ${selected ? 'border-aurmak-action bg-aurmak-action text-white scale-110' : 'border-aurmak-border'}`}
                        >
                          {selected && <Check className="h-3 w-3" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer controls */}
          {!done && (
            <div className="px-6 py-4 border-t border-aurmak-border flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                className="inline-flex items-center gap-1.5 text-base font-semibold text-aurmak-navy disabled:opacity-0 disabled:pointer-events-none hover:text-aurmak-actionText transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>

              {isContactStep ? (
                <Button variant="primary" size="md" onClick={submit}>
                  <Sparkles className="h-4 w-4" /> Get my plan
                </Button>
              ) : (
                <Button variant="primary" size="md" onClick={goNext} disabled={!currentAnswered}>
                  Continue
                </Button>
              )}
            </div>
          )}
        </div>
      </div>,
      document.body
    );

  return (
    <>
      {trigger}
      {modal}
    </>
  );
};
