import { NumberInputProps } from '../../types/input';

export default function NumberInput({ value, onChange, placeholder, disabled }: NumberInputProps) {
  return (
    <input
      type="tel"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      pattern="[0-9]*"
      className="flex-1 bg-transparent outline-none disabled:opacity-50"
    />
  );
}
