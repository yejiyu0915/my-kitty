'use client';

import { ButtonProps } from '@/app/types/common';

export default function Button({ onClick, children, className = '' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-primary hover:bg-primary/90 cursor-pointer rounded-sm px-4 py-2 text-white shadow-xs transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
