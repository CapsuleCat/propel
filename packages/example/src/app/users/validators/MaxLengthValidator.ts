import createHttpError from "http-errors";
import type { Validator } from "@capsule-cat/propel-express";

export class MaxLengthValidator implements Validator<string> {
    validate(v: string): string {
        if (v.length > 10) {
            throw createHttpError(400, "Too long");
        }

        return v;
    }
}
