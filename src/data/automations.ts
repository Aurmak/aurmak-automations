import { AutomationProduct } from '../types/automation';

export const AUTOMATIONS_DATA: AutomationProduct[] = [
  {
    id: 'payment-reconciliation',
    slug: 'payment-reconciliation',
    group: 'Finance',
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
    group: 'Finance',
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
    group: 'Operations',
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
    group: 'Operations',
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
    group: 'Finance',
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
    group: 'Productivity',
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
  },
  {
    id: 'school-operations',
    slug: 'school-operations',
    group: 'Operations',
    name: 'School Operations Automation',
    tagline: 'A layer over your existing school system that watches its records and chases fees, attendance, and homework.',
    operationalResult: 'Sends fee, attendance, and homework reminders on its own, while every change to a record waits for a person to confirm it.',
    category: 'Schools & Education',
    inputs: [
      'Your existing school management system (fees, attendance, exams, timetable)',
      'Fee challans, due dates, and payment records',
      'Daily attendance registers, homework, leave applications, and parent queries'
    ],
    actions: [
      'Reminds guardians by SMS when a challan is due or overdue',
      'Chases teachers whose register is not marked, then the class teacher',
      'Drafts attendance warning and arrears letters and holds them for a signature',
      'Flags a five-point result drop to the class teacher and sends a Monday finance digest'
    ],
    exceptions: [
      'Anything that changes a record, which always waits for a person to confirm',
      'Attendance warning letters and three-month arrears escalations',
      'First replies to parent queries, drafted from your own policy documents'
    ],
    compatibility: {
      platforms: ['In-house school management systems', 'Student information systems (SIS)', 'Bahria Town School MIS', 'SMS and notification gateways'],
      accessRequirements: [
        'Read access to fees, attendance, homework, and exam records, scoped to each role',
        'Permission to send SMS and notices through your existing channels',
        'Your own permission rows so each person sees only what their role allows'
      ]
    },
    problemDescription: 'A school management system holds every fee, register, and result, but it cannot notice something and act on it. So a register goes unmarked, a challan slips past its due date, and a child stays below the promotion attendance rule until someone happens to look. The answer is already in the data; nobody is being told.',
    intendedResult: 'Nine rules watch the school’s own records continuously and act under the permissions of whoever they run for. A reminder goes out on its own; a letter or a record change is prepared and held until a person presses confirm. Staff spend their time on the exceptions, not on remembering.',
    workflowStages: [
      {
        title: 'Continuous Record Watch',
        detail: 'Reads fees, attendance, homework, and results from your school system, scoped to each role.',
        actor: 'External Input'
      },
      {
        title: 'Rule Evaluation',
        detail: 'Checks each rule live, such as challans due in three days or classes with no register today.',
        actor: 'AURMAK Layer'
      },
      {
        title: 'Message or Draft',
        detail: 'Sends the reminder itself, or prepares the letter, reply, or change and holds it.',
        actor: 'AURMAK Layer'
      },
      {
        title: 'Human Confirmation',
        detail: 'Anything that changes a record waits for the right person to review and confirm it.',
        actor: 'Human Reviewer'
      },
      {
        title: 'Write-Back',
        detail: 'The confirmed action posts to your school system through the same single commit step.',
        actor: 'Connected Application'
      }
    ],
    dataRead: [
      'Fee challans, due dates, balances, and arrears by family',
      'Daily attendance registers, the promotion attendance rule, and homework submissions',
      'Leave applications, parent queries, and exam results across sittings'
    ],
    dataWritten: [
      'SMS and notices to guardians, teachers, and approvers',
      'Drafted letters and replies held for approval, committed only after confirm',
      'A run log recording every action, who it ran for, and the permission behind it'
    ],
    humanApprovalRules: [
      'Every automation that changes a record, with no exception at any permission level',
      'Attendance warning letters and three-month arrears escalations before they leave',
      'The first reply to a parent query, drafted from policy but sent by a person'
    ],
    implementationStages: [
      {
        phase: 'System Mapping',
        description: 'Map your school system’s reads and endpoints so the layer points at your data with a base-URL swap.',
        deliverable: 'Connected demo school'
      },
      {
        phase: 'Permission Mapping',
        description: 'Bring in your own role and permission rows so each person sees exactly what they should.',
        deliverable: 'Role and capability map'
      },
      {
        phase: 'Supervised Pilot',
        description: 'Run the rules in review mode where every reminder and draft is checked before it goes out.',
        deliverable: 'Validated run log'
      },
      {
        phase: 'Live Rollout',
        description: 'Turn on automatic reminders and confirmed write-backs, with the switch for each rule in your hands.',
        deliverable: 'Production activation'
      }
    ],
    clientResponsibilities: [
      'Provide scoped API access to your school management system',
      'Share your role and permission rows so access matches your own policy',
      'Nominate the people who confirm letters, replies, and record changes'
    ]
  },
  {
    id: 'document-receipt-verification',
    slug: 'document-receipt-verification',
    group: 'Finance',
    name: 'Document & Receipt Verification',
    tagline: 'Reads deposit slips, cheques, and transfer proofs from a hot folder, checks each one twice, and matches it to your bank and ledger records.',
    operationalResult: 'Verifies every receipt against the real bank statement or ledger and recommends approve or reject, with a person signing off each decision until accuracy is proven.',
    category: 'Finance & Accounting',
    inputs: [
      'Files dropped into a watched hot folder on OneDrive, Google Drive, or a local server, so nobody uploads into the ERP',
      'Cash deposit slips, cheque photos, online transfer receipts, and internal vouchers',
      'Bank statements and cash ledgers delivered to their own separate reference folder'
    ],
    actions: [
      'Reads every document twice, with a Vision AI model and a separate OCR engine, then compares both',
      'Matches each receipt to the bank statement line, cash ledger, or Odoo record that proves it',
      'Applies your own SOP rules for cash, cheque, online, and internal receipts',
      'Recommends approve or reject in Odoo with the matching evidence and a clear reason attached'
    ],
    exceptions: [
      'The two reads disagree, or confidence falls below your threshold',
      'A cheque is returned or dishonoured, or one deposit is split across several receipts',
      'No unique match exists in the bank statement, cash ledger, or approved Odoo record'
    ],
    compatibility: {
      platforms: ['Odoo Enterprise', 'OneDrive / SharePoint hot folder', 'Google Drive hot folder', 'Local or on-premise server folder'],
      accessRequirements: [
        'A watched hot folder for incoming documents, and a separate one for bank and ledger records',
        'Read access to the bank statements, cash ledgers, and Odoo records used as the source of truth',
        'Write access to create the recommended receipt outcome in Odoo for a person to confirm'
      ]
    },
    problemDescription: 'Finance teams lose hours checking deposit slips, cheque images, and transfer proofs by hand against bank statements and the ERP. Small differences in a name, date, amount, or bank detail turn into accounting and compliance risk, and asking staff to upload each file into Odoo only adds another manual step to the day.',
    intendedResult: 'Staff drop the files into a hot folder, wherever they already keep them, and the work happens on its own. Each document is read twice, matched to the real bank or ledger record, checked against your rules, and brought to a person as a clear approve or reject with the evidence attached. It runs on your own isolated network, so the financial data never leaves, and nothing posts by itself until the accuracy is proven and you sign it off.',
    workflowStages: [
      {
        title: 'Hot Folder Drop',
        detail: 'Documents land in a watched folder on OneDrive, Google Drive, or a local server, so nobody has to upload anything into the ERP.',
        actor: 'External Input'
      },
      {
        title: 'Dual-Engine Extraction',
        detail: 'A local Vision AI model and a separate OCR engine each read the document, and middleware compares both results and their confidence before anything moves on.',
        actor: 'AURMAK Layer'
      },
      {
        title: 'Evidence & SOP Check',
        detail: 'The receipt is matched to the bank statement, cash ledger, or Odoo record and tested against your cash, cheque, online, and internal rules.',
        actor: 'AURMAK Layer'
      },
      {
        title: 'Recommended Outcome in Odoo',
        detail: 'An approve or reject recommendation is created in Odoo with the matching evidence kept and the reason recorded.',
        actor: 'Connected Application'
      },
      {
        title: 'Human Decision',
        detail: 'An authorised reviewer confirms or overrides every outcome, building the record that later earns controlled automation.',
        actor: 'Human Reviewer'
      }
    ],
    dataRead: [
      'Extracted fields from each receipt: amounts, dates, references, account and cheque numbers, and bank names',
      'Bank statement lines, authorised cash ledger entries, and approved Odoo records used as evidence',
      'Your SOP rules by receipt type, including weekend transfer and split-deposit handling'
    ],
    dataWritten: [
      'A recommended receipt outcome in Odoo, with the matching evidence retained for audit',
      'An explicit reason on every rejection, recorded against the Odoo record',
      'A decision history of reviewer approvals and corrections for measuring accuracy'
    ],
    humanApprovalRules: [
      'Every decision during the supervised period, until measured accuracy is proven',
      'Confidence at or below 95%, any failed SOP check, or missing or conflicting evidence',
      'Returned or dishonoured cheques, and deposits split across multiple receipts'
    ],
    implementationStages: [
      {
        phase: 'Discovery & SOP Capture',
        description: 'Confirm receipt types, SOP rules, sample documents, and the hot folders to watch.',
        deliverable: 'Agreed rules and folder map'
      },
      {
        phase: 'On-Premise Setup',
        description: 'Deploy the local AI and OCR engines on an isolated network, with an encrypted sync to your Odoo data.',
        deliverable: 'Private processing environment'
      },
      {
        phase: 'Supervised Calibration',
        description: 'Run in propose-only mode on real documents while reviewers confirm or correct each outcome.',
        deliverable: 'Measured accuracy by document type'
      },
      {
        phase: 'Controlled Automation',
        description: 'Enable automatic reconciliation only for cases above 95% confidence that pass every rule, after your formal sign-off.',
        deliverable: 'Governed go-live'
      }
    ],
    clientResponsibilities: [
      'Provide the hot folders on your cloud or local server, and the bank and ledger reference records',
      'Give scoped read access to the records used as the source of truth, and write access to Odoo receipts',
      'Nominate authorised reviewers to confirm outcomes during the supervised period'
    ]
  },
  {
    id: 'ask-odoo-ai',
    slug: 'ask-odoo-ai',
    group: 'Productivity',
    name: 'Ask Odoo AI Reporting',
    tagline: 'Ask about your ledgers and projects in plain language and get answers from live Odoo data, with no report builder and no write access.',
    operationalResult: 'Turns a plain question like "list unpaid cheques" into a read-only answer from live Odoo data, and can never change a record.',
    category: 'Reporting & Insights',
    inputs: [
      'Plain-language questions typed inside Odoo, in everyday English',
      'Live Odoo ledger, invoice, payment, and project data',
      'The role permissions of whoever is asking, so each person queries only what they may see'
    ],
    actions: [
      'Turns the question into a controlled, read-only database query',
      'Reads the returned Odoo data and writes a clear, plain-language answer',
      'Runs fully inside your private environment, with no data sent to a public AI service',
      'Answers routine finance and project questions without building a custom report'
    ],
    exceptions: [
      'A question that would need writing, editing, or deleting data, which it refuses by design',
      'A request that reaches beyond the asker’s permissions',
      'A question the available data cannot answer, which it says plainly rather than guessing'
    ],
    compatibility: {
      platforms: ['Odoo Enterprise', 'On-premise or local server', 'Private cloud'],
      accessRequirements: [
        'Strictly read-only database access, with no write path of any kind',
        'Your role permissions mapped so answers respect who is asking',
        'A local text model running inside your own environment'
      ]
    },
    problemDescription: 'Getting a straight answer out of an ERP usually means finding the right report, exporting it, or asking whoever knows where to look. Simple questions, like which cheques are unpaid or where a project stands, sit one query away but not in a form most staff can reach on their own.',
    intendedResult: 'Anyone authorised can ask in plain language and get the answer from live data, right inside Odoo. The assistant only ever reads: it can retrieve and explain, but it cannot create, change, or delete a single record, and it runs on your own servers so the data never leaves.',
    workflowStages: [
      {
        title: 'Ask in Plain Language',
        detail: 'A member of staff types a question inside Odoo, such as "list unpaid cheques".',
        actor: 'External Input'
      },
      {
        title: 'Controlled Read-Only Query',
        detail: 'The question becomes a safe, read-only database request, scoped to what the asker is allowed to see.',
        actor: 'AURMAK Layer'
      },
      {
        title: 'Read From Odoo',
        detail: 'The query runs against live Odoo data with read-only access and returns only the rows that person may see.',
        actor: 'Connected Application'
      },
      {
        title: 'Plain-Language Answer',
        detail: 'A local text model turns the returned data into a clear answer, and never writes anything back.',
        actor: 'AURMAK Layer'
      }
    ],
    dataRead: [
      'Live Odoo ledgers, invoices, payments, and project records within the asker’s permissions',
      'The plain-language question and the fields it refers to',
      'Your role permissions, applied to every query'
    ],
    dataWritten: [
      'Nothing to your records: the assistant has no write path and cannot change Odoo data',
      'An optional local log of the questions asked, kept for your own review'
    ],
    humanApprovalRules: [
      'Any request that would change data is refused outright, so no approval path exists',
      'Questions that reach beyond the asker’s permissions return nothing',
      'The assistant flags when the data cannot answer a question instead of guessing'
    ],
    implementationStages: [
      {
        phase: 'Question & Data Mapping',
        description: 'Agree the common questions, the Odoo data behind them, and the read-only scopes per role.',
        deliverable: 'Query scope and permission map'
      },
      {
        phase: 'Local Model Setup',
        description: 'Deploy the text model inside your environment with strictly read-only database access.',
        deliverable: 'Private conversational agent'
      },
      {
        phase: 'Supervised Testing',
        description: 'Check answers against known reports across roles and question types.',
        deliverable: 'Validated answer set'
      },
      {
        phase: 'Rollout',
        description: 'Open the assistant to authorised staff inside Odoo.',
        deliverable: 'Live reporting assistant'
      }
    ],
    clientResponsibilities: [
      'Provide read-only database access and confirm the role permissions to respect',
      'Share the common questions and existing reports to validate answers against',
      'Nominate the staff who may use the assistant'
    ]
  }
];
