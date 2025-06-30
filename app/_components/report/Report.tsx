'use client';

import { useReportData } from './hooks/useReportData';
import ReportLayout from './ui/ReportLayout';
import ReportHeader from './ui/ReportHeader';
import ReportContent from './ui/ReportContent';
import { ReportProps } from './types/report';

export default function Report({ patientData }: ReportProps) {
  const { reportData, hasData } = useReportData(patientData);

  return (
    <ReportLayout header={<ReportHeader visitDate={reportData.visitDate} />}>
      <ReportContent patientData={reportData} hasData={hasData} />
    </ReportLayout>
  );
}
