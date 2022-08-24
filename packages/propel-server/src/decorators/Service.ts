import { getAppBottle } from "../globals/bottle";

export function Service(serviceName?: string) {
    return function ServiceDecorator<T extends { new (...arg: any[]): any }>(
        constructor: T
    ) {
        const getService = function getService() {
            return new constructor();
        };

        getAppBottle().service(serviceName ?? constructor.name, getService);
    };
}
