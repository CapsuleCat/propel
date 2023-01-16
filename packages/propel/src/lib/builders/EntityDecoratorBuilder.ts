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
    constructor(private options?: EntityOptions) {}

    build(): ClassDecorator {
        const options = this.options;

        return function Decorator(target: any) {
            const targetClass = toClass(target);
            const accessorKey = createAccessorKey(
                targetClass.constructor.name,
                options
            );

            const when = options?.when ?? (() => true);

            if (when()) {
                logger.graph("Registering Entity %s", accessorKey);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                register(accessorKey, () => new targetClass());
            }
        };
    }
}
