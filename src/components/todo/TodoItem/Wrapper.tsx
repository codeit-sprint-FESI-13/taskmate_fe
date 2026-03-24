interface Props {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: Props) => {
  return (
    <div className="bg-background-normal flex w-full items-start justify-center gap-2 rounded-[24px] px-8 py-6">
      {children}
    </div>
  );
};
