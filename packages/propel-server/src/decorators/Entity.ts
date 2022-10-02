import { getAppBottle } from "../globals/bottle";
import { graphLogger } from "../utils/debugLogger";
import { OptionalGeneratorArguments } from "../utils/generatorFactory";

/**
 * Entity Decorator Factory
 *
 * Add the decorated class to the app Bottle.
 *
 * @param {string} entityName - Optionally name the service. Defaults to the class name
 * @param {OptionalGeneratorArguments} optionalArguments - Optional arguments
 * @returns {import('../types').ClassDecorator} - a class decorator
 */
export function Entity(
    entityName?: string,
    optionalArguments?: OptionalGeneratorArguments
) {
    return function Decorator<T extends { new (...arg: any[]): any }>(
        constructor: T
    ) {
        const { when } = optionalArguments ?? {};
        const getGenerator = function getGenerator() {
            return new constructor();
        };

        const conditionalCheck = when ? when() : true;

        if (conditionalCheck) {
            graphLogger(
                "Registering Entity %s",
                entityName ?? constructor.name
            );
            getAppBottle().service(
                entityName ?? constructor.name,
                getGenerator
            );
        }
    };
}
