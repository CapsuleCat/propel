import { getAppBottle } from "./globals/bottle";

/**
 * Add this to your jest setupFiles to ensure that the app is bootstrapped before
 * any tests are run.
 *
 * ```json
 * "setupFiles": [
 *   "<rootDir>/src/__test__/propel.ts"
 * ],
 * ```
 *
 * Then, in propel.ts:
 *
 * ```js
 * import { testSetup } from "@capsule-cat/propel-server";
 *
 * testSetup();
 * ```
 */
export function testSetup() {
    const appBottle = getAppBottle();
    const expressDefer = appBottle.container._ExpressDefer;
    expressDefer.execute();
}
