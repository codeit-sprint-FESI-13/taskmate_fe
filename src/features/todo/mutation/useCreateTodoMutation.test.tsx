import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";

import { useToast } from "@/shared/hooks/useToast";
import { server } from "@/shared/mock/server";

import { useCreateTodoMutation } from "./useCreateTodoMutation";

jest.mock("@/shared/hooks/useToast");

const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  return { queryClient, Wrapper };
};

const validPayload = {
  goalId: "1",
  todoData: {
    title: "테스트 할 일",
    startDate: "2026-05-01",
    dueDate: "2026-05-31",
    assigneeIds: [] as number[],
    memo: "",
  },
};

describe("useCreateTodoMutation", () => {
  let mockToast: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockToast = jest.fn();
    mockUseToast.mockReturnValue({
      toast: mockToast,
    } as unknown as ReturnType<typeof useToast>);
  });

  describe("onSuccess", () => {
    test("할 일 목록 캐시를 무효화한다", async () => {
      const { queryClient, Wrapper } = createWrapper();
      const spy = jest.spyOn(queryClient, "invalidateQueries");

      const { result } = renderHook(() => useCreateTodoMutation(), {
        wrapper: Wrapper,
      });

      act(() => {
        result.current.mutate(validPayload);
      });

      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(
          expect.objectContaining({
            queryKey: ["todo", "1", "list"],
          }),
        );
      });
    });

    test("성공 토스트를 표시한다", async () => {
      const { Wrapper } = createWrapper();

      const { result } = renderHook(() => useCreateTodoMutation(), {
        wrapper: Wrapper,
      });

      act(() => {
        result.current.mutate(validPayload);
      });

      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith(
          expect.objectContaining({
            variant: "success",
            title: "할 일 생성 완료",
          }),
        );
      });
    });
  });

  describe("onError", () => {
    beforeEach(() => {
      server.use(
        http.post("*/api/goals/:goalId/todos", () =>
          HttpResponse.json({ message: "서버 오류" }, { status: 500 }),
        ),
      );
    });

    test("에러 토스트를 표시한다", async () => {
      const { Wrapper } = createWrapper();

      const { result } = renderHook(() => useCreateTodoMutation(), {
        wrapper: Wrapper,
      });

      act(() => {
        result.current.mutate(validPayload);
      });

      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith(
          expect.objectContaining({
            variant: "error",
            title: "할 일 생성 실패",
          }),
        );
      });
    });

    test("에러 메시지를 토스트 description에 담는다", async () => {
      const { Wrapper } = createWrapper();

      const { result } = renderHook(() => useCreateTodoMutation(), {
        wrapper: Wrapper,
      });

      act(() => {
        result.current.mutate(validPayload);
      });

      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith(
          expect.objectContaining({
            variant: "error",
            description: "서버 오류",
          }),
        );
      });
    });
  });
});
