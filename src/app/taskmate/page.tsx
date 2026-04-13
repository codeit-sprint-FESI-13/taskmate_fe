import AsyncBoundary from "@/components/common/AsyncBoundary";
import { Icon } from "@/components/common/Icon";
import { Spacing } from "@/components/common/Spacing";
import ProgressSection from "@/components/home/ProgressSection";
import { TeamGoalsHorizontalSection } from "@/components/home/TeamGoalsHorizontalSection";
import WelcomeBanner from "@/components/home/WelcomeBanner";
import { NavigationBar } from "@/components/NavigationBar";
import NavigationBarProvider from "@/components/NavigationBar/provider";

export default function TaskmatePage() {
  return (
    <NavigationBarProvider>
      <div className="flex">
        <NavigationBar />
        <div className="mx-auto w-full px-[40px] py-[80px]">
          <div className="flex w-full max-w-full min-w-0 flex-col items-center justify-center">
            <AsyncBoundary errorFallback={<div>error</div>}>
              <WelcomeBanner />
            </AsyncBoundary>

            <Spacing size={64} />

            <AsyncBoundary errorFallback={<div>error</div>}>
              <ProgressSection />
            </AsyncBoundary>

            <Spacing size={56} />

            <div className="flex w-full max-w-full min-w-0 flex-col gap-5">
              <div className="flex w-full items-center gap-3">
                <Icon
                  name="FlagGreen"
                  size={40}
                />
                <h2 className="typography-body-1 font-medium text-black">
                  팀별 진행 상황
                </h2>
              </div>

              <AsyncBoundary errorFallback={<div>error</div>}>
                <TeamGoalsHorizontalSection />
              </AsyncBoundary>
            </div>
          </div>
        </div>
      </div>
    </NavigationBarProvider>
  );
}
