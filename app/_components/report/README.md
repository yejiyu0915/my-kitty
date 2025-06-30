# Report 컴포넌트

고양이 병원 예약 앱의 환자 정보 리포트를 표시하는 컴포넌트입니다.

## 📁 폴더 구조

```
app/_components/report/
├── data/                    # 데이터 스키마 정의
│   └── reportSchemas.ts     # Zod 스키마 정의
├── types/                   # TypeScript 타입 정의
│   ├── report.ts           # Report 관련 타입들
│   └── index.ts            # 모든 export 정리
├── hooks/                   # 커스텀 훅
│   └── useReportData.ts     # Report 데이터 관리 훅
├── ui/                      # UI 컴포넌트들
│   ├── ReportLayout.tsx     # 메인 레이아웃
│   ├── ReportHeader.tsx     # 헤더 (진료일자 표시)
│   ├── ReportContent.tsx    # 메인 콘텐츠
│   ├── ReportSection.tsx    # 섹션 컴포넌트
│   └── ReportItem.tsx       # 개별 아이템 컴포넌트
├── utils/                   # 유틸리티 함수들
│   ├── reportFormatter.ts   # 포맷터 함수들
│   └── reportValidator.ts   # 검증 함수들
├── Report.tsx               # 메인 컴포넌트
└── README.md               # 이 파일
```

## 🚀 사용법

### 기본 사용법

```tsx
import { Report } from '@/app/_components/report/types';

function App() {
  const patientData = {
    name: '김철수',
    birthDate: '1990-01-01',
    gender: '남성',
    phone: '01012345678',
    // ... 기타 데이터
  };

  return <Report patientData={patientData} />;
}
```

### 개별 컴포넌트 사용

```tsx
import {
  ReportLayout,
  ReportHeader,
  ReportContent,
  useReportData,
} from '@/app/_components/report/types';

function CustomReport() {
  const { reportData, hasData } = useReportData(patientData);

  return (
    <ReportLayout header={<ReportHeader visitDate={reportData.visitDate} />}>
      <ReportContent patientData={reportData} hasData={hasData} />
    </ReportLayout>
  );
}
```

## 📊 데이터 구조

### PatientData 타입

```typescript
interface PatientData {
  name?: string; // 환자명
  birthDate?: string; // 생년월일
  gender?: string; // 성별
  phone?: string; // 연락처
  visitPath?: string; // 방문 경로
  symptoms?: string; // 증상
  painLevel?: string; // 증상 강도
  visitDateTime?: string; // 방문일시
  visitDate?: string; // 진료일자 (자동 설정)
  answers?: Record<string, string>; // 답변 내용
}
```

## 🔧 주요 기능

### 1. 자동 데이터 동기화

- 외부에서 전달받은 `patientData`를 자동으로 로컬스토리지에 저장
- 진료일자를 오늘 날짜로 자동 설정

### 2. 반응형 UI

- 데이터가 없을 때 안내 메시지 표시
- 데이터가 있을 때 구조화된 정보 표시

### 3. 포맷터 지원

- 생년월일: 나이 계산 포함
- 연락처: 하이픈 자동 추가
- 방문일시: 한국어 형식
- 증상 강도: 라벨 매핑

### 4. 검증 기능

- 데이터 완성도 계산
- 필수 필드 검증
- 데이터 상태 확인

## 🎨 스타일링

### CSS 클래스

- `border-primary`: 주요 테두리
- `bg-primary/5`: 배경색 (5% 투명도)
- `scrollbar-thin`: 얇은 스크롤바
- `text-primary`: 주요 텍스트 색상

### 반응형 디자인

- `grid-cols-[3fr_1.2fr]`: 3:1.2 비율 레이아웃
- `overflow-hidden`: 스크롤 영역 제한
- `flex-1`: 남은 공간 자동 채움

## 🔄 상태 관리

### useReportData 훅

```typescript
const {
  reportData, // 현재 환자 데이터
  hasData, // 데이터 존재 여부
  getFieldValue, // 특정 필드 값 가져오기
  getAllData, // 모든 데이터 가져오기
  isLoading, // 로딩 상태
} = useReportData(externalPatientData);
```

## 📝 확장 가능성

### 새로운 섹션 추가

```tsx
// ReportContent.tsx에 새로운 섹션 추가
<ReportSection title="추가 정보">
  <ul className="space-y-4">
    <ReportItem label="새 필드" value={newValue} />
  </ul>
</ReportSection>
```

### 새로운 포맷터 추가

```tsx
// utils/reportFormatter.ts에 추가
export const formatNewField = (value: string): string => {
  // 새로운 포맷팅 로직
  return formattedValue;
};
```

### 새로운 검증 규칙 추가

```tsx
// utils/reportValidator.ts에 추가
export const validateNewField = (value: string): boolean => {
  // 새로운 검증 로직
  return isValid;
};
```

## 🔗 의존성

- `@/components/ui/separator`: 구분선 컴포넌트
- `@/utils/formatters`: 공통 포맷터 함수들
- `../chat/hooks/usePatientData`: 환자 데이터 관리 훅

## 📋 TODO

- [ ] 답변 내용 섹션 추가
- [ ] 데이터 내보내기 기능
- [ ] 인쇄 스타일 최적화
- [ ] 다크 모드 지원
- [ ] 애니메이션 효과 추가
