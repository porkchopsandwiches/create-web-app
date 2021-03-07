import { Config } from "../types/Config";

export const buildIndexSCSSFile = async (config: Config) => {
    return `
@import "../../node_modules/include-media/dist/include-media";

* {
    box-sizing: border-box;
}
`.trim();
};
