import { getAppBottle } from "../globals/bottle";

export interface OptionalGeneratorArguments {
    when?: () => boolean;
}

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
            getAppBottle().service(name ?? constructor.name, getGenerator);
        }
    };
}
