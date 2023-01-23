/**
 * Run a function only once.
 *
 * @param fn
 */
export function once(fn: () => void): () => void {
    let called = false;
    return () => {
        if (!called) {
            called = true;
            fn();
        }
    };
}
