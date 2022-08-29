import "reflect-metadata";
import { RequestHandler } from "express";

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
        // Annotate the property with the route path.
        Reflect.defineMetadata("routePath", routePath, target, propertyKey);
        Reflect.defineMetadata("middlewares", middlewares, target, propertyKey);
        Reflect.defineMetadata("routeMethod", "get", target, propertyKey);
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
        // Annotate the property with the route path.
        Reflect.defineMetadata("routePath", routePath, target, propertyKey);
        Reflect.defineMetadata("middlewares", middlewares, target, propertyKey);
        Reflect.defineMetadata("routeMethod", "post", target, propertyKey);
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
        // Annotate the property with the route path.
        Reflect.defineMetadata("routePath", routePath, target, propertyKey);
        Reflect.defineMetadata("middlewares", middlewares, target, propertyKey);
        Reflect.defineMetadata("routeMethod", "patch", target, propertyKey);
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
        // Annotate the property with the route path.
        Reflect.defineMetadata("routePath", routePath, target, propertyKey);
        Reflect.defineMetadata("middlewares", middlewares, target, propertyKey);
        Reflect.defineMetadata("routeMethod", "delete", target, propertyKey);
    };
}
