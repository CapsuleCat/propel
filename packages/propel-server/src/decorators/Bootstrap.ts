import { getAppBottle } from "../globals/bottle";

export interface BootstrapProps {
    priority: number;
}

/**
 * The higher the number, the earlier the bootstrap will be called
 */
export function Bootstrap(
    { priority = 10 }: BootstrapProps = {
        priority: 10,
    }
) {
    return function BootstrapDecorator(target: any, propertyKey: string) {
        getAppBottle().container._ServiceDefer.push(() => {
            return target[propertyKey]();
        }, priority);
    };
}
