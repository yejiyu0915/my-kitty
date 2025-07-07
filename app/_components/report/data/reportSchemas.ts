import { z } from 'zod';

// 환자 데이터 스키마
export const PatientDataSchema = z.object({
  name: z.string().optional(),
  birthDate: z.string().optional(),
  gender: z.string().optional(),
  phone: z.string().optional(),
  visitPath: z.string().optional(),
  symptoms: z.string().optional(),
  painLevel: z.string().optional(),
  visitDateTime: z.string().optional(),
  visitDate: z.string().optional(),
});

// Report 상태 스키마
export const ReportStateSchema = z.object({
  patientData: PatientDataSchema,
  isLoading: z.boolean(),
  hasData: z.boolean(),
});

// 타입 추론
export type PatientData = z.infer<typeof PatientDataSchema>;
export type ReportState = z.infer<typeof ReportStateSchema>;
export type PartialPatientData = Partial<PatientData>;
