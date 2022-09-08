import { Log } from "@capsule-cat/propel-forward";
import { Bootstrap, Inject, Service } from "@capsule-cat/propel-server";

@Service()
export class HomeService {
    @Inject("Logger", {
        args: ["HomeService"],
    })
    private logger!: Log;

    @Bootstrap()
    async init() {
        await new Promise((resolve) => setTimeout(resolve, 500));

        this.logger.log("HomeService.init() was called");
    }

    test() {
        this.logger.log("HomeService.test() was called");
    }
}
