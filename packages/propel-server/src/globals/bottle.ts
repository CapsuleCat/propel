import Bottle from "bottlejs";
import { ExpressDefer, getExpressDefer } from "./ExpressDefer";
import { getServiceDefer } from "./ServiceDefer";

let appBottle: Bottle | undefined;

/**
 * Inject your own Bottle for propel to use.
 *
 * @param {Bottle} bottleInstance - The Bottle instance to use
 * @returns {Bottle} - The Bottle instance
 */
export function createAppBottle(bottleInstance?: Bottle) {
    appBottle = bottleInstance ?? new Bottle();

    appBottle.service("_ExpressDefer", getExpressDefer);
    appBottle.service("_ServiceDefer", getServiceDefer);
    appBottle.service(
        "Express",
        function getExpress(expressDefer: ExpressDefer) {
            return expressDefer.getApp();
        },
        "_ExpressDefer"
    );

    return appBottle;
}

/**
 * Get the app bottle
 *
 * @returns {Bottle} - the bottle
 */
export function getAppBottle(): Bottle {
    if (!appBottle) {
        return createAppBottle();
    }

    return appBottle;
}

/**
 *
 */
export function resetAppBottle() {
    appBottle = undefined;
}
