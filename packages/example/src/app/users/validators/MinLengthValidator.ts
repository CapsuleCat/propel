import createHttpError from "http-errors";
import type { Validator } from "@capsule-cat/propel-express";

export class MinLengthValidator implements Validator<string> {
    validate(v: string): string {
        if (v.length < 3) {
            throw createHttpError(400, "Too short");
        }

        return v;
    }
}
