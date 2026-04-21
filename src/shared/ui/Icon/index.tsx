import { SVGProps } from "react";

import { iconMap, IconName } from "./iconMap";

interface Props extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 24, ...props }: Props) {
  const Svg = iconMap[name];
  return (
    <Svg
      width={size}
      height={size}
      {...props}
    />
  );
}
