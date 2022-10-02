import { getAppBottle } from "../globals/bottle";
import { graphLogger } from "../utils/debugLogger";
import { OptionalGeneratorArguments } from "../utils/generatorFactory";

export interface OptionalFactoryArguments extends OptionalGeneratorArguments {
    defaultArgs?: any[];
}

/**
 * Factory Decorator Factory
 *
 * Annotate a class with the Factory decorator so that each time
 * it is Injected, a new instance will be created with provided
 * args, or the default args if none are provided.
 *
 * @param {string} name - name of the Factory. Defaults to the class name
 * @param {OptionalFactoryArguments} options - optional params
 * @example
 * \@Factory('Logger', {
 *   defaultArgs: ["no namespace provided"]
 * })
 * class Logger {
 *   private namespace: string;
 *   constructor(namespace: string) {
 *     this.namespace = namespace;
 *   }
 * }
 * @returns {import("../types").ClassDecorator} - a class decorator
 */
export function Factory(name?: string, options?: OptionalFactoryArguments) {
    return function Decorator<T extends { new (...arg: any[]): any }>(
        constructor: T
    ) {
        /*
         * Factories return a wrapped constructor for the getter to unwrap
         * instead of a new instance of the constructor.
         */
        const getGenerator = function getGenerator() {
            const wrapperClass = class {
                public static isFactory: true;
                constructor(...args: any[]) {
                    const defaultArgs = options?.defaultArgs;
                    const mergedArgs =
                        args?.length > 0 ? args : defaultArgs ?? [];
                    return new constructor(...mergedArgs);
                }
            };

            // Not sure why this is necessary, but it is.
            wrapperClass.isFactory = true;

            return wrapperClass;
        };

        const when = options?.when;
        const conditionalCheck = when ? when() : true;

        if (conditionalCheck) {
            graphLogger("Registering Factory %s", name ?? constructor.name);
            getAppBottle().service(name ?? constructor.name, getGenerator);
        }
    };
}
