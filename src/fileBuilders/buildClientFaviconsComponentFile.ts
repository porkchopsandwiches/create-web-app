export const buildClientFaviconsComponentFile = async (): Promise<string> => {
    return `
import React, { PropsWithChildren } from "react";
import Head from "next/head";

export type Props = unknown;

export const Favicons = (props: PropsWithChildren<Props>) => {
    const { children } = props;
    return (
        <Head>
            <link rel="shortcut icon" href={require("../images/favicons/favicon.ico")} />
            <link rel="icon" type="image/png" sizes="16x16" href={require("../images/favicons/favicon-16x16.png")} />
            <link rel="icon" type="image/png" sizes="32x32" href={require("../images/favicons/favicon-32x32.png")} />
            <link rel="icon" type="image/png" sizes="48x48" href={require("../images/favicons/favicon-48x48.png")} />
            {children}
        </Head>
    );
};

`.trim();
};
