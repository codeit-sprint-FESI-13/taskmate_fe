import UserInitializer from "@/components/auth/UserInitializer";
import AsyncBoundary from "@/components/common/AsyncBoundary";
import { NavigationBar } from "@/components/NavigationBar";
import NavigationBarProvider from "@/components/NavigationBar/provider";

export default function TaskmateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <AsyncBoundary
        loadingFallback={null}
        errorFallback={null}
      >
        <UserInitializer />
      </AsyncBoundary>
      <NavigationBarProvider>
        <NavigationBar />
      </NavigationBarProvider>

      <div className="mx-auto w-full px-[40px] py-[80px]">{children}</div>
    </div>
  );
}
