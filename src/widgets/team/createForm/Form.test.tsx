import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";

import { useCreateTeamForm } from "@/features/team/hooks/useCreateTeamForm";
import ToastProvider from "@/shared/providers/ToastProvider";

import Form from "./Form";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ToastProvider>{children}</ToastProvider>
  </QueryClientProvider>
);

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
}));

const handleSubmitMock = jest.fn();
jest.mock("@/features/team/hooks/useCreateTeamForm", () => ({
  useCreateTeamForm: () => ({
    handleSubmit: handleSubmitMock,
    nameError: "",
  }),
}));

describe("TeamCreateForm", () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  test("팀 생성 요청이 제대로 호출 되는지 확인", async () => {
    // Arrange
    const { handleSubmit } = useCreateTeamForm();

    render(<Form />, { wrapper });

    // Act
    const input = screen.getByPlaceholderText("팀 이름을 입력해주세요");
    fireEvent.change(input, { target: { value: "새로운 팀" } });

    const submitButton = screen.getByRole("button", { name: "생성하기" });
    const form = submitButton.closest("form");
    if (!form) throw new Error("form not found");
    fireEvent.submit(form);

    // Assert
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
