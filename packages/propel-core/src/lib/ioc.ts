import Bottle from "bottlejs";
import type { AccessorKey } from "./types";
import type { TargetClass } from "./toClass";

let appBottle: Bottle | undefined;

type SomeInstance = Record<string | symbol, () => Promise<void> | undefined>;

/**
 * Inject your own Bottle for propel to use.
 *
 * @param {Bottle} bottleInstance - The Bottle instance to use
 * @returns {Bottle} - The Bottle instance
 */
export function createAppBottle(bottleInstance?: Bottle) {
    appBottle = bottleInstance ?? new Bottle();

    // TODO add pre-defined services here

    return appBottle;
}

/**
 * @template T
 * @param {string} name - The name of the dependency to get
 * @returns {T} Dependency
 */
export function getDependency<T = SomeInstance>(name: string): T | undefined {
    if (!appBottle) {
        appBottle = createAppBottle();
    }

    return appBottle.container[name] as T | undefined;
}

/**
 *
 */
export function resetAppBottle() {
    appBottle = undefined;
}

/**
 * Register a dependency with propel
 *
 * @param {string} accessorKey - The name of the dependency to register
 * @param {unknown} service - The service to register
 */
export function register(
    accessorKey: AccessorKey,
    service: ((...any: unknown[]) => unknown) | TargetClass
) {
    if (!appBottle) {
        appBottle = createAppBottle();
    }

    const unsafeService = service as unknown as (...any: unknown[]) => unknown;

    appBottle.service(accessorKey, unsafeService);
}

/**
 *
 */
export function debugBottle() {
    if (!appBottle) {
        appBottle = createAppBottle();
    }
    console.log(appBottle.container);
}
