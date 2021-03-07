import inquirer from "inquirer";

type Confirmation = {
    proceed: boolean;
}

export const confirm = async (message: string) => {
    const { proceed }: Confirmation = await inquirer.prompt([
        {
            type: "confirm",
            name: "proceed",
            message,
        },
    ]);

    return proceed;
};
