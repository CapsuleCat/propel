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
export function setRouteMetadata(
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
