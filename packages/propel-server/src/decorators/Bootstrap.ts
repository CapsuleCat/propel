import { getAppBottle } from "../globals/bottle";

export interface BootstrapProps {
    serviceName?: string;
    priority: number;
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
 * @param {BootstrapProps} bootstrapOptions - optional set of arguments for bootstrapping
 * @example
 * class MyClass {
 *   \@Bootstrap()
 *   async init() {
 *     // Do bootstrap work
 *   }
 * }
 * @returns {import("../types").MethodDecorator} - a method decorator
 */
export function Bootstrap(
    { serviceName, priority = 10 }: BootstrapProps = {
        priority: 10,
    }
) {
    return function BootstrapDecorator(target: any, propertyKey: string) {
        // Try to get the service's name
        const bottleName = serviceName ?? target.constructor.name;

        getAppBottle().container._ServiceDefer.push(() => {
            // Try to get the service from the bottle
            const service = getAppBottle().container[bottleName];

            if (!service) {
                return target[propertyKey].call(target);
            }

            // If the service exists, call the method on it
            return service[propertyKey].call(service);
        }, priority);
    };
}
