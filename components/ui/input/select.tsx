import { ChangeEvent } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  disabled: boolean;
  options: SelectOption[];
  className?: string;
}

export default function SelectInput({
  value,
  onChange,
  placeholder,
  disabled,
  options,
  className = '',
}: SelectInputProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`flex-1 bg-transparent text-sm outline-none disabled:opacity-50 md:text-base ${className}`}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
