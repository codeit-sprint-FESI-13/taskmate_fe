"use client";

import { useToast } from "@/hooks/useToast";

export default function ToastExample() {
  const { toast } = useToast();

  return (
    <div className="flex gap-2">
      <button
        type="button"
        className="rounded-md bg-black px-4 py-2 text-white"
        onClick={() =>
          toast({
            title: "저장 완료",
            description: "변경사항이 정상적으로 저장되었습니다.",
            variant: "success",
          })
        }
      >
        Success Toast
      </button>

      <button
        type="button"
        className="rounded-md bg-rose-600 px-4 py-2 text-white"
        onClick={() =>
          toast({
            title: "저장 실패",
            description: "잠시 후 다시 시도해주세요.",
            variant: "error",
            duration: 5000,
          })
        }
      >
        Error Toast
      </button>

      <button
        type="button"
        className="rounded-md bg-sky-600 px-4 py-2 text-white"
        onClick={() =>
          toast({
            title: "안내",
            description: "포스트가 등록되었습니다.",
            variant: "info",
            duration: 5000,
          })
        }
      >
        Error Toast
      </button>

      <button
        type="button"
        className="rounded-md bg-amber-500 px-4 py-2 text-black"
        onClick={() =>
          toast({
            title: "주의",
            description: "이 작업은 되돌릴 수 없습니다.",
            variant: "warning",
            duration: 0,
            action: {
              label: "확인",
              onClick: () => {
                console.log("확인 클릭");
              },
            },
          })
        }
      >
        Sticky Toast
      </button>
    </div>
  );
}
