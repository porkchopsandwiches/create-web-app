import { Config } from "../types/Config";

export const buildCommonConfigFile = async (config: Config) => {
    return `
import type { Config } from "../types/Config";

export const config: Config = {
    appName: \`\${process.env.NEXT_PUBLIC_APP_NAME}\`,
};

`.trim();
};
