import { Config } from "../types/Config";

type StateComponents = {
    imports: string;
    wrapperPrefix: string;
    wrapperSuffix: string;
};

const getStateComponents = (config: Config): StateComponents => {
    const { stateLibrary } = config;

    if (stateLibrary === "recoil") {
        return {
            imports: `import { StateRoot } from "./StateRoot";`,
            wrapperPrefix: `<StateRoot>`,
            wrapperSuffix: `</StateRoot>`,
        };
    }

    return {
        imports: "",
        wrapperSuffix: "",
        wrapperPrefix: "",
    };
};

export const buildClientLayoutComponentFile = async (config: Config): Promise<string> => {
    const { imports: stateImports, wrapperPrefix: stateWrapperPrefix, wrapperSuffix: stateWrapperSuffix } = getStateComponents(config);

    return `
import React, { PropsWithChildren, useEffect } from "react";
import { Head, Props as HeadProps } from "./Head";
${stateImports}
import { Favicons } from "./Favicons";

type Props = HeadProps;

export const Layout = (props: PropsWithChildren<Props>) => {
    const { children, ...restProps } = props;

    return (
        <>
            <Head {...restProps} />
            <Favicons />
            ${stateWrapperPrefix}{children}${stateWrapperSuffix}
        </>
    );
};
`.trim();
};
