export const buildCommonConfigTypeFile = async (): Promise<string> => {
    return `
export type Config = {
    appName: string;
};
`.trim();
};
