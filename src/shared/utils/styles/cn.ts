import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classes: (string | undefined | false | null)[]) {
  return twMerge(clsx(classes));
}
