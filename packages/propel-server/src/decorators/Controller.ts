import "reflect-metadata";
import { IRouter, RequestHandler, Router } from "express";
import { getAppBottle } from "../globals/bottle";
import path from "path";

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
 * Class decorator to add the class to the dependency injection container.
 */
export function Controller(baseUrl?: string, middlewares?: RequestHandler[]) {
    return function ControllerDecorator<T extends { new (...arg: any[]): any }>(
        constructor: T
    ) {
        const url = baseUrl ?? "/";
        const router = Router();
        const wrappedClass = class extends constructor {
            public baseUrl: string = url;
            public router: Router = router;

            constructor(...args: any[]) {
                super(...args);

                // Find all annotated methods and add them to the router.
                const methods = Object.getOwnPropertyNames(
                    constructor.prototype
                ).filter((name) => name !== "constructor");
                methods.forEach((method) => {
                    const descriptor = Object.getOwnPropertyDescriptor(
                        constructor.prototype,
                        method
                    );
                    if (
                        descriptor &&
                        descriptor.value &&
                        descriptor.value.constructor.name === "Function"
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

                        if (routePath && routeMethod) {
                            // TODO use a debug logger
                            console.log(
                                "Added route:",
                                path.join(url, routePath)
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

        getAppBottle().service(constructor.name, wrappedClass);

        getAppBottle().container._ExpressDefer.deferUse((app: IRouter) => {
            const instance = getAppBottle().container[constructor.name];

            // TODO use a debug logger
            console.log("Added router:", path.join(url));
            app.use(url, ...(middlewares ?? []), router);
        });

        return wrappedClass;
    };
}
