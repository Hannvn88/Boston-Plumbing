// card.jsx — shadcn/ui-style Card primitives: clean borders, minimal shadow,
// generous internal whitespace
import React from 'react';
import { cn } from '@/lib/utils';

// Outer card shell
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('rounded-md border border-slate-200 bg-white shadow-sm', className)} {...props} />
));
Card.displayName = 'Card';

// Padded content area inside a card
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-8', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export { Card, CardContent };
