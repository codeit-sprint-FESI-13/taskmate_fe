import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { teamApi } from "@/features/team/api";

import Form from "./Form";

const backMock = jest.fn();

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

describe("TeamCreateForm", () => {
  beforeEach(() => {
    backMock.mockClear();
    jest.clearAllMocks();
  });

  test("팀 생성 요청은 제대로 전달되는지 확인", async () => {
    (teamApi.create as jest.Mock).mockResolvedValue({ success: true });

    render(<Form />);

    const input = screen.getByPlaceholderText("팀 이름을 입력해주세요");
    fireEvent.change(input, { target: { value: "새로운 팀" } });

    const submitButton = screen.getByRole("button", { name: "생성하기" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(backMock).toHaveBeenCalledTimes(1);
    });

    expect(teamApi.create).toHaveBeenCalledWith("새로운 팀");
  });

  test("팀 생성 요청 실패 시 에러 메시지를 보여준다", async () => {
    (teamApi.create as jest.Mock).mockRejectedValue({
      message: "이미 존재하는 팀 이름입니다.",
    });

    render(<Form />);

    const input = screen.getByPlaceholderText("팀 이름을 입력해주세요");
    fireEvent.change(input, { target: { value: "중복팀" } });

    const submitButton = screen.getByRole("button", { name: "생성하기" });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText("이미 존재하는 팀 이름입니다."),
    ).toBeInTheDocument();

    expect(backMock).not.toHaveBeenCalled();
    expect(teamApi.create).toHaveBeenCalledWith("중복팀");
  });
});
