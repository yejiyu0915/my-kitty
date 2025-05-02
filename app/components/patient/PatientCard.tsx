import { Separator } from '@/components/ui/separator';
import {
  PatientData,
  SectionFields,
  PatientInfo,
  VisitInfo,
  MedicalInfo,
} from '@/app/types/patient';
import { Section } from './Section';

// 1. 각 섹션의 필드 정의
// 환자 기본 정보 필드
const patientInfoFields = [
  { label: '환자명', value: 'name' },
  { label: '생년월일', value: 'birthDate' },
  { label: '성별', value: 'gender' },
  { label: '연락처', value: 'phone' },
] as const satisfies SectionFields<PatientInfo>;

// 방문 정보 필드
const visitInfoFields = [
  { label: '방문 유형', value: 'type' },
  { label: '예약 여부', value: 'isReserved' },
] as const satisfies SectionFields<VisitInfo>;

// 진료 정보 필드
const medicalInfoFields = [
  { label: '증상 시작일', value: 'symptomStartDate' },
  { label: '현재 증상', value: 'currentSymptoms' },
  { label: '알레르기 여부', value: 'allergies' },
] as const satisfies SectionFields<MedicalInfo>;

// 2. 컴포넌트 props 타입 정의
interface PatientCardProps {
  patientData: PatientData; // 환자 데이터
}

// 3. 환자 카드 컴포넌트
export const PatientCard = ({ patientData }: PatientCardProps) => {
  // 환자 데이터 구조 분해 할당
  const { patientInfo, visitInfo, medicalInfo } = patientData;

  return (
    <div className="bg-primary/5 border-primary flex h-full w-full flex-col overflow-hidden rounded-lg border-2 p-8">
      {/* 헤더 섹션 */}
      <div>
        {/* 진료일자 표시 */}
        <div className="flex flex-col gap-2 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">진료일자:</span>
            <span className="text-sm font-bold text-gray-700">
              {new Date().toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
              })}
            </span>
          </div>
        </div>
        {/* 카드 제목 */}
        <h2 className="mb-4 text-2xl font-bold">🏥 환자 정보</h2>
        <Separator className="bg-gray-400" />
      </div>

      {/* 스크롤 가능한 섹션 컨테이너 */}
      <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent my-4 flex-1 overflow-y-auto">
        {/* 환자 기본 정보 섹션 */}
        <Section
          title="📌 기본 인적 정보"
          data={patientInfo}
          fields={patientInfoFields}
          className="mt-0" // 첫 번째 섹션의 상단 마진 제거
        />

        {/* 방문 정보 섹션 */}
        <Section title="🏃 방문 정보" data={visitInfo} fields={visitInfoFields} />

        {/* 진료 정보 섹션 */}
        <Section
          title="🩺 진료 정보"
          data={medicalInfo}
          fields={medicalInfoFields}
          showSeparator={false} // 마지막 섹션의 구분선 제거
          className="mb-0" // 마지막 섹션의 하단 마진 제거
        />
      </div>
    </div>
  );
};
