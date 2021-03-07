import { Config } from "../types/Config";
import { FileBuilder } from "../types/FileBuilder";

export const buildClientUseNetlifyAPIHookFile: FileBuilder = async (config: Config): Promise<string> => {
    const { functions } = config;

    if (!functions) {
        throw new Error("Functions are not enabled, this file should not be generated.");
    }

    return `
import axios, { AxiosError, AxiosInstance } from "axios";
import { ConcurrencyManager } from "axios-concurrency";
import VError from "verror";

type AxiosNetlifyAPI = {
    api: AxiosInstance;
};

type ErrorPayload = {
    error: {
        name: string;
        message: string;
    };
};

type PayloadErrorInfo = {
    [key: string]: unknown;
    statusCode: number;
    statusText: string;
};

type PayloadError = [string, string, PayloadErrorInfo];

const extractPayloadErrorInfo = async (error: AxiosError<ErrorPayload | string>): Promise<PayloadError> => {
    const { response } = error;

    if (response && response.data) {
        const { status, statusText, data } = response;
        const payload = await data;

        if (typeof payload === "string") {
            return [
                "Network Error",
                payload,
                {
                    statusCode: status,
                    statusText,
                },
            ];
        } else {
            const { name, message, ...payloadInfo } = payload.error;
            const info = {
                ...payloadInfo,
                statusCode: status,
                statusText,
            };
            return [name, message, info];
        }
    } else {
        return [
            "Unknown Error",
            "",
            {
                statusCode: 500,
                statusText: "Unknown error",
            },
        ];
    }
};

const makeAxiosNetlifyAPIImplementation = () => {
    const api = axios.create({
        baseURL: "/.netlify/functions/",
    });

    const maxConcurrentRequests = 1;

    ConcurrencyManager(api, maxConcurrentRequests);

    api.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const [name, message, info] = await extractPayloadErrorInfo(error);

            return Promise.reject(
                new VError(
                    {
                        name,
                        info,
                        cause: error,
                    },
                    message,
                ),
            );
        },
    );

    return { api };
};

const netlifyApi = makeAxiosNetlifyAPIImplementation();

export const useNetlifyAPI = (): AxiosNetlifyAPI => {
    return netlifyApi;
};`.trim();
};
