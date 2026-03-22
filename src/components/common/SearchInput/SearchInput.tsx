"use client";
import { cva, VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";

import { cn } from "@/utils/utils";

import SearchIcon from "../Icons/SearchIcon";

const SearchInputVariants = cva(
  "w-full h-14 rounded-xl pt-3 pr-3 pb-3 pl-10 gap-1 text-label-normal lg:h-16 focus:outline-none",
  {
    variants: {
      variant: {
        line: "border border-gray-100 hover:border-blue-300 focus:border-blue-700 ",
        solid: "shadow-[0px_0px_14px_0px_rgba(138,138,138,0.08)]",
      },
    },
  },
);

interface SearchInputProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof SearchInputVariants> {}

const SearchInput = ({
  variant,
  value,
  className,
  ...props
}: SearchInputProps) => {
  return (
    <div className="relative">
      <div className="absolute top-1/2 left-4 -translate-y-1/2">
        <SearchIcon />
      </div>
      <input
        className={cn(
          SearchInputVariants({ variant, className }),
          variant === "line" && !!value && "border-gray-400",
        )}
        value={value}
        {...props}
      ></input>
    </div>
  );
};

export default SearchInput;
