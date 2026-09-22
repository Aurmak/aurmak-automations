export type AutomationCategory =
  | 'Finance & Accounting'
  | 'Operations & Logistics'
  | 'Customer & Onboarding'
  | 'Inventory & ERP'
  | 'Email & Productivity'
  | 'Schools & Education'
  | 'Reporting & Insights';

/**
 * The team an automation serves, used by the catalogue filter tabs. One consistent
 * axis (by team), matching the "By team" lens elsewhere on the page.
 */
export type AutomationGroup = 'Finance' | 'Operations' | 'Productivity';

export interface WorkflowStage {
  title: string;
  detail: string;
  actor: 'External Input' | 'AURMAK Layer' | 'Connected Application' | 'Human Reviewer';
}

export interface ImplementationStage {
  phase: string;
  description: string;
  deliverable: string;
}

export interface AutomationProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  operationalResult: string;
  category: AutomationCategory;
  /** Coarse group used by the catalogue filter tabs. */
  group: AutomationGroup;
  inputs: string[];
  actions: string[];
  exceptions: string[];
  compatibility: {
    platforms: string[];
    accessRequirements: string[];
  };
  problemDescription: string;
  intendedResult: string;
  workflowStages: WorkflowStage[];
  dataRead: string[];
  dataWritten: string[];
  humanApprovalRules: string[];
  implementationStages: ImplementationStage[];
  clientResponsibilities: string[];
}
