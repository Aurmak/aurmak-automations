// components/ui/gradient-card.tsx

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { cn } from '../../lib/utils';

// One distinct tint per card. All are light enough that dark navy text keeps a
// comfortable contrast, so no two automations ever share a colour.
const cardVariants = cva(
  'relative flex flex-col justify-between h-full w-full overflow-hidden rounded-2xl p-8 shadow-execoore transition-shadow duration-300 hover:shadow-execoore-hover',
  {
    variants: {
      gradient: {
        amber: 'bg-gradient-to-br from-amber-50 to-amber-100/70',
        red: 'bg-gradient-to-br from-red-50 to-red-100/70',
        emerald: 'bg-gradient-to-br from-emerald-50 to-emerald-100/70',
        blue: 'bg-gradient-to-br from-blue-50 to-blue-100/70',
        violet: 'bg-gradient-to-br from-violet-50 to-violet-100/70',
        pink: 'bg-gradient-to-br from-pink-50 to-pink-100/70',
        indigo: 'bg-gradient-to-br from-indigo-50 to-indigo-100/70',
        teal: 'bg-gradient-to-br from-teal-50 to-teal-100/70',
        orange: 'bg-gradient-to-br from-orange-50 to-orange-100/70'
      }
    },
    defaultVariants: {
      gradient: 'amber'
    }
  }
);

export interface GradientCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  badgeText: string;
  /** Hex colour for the badge status dot, e.g. "#03BFCB". */
  badgeColor: string;
  title: string;
  description: string;
  ctaText: string;
  /** Internal route ("/solutions/…") renders a router Link; anything else, a plain anchor. */
  ctaHref: string;
  /** Optional decorative graphic. Takes precedence over `icon`. */
  imageUrl?: string;
  /** Decorative icon drawn faintly in the bottom-right corner (e.g. a lucide icon). */
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  /** Draws the AURMAK action ring for a highlighted card. */
  featured?: boolean;
}

const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  (
    { className, gradient, badgeText, badgeColor, title, description, ctaText, ctaHref, imageUrl, icon: Icon, featured, ...props },
    ref
  ) => {
    const cardAnimation = {
      rest: { scale: 1, y: 0 },
      hover: { scale: 1.02, y: -4 }
    };

    const decorAnimation = {
      rest: { scale: 1, rotate: 0 },
      hover: { scale: 1.08, rotate: 3 }
    };

    const isInternal = ctaHref.startsWith('/');

    // The whole card is a single link. `title` is plain text and "View details"
    // is a visual cue, so there is exactly one clickable target and no nested links.
    const Wrapper = (isInternal ? Link : 'a') as React.ElementType;
    const wrapperProps = isInternal ? { to: ctaHref } : { href: ctaHref };

    return (
      <motion.div
        variants={cardAnimation}
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="h-full"
        ref={ref}
      >
        <Wrapper
          {...wrapperProps}
          className={cn(
            cardVariants({ gradient }),
            'group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurmak-action focus-visible:ring-offset-2 focus-visible:ring-offset-aurmak-bg',
            featured && 'ring-2 ring-aurmak-action ring-offset-2 ring-offset-aurmak-bg',
            className
          )}
          {...props}
        >
          {/* Decorative graphic */}
          {imageUrl ? (
            <motion.img
              src={imageUrl}
              alt=""
              aria-hidden="true"
              variants={decorAnimation}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="absolute -right-1/4 -bottom-1/4 w-3/4 opacity-80 pointer-events-none"
            />
          ) : Icon ? (
            <motion.div
              aria-hidden="true"
              variants={decorAnimation}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="absolute right-3 bottom-3 pointer-events-none"
            >
              <Icon className="w-20 h-20 opacity-20" style={{ color: badgeColor }} />
            </motion.div>
          ) : (
            <motion.div
              aria-hidden="true"
              variants={decorAnimation}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="absolute -right-10 -bottom-12 pointer-events-none"
            >
              <div className="w-40 h-40 rounded-full border-2 border-aurmak-navy/10" />
              <div className="absolute right-6 bottom-8 w-20 h-20 rounded-sm border-2 border-aurmak-action/30" />
            </motion.div>
          )}

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm font-medium text-aurmak-navy backdrop-blur-sm w-fit border border-white/60">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: badgeColor }} />
              {badgeText}
            </div>

            {/* Title and description */}
            <div className="flex-grow">
              <h3 className="text-2xl font-bold font-sans text-aurmak-navy leading-snug mb-2 transition-colors group-hover:text-aurmak-actionText">{title}</h3>
              <p className="text-base text-aurmak-text leading-relaxed">{description}</p>
            </div>

            {/* Call to action cue (not a separate link; the whole card is clickable) */}
            <span className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-aurmak-navy transition-colors group-hover:text-aurmak-actionText">
              {ctaText}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </Wrapper>
      </motion.div>
    );
  }
);
GradientCard.displayName = 'GradientCard';

export { GradientCard, cardVariants };
