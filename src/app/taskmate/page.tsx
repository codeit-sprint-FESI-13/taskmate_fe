export const dynamic = "force-dynamic";

import AsyncBoundary from "@/components/common/AsyncBoundary";
import { Spacing } from "@/components/common/Spacing";
import ProgressSection from "@/components/home/ProgressSection";
import WelcomeBanner from "@/components/home/WelcomeBanner";

export default function TaskmatePage() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <AsyncBoundary errorFallback={<div>error</div>}>
        <WelcomeBanner />
      </AsyncBoundary>

      <Spacing size={64} />

      <AsyncBoundary errorFallback={<div>error</div>}>
        <ProgressSection />
      </AsyncBoundary>
    </div>
  );
}
