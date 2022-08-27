import {
    generatorFactory,
    OptionalGeneratorArguments,
} from "../utils/generatorFactory";

export function Repository(
    repoName?: string,
    optionalArguments?: OptionalGeneratorArguments
) {
    return generatorFactory(repoName, optionalArguments);
}
