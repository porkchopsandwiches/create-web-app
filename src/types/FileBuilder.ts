import { Config } from "./Config";

export type FileBuilder = (config: Config) => Promise<string | Buffer>;
