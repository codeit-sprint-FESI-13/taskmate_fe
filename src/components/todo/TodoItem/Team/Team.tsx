interface Props {
  children: React.ReactNode;
}

export const Team = ({ children }: Props) => {
  return (
    <div className="flex w-fit items-center justify-center rounded-lg bg-gray-100 px-[10px] py-1">
      <span className="overflow-hidden text-[13px] leading-[18px] font-semibold tracking-[-0.13px] text-ellipsis text-gray-400">
        {children}
      </span>
    </div>
  );
};
