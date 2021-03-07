module.exports = {
    // Use the Typescript parser
    parser: "@typescript-eslint/parser",

    // Start from the recommended rules from the @typescript-eslint/eslint-plugin
    extends: ["plugin:unicorn/recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],

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
        curly: ["error", "all"],
        "arrow-parens": ["error", "always"],
        "arrow-body-style": ["error", "always"],
        "no-console": "error",
        "unicorn/filename-case": "off",
        "unicorn/no-array-reduce": "off",
        "unicorn/no-array-callback-reference": "off",

        "@typescript-eslint/ban-types": [
            "error",
            {
                extendDefaults: true,
                types: {},
            },
        ],
    },

    settings: {
        react: {
            version: "detect",
        },
    },
};
