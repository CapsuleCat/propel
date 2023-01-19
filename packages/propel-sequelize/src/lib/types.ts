export type NullishPropertiesOf<T> = {
    [P in keyof T]-?: undefined extends T[P]
        ? P
        : null extends T[P]
        ? P
        : never;
}[keyof T];

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MakeNullishOptional<T extends object> = T extends any
    ? Optional<T, NullishPropertiesOf<T>>
    : never;
