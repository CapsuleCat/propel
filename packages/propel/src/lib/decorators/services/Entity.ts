import { EntityDecoratorBuilder } from "../../builders/EntityDecoratorBuilder";
import type { EntityOptions } from "../../types";

/**
 * Entity Decorator Factory
 *
 * Add the decorated class to the app Bottle.
 *
 * @param {EntityOptions} options - Optional arguments
 * @returns {ClassDecorator} - a class decorator
 */
export function Entity(options?: EntityOptions): ClassDecorator {
    const builder = new EntityDecoratorBuilder(options);

    return builder.build();
}
