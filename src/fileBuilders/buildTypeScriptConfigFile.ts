import prettyFormat from "pretty-format";

export const buildTypeScriptConfigFile = async (): Promise<string> => {
    return prettyFormat(
        {
            compilerOptions: {
                /* Basic Options */
                target: "ES5",
                module: "commonjs",
                allowJs: false,
                jsx: "preserve",
                declaration: false,
                strict: true,
                noUnusedLocals: true,
                noImplicitReturns: true,
                allowSyntheticDefaultImports: true,
                esModuleInterop: true,
                resolveJsonModule: true,
                skipLibCheck: true,
                forceConsistentCasingInFileNames: true,
                lib: ["dom", "dom.iterable", "esnext"],
                noEmit: true,
                moduleResolution: "node",
                isolatedModules: true,
            },
            include: ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
            exclude: ["node_modules"],
        },
        {
            indent: 4,
        },
    );
};
