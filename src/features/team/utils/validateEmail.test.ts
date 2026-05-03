import { validateEmail } from "./validateEmail";

describe("validateEmail", () => {
  test("빈 문자열이면 '이메일을 입력해주세요.' 를 반환한다", () => {
    expect(validateEmail("")).toBe("이메일을 입력해주세요.");
  });

  test("공백만 있으면 '이메일을 입력해주세요.' 를 반환한다", () => {
    expect(validateEmail("   ")).toBe("이메일을 입력해주세요.");
  });

  test("@ 없는 문자열이면 '올바른 이메일 형식이 아닙니다.' 를 반환한다", () => {
    expect(validateEmail("notanemail")).toBe("올바른 이메일 형식이 아닙니다.");
  });

  test("도메인 없는 형식이면 '올바른 이메일 형식이 아닙니다.' 를 반환한다", () => {
    expect(validateEmail("user@")).toBe("올바른 이메일 형식이 아닙니다.");
  });

  test("유효한 이메일이면 null을 반환한다", () => {
    expect(validateEmail("user@example.com")).toBeNull();
  });

  test("앞뒤 공백이 있어도 유효한 이메일이면 null을 반환한다", () => {
    expect(validateEmail("  user@example.com  ")).toBeNull();
  });
});
