import type { PropelPlugin } from "@capsule-cat/propel-core";
import {
    executeBootstrapStack,
    executeControllerStack,
    registerBootstrap,
} from "./utilities/ioc";
import bodyParser from "body-parser";
import type { IRouter } from "express";

export interface PropelExpressPluginOptions {
    enableBodyParser?: boolean;
}

export class PropelExpressPlugin implements PropelPlugin {
    constructor(private options?: PropelExpressPluginOptions) {}
    async init() {
        if (this.options?.enableBodyParser) {
            registerBootstrap((app: IRouter) => {
                app.use(bodyParser.json());
            });
        }

        executeControllerStack();

        await executeBootstrapStack();
    }
}
