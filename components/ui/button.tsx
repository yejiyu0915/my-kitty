'use client';

import { ButtonProps } from '@/app/types/common';
import { cn } from '@/lib/utils';

export default function Button({ onClick, children, className = '' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'bg-primary hover:bg-primary/90 cursor-pointer rounded-sm px-4 py-2 text-white shadow-xs transition-colors',
        className
      )}
    >
      {children}
    </button>
  );
}
