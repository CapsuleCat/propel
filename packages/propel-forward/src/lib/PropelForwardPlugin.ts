import type { PropelPlugin } from "@capsule-cat/propel-core";

export class PropelForwardPlugin implements PropelPlugin {
    // eslint-disable-next-line @typescript-eslint/require-await
    public async init() {
        require("./common/SafeEnv");
        require("./common/Logger");
    }
}
