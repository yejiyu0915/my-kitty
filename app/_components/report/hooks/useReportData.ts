import { useState, useEffect, useCallback } from 'react';
import { PatientData, PartialPatientData } from '../data/reportSchemas';
import { usePatientData } from '../../chat/hooks/usePatientData';

export function useReportData(externalPatientData?: PartialPatientData) {
  const { patientData: storedData, updatePatientData, setVisitDate } = usePatientData();
  const [reportData, setReportData] = useState<PatientData>({});

  // 외부에서 전달받은 patientData가 있으면 로컬스토리지에 저장
  const handlePatientDataUpdate = useCallback(() => {
    if (
      externalPatientData &&
      Object.values(externalPatientData).some((value) => {
        return typeof value === 'string' && value && value.trim() !== '';
      })
    ) {
      updatePatientData(externalPatientData);
      setVisitDate(); // 진료일자도 함께 설정
    }
  }, [externalPatientData, updatePatientData, setVisitDate]);

  // 컴포넌트 마운트 시 외부 데이터 처리
  useEffect(() => {
    handlePatientDataUpdate();
  }, [handlePatientDataUpdate]);

  // 로컬스토리지 데이터 변경 시 reportData 업데이트
  useEffect(() => {
    setReportData(storedData);
  }, [storedData]);

  // 데이터 존재 여부 확인
  const hasData = useCallback(() => {
    return (
      reportData &&
      Object.values(reportData).some((value) => {
        if (typeof value === 'string') {
          return value && value.trim() !== '';
        }
        return false;
      })
    );
  }, [reportData]);

  // 특정 필드 값 가져오기
  const getFieldValue = useCallback(
    (field: keyof PatientData): string | undefined => {
      const value = reportData[field];
      return typeof value === 'string' ? value : undefined;
    },
    [reportData]
  );

  // 모든 필드 값 가져오기
  const getAllData = useCallback((): PatientData => {
    return reportData;
  }, [reportData]);

  return {
    reportData,
    hasData: hasData(),
    getFieldValue,
    getAllData,
    isLoading: false, // 필요시 로딩 상태 추가 가능
  };
}
