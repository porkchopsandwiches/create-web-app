import commander, { Command } from "commander";
import { validPackageManagers } from "../consts/validPackageManagers";
import { validStateLibraries } from "../consts/validStateLibraries";

type ProgramAndParse = {
    program: commander.Command;
    parse: () => void;
};

const parseIntOption = (value: string) => {
    const parsedValue = Number.parseInt(`${value}`, 10);
    if (Number.isNaN(parsedValue)) {
        throw new commander.InvalidOptionArgumentError("Not a number.");
    }
    return parsedValue;
};

const validateFromListFactory = <T extends string = string>(list: T[]) => {
    return (nextValue: T) => {
        if (!list.includes(nextValue)) {
            throw new commander.InvalidOptionArgumentError(`"${nextValue}" not valid, must be one of ${list.join(", ")}`);
        }
        return nextValue;
    };
};

export const buildProgram = (): ProgramAndParse => {
    const program = new Command();
    program.version("0.0.1");

    program
        .option("-n, --name <name>", "Name of package to create")
        .option("-f, --functions", "Include function support?")
        .option("-p, --package-manager <packageManager>", "Package manager to use for scripts, 'npm' or 'pnpm'", validateFromListFactory(validPackageManagers), validPackageManagers[0])
        .option("-s, --state-library <stateLibrary>", "State library to use, 'none' or 'recoil'", validateFromListFactory(validStateLibraries), validStateLibraries[0])
        .option("--functions-port <functionsPort>", "Port to serve functions from locally", parseIntOption)
        .option("--development-port <developmentPort>", "Port to serve development server from locally", parseIntOption)
        .option("-t, --target-dir <target>", "Directory to output to");

    const parse = () => {
        program.parse(process.argv);
    };

    return {
        program,
        parse,
    };
};
