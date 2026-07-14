// Testimonials.jsx — customer reviews in a staggered, asymmetrical layout;
// star rating sits beside the reviewer's name, in the accent colour
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import FadeUp from './FadeUp';

// Review content — real-sounding customers, no badge clutter
const REVIEWS = [
  {
    quote:
      'A pipe burst behind our kitchen wall at 2am. Boston Plumbing had a truck here in under forty minutes and the leak isolated in ten. Genuinely saved our floors.',
    name: 'Sarah Mitchell',
    role: 'Homeowner, Riverside',
  },
  {
    quote:
      'They quoted before touching anything, finished the water heater swap the same afternoon, and left the utility room cleaner than they found it.',
    name: 'David Okafor',
    role: 'Property Manager, Northgate',
  },
  {
    quote:
      'Third plumber we tried for a recurring drain problem, and the first one to camera the line, find the root cause and fix it permanently.',
    name: 'Elena Vasquez',
    role: 'Café Owner, Old Town',
  },
];

// Compact five-star row in the accent colour, shown beside the reviewer's name
function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="Rated 5 out of 5 stars">
      {[...Array(5)].map((_, starIndex) => (
        <Star key={starIndex} className="h-4 w-4 fill-forest text-forest" aria-hidden="true" />
      ))}
    </div>
  );
}

// One review card — quote first, then name + stars on the same row
function ReviewCard({ review }) {
  return (
    <Card>
      <CardContent>
        <blockquote className="text-base leading-relaxed text-gray-800">
          “{review.quote}”
        </blockquote>
        <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
          <div>
            <p className="font-bold text-gray-800">{review.name}</p>
            <p className="text-sm text-slate-600">{review.role}</p>
          </div>
          <StarRating />
        </footer>
      </CardContent>
    </Card>
  );
}

// Testimonials section — cards staggered left/right at varied widths
export default function Testimonials() {
  return (
    <section id="reviews" className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 md:py-32">
        <FadeUp className="max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
            Trusted when it matters most.
          </h2>
        </FadeUp>

        {/* Staggered column: cards alternate left / right at less-than-full width */}
        <div className="mt-14 flex flex-col gap-8">
          <FadeUp className="md:w-3/5 md:self-start">
            <ReviewCard review={REVIEWS[0]} />
          </FadeUp>
          <FadeUp delay={0.1} className="md:w-3/5 md:self-end">
            <ReviewCard review={REVIEWS[1]} />
          </FadeUp>
          <FadeUp delay={0.2} className="md:w-3/5 md:self-start md:ml-16">
            <ReviewCard review={REVIEWS[2]} />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
