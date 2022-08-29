import {
    generatorFactory,
    OptionalGeneratorArguments,
} from "../utils/generatorFactory";

/**
 * Entity Decorator Factory
 *
 * Add the decorated class to the app Bottle.
 *
 * @param {string} serviceName - Optionally name the service. Defaults to the class name
 * @param {OptionalGeneratorArguments} optionalArguments - Optional arguments
 * @returns {import('../types').ClassDecorator} - a class decorator
 */
export function Entity(
    serviceName?: string,
    optionalArguments?: OptionalGeneratorArguments
) {
    return generatorFactory(serviceName, optionalArguments);
}
