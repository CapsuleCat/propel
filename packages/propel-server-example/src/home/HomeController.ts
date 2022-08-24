import { Request, Response } from "express";
import {
    Bootstrap,
    Controller,
    Inject,
    GetRoute,
    PostRoute,
} from "@capsule-cat/propel-server";
import { Logger } from "../types";
import { HomeService } from "./HomeSerivce";
import { VisitsRepository } from "./VisitsRepository";

@Controller("/home")
class HomeController {
    private asdf = "asdf";

    @Inject("Logger")
    private logger!: Logger;

    @Inject("HomeService")
    private myService!: HomeService;

    @Inject("VisitsRepository")
    private visitsRepository!: VisitsRepository;

    @Bootstrap()
    async init() {
        await new Promise((resolve) => setTimeout(resolve, 500));

        this.logger.log("HomeController.init() was called");
    }

    @GetRoute("/")
    async test(req: Request, res: Response) {
        this.logger.log("HomeController.test() was called");

        const entry = await this.visitsRepository.get();
        const visits = entry?.get() ?? { visits: 0, id: 0 };
        visits.visits++;
        await this.visitsRepository.set(visits);

        this.myService.test();

        res.json({
            message: "GET Hello World!",
            visits: visits.visits,
        });
    }

    @PostRoute("/")
    async testPost(req: Request, res: Response) {
        this.logger.log("MyController.testPost() was called");

        res.json({
            message: "POST Hello World!",
        });
    }
}
