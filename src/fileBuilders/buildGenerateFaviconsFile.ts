import { Config } from "../types/Config";

export const buildGenerateFaviconsFile = async (config: Config) => {
    return `
/* eslint-disable no-console */
import favicons from "favicons";
import path from "path";
import chalk from "chalk";
import pMap from "p-map";
import fs from "fs";

const sourceDirectoryPath = path.resolve(".", "client", "images", "favicons");
const sourcePath = path.resolve(sourceDirectoryPath, "favicon-original.png");
const config: Partial<favicons.FaviconOptions> = {
    path: "/client/images/favicons",
    icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        firefox: false,
        windows: false,
        yandex: false,
        favicons: true,
    },
};

(async () => {
    const prefix = chalk.magenta("favicon generator");

    console.log(\`\${prefix} Generating favicons from \${sourcePath}\`);

    try {
        const result = await favicons(sourcePath, config);

        // Save images to favicons directory
        await pMap(result.images, async (imageDetails) => {
            const { contents, name } = imageDetails;
            const imagePath = path.resolve(sourceDirectoryPath, name);
            await fs.promises.writeFile(imagePath, contents);
            return imagePath;
        });

        console.log(\`\${prefix} Generated favicons!\`);
    } catch (error) {
        console.log(\`\${prefix} An error occurred while generating favicons.\`);
        console.error(error);
    }
})();
`.trim();
};
