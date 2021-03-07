type StateLibrary = "none" | "recoil";
type PackageManager = "npm" | "pnpm";

export type Config = {
    name: string;
    targetDir: string;
    functions: Boolean;
    packageManager: PackageManager;
    functionsPort: number;
    developmentPort: number;
    stateLibrary: StateLibrary;
};
