import { act, renderHook } from "@testing-library/react";

import { useToast } from "@/shared/hooks/useToast";

import { useCreateTodoMutation } from "../mutation/useCreateTodoMutation";
import { useCreateTodoForm } from "./useCreateTodoForm";

jest.mock("@/shared/hooks/useToast");
jest.mock("../mutation/useCreateTodoMutation");

const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;
const mockUseCreateTodoMutation = useCreateTodoMutation as jest.MockedFunction<
  typeof useCreateTodoMutation
>;

const makeMockMutate = () => jest.fn();

const defaultParams = {
  goalId: "1",
  onSuccess: jest.fn(),
  initialAssigneeIds: [10],
};

describe("useCreateTodoForm", () => {
  let mockToast: jest.Mock;
  let mockMutate: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockToast = jest.fn();
    mockMutate = makeMockMutate();

    mockUseToast.mockReturnValue({
      toast: mockToast,
    } as unknown as ReturnType<typeof useToast>);

    mockUseCreateTodoMutation.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    } as unknown as ReturnType<typeof useCreateTodoMutation>);
  });

  describe("초기 상태", () => {
    test("initialAssigneeIds로 assigneeIds를 초기화한다", () => {
      const { result } = renderHook(() => useCreateTodoForm(defaultParams));
      expect(result.current.assigneeIds).toEqual([10]);
    });

    test("initialAssigneeIds가 없으면 빈 배열로 초기화한다", () => {
      const { result } = renderHook(() =>
        useCreateTodoForm({ goalId: "1", onSuccess: jest.fn() }),
      );
      expect(result.current.assigneeIds).toEqual([]);
    });

    test("startDate의 초기값은 빈 문자열이다", () => {
      const { result } = renderHook(() => useCreateTodoForm(defaultParams));
      expect(result.current.startDate).toBe("");
    });

    test("isPending은 mutation의 isPending을 그대로 반환한다", () => {
      mockUseCreateTodoMutation.mockReturnValue({
        mutate: mockMutate,
        isPending: true,
      } as unknown as ReturnType<typeof useCreateTodoMutation>);

      const { result } = renderHook(() => useCreateTodoForm(defaultParams));
      expect(result.current.isPending).toBe(true);
    });
  });

  describe("handleStartDateChange", () => {
    test("startDate 상태를 업데이트한다", () => {
      const { result } = renderHook(() => useCreateTodoForm(defaultParams));

      act(() => {
        result.current.handleStartDateChange({
          target: { value: "2026-05-01" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.startDate).toBe("2026-05-01");
    });
  });

  describe("setAssigneeIds", () => {
    test("assigneeIds를 업데이트한다", () => {
      const { result } = renderHook(() => useCreateTodoForm(defaultParams));

      act(() => {
        result.current.setAssigneeIds([1, 2, 3]);
      });

      expect(result.current.assigneeIds).toEqual([1, 2, 3]);
    });
  });

  describe("handleSubmit", () => {
    test("dueDate가 startDate보다 이른 경우 에러 토스트를 표시하고 제출을 중단한다", () => {
      const { result } = renderHook(() => useCreateTodoForm(defaultParams));

      const formData = new Map<string, string>([
        ["title", "테스트 할 일"],
        ["startDate", "2026-05-10"],
        ["dueDate", "2026-05-01"],
        ["memo", ""],
      ]);

      const mockFormData = jest.spyOn(global, "FormData").mockImplementation(
        () =>
          ({
            get: (key: string) => formData.get(key) ?? null,
          }) as unknown as FormData,
      );

      const event = {
        preventDefault: jest.fn(),
        currentTarget: {},
      } as unknown as React.FormEvent<HTMLFormElement>;

      act(() => {
        result.current.handleSubmit(event);
      });

      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          variant: "error",
          title: "날짜 입력 오류",
        }),
      );
      expect(mockMutate).not.toHaveBeenCalled();

      mockFormData.mockRestore();
    });

    test("dueDate가 startDate와 같은 경우 createTodo를 호출한다", () => {
      const { result } = renderHook(() => useCreateTodoForm(defaultParams));

      const formData = new Map<string, string>([
        ["title", "테스트 할 일"],
        ["startDate", "2026-05-01"],
        ["dueDate", "2026-05-01"],
        ["memo", ""],
      ]);

      const mockFormData = jest.spyOn(global, "FormData").mockImplementation(
        () =>
          ({
            get: (key: string) => formData.get(key) ?? null,
          }) as unknown as FormData,
      );

      const event = {
        preventDefault: jest.fn(),
        currentTarget: {},
      } as unknown as React.FormEvent<HTMLFormElement>;

      act(() => {
        result.current.handleSubmit(event);
      });

      expect(mockToast).not.toHaveBeenCalled();
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          goalId: "1",
          todoData: expect.objectContaining({
            title: "테스트 할 일",
            startDate: "2026-05-01",
            dueDate: "2026-05-01",
            assigneeIds: [10],
          }),
        }),
        expect.objectContaining({ onSuccess: defaultParams.onSuccess }),
      );

      mockFormData.mockRestore();
    });

    test("dueDate가 startDate보다 늦은 경우 createTodo를 호출한다", () => {
      const { result } = renderHook(() => useCreateTodoForm(defaultParams));

      const formData = new Map<string, string>([
        ["title", "마감일 테스트"],
        ["startDate", "2026-05-01"],
        ["dueDate", "2026-05-31"],
        ["memo", "메모 내용"],
      ]);

      const mockFormData = jest.spyOn(global, "FormData").mockImplementation(
        () =>
          ({
            get: (key: string) => formData.get(key) ?? null,
          }) as unknown as FormData,
      );

      const event = {
        preventDefault: jest.fn(),
        currentTarget: {},
      } as unknown as React.FormEvent<HTMLFormElement>;

      act(() => {
        result.current.handleSubmit(event);
      });

      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          goalId: "1",
          todoData: expect.objectContaining({
            title: "마감일 테스트",
            memo: "메모 내용",
          }),
        }),
        expect.anything(),
      );

      mockFormData.mockRestore();
    });

    test("startDate 또는 dueDate가 빈 문자열이면 날짜 검사를 건너뛴다", () => {
      const { result } = renderHook(() => useCreateTodoForm(defaultParams));

      const formData = new Map<string, string>([
        ["title", "날짜 없는 할 일"],
        ["startDate", ""],
        ["dueDate", ""],
        ["memo", ""],
      ]);

      const mockFormData = jest.spyOn(global, "FormData").mockImplementation(
        () =>
          ({
            get: (key: string) => formData.get(key) ?? null,
          }) as unknown as FormData,
      );

      const event = {
        preventDefault: jest.fn(),
        currentTarget: {},
      } as unknown as React.FormEvent<HTMLFormElement>;

      act(() => {
        result.current.handleSubmit(event);
      });

      expect(mockToast).not.toHaveBeenCalled();
      expect(mockMutate).toHaveBeenCalled();

      mockFormData.mockRestore();
    });

    test("폼 제출 시 e.preventDefault()를 호출한다", () => {
      const { result } = renderHook(() => useCreateTodoForm(defaultParams));

      const formData = new Map<string, string>([
        ["title", "t"],
        ["startDate", "2026-05-01"],
        ["dueDate", "2026-05-02"],
        ["memo", ""],
      ]);

      const mockFormData = jest.spyOn(global, "FormData").mockImplementation(
        () =>
          ({
            get: (key: string) => formData.get(key) ?? null,
          }) as unknown as FormData,
      );

      const preventDefault = jest.fn();
      const event = {
        preventDefault,
        currentTarget: {},
      } as unknown as React.FormEvent<HTMLFormElement>;

      act(() => {
        result.current.handleSubmit(event);
      });

      expect(preventDefault).toHaveBeenCalledTimes(1);

      mockFormData.mockRestore();
    });
  });
});
