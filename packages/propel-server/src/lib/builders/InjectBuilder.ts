import type { AccessorKey, InjectOptions } from "@capsule-cat/propel-core";
import { logger, getDependency } from "@capsule-cat/propel-core";
import type { ServiceFactory } from "../types";
import type { IBuilder } from "./types";

type PropertyGetter<T = unknown> = () => T;

export class InjectBuilder implements IBuilder<PropertyGetter> {
    constructor(private accessorKey: string, private options?: InjectOptions) {}

    public build(): PropertyGetter {
        const accessorKey = this.accessorKey;
        const options = this.options;

        return function propertyGetter() {
            logger("inject", "Injecting %s", accessorKey);

            const injectable = getDependency<unknown>(accessorKey);

            if (injectable === undefined && options?.failIfMissing !== false) {
                throw new Error(`Missing dependency ${accessorKey}`);
            }

            return unbox(accessorKey, injectable, options);
        };
    }
}

function unbox<Input = unknown, Output = unknown>(
    accessorKey: AccessorKey,
    injectable: Input,
    options?: InjectOptions
): Output | undefined {
    if (injectable === undefined) {
        return undefined;
    }

    if (options?.unbox) {
        logger("inject", "Unboxing %s", accessorKey);
        return options.unbox(injectable) as Output;
    }

    const unsafeFactory = injectable as unknown as ServiceFactory;

    if (typeof unsafeFactory === "function" && unsafeFactory.isFactory) {
        logger("inject", "Creating a new instance of %s", accessorKey);
        return new unsafeFactory(...(options?.args ?? [])) as Output;
    }

    if (typeof injectable === "function") {
        return injectable() as Output;
    }

    return injectable as Output;
}
