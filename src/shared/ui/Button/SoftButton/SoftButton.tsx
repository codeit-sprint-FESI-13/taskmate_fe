import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

import { cn } from "@/shared/utils/styles/cn";

const softButtonVariants = cva(
  "text-label-1 rounded-[10px] font-semibold px-7 py-3 h-12 disabled:cursor-not-allowed disabled:bg-background-normal-alternative-2 disabled:text-gray-400 disabled:ring disabled:ring-gray-200 cursor-pointer  disabled:pointer-events-none transition-colors",
  {
    variants: {
      variant: {
        purple: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        grayActive:
          "bg-background-normal-alternative-2  ring-1 ring-blue-900 text-blue-800",
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
