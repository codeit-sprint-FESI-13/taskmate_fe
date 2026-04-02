import { NavigationBar } from "@/components/NavigationBar";
import NavigationBarProvider from "@/components/NavigationBar/provider";

export default function TaskmateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationBarProvider>
      <div className="flex">
        <NavigationBar />

        <div className="mx-auto w-full px-[40px] py-[80px]">{children}</div>
      </div>
    </NavigationBarProvider>
  );
}
