import { cva, type VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/utils/utils";

const textButtonVariants = cva(
  "inline-flex items-center justify-center font-semibold transition-colors focus:outline-none cursor-pointer",
  {
    variants: {
      variant: {
        primary: "text-gray-400 active:text-gray-500",
      },
      size: {
        md: "text-[13px] gap-[3px] px-2 py-[6px]",
        lg: "text-[16px] gap-[5px] px-2 py-[6px]",
      },
      isDisabled: {
        true: "text-gray-300 cursor-not-allowed pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      isDisabled: false,
    },
  },
);

interface TextButtonProps
  extends
    ComponentPropsWithoutRef<"button">,
    VariantProps<typeof textButtonVariants> {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const TextButton = ({
  children,
  variant,
  size,
  leftIcon,
  rightIcon,
  isDisabled = false,
  className,
  ...props
}: TextButtonProps) => {
  return (
    <button
      className={cn(
        textButtonVariants({
          variant,
          size,
          isDisabled: isDisabled,
          className,
        }),
      )}
      disabled={!!isDisabled}
      {...props}
    >
      {leftIcon && (
        <span className="flex shrink-0 items-center justify-center">
          {leftIcon}
        </span>
      )}
      <span className="leading-none">{children}</span>
      {rightIcon && (
        <span className="flex shrink-0 items-center justify-center">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default TextButton;
