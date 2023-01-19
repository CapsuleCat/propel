import { toClass } from "@capsule-cat/propel-core";

/**
 * Request Mapping Decorator Factory
 *
 * Returns a parameter decorator that maps the parameter to the request.
 *
 * @param {string} name - The name of the parameter to map
 * @returns {ParameterDecorator} - Parameter decorator
 */
export function RequestParam(name: string): ParameterDecorator {
    return function RequestParamDecorator(
        target: any,
        propertyKey: string | symbol,
        parameterIndex: number
    ) {
        const targetClass = toClass(target);

        // Annotate the property with what we want to map from
        // the express request
        Reflect.defineMetadata(
            `requestParam_${parameterIndex}`,
            name,
            targetClass,
            propertyKey
        );
    };
}
