import { Validator } from "../defintions/Validator";
import { Class } from "../types";

export type ValidatorClass<T, U> = Class<Validator<T, U>, []>;

/**
 * Validate Parameter Decorator Factory
 *
 * Returns a parameter decorator that validates the parameter. Expects
 * a validator class to be passed in. If the Validator.validate method
 * returns a value, the value will be set as the parameter. If the
 * Validator.validate method throws an error, the error will be passed up.
 *
 * @param {ValidatorClass} validator - The validator class to use
 * @returns {import('../types').ParamDecorator} - Parameter decorator
 */
export function Validate<T, U>(validator: ValidatorClass<T, U>) {
    return function ValidatorParamDecorator(
        target: any,
        propertyKey: string,
        parameterIndex: number
    ) {
        // Get existing metadata
        const existingValidators = Reflect.getMetadata(
            `validator_${parameterIndex}`,
            target,
            propertyKey
        );

        const validators = [...(existingValidators || []), validator];

        // Annotate the property with what we want to map from
        // the express request
        Reflect.defineMetadata(
            `validator_${parameterIndex}`,
            validators,
            target,
            propertyKey
        );
    };
}
