import { apiClient } from "@/shared/lib/api/client";

import { todoApi } from "./todo.api";

jest.mock("@/shared/lib/api/client", () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

const makeResponse = <T>(data: T) => ({
  success: true,
  code: "OK",
  message: "success",
  data,
  timestamp: "2026-01-01T00:00:00Z",
});

const BASE_LIST_PARAMS = {
  sort: "DUE_DATE" as const,
  mineOnly: false,
  titleContains: "",
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("todoApi", () => {
  describe("create", () => {
    test("POST /api/goals/{goalId}/todos를 호출한다", async () => {
      mockApiClient.post.mockResolvedValue(makeResponse(null));

      await todoApi.create("1", {
        title: "테스트 할 일",
        startDate: "2026-04-01",
        dueDate: "2026-04-30",
        assigneeIds: [101],
        memo: "메모",
      });

      expect(mockApiClient.post).toHaveBeenCalledWith(
        "/api/goals/1/todos",
        expect.objectContaining({ title: "테스트 할 일" }),
      );
    });
  });

  describe("getTodoList", () => {
    test("GET /api/goals/{goalId}/todos?status=TODO를 호출한다", async () => {
      mockApiClient.get.mockResolvedValue(makeResponse({ items: [] }));

      await todoApi.getTodoList("1", BASE_LIST_PARAMS);

      expect(mockApiClient.get).toHaveBeenCalledWith(
        "/api/goals/1/todos/paged",
        expect.objectContaining({
          params: expect.objectContaining({ status: "TODO" }),
        }),
      );
    });

    test("mineOnly가 true이면 params에 'true' 문자열로 전달한다", async () => {
      mockApiClient.get.mockResolvedValue(makeResponse({ items: [] }));

      await todoApi.getTodoList("1", { ...BASE_LIST_PARAMS, mineOnly: true });

      expect(mockApiClient.get).toHaveBeenCalledWith(
        "/api/goals/1/todos/paged",
        expect.objectContaining({
          params: expect.objectContaining({ mineOnly: "true" }),
        }),
      );
    });

    test("mineOnly가 false이면 params에 'false' 문자열로 전달한다", async () => {
      mockApiClient.get.mockResolvedValue(makeResponse({ items: [] }));

      await todoApi.getTodoList("1", { ...BASE_LIST_PARAMS, mineOnly: false });

      expect(mockApiClient.get).toHaveBeenCalledWith(
        "/api/goals/1/todos/paged",
        expect.objectContaining({
          params: expect.objectContaining({ mineOnly: "false" }),
        }),
      );
    });

    test("cursor 파라미터가 있으면 params에 포함한다", async () => {
      mockApiClient.get.mockResolvedValue(makeResponse({ items: [] }));

      await todoApi.getTodoList("1", {
        ...BASE_LIST_PARAMS,
        sort: "DUE_DATE",
        cursorDueDate: "2026-05-01",
        cursorId: 42,
      });

      expect(mockApiClient.get).toHaveBeenCalledWith(
        "/api/goals/1/todos/paged",
        expect.objectContaining({
          params: expect.objectContaining({
            cursorDueDate: "2026-05-01",
            cursorId: 42,
          }),
        }),
      );
    });

    test("cursor 파라미터가 undefined이면 params에서 제외한다", async () => {
      mockApiClient.get.mockResolvedValue(makeResponse({ items: [] }));

      await todoApi.getTodoList("1", BASE_LIST_PARAMS);

      const [, options] = mockApiClient.get.mock.calls[0];
      expect(options?.params).not.toHaveProperty("cursorDueDate");
      expect(options?.params).not.toHaveProperty("cursorCreatedAt");
      expect(options?.params).not.toHaveProperty("cursorId");
    });

    test("빈 문자열 cursor는 params에서 제외한다", async () => {
      mockApiClient.get.mockResolvedValue(makeResponse({ items: [] }));

      await todoApi.getTodoList("1", {
        ...BASE_LIST_PARAMS,
        cursorDueDate: "",
        cursorCreatedAt: "",
      });

      const [, options] = mockApiClient.get.mock.calls[0];
      expect(options?.params).not.toHaveProperty("cursorDueDate");
      expect(options?.params).not.toHaveProperty("cursorCreatedAt");
    });

    test("limit이 있으면 params에 포함한다", async () => {
      mockApiClient.get.mockResolvedValue(makeResponse({ items: [] }));

      await todoApi.getTodoList("1", { ...BASE_LIST_PARAMS, limit: 10 });

      expect(mockApiClient.get).toHaveBeenCalledWith(
        "/api/goals/1/todos/paged",
        expect.objectContaining({
          params: expect.objectContaining({ limit: 10 }),
        }),
      );
    });
  });

  describe("getDoingList", () => {
    test("GET /api/goals/{goalId}/todos?status=DOING를 호출한다", async () => {
      mockApiClient.get.mockResolvedValue(makeResponse({ items: [] }));

      await todoApi.getDoingList("2", BASE_LIST_PARAMS);

      expect(mockApiClient.get).toHaveBeenCalledWith(
        "/api/goals/2/todos/paged",
        expect.objectContaining({
          params: expect.objectContaining({ status: "DOING" }),
        }),
      );
    });
  });

  describe("getDoneList", () => {
    test("GET /api/goals/{goalId}/todos?status=DONE를 호출한다", async () => {
      mockApiClient.get.mockResolvedValue(makeResponse({ items: [] }));

      await todoApi.getDoneList("3", BASE_LIST_PARAMS);

      expect(mockApiClient.get).toHaveBeenCalledWith(
        "/api/goals/3/todos/paged",
        expect.objectContaining({
          params: expect.objectContaining({ status: "DONE" }),
        }),
      );
    });
  });

  describe("patch", () => {
    test("PATCH /api/goals/{goalId}/todos/{todoId}를 body와 함께 호출한다", async () => {
      mockApiClient.patch.mockResolvedValue(makeResponse(null));

      const updateData = {
        title: "수정된 제목",
        startDate: "2026-04-01",
        dueDate: "2026-04-30",
        status: "DOING" as const,
        memo: "수정 메모",
        assigneeIds: [101],
      };

      await todoApi.patch("1", "99", updateData);

      expect(mockApiClient.patch).toHaveBeenCalledWith(
        "/api/goals/1/todos/99",
        updateData,
      );
    });
  });

  describe("delete", () => {
    test("DELETE /api/goals/{goalId}/todos/{todoId}를 호출한다", async () => {
      mockApiClient.delete.mockResolvedValue(makeResponse(null));

      await todoApi.delete("1", "55");

      expect(mockApiClient.delete).toHaveBeenCalledWith(
        "/api/goals/1/todos/55",
      );
    });
  });

  describe("getRecent", () => {
    test("params 없이 호출하면 빈 params로 요청한다", async () => {
      mockApiClient.get.mockResolvedValue(makeResponse({ items: [] }));

      await todoApi.getRecent();

      expect(mockApiClient.get).toHaveBeenCalledWith("/api/todos/recent", {
        params: {},
      });
    });

    test("cursor params를 전달하면 함께 요청한다", async () => {
      mockApiClient.get.mockResolvedValue(makeResponse({ items: [] }));

      await todoApi.getRecent({
        cursorId: 10,
        cursorCreatedAt: "2026-04-01T00:00:00Z",
        size: 20,
      });

      expect(mockApiClient.get).toHaveBeenCalledWith("/api/todos/recent", {
        params: {
          cursorId: 10,
          cursorCreatedAt: "2026-04-01T00:00:00Z",
          size: 20,
        },
      });
    });
  });

  describe("getDueSoon", () => {
    test("params 없이 호출하면 빈 params로 요청한다", async () => {
      mockApiClient.get.mockResolvedValue(makeResponse({ items: [] }));

      await todoApi.getDueSoon();

      expect(mockApiClient.get).toHaveBeenCalledWith("/api/todos/due-soon", {
        params: {},
      });
    });

    test("cursor params를 전달하면 함께 요청한다", async () => {
      mockApiClient.get.mockResolvedValue(makeResponse({ items: [] }));

      await todoApi.getDueSoon({
        cursorId: 5,
        size: 20,
      });

      expect(mockApiClient.get).toHaveBeenCalledWith("/api/todos/due-soon", {
        params: { cursorId: 5, size: 20 },
      });
    });
  });
});
