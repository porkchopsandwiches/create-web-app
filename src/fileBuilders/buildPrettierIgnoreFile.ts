import { Config } from "../types/Config";

export const buildPrettierIgnoreFile = async (config: Config): Promise<string> => {
    const { functions } = config;

    const ignore = [`/package.json`, `/package-lock.json`, `/public`, `/.next`];

    if (functions) {
        ignore.push(`/fns/public`);
    }

    return ignore.join("\n");
};
