import "reflect-metadata";
import { RequestHandler } from "express";
import path from "path";

export function createPath(...pathParts: string[]) {
    return path.join(...pathParts);
}

export function GetRoute(routePath: string, middlewares?: RequestHandler[]) {
    return function GetRouteDecorator(target: any, propertyKey: string) {
        // Annotate the property with the route path.
        Reflect.defineMetadata("routePath", routePath, target, propertyKey);
        Reflect.defineMetadata("middlewares", middlewares, target, propertyKey);
        Reflect.defineMetadata("routeMethod", "get", target, propertyKey);
    };
}

export function PostRoute(routePath: string, middlewares?: RequestHandler[]) {
    return function PostRouteDecorator(target: any, propertyKey: string) {
        // Annotate the property with the route path.
        Reflect.defineMetadata("routePath", routePath, target, propertyKey);
        Reflect.defineMetadata("middlewares", middlewares, target, propertyKey);
        Reflect.defineMetadata("routeMethod", "post", target, propertyKey);
    };
}

export function PatchRoute(routePath: string, middlewares?: RequestHandler[]) {
    return function PatchRouteDecorator(target: any, propertyKey: string) {
        // Annotate the property with the route path.
        Reflect.defineMetadata("routePath", routePath, target, propertyKey);
        Reflect.defineMetadata("middlewares", middlewares, target, propertyKey);
        Reflect.defineMetadata("routeMethod", "patch", target, propertyKey);
    };
}

export function DeleteRoute(routePath: string, middlewares?: RequestHandler[]) {
    return function DeleteRouteDecorator(target: any, propertyKey: string) {
        // Annotate the property with the route path.
        Reflect.defineMetadata("routePath", routePath, target, propertyKey);
        Reflect.defineMetadata("middlewares", middlewares, target, propertyKey);
        Reflect.defineMetadata("routeMethod", "delete", target, propertyKey);
    };
}
