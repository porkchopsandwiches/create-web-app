import { Config } from "../types/Config";

export const buildEnvironmentExampleFile = async (config: Config): Promise<string> => {
    const { name } = config;
    return `
NEXT_PUBLIC_APP_NAME=${name}
`.trim();
};
