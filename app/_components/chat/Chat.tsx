'use client';
import ChatHeader from './ui/legacy/ChatHeader';
import ChatContent from './ui/legacy/ChatContent';
import ChatBottom from './ui/legacy/ChatBottom';
import ChatLayout from './ui/ChatLayout';
import { useChatState } from './hooks/useChatState';
import { useMessageHandler } from './utils/chatMessageHandler';
import { ChatMessage } from './data/chatSchemas';
import { chatSteps } from './data/chatSteps';
import { usePatientData } from './hooks/usePatientData';
import { getNextStep } from './utils/stepUtils';
import { useState, useEffect } from 'react';

interface PatientData {
  name?: string;
  birthDate?: string;
  gender?: string;
  phone?: string;
  visitPath?: string;
  symptoms?: string;
  painLevel?: string;
  visitDateTime?: string;
}

interface ChatProps {
  onPatientDataUpdate?: (data: PatientData) => void;
}

export default function Chat({ onPatientDataUpdate }: ChatProps) {
  const { chatState, setChatState } = useChatState();
  const { handleSendMessage } = useMessageHandler(chatState, setChatState);
  const { updatePatientData, setVisitDate, saveAnswer } = usePatientData();
  const [showFinishMessage, setShowFinishMessage] = useState(false);
  const [isLoadedFromStorage, setIsLoadedFromStorage] = useState(false);

  // 대화가 종료되었는지 확인 (다음 단계가 없고, 대기 중이 아니고, 입력창이 숨겨져 있을 때)
  const isConversationFinished = () => {
    const nextStep = getNextStep(chatState.currentStep);
    return nextStep === null && !chatState.isWaiting && !chatState.showInput;
  };

  // 저장된 대화를 불러왔는지 확인
  useEffect(() => {
    const savedConversation = localStorage.getItem('cathouse_conversation_data');
    if (savedConversation) {
      setIsLoadedFromStorage(true);
    }
  }, []);

  // 대화 종료 시 안내 메시지 표시
  useEffect(() => {
    if (isConversationFinished()) {
      if (isLoadedFromStorage) {
        // 저장된 대화를 불러온 경우 즉시 안내 메시지 표시
        setShowFinishMessage(true);
      } else {
        // 새로 완료된 대화인 경우 2초 후 안내 메시지 표시
        const timer = setTimeout(() => {
          setShowFinishMessage(true);

          // 대화 내용을 localStorage에 저장
          const conversationData = {
            messages: chatState.messages,
            currentStep: chatState.currentStep,
            timestamp: new Date().toISOString(),
          };
          localStorage.setItem('cathouse_conversation_data', JSON.stringify(conversationData));
          console.log('대화 내용 저장됨:', conversationData);
        }, 2000);

        return () => clearTimeout(timer);
      }
    } else {
      setShowFinishMessage(false);
    }
  }, [
    chatState.currentStep,
    chatState.isWaiting,
    chatState.showInput,
    chatState.messages,
    isLoadedFromStorage,
  ]);

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

  // 답변 내용 저장 함수
  const saveAnswerContent = (currentStep: number, message: string) => {
    const currentStepData = chatSteps[currentStep];
    const questionKey = currentStepData.questionKey || `질문_${currentStep + 1}`;

    // 답변 내용을 로컬스토리지에 저장
    saveAnswer(questionKey, message);
    console.log(`답변 내용 저장: ${questionKey} = ${message}`);
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

      // 답변 내용도 저장
      saveAnswerContent(chatState.currentStep, message.message);

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

      // 답변 내용도 저장
      saveAnswerContent(chatState.currentStep, message.message);
    }
  };

  // 메시지 핸들러 래핑
  const handleSendMessageWithUpdate = (message: ChatMessage) => {
    // 포맷팅 전의 원본 메시지로 환자 데이터 업데이트
    handleFirstAnswer(message);
    handleSendMessage(message);
  };

  return (
    <ChatLayout
      header={<ChatHeader />}
      input={
        <ChatBottom
          currentStep={chatState.currentStep}
          onSendMessage={handleSendMessageWithUpdate}
          isTyping={chatState.isWaiting}
          showInput={chatState.showInput}
        />
      }
    >
      <ChatContent
        messages={chatState.messages}
        isWaiting={chatState.isWaiting}
        showInput={chatState.showInput}
        isConversationFinished={showFinishMessage}
      />
    </ChatLayout>
  );
}
