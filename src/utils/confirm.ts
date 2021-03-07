import inquirer from "inquirer";

type Confirmation = {
    proceed: boolean;
};

export const confirm = async (message: string): Promise<boolean> => {
    const { proceed }: Confirmation = await inquirer.prompt([
        {
            type: "confirm",
            name: "proceed",
            message,
        },
    ]);

    return proceed;
};
