// Header.jsx — clean minimal navigation: text wordmark (no logo), section links,
// phone number, assistant shortcut
import React from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Anchor links to the page sections (hidden on small screens to keep mobile simple)
const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#reviews' },
];

// Slim white header — wordmark only, everything in one row
export default function Header({ onAskAI }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Text wordmark — no icon, display face */}
        <a href="#top" className="font-display text-lg font-bold tracking-tight text-gray-800">
          Boston Plumbing
        </a>

        {/* Section links — desktop only */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Sections">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-medium text-slate-600 transition-colors hover:text-forest"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right-side actions: phone (always visible) + assistant shortcut */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+15550123456"
            className="flex items-center gap-2 font-semibold text-gray-800 hover:text-forest"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">(555) 012-3456</span>
            <span className="sm:hidden">Call us</span>
          </a>
          <Button onClick={onAskAI} className="hidden md:inline-flex">
            Get Help Now
          </Button>
        </div>
      </div>
    </header>
  );
}
