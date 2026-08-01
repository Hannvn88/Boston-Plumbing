// FadeUp.jsx — reusable Framer Motion wrapper: fades content in and up when
// it first scrolls into view (once per element, never re-triggered on the way
// back up). With reduced motion preferred, content renders instantly instead.
import React from 'react';
import { m, useReducedMotion } from 'framer-motion';

// Wraps children in a scroll-triggered fade-in-up animation
export default function FadeUp({ children, delay = 0, className }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </m.div>
  );
}
