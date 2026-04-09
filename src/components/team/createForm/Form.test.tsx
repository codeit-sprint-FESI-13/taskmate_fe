import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { teamApi } from "@/features/team/api";

import Form from "./Form";

const backMock = jest.fn();
const toastMock = jest.fn();

jest.mock("@/features/team/api", () => ({
  teamApi: {
    create: jest.fn(),
  },
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: backMock,
  }),
}));

jest.mock("@/hooks/useToast", () => ({
  useToast: () => ({
    toast: toastMock,
  }),
}));

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe("TeamCreateForm", () => {
  beforeEach(() => {
    backMock.mockClear();
    toastMock.mockClear();
    jest.clearAllMocks();
  });

  test("팀 생성 요청은 제대로 전달되는지 확인", async () => {
    (teamApi.create as jest.Mock).mockResolvedValue({ success: true });

    renderWithQueryClient(<Form />);

    const input = screen.getByPlaceholderText("팀 이름을 입력해주세요");
    fireEvent.change(input, { target: { value: "새로운 팀" } });

    const submitButton = screen.getByRole("button", { name: "생성하기" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(backMock).toHaveBeenCalledTimes(1);
    });

    expect(teamApi.create).toHaveBeenCalledWith(
      "새로운 팀",
      expect.any(Object),
    );
  });

  test("팀 생성 요청 실패 시 토스트 에러를 보여준다", async () => {
    (teamApi.create as jest.Mock).mockRejectedValue({
      message: "이미 존재하는 팀 이름입니다.",
    });

    renderWithQueryClient(<Form />);

    const input = screen.getByPlaceholderText("팀 이름을 입력해주세요");
    fireEvent.change(input, { target: { value: "중복팀" } });

    const submitButton = screen.getByRole("button", { name: "생성하기" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledTimes(1);
    });
    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: "error",
        title: "팀 생성 실패",
        description: "이미 존재하는 팀 이름입니다.",
      }),
    );
    expect(backMock).not.toHaveBeenCalled();
    expect(teamApi.create).toHaveBeenCalledWith("중복팀", expect.any(Object));
  });
});
