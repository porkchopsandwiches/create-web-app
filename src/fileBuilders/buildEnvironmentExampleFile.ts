import { Config } from "../types/Config";
import { FileBuilder } from "../types/FileBuilder";

export const buildEnvironmentExampleFile: FileBuilder = async (config: Config): Promise<string> => {
    const { name } = config;
    return `
NEXT_PUBLIC_APP_NAME=${name}
`.trim();
};
