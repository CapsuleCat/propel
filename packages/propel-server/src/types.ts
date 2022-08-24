export interface SomeObject {
    [key: string]: unknown;
}

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
