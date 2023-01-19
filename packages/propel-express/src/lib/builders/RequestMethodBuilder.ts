import type { Request, RequestHandler, Response } from "express";
import type { HttpError } from "http-errors";
import createHttpError from "http-errors";
import type {
    RequestMappingOptions,
    RouteMapping,
} from "../decorators/requests/RequestMapping";
import type { ValidatorClass } from "../decorators/requests/Validate";
import type { TargetClass } from "@capsule-cat/propel-core";
import { toClass } from "@capsule-cat/propel-core";

export interface IBuilder<T> {
    build(): T;
}

export class RequestMethodBuilder implements IBuilder<MethodDecorator> {
    constructor(
        private routePath: string,
        private method: RouteMapping,
        private options?: RequestMappingOptions
    ) {}

    build(): MethodDecorator {
        const contentType = this.options?.contentType;
        const routePath = this.routePath;
        const method = this.method;
        const middleware = this.options?.middleware ?? [];

        return function RequestMappingDecorator(
            target: any,
            propertyKey: string | symbol,
            descriptor: PropertyDescriptor
        ) {
            const targetClass = toClass(target);
            const originalMethod = descriptor.value as (
                ...args: unknown[]
            ) => Promise<unknown>;

            descriptor.value = async function (req: Request, res: Response) {
                try {
                    const expectedNumberOfArguments = originalMethod.length;

                    const newArgs = Array.from({
                        length: expectedNumberOfArguments,
                    })
                        .fill(null)
                        .map((_, index) => {
                            const value = getMappedValue(
                                targetClass,
                                propertyKey,
                                index,
                                req
                            );
                            return validateValue(
                                targetClass,
                                propertyKey,
                                index,
                                value
                            );
                        });

                    const response = await originalMethod.apply(this, newArgs);

                    if (contentType) {
                        res.contentType(contentType);
                    }

                    res.send(response);
                } catch (error) {
                    if (createHttpError.isHttpError(error)) {
                        const safeError = error as HttpError;
                        const code = safeError.statusCode;
                        const name = safeError.name;
                        const message = safeError.message;

                        res.status(code).send({
                            code,
                            name,
                            message,
                        });
                    } else {
                        const unsafeError = error as Error;
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

                // Add the target to the router
                setRouteMetadata(
                    routePath,
                    method,
                    middleware,
                    target,
                    propertyKey
                );
            };
        };
    }
}

function getMappedValue(
    target: TargetClass,
    propertyKey: string | symbol,
    index: number,
    req: Request
) {
    // Check request queries
    const requestQuery = Reflect.getMetadata(
        `requestQuery_${index}`,
        target,
        propertyKey
    );

    if (requestQuery) {
        return typeof requestQuery === "string"
            ? req.query[requestQuery]
            : req.query;
    }

    // Check request params
    const requestParam = Reflect.getMetadata(
        `requestParam_${index}`,
        target,
        propertyKey
    ) as string;

    if (requestParam) {
        return req.params[requestParam];
    }

    // Check request body
    const requestBody = Reflect.getMetadata(
        `requestBody_${index}`,
        target,
        propertyKey
    ) as string | boolean;

    if (requestBody) {
        const body = req.body as Record<string, unknown>;
        return typeof requestBody === "string" ? body[requestBody] : body;
    }
}

function validateValue(
    target: TargetClass,
    propertyKey: string | symbol,
    index: number,
    value: unknown
) {
    const Validators = Reflect.getMetadata(
        `validator_${index}`,
        target,
        propertyKey
    ) as ValidatorClass<any, any>[];

    let nextValue = value;

    if (Validators) {
        for (const Validator of Validators) {
            const validator = new Validator();

            nextValue = validator.validate(nextValue);
        }
    }

    return nextValue;
}

function setRouteMetadata(
    routePath: string,
    routeMethod: string,
    middlewares: RequestHandler[] | undefined,
    target: any,
    propertyKey: string | symbol
) {
    const targetClass = toClass(target);

    // Annotate the property with the route path.
    Reflect.defineMetadata("routePath", routePath, targetClass, propertyKey);
    Reflect.defineMetadata(
        "middlewares",
        middlewares,
        targetClass,
        propertyKey
    );
    Reflect.defineMetadata(
        "routeMethod",
        routeMethod,
        targetClass,
        propertyKey
    );
}
