import React from 'react';
import { ANALYTICS_ID } from '../lib/analytics';
import { Link } from 'react-router-dom';
import { PolicyLayout, PolicySection } from '../components/privacy/PolicyLayout';

export const PrivacyPage: React.FC = () => <PolicyLayout title="Privacy policy" description="How AURMAK Automations handles website enquiries, privacy preferences and technical information, and how to exercise your rights." path="/privacy">
  <PolicySection title="About this policy">
    <p>This policy covers the AURMAK Automations website and enquiries sent through it. AURMAK is responsible for the personal information used to handle these enquiries. Contact <Link className="underline text-aurmak-actionText" to="/contact">our contact team</Link> with a privacy question or request.</p>
    <p>Data handled during a client automation project is a separate matter. The applicable service agreement and data processing terms should identify the parties&rsquo; roles, permitted uses, service providers, security arrangements and retention requirements.</p>
  </PolicySection>
  <PolicySection title="Information you give us">
    <p>Our contact form collects your name, email address and any company name or message you provide. The automation planning form also collects your answers about your role, business, processes, volumes and software, and the estimate produced from those answers. Submissions include a submission time.</p>
    <p>We use this information to reply, understand your requirements, provide requested results and discuss a potential project. Required fields are marked with an asterisk. You do not have to submit an enquiry, but we need the required details to respond.</p>
    <p>Please do not include passwords, access credentials, payment details, sensitive personal information or confidential client records in these forms. Agree a suitable transfer method with us first if a project needs sample data.</p>
  </PolicySection>
  <PolicySection title="Why we use information">
    <p>For business enquiries and follow-up discussions, our legitimate interest is responding to requests and assessing whether our services meet a prospective customer&rsquo;s needs. Where you ask us to take steps towards a contract with you personally, that processing may instead be necessary for those pre-contractual steps.</p>
    <p>We use technical information to protect the website and prevent abuse, in our legitimate interest in operating a secure service. Optional analytics and external font requests rely on your permission through the privacy controls. Sending an enquiry does not sign you up to a marketing mailing list.</p>
    <p className="font-semibold">You can object to processing based on legitimate interests by contacting us.</p>
  </PolicySection>
  <PolicySection title="How enquiries are delivered">
    <p>The form service sends your submission to our team using Microsoft Graph and Microsoft email services. It also sends an acknowledgement or the requested automation results to the email address you provide. Enquiry records therefore exist in email systems; they are not limited to temporary processing within the website.</p>
    <p>Authorised people handling your enquiry and the providers operating our website and email infrastructure may process information for those purposes. Information may also need to be disclosed where the law requires it or to handle a legal claim.</p>
  </PolicySection>
  <PolicySection title="Technical information and optional services">
    <p>The enquiry endpoint uses a hashed IP address and recent request times to limit abusive submissions. It checks a rolling one-hour window; old rate-limit files are removed through periodic cleanup. Technical error logs are used to diagnose failed requests. Hosting infrastructure may also record IP addresses, request times, requested URLs and browser details in access and security logs.</p>
    <p>{ANALYTICS_ID ? 'With your permission, Google Analytics measures page visits and device usage using cookie identifiers. We disable advertising features and do not send contact form entries, URL query strings or URL fragments to analytics.' : 'Google Analytics is planned but is not currently enabled. It will only load after you opt in when it becomes available.'} We do not use advertising tracking. It stores your privacy preference locally on your device. If you permit external fonts, your browser sends request information, including your IP address, to Google. See our <Link to="/cookies" className="underline text-aurmak-actionText">cookies policy</Link> for the choices, storage duration and withdrawal process.</p>
    <p>Microsoft and Google operate internationally. The location and handling of provider data depend on the relevant service and account arrangements. Contact us for information about the arrangements relevant to your enquiry. Google explains its practices in its <a href="https://policies.google.com/privacy" className="underline text-aurmak-actionText">privacy policy</a>.</p>
  </PolicySection>
  <PolicySection title="How long information is kept">
    <p>Enquiry retention depends on whether a discussion is ongoing, becomes a client engagement, or is needed to resolve a dispute or meet a legal obligation. Information that is no longer needed for these purposes should be deleted. Mailbox, backup and infrastructure log retention are separate from the browser preference period described in the cookies policy.</p>
    <p>You can ask about the retention of your enquiry or request deletion. We will explain if information needs to be retained and why.</p>
  </PolicySection>
  <PolicySection title="Your rights and complaints">
    <p>Depending on the circumstances and applicable law, you can request access to your personal information, correction, deletion, restriction of use, or a portable copy. You can object to use based on legitimate interests and withdraw permission for optional services without affecting the lawfulness of earlier processing.</p>
    <p>Use <Link to="/contact" className="underline text-aurmak-actionText">our contact form</Link> to make a request. We may need information to verify your identity. Rights are subject to applicable conditions and exceptions.</p>
    <p>You can complain to the UK Information Commissioner&rsquo;s Office at <a href="https://ico.org.uk/make-a-complaint/" className="underline text-aurmak-actionText">ico.org.uk/make-a-complaint</a>, or your local data protection authority. You do not have to contact us first.</p>
  </PolicySection>
  <PolicySection title="Automated results and updates">
    <p>The planning tool produces indicative automation estimates from your answers. These are not decisions about your legal rights or eligibility for services. We may update this policy when our website or data handling changes.</p>
  </PolicySection>
</PolicyLayout>;
