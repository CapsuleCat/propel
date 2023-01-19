import { toClass } from "@capsule-cat/propel-core";

/**
 * Request Query Decorator Factory
 *
 * Returns a parameter decorator that maps the query string to the parameter.
 *
 * @example
 * ```
 * class MyController {
 *  \@Get("/hello")
 *   hello(@RequestQuery("name") name: string) {
 *    return \`Hello \${name}\`;
 *  }
 * ```
 * @param {string} queryName - The name of the query to map
 * @returns {ParameterDecorator} - Parameter decorator
 */
export function RequestQuery(queryName?: string): ParameterDecorator {
    return function RequestQueryDecorator(
        target: any,
        propertyKey: string | symbol,
        parameterIndex: number
    ) {
        const targetClass = toClass(target);

        // Annotate the property with what we want to map from
        // the express request
        Reflect.defineMetadata(
            `requestQuery_${parameterIndex}`,
            queryName ?? true,
            targetClass,
            propertyKey
        );
    };
}
