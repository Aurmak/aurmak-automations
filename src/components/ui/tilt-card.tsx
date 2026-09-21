import * as React from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt in degrees. */
  intensity?: number;
}

/**
 * Wraps its children with a subtle 3D tilt that follows the cursor.
 * Falls back to a plain, static wrapper when the viewer prefers reduced motion.
 * (Extracted from the shared 3d-card tilt logic; touch devices never fire the
 * mouse events, so they simply see the image flat.)
 */
export const TiltCard: React.FC<TiltCardProps> = ({ children, className, intensity = 9 }) => {
  const prefersReduced = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(springY, [-0.5, 0.5], [`${intensity}deg`, `${-intensity}deg`]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [`${-intensity}deg`, `${intensity}deg`]);

  // A drop shadow that shifts opposite the tilt, so the panel reads as lifted off the page.
  // At rest (0,0) it sits softly below the card; on tilt it slides to sell the depth.
  const shadowX = useTransform(springX, [-0.5, 0.5], [22, -22]);
  const shadowY = useTransform(springY, [-0.5, 0.5], [-6, 18]);
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px 26px rgba(2, 6, 23, 0.22)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ perspective: '1000px' }} className={className}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, boxShadow, transformStyle: 'preserve-3d' }}
        className={cn('h-full w-full rounded-xl will-change-transform')}
      >
        {children}
      </motion.div>
    </div>
  );
};
