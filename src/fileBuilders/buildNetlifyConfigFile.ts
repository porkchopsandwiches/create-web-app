import { Config } from "../types/Config";

export const buildNetlifyConfigFile = async (config: Config) => {
    return `
[build]
    NPM_FLAGS="--prefix=/dev/null"
    base = "/"
    publish = "out/"
    command = "npx pnpm run deploy"
    functions = "./fns/public"
`.trim();
};
