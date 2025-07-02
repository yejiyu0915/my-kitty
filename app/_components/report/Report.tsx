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
    return null; // AI 모드일 때는 컴포넌트를 렌더링하지 않음
  }

  return (
    <ReportLayout header={<ReportHeader visitDate={reportData.visitDate} />}>
      <ReportContent patientData={reportData} hasData={hasData} />
    </ReportLayout>
  );
}
