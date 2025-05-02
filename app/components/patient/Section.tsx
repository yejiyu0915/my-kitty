import { Separator } from '@/components/ui/separator';
import { SectionProps } from '@/app/types/patient';
import { InfoField } from './InfoField';

// 제네릭 컴포넌트: 다양한 타입의 데이터를 처리할 수 있음
export const Section = <T extends object>({
  title, // 섹션 제목
  data, // 섹션 데이터
  fields, // 필드 정보
  showSeparator = true, // 구분선 표시 여부 (기본값: true)
  separatorClassName = 'bg-gray-300', // 구분선 스타일 (기본값: 회색)
  className = '', // 섹션 스타일 (기본값: 없음)
}: SectionProps<T>) => {
  return (
    <>
      {/* 섹션 컨테이너 */}
      <div className={`my-4 flex flex-col gap-2 ${className}`}>
        {/* 섹션 제목 */}
        <h3 className="text-lg font-bold">{title}</h3>
        {/* 필드 목록 */}
        {fields.map(({ label, value }) => (
          <InfoField key={String(value)} label={label} value={data[value] as string | boolean} />
        ))}
      </div>
      {/* 구분선 (조건부 렌더링) */}
      {showSeparator && <Separator className={separatorClassName} />}
    </>
  );
};
