import { apiClient } from "@/shared/lib/api/client";

import { NotificationApi } from "./notification.api";

jest.mock("@/shared/lib/api/client", () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
  },
}));

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

class MockEventSource {
  static instances: MockEventSource[] = [];
  listeners: Record<string, (() => void)[]> = {};
  close = jest.fn();

  constructor(public url: string) {
    MockEventSource.instances.push(this);
  }

  addEventListener(event: string, handler: () => void) {
    this.listeners[event] = this.listeners[event] ?? [];
    this.listeners[event].push(handler);
  }

  emit(event: string) {
    this.listeners[event]?.forEach((fn) => fn());
  }
}

beforeEach(() => {
  jest.clearAllMocks();
  MockEventSource.instances = [];
  global.EventSource = MockEventSource as unknown as typeof EventSource;
});

describe("NotificationApi", () => {
  describe("get", () => {
    test("GET /api/notifications를 호출한다", async () => {
      mockApiClient.get.mockResolvedValue({ data: { items: [] } });

      await NotificationApi.get();

      expect(mockApiClient.get).toHaveBeenCalledWith("/api/notifications", {
        params: undefined,
      });
    });

    test("cursor params를 전달하면 함께 요청한다", async () => {
      mockApiClient.get.mockResolvedValue({ data: { items: [] } });

      await NotificationApi.get({
        cursorId: 10,
        cursorCreatedAt: "2026-01-01T00:00:00Z",
        size: 20,
      });

      expect(mockApiClient.get).toHaveBeenCalledWith("/api/notifications", {
        params: {
          cursorId: 10,
          cursorCreatedAt: "2026-01-01T00:00:00Z",
          size: 20,
        },
      });
    });
  });

  describe("issueSseToken", () => {
    test("POST /api/notifications/sse-token을 호출한다", async () => {
      mockApiClient.post.mockResolvedValue({
        data: { sseToken: "token123", expiresAt: "" },
      });

      await NotificationApi.issueSseToken();

      expect(mockApiClient.post).toHaveBeenCalledWith(
        "/api/notifications/sse-token",
      );
    });
  });

  describe("subscribe", () => {
    test("issueSseToken을 호출해 sseToken을 포함한 URL로 EventSource를 생성한다", async () => {
      mockApiClient.post.mockResolvedValue({
        data: { sseToken: "abc123", expiresAt: "" },
      });

      await NotificationApi.subscribe(jest.fn());

      const es = MockEventSource.instances[0];
      expect(es.url).toContain("sseToken=abc123");
    });

    test("NOTIFICATION 이벤트 수신 시 onNotify 콜백을 호출한다", async () => {
      mockApiClient.post.mockResolvedValue({
        data: { sseToken: "tok", expiresAt: "" },
      });
      const onNotify = jest.fn();

      await NotificationApi.subscribe(onNotify);

      MockEventSource.instances[0].emit("NOTIFICATION");

      expect(onNotify).toHaveBeenCalledTimes(1);
    });

    test("반환된 cleanup 함수 호출 시 EventSource를 닫는다", async () => {
      mockApiClient.post.mockResolvedValue({
        data: { sseToken: "tok", expiresAt: "" },
      });

      const cleanup = await NotificationApi.subscribe(jest.fn());
      cleanup();

      expect(MockEventSource.instances[0].close).toHaveBeenCalledTimes(1);
    });
  });

  describe("read", () => {
    test("PATCH /api/notifications/:id/read를 호출한다", async () => {
      mockApiClient.patch.mockResolvedValue({ data: null });

      await NotificationApi.read(42);

      expect(mockApiClient.patch).toHaveBeenCalledWith(
        "/api/notifications/42/read",
      );
    });
  });

  describe("readAll", () => {
    test("PATCH /api/notifications/read-all을 호출한다", async () => {
      mockApiClient.patch.mockResolvedValue({ data: null });

      await NotificationApi.readAll();

      expect(mockApiClient.patch).toHaveBeenCalledWith(
        "/api/notifications/read-all",
      );
    });
  });
});
