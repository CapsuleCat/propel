export type TargetClass = new (...arg: any[]) => any;

/**
 * Typecast a target to a class
 *
 * @param {any} target - a target
 * @returns {TargetClass} - a class
 */
export function toClass(target: any): TargetClass {
    return target as TargetClass;
}
