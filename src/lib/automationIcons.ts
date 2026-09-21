import { Banknote, FileCheck2, UserPlus, Boxes, Milestone, MailPlus, GraduationCap, ScanSearch, MessagesSquare, Workflow, type LucideIcon } from 'lucide-react';

// A relevant icon per automation, shared by the solution cards and the detail hero.
const ICON_BY_ID: Record<string, LucideIcon> = {
  'payment-reconciliation': Banknote,
  'supplier-invoice-matching': FileCheck2,
  'customer-onboarding': UserPlus,
  'inventory-stock-adjustment': Boxes,
  'contract-milestone-billing': Milestone,
  'email-client-addon': MailPlus,
  'school-operations': GraduationCap,
  'document-receipt-verification': ScanSearch,
  'ask-odoo-ai': MessagesSquare
};

export const getAutomationIcon = (id: string): LucideIcon => ICON_BY_ID[id] ?? Workflow;
