import type { RequestHandler } from "express";
import { RequestMethodBuilder } from "../../builders/RequestMethodBuilder";

export type RouteMapping = "get" | "post" | "patch" | "delete";

export const RouteMappings = {
    get: "get",
    post: "post",
    patch: "patch",
    delete: "delete",
} as const;

export interface RequestMappingOptions {
    middleware?: RequestHandler[];
    contentType?: string;
}

/**
 * Request Mapping Decorator Factory
 *
 * Wire the method to the route and method. Use `@RequestParam` and
 * `@RequestBody` to map the parameters and body to the request.
 *
 * Any return value from the method will be set as the response.
 *
 * @param {string} routePath - The route to map the method to
 * @param {RouteMapping} method - The method to map the route to
 * @param {RequestMappingOptions} options - Options for the route
 * @returns {MethodDecorator} - Method decorator
 */
export function RequestMapping(
    routePath: string,
    method: RouteMapping,
    options?: RequestMappingOptions
): MethodDecorator {
    const builder = new RequestMethodBuilder(routePath, method, options);
    return builder.build();
}
