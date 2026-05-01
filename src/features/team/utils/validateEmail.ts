export const validateEmail = (raw: string): string | null => {
  const value = raw.trim();

  if (!value) return "이메일을 입력해주세요.";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value)) {
    return "올바른 이메일 형식이 아닙니다.";
  }

  return null;
};
