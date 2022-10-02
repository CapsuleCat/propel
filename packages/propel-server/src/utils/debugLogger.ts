import debug from "debug";

export const logger = debug("propel");

/**
 * Utility function to log a message to the console.
 *
 * @param {string} namespace - the namespace to log to
 * @param {...any} args - the arguments to log
 */
export function log(...args: unknown[]) {
    logger("", ...args);
}

export const graphLogger = debug("propel:graph");
