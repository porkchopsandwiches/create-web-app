import { Config } from "../types/Config";

export const buildESLintIgnoreFile = async (config: Config): Promise<string> => {
    const { functions } = config;

    const ignore = [`/node_modules/*`, `/public/*`, `.next/*`, `/out/*`];

    if (functions) {
        ignore.push("/fns/public/*");
    }

    return ignore.join("\n");
};
