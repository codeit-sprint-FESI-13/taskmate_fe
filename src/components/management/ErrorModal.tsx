"use client";

import { useEffect } from "react";

interface ErrorModalProps {
  message?: string;
  onClose: () => void;
}

const ErrorModal = ({ message, onClose }: ErrorModalProps) => {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <section className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative flex w-112.5 flex-col gap-4 rounded-2xl bg-white p-8 shadow-lg">
        <h2>{message ?? "요청 처리 중 오류가 발생했습니다."}</h2>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 w-fit cursor-pointer self-end text-2xl"
        >
          x
        </button>
      </div>
    </section>
  );
};

export default ErrorModal;
