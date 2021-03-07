import { Config } from "../types/Config";

export const buildSampleNetlifyFunctionFile = async (config: Config) => {
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
