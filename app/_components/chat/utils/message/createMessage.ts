import { nanoid } from 'nanoid';

// 원장 메시지 생성
export const createDoctorMessage = (message: string) => ({
  id: nanoid(),
  message,
  type: 'doctor' as const,
});

// 환자 메시지 생성
export const createPatientMessage = (message: string) => ({
  id: nanoid(),
  message,
  type: 'patient' as const,
});
