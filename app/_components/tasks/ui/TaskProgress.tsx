'use client';

import type { ProgressProps } from '@/app/_components/tasks/types/task';

export default function Progress({
  completed,
  total,
  percentage,
  className = '',
  showLabel = false,
  label = '진행률',
}: ProgressProps) {
  return (
    <span className={`flex items-center gap-1 text-sm text-gray-500 ${className}`}>
      {showLabel && <span>{label}:</span>}
      <span className={`${percentage === 100 ? 'text-primary' : ''} font-bold`}>{percentage}%</span>
      <span>
        ({completed}/{total})
      </span>
    </span>
  );
}
