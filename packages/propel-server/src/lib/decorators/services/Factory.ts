import { EntityDecoratorBuilder } from "../../builders/EntityDecoratorBuilder";
import type { EntityOptions } from "../../types";

export interface FactoryOptions extends EntityOptions {
    args?: unknown[];
}

/**
 * Factory Decorator Factory
 *
 * Annotate a class with the Factory decorator so that each time
 * it is Injected, a new instance will be created with provided
 * args, or the default args if none are provided.
 *
 * @param {FactoryOptions} options - optional params
 * @example
 * \@Factory('Logger', {
 *   args: ["no namespace provided"]
 * })
 * class Logger {
 *   private namespace: string;
 *   constructor(namespace: string) {
 *     this.namespace = namespace;
 *   }
 * }
 * @returns {ClassDecorator} - a class decorator
 */
export function Factory(options?: FactoryOptions): ClassDecorator {
    const builder = new EntityDecoratorBuilder(options);

    return builder
        .setDefaultArgs(options?.args ?? [])
        .setIsFactory()
        .build();
}
