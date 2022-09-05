import "reflect-metadata";
import { RequestHandler } from "express";
import { setRouteMetadata } from "../utils/setRouteMetadata";

/**
 * Get Route Decorator Factory
 *
 * Register the class method as a GET route. Will pass in the
 * request and response from Express.
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
 * Register the class method as a POST route. Will pass in the
 * request and response from Express.
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
 * Register the class method as a PATCH route. Will pass in the
 * request and response from Express.
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
 * Register the class method as a DELETE route. Will pass in the
 * request and response from Express.
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
