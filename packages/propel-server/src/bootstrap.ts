import { getAppBottle } from "./globals/bottle";
import { type ExpressDefer } from "./globals/ExpressDefer";
import { ServiceDefer } from "./globals/ServiceDefer";

/**
 * Start propel. Will register all express routes and initialize
 * anything that was registered with @Bootstrap
 *
 * @returns {import("bottlejs").IContainer} - The app container
 */
export async function bootstrap() {
    const appBottle = getAppBottle();

    if (process.env.DRY_RUN !== "true") {
        const expressDefer = appBottle.container._ExpressDefer as ExpressDefer;
        expressDefer.execute();

        const serviceDefer = appBottle.container._ServiceDefer as ServiceDefer;
        await serviceDefer.execute();
    }

    return appBottle.container;
}
