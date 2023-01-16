import type { PropelPlugin } from "@capsule-cat/propel-core";
import { executeBootstrapStack, executeControllerStack } from "./utilities/ioc";

export class PropelExpressPlugin implements PropelPlugin {
    async init() {
        executeControllerStack();

        await executeBootstrapStack();
    }
}
