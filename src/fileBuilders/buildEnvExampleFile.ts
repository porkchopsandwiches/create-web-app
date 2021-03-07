import { Config } from "../types/Config";

export const buildEnvExampleFile = async (config: Config) => {
    const { name } = config;
    return `
NEXT_PUBLIC_APP_NAME=${name}
`.trim();
}
