import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";

import type { Todo } from "@/entities/todo";
import { server } from "@/shared/mock/server";

import { usePatchTodoStatusMutation } from "./usePatchTodoStatusMutation";

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

const makeTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: 1,
  goalId: 10,
  title: "테스트 할 일",
  startDate: "2026-05-01",
  dueDate: "2026-05-31",
  status: "TODO",
  memo: "메모",
  assigneeSummary: "",
  assignees: [],
  ...overrides,
});

const patchPayload = {
  goalId: "10",
  todoId: "1",
  todoData: {
    title: "수정된 할 일",
    startDate: "2026-05-01",
    dueDate: "2026-05-31",
    status: "DOING" as const,
    memo: "메모",
    assigneeIds: [],
  },
};

describe("usePatchTodoStatusMutation", () => {
  describe("onMutate (낙관적 업데이트)", () => {
    test("캐시의 해당 할 일 status를 즉시 업데이트한다", async () => {
      const { queryClient, Wrapper } = createWrapper();

      const original = makeTodo({ id: 1, status: "TODO" });
      queryClient.setQueryData(["todo", "10", "list"], [original]);

      server.use(
        http.patch("*/api/goals/:goalId/todos/:todoId", async () => {
          await new Promise<void>((resolve) => setTimeout(resolve, 100));
          return HttpResponse.json({ success: true, code: "OK", data: null });
        }),
      );

      const { result } = renderHook(() => usePatchTodoStatusMutation(), {
        wrapper: Wrapper,
      });

      act(() => {
        result.current.mutate(patchPayload);
      });

      await waitFor(() => {
        const todos = queryClient.getQueryData<Todo[]>(["todo", "10", "list"]);
        expect(todos?.[0].status).toBe("DOING");
      });
    });

    test("id가 다른 할 일은 변경하지 않는다", async () => {
      const { queryClient, Wrapper } = createWrapper();

      const todo1 = makeTodo({ id: 1, status: "TODO" });
      const todo2 = makeTodo({ id: 2, status: "TODO" });
      queryClient.setQueryData(["todo", "10", "list"], [todo1, todo2]);

      server.use(
        http.patch("*/api/goals/:goalId/todos/:todoId", async () => {
          await new Promise<void>((resolve) => setTimeout(resolve, 100));
          return HttpResponse.json({ success: true, code: "OK", data: null });
        }),
      );

      const { result } = renderHook(() => usePatchTodoStatusMutation(), {
        wrapper: Wrapper,
      });

      act(() => {
        result.current.mutate(patchPayload);
      });

      await waitFor(() => {
        const todos = queryClient.getQueryData<Todo[]>(["todo", "10", "list"]);
        expect(todos?.[0].status).toBe("DOING");
        expect(todos?.[1].status).toBe("TODO");
      });
    });
  });

  describe("onError (롤백)", () => {
    beforeEach(() => {
      server.use(
        http.patch("*/api/goals/:goalId/todos/:todoId", () =>
          HttpResponse.json({ message: "서버 오류" }, { status: 500 }),
        ),
      );
    });

    test("API 실패 시 캐시를 이전 데이터로 복원한다", async () => {
      const { queryClient, Wrapper } = createWrapper();

      const original = makeTodo({ id: 1, status: "TODO" });
      queryClient.setQueryData(["todo", "10", "list"], [original]);

      const { result } = renderHook(() => usePatchTodoStatusMutation(), {
        wrapper: Wrapper,
      });

      act(() => {
        result.current.mutate(patchPayload);
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      const todos = queryClient.getQueryData<Todo[]>(["todo", "10", "list"]);
      expect(todos?.[0].status).toBe("TODO");
    });
  });

  describe("onSettled (캐시 무효화)", () => {
    test("성공 후 할 일 목록 캐시를 무효화한다", async () => {
      const { queryClient, Wrapper } = createWrapper();
      const spy = jest.spyOn(queryClient, "invalidateQueries");

      const { result } = renderHook(() => usePatchTodoStatusMutation(), {
        wrapper: Wrapper,
      });

      act(() => {
        result.current.mutate(patchPayload);
      });

      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(
          expect.objectContaining({
            queryKey: ["todo", "10", "list"],
          }),
        );
      });
    });

    test("실패 후에도 할 일 목록 캐시를 무효화한다", async () => {
      server.use(
        http.patch("*/api/goals/:goalId/todos/:todoId", () =>
          HttpResponse.json({ message: "서버 오류" }, { status: 500 }),
        ),
      );

      const { queryClient, Wrapper } = createWrapper();
      const spy = jest.spyOn(queryClient, "invalidateQueries");

      const { result } = renderHook(() => usePatchTodoStatusMutation(), {
        wrapper: Wrapper,
      });

      act(() => {
        result.current.mutate(patchPayload);
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ["todo", "10", "list"],
        }),
      );
    });
  });
});
