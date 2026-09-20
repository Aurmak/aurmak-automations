import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AutomationDetailPage } from './pages/AutomationDetailPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { CookiesPage } from './pages/CookiesPage';
import { TermsPage } from './pages/TermsPage';

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
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-aurmak-bg text-aurmak-text bg-tech-pattern">
        <Navbar />
        <main className="flex-grow">
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
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
