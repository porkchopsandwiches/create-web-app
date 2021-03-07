import { FileBuilder } from "../types/FileBuilder";

export const buildPrettierConfigFile: FileBuilder = async (): Promise<string> => {
    return `
{
    "printWidth": 120,
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
