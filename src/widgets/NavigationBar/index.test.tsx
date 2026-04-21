import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import type { ComponentProps, ReactElement } from "react";

import { NavigationBar } from "@/widgets/NavigationBar/index";
import { NavigationBarContext } from "@/widgets/NavigationBar/provider";

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/shared/hooks/useBreakpoint", () => ({
  useBreakpoint: () => "desktop",
}));

jest.mock("@/components/NavigationBar/Personal", () => ({
  Personal: Object.assign(() => null, {
    Loading: () => null,
    Error: () => null,
  }),
}));

jest.mock("@/components/NavigationBar/Team", () => ({
  Team: Object.assign(() => null, { Loading: () => null }),
}));

jest.mock("@/components/NavigationBar/UserProfile", () => ({
  UserProfile: Object.assign(() => null, { Loading: () => null }),
}));

jest.mock("@/components/common/LogoutButton", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("@/components/NavigationBar/NotificationPopover", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("@/components/common/Icon", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}));

type ContextValue = ComponentProps<
  typeof NavigationBarContext.Provider
>["value"];

function renderWithNavContext(
  ui: ReactElement,
  value: Partial<ContextValue> = {},
) {
  const queryClient = new QueryClient();
  const defaults: ContextValue = {
    isOpen: true,
    open: jest.fn(),
    close: jest.fn(),
    currentTab: "",
    tabChange: jest.fn(),
    ...value,
  };

  return render(
    <QueryClientProvider client={queryClient}>
      <NavigationBarContext.Provider value={defaults}>
        {ui}
      </NavigationBarContext.Provider>
    </QueryClientProvider>,
  );
}

describe("NavigationBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    } as ReturnType<typeof useRouter>);
  });

  test('홈 탭을 누르면 tabChange("home")와 router.push("/taskmate")가 호출된다', () => {
    const push = jest.fn();
    const tabChange = jest.fn();
    mockUseRouter.mockReturnValue({
      push,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    } as ReturnType<typeof useRouter>);

    renderWithNavContext(<NavigationBar />, { isOpen: true, tabChange });

    fireEvent.click(screen.getByText("홈"));

    expect(tabChange).toHaveBeenCalledTimes(1);
    expect(tabChange).toHaveBeenCalledWith("home");
    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith("/taskmate");
  });

  test("네비게이션이 닫혀 있으면 홈 항목이 보이지 않는다", () => {
    renderWithNavContext(<NavigationBar />, { isOpen: false });

    expect(screen.queryByText("홈")).not.toBeInTheDocument();
  });
});
