import { Config } from "../types/Config";

export const buildESLintIgnoreFile = async (config: Config) => {
    return [`/node_modules/*`, `/public/*`, `/fns/public/*`, `.next/*`, `/out/*`].join("\n");
};
