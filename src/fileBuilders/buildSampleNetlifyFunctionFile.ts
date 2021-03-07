import { Config } from "../types/Config";
import { FileBuilder } from "../types/FileBuilder";

export const buildSampleNetlifyFunctionFile: FileBuilder = async (config: Config): Promise<string> => {
    const { functions } = config;

    if (!functions) {
        throw new Error("Functions are not enabled, this file should not be generated.");
    }

    return `
import { withConfig } from "../hofs/withConfig";
import { success, withGenericErrorResponse, withGetGuard } from "@lapc/aws-function-utils";

export const handler = withGenericErrorResponse(
    withGetGuard(
        withConfig(async (event, context) => {
            const { config, ...rest } = context;
            return success({
                appName: \`\${config.appName}\`,
                event,
                config,
                context: rest,
            });
        }),
    ),
);
`.trim();
};
