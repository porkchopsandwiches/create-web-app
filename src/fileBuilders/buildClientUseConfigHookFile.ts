import { Config } from "../types/Config";

export const buildClientUseConfigHookFile = async (config: Config) => {
    return `
import { config } from "../../common/consts/config";

// This could be modified if config changes later to something other than a static object
export const useConfig = () => {
    return { config };
};
`;
};
