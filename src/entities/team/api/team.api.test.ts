import { apiClient } from "@/shared/lib/api/client";

import { teamApi } from "./team.api";

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

describe("teamApi", () => {
  describe("create", () => {
    test("POST /api/teams를 name과 함께 호출한다", () => {
      teamApi.create("새 팀");
      expect(mockApiClient.post).toHaveBeenCalledWith("/api/teams", {
        name: "새 팀",
      });
    });
  });

  describe("getAll", () => {
    test("GET /api/teams/me를 호출한다", () => {
      teamApi.getAll();
      expect(mockApiClient.get).toHaveBeenCalledWith("/api/teams/me");
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

  describe("getDetail", () => {
    test("GET /api/teams/:teamId를 호출한다", () => {
      teamApi.getDetail(42);
      expect(mockApiClient.get).toHaveBeenCalledWith("/api/teams/42");
    });
  });

  describe("update", () => {
    test("PATCH /api/teams/:teamId를 name과 함께 호출한다", () => {
      teamApi.update(42, "수정된 팀명");
      expect(mockApiClient.patch).toHaveBeenCalledWith("/api/teams/42", {
        name: "수정된 팀명",
      });
    });
  });

  describe("deleteTeam", () => {
    test("DELETE /api/teams/:teamId를 호출한다", () => {
      teamApi.deleteTeam(42);
      expect(mockApiClient.delete).toHaveBeenCalledWith("/api/teams/42");
    });
  });

  describe("updateMemberRole", () => {
    test("PATCH /api/teams/:teamId/members/:memberId/role를 호출한다", () => {
      teamApi.updateMemberRole(42, 7, "ADMIN");
      expect(mockApiClient.patch).toHaveBeenCalledWith(
        "/api/teams/42/members/7/role",
        { role: "ADMIN" },
      );
    });
  });

  describe("deleteMember", () => {
    test("DELETE /api/teams/:teamId/members/:memberId를 호출한다", () => {
      teamApi.deleteMember(42, 7);
      expect(mockApiClient.delete).toHaveBeenCalledWith(
        "/api/teams/42/members/7",
      );
    });
  });

  describe("createInvitation", () => {
    test("POST /api/teams/:teamId/invitations를 email과 함께 호출한다", () => {
      teamApi.createInvitation("42", "user@example.com");
      expect(mockApiClient.post).toHaveBeenCalledWith(
        "/api/teams/42/invitations",
        {
          email: "user@example.com",
        },
      );
    });
  });

  describe("getInvitationByToken", () => {
    test("GET /api/teams/invitations/:inviteToken을 호출한다", () => {
      teamApi.getInvitationByToken("tok123");
      expect(mockApiClient.get).toHaveBeenCalledWith(
        `/api/teams/invitations/${encodeURIComponent("tok123")}`,
      );
    });
  });

  describe("acceptInvitation", () => {
    test("POST /api/teams/invitations/:inviteToken/accept을 호출한다", () => {
      teamApi.acceptInvitation("tok123");
      expect(mockApiClient.post).toHaveBeenCalledWith(
        `/api/teams/invitations/${encodeURIComponent("tok123")}/accept`,
      );
    });
  });

  describe("rejectInvitation", () => {
    test("POST /api/teams/invitations/:inviteToken/reject를 호출한다", () => {
      teamApi.rejectInvitation("tok123");
      expect(mockApiClient.post).toHaveBeenCalledWith(
        `/api/teams/invitations/${encodeURIComponent("tok123")}/reject`,
      );
    });
  });
});
