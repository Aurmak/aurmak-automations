import React from 'react';
import { GradientCard } from '../ui/gradient-card';
import { getAutomationIcon } from '../../lib/automationIcons';
import { AutomationProduct } from '../../types/automation';

interface AutomationCardProps {
  automation: AutomationProduct;
  featured?: boolean;
}

type Gradient = 'amber' | 'red' | 'emerald' | 'blue' | 'violet' | 'pink' | 'indigo' | 'teal' | 'orange';

// One colour per automation, spread across the wheel so no two cards look alike.
// Order is tuned so neighbouring cards in the grid never sit next to a similar hue.
const PALETTE: { gradient: Gradient; dot: string }[] = [
  { gradient: 'amber', dot: '#F59E0B' },
  { gradient: 'blue', dot: '#3B82F6' },
  { gradient: 'violet', dot: '#8B5CF6' },
  { gradient: 'emerald', dot: '#10B981' },
  { gradient: 'red', dot: '#EF4444' },
  { gradient: 'pink', dot: '#EC4899' },
  { gradient: 'indigo', dot: '#6366F1' },
  { gradient: 'teal', dot: '#14B8A6' },
  { gradient: 'orange', dot: '#F97316' }
];

// Explicit assignment keeps each card's colour stable. Any automation not listed
// falls back to a deterministic slot derived from its id, still avoiding clashes.
const COLOUR_BY_ID: Record<string, number> = {
  'payment-reconciliation': 0,
  'supplier-invoice-matching': 1,
  'customer-onboarding': 2,
  'inventory-stock-adjustment': 3,
  'contract-milestone-billing': 4,
  'email-client-addon': 5,
  'school-operations': 6,
  'document-receipt-verification': 7,
  'ask-odoo-ai': 8
};

const hashId = (id: string) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h % PALETTE.length;
};

export const AutomationCard: React.FC<AutomationCardProps> = ({ automation, featured = false }) => {
  const index = COLOUR_BY_ID[automation.id] ?? hashId(automation.id);
  const style = PALETTE[index];
  const Icon = getAutomationIcon(automation.id);

  return (
    <GradientCard
      gradient={style.gradient}
      badgeText={automation.category}
      badgeColor={style.dot}
      title={automation.name}
      description={automation.operationalResult}
      ctaText="View details"
      ctaHref={`/solutions/${automation.slug}`}
      icon={Icon}
      featured={featured}
    />
  );
};
