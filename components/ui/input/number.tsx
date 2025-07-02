import { ChangeEvent } from 'react';

interface NumberInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled: boolean;
  className?: string;
  pattern?: string;
}

export default function NumberInput({
  value,
  onChange,
  placeholder,
  disabled,
  className = '',
  pattern = '[0-9]*',
}: NumberInputProps) {
  return (
    <input
      type="tel"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      pattern={pattern}
      className={`flex-1 bg-transparent text-sm outline-none disabled:opacity-50 md:text-base ${className}`}
    />
  );
}
