export const buildIndexSCSSFile = async (): Promise<string> => {
    return `
@import "../../node_modules/include-media/dist/include-media";

* {
    box-sizing: border-box;
}
`.trim();
};
