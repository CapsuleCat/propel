import { createAccessorKey, logger, toClass } from "@capsule-cat/propel-core";
import type { AccessorOptions, WhenCallback } from "@capsule-cat/propel-core";
import { deferCall } from "../../utilities/defer";

export interface BootstrapOptions extends AccessorOptions {
    priority?: number;
    when?: WhenCallback;
}

/**
 * Bootstrap Decorator Factory
 *
 * Add the decorated class method to the bootstrap sequence that happens at the start
 * of the application. Propel will run all bootstrapped methods in sequence, awaiting
 * any that are async.
 *
 * The higher the number, the earlier the bootstrap will be called
 *
 * @param {BootstrapOptions} options - optional set of arguments for bootstrapping
 * @example
 * class MyClass {
 *   \@Bootstrap()
 *   async init() {
 *     // Do bootstrap work
 *   }
 * }
 * @returns {MethodDecorator} - a method decorator
 */
export function Bootstrap(options?: BootstrapOptions): MethodDecorator {
    return function (target: any, propertyKey: string | symbol) {
        const targetClass = toClass(target);

        const when = options?.when ?? (() => true);

        const accessorKey = createAccessorKey(
            targetClass.constructor.name,
            options
        );

        logger.debug(`Bootstrap ${accessorKey}.${String(propertyKey)}`);

        if (when()) {
            deferCall(accessorKey, propertyKey, options?.priority ?? 10);
        }
    };
}
