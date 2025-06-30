import { ReportContentProps } from '../types/report';
import ReportSection from './ReportSection';
import ReportItem from './ReportItem';
import {
  formatBirthDateWithAge,
  formatPhoneNumber,
  formatVisitDateTime,
  getPainLevelLabel,
} from '../utils/reportFormatter';

export default function ReportContent({ patientData, hasData }: ReportContentProps) {
  if (!hasData) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-center text-gray-500">
          환자 정보가 입력되면
          <br />
          진료일자가 자동으로 오늘로 설정됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="my-8 mt-0 flex flex-col gap-6">
      {/* 기본 환자 정보 */}
      <ReportSection title="기본 정보">
        <ul className="space-y-4">
          {patientData.name && <ReportItem label="환자명" value={patientData.name} />}
          {patientData.birthDate && (
            <ReportItem
              label="생년월일"
              value={patientData.birthDate}
              formatter={formatBirthDateWithAge}
            />
          )}
          {patientData.gender && <ReportItem label="성별" value={patientData.gender} />}
          {patientData.phone && (
            <ReportItem label="연락처" value={patientData.phone} formatter={formatPhoneNumber} />
          )}
          {patientData.visitPath && <ReportItem label="방문 경로" value={patientData.visitPath} />}
          {patientData.symptoms && <ReportItem label="증상" value={patientData.symptoms} />}
          {patientData.painLevel && (
            <ReportItem
              label="증상 강도"
              value={patientData.painLevel}
              formatter={getPainLevelLabel}
            />
          )}
          {patientData.visitDateTime && (
            <ReportItem
              label="방문일시"
              value={patientData.visitDateTime}
              formatter={formatVisitDateTime}
            />
          )}
        </ul>
      </ReportSection>
    </div>
  );
}
