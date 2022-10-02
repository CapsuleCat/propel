import { getAppBottle } from "../globals/bottle";
import { graphLogger } from "./debugLogger";

export interface OptionalGeneratorArguments {
    when?: () => boolean;
}

/**
 * Create a class decorator
 *
 * @internal
 * @param {string} name - optional name for the service. If not provided, the constructor name will be used
 * @param {OptionalGeneratorArguments} options - optional params
 * @returns {import('../types').ClassDecorator} - a class decorator
 */
export function generatorFactory(
    name?: string,
    { when }: OptionalGeneratorArguments = {}
) {
    return function Decorator<T extends { new (...arg: any[]): any }>(
        constructor: T
    ) {
        const getGenerator = function getGenerator() {
            return new constructor();
        };

        const conditionalCheck = when ? when() : true;

        if (conditionalCheck) {
            graphLogger("Registering Service %s", name ?? constructor.name);
            getAppBottle().service(name ?? constructor.name, getGenerator);
        }
    };
}
