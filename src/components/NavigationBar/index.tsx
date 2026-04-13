export const dynamic = "force-dynamic";

("use client");

import { cva } from "class-variance-authority";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import AsyncBoundary from "@/components/common/AsyncBoundary";
import { Line } from "@/components/common/Line";
import LogoutButton from "@/components/common/LogoutButton";
import { Spacing } from "@/components/common/Spacing";
import Header from "@/components/NavigationBar/Header";
import { Item } from "@/components/NavigationBar/parts/Item";
import { List } from "@/components/NavigationBar/parts/List";
import { Personal } from "@/components/NavigationBar/Personal";
import { NavigationBarContext } from "@/components/NavigationBar/provider";
import { Team } from "@/components/NavigationBar/Team";
import { UserProfile } from "@/components/NavigationBar/UserProfile";
import { NAVIGATION_BAR_ZINDEX } from "@/constants/zIndex";

const navigationBarAsideVariants = cva(
  [
    // default
    "fixed top-0 flex w-screen shrink-0 flex-col bg-white",
    // transition
    "transition-[height] duration-300 ease-in-out",
    // breakpoint mobile
    "mobile:sticky mobile:top-0 mobile:z-10 mobile:h-screen mobile:shrink-0 mobile:flex-col mobile:self-start",
    "mobile:overflow-hidden mobile:rounded-tr-[48px] mobile:rounded-br-[48px] mobile:bg-white",
    "mobile:shadow-[0_0_4px_0_rgba(0,0,0,0.08)] mobile:transition-[width] mobile:duration-300 mobile:ease-in-out",
  ],
  {
    variants: {
      open: {
        true: "h-screen overflow-y-scroll mobile:w-[360px] mobile:p-8",
        false: "h-[56px] mobile:w-[60px] mobile:px-3 mobile:py-8",
      },
    },
    defaultVariants: { open: false },
  },
);

export const NavigationBar = () => {
  const { isOpen } = useContext(NavigationBarContext);
  const router = useRouter();

  return (
    <aside
      role="navigation"
      aria-label="네비게이션 바"
      className={navigationBarAsideVariants({ open: isOpen })}
      style={{ willChange: "width, height", zIndex: NAVIGATION_BAR_ZINDEX }}
    >
      <Header />

      <Spacing
        size={20}
        className="mobile:block hidden"
      />

      {isOpen && (
        <>
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <List.Container>
              <Item.Wrapper
                value="home"
                onClick={() => {
                  router.push("/taskmate");
                }}
              >
                <Item.Icon name="Home" />
                <Item.Name>홈</Item.Name>
              </Item.Wrapper>
            </List.Container>

            <Spacing size={12} />
            <Line />
            <Spacing size={12} />

            <AsyncBoundary
              loadingFallback={<Personal.Loading />}
              errorFallback={(error, onReset) => (
                <Personal.Error
                  error={error}
                  onReset={onReset}
                />
              )}
            >
              <Personal />
            </AsyncBoundary>

            <Spacing size={28} />

            <AsyncBoundary
              loadingFallback={<Team.Loading />}
              errorFallback={(error, onReset) => (
                <Team.Error
                  error={error}
                  onReset={onReset}
                />
              )}
            >
              <Team />
            </AsyncBoundary>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1 border-t border-gray-100 bg-white pt-4">
            <AsyncBoundary loadingFallback={<UserProfile.Loading />}>
              <UserProfile />
            </AsyncBoundary>

            <LogoutButton />
          </div>
        </>
      )}
    </aside>
  );
};
