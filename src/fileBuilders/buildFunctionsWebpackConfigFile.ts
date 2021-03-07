import { Config } from "../types/Config";

export const buildFunctionsWebpackConfigFile = async (config: Config) => {
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
}
