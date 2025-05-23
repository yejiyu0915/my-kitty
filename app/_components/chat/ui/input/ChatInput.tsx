import { ChangeEvent, KeyboardEvent } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled: boolean;
  type?: 'text' | 'textarea' | 'select';
  options?: { value: string; label: string }[];
}

export default function ChatInput({
  value,
  onChange,
  onKeyPress,
  placeholder,
  disabled,
  type = 'text',
  options,
}: ChatInputProps) {
  if (type === 'textarea') {
    return (
      <textarea
        value={value}
        onChange={onChange as any}
        onKeyPress={onKeyPress as any}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 resize-none bg-transparent outline-none disabled:opacity-50"
        rows={3}
      />
    );
  }

  if (type === 'select' && options) {
    return (
      <select
        value={value}
        onChange={onChange as any}
        disabled={disabled}
        className="flex-1 bg-transparent outline-none disabled:opacity-50"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      disabled={disabled}
      className="flex-1 bg-transparent outline-none disabled:opacity-50"
    />
  );
}
