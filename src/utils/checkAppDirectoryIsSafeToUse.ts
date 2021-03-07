import fs from "fs";

export const checkAppDirectoryIsSafeToUse = async (appDir: string) => {
    try {
        // If this throws no exception, the target exists and we cannot use it
        await fs.promises.stat(appDir);
        return false;

    // Not found or not readable?
    } catch (error) {
        try {
            await fs.promises.access(appDir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
            return false;
        } catch (error) {
            // Does not exist, we are good to go
            return true;
        }
    }
};
