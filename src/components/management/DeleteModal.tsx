"use client";

import Button from "@/components/common/Button/Button";
import TextButton from "@/components/common/TextButton/TextButton";

interface DeleteModalProps {
  onClose: () => void;
  onSubmitDelete: () => Promise<void>;
}

const DeleteModal = ({ onClose, onSubmitDelete }: DeleteModalProps) => {
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await onSubmitDelete();
      onClose();
    } catch (error) {
      console.log("팀 삭제 실패", error);
    }
  };

  return (
    <section className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex w-112.5 flex-col gap-4 rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center">
          <p className="typography-heading-1">팀을 삭제 할까요?</p>
          <p className="typography-body-1 mt-1.5 text-gray-400">
            팀 페이지와 팀 정보를 삭제합니다.
          </p>
          <p className="typography-body-2 mt-3 text-blue-700">
            <span></span>삭제된 팀 페이지는 복구할 수 없어요
          </p>
        </div>
        <form
          className="flex flex-col justify-center gap-2"
          onSubmit={handleSubmit}
        >
          <Button
            type="submit"
            className="w-full rounded-xl"
          >
            삭제하기
          </Button>
          <TextButton
            type="button"
            onClick={onClose}
          >
            취소
          </TextButton>
        </form>
      </div>
    </section>
  );
};

export default DeleteModal;
