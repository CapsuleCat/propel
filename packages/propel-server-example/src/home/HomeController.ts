import { Log } from "@capsule-cat/propel-forward";
import {
    Bootstrap,
    Controller,
    Autowired,
    Inject,
    RequestMapping,
} from "@capsule-cat/propel-server";
import { HomeService } from "./HomeSerivce";
import { VisitsRepository } from "./VisitsRepository";

@Controller("/home")
export class HomeController {
    @Inject("Logger", {
        args: ["HomeController"],
    })
    private logger!: Log;

    @Autowired()
    private homeService!: HomeService;

    @Autowired()
    private visitsRepository!: VisitsRepository;

    @Bootstrap()
    async init() {
        await new Promise((resolve) => setTimeout(resolve, 500));

        this.logger.log("HomeController.init() was called");
    }

    @RequestMapping("/", RequestMapping.GET)
    async test() {
        this.logger.log("HomeController.test() was called");

        const entry = await this.visitsRepository.get();
        const visits = entry?.get() ?? { visits: 0, id: 0 };
        visits.visits++;
        await this.visitsRepository.set(visits);

        this.homeService.test();

        return {
            message: "GET Hello World!",
            visits: visits.visits,
        };
    }

    @RequestMapping("/", RequestMapping.POST)
    async testPost() {
        this.logger.log("MyController.testPost() was called");

        return {
            message: "POST Hello World!",
        };
    }
}
