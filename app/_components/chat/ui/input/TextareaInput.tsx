import { TextareaInputProps } from '../../types/input';

export default function TextareaInput({
  value,
  onChange,
  onKeyPress,
  placeholder,
  disabled,
  rows = 3,
}: TextareaInputProps) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      className="flex-1 resize-none bg-transparent outline-none disabled:opacity-50"
    />
  );
}
