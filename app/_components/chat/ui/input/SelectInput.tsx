import { SelectInputProps } from '../../types/input';

export default function SelectInput({
  value,
  onChange,
  placeholder,
  disabled,
  options,
}: SelectInputProps) {
  return (
    <select
      value={value}
      onChange={onChange}
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
