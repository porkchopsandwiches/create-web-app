import mkdirp from "mkdirp";
import { Config } from "../types/Config";

export const createAppDirectory = async (config: Config): Promise<void> => {
    await mkdirp(config.targetDir);
};
