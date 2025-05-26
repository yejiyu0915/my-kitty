// 이름 유효성 검사 정규식
export const NAME_REGEX = /^[가-힣a-zA-Z]{2,}$/;

export const validateName = (value: string): boolean => {
  return NAME_REGEX.test(value);
};
