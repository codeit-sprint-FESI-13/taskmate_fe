import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

import { cn } from "@/utils/utils";

const softButtonVariants = cva(
  "text-label-1 rounded-[10px] font-semibold px-7 py-3 h-12 disabled:cursor-not-allowed disabled:bg-background-normal-alternative-2 disabled:text-gray-400 disabled:ring disabled:ring-gray-200 cursor-pointer  disabled:pointer-events-none transition-colors",
  {
    variants: {
      variant: {
        purple: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        gray: "bg-background-normal-alternative-2 text-gray-400 ring-1 ring-gray-200 hover:ring-1 hover:bg-background-elevated-normal hover:text-gray-500 active:ring-1 active:ring-blue-900 active:text-blue-800",
      },
    },
    defaultVariants: {
      variant: "purple",
    },
  },
);

interface SoftButtonProps
  extends ComponentProps<"button">, VariantProps<typeof softButtonVariants> {}

const SoftButton = ({
  variant,
  className,
  children,
  ...props
}: SoftButtonProps) => {
  return (
    <button
      className={cn(softButtonVariants({ variant }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default SoftButton;
