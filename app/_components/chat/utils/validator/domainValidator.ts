import { z } from 'zod';
import { UserDataSchema } from '../../data/chatSchemas';
import { ChatStepDomain } from '../../data/chatDomains';
import { isValidDateRange, isValidVisitTime } from '../formatter/dateValidator';

// 도메인별 유효성 검사 함수
export const validateByDomain = (
  domain: ChatStepDomain,
  value: string
): { isValid: boolean; error?: string } => {
  try {
    switch (domain) {
      case 'greeting': // 이름
        UserDataSchema.shape.name.parse(value);
        break;
      case 'symptoms': // 증상
        UserDataSchema.shape.symptoms.parse(value);
        break;
      case 'pain_level': // 통증 강도
        UserDataSchema.shape.painLevel.parse(value);
        break;
      case 'birth_date': {
        // 생년월일
        UserDataSchema.shape.birthDate.parse(value);
        const minDate = new Date('1900-01-01');
        const maxDate = new Date();
        if (!isValidDateRange(value, minDate, maxDate)) {
          return { isValid: false, error: '올바른 생년월일을 선택해주세요' };
        }
        break;
      }
      case 'gender': // 성별
        UserDataSchema.shape.gender.parse(value);
        break;
      case 'visit_reason': // 방문 경위
        UserDataSchema.shape.visitReason.parse(value);
        break;
      case 'contact': // 연락처
        UserDataSchema.shape.contact.parse(value);
        break;
      case 'appointment': {
        // 방문 날짜/시간
        UserDataSchema.shape.visitDateTime.parse(value);
        if (!isValidVisitTime(value)) {
          return {
            isValid: false,
            error: '일요일을 제외하고, 9:00~18:00 사이의 30분 단위 시간을 선택해주세요',
          };
        }
        break;
      }
      default:
        return { isValid: true }; // 유효성 검사가 필요 없는 도메인
    }
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0].message };
    }
    return { isValid: false, error: '알 수 없는 오류가 발생했습니다' };
  }
};
