import express, { IRouter } from "express";

export class ExpressDefer {
    private defers: Array<() => void> = [];
    private setupDeferrals: Array<(app: IRouter) => void> = [];

    private app: IRouter = express();

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
        this.defers.forEach((defer) => defer());
        this.setupDeferrals.forEach((defer) => defer(this.app));
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
