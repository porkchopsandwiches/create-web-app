import { FileBuilder } from "../types/FileBuilder";

export const buildClientUseConfigHookFile: FileBuilder = async (): Promise<string> => {
    return `
import { config } from "../../common/consts/config";
import type { Config } from "../../common/types/Config";

type UseConfig = {
    config: Config;
};

// This could be modified if config changes later to something other than a static object
export const useConfig = (): UseConfig => {
    return { config };
};
`.trim();
};
