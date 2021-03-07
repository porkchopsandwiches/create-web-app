#!/usr/bin/env node

import { Command } from "commander";
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

        console.log(`Creating new Next project "${chalk.green.bold(name)}":
• Directory: ${chalk.bold(targetDir)}
• Netlify function support?: ${chalk.bold(functions ? "Yes" : "No")}
• Package manager: ${chalk.bold(packageManager)}
• State library: ${chalk.bold(stateLibrary)}
• Development port: ${chalk.bold(developmentPort)}
${functions ? `• Functions port: ${chalk.bold(functionsPort)}` : ""}
`);

        const proceed = await confirm("Are these details correct?");

        if (!proceed) {
            console.log("Exiting...");
            process.exit(1);
        }

        console.log(config);

        return;

        await createAppDirectory(config);

        await createAppFiles(config);

        console.log("All done.");
        console.log(`To proceed:
    1. cd ${name}
    2. ${packageManager} install
    3. cp .env.example .env
    4. ${packageManager} run develop
    `)
    } catch (error) {
        console.log(chalk.red.bold("✘"), chalk.red(error));
        process.exit();
    }



};

execute();
