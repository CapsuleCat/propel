import { getAppBottle } from "../globals/bottle";

/**
 * Property decorator to inject a service into a class property.
 */
export function Inject(serviceName: string) {
    return function InjectDecorator(target: any, propertyKey: string) {
        // Defer bottle access until after initialization
        const getter = function getter() {
            if (!getAppBottle()) {
                throw new Error("Cannot access bottle before initialization");
            }

            const service = getAppBottle().container[serviceName];

            if (!service) {
                throw new Error(`Service ${serviceName} not found`);
            }

            return service;
        };

        Object.defineProperty(target, propertyKey, {
            get: getter,
        });
    };
}
