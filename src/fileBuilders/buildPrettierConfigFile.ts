import { Config } from "../types/Config";

export const buildPrettierConfigFile = async (config: Config) => {
    return `
{
    "printWidth": 360,
    "trailingComma": "all",
    "singleQuote": false,
    "tabWidth": 4,
    "useTabs": false,
    "semi": true,
    "bracketSpacing": true,
    "arrowParens": "always"
}
`.trim();
};
