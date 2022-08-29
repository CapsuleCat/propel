import {
    generatorFactory,
    OptionalGeneratorArguments,
} from "../utils/generatorFactory";

/**
 * Service Class Decorator Factory
 *
 * @param {string} repoName - the name of the repository. Defaults to the class name.
 * @param {OptionalGeneratorArguments} optionalArguments - optional params
 * @returns {import("../types").ClassDecorator} - the service class decorator
 */
export function Repository(
    repoName?: string,
    optionalArguments?: OptionalGeneratorArguments
) {
    return generatorFactory(repoName, optionalArguments);
}
