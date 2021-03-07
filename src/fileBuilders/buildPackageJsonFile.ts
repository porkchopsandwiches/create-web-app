import { Config } from "../types/Config";
import prettyFormat from "pretty-format";
import { FileBuilder } from "../types/FileBuilder";

export const buildPackageJsonFile: FileBuilder = async (config: Config): Promise<string> => {
    const { packageManager, name, functionsPort } = config;

    const px = packageManager === "pnpm" ? "npx pnpm" : "npx";

    return prettyFormat(
        {
            name: name,
            version: "1.0.0",
            dependencies: {
                "@babel/plugin-proposal-class-properties": "^7.13.0",
                "@babel/plugin-proposal-decorators": "^7.13.5",
                "@babel/plugin-proposal-object-rest-spread": "^7.13.8",
                "@babel/preset-typescript": "^7.13.0",
                "@lapc/aws-function-utils": "latest",
                "@types/aws-lambda": "^8.10.72",
                "@types/cookie": "^0.4.0",
                "@types/favicons": "^6.2.1",
                "@types/node": "^14.14.31",
                "@types/react": "^17.0.2",
                "@types/verror": "^1.10.4",
                axios: "^0.21.1",
                "axios-concurrency": "^1.0.4",
                "babel-loader": "^8.2.2",
                chalk: "^4.1.0",
                cookie: "^0.4.1",
                dotenv: "^8.2.0",
                "dotenv-webpack": "^7.0.1",
                favicons: "^6.2.1",
                "file-loader": "^6.2.0",
                "include-media": "^1.4.9",
                "netlify-lambda": "^2.0.3",
                next: "^10.0.8",
                "next-images": "^1.7.0",
                "next-transpile-modules": "^6.3.0",
                "npm-check-updates": "^11.1.10",
                "p-map": "^4.0.0",
                "p-queue": "^6.6.2",
                "query-string": "^6.14.1",
                react: "^17.0.1",
                "react-dom": "^17.0.1",
                recoil: "^0.1.3",
                "recoil-persist": "^2.3.0",
                verror: "^1.10.0",
            },
            license: "Proprietary",
            scripts: {
                "fns:build": "netlify-lambda build ./fns/src/endpoints --config ./fns/webpack.config.js",
                "fns:serve": `netlify-lambda serve ./fns/src/endpoints --config ./fns/webpack.config.js --port ${functionsPort}`,
                format: 'prettier --write "**/*.{ts,tsx,js,json,md}"',
                lint: "eslint -f ./vendor/stylishSuccess.js --ext .js,.ts,.tsx .",
                "lint:fix": "eslint -f ./vendor/stylishSuccess.js --ext .js,.ts,.tsx . --fix",
                "next:build": "next build",
                "next:export": "next export",
                "develop:server": "ts-node server/dev.ts",
                develop: `${px} run fns:serve && ${px} run favicons:build && ${px} run develop:server`,
                "favicons:build": "ts-node build/generate-favicons.ts",
                build: `${px} run favicons:build && ${px} run fns:build && ${px} run next:build && ${px} run next:export`,
                deploy: `${px} run build`,
            },
            devDependencies: {
                "@types/express": "^4.17.11",
                "@typescript-eslint/eslint-plugin": "^4.16.1",
                "@typescript-eslint/parser": "^4.16.1",
                eslint: "^7.21.0",
                "eslint-config-prettier": "^8.1.0",
                "eslint-plugin-prettier": "^3.3.1",
                "eslint-plugin-react": "^7.22.0",
                "eslint-plugin-react-hooks": "^4.2.0",
                "eslint-plugin-unicorn": "^28.0.2",
                express: "^4.17.1",
                "http-proxy-middleware": "^1.0.6",
                prettier: "^2.2.1",
                sass: "^1.32.8",
                "ts-node": "^9.1.1",
                typescript: "^4.2.3",
            },
        },
        {
            indent: 4,
        },
    );
};
