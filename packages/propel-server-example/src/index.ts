import fetch from "cross-fetch";
import bodyParser from "body-parser";
import {
    bootstrap,
    Inject,
    Service,
    Bootstrap,
    PropelApplication,
} from "@capsule-cat/propel-server";
import { Logger } from "./types";

// NOTE these have side-effects! You can't tree-shake.
import "./Logger";
import "./SequelizeDB";
import "./html/HtmlController";
import "./users/User";
import "./users/UserRepository";
import "./users/UserController";
import "./home/HomeSerivce";
import "./home/HomeController";
import "./home/Visits";
import "./home/VisitsRepository";

@Service("Tester")
class Tester {
    @Inject("Logger")
    private logger!: Logger;

    async testMethods() {
        // Test ourselves
        try {
            const r = await fetch("http://localhost:3000/home");
            const json = await r.json();

            this.logger.log("Got a response!", json);

            const r2 = await fetch("http://localhost:3000/home", {
                method: "POST",
            });
            const json2 = await r2.json();

            this.logger.log("Got a response!", json2);
        } catch (e) {
            this.logger.log("Error!", e);
        }
    }
}

@PropelApplication()
export class Bootstrapper {
    @Inject("Express")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private express!: any;

    @Inject("Logger")
    private logger!: Logger;

    @Inject("Tester")
    private tester!: Tester;

    /**
     * Contrived example that could be inlined into the init function
     */
    @Bootstrap({ priority: 1 })
    async init() {
        // Set up express
        this.express.use(bodyParser.json());

        this.express.listen(3000, async () => {
            this.logger.log("Server started on port 3000");

            await this.tester.testMethods();
        });
    }
}

async function init() {
    await bootstrap();
}

init();
