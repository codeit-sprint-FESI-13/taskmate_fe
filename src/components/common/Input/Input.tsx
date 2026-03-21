"use client";
import { cva, VariantProps } from "class-variance-authority";
import { InputHTMLAttributes, useState } from "react";

import ClearIcon from "@/components/common/Icons/ClearIcon";
import EyeOffIcon from "@/components/common/Icons/EyeOffIcon";
import EyeOnIcon from "@/components/common/Icons/EyeOnIcon";
import { cn } from "@/utils/utils";

const InputVariants = cva(
  "w-full h-11 pt-3 pr-3 pb-3 pl-4 gap-1 rounded-xl text-sm leading-5 text-label-normal font-medium border border-gray-300 placeholder:text-label-alternative lg:text-base lg:leading-6 lg:font-medium lg:h-14 lg:rounded-2xl focus:outline-none focus:border-blue-800 hover:border-blue-300",
  {
    variants: {
      variant: {
        default: "",
        disabled:
          "text-label-disable bg-background-normal-alternative hover:border-gray-300",
        error:
          "border border-red-500 focus:border-red-500 hover:border-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface InputProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof InputVariants> {
  errorMessage?: string;
  supportingText?: string;
  onClear?: () => void;
}

const Input = ({
  type,
  variant,
  value,
  className,
  errorMessage,
  supportingText,
  onClear,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShow = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="flex flex-col gap-2.5">
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={cn(
            InputVariants({
              variant: errorMessage ? "error" : variant,
              className,
            }),
            "pr-6",
          )}
          value={value}
          {...props}
        ></input>
        <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-2">
          {/* type="password"일 때 눈 아이콘 */}
          {type === "password" && variant !== "disabled" && (
            <button
              type="button"
              onClick={toggleShow}
            >
              {showPassword ? (
                <EyeOnIcon className="text-gray-300" />
              ) : (
                <EyeOffIcon className="text-gray-300" />
              )}
            </button>
          )}

          {/* 값이 있을 때 X 버튼 */}
          {value && variant !== "disabled" && type !== "password" && (
            <button
              type="button"
              onClick={onClear}
            >
              <ClearIcon className="text-gray-300" />
            </button>
          )}
        </div>
      </div>
      {(errorMessage || supportingText) && (
        <div className="pl-3">
          <p
            className={cn(
              "text-sm",
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
