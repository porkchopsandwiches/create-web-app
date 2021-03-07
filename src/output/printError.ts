import chalk from "chalk";

export const printError = (error: unknown): void => {
    // eslint-disable-next-line no-console
    console.log(chalk.red.bold("✘"), chalk.red(error));
};
