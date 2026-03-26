import { Icon } from "@/components/common/Icon";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className="flex w-full flex-col">{children}</div>;
};

interface TitleProps {
  children: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return (
    <div className="flex w-full items-center justify-start gap-[14px] p-4">
      <Icon
        name="RightFilledArrow"
        size={24}
        className="text-gray-300"
      />
      <h4 className="typography-body-1 text-label-normal font-semibold">
        {children}
      </h4>
    </div>
  );
};

interface ListProps {
  children: React.ReactNode;
}

const List = ({ children }: ListProps) => {
  return (
    <div className="flex w-full flex-col justify-start pl-10">{children}</div>
  );
};

export const Team = {
  Container,
  Title,
  List,
};
