import {
    generatorFactory,
    OptionalGeneratorArguments,
} from "../utils/generatorFactory";

/**
 * Service Class Decorator Factory
 *
 * @param {string} serviceName - the name of the service
 * @param {OptionalGeneratorArguments} optionalArguments - the optional generator arguments
 * @returns {import("../types").ClassDcorator} - the service class decorator
 */
export function Service(
    serviceName?: string,
    optionalArguments?: OptionalGeneratorArguments
) {
    return generatorFactory(serviceName, optionalArguments);
}
