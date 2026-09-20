import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'action' | 'success' | 'warning' | 'danger' | 'navy';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = ''
}) => {
  const base = 'inline-flex items-center px-2.5 py-1 text-sm font-mono font-semibold rounded-sm border uppercase tracking-wider';

  const variants = {
    neutral: 'bg-aurmak-subtle text-aurmak-textDark border-aurmak-border',
    action: 'bg-aurmak-action/10 text-aurmak-navy border-aurmak-action/40',
    navy: 'bg-aurmak-navy text-white border-aurmak-navy',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-300',
    warning: 'bg-amber-50 text-amber-700 border-amber-300',
    danger: 'bg-red-50 text-red-700 border-red-300'
  }[variant];

  return (
    <span className={`${base} ${variants} ${className}`}>
      {children}
    </span>
  );
};
