import { FavoriteGoalsSection } from "@/components/home/FavoriteGoalsSection";
import ProgressSection from "@/components/home/ProgressSection";
import TodoOverviewSection from "@/components/home/TodoOverviewSection";
import WelcomeBanner from "@/components/home/WelcomeBanner";
import AsyncBoundary from "@/shared/ui/AsyncBoundary";
import { Icon } from "@/shared/ui/Icon";
import { Spacing } from "@/shared/ui/Spacing";

export default function TaskmatePage() {
  return (
    <div className="tablet:px-6 tablet:py-16 desktop:px-22 desktop:py-20 tablet:w-[calc(100dvw-60px)] desktop:w-[calc(100dvw-360px)] flex w-full max-w-full min-w-0 flex-col items-center justify-center px-5 py-8">
      <AsyncBoundary errorFallback={<div>error</div>}>
        <WelcomeBanner />
      </AsyncBoundary>

      <Spacing size={64} />

      <AsyncBoundary errorFallback={<div>error</div>}>
        <ProgressSection />
      </AsyncBoundary>

      <Spacing size={40} />

      <div className="flex w-full max-w-full min-w-0 flex-col gap-5">
        <div className="flex w-full items-center gap-3">
          <Icon
            name="FlagGreen"
            size={40}
          />
          <h2 className="typography-body-1 font-medium text-black">
            중요한 할 일
          </h2>
        </div>

        <AsyncBoundary errorFallback={<div>error</div>}>
          <FavoriteGoalsSection />
        </AsyncBoundary>
      </div>

      <Spacing size={40} />

      <AsyncBoundary errorFallback={<div>error</div>}>
        <TodoOverviewSection />
      </AsyncBoundary>
    </div>
  );
}
