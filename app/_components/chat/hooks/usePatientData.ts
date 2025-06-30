import { useState, useEffect, useCallback } from 'react';

interface PatientData {
  name?: string;
  birthDate?: string;
  gender?: string;
  phone?: string;
  visitPath?: string;
  symptoms?: string;
  painLevel?: string;
  visitDate?: string;
  visitDateTime?: string;
  answers?: {
    [key: string]: string; // 질문 키에 대한 답변 내용
  };
}

const STORAGE_KEY = 'cathouse_patient_data';

export function usePatientData() {
  const [patientData, setPatientData] = useState<PatientData>({});

  // 컴포넌트 마운트 시 로컬스토리지에서 데이터 로드
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setPatientData(parsedData);
          console.log('로컬스토리지에서 환자 데이터 로드:', parsedData);
        } catch (error) {
          console.error('로컬스토리지 데이터 파싱 오류:', error);
        }
      }
    }
  }, []);

  // 환자 데이터 업데이트 함수
  const updatePatientData = useCallback((newData: Partial<PatientData>) => {
    setPatientData((prevData) => {
      const updatedData = { ...prevData, ...newData };

      // 로컬스토리지에 저장
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
        console.log('로컬스토리지에 환자 데이터 저장:', updatedData);
      }

      return updatedData;
    });
  }, []);

  // 답변 내용 저장 함수
  const saveAnswer = useCallback((questionKey: string, answer: string) => {
    setPatientData((prevData) => {
      const currentAnswers = prevData.answers || {};
      const updatedAnswers = { ...currentAnswers, [questionKey]: answer };
      const updatedData = { ...prevData, answers: updatedAnswers };

      // 로컬스토리지에 저장
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
        console.log(`답변 저장: ${questionKey} = ${answer}`);
      }

      return updatedData;
    });
  }, []);

  // 특정 답변 가져오기 함수
  const getAnswer = useCallback(
    (questionKey: string): string | undefined => {
      return patientData.answers?.[questionKey];
    },
    [patientData.answers]
  );

  // 모든 답변 가져오기 함수
  const getAllAnswers = useCallback(() => {
    return patientData.answers || {};
  }, [patientData.answers]);

  // 환자 데이터 초기화 함수
  const clearPatientData = useCallback(() => {
    setPatientData({});
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      console.log('로컬스토리지에서 환자 데이터 삭제');
    }
  }, []);

  // 진료일자 설정 함수
  const setVisitDate = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    updatePatientData({ visitDate: today });
  }, [updatePatientData]);

  return {
    patientData,
    updatePatientData,
    saveAnswer,
    getAnswer,
    getAllAnswers,
    clearPatientData,
    setVisitDate,
  };
}
