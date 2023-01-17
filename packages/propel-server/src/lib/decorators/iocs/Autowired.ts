import { toClass, createAccessorKey, logger } from "@capsule-cat/propel-core";
import type { InjectOptions } from "@capsule-cat/propel-core";
import { InjectBuilder } from "../../builders/InjectBuilder";

/**
 * Autowired Decorator Factory
 *
 * Automaticaly wire up a dependency into a class. This is a helper
 * for Inject that will automatically determine the name of the
 * service to inject.
 *
 * @param {InjectOptions} options - optional params
 * @returns {PropertyDecorator} - a property decorator
 * @see {@link Inject}
 */
export function Autowired(options?: InjectOptions): PropertyDecorator {
    return function (target: any, propertyKey: string | symbol) {
        const targetClass = toClass(target);

        const accessorKey = createAccessorKey(propertyKey, options);

        logger.debug(
            `Autowired ${targetClass.constructor.name}.${String(
                propertyKey
            )} with ${accessorKey}`
        );
        logger.graph(
            "Injecting %s into %s",
            accessorKey,
            targetClass.constructor.name
        );

        const builder = new InjectBuilder(accessorKey, options);

        Object.defineProperty(target, propertyKey, {
            get: builder.build(),
        });
    };
}
