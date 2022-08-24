import { getAppBottle } from "./globals/bottle";
import { type ExpressDefer } from "./globals/ExpressDefer";
import { ServiceDefer } from "./globals/ServiceDefer";

export async function bootstrap() {
    const appBottle = getAppBottle();
    const expressDefer = appBottle.container._ExpressDefer as ExpressDefer;
    expressDefer.execute();

    const serviceDefer = appBottle.container._ServiceDefer as ServiceDefer;
    await serviceDefer.execute();

    return appBottle.container;
}
