import {
    generatorFactory,
    OptionalGeneratorArguments,
} from "../utils/generatorFactory";

export function Entity(
    serviceName?: string,
    optionalArguments?: OptionalGeneratorArguments
) {
    return generatorFactory(serviceName, optionalArguments);
}
