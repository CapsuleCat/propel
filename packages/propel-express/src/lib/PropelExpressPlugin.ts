import type { PropelPlugin } from "@capsule-cat/propel-core";
import { getDependency } from "@capsule-cat/propel-core";
import { register } from "@capsule-cat/propel-core";
import { executeBootstrapStack, executeControllerStack } from "./utilities/ioc";
import bodyParser from "body-parser";
import type { Application } from "express";
import express from "express";

export interface PropelExpressPluginOptions {
    enableBodyParser?: boolean;
    port?: number;
}

export class PropelExpressPlugin implements PropelPlugin {
    constructor(private options?: PropelExpressPluginOptions) {}
    async init() {
        register("express", function () {
            return express();
        });

        const enableBodyParser = this.options?.enableBodyParser ?? true;
        const app = getDependency<Application>("express");

        if (enableBodyParser) {
            app?.use(bodyParser.json());
        }

        await executeBootstrapStack();

        executeControllerStack();

        const port = this.options?.port ?? 3000;

        app?.listen(port, () => {
            // TODO use logger
            console.log(`Server running on port ${port}`);
        });
    }

    async initTest() {
        register("express", function () {
            return express();
        });

        const enableBodyParser = this.options?.enableBodyParser ?? true;
        const app = getDependency<Application>("express");

        if (enableBodyParser) {
            app?.use(bodyParser.json());
        }

        await executeBootstrapStack();

        executeControllerStack();
    }
}
