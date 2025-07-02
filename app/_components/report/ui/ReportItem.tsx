interface ReportItemProps {
  label: string;
  value?: string;
  formatter?: (value: string) => string;
}

export default function ReportItem({ label, value, formatter }: ReportItemProps) {
  if (!value) return null;

  const displayValue = formatter ? formatter(value) : value;

  return (
    <li className="break-keep">
      <span className="text-primary">■ </span>
      <span className="text-sm text-gray-700 md:text-base">{label}: </span>
      <span className="text-sm font-bold text-gray-700 md:text-base">{displayValue}</span>
    </li>
  );
}
