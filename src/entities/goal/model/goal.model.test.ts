import { createGoalSchema } from "./goal.model";

describe("createGoalSchema", () => {
  describe("name 필드", () => {
    test("유효한 이름은 통과한다", () => {
      const result = createGoalSchema.safeParse({
        name: "알고리즘 학습",
        dueDate: "2026-12-31",
      });
      expect(result.success).toBe(true);
    });

    test("빈 문자열이면 실패하고 에러 메시지를 반환한다", () => {
      const result = createGoalSchema.safeParse({
        name: "",
        dueDate: "2026-12-31",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "목표 이름을 입력해주세요.",
        );
      }
    });

    test("공백만 있으면 trim 처리 후 실패한다", () => {
      const result = createGoalSchema.safeParse({
        name: "   ",
        dueDate: "2026-12-31",
      });
      expect(result.success).toBe(false);
    });

    test("30자 이름은 통과한다 (최대 경계값)", () => {
      const result = createGoalSchema.safeParse({
        name: "가".repeat(30),
        dueDate: "2026-12-31",
      });
      expect(result.success).toBe(true);
    });

    test("31자 이름은 실패하고 에러 메시지를 반환한다", () => {
      const result = createGoalSchema.safeParse({
        name: "가".repeat(31),
        dueDate: "2026-12-31",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "목표 이름은 30자 이내로 입력해주세요.",
        );
      }
    });

    test("앞뒤 공백을 제거한 뒤 유효하면 통과한다", () => {
      const result = createGoalSchema.safeParse({
        name: "  목표  ",
        dueDate: "2026-12-31",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("목표");
      }
    });
  });

  describe("dueDate 필드", () => {
    test("날짜 문자열이 있으면 통과한다", () => {
      const result = createGoalSchema.safeParse({
        name: "목표",
        dueDate: "2026-12-31",
      });
      expect(result.success).toBe(true);
    });

    test("빈 문자열이면 실패하고 에러 메시지를 반환한다", () => {
      const result = createGoalSchema.safeParse({
        name: "목표",
        dueDate: "",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("날짜를 선택해주세요.");
      }
    });
  });

  describe("전체 유효성 검사", () => {
    test("name과 dueDate가 모두 유효하면 통과한다", () => {
      const result = createGoalSchema.safeParse({
        name: "React 학습",
        dueDate: "2026-06-30",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({
          name: "React 학습",
          dueDate: "2026-06-30",
        });
      }
    });

    test("name과 dueDate가 모두 없으면 두 가지 에러를 반환한다", () => {
      const result = createGoalSchema.safeParse({ name: "", dueDate: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(2);
      }
    });
  });
});
