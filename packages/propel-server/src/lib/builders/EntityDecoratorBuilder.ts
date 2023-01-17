/* eslint-disable @typescript-eslint/no-extraneous-class */
import type { TargetClass } from "@capsule-cat/propel-core";
import {
    createAccessorKey,
    logger,
    register,
    toClass,
} from "@capsule-cat/propel-core";
import type { IBuilder } from "./types";
import type { EntityOptions } from "../types";

type DecoratorBuilder = IBuilder<ClassDecorator>;

export class EntityDecoratorBuilder implements DecoratorBuilder {
    private defaultArgs: unknown[] = [];
    private type: "service" | "factory" = "service";
    constructor(private options?: EntityOptions) {}

    setDefaultArgs(args: unknown[]): this {
        this.defaultArgs = args;
        return this;
    }

    setIsFactory(): this {
        this.type = "factory";
        return this;
    }

    private createFactoryGetter(targetClass: TargetClass) {
        const defaultArgs = this.defaultArgs;
        /*
         * Factories return a wrapped constructor for the getter to unwrap
         * instead of a new instance of the constructor.
         */
        return function getGenerator() {
            const wrapperClass = class {
                public static isFactory: true;
                constructor(...args: any[]) {
                    const mergedArgs =
                        args?.length > 0 ? args : defaultArgs ?? [];
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument
                    return new targetClass(...mergedArgs);
                }
            };

            // Not sure why this is necessary, but it is.
            wrapperClass.isFactory = true;

            return wrapperClass;
        };
    }

    private createServiceGetter(targetClass: TargetClass) {
        // eslint-disable-next-line unicorn/prefer-ternary
        if (this.type === "factory") {
            return this.createFactoryGetter(targetClass);
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return () => new targetClass();
        }
    }

    build(): ClassDecorator {
        const options = this.options;

        const getter = this.createServiceGetter.bind(this);

        return function Decorator(target: any) {
            const targetClass = toClass(target);
            const accessorKey = createAccessorKey(
                targetClass.constructor.name,
                options
            );

            const service = getter(targetClass);

            const when = options?.when ?? (() => true);

            if (when()) {
                logger.graph("Registering Entity %s", accessorKey);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                register(accessorKey, service);
            }
        };
    }
}
