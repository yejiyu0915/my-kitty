'use client';

import { useReportData } from './hooks/useReportData';
import ReportLayout from './ui/ReportLayout';
import ReportHeader from './ui/ReportHeader';
import ReportContent from './ui/ReportContent';
import { ReportProps } from './types/report';

export default function Report({ patientData, currentMode = 'chat' }: ReportProps) {
  const { reportData, hasData } = useReportData(patientData);

  // AI 모드일 때는 사용 불가 메시지 표시
  if (currentMode === 'ai') {
    return (
      <ReportLayout>
        <div className="flex h-full items-center justify-center">
          <p className="text-center text-gray-500">AI 모드에서는 사용할 수 없습니다.</p>
        </div>
      </ReportLayout>
    );
  }

  return (
    <ReportLayout header={<ReportHeader visitDate={reportData.visitDate} />}>
      <ReportContent patientData={reportData} hasData={hasData} />
    </ReportLayout>
  );
}
