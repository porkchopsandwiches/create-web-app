import fs from "fs";

export const checkAppDirectoryIsSafeToUse = async (appDirectory: string, overwrite = false): Promise<boolean> => {
    try {
        // If this throws no exception, the target exists and we cannot use it
        const stat = await fs.promises.stat(appDirectory);

        if (stat.isFile()) {
            return false;
        }

        if (stat.isDirectory() && overwrite) {
            return true;
        }

        return false;

        // Not found or not readable?
    } catch {
        try {
            await fs.promises.access(appDirectory, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
            return false;
        } catch {
            // Does not exist, we are good to go
            return true;
        }
    }
};
