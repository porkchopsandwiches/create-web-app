import { FileBuilder } from "../types/FileBuilder";

export const buildEditorConfigFile: FileBuilder = async (): Promise<string> => {
    return `
#root = true

[*]
indent_style = space
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
max_line_length = 120
indent_size = 4
`.trim();
};
