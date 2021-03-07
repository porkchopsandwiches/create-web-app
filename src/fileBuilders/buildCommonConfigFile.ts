import { FileBuilder } from "../types/FileBuilder";

export const buildCommonConfigFile: FileBuilder = async (): Promise<string> => {
    return `
import type { Config } from "../types/Config";

export const config: Config = {
    appName: \`\${process.env.NEXT_PUBLIC_APP_NAME}\`,
};

`.trim();
};
