// 1. 기본 데이터 타입 정의
// 환자 기본 정보를 위한 타입
export interface PatientInfo {
  name: string; // 환자 이름
  birthDate: string; // 생년월일
  age: string; // 나이
  gender: '남' | '여'; // 성별 (남 또는 여만 가능)
  phone: string; // 연락처
}

// 방문 정보를 위한 타입
export interface VisitInfo {
  type: '초진' | '재진'; // 방문 유형 (초진 또는 재진만 가능)
  isReserved: boolean; // 예약 여부
}

// 진료 정보를 위한 타입
export interface MedicalInfo {
  symptomStartDate: string; // 증상 시작일
  currentSymptoms: string; // 현재 증상
  allergies: string; // 알레르기 여부
}

// 2. 전체 환자 데이터를 위한 타입
export interface PatientData {
  patientInfo: PatientInfo; // 기본 정보
  visitInfo: VisitInfo; // 방문 정보
  medicalInfo: MedicalInfo; // 진료 정보
}

// 3. 각 섹션의 필드 타입 정의
// 각 정보의 키를 타입으로 정의
export type PatientInfoKey = keyof PatientInfo; // 'name' | 'birthDate' | 'age' | 'gender' | 'phone'
export type VisitInfoKey = keyof VisitInfo; // 'type' | 'isReserved'
export type MedicalInfoKey = keyof MedicalInfo; // 'symptomStartDate' | 'currentSymptoms' | 'allergies'

// 4. 정보 필드 인터페이스
// 각 필드의 라벨과 값을 정의
export interface InfoField<T extends string> {
  label: string; // 표시할 라벨
  value: T; // 실제 데이터의 키
}

// 5. 각 섹션별 필드 타입
export type PatientInfoField = InfoField<PatientInfoKey>;
export type VisitInfoField = InfoField<VisitInfoKey>;
export type MedicalInfoField = InfoField<MedicalInfoKey>;

// 6. 섹션 필드 인터페이스
export interface SectionField<T> {
  readonly label: string; // 필드 라벨
  readonly value: keyof T; // 데이터의 키
}

// 7. 섹션 컴포넌트 props 타입
export interface SectionProps<T> {
  title: string; // 섹션 제목
  data: T; // 섹션 데이터
  fields: readonly SectionField<T>[]; // 필드 정보
  showSeparator?: boolean; // 구분선 표시 여부
  separatorClassName?: string; // 구분선 스타일
  className?: string; // 섹션 스타일
}

export type SectionData = PatientInfo | VisitInfo | MedicalInfo;
export type SectionFields<T extends SectionData> = readonly SectionField<T>[];
