import { z } from 'zod';
import { UserDataSchema, UserData, PartialUserData } from '../data/chatSchemas';
import { ChatStepDomain, CHAT_STEP_DOMAINS } from '../data/chatDomains';
import { isValidDateRange, isValidVisitTime } from './chatFormatter';

/**
 * 채팅 입력 유효성 검사 클래스
 *
 * 각 도메인별 유효성 검사 로직을 중앙에서 관리합니다.
 */
export class ChatValidator {
  /**
   * 도메인별 유효성 검사
   */
  static validateByDomain(
    domain: ChatStepDomain,
    value: string
  ): { isValid: boolean; error?: string } {
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
          // date-fns를 활용한 추가 검증
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
          // date-fns를 활용한 추가 검증
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
  }

  /**
   * 단계별 유효성 검사 (기존 호환성을 위해 유지)
   */
  static validateByStep(step: number, value: string): { isValid: boolean; error?: string } {
    const domain = CHAT_STEP_DOMAINS[step];
    if (!domain) {
      return { isValid: true }; // 유효성 검사가 필요 없는 단계
    }
    return this.validateByDomain(domain, value);
  }

  /**
   * 전체 사용자 데이터 유효성 검사
   */
  static validateUserData(data: PartialUserData): {
    isValid: boolean;
    errors?: Record<string, string>;
  } {
    try {
      UserDataSchema.parse(data);
      return { isValid: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        return { isValid: false, errors };
      }
      return { isValid: false, errors: { general: '알 수 없는 오류가 발생했습니다' } };
    }
  }

  /**
   * 특정 필드만 유효성 검사
   */
  static validateField<T extends keyof UserData>(
    field: T,
    value: UserData[T]
  ): { isValid: boolean; error?: string } {
    try {
      UserDataSchema.shape[field].parse(value);
      return { isValid: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { isValid: false, error: error.errors[0].message };
      }
      return { isValid: false, error: '알 수 없는 오류가 발생했습니다' };
    }
  }
}
