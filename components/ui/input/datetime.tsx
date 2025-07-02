import { ChangeEvent } from 'react';

interface DateTimeInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled: boolean;
  className?: string;
  min?: string;
  max?: string;
  step?: string;
}

export default function DateTimeInput({
  value,
  onChange,
  placeholder,
  disabled,
  className = '',
  min,
  max,
  step = '1800', // 기본 30분 단위
}: DateTimeInputProps) {
  return (
    <input
      type="datetime-local"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      step={step}
      min={min}
      max={max}
      className={`flex-1 bg-transparent text-sm outline-none disabled:opacity-50 md:text-base ${className}`}
    />
  );
}
