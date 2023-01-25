import {
    Controller,
    RequestMapping,
    RouteMappings,
} from "@capsule-cat/propel-express";
import type { Log } from "@capsule-cat/propel-forward";
import { Autowired, Bootstrap } from "@capsule-cat/propel-server";
import type { VisitsRepository } from "../visits/VisitsRepository";

@Controller("/")
export class HomeController {
    @Autowired({
        args: ["HomeController"],
    })
    private logger!: Log;

    @Autowired()
    private visitsRepository!: VisitsRepository;

    @Bootstrap()
    init() {
        this.logger.log("HomeController.init() was called");
    }

    @RequestMapping("/", RouteMappings.get, {
        contentType: "text/html",
    })
    async getHome() {
        const entry = await this.visitsRepository.get();
        const visits = entry?.get() ?? { visits: 0, id: 0 };
        visits.visits++;
        await this.visitsRepository.set(visits);

        return `
            <h1>Home</h1>
            <p>You have visited this page ${visits.visits} times.</p>
        `;
    }
}
