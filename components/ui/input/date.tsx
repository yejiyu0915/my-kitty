import { ChangeEvent } from 'react';

interface DateInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled: boolean;
  className?: string;
}

export default function DateInput({
  value,
  onChange,
  placeholder,
  disabled,
  className = '',
}: DateInputProps) {
  return (
    <input
      type="date"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`flex-1 bg-transparent text-sm outline-none disabled:opacity-50 md:text-base ${className}`}
    />
  );
}
