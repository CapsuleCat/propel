import { graphLogger } from "../utils/debugLogger";
import { createInjectGetter, InjectOptions } from "./Inject";

/**
 * Autowired Decorator Factory
 *
 * Automaticaly wire up a dependency into a class. This is a helper
 * for Inject that will automatically determine the name of the
 * service to inject.
 *
 * @param {InjectOptions} options - optional params
 * @returns {import("../types").PropertyDecorator} - a property decorator
 * @see {@link Inject}
 */
export function Autowired(options?: InjectOptions) {
    return function InjectDecorator(target: any, propertyKey: string) {
        // Capitalize the first letter of the property
        const name = propertyKey.charAt(0).toUpperCase() + propertyKey.slice(1);

        graphLogger("Injecting %s into %s", name, target.constructor.name);
        // Defer bottle access until after initialization
        const getter = createInjectGetter(name, options);

        Object.defineProperty(target, propertyKey, {
            get: getter,
        });
    };
}
