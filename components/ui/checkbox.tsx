'use client';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  className?: string;
}

export default function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <>
      <div className="relative flex h-4 w-4 items-center justify-center">
        <input
          type="checkbox"
          className="peer checked:border-primary checked:bg-primary hover:border-primary/50 h-4 w-4 cursor-pointer appearance-none rounded border-2 border-gray-300 bg-white transition-all"
          checked={checked}
          onChange={onChange}
        />
        <svg
          className="pointer-events-none absolute h-3 w-3 opacity-0 transition-opacity peer-checked:opacity-100"
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
          className={`flex-1 cursor-pointer text-sm leading-5 transition-colors ${
            checked ? 'text-gray-400 line-through' : 'text-gray-700'
          }`}
          onClick={onChange}
        >
          {label}
        </label>
      )}
    </>
  );
}
