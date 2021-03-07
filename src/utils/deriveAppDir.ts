import { getCWD } from "./getCWD";
import path from "path";

export const deriveAppDir = async (appName: string) => {
    return `${await getCWD()}${path.sep}${appName}`;
};
