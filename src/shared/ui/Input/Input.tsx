"use client";
import { cva, VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";

import { cn } from "@/shared/utils/styles/cn";

/**
 * @example
 * // clear 버튼
 * const [value, setValue] = useState("");
 *
 * <Input
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 *   rightIcon={
 *     value && (
 *       <button onClick={() => setValue("")}>
 *         <ClearIcon />
 *       </button>
 *     )
 *   }
 * />
 */

const InputVariants = cva(
  "w-full h-11 pt-3 pr-3 pb-3 pl-4 gap-1 text-label-1 bg-background-normal leading-5 text-label-normal font-medium border border-gray-300 placeholder:text-label-alternative tablet:text-body-2 tablet:leading-6 tablet:h-14  focus:outline-none focus:border-blue-800 hover:border-blue-300",
  {
    variants: {
      variant: {
        default: "",
        disabled:
          "text-gray-400 bg-background-normal-alternative hover:border-gray-300",
        error:
          "border border-red-500 focus:border-red-500 hover:border-red-500",
      },
      shape: {
        default: "rounded-xl lg:rounded-2xl",
        search: "rounded-full hover:border-blue-300 focus:border-blue-300",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "default",
    },
  },
);

interface InputProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof InputVariants> {
  errorMessage?: string;
  supportingText?: string;
  rightIcon?: React.ReactNode;
}

const Input = ({
  variant,
  shape,
  value,
  className,
  errorMessage,
  supportingText,
  rightIcon,
  disabled,
  ...props
}: InputProps) => {
  const isDisabled = disabled || variant === "disabled";

  return (
    <div className="flex flex-col gap-2.5">
      <div className="relative">
        <input
          className={cn(
            InputVariants({
              variant: errorMessage
                ? "error"
                : isDisabled
                  ? "disabled"
                  : variant,
              shape,
              className,
            }),
            "pr-6",
          )}
          value={value}
          disabled={isDisabled}
          {...props}
        ></input>
        <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-2">
          {rightIcon}
        </div>
      </div>
      {(errorMessage || supportingText) && (
        <div className="pl-3">
          <p
            className={cn(
              "text-label-2 font-medium",
              errorMessage ? "text-red-500" : "text-label-assistive",
            )}
          >
            {errorMessage ?? supportingText}
          </p>
        </div>
      )}
    </div>
  );
};

export default Input;
