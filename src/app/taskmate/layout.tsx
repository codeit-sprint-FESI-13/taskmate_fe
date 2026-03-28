import { NavigationBar } from "@/components/NavigationBar";
import NavigationBarProvider from "@/components/NavigationBar/provider";

export default function TaskmateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <NavigationBarProvider>
        <NavigationBar />
      </NavigationBarProvider>

      <div className="mx-auto w-full space-y-6 px-[40px] py-[80px]">
        {children}
      </div>
    </div>
  );
}
