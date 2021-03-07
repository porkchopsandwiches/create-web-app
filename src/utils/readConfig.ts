import { validPackageManagers } from "../consts/validPackageManagers";
import { validStateLibraries } from "../consts/validStateLibraries";
import type { Config } from "../types/Config";
import commander from "commander";
import inquirer from "inquirer";
import path from "path";
import { checkAppDirectoryIsSafeToUse } from "./checkAppDirectoryIsSafeToUse";
import { deriveAppDirectory } from "./deriveAppDirectory";
import validateNpmPackageName from "validate-npm-package-name";
import { getCWD } from "./getCWD";
import isRelative from "is-relative";

export const readConfig = async (program: commander.Command): Promise<Config> => {
    const passedOptions = program.opts() as Partial<Config>;

    // If we were given a target directory, check it now before we get ahead of ourselves
    if (passedOptions.targetDir !== undefined) {
        const { targetDir } = passedOptions;
        const directoryIsSafeToUse = await checkAppDirectoryIsSafeToUse(targetDir);
        if (!directoryIsSafeToUse) {
            throw new Error(`Path "${targetDir}" is not valid to use as a target directory.`);
        }
        passedOptions.targetDir = isRelative(targetDir)
            ? path.normalize(`${await getCWD()}${path.sep}${targetDir}`)
            : path.normalize(targetDir);
    }

    if (passedOptions.name === undefined) {
        const { name }: Pick<Config, "name"> = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Enter name of package to create:",
                validate: async (candidateValue: string) => {
                    const validation = validateNpmPackageName(candidateValue);
                    if (!validation.validForNewPackages) {
                        return `Name "${candidateValue}" is not valid to use.`;
                    }
                    return true;
                },
            },
        ]);

        passedOptions.name = name;
    }

    // Derive a target dir from the name if none was passed
    if (passedOptions.targetDir === undefined) {
        const appDirectory = await deriveAppDirectory(passedOptions.name);
        const directoryIsSafeToUse = await checkAppDirectoryIsSafeToUse(appDirectory);
        if (!directoryIsSafeToUse) {
            throw new Error(`Name "${passedOptions.name}" is not valid to use as a target directory.`);
        }
        passedOptions.targetDir = appDirectory;
    }

    if (passedOptions.functions === undefined) {
        const { functions }: Pick<Config, "functions"> = await inquirer.prompt([
            {
                type: "confirm",
                name: "functions",
                message: "Will the app use Netlify functions?",
                default: false,
            },
        ]);

        passedOptions.functions = functions;
    }

    if (passedOptions.packageManager === undefined) {
        const { packageManager }: Pick<Config, "packageManager"> = await inquirer.prompt([
            {
                type: "list",
                name: "packageManager",
                message: "What package manager will be used for the scripts?",
                default: validPackageManagers[0],
                choices: validPackageManagers,
            },
        ]);

        passedOptions.packageManager = packageManager;
    }

    // @todo
    // passedOptions.functionsPort = 9005;
    passedOptions.developmentPort = 3001;

    if (passedOptions.functionsPort === undefined) {
        const { functionsPort }: Pick<Config, "functionsPort"> = await inquirer.prompt([
            {
                type: "number",
                name: "functionsPort",
                message: "What port should the functions run on while developing locally?",
                default: 9005,
            },
        ]);

        passedOptions.functionsPort = functionsPort;
    }

    if (passedOptions.stateLibrary === undefined) {
        const { stateLibrary }: Pick<Config, "stateLibrary"> = await inquirer.prompt([
            {
                type: "list",
                name: "stateLibrary",
                message: "What state library should be included?",
                default: validStateLibraries[0],
                choices: validStateLibraries,
            },
        ]);

        passedOptions.stateLibrary = stateLibrary;
    }
    passedOptions.stateLibrary = "recoil";

    return passedOptions as Config;
};
