'use client';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  className?: string;
}

export default function Checkbox({ checked, onChange, label, className = '' }: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        className={`h-4 w-4 rounded border-gray-300 ${className}`}
        checked={checked}
        onChange={onChange}
      />
      {label && (
        <label
          className={`flex-1 cursor-pointer ${checked ? 'text-gray-500 line-through' : ''}`}
          onClick={onChange}
        >
          {label}
        </label>
      )}
    </div>
  );
}
