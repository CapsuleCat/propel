import "reflect-metadata";
import { RequestHandler } from "express";

/**
 * Add our metadata to the class method
 *
 * @param {string} routePath - the route path
 * @param {string} routeMethod - the HTTP method to use
 * @param {RequestHandler[] | undefined} middlewares - optional middlewares
 * @param {any} target - the class
 * @param {string} propertyKey - the name of the method
 */
function setRouteMetadata(
    routePath: string,
    routeMethod: string,
    middlewares: RequestHandler[] | undefined,
    target: any,
    propertyKey: string
) {
    // Annotate the property with the route path.
    Reflect.defineMetadata("routePath", routePath, target, propertyKey);
    Reflect.defineMetadata("middlewares", middlewares, target, propertyKey);
    Reflect.defineMetadata("routeMethod", routeMethod, target, propertyKey);
}

/**
 * Get Route Decorator Factory
 *
 * Register the class method as a GET route.
 *
 * @param {string} routePath - The route path to register the method as.
 * @param {RequestHandler[]} middlewares - optional middlewares to apply to the route
 * @returns {import("../types").MethodDecorator} - Method decorator
 */
export function GetRoute(routePath: string, middlewares?: RequestHandler[]) {
    return function GetRouteDecorator(target: any, propertyKey: string) {
        setRouteMetadata(routePath, "get", middlewares, target, propertyKey);
    };
}

/**
 * Post Route Decorator Factory
 *
 * Register the class method as a POST route.
 *
 * @param {string} routePath - The route path to register the method as.
 * @param {RequestHandler[]} middlewares - optional middlewares to apply to the route
 * @returns {import("../types").MethodDecorator} - Method decorator
 */
export function PostRoute(routePath: string, middlewares?: RequestHandler[]) {
    return function PostRouteDecorator(target: any, propertyKey: string) {
        setRouteMetadata(routePath, "post", middlewares, target, propertyKey);
    };
}

/**
 * Patch Route Decorator Factory
 *
 * Register the class method as a PATCH route.
 *
 * @param {string} routePath - The route path to register the method as.
 * @param {RequestHandler[]} middlewares - optional middlewares to apply to the route
 * @returns {import("../types").MethodDecorator} - Method decorator
 */
export function PatchRoute(routePath: string, middlewares?: RequestHandler[]) {
    return function PatchRouteDecorator(target: any, propertyKey: string) {
        setRouteMetadata(routePath, "patch", middlewares, target, propertyKey);
    };
}

/**
 * Delete Route Decorator Factory
 *
 * Register the class method as a DELETE route.
 *
 * @param {string} routePath - The route path to register the method as.
 * @param {RequestHandler[]} middlewares - optional middlewares to apply to the route
 * @returns {import("../types").MethodDecorator} - Method decorator
 */
export function DeleteRoute(routePath: string, middlewares?: RequestHandler[]) {
    return function DeleteRouteDecorator(target: any, propertyKey: string) {
        setRouteMetadata(routePath, "delete", middlewares, target, propertyKey);
    };
}
