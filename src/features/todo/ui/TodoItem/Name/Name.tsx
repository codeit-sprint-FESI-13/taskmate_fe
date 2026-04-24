interface Props {
  children: React.ReactNode;
}

export const Name = ({ children }: Props) => {
  return (
    <span className="w-fit truncate overflow-hidden text-xl leading-[30px] font-semibold tracking-[-0.6px] text-ellipsis text-slate-800">
      {children}
    </span>
  );
};
