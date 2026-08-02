// Hero.jsx — light two-column hero with the AI voice agent as the centerpiece:
// heading block on the LEFT, a large breathing mic button on the RIGHT. The
// whole hero enters as one staggered fade/slide sequence on page load.
import React from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { Mic } from 'lucide-react';
import AuroraBackground from './AuroraBackground';

// Resting and bloomed shadows for the voice button's idle "breathing" pulse
const SHADOW_REST = '0 12px 32px rgba(20, 67, 42, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.18)';
const SHADOW_BLOOM = '0 18px 48px rgba(20, 67, 42, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.18)';

// Hero section — no forced viewport height; the content earns its own space
export default function Hero({ onAskAI }) {
  const reduceMotion = useReducedMotion();

  // Staggered entrance for one element in the load sequence. With reduced
  // motion preferred, elements render instantly with no offset.
  const entrance = (delay) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, ease: 'easeOut', delay },
        };

  // Idle breathing: a slow, subtle scale + shadow bloom so the button reads
  // as alive and waiting. Starts after the entrance sequence settles.
  const breathe = reduceMotion
    ? {}
    : {
        animate: { scale: [1, 1.03, 1], boxShadow: [SHADOW_REST, SHADOW_BLOOM, SHADOW_REST] },
        transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 },
      };

  return (
    <AuroraBackground className="border-b border-slate-200">
      <section
        id="top"
        className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 py-16 sm:px-6 md:py-24 lg:min-h-[80vh] lg:grid-cols-[1.15fr_1fr] lg:gap-10"
      >
        {/* LEFT: heading block */}
        <div className="max-w-xl">
          <m.p
            {...entrance(0)}
            className="text-sm font-semibold uppercase tracking-[0.18em] text-forest"
          >
            Open now. 24/7 emergency service
          </m.p>

          <m.h1
            {...entrance(0.12)}
            className="mt-5 text-5xl font-bold tracking-tight text-gray-800 md:text-6xl"
          >
            Boston Plumbing
          </m.h1>

          <m.p
            {...entrance(0.24)}
            className="mt-4 font-display text-2xl font-semibold text-gray-800 md:text-3xl"
          >
            Emergency plumbing, engineered for speed.
          </m.p>

          <m.p {...entrance(0.36)} className="mt-5 text-lg text-slate-600">
            Licensed plumbers on call day and night for burst pipes, leaks, blocked drains
            and water heaters. We are usually at your door within 45 minutes.
          </m.p>

          <m.p {...entrance(0.48)} className="mt-5 text-base text-slate-600">
            Prefer the phone? Call{' '}
            <a href="tel:+15550123456" className="font-semibold text-forest underline">
              (555) 012-3456
            </a>{' '}
            any hour.
          </m.p>
        </div>

        {/* RIGHT: the voice agent — the product this site exists to showcase */}
        <div className="flex flex-col items-center gap-7 lg:py-4">
          <m.div {...entrance(0.3)} className="relative">
            {/* Soft green halo so the button owns its space without heavy chrome */}
            <div
              className="absolute -inset-8 rounded-full bg-forest/10 blur-2xl"
              aria-hidden="true"
            />
            <m.button
              {...breathe}
              whileHover={reduceMotion ? undefined : { scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={onAskAI}
              className="relative grid h-40 w-40 place-items-center rounded-full bg-forest text-white shadow-[0_12px_32px_rgba(20,67,42,0.28),inset_0_1px_0_rgba(255,255,255,0.18)] transition-colors hover:bg-[#1A5A38] active:bg-forest-deep sm:h-48 sm:w-48"
              aria-label="Talk to our AI assistant"
            >
              <Mic className="h-14 w-14 sm:h-16 sm:w-16" aria-hidden="true" />
            </m.button>
          </m.div>

          <m.div {...entrance(0.42)} className="max-w-xs text-center">
            <p className="font-display text-xl font-semibold text-gray-800">
              Talk to us. We&rsquo;re listening.
            </p>
            <p className="mt-2 text-base text-slate-600">
              Our AI assistant answers questions, quotes prices and books visits.
              Just press and speak — no typing needed.
            </p>
          </m.div>
        </div>
      </section>
    </AuroraBackground>
  );
}
