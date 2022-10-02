import "reflect-metadata";
import { IRouter, RequestHandler, Router } from "express";
import { getAppBottle } from "../globals/bottle";
import path from "path";
import { graphLogger, logger } from "../utils/debugLogger";

export type KnownRouteType =
    | "all"
    | "get"
    | "post"
    | "put"
    | "delete"
    | "patch"
    | "options"
    | "head";

/**
 * Controller Decorator Factory
 *
 * Register the decorated class as a Controller that will register all route
 * methods with Express auto-magically.
 *
 * @param {string} baseUrl - base url for the route. Defaults to '/'
 * @param {RequestHandler[]} middlewares - list of middelwares to apply to all routes
 * @returns {import('../types').Decorator} - a class decorator
 */
export function Controller(baseUrl?: string, middlewares?: RequestHandler[]) {
    return function ControllerDecorator<T extends { new (...arg: any[]): any }>(
        constructor: T
    ) {
        const url = baseUrl ?? "/";
        const router = Router();

        // Wrap the decorated class and automatically wrap any methods
        // that look like routes.
        const wrappedClass = class extends constructor {
            public baseUrl: string = url;
            public router: Router = router;

            constructor(...args: any[]) {
                super(...args);

                logger("controller", `Registering ${constructor.name}`);

                // Find all annotated methods and add them to the router.
                const methods = Object.getOwnPropertyNames(
                    constructor.prototype
                ).filter((name) => name !== "constructor");
                methods.forEach((method) => {
                    const descriptor = Object.getOwnPropertyDescriptor(
                        constructor.prototype,
                        method
                    );

                    logger("controller", `Found property ${method}`);

                    if (
                        descriptor &&
                        descriptor.value &&
                        typeof descriptor.value === "function"
                    ) {
                        const fn = descriptor.value;
                        const fnMiddlewares = middlewares ?? [];

                        // Get the route path from the method's metadata.
                        const routePath = Reflect.getMetadata(
                            "routePath",
                            constructor.prototype,
                            method
                        );
                        const routeMethod = Reflect.getMetadata(
                            "routeMethod",
                            constructor.prototype,
                            method
                        );
                        const routeMiddlewares = Reflect.getMetadata(
                            "middlewares",
                            constructor.prototype,
                            method
                        );

                        logger(
                            "controller",
                            `Found route ${routePath} with method ${routeMethod}`
                        );

                        // Finally, wrap the function if it looks like
                        // a route. IE it has "routePath" and "routeMethod"
                        // data.
                        if (routePath && routeMethod) {
                            logger(
                                "controller",
                                `Adding route ${path.join(
                                    url,
                                    routePath
                                )} with method ${routeMethod}`
                            );
                            router
                                .route(routePath)
                                .all(...fnMiddlewares)
                                [routeMethod as KnownRouteType](
                                    ...(routeMiddlewares ?? []),
                                    fn.bind(this)
                                );
                        }
                    }
                });
            }
        };

        graphLogger("Registering Controller %s", constructor.name);
        getAppBottle().service(constructor.name, wrappedClass);

        getAppBottle().container._ExpressDefer.deferUse((app: IRouter) => {
            getAppBottle().container[constructor.name];
            logger("controller", `Adding router ${path.join(url)}`);
            app.use(url, ...(middlewares ?? []), router);
        });

        return wrappedClass;
    };
}
