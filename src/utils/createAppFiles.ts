import fs from "fs";
import mkdirp from "mkdirp";
import pEachSeries from "p-each-series";
import path from "path";
import { buildClientFaviconsComponentFile } from "../fileBuilders/buildClientFaviconsComponentFile";
import { buildClientHeadComponentFile } from "../fileBuilders/buildClientHeadComponentFile";
import { buildClientLayoutComponentFile } from "../fileBuilders/buildClientLayoutComponentFile";
import { buildClientMainComponentFile } from "../fileBuilders/buildClientMainComponentFile";
import { buildClientRecoilPersistFile } from "../fileBuilders/buildClientRecoilPersistFile";
import { buildClientRecoilStateRootComponentFile } from "../fileBuilders/buildClientRecoilStateRootComponentFile";
import { buildClientUseConfigHookFile } from "../fileBuilders/buildClientUseConfigHookFile";
import { buildClientUseNetlifyAPIHookFile } from "../fileBuilders/buildClientUseNetlifyAPIHookFile";
import { buildCommonConfigFile } from "../fileBuilders/buildCommonConfigFile";
import { buildCommonConfigTypeFile } from "../fileBuilders/buildCommonConfigTypeFile";
import { buildDevelopmentServerFile } from "../fileBuilders/buildDevelopmentServerFile";
import { buildEditorConfigFile } from "../fileBuilders/buildEditorConfigFile";
import { buildEnvironmentExampleFile } from "../fileBuilders/buildEnvironmentExampleFile";
import { buildESLintConfigFile } from "../fileBuilders/buildESLintConfigFile";
import { buildESLintIgnoreFile } from "../fileBuilders/buildESLintIgnoreFile";
import { buildFaviconFile } from "../fileBuilders/buildFaviconFile";
import { buildFunctionsWebpackConfigFile } from "../fileBuilders/buildFunctionsWebpackConfigFile";
import { buildGenerateFaviconsFile } from "../fileBuilders/buildGenerateFaviconsFile";
import { buildGitAttributesFile } from "../fileBuilders/buildGitAttributesFile";
import { buildGitIgnoreFile } from "../fileBuilders/buildGitIgnoreFile";
import { buildIndexPageFile } from "../fileBuilders/buildIndexPageFile";
import { buildIndexSCSSFile } from "../fileBuilders/buildIndexSCSSFile";
import { buildNetlifyConfigFile } from "../fileBuilders/buildNetlifyConfigFile";
import { buildNetlifyFunctionWithConfigHofFile } from "../fileBuilders/buildNetlifyFunctionWithConfigHofFile";
import { buildNextConfigFile } from "../fileBuilders/buildNextConfigFile";
import { buildNVMRCFile } from "../fileBuilders/buildNVMRCFile";
import { buildPackageJsonFile } from "../fileBuilders/buildPackageJsonFile";
import { buildPrettierConfigFile } from "../fileBuilders/buildPrettierConfigFile";
import { buildPrettierIgnoreFile } from "../fileBuilders/buildPrettierIgnoreFile";
import { buildSampleNetlifyFunctionFile } from "../fileBuilders/buildSampleNetlifyFunctionFile";
import { buildStylishFormatterFile } from "../fileBuilders/buildStylishFormatterFile";
import { buildTypeScriptConfigFile } from "../fileBuilders/buildTypeScriptConfigFile";
import type { Config } from "../types/Config";
import { FileBuilder } from "../types/FileBuilder";

type FilenameAndBuilder = [filename: string, builder: FileBuilder];

const writeAppFile = async (config: Config, fileName: string, fileContents: string | Buffer): Promise<void> => {
    // Create sub directories as necessary
    const fileNameElements = fileName.split("/");
    if (fileNameElements.length > 1) {
        await mkdirp(`${config.targetDir}${path.sep}${fileNameElements.slice(0, -1).join(path.sep)}`);
    }

    const filePath = `${config.targetDir}${path.sep}${fileNameElements.join(path.sep)}`;
    return fs.promises.writeFile(filePath, fileContents);
};

export const createAppFiles = async (config: Config): Promise<void> => {
    const { functions, stateLibrary } = config;

    const namesAndBuilders: FilenameAndBuilder[] = [
        [".editorconfig", buildEditorConfigFile],
        [".gitignore", buildGitIgnoreFile],
        [".gitattributes", buildGitAttributesFile],
        [".eslintignore", buildESLintIgnoreFile],
        [".eslintrc.js", buildESLintConfigFile],
        [".prettierignore", buildPrettierIgnoreFile],
        [".prettierrc", buildPrettierConfigFile],
        ["tsconfig.json", buildTypeScriptConfigFile],
        ["package.json", buildPackageJsonFile],
        ["vendor/stylishSuccess.js", buildStylishFormatterFile],
        ["pages/index.tsx", buildIndexPageFile],
        ["common/types/Config.ts", buildCommonConfigTypeFile],
        ["common/consts/config.ts", buildCommonConfigFile],
        [".env.example", buildEnvironmentExampleFile],
        ["client/scss/index.scss", buildIndexSCSSFile],
        ["client/hooks/useConfig.ts", buildClientUseConfigHookFile],
        ["client/hooks/useNetlifyAPI.ts", buildClientUseNetlifyAPIHookFile],
        ["client/components/Layout.tsx", buildClientLayoutComponentFile],
        ["client/components/Head.tsx", buildClientHeadComponentFile],
        ["client/components/Main.tsx", buildClientMainComponentFile],
        ["client/images/favicons/favicon-original.png", buildFaviconFile],
        ["client/components/Favicons.tsx", buildClientFaviconsComponentFile],
        ["build/generate-favicons.ts", buildGenerateFaviconsFile],
        ["next.config.js", buildNextConfigFile],
    ];

    if (functions) {
        namesAndBuilders.push(
            [".nvmrc", buildNVMRCFile],
            ["netlify.toml", buildNetlifyConfigFile],
            ["fns/webpack.config.js", buildFunctionsWebpackConfigFile],
            ["fns/src/endpoints/getAppName.ts", buildSampleNetlifyFunctionFile],
            ["fns/src/hofs/withConfig.ts", buildNetlifyFunctionWithConfigHofFile],
            ["server/dev.ts", buildDevelopmentServerFile],
        );
    }

    if (stateLibrary === "recoil") {
        namesAndBuilders.push(
            ["client/components/StateRoot.tsx", buildClientRecoilStateRootComponentFile],
            ["client/recoil/persist/recoilPersist.ts", buildClientRecoilPersistFile],
        );
    }

    await pEachSeries(namesAndBuilders, async ([filename, builder]) => {
        return writeAppFile(config, filename, await builder(config));
    });
};
