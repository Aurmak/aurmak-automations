import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'outlineInverse' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-sans font-semibold tracking-wide transition-all duration-200 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurmak-action focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const sizeClasses = {
    sm: 'text-sm px-3.5 py-2 min-h-[36px] gap-1.5',
    md: 'text-sm px-5 py-2.5 min-h-[42px] gap-2',
    lg: 'text-sm sm:text-base px-7 py-3.5 min-h-[48px] gap-2.5'
  }[size];

  // Cyan (#03BFCB) is a light fill: it needs DARK text to meet contrast, not white.
  // Navy is a dark fill: it needs white text. Hovers stay within the same lightness band
  // so the label never drops below AA.
  const variantClasses = {
    primary: 'bg-aurmak-action text-aurmak-navyDark hover:bg-aurmak-actionHover active:bg-aurmak-actionHover shadow-sm',
    secondary: 'bg-aurmak-navy text-white hover:bg-aurmak-primaryHover active:bg-aurmak-navyDark shadow-sm',
    outline: 'bg-transparent text-aurmak-navy border-2 border-aurmak-navy hover:bg-aurmak-navy hover:text-white',
    // For dark backgrounds (hero): white border/text, fills white with navy text on hover.
    outlineInverse: 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-aurmak-navy',
    ghost: 'bg-transparent text-aurmak-navy hover:bg-aurmak-subtle',
    danger: 'bg-aurmak-danger text-white hover:bg-red-700 active:bg-red-800'
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
