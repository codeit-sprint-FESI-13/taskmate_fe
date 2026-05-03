// React
// 외부 라이브러리
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, ReactNode } from "react";

// 내부 코드
import { cn } from "@/shared/utils/styles/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-800 transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-blue-800 hover:bg-blue-900 text-white",
        secondary:
          "ring-1 ring-inset ring-blue-800 hover:ring-blue-900 text-blue-800",
      },
      size: {
        sm: "px-[14px] py-[7px] h-[32px] text-[13px] gap-1",
        md: "px-[20px] py-[9px] h-[42px] text-sm gap-2",
        lg: "px-[28px] py-[12px] h-[48px] text-sm gap-2",
        xl: "px-[40px] py-[12px] h-[56px] text-base gap-3",
        xxl: "px-[40px] py-[12px] h-[64px] text-lg gap-3",
      },
      isDisabled: {
        true: "cursor-not-allowed pointer-events-none",
        false: "cursor-pointer",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        isDisabled: true,
        class: "bg-gray-300 text-white opacity-100",
      },
      {
        variant: "secondary",
        isDisabled: true,
        class: "ring-gray-200 text-gray-400 opacity-100",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      isDisabled: false,
    },
  },
);

interface ButtonProps
  extends
    ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = ({
  children,
  variant,
  size,
  leftIcon,
  rightIcon,
  isDisabled = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, isDisabled }), className)}
      disabled={!!isDisabled}
      {...props}
    >
      {leftIcon && (
        <span className="flex shrink-0 items-center">{leftIcon}</span>
      )}
      <span>{children}</span>
      {rightIcon && (
        <span className="flex shrink-0 items-center">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;
