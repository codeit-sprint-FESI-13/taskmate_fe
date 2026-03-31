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
      {children}
    </div>
  );
}
