// FadeUp.jsx — reusable Framer Motion wrapper: fades content in and up
// when it scrolls into view (runs once per element). Tuned slow and soft
// so sections reveal smoothly rather than popping in.
import React from 'react';
import { motion } from 'framer-motion';

// Wraps children in a scroll-triggered fade-in-up animation
export default function FadeUp({ children, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
