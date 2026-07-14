// Hero.jsx — full-viewport asymmetrical hero: heading block on the LEFT, the
// "Get Help Now" CTA offset to the RIGHT with a handwritten "AI-Powered" note
// and curved arrow. The aurora animates behind everything.
import React from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import AuroraBackground from './AuroraBackground';

// Hand-drawn curved arrow that sweeps down toward the CTA button
function CurvedArrow() {
  return (
    <svg width="64" height="58" viewBox="0 0 64 58" fill="none" aria-hidden="true">
      {/* Curved shaft */}
      <path
        d="M6 6 C 34 2, 52 18, 55 44"
        stroke="#14432A"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrowhead */}
      <path
        d="M47 40 L55 48 L61 38"
        stroke="#14432A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// Hero section — fills the viewport; two offset columns create deliberate tension
export default function Hero({ onAskAI }) {
  return (
    <AuroraBackground className="border-b border-slate-200">
      {/* min-height fills the viewport below the 4rem header; content centers vertically */}
      <section
        id="top"
        className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-6xl content-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr]"
      >
        {/* LEFT: heading block */}
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-[0.18em] text-forest"
          >
            Open now. 24/7 emergency service
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-5 text-5xl font-bold tracking-tight text-gray-800 md:text-7xl"
          >
            Boston Plumbing
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-5 font-display text-2xl font-semibold text-gray-800 md:text-3xl"
          >
            Emergency plumbing, engineered for speed.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-5 text-lg text-slate-600"
          >
            Licensed plumbers on call day and night for burst pipes, leaks, blocked drains
            and water heaters. We are usually at your door within 45 minutes.
          </motion.p>
        </div>

        {/* RIGHT: CTA block, pushed down for asymmetry */}
        <div className="flex flex-col items-start gap-0 lg:items-end lg:self-end lg:pb-6">
          {/* Handwritten AI note beside a curved arrow pointing at the button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mr-8 flex items-start gap-2"
            aria-hidden="true"
          >
            <span className="-rotate-6 font-script text-3xl text-forest">AI-Powered</span>
            <CurvedArrow />
          </motion.div>

          {/* Premium pill CTA: inner top highlight for depth (flat colours, no gradient),
              icon set in its own tonal chip so it reads as part of the button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 18px 44px rgba(15, 61, 46, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.28)',
            }}
            whileTap={{ scale: 0.97 }}
            onClick={onAskAI}
            className="group inline-flex items-center gap-4 rounded-full bg-forest py-4 pl-5 pr-10 text-xl font-bold text-white shadow-[0_10px_28px_rgba(15,61,46,0.28),inset_0_1px_0_rgba(255,255,255,0.18)] transition-colors hover:bg-[#1A5A38]"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15 transition-colors group-hover:bg-white/25">
              <Mic className="h-6 w-6" aria-hidden="true" />
            </span>
            Get Help Now
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-4 text-base text-slate-600 lg:text-right"
          >
            Just talk, no typing needed.
            <br />
            Or call{' '}
            <a href="tel:+15550123456" className="font-semibold text-forest underline">
              (555) 012-3456
            </a>
            .
          </motion.p>
        </div>
      </section>
    </AuroraBackground>
  );
}
