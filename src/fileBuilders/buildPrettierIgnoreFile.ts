import { Config } from "../types/Config";

export const buildPrettierIgnoreFile = async (config: Config) => {
    return `
/package.json
/package-lock.json
/public
/fns/public
/.next`.trim();
};
