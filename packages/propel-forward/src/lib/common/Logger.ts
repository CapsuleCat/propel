import { Factory, Inject } from "@capsule-cat/propel-server";
import debug from "debug";
import { assertTruthy } from "../utils/assertTruthy";
import { log } from "../utils/debugLogger";
import { once } from "../utils/once";
import type { ExceptionLogger } from "../definitions/ExceptionLogger";

export interface Log {
    info(...args: unknown[]): void;
    log(...args: unknown[]): void;
    error(...args: unknown[]): void;
}

export type ILogger = (namespace: string) => Log;

const warnAppNamespace = once(() =>
    log(
        "⚠️ Add APP_NAMESPACE to your env. This is okay for development, but will throw an error in production."
    )
);

const warnExceptionLogger = once(() =>
    log(
        "⚠️ Add ExceptionLogger to your dependencies. You can do this my decorating a class with @Service('ExceptionLogger'). This is okay for development, but will throw an error in production."
    )
);

@Factory({
    name: "Logger",
    args: ["default"],
})
export class Logger implements Log {
    @Inject("ExceptionLogger", { failIfMissing: false })
    private notifer!: ExceptionLogger;
    private debugLogger: debug.Debugger;

    constructor(namespace: string) {
        if (process.env.NODE_ENV === "production") {
            assertTruthy(
                process.env.APP_NAMESPACE,
                "Add APP_NAMESPACE to your env"
            );

            assertTruthy(
                this.notifer,
                "Add ExceptionLogger to your dependencies. You can do this my decorating a class with @Service('ExceptionLogger')"
            );
        } else {
            if (!process.env.APP_NAMESPACE) {
                warnAppNamespace();
            }

            if (!this.notifer) {
                warnExceptionLogger();
            }
        }

        const appNamespace = process.env.APP_NAMESPACE ?? "app";

        this.debugLogger = debug(`${appNamespace}:${namespace}`);
    }

    info(...args: unknown[]): void {
        this.debugLogger("", ...args);
    }

    log(...args: unknown[]): void {
        this.debugLogger("", ...args);
    }

    error(...args: unknown[]): void {
        this.debugLogger("", ...args);

        if (process.env.NODE_ENV === "production") {
            for (const arg of args) {
                if (arg instanceof Error) {
                    this.notifer.notify(arg);
                }
            }
        }
    }
}
