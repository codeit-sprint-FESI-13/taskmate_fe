import { act, renderHook } from "@testing-library/react";

import type { ApiError } from "@/shared/lib/api/types";

import { useCreateTeamForm } from "./useCreateTeamForm";

const mockBack = jest.fn();
const mockToast = jest.fn();
const mockMutate = jest.fn();
const mockUseCreateTeamMutation = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ back: mockBack, push: jest.fn(), replace: jest.fn() }),
}));

jest.mock("@/shared/hooks/useToast", () => ({
  useToast: () => ({ toast: mockToast }),
}));

jest.mock("@/features/team/mutation/useCreateTeamMutation", () => ({
  useCreateTeamMutation: (...args: unknown[]) =>
    mockUseCreateTeamMutation(...args),
}));

const createSubmitEvent = (name: string) => {
  const mockGet = jest.fn().mockReturnValue(name);
  jest
    .spyOn(global, "FormData")
    .mockImplementationOnce(() => ({ get: mockGet }) as unknown as FormData);
  return {
    preventDefault: jest.fn(),
    currentTarget: {} as HTMLFormElement,
  } as unknown as React.FormEvent<HTMLFormElement>;
};

describe("useCreateTeamForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCreateTeamMutation.mockReturnValue({ mutate: mockMutate });
  });

  describe("폼 검증", () => {
    test("빈 이름 제출 시 nameError가 설정되고 mutate가 호출되지 않는다", () => {
      const { result } = renderHook(() => useCreateTeamForm());

      act(() => {
        result.current.handleSubmit(createSubmitEvent(""));
      });

      expect(result.current.nameError).toBe("팀 이름을 입력해주세요.");
      expect(mockMutate).not.toHaveBeenCalled();
    });

    test("공백만 있는 이름 제출 시 nameError가 설정된다", () => {
      const { result } = renderHook(() => useCreateTeamForm());

      act(() => {
        result.current.handleSubmit(createSubmitEvent("   "));
      });

      expect(result.current.nameError).toBe("팀 이름을 입력해주세요.");
      expect(mockMutate).not.toHaveBeenCalled();
    });

    test("50자 초과 이름 제출 시 nameError가 설정된다", () => {
      const { result } = renderHook(() => useCreateTeamForm());

      act(() => {
        result.current.handleSubmit(createSubmitEvent("a".repeat(51)));
      });

      expect(result.current.nameError).toBe(
        "팀 이름은 50자 이내로 입력해주세요.",
      );
      expect(mockMutate).not.toHaveBeenCalled();
    });

    test("유효한 이름 제출 시 nameError가 초기화된다", () => {
      const { result } = renderHook(() => useCreateTeamForm());

      act(() => {
        result.current.handleSubmit(createSubmitEvent(""));
      });
      expect(result.current.nameError).not.toBe("");

      act(() => {
        result.current.handleSubmit(createSubmitEvent("새로운 팀"));
      });

      expect(result.current.nameError).toBe("");
    });

    test("유효한 이름 제출 시 trim된 이름으로 mutate가 호출된다", () => {
      const { result } = renderHook(() => useCreateTeamForm());

      act(() => {
        result.current.handleSubmit(createSubmitEvent("  새로운 팀  "));
      });

      expect(mockMutate).toHaveBeenCalledWith("새로운 팀");
    });
  });

  describe("성공 처리", () => {
    test("onSuccess 시 성공 toast를 표시하고 이전 페이지로 이동한다", () => {
      let capturedOnSuccess: (() => void) | undefined;
      mockUseCreateTeamMutation.mockImplementation(
        ({ onSuccess }: { onSuccess: () => void }) => {
          capturedOnSuccess = onSuccess;
          return { mutate: mockMutate };
        },
      );

      renderHook(() => useCreateTeamForm());

      act(() => {
        capturedOnSuccess?.();
      });

      expect(mockToast).toHaveBeenCalledWith({
        variant: "success",
        title: "팀 생성 완료",
        description: "팀이 생성되었습니다.",
      });
      expect(mockBack).toHaveBeenCalledTimes(1);
    });
  });

  describe("에러 처리", () => {
    test("onError 시 서버 에러 메시지로 toast를 표시한다", () => {
      let capturedOnError: ((error: ApiError) => void) | undefined;
      mockUseCreateTeamMutation.mockImplementation(
        ({ onError }: { onError: (e: ApiError) => void }) => {
          capturedOnError = onError;
          return { mutate: mockMutate };
        },
      );

      renderHook(() => useCreateTeamForm());

      act(() => {
        capturedOnError?.({
          status: 400,
          code: "VALIDATION_ERROR",
          message: "이미 존재하는 팀 이름입니다.",
        });
      });

      expect(mockToast).toHaveBeenCalledWith({
        variant: "error",
        title: "팀 생성 실패",
        description: "이미 존재하는 팀 이름입니다.",
      });
    });

    test("onError 시 error.message가 없으면 기본 메시지로 toast를 표시한다", () => {
      let capturedOnError: ((error: ApiError) => void) | undefined;
      mockUseCreateTeamMutation.mockImplementation(
        ({ onError }: { onError: (e: ApiError) => void }) => {
          capturedOnError = onError;
          return { mutate: mockMutate };
        },
      );

      renderHook(() => useCreateTeamForm());

      act(() => {
        capturedOnError?.({
          status: 500,
          code: "INTERNAL_ERROR",
          message: undefined as unknown as string,
        });
      });

      expect(mockToast).toHaveBeenCalledWith({
        variant: "error",
        title: "팀 생성 실패",
        description: "잠시 후 다시 시도해주세요.",
      });
    });
  });
});
