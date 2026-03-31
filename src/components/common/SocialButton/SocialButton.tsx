import { ComponentProps } from "react";

import GoogleIcon from "@/components/common/Icons/GoogleIcon";
import KakaoIcon from "@/components/common/Icons/KakaoIcon";
import { AuthFormType } from "@/features/auth/types/auth.type";
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

interface SocialButtonProps extends ComponentProps<"a"> {
  social: keyof typeof SOCIAL_CONFIG;
  from: AuthFormType;
}

const SocialButton = ({ social, className, from }: SocialButtonProps) => {
  const config = SOCIAL_CONFIG[social];

  return (
    <a
      href={`/api/auth/${social}?from=${from}`}
      className={cn(
        "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-opacity focus:outline-none active:opacity-80",
        config.bg,
        config.ring,
        className,
      )}
    >
      {config.icon}
    </a>
  );
};

export default SocialButton;
