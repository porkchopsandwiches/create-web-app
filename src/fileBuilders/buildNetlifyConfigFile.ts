import { Config } from "../types/Config";
import { FileBuilder } from "../types/FileBuilder";

export const buildNetlifyConfigFile: FileBuilder = async (config: Config): Promise<string> => {
    const { functions, packageManager } = config;

    const px = packageManager === "pnpm" ? "npx pnpm" : "npx";

    return `
[build]
    NPM_FLAGS="--prefix=/dev/null"
    base = "/"
    publish = "out/"
    command = "${px} run deploy"
    ${functions ? `functions = "./fns/public"` : ``}
`.trim();
};
