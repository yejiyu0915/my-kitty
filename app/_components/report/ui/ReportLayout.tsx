import { ReactNode } from 'react';

interface ReportLayoutProps {
  children: ReactNode;
  header?: ReactNode;
}

export default function ReportLayout({ children, header }: ReportLayoutProps) {
  return (
    <div className="border-primary bg-primary/5 flex h-full w-full flex-col overflow-hidden rounded-lg border-2 px-6 py-8">
      {header}
      <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent my-6 flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
