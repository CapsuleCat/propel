export interface SomeObject {
    [key: string]: unknown;
}

export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
    [Property in Key]-?: Type[Property];
};

export type Middleware = (
    req: Request,
    res: Response,
    next: CallableFunction
) => any;

export type NullishPropertiesOf<T> = {
    [P in keyof T]-?: undefined extends T[P]
        ? P
        : null extends T[P]
        ? P
        : never;
}[keyof T];

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type MakeNullishOptional<T extends object> = T extends any
    ? Optional<T, NullishPropertiesOf<T>>
    : never;

export type ClassDecorator = <T extends { new (...arg: any[]): any }>(
    constructor: T
) => void;

export type PropertyDecorator = (target: any, propertyKey: string) => void;

export type MethodDecorator = (target: any, propertyKey: string) => void;

export type ParamDecorator = (
    target: any,
    propertyKey: string,
    parameterIndex: number
) => void;
