// React
import { ComponentPropsWithoutRef } from "react";

// 내부 코드
import GoogleIcon from "@/components/common/Icons/GoogleIcon";
import KakaoIcon from "@/components/common/Icons/KakaoIcon";
import { cn } from "@/utils/utils";

const SOCIAL_CONFIG = {
  google: {
    bg: "bg-white",
    ring: "ring-1 ring-inset ring-gray-100",
    icon: <GoogleIcon />,
  },
  kakao: {
    bg: "bg-[#FFEE01]",
    ring: "ring-0",
    icon: <KakaoIcon />,
  },
} as const;

interface SocialButtonProps extends ComponentPropsWithoutRef<"button"> {
  social: keyof typeof SOCIAL_CONFIG;
}

const SocialButton = ({
  social,
  className,
  type = "button",
  ...props
}: SocialButtonProps) => {
  const config = SOCIAL_CONFIG[social];

  return (
    <button
      type={type}
      {...props}
      className={cn(
        "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-opacity focus:outline-none active:opacity-80",
        config.bg,
        config.ring,
        className,
      )}
    >
      {config.icon}
    </button>
  );
};

export default SocialButton;
