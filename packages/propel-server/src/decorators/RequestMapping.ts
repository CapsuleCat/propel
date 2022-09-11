import { Request, RequestHandler, Response } from "express";
import { ParsedQs } from "qs";
import "reflect-metadata";
import createHttpError, { HttpError } from "http-errors";
import { log } from "../utils/debugLogger";
import { setRouteMetadata } from "../utils/setRouteMetadata";
import { ValidatorClass } from "./Validate";

export type RouteMapping = "get" | "post" | "patch" | "delete";

/**
 * Request Query Decorator Factory
 *
 * Returns a parameter decorator that maps the query to the parameter.
 *
 * @param {string} queryName - The name of the query to map
 * @returns {import('../types').ParamDecorator} - Parameter decorator
 */
export function RequestQuery(queryName?: string) {
    return function RequestQueryDecorator(
        target: any,
        propertyKey: string,
        parameterIndex: number
    ) {
        // Annotate the property with what we want to map from
        // the express request
        Reflect.defineMetadata(
            `requestQuery_${parameterIndex}`,
            queryName ?? true,
            target,
            propertyKey
        );
    };
}

// Express ParsedQs type for convenience
export type RequestQuery = ParsedQs;

/**
 * Request Mapping Decorator Factory
 *
 * Returns a parameter decorator that maps the parameter to the request.
 *
 * @param {string} name - The name of the parameter to map
 * @returns {import('../types').ParamDecorator} - Parameter decorator
 */
export function RequestParam(name: string) {
    return function RequestParamDecorator(
        target: any,
        propertyKey: string,
        parameterIndex: number
    ) {
        // Annotate the property with what we want to map from
        // the express request
        Reflect.defineMetadata(
            `requestParam_${parameterIndex}`,
            name,
            target,
            propertyKey
        );
    };
}

/**
 * Request Mapping Decorator Factory
 *
 * Returns a parameter decorator that maps the request body to the request.
 *
 * If no propertyName is passed, the entire body will be mapped to the request.
 * If a propertyName is passed, the property will be mapped to the request.
 *
 * @param {string} propertyName - The name of the property to map
 * @returns {import('../types').ParamDecorator} - Parameter decorator
 */
export function RequestBody(propertyName?: string) {
    return function RequestBodyDecorator(
        target: any,
        propertyKey: string,
        parameterIndex: number
    ) {
        // Annotate the property with what we want to map from
        // the express request
        Reflect.defineMetadata(
            `requestBody_${parameterIndex}`,
            propertyName ?? true,
            target,
            propertyKey
        );
    };
}

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
 * @returns {import('../types').MethodDecorator} - Method decorator
 */
export function RequestMapping(
    routePath: string,
    method: RouteMapping,
    options?: RequestMappingOptions
) {
    return function RequestMappingDecorator(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        // Wrap the function
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response) {
            // Call the original method with the mapped arguments
            try {
                const expectedNumberOfArguments = originalMethod.length;
                const newArgs: any[] = [];

                log("Running automatic request mapping for", routePath);

                new Array(expectedNumberOfArguments)
                    .fill(0)
                    .forEach((_, index) => {
                        const Validators = Reflect.getMetadata(
                            `validator_${index}`,
                            target,
                            propertyKey
                        ) as ValidatorClass<any, any>[];

                        // Check request queries
                        const requestQuery = Reflect.getMetadata(
                            `requestQuery_${index}`,
                            target,
                            propertyKey
                        );

                        if (requestQuery) {
                            let value: any;

                            if (typeof requestQuery === "string") {
                                value = req.query[requestQuery];
                            } else {
                                value = req.query;
                            }

                            if (Validators) {
                                Validators.forEach((Validator) => {
                                    value = new Validator().validate(value);
                                });
                            }

                            newArgs[index] = value;
                            return;
                        }

                        // Check request params
                        const requestParam = Reflect.getMetadata(
                            `requestParam_${index}`,
                            target,
                            propertyKey
                        );

                        if (requestParam) {
                            const value = req.params[requestParam];
                            newArgs[index] = value;

                            return;
                        }

                        // Check request body
                        const requestBody = Reflect.getMetadata(
                            `requestBody_${index}`,
                            target,
                            propertyKey
                        );

                        if (requestBody) {
                            let value: any;

                            if (typeof requestBody === "string") {
                                value = req.body[requestBody];
                            } else {
                                value = req.body;
                            }

                            if (Validators) {
                                Validators.forEach((Validator) => {
                                    value = new Validator().validate(value);
                                });
                            }

                            newArgs[index] = value;
                            return;
                        }
                    });

                const response = await originalMethod.apply(this, newArgs);

                if (options?.contentType) {
                    res.contentType(options?.contentType);
                }

                res.send(response);
            } catch (e) {
                if (createHttpError.isHttpError(e)) {
                    const safeError = e as HttpError;
                    const code = safeError.statusCode;
                    const name = safeError.name;
                    const message = safeError.message;

                    res.status(code).send({
                        code,
                        name,
                        message,
                    });
                } else {
                    const unsafeError = e as Error;
                    const message =
                        process.env.NODE_ENV === "production"
                            ? "An internal server error occurred"
                            : unsafeError?.message;

                    res.status(500).send({
                        code: 500,
                        name: "Internal Server Error",
                        message,
                    });
                }
            }
        };

        // Add the target to the router
        setRouteMetadata(
            routePath,
            method,
            options?.middleware,
            target,
            propertyKey
        );
    };
}

RequestMapping.GET = "get" as RouteMapping;
RequestMapping.POST = "post" as RouteMapping;
RequestMapping.PATCH = "patch" as RouteMapping;
RequestMapping.DELETE = "delete" as RouteMapping;
