# @porkchopsandwiches/create-web-app

## WIP
This is a work in progress. It will create a new Next.js web app project, with TypeScript, ESLint, Prettier, and Netlify function support preconfigured.

## Use (eventually)
`npx @porkchopsandwiches/create-web-app -n app-name -p pnpm -s recoil -f`

## Arguments
- `-n, --name <value>` The name of the project to create.
- `-p, --package-manager <value>` The package manager to use in the scripts, either `npm` or `pnpm`
- `-s, --state-library <value>` The state library to include, one of `none`, `recoil`
- `-f, --functions` Whether to include support for Netlify functions
- `-t, --target-dir <value>` Override the normal behaviour of putting the project in a directory with the `name` and instead use a custom directory path.
- `-O, --overwrite` If set, overwrite existing files
- `--functions-port <value>` The port Netlify functions will run on when developing locally
- `--development-port <value>` The port the local development server will run on
