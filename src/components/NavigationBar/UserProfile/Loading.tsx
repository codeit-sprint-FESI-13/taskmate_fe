import Spinner from "@/shared/ui/Spinner";

export const Loading = () => {
  return (
    <div className="relative flex w-[150px] items-center justify-start rounded-full border border-gray-300 bg-white py-3 pr-4 pl-3">
      <Spinner size={24} />
    </div>
  );
};
