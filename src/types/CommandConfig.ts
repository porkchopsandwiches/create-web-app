import { Config } from "./Config";

type StateLibrary = "none" | "recoil";

export type CommandConfig = Config & {
    functionsPort: number;
    developmentPort: number;
    stateLibrary: StateLibrary;
};
