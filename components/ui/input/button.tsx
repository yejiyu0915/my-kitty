'use client';

import { ButtonProps } from '@/app/types/common';
import { cn } from '@/lib/utils';

export default function Button({ onClick, children, className = '' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'bg-primary hover:bg-primary/90 cursor-pointer rounded-sm px-3 py-1.5 text-sm text-white shadow-xs transition-colors md:px-4 md:py-2 md:text-base',
        className
      )}
    >
      {children}
    </button>
  );
}
