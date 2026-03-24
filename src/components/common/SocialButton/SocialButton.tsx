import GoogleIcon from "@/components/common/Icons/GoogleIcon";
import KakaoIcon from "@/components/common/Icons/KakaoIcon";
import { cn } from "@/utils/utils";

const SOCIAL_CONFIG = {
  google: {
    bg: "bg-white",
    ring: "ring-1 ring-inset ring-gray-100", // rgba(243, 244, 246, 1)
    icon: <GoogleIcon />,
  },
  kakao: {
    bg: "bg-[#FFEE01]", // 카카오 전용 노란색
    ring: "ring-0",
    icon: <KakaoIcon />,
  },
} as const;

interface IconSocialProps {
  social: keyof typeof SOCIAL_CONFIG;
  onClick?: () => void;
  className?: string;
}

const SocialButton = ({ social, onClick, className }: IconSocialProps) => {
  const config = SOCIAL_CONFIG[social];

  return (
    <button
      type="button"
      onClick={onClick}
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
