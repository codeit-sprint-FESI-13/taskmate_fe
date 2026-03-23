import ArrowDownFilled from "./svg/Arrow/DownFilled.svg";
import ArrowLeftDouble from "./svg/Arrow/LeftDouble.svg";
import ArrowLeftFilled from "./svg/Arrow/LeftFilled.svg";
import ArrowRightDouble from "./svg/Arrow/RightDouble.svg";
import ArrowRightFilled from "./svg/Arrow/RightFilled.svg";
import ArrowUpFilled from "./svg/Arrow/UpFilled.svg";
import Bell from "./svg/Bell/Bell.svg";
import BellDot from "./svg/Bell-dot/BellDot.svg";
import Calendar from "./svg/Calendar/Line/Calendar.svg";
import Chat from "./svg/Chat/Chat.svg";
import CheckboxActiveCheckBox from "./svg/Checkbox/ActiveCheckBox.svg";
import CheckboxActiveFilledCheckBox from "./svg/Checkbox/ActiveFilledCheckBox.svg";
import CheckboxInactiveCheckBox from "./svg/Checkbox/InactiveCheckBox.svg";
import CheckboxInactiveFilledCheckBox from "./svg/Checkbox/InactiveFilledCheckBox.svg";
import EyeOffIcon from "./svg/EyeOffIcon.svg";
import EyeOnIcon from "./svg/EyeOnIcon.svg";
import FilledXCircle from "./svg/FilledXCircle.svg";
import Home from "./svg/Home/Home.svg";
import Kebab from "./svg/Kebab.svg";
import Meatball from "./svg/Meatball.svg";
import Menu from "./svg/Menu/Menu.svg";
import Out from "./svg/Out/Line/Out.svg";
import OutlineXCircle from "./svg/OutlineXCircle.svg";
import Paper from "./svg/Paper/Paper.svg";
import Pencil from "./svg/Pencil/Pencil.svg";
import Search from "./svg/Search/Search.svg";
import Trash from "./svg/Trash.svg";
import User from "./svg/User/User.svg";

export const iconMap = {
  DownFilled: ArrowDownFilled,
  UpFilled: ArrowUpFilled,
  LeftFilled: ArrowLeftFilled,
  RightFilled: ArrowRightFilled,
  LeftDouble: ArrowLeftDouble,
  RightDouble: ArrowRightDouble,
  Bell,
  BellDot,
  Calendar,
  Chat,
  EyeOnIcon,
  EyeOffIcon,
  FilledXCircle,
  OutlineXCircle,
  Kebab,
  Home,
  Menu,
  Out,
  Paper,
  Search,
  Trash,
  User,
  ActiveCheckBox: CheckboxActiveCheckBox,
  ActiveFilledCheckBox: CheckboxActiveFilledCheckBox,
  InactiveCheckBox: CheckboxInactiveCheckBox,
  InactiveFilledCheckBox: CheckboxInactiveFilledCheckBox,
  Pencil,
  Meatball,
} as const;

export type IconName = keyof typeof iconMap;
