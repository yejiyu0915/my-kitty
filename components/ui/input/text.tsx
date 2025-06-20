import { ChangeEvent, KeyboardEvent } from 'react';

interface TextInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled: boolean;
  className?: string;
}

export default function TextInput({
  value,
  onChange,
  onKeyPress,
  placeholder,
  disabled,
  className = '',
}: TextInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      disabled={disabled}
      className={`flex-1 bg-transparent outline-none disabled:opacity-50 ${className}`}
    />
  );
}
