import { getAppBottle } from "../globals/bottle";

export interface BootstrapProps {
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
 *   \@Bootstrap
 *   async init() {
 *     // Do bootstrap work
 *   }
 * }
 * @returns {import("../types").MethodDecorator} - a method decorator
 */
export function Bootstrap(
    { priority = 10 }: BootstrapProps = {
        priority: 10,
    }
) {
    return function BootstrapDecorator(target: any, propertyKey: string) {
        getAppBottle().container._ServiceDefer.push(() => {
            return target[propertyKey]();
        }, priority);
    };
}
