import { ReactNode } from 'react';
import { PatientData, PartialPatientData } from '../data/reportSchemas';

// Report Props 타입
export interface ReportProps {
  patientData?: PartialPatientData;
  currentMode?: 'chat' | 'ai';
}

// Report Header Props
export interface ReportHeaderProps {
  visitDate?: string;
}

// Report Content Props
export interface ReportContentProps {
  patientData: PatientData;
  hasData: boolean;
}

// Report Section Props
export interface ReportSectionProps {
  title: string;
  children: ReactNode;
}

// Report Item Props
export interface ReportItemProps {
  label: string;
  formatter?: (value: string) => string;
}

// Report Layout Props
export interface ReportLayoutProps {
  children: ReactNode;
  header?: ReactNode;
}
