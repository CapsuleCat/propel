/**
 *
 * @param value
 * @param message
 */
export function assertTruthy(value: unknown, message?: string): asserts value {
    if (!value) {
        throw new Error(message ?? "Assertion failed");
    }
}
