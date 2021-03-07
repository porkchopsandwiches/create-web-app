import { FileBuilder } from "../types/FileBuilder";

export const buildNVMRCFile: FileBuilder = async (): Promise<string> => {
    return `v14.6.0`;
};
