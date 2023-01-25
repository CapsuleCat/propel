/**
 * Class type with constructor arguments
 */
export type Class<I, Args extends any[] = any[]> = new (...args: Args) => I;

/**
 * Validator interface for Propel
 *
 * Use this interface to create custom validators that work with the `@Validate` decorator.
 */
export interface Validator<T, U = void> {
    validate(v: T): U;
}
