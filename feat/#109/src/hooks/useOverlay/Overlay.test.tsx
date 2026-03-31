import { act, render, screen } from "@testing-library/react";

import { OVERLAY_ZINDEX_BASE } from "@/constants/zIndex";

import Overlay from "./Overlay";
import { useOverlayStore } from "./useOverlay.store";

describe("Overlay", () => {
  beforeEach(() => {
    useOverlayStore.getState().clear();
  });

  describe("렌더 조건", () => {
    test("layer가 없으면 DOM에 루트 자식이 없다", () => {
      const { container } = render(<Overlay />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("레이어 표시", () => {
    test("push된 내용을 렌더한다", () => {
      render(<Overlay />);

      act(() => {
        useOverlayStore.getState().push("l1", <p>overlay content</p>);
      });

      expect(screen.getByText("overlay content")).toBeInTheDocument();
    });

    test("여러 레이어를 동시에 렌더한다", () => {
      render(<Overlay />);

      act(() => {
        useOverlayStore.getState().push("first", <span>bottom</span>);
        useOverlayStore.getState().push("second", <span>top</span>);
      });

      expect(screen.getByText("bottom")).toBeInTheDocument();
      expect(screen.getByText("top")).toBeInTheDocument();
    });
  });

  describe("스택 순서 (z-index)", () => {
    test("나중에 쌓인 레이어가 더 높은 zIndex를 갖는다", () => {
      const { container } = render(<Overlay />);

      act(() => {
        useOverlayStore.getState().push("a", <span>a</span>);
        useOverlayStore.getState().push("b", <span>b</span>);
      });

      const wrappers = container.querySelectorAll(".absolute.inset-0");
      expect(wrappers).toHaveLength(2);
      expect(wrappers[0]).toHaveStyle({ zIndex: OVERLAY_ZINDEX_BASE + 0 });
      expect(wrappers[1]).toHaveStyle({ zIndex: OVERLAY_ZINDEX_BASE + 1 });
    });
  });
});
