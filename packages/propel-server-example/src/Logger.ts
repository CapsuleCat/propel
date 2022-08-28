import { Factory } from "@capsule-cat/propel-server";
import { Logger } from "./types";

@Factory("Logger", {
    defaultArgs: ["default"],
})
export class MyLogger implements Logger {
    private namespace: string;

    constructor(namespace: string) {
        this.namespace = namespace;
    }

    log(...args: unknown[]) {
        console.log(`[${this.namespace}]`, ...args);
    }
}
