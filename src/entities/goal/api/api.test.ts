import { apiClient } from "@/shared/lib/api/client";

import { goalApi } from "./api";

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

beforeEach(() => {
  jest.clearAllMocks();
});

describe("goalApi", () => {
  describe("createGoal", () => {
    test("POST /api/goals를 호출한다", async () => {
      mockApiClient.post.mockResolvedValue(makeResponse({ success: true }));

      await goalApi.createGoal({
        name: "목표",
        dueDate: "2026-12-31",
        type: "PERSONAL",
      });

      expect(mockApiClient.post).toHaveBeenCalledWith(
        "/api/goals",
        expect.objectContaining({ name: "목표", dueDate: "2026-12-31" }),
      );
    });
  });

  describe("getPersonalGoalList", () => {
    test("GET /api/goals/personal을 호출하고 data를 반환한다", async () => {
      const mockData = [{ goalId: 1, goalName: "알고리즘 풀기" }];
      mockApiClient.get.mockResolvedValue(makeResponse(mockData));

      const result = await goalApi.getPersonalGoalList();

      expect(mockApiClient.get).toHaveBeenCalledWith("/api/goals/personal");
      expect(result.data).toEqual(mockData);
    });
  });

  describe("getTeamGoalList", () => {
    test("cursor 없이 sort만 파라미터로 전달한다", async () => {
      mockApiClient.get.mockResolvedValue(
        makeResponse({ items: [], nextCursor: null, size: 6 }),
      );

      await goalApi.getTeamGoalList("42", "LATEST");

      expect(mockApiClient.get).toHaveBeenCalledWith("/api/teams/42/goals", {
        params: { sort: "LATEST" },
      });
    });

    test("cursorCreatedAt와 cursorId가 모두 있으면 파라미터에 포함한다", async () => {
      mockApiClient.get.mockResolvedValue(
        makeResponse({ items: [], nextCursor: null, size: 6 }),
      );

      await goalApi.getTeamGoalList("42", "OLDEST", {
        cursorCreatedAt: "2026-03-31T09:00:00Z",
        cursorId: 120,
      });

      expect(mockApiClient.get).toHaveBeenCalledWith("/api/teams/42/goals", {
        params: {
          sort: "OLDEST",
          cursorCreatedAt: "2026-03-31T09:00:00Z",
          cursorId: 120,
        },
      });
    });

    test("cursorCreatedAt만 있고 cursorId가 없으면 cursor 파라미터를 포함하지 않는다", async () => {
      mockApiClient.get.mockResolvedValue(
        makeResponse({ items: [], nextCursor: null, size: 6 }),
      );

      await goalApi.getTeamGoalList("42", "LATEST", {
        cursorCreatedAt: "2026-03-31T09:00:00Z",
      });

      expect(mockApiClient.get).toHaveBeenCalledWith("/api/teams/42/goals", {
        params: { sort: "LATEST" },
      });
    });

    test("cursorId만 있고 cursorCreatedAt가 없으면 cursor 파라미터를 포함하지 않는다", async () => {
      mockApiClient.get.mockResolvedValue(
        makeResponse({ items: [], nextCursor: null, size: 6 }),
      );

      await goalApi.getTeamGoalList("42", "LATEST", { cursorId: 120 });

      expect(mockApiClient.get).toHaveBeenCalledWith("/api/teams/42/goals", {
        params: { sort: "LATEST" },
      });
    });
  });

  describe("toggleFavorite", () => {
    test("POST /api/goals/:goalId/favorite를 호출한다", async () => {
      mockApiClient.post.mockResolvedValue(makeResponse({ success: true }));

      const result = await goalApi.toggleFavorite("99");

      expect(mockApiClient.post).toHaveBeenCalledWith("/api/goals/99/favorite");
      expect(result.data).toEqual({ success: true });
    });
  });

  describe("getSummary", () => {
    test("GET /api/goals/:goalId/summary를 호출하고 data를 반환한다", async () => {
      const summaryData = {
        goalId: 1,
        goalName: "디자인 시스템",
        dueDate: "2026-12-31",
        dDay: 42,
        progressPercent: 68,
      };
      mockApiClient.get.mockResolvedValue(makeResponse(summaryData));

      const result = await goalApi.getSummary("1");

      expect(mockApiClient.get).toHaveBeenCalledWith("/api/goals/1/summary");
      expect(result.data).toEqual(summaryData);
    });
  });

  describe("deleteGoal", () => {
    test("DELETE /api/goals/:goalId를 호출한다", async () => {
      mockApiClient.delete.mockResolvedValue(makeResponse(null));

      await goalApi.deleteGoal("10");

      expect(mockApiClient.delete).toHaveBeenCalledWith("/api/goals/10");
    });
  });

  describe("updateGoal", () => {
    test("PATCH /api/goals/:goalId를 body와 함께 호출한다", async () => {
      mockApiClient.patch.mockResolvedValue(
        makeResponse({ id: 10, name: "수정된 목표", dueDate: "2026-06-30" }),
      );

      await goalApi.updateGoal("10", {
        name: "수정된 목표",
        dueDate: "2026-06-30",
      });

      expect(mockApiClient.patch).toHaveBeenCalledWith("/api/goals/10", {
        name: "수정된 목표",
        dueDate: "2026-06-30",
      });
    });
  });

  describe("getFavoriteGoalList", () => {
    test("params 없이 호출하면 빈 params로 요청한다", async () => {
      mockApiClient.get.mockResolvedValue(
        makeResponse({ items: [], hasNext: false }),
      );

      await goalApi.getFavoriteGoalList();

      expect(mockApiClient.get).toHaveBeenCalledWith(
        "/api/main/favorite-goals",
        { params: {} },
      );
    });

    test("cursor params를 전달하면 함께 요청한다", async () => {
      mockApiClient.get.mockResolvedValue(
        makeResponse({ items: [], hasNext: false }),
      );

      await goalApi.getFavoriteGoalList({
        cursorId: 5,
        cursorCreatedAt: "2026-03-31T09:00:00Z",
        size: 20,
      });

      expect(mockApiClient.get).toHaveBeenCalledWith(
        "/api/main/favorite-goals",
        {
          params: {
            cursorId: 5,
            cursorCreatedAt: "2026-03-31T09:00:00Z",
            size: 20,
          },
        },
      );
    });
  });
});
