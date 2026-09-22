import React from 'react';
import { Badge } from '../components/ui/Badge';
import { Seo } from '../components/Seo';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      <Seo
        title="Privacy & Data Handling"
        description="How AURMAK handles your data: only the access we need to your systems, a full log of every action, and AI that runs on your own servers when your data cannot leave."
        path="/privacy"
      />
      <div className="border-b border-aurmak-border pb-6 space-y-3">
        <Badge variant="navy">Legal & Compliance</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-aurmak-navy tracking-tight">
          Privacy and Data Handling Policy
        </h1>
        <p className="text-sm text-aurmak-textMuted font-mono">
          Last revised: September 2026 | Scope: automations.aurmak.com
        </p>
      </div>

      <div className="bg-white rounded-sm border border-aurmak-border shadow-execoore p-8 md:p-10 space-y-8 text-sm text-aurmak-text leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-aurmak-navy tracking-tight">1. Architectural Data Boundary</h2>
          <p>
            AURMAK Automations operates as an external automation layer. In standard deployment, the client business applications (such as Odoo, Zoho, SAP, or custom databases) remain the permanent system of record. AURMAK processes transactional payloads transiently to perform validation checks, rule execution, and system write-backs.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-aurmak-navy tracking-tight">2. Website Enquiries and Contact Information</h2>
          <p>
            When you submit a demo request or custom automation enquiry through this website, we collect contact information including your name, work email address, organisation name, and technical details regarding your target processes. This information is used solely to respond to your enquiry, evaluate process feasibility, and schedule consultations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-aurmak-navy tracking-tight">3. Confidential Business Documents</h2>
          <p>
            We explicitly request that prospective clients do not upload confidential financial records, proprietary trade secrets, or unredacted personal identifiers through initial web forms. When sample datasets are required for sandbox testing, they are handled under signed non-disclosure agreements through encrypted transfer endpoints.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-aurmak-navy tracking-tight">4. Telemetry and Analytics</h2>
          <p>
            The public website collects basic operational telemetry including page views, referrer data, and technical diagnostic logs to maintain performance and identify usability issues. We do not sell behavioural data or share visitor records with advertising brokers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-aurmak-navy tracking-tight">5. Data Retention and Deletion</h2>
          <p>
            Enquiry records are retained only as long as necessary to conduct commercial discussions or as required by regulatory compliance. You may request the export or deletion of your contact records at any time by contacting privacy@aurmak.com.
          </p>
        </section>
      </div>
    </div>
  );
};
