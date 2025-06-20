import { z } from 'zod';
import { UserDataSchema, UserData, PartialUserData } from '../schemas/chatSchemas';
import { isValidDateRange, isValidVisitTime } from './chatFormatter';

export class ChatValidator {
  /**
   * 이름 유효성 검사
   */
  static validateName(value: string): { isValid: boolean; error?: string } {
    try {
      UserDataSchema.shape.name.parse(value);
      return { isValid: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { isValid: false, error: error.errors[0].message };
      }
      return { isValid: false, error: '알 수 없는 오류가 발생했습니다' };
    }
  }

  /**
   * 증상 유효성 검사
   */
  static validateSymptoms(value: string): { isValid: boolean; error?: string } {
    try {
      UserDataSchema.shape.symptoms.parse(value);
      return { isValid: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { isValid: false, error: error.errors[0].message };
      }
      return { isValid: false, error: '알 수 없는 오류가 발생했습니다' };
    }
  }

  /**
   * 통증 강도 유효성 검사
   */
  static validatePainLevel(value: string): { isValid: boolean; error?: string } {
    try {
      UserDataSchema.shape.painLevel.parse(value);
      return { isValid: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { isValid: false, error: error.errors[0].message };
      }
      return { isValid: false, error: '알 수 없는 오류가 발생했습니다' };
    }
  }

  /**
   * 생년월일 유효성 검사 (date-fns 활용)
   */
  static validateBirthDate(value: string): { isValid: boolean; error?: string } {
    try {
      // Zod 스키마 검증
      UserDataSchema.shape.birthDate.parse(value);

      // date-fns를 활용한 추가 검증
      const minDate = new Date('1900-01-01');
      const maxDate = new Date();

      if (!isValidDateRange(value, minDate, maxDate)) {
        return { isValid: false, error: '올바른 생년월일을 선택해주세요' };
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
   * 성별 유효성 검사
   */
  static validateGender(value: string): { isValid: boolean; error?: string } {
    try {
      UserDataSchema.shape.gender.parse(value);
      return { isValid: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { isValid: false, error: error.errors[0].message };
      }
      return { isValid: false, error: '알 수 없는 오류가 발생했습니다' };
    }
  }

  /**
   * 방문 경위 유효성 검사
   */
  static validateVisitReason(value: string): { isValid: boolean; error?: string } {
    try {
      UserDataSchema.shape.visitReason.parse(value);
      return { isValid: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { isValid: false, error: error.errors[0].message };
      }
      return { isValid: false, error: '알 수 없는 오류가 발생했습니다' };
    }
  }

  /**
   * 연락처 유효성 검사
   */
  static validateContact(value: string): { isValid: boolean; error?: string } {
    try {
      UserDataSchema.shape.contact.parse(value);
      return { isValid: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { isValid: false, error: error.errors[0].message };
      }
      return { isValid: false, error: '알 수 없는 오류가 발생했습니다' };
    }
  }

  /**
   * 방문 날짜/시간 유효성 검사 (date-fns 활용)
   */
  static validateVisitDateTime(value: string): { isValid: boolean; error?: string } {
    try {
      // Zod 스키마 검증
      UserDataSchema.shape.visitDateTime.parse(value);

      // date-fns를 활용한 추가 검증
      if (!isValidVisitTime(value)) {
        return {
          isValid: false,
          error: '일요일을 제외하고, 9:00~18:00 사이의 30분 단위 시간을 선택해주세요',
        };
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
   * 단계별 유효성 검사 (통합 함수)
   */
  static validateByStep(step: number, value: string): { isValid: boolean; error?: string } {
    switch (step) {
      case 0: // 이름
        return this.validateName(value);
      case 1: // 증상
        return this.validateSymptoms(value);
      case 2: // 통증 강도
        return this.validatePainLevel(value);
      case 5: // 생년월일
        return this.validateBirthDate(value);
      case 7: // 성별
        return this.validateGender(value);
      case 8: // 방문 경위
        return this.validateVisitReason(value);
      case 9: // 연락처
        return this.validateContact(value);
      case 11: // 방문 날짜/시간
        return this.validateVisitDateTime(value);
      default:
        return { isValid: true }; // 유효성 검사가 필요 없는 단계
    }
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
