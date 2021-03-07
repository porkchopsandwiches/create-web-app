import { Config } from "../types/Config";
import { FileBuilder } from "../types/FileBuilder";

export const buildFunctionsWebpackConfigFile: FileBuilder = async (config: Config): Promise<string> => {
    const { functions } = config;

    if (!functions) {
        throw new Error("Functions are not enabled, this file should not be generated.");
    }

    return `
/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");

require("dotenv").config();

const babelConfig = () => {
    const presets = [["@babel/preset-typescript", { isTSX: true, allExtensions: true }]];

    const plugins = [["@babel/plugin-proposal-decorators", { legacy: true }], ["@babel/proposal-class-properties", { loose: true }], "@babel/proposal-object-rest-spread"];

    return {
        cacheDirectory: true,
        plugins,
        presets,
    };
};

module.exports = {
    // mode: "development",
    optimization: { minimize: false },
    // target: "node",
    plugins: [
        new webpack.EnvironmentPlugin(
            Object.keys(process.env).filter((key) => {
                return typeof process.env[key] === "string" && key.slice(0, 4) !== "npm_";
            }),
        ),
    ],
    module: {
        rules: [
            {
                test: /\\.js|\\.ts?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        babelrc: false,
                        ...babelConfig(),
                    },
                },
            },
        ],
    },
};
`.trim();
};
