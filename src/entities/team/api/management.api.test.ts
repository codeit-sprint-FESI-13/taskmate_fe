import { apiClient } from "@/shared/lib/api/client";

import {
  inviteApi,
  memberApi,
  memberListApi,
  memberRoleApi,
  teamDetailApi,
} from "./management.api";

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

describe("teamDetailApi", () => {
  test("read: GET /api/teams/:teamId를 호출한다", () => {
    teamDetailApi.read(42);
    expect(mockApiClient.get).toHaveBeenCalledWith("/api/teams/42", {});
  });

  test("create: PATCH /api/teams/:teamId를 name과 함께 호출한다", () => {
    teamDetailApi.create(42, "수정된 팀명");
    expect(mockApiClient.patch).toHaveBeenCalledWith("/api/teams/42", {
      name: "수정된 팀명",
    });
  });

  test("delete: DELETE /api/teams/:teamId를 호출한다", () => {
    teamDetailApi.delete(42);
    expect(mockApiClient.delete).toHaveBeenCalledWith("/api/teams/42", {});
  });
});

describe("memberListApi", () => {
  test("read: GET /api/teams/:teamId/members를 호출한다", () => {
    memberListApi.read(42);
    expect(mockApiClient.get).toHaveBeenCalledWith("/api/teams/42/members", {});
  });
});

describe("memberRoleApi", () => {
  test("update: PATCH /api/teams/:teamId/members/:memberId/role를 호출한다", () => {
    memberRoleApi.update(42, 7, "ADMIN");
    expect(mockApiClient.patch).toHaveBeenCalledWith(
      "/api/teams/42/members/7/role",
      { role: "ADMIN" },
    );
  });
});

describe("memberApi", () => {
  test("delete: DELETE /api/teams/:teamId/members/:memberId를 호출한다", () => {
    memberApi.delete(42, 7);
    expect(mockApiClient.delete).toHaveBeenCalledWith(
      "/api/teams/42/members/7",
    );
  });
});

describe("inviteApi", () => {
  test("create: POST /api/teams/:teamId/invitations를 email과 함께 호출한다", () => {
    inviteApi.create("42", "user@example.com");
    expect(mockApiClient.post).toHaveBeenCalledWith(
      "/api/teams/42/invitations",
      { email: "user@example.com" },
    );
  });
});
