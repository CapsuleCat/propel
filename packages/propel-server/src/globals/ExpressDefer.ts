import express, { IRouter } from "express";

export class ExpressDefer {
    private defers: Array<() => void> = [];
    private setupDeferrals: Array<(app: IRouter) => void> = [];

    private app: IRouter | undefined;

    push(defer: () => void) {
        this.defers.push(defer);
    }

    deferUse(defer: (app: IRouter) => void) {
        this.setupDeferrals.push(defer);
    }

    expressSetup(cb: (app: IRouter) => void) {
        // Push to beginning of array
        this.setupDeferrals.unshift(cb);
    }

    execute() {
        const app = express();

        this.defers.forEach((defer) => defer());
        this.setupDeferrals.forEach((defer) => defer(app));

        this.app = app;
    }

    getApp(): IRouter {
        if (!this.app) {
            throw new Error("App has not been initialized yet");
        }

        return this.app;
    }
}

/**
 * Factory for creating an express defer
 *
 * @returns {ExpressDefer} - the express defer
 */
export function getExpressDefer(): ExpressDefer {
    return new ExpressDefer();
}
