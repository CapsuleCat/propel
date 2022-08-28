import { getAppBottle } from "../globals/bottle";

/**
 * Decorator that injects a given service into the function parameters
 */
export function InjectParam(serviceName: string) {
    return (target: any, propertyKey: string, parameterIndex: number) => {
        const service = getAppBottle().container[serviceName];

        if (!service) {
            throw new Error(`Service ${serviceName} not found`);
        }

        target[propertyKey] = (...args: any[]) => {
            args[parameterIndex] = service;
            // eslint-disable-next-line prefer-spread
            return target[propertyKey].apply(target, args);
        };
    };
}
