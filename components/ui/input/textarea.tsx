import { ChangeEvent, KeyboardEvent } from 'react';

interface TextareaInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  disabled: boolean;
  rows?: number;
  className?: string;
}

export default function TextareaInput({
  value,
  onChange,
  onKeyPress,
  placeholder,
  disabled,
  rows = 3,
  className = '',
}: TextareaInputProps) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      className={`flex-1 resize-none bg-transparent text-sm outline-none disabled:opacity-50 md:text-base ${className}`}
    />
  );
}
