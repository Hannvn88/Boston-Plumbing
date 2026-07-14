// Footer.jsx — closing call-to-action plus contact details and legal line
import React from 'react';
import { Phone, Mic } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import FadeUp from './FadeUp';

// Footer — asymmetric CTA band (text left, actions right), then contact info
export default function Footer({ onAskAI }) {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-slate-50">
      {/* Closing CTA band — offset columns rather than centered */}
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <FadeUp>
          <h2 className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
            Need a plumber right now?
          </h2>
          <p className="mt-4 max-w-xl text-lg text-slate-600">
            Ask our AI assistant about services, prices, or availability. Or call, and a
            real person will answer at any hour.
          </p>
        </FadeUp>
        <FadeUp delay={0.15} className="flex flex-col gap-4 lg:items-end">
          <Button size="lg" onClick={onAskAI} className="w-full sm:w-auto">
            <Mic className="h-5 w-5" aria-hidden="true" />
            Get Help Now
          </Button>
          <a
            href="tel:+15550123456"
            className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), 'w-full sm:w-auto')}
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call (555) 012-3456
          </a>
        </FadeUp>
      </div>

      {/* Contact details + legal strip */}
      <div className="border-t border-slate-200">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} Boston Plumbing · Licensed &amp; insured, Lic. #PL-48291
          </p>
          <p>
            42 Trade Street, Boston ·{' '}
            <a href="mailto:dispatch@bostonplumbing.com" className="underline hover:text-forest">
              dispatch@bostonplumbing.com
            </a>{' '}
            · Emergency line open 24/7
          </p>
        </div>
      </div>
    </footer>
  );
}
