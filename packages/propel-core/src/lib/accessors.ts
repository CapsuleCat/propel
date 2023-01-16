import type { AccessorKey, AccessorOptions } from "./types";

/**
 * Create a unique key for an accessor
 *
 * @param {string | symbol} propertyKey - the property key
 * @param {AccessorOptions} options - optional params
 * @returns {AccessorKey} - a unique key for the accessor
 */
export function createAccessorKey(
    propertyKey: string | symbol,
    options?: AccessorOptions
): AccessorKey {
    const safePropertyKey = String(options?.name ?? propertyKey)
        .replace(/[^\dA-Za-z]/g, "_")
        .toLocaleLowerCase();

    return `__${safePropertyKey}__`;
}
