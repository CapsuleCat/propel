import {
    Controller,
    Delete,
    Get,
    Post,
    RequestBody,
    RequestParam,
    Validate,
} from "@capsule-cat/propel-express";
import { Autowired } from "@capsule-cat/propel-server";
import type { UserRepository } from "./UserRepository";
import { UserIdValidator } from "./validators/UserIdValidator";
import createHttpError from "http-errors";
import { MinLengthValidator } from "./validators/MinLengthValidator";
import { MaxLengthValidator } from "./validators/MaxLengthValidator";

@Controller("/users")
export class UserController {
    @Autowired()
    private userRepository!: UserRepository;

    @Get("/")
    async getUsers() {
        return this.userRepository.getAll();
    }

    @Get("/:id")
    async getUser(@Validate(UserIdValidator) @RequestParam("id") id: number) {
        const user = await this.userRepository.get(id);

        if (user) {
            return user;
        } else {
            throw new createHttpError.NotFound("User not found");
        }
    }

    @Post("/")
    async createUser(
        @Validate(MinLengthValidator)
        @Validate(MaxLengthValidator)
        @RequestBody("name")
        name: string
    ) {
        return this.userRepository.create({
            name,
        });
    }

    @Delete("/:id")
    async deleteUser(
        @Validate(UserIdValidator) @RequestParam("id") id: number
    ) {
        return this.userRepository.delete(id);
    }
}
