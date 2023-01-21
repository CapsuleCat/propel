import "./app/users";
import "./app/db";
import "./app/home";
import "./app/visits";

import { PropelExpressPlugin } from "@capsule-cat/propel-express";
import { init } from "@capsule-cat/propel-forward";

async function main() {
    await init([new PropelExpressPlugin()]);
}

main().catch((error) => {
    console.error(error);
});
