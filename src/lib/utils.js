// utils.js — shadcn/ui's class-name helper: merges Tailwind classes without conflicts
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Combines conditional class names and resolves Tailwind conflicts (last one wins)
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
