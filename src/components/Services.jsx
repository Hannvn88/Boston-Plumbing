// Services.jsx — six service cards with icons; light theme, subtle hover lift,
// heading offset left with the grid breathing underneath
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Droplets, Waves, Flame, Clock, Wrench } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import FadeUp from './FadeUp';

// Service catalogue — plain-language names and descriptions
const SERVICES = [
  { icon: Zap, title: 'Burst Pipes', desc: 'We stop the water fast and repair the pipe properly, before damage spreads.' },
  { icon: Droplets, title: 'Leak Detection', desc: 'We find hidden leaks with inspection cameras, without tearing open your walls.' },
  { icon: Waves, title: 'Blocked Drains', desc: 'Tough blockages cleared and the line checked so they don’t come back.' },
  { icon: Flame, title: 'Water Heaters', desc: 'Repairs and replacements for tank and tankless systems, usually the same day.' },
  { icon: Clock, title: '24/7 Emergencies', desc: 'A real person answers any time, day or night, and sends help right away.' },
  { icon: Wrench, title: 'Installations', desc: 'Taps, toilets and appliances fitted neatly, guaranteed for 12 months.' },
];

// Services section — scroll-revealed heading plus the card grid
export default function Services() {
  return (
    <section id="services" className="border-b border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 md:py-32">
        <FadeUp className="max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
            Whatever the problem, we can fix it.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Every job is handled by a licensed plumber with the right parts on the truck,
            so most problems are fixed in a single visit.
          </p>
        </FadeUp>

        {/* Card grid — each card lifts slightly on hover */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <FadeUp key={service.title} delay={index * 0.08}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                <Card className="h-full">
                  <CardContent>
                    <service.icon className="h-8 w-8 text-forest" aria-hidden="true" />
                    <h3 className="mt-5 text-xl font-bold text-gray-800">{service.title}</h3>
                    <p className="mt-2 text-base text-slate-600">{service.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
