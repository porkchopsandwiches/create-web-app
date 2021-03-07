import { Config } from "../types/Config";

export const buildClientRecoilStateRootComponentFile = async (config: Config) => {
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
};

`.trim();
};
