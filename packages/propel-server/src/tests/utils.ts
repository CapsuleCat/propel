import { getAppBottle, resetAppBottle } from "../globals/bottle";

/**
 *
 */
export function testInit() {
    const appBottle = getAppBottle();
    const expressDefer = appBottle.container._ExpressDefer;
    expressDefer.execute();
}

/**
 *
 */
export async function testBootstrap() {
    const appBottle = getAppBottle();
    const serviceDefer = appBottle.container._ServiceDefer;
    await serviceDefer.execute();
}

/**
 *
 */
export function testTeardown() {
    resetAppBottle();
}
