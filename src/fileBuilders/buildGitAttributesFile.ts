import { Config } from "../types/Config";

export const buildGitAttributesFile = async (config: Config) => {
    return `*.png filter=lfs diff=lfs merge=lfs -text`;
};
