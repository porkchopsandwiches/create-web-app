#!/usr/bin/env node

import { printConfirmation } from "./output/printConfirmation";
import { printError } from "./output/printError";
import { printLine } from "./output/printLine";
import { buildProgram } from "./utils/buildProgram";
import { readConfig } from "./utils/readConfig";
import chalk from "chalk";
import { createAppDirectory } from "./utils/createAppDirectory";
import { createAppFiles } from "./utils/createAppFiles";
import { confirm } from "./utils/confirm";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require("../package.json");

const execute = async () => {
    const { program, parse } = buildProgram();

    parse();

    try {
        printLine(chalk.bgCyan.black(` @porkchopsandwich/create-web-app v${packageJson.version} `));
        const config = await readConfig(program);
        const { name, functions, packageManager, stateLibrary, developmentPort, functionsPort, targetDir } = config;

        printLine(`Creating new web app "${chalk.green.bold(name)}":`);
        printLine(`• Directory: ${chalk.bold(targetDir)}`);
        printLine(`• Netlify function support?: ${chalk.bold(functions ? "Yes" : "No")}`);
        printLine(`• Package manager: ${chalk.bold(packageManager)}`);
        printLine(`• State library: ${chalk.bold(stateLibrary)}`);
        printLine(`• Development port: ${chalk.bold(developmentPort)}`);
        printLine(`${functions ? `• Functions port: ${chalk.bold(functionsPort)}` : ""}`);

        const proceed = await confirm("Are these details correct?");

        if (!proceed) {
            printConfirmation("Exiting...");
            process.exit(1);
        }

        await createAppDirectory(config);

        await createAppFiles(config);

        printConfirmation("All done, your new app has been created.");
        printLine(`To proceed:`);

        const commands = [
            [`cd ${targetDir}`, "Change to the new App directory"],
            [`${packageManager} install`, "Install dependencies"],
            [`cp .env.example .env`, "Copy and configure the environment file"],
        ];
        if (functions) {
            commands.push([`${packageManager} run fns:serve`, "Serve your functions locally"]);
        }
        commands.push(
            [`${packageManager} run develop`, "Run Next's local development server"],
            [`${packageManager} run deploy`, "Build the app for deployment"],
        );

        // eslint-disable-next-line unicorn/no-array-for-each
        commands.forEach(([command, description], index) => {
            printLine(`${index + 1}. ${description}: ${chalk.bold(command)}`);
        });
    } catch (error) {
        printError(error);
        process.exit();
    }
};

execute().then();
