import { renderHook } from "@testing-library/react";
import * as React from "react";

import { ToastContext } from "../providers/ToastProvider";
import { useToast } from "./useToast";

describe("useToast", () => {
  test("ToastProvider 없이 사용하면 에러를 던진다", () => {
    expect(() => renderHook(() => useToast())).toThrow(
      "useToast는 ToastProvider로 감싸야 사용 가능",
    );
  });

  test("ToastProvider 안에서 사용하면 context를 반환한다", () => {
    const mockContext = { toast: jest.fn(), dismiss: jest.fn() };
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(
        ToastContext.Provider,
        { value: mockContext },
        children,
      );

    const { result } = renderHook(() => useToast(), { wrapper });

    expect(result.current).toBe(mockContext);
  });
});
