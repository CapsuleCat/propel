import "reflect-metadata";

import {
    AccessorOptions,
    logger,
    register,
    toClass,
    createAccessorKey,
} from "@capsule-cat/propel-core";
import { RequestHandler, Router } from "express";
import { registerExpress } from "../utilities/ioc";

export type RouteType =
    | "all"
    | "get"
    | "post"
    | "put"
    | "delete"
    | "patch"
    | "options"
    | "head";

export type ControllerOptions = AccessorOptions;

/**
 * Controller Decorator Factory
 *
 * Register the decorated class as a Controller that will register all route
 * methods with Express auto-magically.
 *
 * @param {string} baseUrl - base url for the route. Defaults to '/'
 * @param {RequestHandler[]} middlewares - list of middelwares to apply to all routes
 * @param {ControllerOptions} options - options for the controller
 * @returns {import('../types').Decorator} - a class decorator
 */
export function Controller(
    baseUrl?: string,
    middlewares: RequestHandler[] = [],
    options?: ControllerOptions
): ClassDecorator {
    const url = baseUrl ?? "/";
    const router = Router();

    return function ControllerDecorator(target: any) {
        const targetClass = toClass(target);
        const defaultKey = targetClass.constructor.name;
        const accessorKey = createAccessorKey(defaultKey, options);

        const Constructor = targetClass;

        const WrappedClass = class extends Constructor {
            public baseUrl: string = url;
            public router: Router = router;

            constructor(...args: any[]) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                super(...args);

                logger("controller", `Registering ${accessorKey} at ${url}`);

                const annotatedMethods = getOwnAnnotatedMethods(
                    Constructor.prototype
                );

                for (const methodName of annotatedMethods) {
                    const descriptor = Object.getOwnPropertyDescriptor(
                        Constructor.prototype,
                        methodName
                    );

                    if (!descriptor) {
                        continue;
                    }

                    const fn = descriptor?.value as RequestHandler;
                    const routeMetadata = getRouteMetadata(
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        Constructor.prototype,
                        methodName
                    );

                    if (routeMetadata?.path && routeMetadata.method) {
                        logger(
                            "controller",
                            `Registering ${accessorKey}.${methodName} at ${routeMetadata.path} (${routeMetadata.method})`
                        );

                        router
                            .route(routeMetadata.path)
                            .all(...middlewares)
                            [routeMetadata.method](
                                ...routeMetadata.middlewares,
                                fn.bind(this)
                            );
                    }
                }
            }
        };

        logger.graph("Registering Controller %s", accessorKey);

        register(accessorKey, () => new WrappedClass());
        registerExpress(accessorKey, url, router);
    };
}

function getOwnAnnotatedMethods(target: any) {
    return Object.getOwnPropertyNames(target).filter((key) => {
        if (key === "constructor") {
            return false;
        }

        const descriptor = Object.getOwnPropertyDescriptor(target, key);

        return !!(descriptor?.value && typeof descriptor.value === "function");
    });
}

// eslint-disable-next-line @typescript-eslint/ban-types -- this comes from a decorator
function getRouteMetadata(target: Object, methodName: string) {
    const routePath = Reflect.getMetadata("routePath", target, methodName);
    const routeMethod = Reflect.getMetadata("routeMethod", target, methodName);
    const routeMiddlewares = Reflect.getMetadata(
        "middlewares",
        target,
        methodName
    );

    return {
        path: routePath as string,
        method: routeMethod as RouteType,
        middlewares: routeMiddlewares as RequestHandler[],
    };
}
