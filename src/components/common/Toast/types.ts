import * as React from "react";

export type ToastVariant = "default" | "success" | "error";

export type ToastAction = {
  label: string;
  onClick?: () => void;
};

export type ToastOptions = {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  duration?: number;
  action?: ToastAction;
};

export type ToastRecord = Required<
  Omit<ToastOptions, "id" | "title" | "description" | "action">
> & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastAction;
};

export type ToastContextValue = {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
};
