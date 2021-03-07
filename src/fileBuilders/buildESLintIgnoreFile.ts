import { Config } from "../types/Config";
import { FileBuilder } from "../types/FileBuilder";

export const buildESLintIgnoreFile: FileBuilder = async (config: Config): Promise<string> => {
    const { functions } = config;

    const ignore = [`/node_modules/*`, `/public/*`, `.next/*`, `/out/*`];

    if (functions) {
        ignore.push("/fns/public/*");
    }

    return ignore.join("\n");
};
