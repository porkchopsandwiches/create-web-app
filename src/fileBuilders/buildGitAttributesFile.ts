import { FileBuilder } from "../types/FileBuilder";

export const buildGitAttributesFile: FileBuilder = async (): Promise<string> => {
    return `*.png filter=lfs diff=lfs merge=lfs -text`;
};
