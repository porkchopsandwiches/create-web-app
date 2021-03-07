/* eslint-disable @typescript-eslint/no-var-requires */

"use strict";

const stylish = require("eslint/lib/cli-engine/formatters/stylish");
const chalk = require("chalk");

/**
 * Provides an implementation of Stylish that has an output on success as well as failure. Perfect for watch mode.
 *
 * @author Cam Morrow
 *
 * @param {array}   results
 * @returns {string}
 */
module.exports = (results) => {
    const styled = stylish(results);

    return styled.length > 0 ? styled : chalk.green.bold("✓️ No problems found.");
};
