import { getAppBottle } from "../globals/bottle";
import { logger } from "../utils/debugLogger";

export interface InjectOptions {
    args?: any[];
    unbox?: (instance: any) => any;
}

/**
 * Creates a getter function for a property that will be injected
 *
 * @param {string} name - The name of the service to inject
 * @param {InjectOptions} options - Options for the injection
 * @returns {Function} - A getter function for the property
 */
export function createInjectGetter(name: string, options?: InjectOptions) {
    return function getter() {
        logger("inject", `Injecting ${name}`);
        if (!getAppBottle()) {
            logger("inject", "Bottle not found");
            throw new Error("Cannot access bottle before initialization");
        }

        const service = getAppBottle().container[name];

        if (!service) {
            logger("inject", `Service ${name} not found`);
            throw new Error(`Service ${name} not found`);
        }

        /*
         * If the service is a factory, create an instance
         * of the wrapped constructor. Any time this service is
         * injected, a new instance will be created.
         */
        if (typeof service === "function" && service.isFactory) {
            logger("inject", `Creating new instance of ${name}`);
            return new service(...(options?.args ?? []));
        }

        if (options?.unbox) {
            logger("inject", `Unboxing ${name}`);
            return options.unbox(service);
        }

        logger("inject", `Returning ${name}`);
        return service;
    };
}

/**
 * Inject Decorator Factory
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
 *   loggger!: Logger;
 * }
 * @returns {import("../types").PropertyDecorator} - a property decorator
 */
export function Inject(name: string, options?: InjectOptions) {
    return function InjectDecorator(target: any, propertyKey: string) {
        const getter = createInjectGetter(name, options);

        Object.defineProperty(target, propertyKey, {
            get: getter,
        });
    };
}
