import React, { Suspense, lazy, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import { CookieConsentProvider } from './components/privacy/CookieConsent';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
// HomePage stays eager: it's the landing route and LCP target.
import { HomePage } from './pages/HomePage';
// Secondary routes are split into their own chunks, loaded on demand.
const AutomationDetailPage = lazy(() => import('./pages/AutomationDetailPage').then((m) => ({ default: m.AutomationDetailPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })));
const CookiesPage = lazy(() => import('./pages/CookiesPage').then((m) => ({ default: m.CookiesPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));

// Scroll to top helper on navigation
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Wait for the target section to be laid out (redirects mount it the same
    // frame), retrying briefly before giving up.
    const id = hash.replace('#', '');
    let attempts = 0;
    const scrollToTarget = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (attempts++ < 10) {
        requestAnimationFrame(scrollToTarget);
      }
    };
    requestAnimationFrame(scrollToTarget);
  }, [pathname, hash]);

  return null;
};

// Preserve the automation id when redirecting the old catalogue detail route.
const RedirectSolution: React.FC = () => {
  const { id } = useParams();
  return <Navigate to={`/solutions/${id}`} replace />;
};

export const App: React.FC = () => {
  return (
    <MotionConfig reducedMotion="user">
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <CookieConsentProvider>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-aurmak-bg text-aurmak-text">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/solutions" element={<Navigate to="/#solutions" replace />} />
            <Route path="/solutions/:id" element={<AutomationDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* Redirects from the previous information architecture */}
            <Route path="/catalogue" element={<Navigate to="/#solutions" replace />} />
            <Route path="/catalogue/:id" element={<RedirectSolution />} />
            <Route path="/demonstration" element={<Navigate to="/contact" replace />} />
            <Route path="/industries" element={<Navigate to="/#solutions" replace />} />
            <Route path="/get-started" element={<Navigate to="/contact" replace />} />
            <Route path="/custom" element={<Navigate to="/contact" replace />} />
            <Route path="/how-it-works" element={<Navigate to="/" replace />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
      </CookieConsentProvider>
    </BrowserRouter>
    </MotionConfig>
  );
};

export default App;
