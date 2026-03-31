// validateTeamName
export const validateTeamName = (raw: string): string | null => {
  const value = raw.trim(); // 앞뒤 공백만 제거

  //if (!value)는 value가 빈 문자열("")이면 true
  if (!value) return "팀명을 입력해주세요.";

  return null;
};

// validateEmail
export const validateEmail = (raw: string): string | null => {
  const value = raw.trim();

  if (!value) return "이메일을 입력해주세요.";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value)) {
    return "올바른 이메일 형식이 아닙니다.";
  }

  return null;
};
