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

const execute = async () => {
    const { program, parse } = buildProgram();

    parse();

    try {
        const config = await readConfig(program);
        const { name, functions, packageManager, stateLibrary, developmentPort, functionsPort, targetDir } = config;

        printLine(`Creating new Next project "${chalk.green.bold(name)}":`);
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

        console.log(config);

        return;

        await createAppDirectory(config);

        await createAppFiles(config);

        printConfirmation("All done, your new app has been created.");
        printLine(`To proceed:`);
        printLine(`1. cd ${name}`);
        printLine(`2. ${packageManager} install`);
        printLine(`3. cp .env.example .env`);
        printLine(`4. ${packageManager} run develop`);
    } catch (error) {
        printError(error);
        process.exit();
    }
};

execute();
