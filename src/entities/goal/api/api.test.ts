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

beforeEach(() => {
  jest.clearAllMocks();
});

describe("goalApi", () => {
  describe("createGoal", () => {
    test("POST /api/goals를 data와 함께 호출한다", () => {
      const data = { name: "새 목표", type: "PERSONAL" as const };
      goalApi.createGoal(data);
      expect(mockApiClient.post).toHaveBeenCalledWith("/api/goals", data);
    });
  });

  describe("getPersonalGoalList", () => {
    test("GET /api/goals/personal을 호출한다", () => {
      goalApi.getPersonalGoalList();
      expect(mockApiClient.get).toHaveBeenCalledWith("/api/goals/personal");
    });
  });

  describe("getTeamGoalList", () => {
    test("sort만 있을 때 params에 sort만 포함해 호출한다", () => {
      goalApi.getTeamGoalList("42", "LATEST");
      expect(mockApiClient.get).toHaveBeenCalledWith("/api/teams/42/goals", {
        params: { sort: "LATEST" },
      });
    });

    test("cursor가 있을 때 cursorCreatedAt과 cursorId를 params에 포함해 호출한다", () => {
      goalApi.getTeamGoalList("42", "LATEST", {
        cursorCreatedAt: "2026-01-01T00:00:00Z",
        cursorId: 10,
      });
      expect(mockApiClient.get).toHaveBeenCalledWith("/api/teams/42/goals", {
        params: {
          sort: "LATEST",
          cursorCreatedAt: "2026-01-01T00:00:00Z",
          cursorId: 10,
        },
      });
    });
  });

  describe("toggleFavorite", () => {
    test("POST /api/goals/:goalId/favorite를 호출한다", () => {
      goalApi.toggleFavorite("7");
      expect(mockApiClient.post).toHaveBeenCalledWith("/api/goals/7/favorite");
    });
  });

  describe("getSummary", () => {
    test("GET /api/goals/:goalId/summary를 호출한다", () => {
      goalApi.getSummary("7");
      expect(mockApiClient.get).toHaveBeenCalledWith("/api/goals/7/summary");
    });
  });

  describe("deleteGoal", () => {
    test("DELETE /api/goals/:goalId를 호출한다", () => {
      goalApi.deleteGoal("7");
      expect(mockApiClient.delete).toHaveBeenCalledWith("/api/goals/7");
    });
  });

  describe("updateGoal", () => {
    test("PATCH /api/goals/:goalId를 body와 함께 호출한다", () => {
      goalApi.updateGoal("7", { name: "수정된 목표" });
      expect(mockApiClient.patch).toHaveBeenCalledWith("/api/goals/7", {
        name: "수정된 목표",
      });
    });
  });

  describe("getFavoriteGoalList", () => {
    test("params 없이 호출하면 빈 객체를 params로 전달한다", () => {
      goalApi.getFavoriteGoalList();
      expect(mockApiClient.get).toHaveBeenCalledWith(
        "/api/main/favorite-goals",
        { params: {} },
      );
    });

    test("params를 전달하면 함께 호출한다", () => {
      goalApi.getFavoriteGoalList({ size: 10, cursorId: 5 });
      expect(mockApiClient.get).toHaveBeenCalledWith(
        "/api/main/favorite-goals",
        { params: { size: 10, cursorId: 5 } },
      );
    });
  });
});
