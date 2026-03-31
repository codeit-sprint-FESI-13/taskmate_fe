"use client";

import { createContext, useContext } from "react";

import { cn } from "@/utils/utils";

interface ModalContextType {
  onClose: () => void;
}

const ModalContext = createContext<ModalContextType>({
  onClose: () => {},
});

interface RootProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Root = ({ children, onClose }: RootProps) => {
  return (
    <ModalContext.Provider value={{ onClose }}>
      <div className="fixed inset-0 flex items-center justify-center px-4">
        {children}
      </div>
    </ModalContext.Provider>
  );
};

interface BackdropProps {
  className?: string;
}

const Backdrop = ({ className }: BackdropProps) => {
  const { onClose } = useContext(ModalContext);

  return (
    <button
      type="button"
      aria-label="모달 닫기"
      className={cn("absolute inset-0 bg-black/40", className)}
      onClick={onClose}
    />
  );
};

interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

const Content = ({ children, className }: ContentProps) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        "relative z-10 w-full max-w-[360px] rounded-2xl bg-white p-6 shadow-xl",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title = ({ children, className }: TitleProps) => {
  return (
    <h3
      className={cn(
        "typography-body-1 text-label-strong text-center font-semibold",
        className,
      )}
    >
      {children}
    </h3>
  );
};

interface ActionsProps {
  children: React.ReactNode;
  className?: string;
}

const Actions = ({ children, className }: ActionsProps) => {
  return <div className={cn("mt-6 flex gap-2", className)}>{children}</div>;
};

export const Modal = {
  Root,
  Backdrop,
  Content,
  Title,
  Actions,
};
