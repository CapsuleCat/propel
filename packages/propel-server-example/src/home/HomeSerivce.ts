import { Bootstrap, Inject, Service } from "@capsule-cat/propel-server";
import { Logger } from "../types";

@Service()
export class HomeService {
    @Inject("Logger")
    private logger!: Logger;

    @Bootstrap()
    async init() {
        await new Promise((resolve) => setTimeout(resolve, 500));

        this.logger.log("HomeService.init() was called");
    }

    test() {
        this.logger.log("HomeService.test() was called");
    }
}
