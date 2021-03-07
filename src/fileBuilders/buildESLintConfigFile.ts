import { Config } from "../types/Config";

export const buildESLintConfigFile = async (config: Config) => {
    return `
module.exports = {
    // Use the Typescript parser
    parser: "@typescript-eslint/parser",

    // Start from the recommended rules from the @typescript-eslint/eslint-plugin
    extends: ["plugin:unicorn/recommended", "plugin:react/recommended", "plugin:react-hooks/recommended", "plugin:@typescript-eslint/recommended", "prettier/@typescript-eslint", "plugin:prettier/recommended"],

    parserOptions: {
        // Allows for the parsing of modern ECMAScript features
        ecmaVersion: 2018,
        // Allows for the use of imports
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },

    // Customize the rules
    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "react/react-in-jsx-scope": "off",
        "no-console": "error",
        "unicorn/filename-case": "off",
        "unicorn/no-array-reduce": "off",
        "unicorn/prevent-abbreviations": "off",
        "unicorn/consistent-function-scoping": "off",
        "react-hooks/exhaustive-deps": "warn",
    },

    overrides: [
        {
            // enable the rule specifically for TypeScript files
            files: ["*.tsx"],
            rules: {
                "@typescript-eslint/explicit-module-boundary-types": "off",
            },
        },
    ],

    settings: {
        react: {
            version: "detect",
        },
    },
};
`.trim();
};
