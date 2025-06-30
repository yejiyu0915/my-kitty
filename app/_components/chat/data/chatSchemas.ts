import { z } from 'zod';
import { CHAT_STEP_DOMAINS } from './chatDomains';

// 사용자 입력 데이터 스키마
export const UserDataSchema = z.object({
  name: z
    .string()
    .min(2, '2글자 이상 입력해주세요')
    .regex(/^[가-힣a-zA-Z]+$/, '한글 또는 영문만 입력 가능합니다'),

  symptoms: z.string().min(1, '증상을 입력해주세요'),

  painLevel: z.enum(
    ['매우 심합니다.', '심합니다.', '보통입니다.', '약간 아픕니다.', '엄청 아프진 않아요.'],
    {
      errorMap: () => ({ message: '증상 강도를 선택해주세요' }),
    }
  ),

  birthDate: z.string().refine((val) => {
    if (!val) return false;
    const date = new Date(val);
    const minDate = new Date('1900-01-01');
    const maxDate = new Date();
    return date >= minDate && date <= maxDate;
  }, '올바른 생년월일을 선택해주세요'),

  gender: z.enum(['남성', '여성'], {
    errorMap: () => ({ message: '성별을 선택해주세요' }),
  }),

  visitReason: z.enum(
    [
      '인터넷 검색으로 알아보고 왔습니다.',
      '지인 소개로 알아보고 왔습니다.',
      '광고/홍보물로 알아보고 왔습니다.',
    ],
    {
      errorMap: () => ({ message: '방문 경위를 선택해주세요' }),
    }
  ),

  contact: z.string().regex(/^\d{10,11}$/, '올바른 전화번호를 입력해주세요 (숫자만)'),

  visitDateTime: z.string().refine((val) => {
    if (!val) return false;
    const date = new Date(val);
    const now = new Date();

    // 현재 시간 이후
    if (date <= now) return false;

    // 일요일 제외
    if (date.getDay() === 0) return false;

    // 9:00 ~ 18:00 시간대
    const hours = date.getHours();
    if (hours < 9 || hours >= 18) return false;

    // 30분 단위
    const minutes = date.getMinutes();
    if (minutes !== 0 && minutes !== 30) return false;

    return true;
  }, '일요일을 제외하고, 9:00~18:00 사이의 30분 단위 시간을 선택해주세요'),
});

// 도메인 스키마 (chatDomains에서 import)
export const ChatStepDomainSchema = z.enum(CHAT_STEP_DOMAINS);

// 채팅 단계 스키마
export const ChatStepSchema = z.object({
  id: z.string(),
  type: z.enum(['question', 'message']),
  domain: ChatStepDomainSchema, // 도메인 추가
  question: z.string().optional(),
  questionKey: z.string().optional(), // 답변 저장용 키 추가
  message: z.string().optional(),
  placeholder: z.string().optional(),
  validation: z.function().args(z.string()).returns(z.boolean()).optional(),
  errorMessage: z.string().optional(),
  messageFormat: z.function().args(z.string()).returns(z.string()).optional(),
  inputType: z
    .enum(['text', 'textarea', 'select', 'date', 'datetime-local', 'radio', 'number'])
    .optional(),
  options: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .optional(),
});

// 채팅 메시지 스키마
export const ChatMessageSchema = z.object({
  id: z.string(),
  message: z.string(),
  type: z.enum(['doctor', 'patient']).optional(),
});

// 채팅 상태 스키마
export const ChatStateSchema = z.object({
  messages: z.array(ChatMessageSchema),
  currentStep: z.number(),
  isWaiting: z.boolean(),
  showInput: z.boolean(),
  userData: z.record(z.string(), z.any()).optional(),
  validationErrors: z.record(z.string(), z.string()).optional(),
});

// 타입 추론
export type UserData = z.infer<typeof UserDataSchema>;
export type ChatStep = z.infer<typeof ChatStepSchema>;
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type ChatState = z.infer<typeof ChatStateSchema>;

// 부분적 사용자 데이터 타입 (선택적 필드)
export type PartialUserData = Partial<UserData>;
