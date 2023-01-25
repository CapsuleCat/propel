import createHttpError from "http-errors";
import type { Validator } from "@capsule-cat/propel-express";

export class UserIdValidator implements Validator<string> {
    validate(v: string): number {
        const maybeNumber = Number(v);

        if (Number.isNaN(maybeNumber)) {
            throw createHttpError(400, "Invalid user id");
        }

        return maybeNumber;
    }
}
