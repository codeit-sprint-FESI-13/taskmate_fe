"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";

import AsyncBoundary from "@/components/common/AsyncBoundary";
import { Line } from "@/components/common/Line";
import LogoutButton from "@/components/common/LogoutButton";
import { Spacing } from "@/components/common/Spacing";
import { Header } from "@/components/NavigationBar/Header";
import { Item } from "@/components/NavigationBar/parts/Item";
import { List } from "@/components/NavigationBar/parts/List";
import { Personal } from "@/components/NavigationBar/Personal";
import { NavigationBarContext } from "@/components/NavigationBar/provider";
import { Team } from "@/components/NavigationBar/Team";
import { UserProfile } from "@/components/NavigationBar/UserProfile";
import { cn } from "@/utils/utils";

export const NavigationBar = () => {
  const { isOpen } = useContext(NavigationBarContext);
  const router = useRouter();

  return (
    <aside
      role="navigation"
      aria-label="네비게이션 바"
      className={cn(
        "sticky top-0 z-10 flex h-screen shrink-0 flex-col self-start overflow-hidden rounded-tr-[48px] rounded-br-[48px] bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.08)] transition-[width] duration-300 ease-in-out",
        isOpen ? "w-[360px] p-8" : "w-[60px] px-3 py-8",
      )}
      style={{ willChange: "width" }}
    >
      <Header />
      <Spacing size={20} />

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
              errorFallback={<Personal.Error />}
            >
              <Personal />
            </AsyncBoundary>

            <Spacing size={28} />

            <AsyncBoundary loadingFallback={<Team.Loading />}>
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
