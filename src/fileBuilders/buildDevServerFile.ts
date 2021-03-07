import { Config } from "../types/Config";

export const buildDevServerFile = async (config: Config) => {
    const { functionsPort, developmentPort } = config;
    return `
/* eslint-disable no-console */
import express from "express";
import next from "next";
import { createProxyMiddleware } from "http-proxy-middleware";
import chalk from "chalk";

// Port to run the main Next dev server on
const port = ${developmentPort};

// Configure Next
const env = process.env.NODE_ENV;
const dev = env !== "production";
const app = next({
    dir: ".",
    dev,
});

(async () => {
    // Generic prefix for messages
    const prefix = chalk.green("dev server");

    console.log(\`\${prefix} Preparing Next...\`);
    try {
        // Get generic handler for normal Next requests
        const handle = app.getRequestHandler();

        // Prepare Next
        await app.prepare();

        // Generate an Express server
        const server = express();

        // Get the Netlify function port to proxy to
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const apiPath = "/.netlify";
        const apiPort = ${functionsPort};

        // Proxy requests to the /.netlify path to the Netlify server
        server.use(
            createProxyMiddleware(apiPath, {
                target: \`http://[::1]:\${apiPort}\`,
                headers: {
                    Connection: "keep-alive",
                },
                pathRewrite: {},
            }),
        );

        console.log(\`\${prefix} Proxied ::\${apiPort} to \${apiPath}\`);

        // Pass other requests on to Next like normal
        server.all("*", (req, res) => handle(req, res));

        // Listen to requests
        server.listen(port, () => {
            console.log(\`\${prefix} Listening on http://localhost:\${port}\`);
        });
    } catch (error) {
        console.log(chalk.red("dev server"), "An error occurred, server could not be started.");
        console.log(error);
    }
})();
`
};
