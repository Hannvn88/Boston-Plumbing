// button.jsx — shadcn/ui-style Button, heavily customized: sharp 4px corners,
// bold weight, forest-green accent, smooth hover scale + shadow
import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Variant/size class map — accent fill, quiet outline, and ghost styles
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded font-bold transition-all duration-200 hover:scale-[1.02] hover:shadow-md disabled:pointer-events-none disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none',
  {
    variants: {
      variant: {
        default: 'bg-forest text-white hover:bg-forest-deep',
        outline: 'border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white',
        ghost: 'text-gray-800 hover:bg-slate-100',
      },
      size: {
        default: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

// Button component — forwards refs so it composes with Framer Motion and Radix patterns
const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = 'Button';

export { Button, buttonVariants };
