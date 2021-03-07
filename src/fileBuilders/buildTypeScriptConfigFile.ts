import { Config } from "../types/Config";

export const buildTypeScriptConfigFile = async (config: Config) => {
    return JSON.stringify(
        {
            "compilerOptions": {

                /* Basic Options */
                "target": "ES5",
                "module": "commonjs",
                "allowJs": false,
                "jsx": "preserve",
                "declaration": false,
                "strict": true,
                "noUnusedLocals": true,
                "noImplicitReturns": true,
                "allowSyntheticDefaultImports": true,
                "esModuleInterop": true,
                "resolveJsonModule": true,
                "skipLibCheck": true,
                "forceConsistentCasingInFileNames": true,
                "lib": [
                    "dom",
                    "dom.iterable",
                    "esnext"
                ],
                "noEmit": true,
                "moduleResolution": "node",
                "isolatedModules": true
            },
            "include": [
                "next-env.d.ts",
                "**/*.ts",
                "**/*.tsx"
            ],
            "exclude": [
                "node_modules"
            ]
        });
};
