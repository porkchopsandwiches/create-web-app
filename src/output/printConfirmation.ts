import chalk from "chalk";

export const printConfirmation = (message: string): void => {
    // eslint-disable-next-line no-console
    console.log(chalk.green(message));
};
