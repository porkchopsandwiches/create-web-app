import fs from "fs";
import mkdirp from "mkdirp";
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
import { buildDevServerFile } from "../fileBuilders/buildDevServerFile";
import { buildEditorConfigFile } from "../fileBuilders/buildEditorConfigFile";
import { buildEnvExampleFile } from "../fileBuilders/buildEnvExampleFile";
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

const writeAppFile = async (config: Config, fileName: string, fileContents: string | Buffer) => {

    // Create sub directories as necessary
    const fileNameElements = fileName.split("/");
    if (fileNameElements.length > 1) {
        await mkdirp(`${config.targetDir}${path.sep}${fileNameElements.slice(0, -1).join(path.sep)}`);
    }

    const filePath = `${config.targetDir}${path.sep}${fileNameElements.join(path.sep)}`;
    return fs.promises.writeFile(filePath, fileContents);
};

export const createAppFiles = async (config: Config) => {
    const { name, functions, stateLibrary } = config;
    await writeAppFile(config, ".editorconfig", await buildEditorConfigFile(config));
    await writeAppFile(config, ".gitignore", await buildGitIgnoreFile(config));
    await writeAppFile(config, ".gitattributes", await buildGitAttributesFile(config));
    await writeAppFile(config, ".eslintignore", await buildESLintIgnoreFile(config));
    await writeAppFile(config, ".eslintrc.js", await buildESLintConfigFile(config));
    await writeAppFile(config, ".prettierignore", await buildPrettierIgnoreFile(config));
    await writeAppFile(config, ".prettierrc", await buildPrettierConfigFile(config));
    await writeAppFile(config, "tsconfig.json", await buildTypeScriptConfigFile(config));
    await writeAppFile(config, "package.json", await buildPackageJsonFile(config));
    await writeAppFile(config, "vendor/stylishSuccess.js", await buildStylishFormatterFile(config));
    await writeAppFile(config, "pages/index.tsx", await buildIndexPageFile(config));
    await writeAppFile(config, "common/types/Config.ts", await buildCommonConfigTypeFile(config));
    await writeAppFile(config, "common/consts/config.ts", await buildCommonConfigFile(config));
    await writeAppFile(config, ".env.example", await buildEnvExampleFile(config));
    await writeAppFile(config, "client/scss/index.scss", await buildIndexSCSSFile(config));
    await writeAppFile(config, "client/hooks/useConfig.ts", await buildClientUseConfigHookFile(config));
    await writeAppFile(config, "client/hooks/useNetlifyAPI.ts", await buildClientUseNetlifyAPIHookFile(config));
    await writeAppFile(config, "client/components/Layout.tsx", await buildClientLayoutComponentFile(config));
    await writeAppFile(config, "client/components/Head.tsx", await buildClientHeadComponentFile(config));
    await writeAppFile(config, "client/components/Main.tsx", await buildClientMainComponentFile(config));
    await writeAppFile(config, "client/images/favicons/favicon-original.png", await buildFaviconFile(config));
    await writeAppFile(config, "client/components/Favicons.tsx", await buildClientFaviconsComponentFile(config));
    await writeAppFile(config, "build/generate-favicons.ts", await buildGenerateFaviconsFile(config));
    await writeAppFile(config, "next.config.js", await buildNextConfigFile(config));

    // Functions-only files
    if (functions) {
        await writeAppFile(config, ".nvmrc", await buildNVMRCFile(config));
        await writeAppFile(config, "netlify.toml", await buildNetlifyConfigFile(config));
        await writeAppFile(config, "fns/webpack.config.js", await buildFunctionsWebpackConfigFile(config));
        await writeAppFile(config, "fns/src/endpoints/getAppName.ts", await buildSampleNetlifyFunctionFile(config));
        await writeAppFile(config, "fns/src/hofs/withConfig.ts", await buildNetlifyFunctionWithConfigHofFile(config));
        await writeAppFile(config, "server/dev.ts", await buildDevServerFile(config));
    }

    // Recoil files
    if (stateLibrary === "recoil") {
        await writeAppFile(config, "client/components/StateRoot.tsx", await buildClientRecoilStateRootComponentFile(config));
        await writeAppFile(config, "client/recoil/persist/recoilPersist.ts", await buildClientRecoilPersistFile(config));
    }
};
