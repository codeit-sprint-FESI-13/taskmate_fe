import { renderHook } from "@testing-library/react";
import { useParams } from "next/navigation";

import { useOptionalTeamId } from "./useOptionalTeamId";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;

describe("useOptionalTeamId", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("teamId가 있으면 문자열로 반환한다", () => {
    mockUseParams.mockReturnValue({
      teamId: "42",
    } as ReturnType<typeof useParams>);

    const { result } = renderHook(() => useOptionalTeamId());

    expect(result.current).toBe("42");
  });

  test("teamId가 배열이어도 문자열로 변환해 반환한다", () => {
    mockUseParams.mockReturnValue({
      teamId: ["7"],
    } as ReturnType<typeof useParams>);

    const { result } = renderHook(() => useOptionalTeamId());

    expect(result.current).toBe("7");
  });

  test("teamId가 없으면 null을 반환한다", () => {
    mockUseParams.mockReturnValue({} as ReturnType<typeof useParams>);

    const { result } = renderHook(() => useOptionalTeamId());

    expect(result.current).toBeNull();
  });
});
