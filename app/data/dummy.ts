import { PatientData } from '../types/patient';

export const dummyPatientData: PatientData = {
  patientInfo: {
    name: '유예지',
    birthDate: '1993-09-15',
    age: '만 0세',
    gender: '여',
    phone: '010-1234-5678',
  },
  visitInfo: {
    type: '초진',
    isReserved: false,
  },
  medicalInfo: {
    symptomStartDate: '2025-04-30',
    currentSymptoms: '코가 빠져서 못 먹음',
    allergies: '항생제 알레르기',
  },
};
