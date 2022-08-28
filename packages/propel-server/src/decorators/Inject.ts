import { getAppBottle } from "../globals/bottle";

export interface InjectOptions {
    args?: any[];
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
 * @param {InjectOptions} options
 * @returns Decorator
 * @example
 * class MyClass {
 *   @Entity("Logger")
 *   loggger!: Logger;
 * }
 * @example <caption>Example using Factory</caption>
 * class MyClass {
 *   @Entity("Logger", { args: ["MyClass"] })
 *   loggger!: Logger;
 * }
 */
export function Inject(name: string, options?: InjectOptions) {
    return function InjectDecorator(target: any, propertyKey: string) {
        // Defer bottle access until after initialization
        const getter = function getter() {
            if (!getAppBottle()) {
                throw new Error("Cannot access bottle before initialization");
            }

            const service = getAppBottle().container[name];

            if (!service) {
                throw new Error(`Service ${name} not found`);
            }

            /*
             * If the service is a factory, create an instance
             * of the wrapped constructor. Any time this service is
             * injected, a new instance will be created.
             */
            if (typeof service === "function" && service.isFactory) {
                return new service(...(options?.args ?? []));
            }

            return service;
        };

        Object.defineProperty(target, propertyKey, {
            get: getter,
        });
    };
}
