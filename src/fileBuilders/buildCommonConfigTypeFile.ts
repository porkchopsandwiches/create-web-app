import { FileBuilder } from "../types/FileBuilder";

export const buildCommonConfigTypeFile: FileBuilder = async (): Promise<string> => {
    return `
export type Config = {
    appName: string;
};
`.trim();
};
