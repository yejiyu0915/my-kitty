import { Separator } from '@/components/ui/separator';
import { ReportHeaderProps } from '../types/report';
import { formatReportDate } from '../utils/reportFormatter';

export default function ReportHeader({ visitDate }: ReportHeaderProps) {
  return (
    <div>
      <div className="flex flex-col pb-4">
        <div className="inline-block break-keep">
          <span className="text-sm text-gray-500">진료일자: </span>
          {visitDate ? (
            <>
              <span className="text-sm font-bold text-gray-700">{formatReportDate(visitDate)}</span>
              <span className="text-xs font-medium text-green-600"> (오늘)</span>
            </>
          ) : (
            <span className="text-sm text-gray-400">입력 대기 중...</span>
          )}
        </div>
      </div>
      <h2 className="my-1 text-2xl font-bold">환자 정보</h2>
      <Separator className="bg-gray-800" />
    </div>
  );
}
