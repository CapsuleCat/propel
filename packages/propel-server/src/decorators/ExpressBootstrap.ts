import { getAppBottle } from "../globals/bottle";

export interface ExpressBootstrapProps {
    serviceName?: string;
}

/**
 * ExpressBootstrap Decorator Factory
 *
 * Add the decorated class method to the express bootstrap sequence that happens at the start
 * of the application. Propel will run all express bootstrapped methods in sequence, awaiting
 * any that are async.
 *
 * @param {ExpressBootstrapProps} bootstrapOptions - optional set of arguments for bootstrapping
 * @example
 * class MyClass {
 *   \@ExpressBootstrap()
 *   async init(app: IRouter) {
 *     // Do express bootstrap work
 *   }
 * }
 * @returns {import("../types").MethodDecorator} - a method decorator
 */
export function ExpressBootstrap({ serviceName }: ExpressBootstrapProps = {}) {
    return function ExpressBootstrapDecorator(
        target: any,
        propertyKey: string
    ) {
        // Try to get the service's name
        const bottleName = serviceName ?? target.constructor.name;
        // Try to get the service from the bottle
        const service = getAppBottle().container[bottleName];

        let cb;

        if (!service) {
            cb = target[propertyKey].bind(target);
        } else {
            // If the service exists, call the method on it
            cb = service[propertyKey].bind(service);
        }

        getAppBottle().container._ExpressDefer.expressSetup(cb);
    };
}
