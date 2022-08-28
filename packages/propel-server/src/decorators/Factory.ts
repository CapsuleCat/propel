import { getAppBottle } from "../globals/bottle";
import { OptionalGeneratorArguments } from "../utils/generatorFactory";

export interface OptionalFactoryArguments extends OptionalGeneratorArguments {
    defaultArgs?: any[];
}

/**
 * Annotate a class with the Factory decorator so that each time
 * it is Injected, a new instance will be created with provided
 * args, or the default args if none are provided.
 */
export function Factory(
    name: string,
    { when, defaultArgs }: OptionalFactoryArguments
) {
    return function Decorator<T extends { new (...arg: any[]): any }>(
        constructor: T
    ) {
        /**
         * Factories return a wrapped constructor for the getter to unwrap
         * instead of a new instance of the constructor.
         */
        const getGenerator = function getGenerator() {
            const wrapperClass = class {
                public static isFactory: true;
                constructor(...args: any[]) {
                    const mergedArgs =
                        args?.length > 0 ? args : defaultArgs ?? [];
                    return new constructor(...mergedArgs);
                }
            };

            // Not sure why this is necessary, but it is.
            wrapperClass.isFactory = true;

            return wrapperClass;
        };

        const conditionalCheck = when ? when() : true;

        if (conditionalCheck) {
            getAppBottle().service(name ?? constructor.name, getGenerator);
        }
    };
}
