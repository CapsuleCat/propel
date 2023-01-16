import debug from "debug";

const logger = debug("propel");

const extendedLogger = Object.assign(logger, {
    /**
     * Utility function to log a debug message.
     *
     * @param {string} msg - The message to log
     */
    debug: (msg: string) => {
        logger("debug", msg);
    },
    /**
     * Used to help generate a dependency graph.
     */
    graph: debug("propel:graph"),
});

export { extendedLogger as logger };
