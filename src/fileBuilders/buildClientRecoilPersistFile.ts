import { Config } from "../types/Config";
import { FileBuilder } from "../types/FileBuilder";

export const buildClientRecoilPersistFile: FileBuilder = async (config: Config): Promise<string> => {
    const { stateLibrary } = config;

    if (stateLibrary !== "recoil") {
        throw new Error("Recoil state library is not enabled, this file should not be generated.");
    }

    return `
/* eslint-disable unicorn/no-null */

// Derived from https://github.com/polemius/recoil-persist, which does not import correctly.

import { MutableSnapshot } from "recoil";
import recoil from "recoil";

type RecoilPersistObject = {
    RecoilPersist: () => null;
    updateState: (mutableSnapshot: MutableSnapshot) => void;
};

type RecoilPersistConfig = {
    key?: string;
    storage?: Storage;
};

type PersistStateEvent = {
    atomValues: Map<string, unknown>;
    atomInfo: Map<string, unknown>;
    modifiedAtoms: Set<string>;
    previousAtomValues: Map<string, unknown>;
    transactionMetadata: Record<string, unknown>;
};

type UseTransactionObservation = (persistState: (event: PersistStateEvent) => void) => void;

type FullRecoil = typeof recoil & {
    useTransactionObservation_UNSTABLE: UseTransactionObservation;
};

const { useTransactionObservation_UNSTABLE: useTransactionObservation } = recoil as FullRecoil;

export const recoilPersist = (paths: string[] = [], config: RecoilPersistConfig = {}): RecoilPersistObject => {
    if (typeof window === "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return { RecoilPersist: () => null, updateState: () => {} };
    }

    const key = config.key || "recoil-persist";
    const storage = config.storage || localStorage;

    const RecoilPersist = () => {
        useTransactionObservation(persistState);
        return null;
    };

    const persistState = (event: PersistStateEvent) => {
        const toStore: Record<string, unknown> = {};
        event.atomValues.forEach((value, atomName) => {
            const name = atomName.split("__")[0];
            if (paths.length === 0 || paths.includes(name)) {
                toStore[name] = value;
            }
        });
        try {
            storage.setItem(key, JSON.stringify(toStore));
        } catch {}
    };

    const updateState = ({ set }: MutableSnapshot) => {
        const toParse = storage.getItem(key);
        let state: Record<string, never>;
        try {
            state = JSON.parse(toParse as never);
        } catch {
            return;
        }
        if (state === null) {
            return;
        }
        Object.keys(state).forEach((key) => {
            if (paths.length === 0 || paths.includes(key)) {
                try {
                    set({ key } as never, state[key]);
                } catch {}
            }
        });
    };

    return { RecoilPersist, updateState };
};`.trim();
};
