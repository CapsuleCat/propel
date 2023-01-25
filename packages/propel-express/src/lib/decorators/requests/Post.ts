import { RequestMethodBuilder } from "../../builders/RequestMethodBuilder";
import type { RequestMappingOptions } from "./RequestMapping";

/**
 * Post Route Decorator Factory
 *
 * Register the class method as a POST route. Will pass in the
 * request and response from Express.
 *
 * @param {string} routePath - The route path to register the method as.
 * @param {RequestMappingOptions} options - Options for the request mapping
 * @returns {MethodDecorator} - Method decorator
 */
export function Post(
    routePath: string,
    options?: RequestMappingOptions
): MethodDecorator {
    const builder = new RequestMethodBuilder(routePath, "post", options);
    return builder.build();
}
