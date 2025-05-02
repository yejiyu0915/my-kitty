import { calculateAge } from '@/app/utils/age';

interface InfoFieldProps {
  label: string;
  value: string | boolean;
}

export const InfoField = ({ label, value }: InfoFieldProps) => {
  let displayValue = typeof value === 'boolean' ? (value ? '예약' : '미예약') : value;

  if (label === '생년월일') {
    displayValue = `${value} (${calculateAge(value as string)})`;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-md text-gray-500">{label}:</span>
      <span className="text-md font-bold text-gray-700">{displayValue}</span>
    </div>
  );
};
