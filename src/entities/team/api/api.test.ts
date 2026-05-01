import { apiClient } from "@/shared/lib/api/client";

import { teamApi } from "./api";

jest.mock("@/shared/lib/api/client", () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("teamApi (api.ts)", () => {
  describe("create", () => {
    test("POST /api/teams를 name과 함께 호출한다", () => {
      teamApi.create("새 팀");
      expect(mockApiClient.post).toHaveBeenCalledWith("/api/teams", {
        name: "새 팀",
      });
    });
  });

  describe("getSummary", () => {
    test("GET /api/teams/:teamId/summary를 호출한다", () => {
      teamApi.getSummary("42");
      expect(mockApiClient.get).toHaveBeenCalledWith("/api/teams/42/summary");
    });
  });

  describe("getMemberList", () => {
    test("GET /api/teams/:teamId/members를 호출한다", () => {
      teamApi.getMemberList("42");
      expect(mockApiClient.get).toHaveBeenCalledWith("/api/teams/42/members");
    });
  });

  describe("quitTeam", () => {
    test("DELETE /api/teams/:teamId/leave를 호출한다", () => {
      teamApi.quitTeam("42");
      expect(mockApiClient.delete).toHaveBeenCalledWith("/api/teams/42/leave");
    });
  });

  describe("getAll", () => {
    test("GET /api/teams/me를 호출한다", () => {
      teamApi.getAll();
      expect(mockApiClient.get).toHaveBeenCalledWith("/api/teams/me");
    });
  });
});
