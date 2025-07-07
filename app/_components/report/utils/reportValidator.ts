import { PatientData, PartialPatientData } from '../data/reportSchemas';

// Report 데이터 유효성 검사 함수들

// 환자 데이터가 존재하는지 확인
export const hasPatientData = (data: PartialPatientData): boolean => {
  return (
    data &&
    Object.values(data).some((value) => {
      if (typeof value === 'string') {
        return value && value.trim() !== '';
      }
      return false;
    })
  );
};

// 특정 필드가 유효한지 확인
export const isValidField = (value: string | undefined): boolean => {
  return typeof value === 'string' && value.trim() !== '';
};

// 필수 필드들이 모두 있는지 확인
export const hasRequiredFields = (
  data: PartialPatientData,
  requiredFields: (keyof PatientData)[]
): boolean => {
  return requiredFields.every((field) => {
    const value = data[field];
    return isValidField(value as string);
  });
};

// 데이터 완성도 계산 (0-100%)
export const calculateDataCompleteness = (data: PartialPatientData): number => {
  const fields: (keyof PatientData)[] = [
    'name',
    'birthDate',
    'gender',
    'phone',
    'visitPath',
    'symptoms',
    'painLevel',
    'visitDateTime',
  ];

  const filledFields = fields.filter((field) => {
    const value = data[field];
    return isValidField(value as string);
  });
  return Math.round((filledFields.length / fields.length) * 100);
};

// 데이터 상태 확인
export const getDataStatus = (data: PartialPatientData): 'empty' | 'partial' | 'complete' => {
  const completeness = calculateDataCompleteness(data);

  if (completeness === 0) return 'empty';
  if (completeness >= 80) return 'complete';
  return 'partial';
};
