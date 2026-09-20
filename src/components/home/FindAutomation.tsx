import React, { useState } from 'react';
import {
  Landmark, Factory, ShoppingCart, Briefcase, Truck, RefreshCw,
  Calculator, ReceiptText, Boxes, BadgeDollarSign, UserPlus, ShieldCheck,
  FileText, ArrowLeftRight, BadgeCheck, Database, GitBranch, Inbox,
  type LucideIcon
} from 'lucide-react';

interface Capability {
  label: string;
  detail: string;
  icon: LucideIcon;
}

// Coloured icon chips, rotated per card so the grid feels as lively as the
// solution cards below without turning the section into a banner.
const CHIP_STYLES = [
  'bg-amber-100 text-amber-600',
  'bg-blue-100 text-blue-600',
  'bg-violet-100 text-violet-600',
  'bg-emerald-100 text-emerald-600',
  'bg-red-100 text-red-600',
  'bg-pink-100 text-pink-600'
];

const TABS: { key: string; intro: string; items: Capability[] }[] = [
  {
    key: 'By industry',
    intro: 'Whatever you run, the repetitive, rules-driven work behind it can be automated.',
    items: [
      { label: 'Financial services & accounting', detail: 'Payments match themselves overnight, so only the odd ones reach an accountant.', icon: Landmark },
      { label: 'Manufacturing & distribution', detail: 'Supplier bills match their orders and stock counts line up with your books.', icon: Factory },
      { label: 'Retail & e-commerce', detail: 'Payouts match your sales on arrival and stock stays in sync across channels.', icon: ShoppingCart },
      { label: 'Professional services & agencies', detail: 'Invoices go out the moment a milestone is signed off and new clients are set up in minutes.', icon: Briefcase },
      { label: 'Logistics & supply chain', detail: 'Small count differences fix themselves and only the big ones go to your leads.', icon: Truck },
      { label: 'SaaS & subscription', detail: 'Renewals and usage update your books as they happen, not at month-end.', icon: RefreshCw }
    ]
  },
  {
    key: 'By team',
    intro: 'Point it at the work a team repeats every day, and give them back the hours.',
    items: [
      { label: 'Finance', detail: 'Matching, month-end, and revenue, all run to your own rules.', icon: Calculator },
      { label: 'Accounts payable', detail: 'Supplier bills read, checked against orders and receipts, then entered.', icon: ReceiptText },
      { label: 'Operations', detail: 'Stock, orders, and counts kept in sync across your systems.', icon: Boxes },
      { label: 'Revenue & billing', detail: 'Invoices raised the moment a milestone or usage lands.', icon: BadgeDollarSign },
      { label: 'Customer onboarding', detail: 'New customers checked and set up across your CRM and books.', icon: UserPlus },
      { label: 'IT & data', detail: 'Every connection uses only the access it needs, and it is all logged.', icon: ShieldCheck }
    ]
  },
  {
    key: 'By use case',
    intro: 'If the work runs on documents, files, or an app, these are the pieces we automate.',
    items: [
      { label: 'Read documents', detail: 'Turn PDFs, emails, scans, and exports into clean, checked data.', icon: FileText },
      { label: 'Match & reconcile', detail: 'Line up payments, invoices, purchase orders, and stock counts.', icon: ArrowLeftRight },
      { label: 'Check before it goes in', detail: 'Check the details and your rules so only clean records go through.', icon: BadgeCheck },
      { label: 'Update your systems', detail: 'Enter the approved actions into Odoo, SAP, Zoho, and your own systems.', icon: Database },
      { label: 'Send on the odd ones', detail: 'Pass only the genuine edge cases to the right person to approve.', icon: GitBranch },
      { label: 'Work inside the inbox', detail: 'Pull email attachments into the flow from Outlook and Gmail.', icon: Inbox }
    ]
  }
];

export const FindAutomation: React.FC = () => {
  const [active, setActive] = useState(TABS[0].key);
  const current = TABS.find((t) => t.key === active) ?? TABS[0];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-4 mb-8 max-w-3xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-aurmak-navy tracking-tight font-sans leading-[1.08]">
          Automate the manual work across all your systems
        </h2>
        <p className="text-lg text-aurmak-text leading-relaxed font-body">
          Our AI reads your documents and files, checks each one against your live records, handles the ones that follow your rules, and sends the rest to your team. It runs in our cloud, or on your own servers when your data can&rsquo;t leave.
        </p>
      </div>

      {/* Segmented pill tabs */}
      <div role="tablist" aria-label="What we automate" className="inline-flex flex-wrap gap-1 p-1 rounded-full bg-white border border-aurmak-border shadow-execoore">
        {TABS.map((tab) => {
          const isActive = tab.key === active;
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.key)}
              className={`rounded-full px-5 py-2.5 text-base font-semibold font-sans transition-all cursor-pointer ${
                isActive
                  ? 'bg-aurmak-navy text-white shadow-sm'
                  : 'text-aurmak-textMuted hover:text-aurmak-navy'
              }`}
            >
              {tab.key}
            </button>
          );
        })}
      </div>

      <p className="text-base text-aurmak-textMuted mt-5 mb-6">{current.intro}</p>

      {/* Capability cards - what we can automate, not a list of what's on the shelf */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {current.items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={`${current.key}-${item.label}`}
              className="group rounded-xl bg-white border border-aurmak-border shadow-execoore p-6 transition-all duration-200 hover:shadow-execoore-hover hover:border-aurmak-navy hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                <div className={`shrink-0 h-12 w-12 rounded-lg flex items-center justify-center ${CHIP_STYLES[i % CHIP_STYLES.length]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-lg font-bold text-aurmak-navy font-sans leading-snug">{item.label}</div>
                  <div className="text-base text-aurmak-textMuted mt-1.5 leading-relaxed">{item.detail}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
