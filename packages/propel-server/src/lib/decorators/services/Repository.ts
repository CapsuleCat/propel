import { EntityDecoratorBuilder } from "../../builders/EntityDecoratorBuilder";
import type { EntityOptions } from "../../types";

/**
 * Repository Decorator Factory
 *
 * Add the decorated class to the app Bottle.
 *
 * @param {EntityOptions} options - Optional arguments
 * @returns {ClassDecorator} - a class decorator
 */
export function Repository(options?: EntityOptions): ClassDecorator {
    const builder = new EntityDecoratorBuilder(options);

    return builder.build();
}
