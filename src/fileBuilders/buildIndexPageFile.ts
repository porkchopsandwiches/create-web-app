import { Config } from "../types/Config";

export const buildIndexPageFile = async (config: Config) => {
    return `
import React, { PropsWithChildren } from "react";
import { GetStaticProps } from "next";
import { Layout } from "../client/components/Layout";
import { Main } from "../client/components/Main";

type Props = unknown;

type StaticProps = {
    staticTitle: string;
};

const Index = (props: PropsWithChildren<Props & StaticProps>) => {
    return (
        <Layout pageTitle={props.staticTitle}>
            <Main />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<StaticProps> = async (/* context */) => {
    return {
        props: {
            staticTitle: "Static Page Title",
        },
    };
};

export default Index;
`.trim();
}
