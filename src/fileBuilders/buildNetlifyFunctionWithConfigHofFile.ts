import { Config } from "../types/Config";
import { FileBuilder } from "../types/FileBuilder";

export const buildNetlifyFunctionWithConfigHofFile: FileBuilder = async (config: Config): Promise<string> => {
    const { functions } = config;

    if (!functions) {
        throw new Error("Functions are not enabled, this file should not be generated.");
    }

    return `
import { config } from "../../../common/consts/config";
import { withConfigFactory } from "@lapc/aws-function-utils";

export const withConfig = withConfigFactory(config);
`.trim();
};
