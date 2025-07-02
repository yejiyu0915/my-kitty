// 메인 컴포넌트
export { default as Report } from '../Report';

// UI 컴포넌트들
export { default as ReportLayout } from '../ui/ReportLayout';
export { default as ReportHeader } from '../ui/ReportHeader';
export { default as ReportContent } from '../ui/ReportContent';
export { default as ReportItem } from '../ui/ReportItem';

// 훅들
export { useReportData } from '../hooks/useReportData';

// 타입들
export type {
  ReportProps,
  ReportHeaderProps,
  ReportContentProps,
  ReportItemProps,
  ReportLayoutProps,
} from './report';

export type { PatientData, ReportState, PartialPatientData } from '../data/reportSchemas';

// 유틸리티 함수들
export {
  formatBirthDateWithAge,
  formatPhoneNumber,
  formatVisitDateTime,
  getPainLevelLabel,
  formatReportDate,
  formatAnswerContent,
  formatFieldLabel,
} from '../utils/reportFormatter';

export {
  hasPatientData,
  isValidField,
  hasRequiredFields,
  calculateDataCompleteness,
  getDataStatus,
} from '../utils/reportValidator';
