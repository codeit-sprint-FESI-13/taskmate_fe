import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  // 기본 스타일 (항상 적용)
  "rounded font-medium focus:outline-none transition-colors focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      // variant 옵션들
      variant: {
        primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
        secondary:
          "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
        outline:
          "border border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500",
      },
      // size 옵션들
      size: {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
      // disabled 옵션
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    // 기본값 설정
    defaultVariants: {
      variant: "primary",
      size: "md",
      disabled: false,
    },
  },
);

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
  className?: string;
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  isDisabled = false,
  className,
}: ButtonProps) => {
  // cn(): clsx + twMerge 통합
  const buttonClasses = cn(
    buttonVariants({ variant, size, disabled: isDisabled, className }),
  );

  return (
    <button
      className={buttonClasses}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
