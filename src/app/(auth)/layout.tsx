import { Icon } from "@/shared/ui/Icon";

// app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background-normal-alternative-2 flex min-h-screen w-full flex-col items-center justify-center px-5">
      <div className="tablet:max-w-100 flex w-full max-w-[335px] flex-col items-center justify-center gap-8">
        <div className="flex w-full items-center justify-start gap-2">
          <Icon
            name="LogoIcon"
            size={56}
          />
          <Icon
            name="LogoText"
            size={121}
            className="h-[25px]"
          />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
