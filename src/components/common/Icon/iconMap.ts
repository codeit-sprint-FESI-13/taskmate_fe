import DownFilledArrow from "./svg/Arrow/DownFilled.svg";
import LeftDoubleArrow from "./svg/Arrow/LeftDouble.svg";
import LeftFilledArrow from "./svg/Arrow/LeftFilled.svg";
import RightArrow from "./svg/Arrow/Right.svg";
import RightDoubleArrow from "./svg/Arrow/RightDouble.svg";
import RightFilledArrow from "./svg/Arrow/RightFilled.svg";
import UpFilledArrow from "./svg/Arrow/UpFilled.svg";
import Bell from "./svg/Bell/Bell.svg";
import BellDot from "./svg/Bell-dot/BellDot.svg";
import Calendar from "./svg/Calendar/Line/Calendar.svg";
import BlueCharacter from "./svg/Character/BlueCharacter.svg";
import GreenCharacter from "./svg/Character/GreenCharacter.svg";
import Chat from "./svg/Chat/Chat.svg";
import ActiveCheckBox from "./svg/Checkbox/ActiveCheckBox.svg";
import ActiveFilledCheckBox from "./svg/Checkbox/ActiveFilledCheckBox.svg";
import InactiveCheckBox from "./svg/Checkbox/InactiveCheckBox.svg";
import InactiveFilledCheckBox from "./svg/Checkbox/InactiveFilledCheckBox.svg";
import Dot from "./svg/Dot.svg";
import EyeOffIcon from "./svg/EyeOffIcon.svg";
import EyeOnIcon from "./svg/EyeOnIcon.svg";
import Deadline from "./svg/feature/Deadline.svg";
import FlagBlue from "./svg/feature/Flag_Blue.svg";
import FlagGreen from "./svg/feature/Flag_Green.svg";
import Goal from "./svg/feature/Goal.svg";
import GoalFlag from "./svg/feature/GoalFlag.svg";
import People from "./svg/feature/People.svg";
import PipeBlue from "./svg/feature/Pipe_Blue.svg";
import PipeGreen from "./svg/feature/Pipe_Green.svg";
import FilledXCircle from "./svg/FilledXCircle.svg";
import Flag from "./svg/Flag.svg";
import Home from "./svg/Home/Home.svg";
import Kebab from "./svg/Kebab.svg";
import LogoIcon from "./svg/Logo/Icon.svg";
import LogoText from "./svg/Logo/Text.svg";
import Meatball from "./svg/Meatball.svg";
import Menu from "./svg/Menu/Menu.svg";
import Out from "./svg/Out/Line/Out.svg";
import OutlineXCircle from "./svg/OutlineXCircle.svg";
import Paper from "./svg/Paper/Paper.svg";
import Pencil from "./svg/Pencil/Pencil.svg";
import Plus from "./svg/Plus.svg";
import Search from "./svg/Search/Search.svg";
import Trash from "./svg/Trash.svg";
import User from "./svg/User/User.svg";

export const iconMap = {
  DownFilledArrow,
  UpFilledArrow,
  LeftFilledArrow,
  RightFilledArrow,
  LeftDoubleArrow,
  RightDoubleArrow,
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
  ActiveCheckBox,
  ActiveFilledCheckBox,
  InactiveCheckBox,
  InactiveFilledCheckBox,
  Pencil,
  Meatball,
  Plus,
  Deadline,
  FlagBlue,
  FlagGreen,
  Goal,
  People,
  PipeBlue,
  PipeGreen,
  LogoIcon,
  LogoText,
  Flag,
  GoalFlag,
  Dot,
  GreenCharacter,
  BlueCharacter,
  RightArrow,
} as const;

export type IconName = keyof typeof iconMap;
