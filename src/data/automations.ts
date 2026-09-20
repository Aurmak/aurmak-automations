import { AutomationProduct } from '../types/automation';

export const AUTOMATIONS_DATA: AutomationProduct[] = [
  {
    id: 'payment-reconciliation',
    slug: 'payment-reconciliation',
    name: 'Payment Reconciliation Automation',
    tagline: 'Automated matching between bank settlement feeds and open sales invoices.',
    operationalResult: 'Reconciles daily settlements automatically and flags fee discrepancies to finance.',
    category: 'Finance & Accounting',
    inputs: [
      'Bank statement feeds (MT940, CAMT.053, CSV)',
      'Payment gateway settlement exports (Stripe, Adyen)',
      'Direct debit return files and remittance advice'
    ],
    actions: [
      'Matches transaction references to open sales invoices',
      'Posts reconciled payment vouchers in your ERP',
      'Allocates processing fees to designated expense accounts',
      'Marks matching customer invoices as settled'
    ],
    exceptions: [
      'Fee variances exceeding defined contract tolerance',
      'Missing or ambiguous invoice reference strings',
      'Split payments covering multiple customer entities'
    ],
    compatibility: {
      platforms: ['Odoo Enterprise', 'Zoho Books', 'SAP Business One', 'Custom SQL ERPs'],
      accessRequirements: [
        'Read access to open invoices and chart of accounts',
        'Write access to bank journals and payment allocations',
        'SFTP or webhook delivery for statement files'
      ]
    },
    problemDescription: 'Finance teams waste hours each morning cross-referencing bank transaction logs against ERP invoice lists. Small fee deductions from payment processors cause partial payment mismatches, forcing accountants to adjust ledgers by hand.',
    intendedResult: 'Standard settlements match and clear without opening the ERP ledger. Real discrepancies route directly to finance with one-click resolution choices.',
    workflowStages: [
      {
        title: 'Settlement Feed Receipt',
        detail: 'Receives settlement files and bank feeds daily via secure SFTP or bank API.',
        actor: 'External Input'
      },
      {
        title: 'Reference & Amount Cross-Check',
        detail: 'Extracts references and queries the connected ERP for matching open invoices.',
        actor: 'AURMAK Layer'
      },
      {
        title: 'Tolerance & Rule Validation',
        detail: 'Validates gateway fees against contract tables and tests variance thresholds.',
        actor: 'AURMAK Layer'
      },
      {
        title: 'ERP Ledger Write-Back',
        detail: 'Posts payment vouchers and clears open invoices in Odoo, Zoho, or SAP.',
        actor: 'Connected Application'
      },
      {
        title: 'Exception Routing',
        detail: 'Discrepancies route to the finance officer with diagnostic resolution options.',
        actor: 'Human Reviewer'
      }
    ],
    dataRead: [
      'Open customer invoice references, customer IDs, and balances',
      'Bank statement descriptions and gross settlement amounts',
      'Configured exchange rates and processing fee tolerances'
    ],
    dataWritten: [
      'Bank journal voucher entries linked to matching invoices',
      'Processing fee ledger adjustments for payment commissions',
      'Status updates from Open to Settled on verified invoices'
    ],
    humanApprovalRules: [
      'Fee variances exceeding 0.5% or 5 currency units',
      'Deposits received from unrecognised payer accounts',
      'Partial payments leaving balances under dispute'
    ],
    implementationStages: [
      {
        phase: 'Workflow Mapping',
        description: 'Review statement structures, match keys, and fee tolerances.',
        deliverable: 'Business rules matrix'
      },
      {
        phase: 'Connector Configuration',
        description: 'Establish authenticated API credentials and SFTP ingestion paths.',
        deliverable: 'Sandbox integration test'
      },
      {
        phase: 'Parallel Validation',
        description: 'Run alongside your finance team for two cycles to confirm accuracy.',
        deliverable: 'Comparison audit log'
      },
      {
        phase: 'Live Cutover',
        description: 'Activate ERP write-backs and connect team exception alerts.',
        deliverable: 'Production activation'
      }
    ],
    clientResponsibilities: [
      'Provide read and write API credentials to invoice and journal endpoints',
      'Ensure bank or gateway statements are scheduled for automated delivery',
      'Designate a finance lead to review exceptions during testing'
    ]
  },
  {
    id: 'supplier-invoice-matching',
    slug: 'supplier-invoice-matching',
    name: 'Supplier Invoice & PO Matching Automation',
    tagline: 'Extracts line items from supplier bills and validates against approved purchase orders.',
    operationalResult: 'Approves standard supplier bills into AP and routes unit price variances to purchasing.',
    category: 'Finance & Accounting',
    inputs: [
      'Supplier invoices received by email (PDF or TIFF)',
      'Digital e-invoices via Peppol or XML standards',
      'Delivery receipts logged by warehouse staff'
    ],
    actions: [
      'Extracts invoice header data, line items, and tax numbers',
      'Matches lines against purchase orders and receiving records',
      'Creates draft or approved supplier bills in the ERP',
      'Attaches the original PDF document to the ERP record'
    ],
    exceptions: [
      'Unit price discrepancies outside negotiated contract limits',
      'Invoiced quantities exceeding warehouse goods received notes',
      'Unrecognised supplier VAT numbers or bank account details'
    ],
    compatibility: {
      platforms: ['Odoo Invoicing', 'Zoho Books', 'SAP ECC / S4', 'Custom SQL ERPs'],
      accessRequirements: [
        'Read access to purchase orders and receiving notes',
        'Write access to vendor bills and document attachments',
        'Dedicated email inbox or forwarding rule for accounts payable'
      ]
    },
    problemDescription: 'Accounts payable staff spend substantial time reading PDF invoices, searching the ERP for purchase orders, and checking whether goods actually arrived. Small price variances cause bills to stall in email threads.',
    intendedResult: 'Invoices that match purchase orders and warehouse receipts post to AP automatically. Real variances isolate to the specific line item for buyer approval.',
    workflowStages: [
      {
        title: 'Invoice Intake',
        detail: 'Supplier invoices arrive in a monitored inbox or upload endpoint.',
        actor: 'External Input'
      },
      {
        title: 'Data Extraction & Schema Check',
        detail: 'Extracts invoice numbers, supplier tax IDs, line item prices, and totals.',
        actor: 'AURMAK Layer'
      },
      {
        title: 'Three-Way Match Verification',
        detail: 'Cross-checks details against purchase orders and warehouse receipts in the ERP.',
        actor: 'AURMAK Layer'
      },
      {
        title: 'Bill Creation in ERP',
        detail: 'Generates a confirmed vendor bill in the ERP with the original PDF attached.',
        actor: 'Connected Application'
      },
      {
        title: 'Variance Escalation',
        detail: 'Flags price or quantity variances directly to purchasing managers.',
        actor: 'Human Reviewer'
      }
    ],
    dataRead: [
      'Approved purchase order lines, agreed unit costs, and delivery statuses',
      'Goods received notes and warehouse receipt timestamps',
      'Supplier banking details and tax registration numbers'
    ],
    dataWritten: [
      'Confirmed vendor bills in the accounting module',
      'Document attachments linking the original PDF to the ERP record',
      'Audit log with matching confidence scores'
    ],
    humanApprovalRules: [
      'Unit price variance greater than 1% of approved PO cost',
      'Invoices lacking a matching warehouse goods received note',
      'Changes to supplier banking details listed on the invoice'
    ],
    implementationStages: [
      {
        phase: 'Vendor Profile Assessment',
        description: 'Review top supplier invoice formats and key matching fields.',
        deliverable: 'Vendor validation criteria'
      },
      {
        phase: 'Connector Setup',
        description: 'Connect to ERP purchase order and bill endpoints.',
        deliverable: 'Active intake pipeline'
      },
      {
        phase: 'Supervised Trial Run',
        description: 'Process incoming bills in review mode where staff verify extracted figures.',
        deliverable: 'Accuracy report'
      },
      {
        phase: 'Autonomous Processing',
        description: 'Enable automatic posting for clean matches, routing only flagged variances.',
        deliverable: 'Production deployment'
      }
    ],
    clientResponsibilities: [
      'Maintain purchase orders and receiving notes in the ERP',
      'Provide read and write credentials to purchasing and billing modules',
      'Designate purchasing staff to review pricing or quantity exceptions'
    ]
  },
  {
    id: 'customer-onboarding',
    slug: 'customer-onboarding',
    name: 'Customer Onboarding Automation',
    tagline: 'Coordinates customer records, registry checks, and account setup across CRM and ERP.',
    operationalResult: 'Validates corporate entities, provisions ERP accounts, and alerts teams if documents are missing.',
    category: 'Customer & Onboarding',
    inputs: [
      'Customer intake forms from website or client portal',
      'Signed contract webhooks from digital signature tools',
      'Official company registration numbers and tax documents'
    ],
    actions: [
      'Verifies company details against official business registries',
      'Creates customer profile and billing records in CRM and ERP',
      'Sets approved credit limits according to company policy',
      'Dispatches initial welcome pack with account reference'
    ],
    exceptions: [
      'Registration numbers failing official registry verification',
      'Credit score recommendations below internal policy threshold',
      'Missing corporate tax certificates or required director signatures'
    ],
    compatibility: {
      platforms: ['Salesforce', 'HubSpot CRM', 'Odoo Contacts', 'Zoho CRM & Books'],
      accessRequirements: [
        'Read and write access to customer contacts and credit terms',
        'Webhook notifications from contract signing tools',
        'Access to corporate registry lookup APIs'
      ]
    },
    problemDescription: 'When sales closes a contract, onboarding stalls while staff re-type company data into CRM records, billing tools, and delivery portals. Delays in credit checks cause billing errors on the very first invoice.',
    intendedResult: 'A signed contract creates clean, synchronized customer records across sales and accounting software in minutes. Staff only step in when an entity fails legal checks.',
    workflowStages: [
      {
        title: 'Contract Intake',
        detail: 'Customer completes digital agreement or onboarding questionnaire.',
        actor: 'External Input'
      },
      {
        title: 'Entity Validation',
        detail: 'Validates company registration and VAT status against public registries.',
        actor: 'AURMAK Layer'
      },
      {
        title: 'Record Provisioning',
        detail: 'Generates synchronized customer records in CRM and ERP.',
        actor: 'Connected Application'
      },
      {
        title: 'Account Confirmation',
        detail: 'Dispatches operational welcome pack and account reference.',
        actor: 'AURMAK Layer'
      },
      {
        title: 'Compliance Review',
        detail: 'Flags unverified entities or high-risk scores to legal or finance teams.',
        actor: 'Human Reviewer'
      }
    ],
    dataRead: [
      'Signed contract fields, legal company name, and registration number',
      'Contact names, authorized signers, and billing email addresses',
      'Configured credit limit rules and payment term policies'
    ],
    dataWritten: [
      'Synchronized customer master records in CRM and accounting systems',
      'Assigned credit terms and default tax treatment rules',
      'Audit log with registry verification certificate'
    ],
    humanApprovalRules: [
      'Business address failing official registry match',
      'Credit limit requests higher than standard policy limits',
      'High-risk industry classifications requiring compliance review'
    ],
    implementationStages: [
      {
        phase: 'Field Mapping',
        description: 'Map mandatory fields across CRM, billing engine, and ERP.',
        deliverable: 'Field mapping dictionary'
      },
      {
        phase: 'Registry Connector Setup',
        description: 'Configure corporate registry lookup services and format validation.',
        deliverable: 'Verification test harness'
      },
      {
        phase: 'End-to-End Simulation',
        description: 'Simulate submissions through contract signing to ERP account creation.',
        deliverable: 'Sandbox audit trail'
      },
      {
        phase: 'Live Activation',
        description: 'Connect live intake forms and train staff on exception review.',
        deliverable: 'Production deployment'
      }
    ],
    clientResponsibilities: [
      'Provide schema documentation for custom fields in CRM and ERP',
      'Establish company policy for credit limits and default payment terms',
      'Nominate team members responsible for resolving onboarding exceptions'
    ]
  },
  {
    id: 'inventory-stock-adjustment',
    slug: 'inventory-stock-adjustment',
    name: 'Stock Discrepancy & ERP Adjustment Automation',
    tagline: 'Compares warehouse cycle counts and 3PL reports with ERP inventory balances.',
    operationalResult: 'Reconciles routine variance within tolerance and routes major count differences to warehouse leads.',
    category: 'Inventory & ERP',
    inputs: [
      'Barcode scanner batch exports from cycle counts',
      'Third-party logistics (3PL) daily stock snapshot files',
      'Returns processing logs from customer fulfillment hubs'
    ],
    actions: [
      'Compares third-party inventory against ERP warehouse stock',
      'Posts routine adjustment vouchers for variances inside tolerance',
      'Updates product lot tracking and expiry status in the ERP',
      'Generates daily reconciliation ledger for inventory accountants'
    ],
    exceptions: [
      'Count discrepancies exceeding value or quantity thresholds',
      'Unmatched SKU codes missing from ERP master catalog',
      'Discrepancies on serialized or bonded warehouse items'
    ],
    compatibility: {
      platforms: ['Odoo Inventory', 'Zoho Inventory', 'SAP Business One', 'Custom WMS Databases'],
      accessRequirements: [
        'Read access to current stock on hand, valuation costs, and SKUs',
        'Write access to inventory adjustment journals',
        'Scheduled file exchange via SFTP or automated cloud sync'
      ]
    },
    problemDescription: 'Companies using third-party warehouses or running physical counts suffer from persistent drift between shelf inventory and the ERP balance. Reconciling thousands of SKUs by hand takes days, causing stockouts or phantom sales.',
    intendedResult: 'Routine counting differences within accepted operational tolerances update the ERP automatically. Real stock anomalies isolate immediately, preventing unfulfilled orders.',
    workflowStages: [
      {
        title: 'Inventory Feed Intake',
        detail: 'Receives periodic reports from 3PL partners or handheld scanners.',
        actor: 'External Input'
      },
      {
        title: 'SKU & Quantity Comparison',
        detail: 'Matches report SKUs against ERP balances and calculates unit variance.',
        actor: 'AURMAK Layer'
      },
      {
        title: 'Tolerance Check',
        detail: 'Verifies whether unit discrepancy falls within agreed shrinkage tolerance.',
        actor: 'AURMAK Layer'
      },
      {
        title: 'ERP Stock Adjustment',
        detail: 'Posts standard adjustment entries with reason codes in the ERP.',
        actor: 'Connected Application'
      },
      {
        title: 'Critical Variance Review',
        detail: 'Elevates high-value variances to the supply chain director for review.',
        actor: 'Human Reviewer'
      }
    ],
    dataRead: [
      'Stock on hand by warehouse location and lot number',
      'Standard cost valuations and product category shrinkage thresholds',
      'Warehouse movement logs and in-transit shipment records'
    ],
    dataWritten: [
      'Stock adjustment vouchers with detailed line item audit notes',
      'Updated inventory quantity on hand by location',
      'Reconciliation summary log showing matched versus flagged SKUs'
    ],
    humanApprovalRules: [
      'Single SKU variance exceeding 500 currency units in value',
      'Discrepancies on high-theft or hazardous material categories',
      'Unrecognised SKU identifiers that do not exist in the ERP catalog'
    ],
    implementationStages: [
      {
        phase: 'Inventory Model Design',
        description: 'Review product categories, valuation methods, and variance thresholds.',
        deliverable: 'Variance threshold policy'
      },
      {
        phase: '3PL & ERP Connector Setup',
        description: 'Connect automated feeds and establish API access to adjustment endpoints.',
        deliverable: 'Active data ingestion pipeline'
      },
      {
        phase: 'Validation Simulation',
        description: 'Test incoming snapshots against historical ERP inventory balances.',
        deliverable: 'Historical reconciliation report'
      },
      {
        phase: 'Operational Cutover',
        description: 'Deploy automated adjustment writes and establish exception alerts.',
        deliverable: 'Production activation'
      }
    ],
    clientResponsibilities: [
      'Ensure 3PL or cycle count files follow a consistent format',
      'Provide read and write credentials to inventory adjustment endpoints',
      'Designate inventory manager to review large-variance escalation items'
    ]
  },
  {
    id: 'contract-milestone-billing',
    slug: 'contract-milestone-billing',
    name: 'Contract Milestone Billing & Subscription Sync',
    tagline: 'Synchronizes delivery milestone sign-offs with recurring billing and revenue recognition.',
    operationalResult: 'Issues approved invoices as milestones complete, keeping revenue recognition synchronized.',
    category: 'Operations & Logistics',
    inputs: [
      'Project milestone completion webhooks',
      'Signed delivery acceptance certificates',
      'Usage metrics exported from operational platforms'
    ],
    actions: [
      'Matches completed deliverables with contract payment milestones',
      'Generates customer invoices in accounting software',
      'Allocates deferred and recognized revenue to correct periods',
      'Dispatches invoice with attached sign-off certificates'
    ],
    exceptions: [
      'Milestones marked complete without customer sign-off certificate',
      'Usage metrics that deviate sharply from historical patterns',
      'Contracts with custom billing conditions requiring partner review'
    ],
    compatibility: {
      platforms: ['Odoo Subscriptions', 'Zoho Books', 'Custom Billing Engines'],
      accessRequirements: [
        'Read access to project milestone records and billing schedules',
        'Write access to customer invoice drafting and revenue schedules',
        'Webhook connectivity from project management software'
      ]
    },
    problemDescription: 'Professional service firms frequently delay billing because delivery teams complete milestones without notifying finance. Invoices sit unissued for weeks, damaging cash flow and revenue recognition audits.',
    intendedResult: 'When a project milestone is signed off, an invoice generates in the accounting system with the certificate attached. Invoicing occurs without delays, and finance only manages flagged exceptions.',
    workflowStages: [
      {
        title: 'Milestone Notification',
        detail: 'Receives webhook confirming delivery acceptance.',
        actor: 'External Input'
      },
      {
        title: 'Contract Schedule Check',
        detail: 'Verifies milestone against contract terms and checks prior billings.',
        actor: 'AURMAK Layer'
      },
      {
        title: 'Invoice & Revenue Creation',
        detail: 'Generates customer invoice and schedules revenue recognition in ERP.',
        actor: 'Connected Application'
      },
      {
        title: 'Invoice Dispatch',
        detail: 'Sends invoice with attached acceptance documentation to client billing contact.',
        actor: 'AURMAK Layer'
      },
      {
        title: 'Variance Exception',
        detail: 'Routes milestones with missing documentation to the engagement director.',
        actor: 'Human Reviewer'
      }
    ],
    dataRead: [
      'Milestone completion timestamps and attached certificates',
      'Contract billing schedules, pricing terms, and revenue rules',
      'Customer billing contacts and preferred invoicing methods'
    ],
    dataWritten: [
      'Finalized customer invoices in the accounting module',
      'Revenue recognition schedule entries aligned to project periods',
      'Audit log linking project delivery records to issued invoice numbers'
    ],
    humanApprovalRules: [
      'Milestones missing a signed acceptance document',
      'Invoiced amounts exceeding the remaining contract cap',
      'Contracts requiring executive approval before bill dispatch'
    ],
    implementationStages: [
      {
        phase: 'Contract Structure Review',
        description: 'Define standard milestone billing terms and revenue schedules.',
        deliverable: 'Standard billing rules matrix'
      },
      {
        phase: 'Connector Setup',
        description: 'Connect project webhooks and configure invoice creation endpoints.',
        deliverable: 'End-to-end sandbox event listener'
      },
      {
        phase: 'Parallel Testing',
        description: 'Monitor milestone completions over one billing cycle with manual review.',
        deliverable: 'Billing accuracy audit report'
      },
      {
        phase: 'Live Rollout',
        description: 'Activate automated invoice creation and exception alerts.',
        deliverable: 'Production activation'
      }
    ],
    clientResponsibilities: [
      'Ensure project teams attach client acceptance certificates to milestone records',
      'Provide read and write API access to billing and project modules',
      'Designate project directors to review billing exceptions'
    ]
  },
  {
    id: 'email-client-addon',
    slug: 'email-client-addon',
    name: 'Email Add-on for Outlook & Gmail',
    tagline: 'An inbox add-in that turns incoming emails and attachments into automated actions.',
    operationalResult: 'Staff capture attachments into the automation and clear exceptions without leaving their inbox.',
    category: 'Email & Productivity',
    inputs: [
      'Incoming emails with PDF, Excel, or image attachments',
      'Forwarded supplier, customer, or bank correspondence',
      'Approval replies from staff inside the inbox'
    ],
    actions: [
      'Adds an AURMAK panel inside Outlook and Gmail',
      'Extracts attachments and pushes them into the matching automation',
      'Surfaces pending exceptions for one-click approval in the inbox',
      'Writes the resolved action back to your ERP'
    ],
    exceptions: [
      'Attachments in an unrecognised format or layout',
      'Emails that match more than one open case',
      'Approvals that exceed a user’s authority limit'
    ],
    compatibility: {
      platforms: ['Microsoft Outlook', 'Gmail / Google Workspace', 'Microsoft 365', 'Odoo', 'Zoho Books'],
      accessRequirements: [
        'Add-in install permission in Microsoft 365 or Google Workspace',
        'Scoped mailbox read for the monitored shared inbox',
        'Write access to the connected ERP for approved actions'
      ]
    },
    problemDescription: 'Most operational documents still arrive by email, so staff copy attachments out of their inbox, retype the details into the ERP, and chase approvals in long email threads. The work lives in two places at once.',
    intendedResult: 'The inbox becomes the front door to the automation. Attachments flow straight into the pipeline and exceptions are approved where the email already sits. No re-keying, no separate portal.',
    workflowStages: [
      {
        title: 'Inbox Capture',
        detail: 'The add-in detects relevant emails and reads their attachments inside Outlook or Gmail.',
        actor: 'External Input'
      },
      {
        title: 'Extraction & Routing',
        detail: 'AURMAK extracts the document fields and matches the email to the right automation.',
        actor: 'AURMAK Layer'
      },
      {
        title: 'In-Inbox Review',
        detail: 'Pending exceptions appear in the add-in panel for one-click approval by the assigned user.',
        actor: 'Human Reviewer'
      },
      {
        title: 'ERP Write-Back',
        detail: 'The approved action posts to the connected ERP, with a record kept against the original email.',
        actor: 'Connected Application'
      }
    ],
    dataRead: [
      'Subject, sender, and body of monitored emails',
      'Attachment contents for extraction',
      'ERP records needed to match the email to an open case'
    ],
    dataWritten: [
      'Approved postings and status updates in the ERP',
      'A processing note and audit link back to the source email'
    ],
    humanApprovalRules: [
      'An attachment cannot be confidently extracted',
      'A user acts above their configured approval limit',
      'An email matches no open case, or several at once'
    ],
    implementationStages: [
      {
        phase: 'Add-in Deployment',
        description: 'Publish the AURMAK add-in to your Microsoft 365 or Google Workspace tenant.',
        deliverable: 'Installed add-in for the pilot users'
      },
      {
        phase: 'Inbox & Field Mapping',
        description: 'Map the monitored inboxes, attachment types, and target ERP fields.',
        deliverable: 'Configured capture rules'
      },
      {
        phase: 'Supervised Pilot',
        description: 'Run alongside the team so every extraction and approval is checked.',
        deliverable: 'Validated accuracy report'
      },
      {
        phase: 'Rollout',
        description: 'Enable the add-in for the wider team with live ERP write-backs.',
        deliverable: 'Live inbox automation'
      }
    ],
    clientResponsibilities: [
      'Approve the add-in in your Microsoft 365 or Google Workspace admin',
      'Nominate the shared inboxes to monitor',
      'Confirm approval limits for each user role'
    ]
  }
];
