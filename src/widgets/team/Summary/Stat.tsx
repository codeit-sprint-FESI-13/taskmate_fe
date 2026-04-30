export function Stat({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix: string;
}) {
  return (
    <div className="min-w-0 md:shrink-0">
      <p className="typography-body-2 mb-1 truncate font-bold text-green-400 md:mb-2 md:text-[15px]">
        {label}
      </p>
      <p className="flex min-w-0 items-end gap-1 text-white">
        <span className="truncate text-[40px] leading-none font-bold md:text-[48px]">
          {value}
        </span>
        <span className="typography-body-1 truncate pb-1 font-semibold md:pb-0.5 md:text-[24px]">
          {suffix}
        </span>
      </p>
    </div>
  );
}
