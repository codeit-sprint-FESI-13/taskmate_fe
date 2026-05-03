import { apiClient } from "@/shared/lib/api/client";

import { teamInvitationApi } from "./invitation.api";

jest.mock("@/shared/lib/api/client", () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("teamInvitationApi", () => {
  describe("getByToken", () => {
    test("GET /api/teams/invitations/:inviteToken을 호출한다", () => {
      teamInvitationApi.getByToken("tok123");
      expect(mockApiClient.get).toHaveBeenCalledWith(
        `/api/teams/invitations/${encodeURIComponent("tok123")}`,
      );
    });
  });

  describe("accept", () => {
    test("POST /api/teams/invitations/:inviteToken/accept를 호출한다", () => {
      teamInvitationApi.accept("tok123");
      expect(mockApiClient.post).toHaveBeenCalledWith(
        `/api/teams/invitations/${encodeURIComponent("tok123")}/accept`,
      );
    });
  });

  describe("reject", () => {
    test("POST /api/teams/invitations/:inviteToken/reject를 호출한다", () => {
      teamInvitationApi.reject("tok123");
      expect(mockApiClient.post).toHaveBeenCalledWith(
        `/api/teams/invitations/${encodeURIComponent("tok123")}/reject`,
      );
    });
  });
});
