import debug from "debug";

export const logger = debug("propel:boost");

/**
 * Utility function to log a message to the console.
 *
 * @param {...any} args - the arguments to log
 */
export function log(...args: unknown[]) {
    logger("", ...args);
}
