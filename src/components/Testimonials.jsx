// Testimonials.jsx — customer reviews in a clean three-column grid; star
// rating sits beside the reviewer's name, in the accent colour
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
    <div className="flex gap-0.5" role="img" aria-label="Rated 5 out of 5 stars">
      {[...Array(5)].map((_, starIndex) => (
        <Star key={starIndex} className="h-4 w-4 fill-forest text-forest" aria-hidden="true" />
      ))}
    </div>
  );
}

// One review card — quote first, then name + stars pinned to the bottom so
// all three cards align despite different quote lengths
function ReviewCard({ review }) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col">
        <blockquote className="flex-1 text-base leading-relaxed text-gray-800">
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

// Testimonials section — three equal cards, revealed with a slight stagger
export default function Testimonials() {
  return (
    <section id="reviews" className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <FadeUp className="max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
            Trusted when it matters most.
          </h2>
        </FadeUp>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review, index) => (
            <FadeUp key={review.name} delay={index * 0.1} className="h-full">
              <ReviewCard review={review} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
