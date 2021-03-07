import { Config } from "../types/Config";
import { FileBuilder } from "../types/FileBuilder";

export const buildClientRecoilStateRootComponentFile: FileBuilder = async (config: Config): Promise<string> => {
    const { stateLibrary } = config;

    if (stateLibrary !== "recoil") {
        throw new Error("Recoil state library is not enabled, this file should not be generated.");
    }

    return `
import React, { PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";
import { recoilPersist } from "../recoil/persist/recoilPersist";

type Props = unknown;

const { RecoilPersist, updateState } = recoilPersist();

export const StateRoot = (props: PropsWithChildren<Props>) => {
    const { children } = props;

    return (
        <React.StrictMode>
            <RecoilRoot initializeState={updateState}>
                <RecoilPersist />
                {children}
            </RecoilRoot>
        </React.StrictMode>
    );
};`.trim();
};
