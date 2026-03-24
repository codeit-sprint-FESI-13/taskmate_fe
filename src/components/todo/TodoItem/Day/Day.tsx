import { cva } from "class-variance-authority";

interface Props {
  children: React.ReactNode;
  color: "blue" | "red";
}

const dayVariants = cva(
  "flex items-center justify-center rounded-lg py-1 px-[10px] w-fit",
  {
    variants: {
      color: {
        blue: "bg-blue-100 text-blue-700",
        red: "bg-red-light text-red-normal",
      },
    },
    defaultVariants: {
      color: "blue",
    },
  },
);

export const Day = ({ children, color }: Props) => {
  return (
    <div className={dayVariants({ color })}>
      <span className="overflow-hidden text-[13px] leading-4 font-bold tracking-[-0.13px] text-ellipsis whitespace-nowrap">
        {children}
      </span>
    </div>
  );
};
