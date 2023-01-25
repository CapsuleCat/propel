import type { PropelPlugin } from "@capsule-cat/propel-core";
import { executeDeferStack } from "./utilities/defer";

class DefaultPlugin implements PropelPlugin {
    async init() {
        await executeDeferStack();
    }
}

class Propel {
    private plugins: PropelPlugin[] = [];

    constructor() {
        this.plugins.push(new DefaultPlugin());
    }

    use(plugin: PropelPlugin) {
        this.plugins.push(plugin);

        return this;
    }

    async init() {
        for (const plugin of this.plugins) {
            if (plugin.init) {
                await plugin.init();
            }
        }
    }
}

/**
 * Creates a new Propel instance
 *
 * @returns {Propel} A new Propel instance
 */
export function propel(): Propel {
    return new Propel();
}
