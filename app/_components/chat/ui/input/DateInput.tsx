import { DateInputProps } from '../../types/input';

export default function DateInput({ value, onChange, placeholder, disabled }: DateInputProps) {
  return (
    <input
      type="date"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className="flex-1 bg-transparent outline-none disabled:opacity-50"
    />
  );
}
