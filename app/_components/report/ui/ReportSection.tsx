import { ReactNode } from 'react';

interface ReportSectionProps {
  title: string;
  children: ReactNode;
}

export default function ReportSection({ title, children }: ReportSectionProps) {
  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold text-gray-800">{title}</h3>
      {children}
    </div>
  );
}
