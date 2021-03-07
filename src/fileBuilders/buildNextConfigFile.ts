import { Config } from "../types/Config";

export const buildNextConfigFile = async (config: Config) => {
    return `
/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require("next-transpile-modules")([]);
const withNextImages = require("next-images");

module.exports = withTM(withNextImages());
`.trim();
}
