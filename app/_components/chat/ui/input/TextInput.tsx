import { TextInputProps } from '../../types/input';

export default function TextInput({
  value,
  onChange,
  onKeyPress,
  placeholder,
  disabled,
}: TextInputProps) {
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
