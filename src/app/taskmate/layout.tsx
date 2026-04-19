import { NavigationBar } from "@/components/NavigationBar";
import NavigationBarProvider from "@/components/NavigationBar/provider";
import NotificationSubscriber from "@/features/notification/NotificationSubscriber";

export default function TaskmateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NotificationSubscriber />
      <NavigationBarProvider>
        <div className="flex">
          <NavigationBar />
          <div className="mobile:pt-0 mx-auto w-full pt-14">{children}</div>
        </div>
      </NavigationBarProvider>
    </>
  );
}
