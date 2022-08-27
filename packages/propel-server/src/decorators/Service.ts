import {
    generatorFactory,
    OptionalGeneratorArguments,
} from "../utils/generatorFactory";

export function Service(
    serviceName?: string,
    optionalArguments?: OptionalGeneratorArguments
) {
    return generatorFactory(serviceName, optionalArguments);
}
