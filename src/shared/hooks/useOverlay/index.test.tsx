import { act, renderHook } from "@testing-library/react";

import { useOverlayStore } from "../../store/overlay/useOverlay.store";
import { useOverlay } from ".";

describe("useOverlay", () => {
  beforeEach(() => {
    useOverlayStore.getState().clear();
  });

  describe("open", () => {
    test("스토어에 레이어를 push한다", () => {
      const { result } = renderHook(() => useOverlay());

      act(() => {
        result.current.open("m1", <span data-testid="c1">one</span>);
      });

      expect(useOverlayStore.getState().layer).toHaveLength(1);
      expect(useOverlayStore.getState().layer[0].id).toBe("m1");
    });
  });

  describe("close", () => {
    test("스토어에서 pop과 동일하게 마지막 레이어를 제거한다", () => {
      const { result } = renderHook(() => useOverlay());

      act(() => {
        result.current.open("a", "A");
        result.current.open("b", "B");
      });
      act(() => {
        result.current.close();
      });

      expect(useOverlayStore.getState().layer).toEqual([
        { id: "a", element: "A" },
      ]);
    });
  });

  describe("exitOnUnmount", () => {
    test("true이면 언마운트 시 clear 된다", () => {
      const { unmount } = renderHook(() => useOverlay({ exitOnUnmount: true }));

      act(() => {
        useOverlayStore.getState().push("x", null);
      });
      expect(useOverlayStore.getState().layer).toHaveLength(1);

      unmount();

      expect(useOverlayStore.getState().layer).toEqual([]);
    });

    test("false이면 언마운트해도 layer가 남는다", () => {
      const { unmount } = renderHook(() =>
        useOverlay({ exitOnUnmount: false }),
      );

      act(() => {
        useOverlayStore.getState().push("x", null);
      });

      unmount();

      expect(useOverlayStore.getState().layer).toHaveLength(1);
      useOverlayStore.getState().clear();
    });
  });
});
