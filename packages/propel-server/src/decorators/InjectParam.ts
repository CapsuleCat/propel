import { getAppBottle } from "../globals/bottle";

/**
 * TODO this doesn't seem to work in constructors
 * Decorator that injects a given service into the function parameters
 *
 * @param {string} serviceName - the name of the service/entity/etc to inject
 * @returns {import('../types').ParamDecorator} - a parameter decorator
 */
export function InjectParam(serviceName: string) {
    return (
        target: any,
        propertyKey: string | undefined,
        parameterIndex: number
    ) => {
        if (!propertyKey) {
            target = target.prototype;
            propertyKey = "constructor";
        }
        const original = target[propertyKey];
        target[propertyKey] = (...args: any[]) => {
            const service = getAppBottle().container[serviceName];

            if (!service) {
                throw new Error(`Service ${serviceName} not found`);
            }
            args[parameterIndex] = service;
            // eslint-disable-next-line prefer-spread
            return original.apply(target, args);
        };
    };
}
