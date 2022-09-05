import {
    Controller,
    Inject,
    RequestMapping,
    RequestParam,
    RequestBody,
    Validator,
    Validate,
} from "@capsule-cat/propel-server";
import { UserRepository } from "./UserRepository";
import createHttpError from "http-errors";

class UserIdValidator implements Validator<string> {
    validate(v: string): number {
        const maybeNumber = Number(v);

        if (Number.isNaN(maybeNumber)) {
            throw createHttpError(400, "Invalid user id");
        }

        return maybeNumber;
    }
}

class MaxLengthValidator implements Validator<string> {
    validate(v: string): string {
        if (v.length > 10) {
            throw createHttpError(400, "Too long");
        }

        return v;
    }
}

class MinLengthValidator implements Validator<string> {
    validate(v: string): string {
        if (v.length < 3) {
            throw createHttpError(400, "Too short");
        }

        return v;
    }
}

@Controller("/users")
export class UserController {
    @Inject("UserRepository")
    private userRepository!: UserRepository;

    @RequestMapping("/:id", RequestMapping.GET)
    async getUser(@Validate(UserIdValidator) @RequestParam("id") id: number) {
        const user = await this.userRepository.get(id);

        if (user) {
            return user;
        } else {
            throw new createHttpError.NotFound("User not found");
        }
    }

    @RequestMapping("/", RequestMapping.POST)
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
}
