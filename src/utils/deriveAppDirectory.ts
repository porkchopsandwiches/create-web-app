import { getCWD } from "./getCWD";
import path from "path";

export const deriveAppDirectory = async (appName: string): Promise<string> => {
    return `${await getCWD()}${path.sep}${appName}`;
};
