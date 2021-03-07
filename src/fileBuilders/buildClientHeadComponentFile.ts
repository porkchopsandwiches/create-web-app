import { FileBuilder } from "../types/FileBuilder";

export const buildClientHeadComponentFile: FileBuilder = async (): Promise<string> => {
    return `
import React, { PropsWithChildren } from "react";
import NextHead from "next/head";
import { useConfig } from "../hooks/useConfig";

type MetaAsName = {
    name: string;
    content: string;
};

type MetaAsProperty = {
    property: string;
    content: string;
};

type Meta = MetaAsName | MetaAsProperty;

const isPropertyMeta = (meta: Meta): meta is MetaAsProperty => {
    return meta.hasOwnProperty("property");
};

const isNameMeta = (meta: Meta): meta is MetaAsName => {
    return meta.hasOwnProperty("name");
};

export type Props = {
    description?: string;
    meta?: Meta[];
    pageTitle: string;
    titleTemplate?: string;
    siteTitle?: string;
    author?: string;
};

export const Head = (props: PropsWithChildren<Props>) => {
    const { config } = useConfig();
    const defaultProps = {
        meta: [],
        description: "",
        author: "",
        siteTitle: config.appName,
        titleTemplate: "{pageTitle} | {siteTitle}",
    };
    const { description, meta, pageTitle, author, siteTitle, titleTemplate } = { ...defaultProps, ...props };

    const title = titleTemplate.split("{pageTitle}").join(pageTitle).split("{siteTitle}").join(siteTitle);

    const fullMeta: Meta[] = [
        ...meta,
        {
            name: "description",
            content: description,
        },
        {
            property: "og:title",
            content: title,
        },
        {
            property: "og:description",
            content: description,
        },
        {
            property: "og:type",
            content: "website",
        },
        {
            name: "twitter:card",
            content: "summary",
        },
        {
            name: "twitter:creator",
            content: author,
        },
        {
            name: "twitter:title",
            content: title,
        },
        {
            name: "twitter:description",
            content: description,
        },
    ];

    return (
        <NextHead>
            <meta charSet="utf-8" />
            {fullMeta.map((meta) => {
                const { content } = meta;
                if (isPropertyMeta(meta)) {
                    const { property } = meta;
                    return <meta property={property} content={content} key={property} />;
                } else if (isNameMeta(meta)) {
                    const { name } = meta;
                    return <meta name={name} content={content} key={name} />;
                } else {
                    throw new Error(\`Invalid Meta tag had neither a property nor a name: \${JSON.stringify(meta)}\`);
                }
            })}
            <title>{title}</title>
        </NextHead>
    );
};
`.trim();
};
