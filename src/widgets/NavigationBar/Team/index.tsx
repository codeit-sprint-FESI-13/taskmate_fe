import { Error } from "./Error";
import { Loading } from "./Loading";
import { Team as TeamMain } from "./Team";

export const Team = Object.assign(TeamMain, { Loading, Error });
