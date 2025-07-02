'use client';

import { cn } from '@/lib/utils';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  className?: string;
}

export default function Checkbox({ checked, onChange, label, className }: CheckboxProps) {
  return (
    <>
      <div className="relative flex h-3 w-3 items-center justify-center md:h-4 md:w-4">
        <input
          type="checkbox"
          className={cn(
            'peer checked:border-primary checked:bg-primary hover:border-primary/50 h-3 w-3 cursor-pointer appearance-none rounded border-2 border-gray-300 bg-white transition-all md:h-4 md:w-4',
            className
          )}
          checked={checked}
          onChange={onChange}
        />
        <svg
          className="pointer-events-none absolute h-2 w-2 opacity-0 transition-opacity peer-checked:opacity-100 md:h-3 md:w-3"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {label && (
        <label
          className={cn(
            'flex-1 cursor-pointer text-xs leading-4 transition-colors md:text-sm md:leading-5',
            checked ? 'text-gray-400 line-through' : 'text-gray-700'
          )}
          onClick={onChange}
        >
          {label}
        </label>
      )}
    </>
  );
}
