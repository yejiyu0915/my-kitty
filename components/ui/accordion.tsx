'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { AccordionProps } from '@/app/types/common';

export default function Accordion({
  isOpen,
  onToggle,
  header,
  children,
  className = '',
}: AccordionProps) {
  return (
    <div className={className}>
      <button
        onClick={onToggle}
        className={`flex w-full cursor-pointer items-center justify-between rounded-sm border-2 border-gray-100 px-3 py-2 transition-all duration-200 ${
          isOpen ? 'border-primary/40' : ''
        }`}
      >
        {header}
        <ChevronDownIcon
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'text-primary rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
}
