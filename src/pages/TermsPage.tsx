import React from 'react';
import { Badge } from '../components/ui/Badge';
import { Seo } from '../components/Seo';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      <Seo
        title="Terms of Service"
        description="The terms governing use of AURMAK automation services, including scope of work, access, responsibilities, and service boundaries."
        path="/terms"
      />
      <div className="border-b border-aurmak-border pb-6 space-y-3">
        <Badge variant="navy">Service Boundaries</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-aurmak-navy tracking-tight">
          Terms of Service and Operational Boundaries
        </h1>
        <p className="text-sm text-aurmak-textMuted font-mono">
          Last revised: September 2026 | Scope: automations.aurmak.com
        </p>
      </div>

      <div className="bg-white rounded-sm border border-aurmak-border shadow-execoore p-8 md:p-10 space-y-8 text-sm text-aurmak-text leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-aurmak-navy tracking-tight">1. Nature of the Offering</h2>
          <p>
            AURMAK Automations is a capability and product area within AURMAK. The website provides informational materials, product specifications, and enquiry channels for business process automations. Individual automation deployments are subject to formal statements of work and enterprise master service agreements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-aurmak-navy tracking-tight">2. Integration Prerequisites & Application Access</h2>
          <p>
            The operation of any automation depends upon the client providing authorized and functional API access, credentials, or scheduled data delivery (such as SFTP or webhook events) for their respective applications. AURMAK is not responsible for upstream third-party API deprecations, service outages, or unilateral permission changes initiated by platform vendors.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-aurmak-navy tracking-tight">3. System of Record Boundaries</h2>
          <p>
            The client application remains the sole system of record. AURMAK automations perform scheduled read queries, validation assessments, and authorized write-backs as directed by agreed business rules. AURMAK does not assume permanent custodial liability for business records stored in the client underlying applications.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-aurmak-navy tracking-tight">4. Human Oversight and Exception Review</h2>
          <p>
            AURMAK automations are engineered with deliberate exception routing. While standard transactions are automated according to configured rules, the client remains responsible for designating qualified personnel to review and resolve flagged exceptions, variances, and ambiguous records.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-aurmak-navy tracking-tight">5. Absence of Online Purchasing at Launch</h2>
          <p>
            This website does not currently provide an online shopping cart, automated payment gateway, or self-service license checkout. All automation deployments involve a technical validation phase and scoped commercial agreement.
          </p>
        </section>
      </div>
    </div>
  );
};
