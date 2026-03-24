interface Props {
  children: React.ReactNode;
}

export const Goal = ({ children }: Props) => {
  return (
    <span className="w-fit overflow-hidden text-base leading-6 font-medium tracking-[-0.16px] text-ellipsis text-gray-500">
      {children}
    </span>
  );
};
