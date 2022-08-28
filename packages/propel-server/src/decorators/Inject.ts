import { getAppBottle } from "../globals/bottle";

export interface InjectOptions {
    args?: any[];
}

/**
 * Property decorator to inject a service into a class property.
 */
export function Inject(serviceName: string, options?: InjectOptions) {
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

            /**
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
