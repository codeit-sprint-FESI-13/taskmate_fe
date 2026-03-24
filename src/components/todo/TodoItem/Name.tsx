interface Props {
  children: React.ReactNode;
}

export const Name = ({ children }: Props) => {
  return (
    <span className="text-label-neutral w-full overflow-hidden text-base leading-6 font-medium text-ellipsis">
      {children}
    </span>
  );
};
