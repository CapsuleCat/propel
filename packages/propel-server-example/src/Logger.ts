import { Service } from "@capsule-cat/propel-server";
import { Logger } from "./types";

@Service("Logger")
export class MyLogger implements Logger {
    log(...args: unknown[]) {
        console.log(...args);
    }
}
