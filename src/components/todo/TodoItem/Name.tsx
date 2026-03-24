interface Props {
  children: React.ReactNode;
}

export const Name = ({ children }: Props) => {
  return (
    <span className="w-fit overflow-hidden text-xl leading-[30px] font-semibold text-ellipsis text-slate-800">
      {children}
    </span>
  );
};
