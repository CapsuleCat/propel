import "./common/SafeEnv";
import "./common/Logger";

import type { PropelPlugin } from "@capsule-cat/propel-core";
import { propel } from "@capsule-cat/propel-server";
import { PropelForwardPlugin } from "./PropelForwardPlugin";

/**
 * @param {PropelPlugin[]} additionalPlugins Additional plugins to use
 */
export async function init(additionalPlugins: PropelPlugin[] = []) {
    const instance = propel();

    instance.use(new PropelForwardPlugin());

    for (const plugin of additionalPlugins) {
        instance.use(plugin);
    }

    return instance.init();
}
