interface Props {
  children: React.ReactNode;
}

export const Row = ({ children }: Props) => {
  return (
    <div className="flex w-full items-center justify-start gap-2">
      {children}
    </div>
  );
};
