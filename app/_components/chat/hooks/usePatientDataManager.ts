import { usePatientData } from './usePatientData';
import { chatSteps } from '../data/chatSteps';
import { ChatMessage } from '../data/chatSchemas';
import { PatientData } from '../types/chat';

interface UsePatientDataManagerProps {
  onPatientDataUpdate?: (data: PatientData) => void;
  chatState: {
    messages: ChatMessage[];
    currentStep: number;
  };
}

export function usePatientDataManager({
  onPatientDataUpdate,
  chatState,
}: UsePatientDataManagerProps) {
  const { updatePatientData, setVisitDate } = usePatientData();

  // 환자 데이터 업데이트 함수
  const updatePatientDataWithStep = (currentStep: number, message: string) => {
    const currentStepData = chatSteps[currentStep];
    const domain = currentStepData.domain;

    // 현재 단계의 데이터만 업데이트 (원본 메시지 사용)
    const updateData: Partial<PatientData> = {};

    switch (domain) {
      case 'greeting':
        updateData.name = message;
        break;
      case 'symptoms':
        updateData.symptoms = message;
        break;
      case 'pain_level':
        updateData.painLevel = message; // 증상 강도를 별도 필드에 저장
        break;
      case 'birth_date':
        updateData.birthDate = message;
        break;
      case 'gender':
        updateData.gender = message;
        break;
      case 'visit_reason':
        updateData.visitPath = message;
        break;
      case 'contact':
        updateData.phone = message;
        break;
      case 'appointment':
        updateData.visitDateTime = message; // 방문일시 저장
        break;
    }

    console.log('환자 데이터 업데이트:', updateData);

    // 로컬스토리지에 저장 (기존 데이터 유지하면서 현재 단계만 업데이트)
    updatePatientData(updateData);

    // 외부 콜백도 호출 (기존 호환성 유지)
    if (onPatientDataUpdate) {
      // 현재 저장된 전체 데이터를 가져와서 전달
      const currentStoredData = JSON.parse(localStorage.getItem('cathouse_patient_data') || '{}');
      const updatedData = { ...currentStoredData, ...updateData };
      onPatientDataUpdate(updatedData);
    }
  };

  // 첫 번째 답변이 제출될 때 환자 데이터 업데이트
  const handleFirstAnswer = (message: ChatMessage) => {
    console.log('handleFirstAnswer 호출됨:', message);
    console.log('현재 메시지 개수:', chatState.messages.length);

    // 사용자 메시지가 처음 제출되는 경우 (기존 메시지 중 사용자 메시지가 없는 경우)
    const hasUserMessage = chatState.messages.some((msg: ChatMessage) => msg.type === 'patient');

    if (!hasUserMessage) {
      console.log('첫 번째 사용자 답변이므로 환자 데이터 설정');
      // 첫 번째 답변이므로 환자 데이터 설정 (기존 데이터 유지)
      const updateData = {
        name: message.message, // 첫 번째 답변을 이름으로 설정
      };

      // 로컬스토리지에 저장 (기존 데이터 유지)
      updatePatientData(updateData);
      setVisitDate(); // 진료일자 설정

      // 외부 콜백도 호출 (기존 호환성 유지)
      if (onPatientDataUpdate) {
        // 현재 저장된 전체 데이터를 가져와서 전달
        const currentStoredData = JSON.parse(localStorage.getItem('cathouse_patient_data') || '{}');
        const updatedData = { ...currentStoredData, ...updateData };
        onPatientDataUpdate(updatedData);
      }
    } else {
      // 기존 환자 데이터 업데이트 (포맷팅 전 원본 메시지 사용)
      updatePatientDataWithStep(chatState.currentStep, message.message);
    }
  };

  return {
    handleFirstAnswer,
  };
}
