import { RequestMethodBuilder } from "../../builders/RequestMethodBuilder";
import type { RequestMappingOptions } from "./RequestMapping";

/**
 * Patch Route Decorator Factory
 *
 * Register the class method as a PATCH route. Will pass in the
 * request and response from Express.
 *
 * @param {string} routePath - The route path to register the method as.
 * @param {RequestMappingOptions} options - Options for the request mapping
 * @returns {MethodDecorator} - Method decorator
 */
export function Patch(
    routePath: string,
    options?: RequestMappingOptions
): MethodDecorator {
    const builder = new RequestMethodBuilder(routePath, "patch", options);
    return builder.build();
}
