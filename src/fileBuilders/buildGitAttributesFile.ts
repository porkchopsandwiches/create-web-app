export const buildGitAttributesFile = async (): Promise<string> => {
    return `*.png filter=lfs diff=lfs merge=lfs -text`;
};
