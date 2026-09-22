import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../Seo';

export const PolicyLayout: React.FC<{ title: string; description: string; path: string; children: React.ReactNode }> = ({ title, description, path, children }) => (
  <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12 md:py-20">
    <Seo title={title} description={description} path={path} />
    <p className="text-sm uppercase tracking-widest font-semibold text-aurmak-actionText">AURMAK Automations</p>
    <h1 className="mt-4 text-4xl sm:text-5xl font-semibold">{title}</h1>
    <nav aria-label="Policies" className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-aurmak-actionText">
      {[['/privacy', 'Privacy policy'], ['/cookies', 'Cookies policy'], ['/terms', 'Terms & conditions']].map(([to, label]) => <Link key={to} to={to} aria-current={path === to ? 'page' : undefined} className="underline underline-offset-4">{label}</Link>)}
    </nav>
    <div className="mt-9 bg-white border border-aurmak-border rounded-2xl p-6 sm:p-10 space-y-9 text-base leading-relaxed">{children}</div>
  </div>
);

export const PolicySection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => <section className="space-y-3"><h2 className="text-xl font-semibold">{title}</h2>{children}</section>;
