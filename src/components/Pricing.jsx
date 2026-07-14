// Pricing.jsx — service rates in an asymmetrical, offset card layout;
// light theme with sparing green highlights, scroll-reveal animations
import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FadeUp from './FadeUp';

// What every job includes, listed beside the rate cards
const INCLUDED = [
  'A licensed, insured plumber',
  'The full price agreed before any work starts',
  'A stocked truck, so most fixes are done in one visit',
  'All work guaranteed for 12 months',
];

// Pricing section — heading offset right, cards staggered at different heights
export default function Pricing() {
  return (
    <section id="pricing" className="border-b border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 md:py-32">
        {/* Heading pushed right for asymmetry with the services section above */}
        <FadeUp className="max-w-xl lg:ml-auto lg:text-right">
          <h2 className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
            Two prices. No surprises.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            You’ll know the full cost, and agree to it, before any work begins.
          </p>
        </FadeUp>

        {/* Offset columns: middle card drops lower, third floats higher */}
        <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
          {/* Emergency visit — the featured rate */}
          <FadeUp>
            <Card className="border-forest">
              <CardContent>
                <span className="inline-block rounded bg-forest px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Emergencies, any hour
                </span>
                <h3 className="mt-6 text-lg font-semibold text-slate-600">Emergency Visit</h3>
                <p className="mt-1 text-5xl font-bold text-gray-800">
                  $150 <span className="text-lg font-medium text-slate-600">one-time</span>
                </p>
                <p className="mt-4 text-base text-slate-600">
                  We come out right away, day or night, find the problem, and tell you exactly
                  what the fix will cost.
                </p>
                <a href="tel:+15550123456" className="mt-7 block">
                  <Button className="w-full">Call for Help Now</Button>
                </a>
              </CardContent>
            </Card>
          </FadeUp>

          {/* Hourly repair work — offset downward on desktop */}
          <FadeUp delay={0.12} className="lg:mt-14">
            <Card>
              <CardContent>
                <span className="inline-block rounded border border-slate-300 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-600">
                  The work itself
                </span>
                <h3 className="mt-6 text-lg font-semibold text-slate-600">Repair Work</h3>
                <p className="mt-1 text-5xl font-bold text-gray-800">
                  $75 <span className="text-lg font-medium text-slate-600">per hour</span>
                </p>
                <p className="mt-4 text-base text-slate-600">
                  Charged only after you agree to the price. Parts are charged at what they cost
                  us, with nothing added on top.
                </p>
                <a href="#contact" className="mt-7 block">
                  <Button variant="outline" className="w-full">Book a Visit</Button>
                </a>
              </CardContent>
            </Card>
          </FadeUp>

          {/* Inclusions panel — floats slightly higher for the staggered rhythm */}
          <FadeUp delay={0.24} className="lg:mt-6">
            <Card className="bg-slate-50">
              <CardContent>
                <h3 className="text-lg font-bold text-gray-800">Every job includes</h3>
                <ul className="mt-6 space-y-4">
                  {INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base text-slate-600">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
