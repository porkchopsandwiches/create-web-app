import { Config } from "../types/Config";

export const buildNetlifyFunctionWithConfigHofFile = async (config: Config) => {
    return `
import { config } from "../../../common/consts/config";
import { withConfigFactory } from "@lapc/aws-function-utils";

export const withConfig = withConfigFactory(config);
`.trim();
};
