import { useEffect, useRef } from 'react';
import { ReportContentProps } from '../types/report';
import ReportItem from './ReportItem';
import {
  formatBirthDateWithAge,
  formatPhoneNumber,
  formatVisitDateTime,
  getPainLevelLabel,
} from '../utils/reportFormatter';

export default function ReportContent({ patientData, hasData }: ReportContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 환자 데이터가 변경될 때마다 스크롤을 하단으로 이동
  useEffect(() => {
    if (hasData) {
      // setTimeout을 사용하여 DOM 업데이트 후 스크롤 실행
      setTimeout(() => {
        // 부모 컨테이너에서 스크롤 가능한 요소를 찾아서 스크롤 조작
        const scrollableParent = containerRef.current?.closest('.overflow-y-auto');
        if (scrollableParent) {
          scrollableParent.scrollTop = scrollableParent.scrollHeight;
        }
      }, 100);
    }
  }, [patientData, hasData]);

  if (!hasData) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-center text-sm text-gray-500 md:text-base">
          환자 정보가 입력되면
          <br />
          진료일자가 자동으로 오늘로 설정됩니다.
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-6">
      <ul className="space-y-1 md:space-y-4">
        {patientData.name && <ReportItem label="환자명" value={patientData.name} />}
        {patientData.symptoms && <ReportItem label="증상" value={patientData.symptoms} />}
        {patientData.painLevel && (
          <ReportItem
            label="증상 강도"
            value={patientData.painLevel}
            formatter={getPainLevelLabel}
          />
        )}
        {patientData.birthDate && (
          <ReportItem
            label="생년월일"
            value={patientData.birthDate}
            formatter={formatBirthDateWithAge}
          />
        )}
        {patientData.gender && <ReportItem label="성별" value={patientData.gender} />}
        {patientData.visitPath && <ReportItem label="방문 경로" value={patientData.visitPath} />}
        {patientData.phone && (
          <ReportItem label="연락처" value={patientData.phone} formatter={formatPhoneNumber} />
        )}
        {patientData.visitDateTime && (
          <ReportItem
            label="방문일시"
            value={patientData.visitDateTime}
            formatter={formatVisitDateTime}
          />
        )}
      </ul>
    </div>
  );
}
