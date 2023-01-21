import type { AccessorOptions } from "@capsule-cat/propel-core";
import {
    createAccessorKey,
    getDependency,
    toClass,
} from "@capsule-cat/propel-core";
import { registerBootstrap } from "../../utilities/ioc";

export type ExpressBootstrapOptions = AccessorOptions;

/**
/**
 * ExpressBootstrap Decorator Factory
 *
 * Add the decorated class method to the express bootstrap sequence that happens at the start
 * of the application. Propel will run all express bootstrapped methods in sequence, awaiting
 * any that are async.
 *
 * @param {ExpressBootstrapOptions} options - optional set of arguments for bootstrapping
 * @example
 * class MyClass {
 *   \@ExpressBootstrap()
 *   async init(app: IRouter) {
 *     // Do express bootstrap work
 *   }
 * }
 * @returns {MethodDecorator} - a method decorator
 */
export function ExpressBootstrap(
    options?: ExpressBootstrapOptions
): MethodDecorator {
    return function ExpressBootstrapDecorator(
        target: any,
        propertyKey: string | symbol
    ) {
        const targetClass = toClass(target);
        const accessorKey = createAccessorKey(targetClass.name, options);

        const service = getDependency(accessorKey);

        const callback = service
            ? service[propertyKey].bind(service)
            : // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              (target[propertyKey] as CallableFunction).bind(target);

        registerBootstrap(callback);
    };
}
