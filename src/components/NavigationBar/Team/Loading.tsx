import Spinner from "@/shared/ui/Spinner";

export const Loading = () => {
  return (
    <div className="flex h-[300px] w-full items-center justify-center">
      <Spinner size={40} />
    </div>
  );
};
