import React from 'react';
import { Link } from 'react-router-dom';
import { PolicyLayout, PolicySection } from '../components/privacy/PolicyLayout';

export const TermsPage: React.FC = () => <PolicyLayout title="Terms & conditions" description="Terms for using the AURMAK Automations website, requesting information and understanding automation estimates and project agreements." path="/terms">
  <PolicySection title="Using this website">
    <p>AURMAK Automations provides information about business automation services and ways to contact our team. These terms apply to use of this website. They do not replace a signed agreement for services.</p>
    <p>For questions about the website or a potential project, use our <Link to="/contact" className="underline text-aurmak-actionText">contact form</Link>. Personal information and privacy choices are explained in our <Link to="/privacy" className="underline text-aurmak-actionText">privacy policy</Link> and <Link to="/cookies" className="underline text-aurmak-actionText">cookies policy</Link>.</p>
  </PolicySection>
  <PolicySection title="Information and estimates">
    <p>Descriptions, examples, demonstrations and planning estimates are provided to help you explore potential uses of automation. Estimates depend on your answers and modelling assumptions. They are indicative, are not a quotation or a guarantee of savings, and should be checked against your actual processes and costs.</p>
    <p>We aim to keep information accurate and current, but features, integrations and availability can change. Confirm any requirement that is important to your decision with us before relying on it.</p>
  </PolicySection>
  <PolicySection title="Enquiries and project agreements">
    <p>Submitting a form requests a response; it does not place an order or create a paid services agreement. This website does not offer online purchasing or payment processing.</p>
    <p>Before a project begins, its scope, fees, delivery arrangements, responsibilities, support, confidentiality, data protection and liability terms must be set out in a separate agreement. That agreement governs the services it covers.</p>
  </PolicySection>
  <PolicySection title="Responsible use">
    <p>Provide accurate contact details and only share information you are authorised to disclose. Do not submit unlawful content, malicious code or unsolicited bulk messages, attempt unauthorised access, or interfere with the website or its security controls.</p>
    <p>Do not send passwords, access tokens or sensitive business records through the enquiry forms. We may restrict access or reject requests to protect the website and its users from abuse.</p>
  </PolicySection>
  <PolicySection title="Website content and third parties">
    <p>Rights in our original website content and branding belong to AURMAK or its licensors. You may view and share links to public pages for legitimate business purposes. Do not misrepresent our content as your own or suggest an endorsement without permission. Third-party names and trademarks belong to their respective owners.</p>
    <p>Links to other websites are provided for convenience. Those sites have their own terms and privacy practices. Mentioning an integration does not imply endorsement by its provider or guarantee that it will work with every account, version or configuration.</p>
  </PolicySection>
  <PolicySection title="Automation responsibilities">
    <p>A deployment may depend on authorised application access, supported interfaces, suitable data and agreed business rules. Record keeping, backups, human approvals, exception handling and monitoring should be defined in the project agreement. Website descriptions do not transfer these responsibilities or establish a universal data storage arrangement.</p>
  </PolicySection>
  <PolicySection title="Availability and liability">
    <p>We may update, interrupt or withdraw website features, and cannot promise uninterrupted access. Take reasonable steps to protect your own systems and verify information before making business decisions.</p>
    <p>Nothing in these website terms excludes or limits liability where doing so would be unlawful, including liability for fraud, fraudulent misrepresentation, or death or personal injury caused by negligence. Nothing here limits rights that applicable law does not allow us to exclude. Liability for a paid project is addressed in its separate agreement.</p>
  </PolicySection>
  <PolicySection title="Changes to these terms"><p>We may revise these terms as the website changes. The date above shows when this version was updated. Changes to these website terms do not automatically amend an existing signed project agreement.</p></PolicySection>
</PolicyLayout>;
