export const buildClientMainComponentFile = async (): Promise<string> => {
    return `
import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useNetlifyAPI } from "../hooks/useNetlifyAPI";

type Props = unknown;

type Payload = {
    appName: string;
};

export const Main = (props: PropsWithChildren<Props>) => {
    const { children } = props;
    const { api } = useNetlifyAPI();

    const [message, setMessage] = useState<string>("");

    const fetchResponse = useCallback(async () => {
        try {
            const response = await api.get<Payload>("getAppName");
            setMessage(response.data.appName);
        } catch (error) {
            setMessage(\`API Error: \${error.message}\`);
        }
    }, [api]);

    useEffect(() => {
        fetchResponse().then();
    }, [fetchResponse]);

    return (
        <div>
            API Says: {message}
            {children}
        </div>
    );

    return (
        <>
            <section>API Says: {message}</section>
            {children}
        </>
    );
};
`.trim();
};
