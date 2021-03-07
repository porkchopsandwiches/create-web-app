import fs from "fs";

export const getCWD = () => {
    return fs.promises.realpath(process.cwd());
};
