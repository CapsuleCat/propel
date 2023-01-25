import { toClass } from "@capsule-cat/propel-core";

/**
 * Request Mapping Decorator Factory
 *
 * Returns a parameter decorator that maps the request body to the request.
 *
 * If no propertyName is passed, the entire body will be mapped to the request.
 * If a propertyName is passed, the property will be mapped to the request.
 *
 * @param {string} propertyName - The name of the property to map
 * @returns {ParameterDecorator} - Parameter decorator
 */
export function RequestBody(propertyName?: string): ParameterDecorator {
    return function RequestBodyDecorator(
        target: any,
        propertyKey: string | symbol,
        parameterIndex: number
    ) {
        const targetClass = toClass(target);

        // Annotate the property with what we want to map from
        // the express request
        Reflect.defineMetadata(
            `requestBody_${parameterIndex}`,
            propertyName ?? true,
            targetClass,
            propertyKey
        );
    };
}
