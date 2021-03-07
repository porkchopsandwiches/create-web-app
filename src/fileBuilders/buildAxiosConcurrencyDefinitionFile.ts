import { FileBuilder } from "../types/FileBuilder";

export const buildAxiosConcurrencyDefinitionFile: FileBuilder = async () => {
    return `declare module "axios-concurrency" {
    import Axios from "axios";
    type ConcurrencyManager = {
        detach: () => void;
    };

    type ConcurrencyManagerFactory = (api: Axios.AxiosInstance, concurrency: number) => ConcurrencyManager;

    declare const ConcurrencyManager: ConcurrencyManagerFactory;
}`.trim();
};
