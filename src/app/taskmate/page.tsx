export const dynamic = "force-dynamic";
import AsyncBoundary from "@/components/common/AsyncBoundary";
import WelcomeBanner from "@/components/home/WelcomeBanner";

export default function TaskmatePage() {
  return (
    <AsyncBoundary errorFallback={<div>error</div>}>
      <WelcomeBanner />
    </AsyncBoundary>
  );
}
