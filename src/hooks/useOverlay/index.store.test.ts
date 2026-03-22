import { useOverlayStore } from "./index.store";

describe("useOverlayStore", () => {
  beforeEach(() => {
    useOverlayStore.getState().clear();
  });

  describe("초기 상태", () => {
    test("layer는 빈 배열이다", () => {
      expect(useOverlayStore.getState().layer).toEqual([]);
    });
  });

  describe("push", () => {
    test("layer 끝에 순서대로 쌓인다", () => {
      const { push } = useOverlayStore.getState();
      push("a", "first");
      push("b", "second");

      expect(useOverlayStore.getState().layer).toEqual([
        { id: "a", element: "first" },
        { id: "b", element: "second" },
      ]);
    });
  });

  describe("pop", () => {
    test("마지막 레이어만 제거한다", () => {
      const { push, pop } = useOverlayStore.getState();
      push("a", 1);
      push("b", 2);
      pop();

      expect(useOverlayStore.getState().layer).toEqual([
        { id: "a", element: 1 },
      ]);
    });

    test("빈 스택에서 호출해도 에러 없이 유지된다", () => {
      const { pop } = useOverlayStore.getState();
      pop();
      expect(useOverlayStore.getState().layer).toEqual([]);
    });
  });

  describe("clear", () => {
    test("layer를 모두 비운다", () => {
      const { push, clear } = useOverlayStore.getState();
      push("x", null);
      push("y", null);
      clear();

      expect(useOverlayStore.getState().layer).toEqual([]);
    });
  });
});
