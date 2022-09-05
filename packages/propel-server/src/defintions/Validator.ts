export interface Validator<T, U = void> {
    validate(v: T): U;
}
