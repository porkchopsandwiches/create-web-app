export const buildNextConfigFile = async (): Promise<string> => {
    return `
/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require("next-transpile-modules")([]);
const withNextImages = require("next-images");

module.exports = withTM(withNextImages());
`.trim();
};
