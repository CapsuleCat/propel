import { Request, Response } from "express";
import {
    Controller,
    Inject,
    GetRoute,
    PostRoute,
} from "@capsule-cat/propel-server";
import { UserRepository } from "./UserRepository";

@Controller("/users")
export class UserController {
    @Inject("UserRepository")
    private userRepository!: UserRepository;

    @GetRoute("/:id")
    async getUser(req: Request, res: Response) {
        const id = Number(req.params.id);
        const user = await this.userRepository.get(id);

        if (user) {
            res.send(user);
        } else {
            res.status(404).send({
                error: "User not found",
            });
        }
    }

    @PostRoute("/")
    async createUser(req: Request, res: Response) {
        const { name } = req.body;
        const user = await this.userRepository.create({
            name,
        });

        res.send(user);
    }
}
