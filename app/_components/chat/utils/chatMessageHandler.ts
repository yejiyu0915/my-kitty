import { useCallback } from 'react';
import { ChatMessage, ChatState } from '../types/chat';
import { chatSteps } from '../data/chatSteps';
import { formatMessage } from './chatMessage';
import { formatAge } from '../utils/chatFormatter';

export function useMessageHandler(
  chatState: ChatState,
  setChatState: React.Dispatch<React.SetStateAction<ChatState>>
) {
  const handleSendMessage = useCallback(
    (message: ChatMessage) => {
      const formattedMessage = {
        ...formatMessage(message, chatState.currentStep),
        type: 'patient' as const,
      };

      // 사용자 메시지 추가 및 input 숨기기
      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, formattedMessage],
        showInput: false, // input 숨기기
      }));

      if (chatState.currentStep < chatSteps.length - 1) {
        const nextStep = chatState.currentStep + 1;
        const nextStepData = chatSteps[nextStep];

        // 다음 단계가 message 타입인 경우 (답변을 받지 않는 메시지)
        if (nextStepData.type === 'message') {
          setChatState((prev) => ({
            ...prev,
            currentStep: nextStep,
          }));

          // message 타입 메시지 표시
          setTimeout(() => {
            setChatState((prev) => ({
              ...prev,
              isWaiting: true,
            }));

            setTimeout(() => {
              // 6번째 단계(만 나이)인 경우 동적으로 나이 계산
              let messageText = nextStepData.message!;
              if (nextStep === 6) {
                messageText = formatAge(message.message);
              }

              setChatState((prev) => ({
                ...prev,
                messages: [
                  ...prev.messages,
                  {
                    id: `message-${nextStep}`,
                    message: messageText,
                    type: 'doctor',
                  },
                ],
                isWaiting: false,
              }));

              // message 타입 메시지 후 다음 단계로 자동 진행
              setTimeout(() => {
                if (nextStep + 1 < chatSteps.length) {
                  const nextNextStep = nextStep + 1;
                  const nextNextStepData = chatSteps[nextNextStep];

                  setChatState((prev) => ({
                    ...prev,
                    currentStep: nextNextStep,
                  }));

                  // 다음 단계가 question 타입인 경우 해당 메시지 표시
                  if (nextNextStepData.type === 'question') {
                    setTimeout(() => {
                      setChatState((prev) => ({
                        ...prev,
                        isWaiting: true,
                      }));

                      setTimeout(() => {
                        // {name} 플레이스홀더 치환
                        let questionText = nextNextStepData.question!;
                        if (questionText.includes('{name}')) {
                          questionText = questionText.replace('{name}', message.message);
                        }

                        setChatState((prev) => ({
                          ...prev,
                          messages: [
                            ...prev.messages,
                            {
                              id: `question-${nextNextStep}`,
                              message: questionText,
                              type: 'doctor',
                            },
                          ],
                          isWaiting: false,
                        }));

                        // question 메시지 완료 후 input 표시
                        setTimeout(() => {
                          setChatState((prev) => ({
                            ...prev,
                            showInput: true,
                          }));
                        }, 500);
                      }, 1000);
                    }, 500);
                  } else if (nextNextStepData.type === 'message') {
                    // 다음 단계도 message 타입인 경우 자동으로 진행
                    setTimeout(() => {
                      setChatState((prev) => ({
                        ...prev,
                        isWaiting: true,
                      }));

                      setTimeout(() => {
                        setChatState((prev) => ({
                          ...prev,
                          messages: [
                            ...prev.messages,
                            {
                              id: `message-${nextNextStep}`,
                              message: nextNextStepData.message!,
                              type: 'doctor',
                            },
                          ],
                          isWaiting: false,
                        }));

                        // 연속된 message 타입 처리 (재귀적으로 다음 단계 확인)
                        setTimeout(() => {
                          if (nextNextStep + 1 < chatSteps.length) {
                            const nextNextNextStep = nextNextStep + 1;
                            const nextNextNextStepData = chatSteps[nextNextNextStep];

                            if (nextNextNextStepData.type === 'question') {
                              setChatState((prev) => ({
                                ...prev,
                                currentStep: nextNextNextStep,
                              }));

                              setTimeout(() => {
                                setChatState((prev) => ({
                                  ...prev,
                                  isWaiting: true,
                                }));

                                setTimeout(() => {
                                  // {name} 플레이스홀더 치환
                                  let questionText = nextNextNextStepData.question!;
                                  if (questionText.includes('{name}')) {
                                    questionText = questionText.replace('{name}', message.message);
                                  }

                                  setChatState((prev) => ({
                                    ...prev,
                                    messages: [
                                      ...prev.messages,
                                      {
                                        id: `question-${nextNextNextStep}`,
                                        message: questionText,
                                        type: 'doctor',
                                      },
                                    ],
                                    isWaiting: false,
                                  }));

                                  // question 메시지 완료 후 input 표시
                                  setTimeout(() => {
                                    setChatState((prev) => ({
                                      ...prev,
                                      showInput: true,
                                    }));
                                  }, 500);
                                }, 1000);
                              }, 500);
                            }
                          }
                        }, 1000);
                      }, 1000);
                    }, 500);
                  }
                }
              }, 1000);
            }, 1000);
          }, 500);
        } else {
          // 다음 단계가 question 타입인 경우 (일반적인 메시지 시퀀스)
          setChatState((prev) => ({
            ...prev,
            currentStep: nextStep,
          }));

          // question 타입 직접 처리
          setTimeout(() => {
            setChatState((prev) => ({
              ...prev,
              isWaiting: true,
            }));

            setTimeout(() => {
              // {name} 플레이스홀더 치환
              let questionText = nextStepData.question!;
              if (questionText.includes('{name}')) {
                questionText = questionText.replace('{name}', message.message);
              }

              setChatState((prev) => ({
                ...prev,
                messages: [
                  ...prev.messages,
                  {
                    id: `question-${nextStep}`,
                    message: questionText,
                    type: 'doctor',
                  },
                ],
                isWaiting: false,
              }));

              // question 메시지 완료 후 input 표시
              setTimeout(() => {
                setChatState((prev) => ({
                  ...prev,
                  showInput: true,
                }));
              }, 500);
            }, 1000);
          }, 500);
        }
      }
    },
    [chatState.currentStep]
  );

  return { handleSendMessage };
}
