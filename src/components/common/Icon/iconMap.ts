import dynamic from "next/dynamic";

export const iconMap = {
  DownFilled: dynamic(() => import("./svg/Arrow/DownFilled.svg")),
  UpFilled: dynamic(() => import("./svg/Arrow/UpFilled.svg")),
  LeftFilled: dynamic(() => import("./svg/Arrow/LeftFilled.svg")),
  RightFilled: dynamic(() => import("./svg/Arrow/RightFilled.svg")),
  LeftDouble: dynamic(() => import("./svg/Arrow/LeftDouble.svg")),
  RightDouble: dynamic(() => import("./svg/Arrow/RightDouble.svg")),
  Bell: dynamic(() => import("./svg/Bell/Bell.svg")),
  BellDot: dynamic(() => import("./svg/Bell-dot/BellDot.svg")),
  Calendar: dynamic(() => import("./svg/Calendar/Line/Calendar.svg")),
  Chat: dynamic(() => import("./svg/Chat/Chat.svg")),
  EyeOnIcon: dynamic(() => import("./svg/EyeOnIcon.svg")),
  EyeOffIcon: dynamic(() => import("./svg/EyeOffIcon.svg")),
  FilledXCircle: dynamic(() => import("./svg/FilledXCircle.svg")),
  OutlineXCircle: dynamic(() => import("./svg/OutlineXCircle.svg")),
  Kebab: dynamic(() => import("./svg/Kebab.svg")),
  Home: dynamic(() => import("./svg/Home/Home.svg")),
  Menu: dynamic(() => import("./svg/Menu/Menu.svg")),
  Out: dynamic(() => import("./svg/Out/Line/Out.svg")),
  Paper: dynamic(() => import("./svg/Paper/Paper.svg")),
  Search: dynamic(() => import("./svg/Search/Search.svg")),
  Trash: dynamic(() => import("./svg/Trash.svg")),
  User: dynamic(() => import("./svg/User/User.svg")),
  ActiveCheckBox: dynamic(() => import("./svg/Checkbox/ActiveCheckBox.svg")),
  ActiveFilledCheckBox: dynamic(
    () => import("./svg/Checkbox/ActiveFilledCheckBox.svg"),
  ),
  InactiveCheckBox: dynamic(
    () => import("./svg/Checkbox/InactiveCheckBox.svg"),
  ),
  InactiveFilledCheckBox: dynamic(
    () => import("./svg/Checkbox/InactiveFilledCheckBox.svg"),
  ),
  Pencil: dynamic(() => import("./svg/Pencil/Pencil.svg")),
  Meatball: dynamic(() => import("./svg/Meatball.svg")),
  Plus: dynamic(() => import("./svg/Plus.svg")),
} as const;

export type IconName = keyof typeof iconMap;
