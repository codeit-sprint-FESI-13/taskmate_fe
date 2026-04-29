import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";

import { useToast } from "@/shared/hooks/useToast";
import { server } from "@/shared/mock/server";

import { useDeleteTodoMutation } from "./useDeleteTodoMutation";

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

const validVariables = { goalId: "1", todoId: "5" };

describe("useDeleteTodoMutation", () => {
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

      const { result } = renderHook(() => useDeleteTodoMutation(), {
        wrapper: Wrapper,
      });

      act(() => {
        result.current.mutate(validVariables);
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

      const { result } = renderHook(() => useDeleteTodoMutation(), {
        wrapper: Wrapper,
      });

      act(() => {
        result.current.mutate(validVariables);
      });

      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith(
          expect.objectContaining({
            variant: "success",
            title: "할 일 삭제 완료",
          }),
        );
      });
    });

    test("onSuccess 콜백을 호출한다", async () => {
      const { Wrapper } = createWrapper();
      const onSuccessCallback = jest.fn();

      const { result } = renderHook(
        () => useDeleteTodoMutation({ onSuccess: onSuccessCallback }),
        { wrapper: Wrapper },
      );

      act(() => {
        result.current.mutate(validVariables);
      });

      await waitFor(() => {
        expect(onSuccessCallback).toHaveBeenCalledTimes(1);
      });
    });

    test("onSuccess 콜백 없이도 동작한다", async () => {
      const { Wrapper } = createWrapper();

      const { result } = renderHook(() => useDeleteTodoMutation(), {
        wrapper: Wrapper,
      });

      await expect(
        act(() => {
          result.current.mutate(validVariables);
        }),
      ).resolves.not.toThrow();
    });
  });

  describe("onError", () => {
    beforeEach(() => {
      server.use(
        http.delete("*/api/goals/:goalId/todos/:todoId", () =>
          HttpResponse.json({ message: "삭제 실패" }, { status: 500 }),
        ),
      );
    });

    test("에러 토스트를 표시한다", async () => {
      const { Wrapper } = createWrapper();

      const { result } = renderHook(() => useDeleteTodoMutation(), {
        wrapper: Wrapper,
      });

      act(() => {
        result.current.mutate(validVariables);
      });

      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith(
          expect.objectContaining({
            variant: "error",
            title: "할 일 삭제 실패",
          }),
        );
      });
    });

    test("에러 시 onSuccess 콜백을 호출하지 않는다", async () => {
      const { Wrapper } = createWrapper();
      const onSuccessCallback = jest.fn();

      const { result } = renderHook(
        () => useDeleteTodoMutation({ onSuccess: onSuccessCallback }),
        { wrapper: Wrapper },
      );

      act(() => {
        result.current.mutate(validVariables);
      });

      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith(
          expect.objectContaining({ variant: "error" }),
        );
      });

      expect(onSuccessCallback).not.toHaveBeenCalled();
    });
  });
});
