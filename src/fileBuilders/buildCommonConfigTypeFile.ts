import { Config } from "../types/Config";

export const buildCommonConfigTypeFile = async (config: Config) => {
    return `
export type Config = {
    appName: string;
};
`.trim();
};
