import { Error } from "./Error";
import { Loading } from "./Loading";
import { Personal as PersonalMain } from "./Personal";

export const Personal = Object.assign(PersonalMain, { Loading, Error });
