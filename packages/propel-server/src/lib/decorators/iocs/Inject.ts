import type { InjectOptions } from "@capsule-cat/propel-core";
import { createAccessorKey, logger, toClass } from "@capsule-cat/propel-core";
import { InjectBuilder } from "../../builders/InjectBuilder";

/**
 * Inject Decorator Factory
 *
 * Prefer using Autowired instead of this.
 *
 * Automaticaly wire up a dependency into a class
 * property. Any Service, Entity, or Factory can be injected.
 *
 * When injecting a Factory, `args` can be provided to
 * pass into the Factory.
 *
 * @param {string} name - provide the name
 * @param {InjectOptions} options - optional params
 * @example
 * class MyClass {
 *   \@Entity("Logger")
 *   loggger!: Logger;
 * }
 * @example <caption>Example using Factory</caption>
 * class MyClass {
 *   \@Entity("Logger", { args: ["MyClass"] })
 *   logger!: Logger;
 * }
 * @returns {PropertyDecorator} - a property decorator
 */
export function Inject(
    name: string,
    options?: Omit<InjectOptions, "name">
): PropertyDecorator {
    return function (target: any, propertyKey: string | symbol) {
        const targetClass = toClass(target);

        const accessorKey = createAccessorKey(name);

        logger.debug(
            `Injecting ${targetClass.constructor.name}.${String(
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
