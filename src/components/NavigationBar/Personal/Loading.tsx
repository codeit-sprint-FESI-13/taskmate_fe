import Spinner from "@/components/common/Spinner";

export const Loading = () => {
  return (
    <div className="flex h-[168px] w-full items-center justify-center">
      <Spinner size={40} />
    </div>
  );
};
