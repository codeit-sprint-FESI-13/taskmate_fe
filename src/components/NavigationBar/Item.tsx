import { Icon as CommonIcon } from "@/components/common/Icon";
import { IconName } from "@/components/common/Icon/iconMap";

interface NameProps {
  children: React.ReactNode;
}

const Name = ({ children }: NameProps) => {
  return (
    <span className="typography-body-1 text-label-neutral font-semibold">
      {children}
    </span>
  );
};

interface IconProps {
  name: IconName;
}

const Icon = ({ name }: IconProps) => {
  return (
    <CommonIcon
      name={name}
      size={24}
      className="text-gray-300"
    />
  );
};

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <li className="flex items-center justify-start gap-[14px] p-4">
      {children}
    </li>
  );
};

export const Item = {
  Wrapper,
  Icon,
  Name,
};
