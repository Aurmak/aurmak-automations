export type AutomationCategory =
  | 'Finance & Accounting'
  | 'Operations & Logistics'
  | 'Customer & Onboarding'
  | 'Inventory & ERP'
  | 'Email & Productivity';

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

export interface WorkflowSimulationPreset {
  id: string;
  title: string;
  category: string;
  inputDescription: string;
  sampleInput: {
    type: string;
    identifier: string;
    payloadPreview: Record<string, string | number>;
  };
  checks: {
    rule: string;
    status: 'pass' | 'warning' | 'fail';
    detail: string;
  }[];
  systemAction: {
    targetApp: string;
    actionType: string;
    payloadWritten: Record<string, string | number>;
  };
  exceptionPath: {
    condition: string;
    routedTo: string;
    reason: string;
    humanDecisionOptions: string[];
  };
}

export interface CustomEnquiryFormData {
  contactName: string;
  email: string;
  organisation: string;
  processDescription: string;
  connectedApplications: string[];
  currentManualSteps: string;
  monthlyVolume: string;
  desiredOutcome: string;
  hasDedicatedApiAccess: string;
}
