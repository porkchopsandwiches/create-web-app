import fs from "fs";

export const getCWD = (): Promise<string> => {
    return fs.promises.realpath(process.cwd());
};
