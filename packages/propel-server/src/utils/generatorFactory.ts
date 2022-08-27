import { getAppBottle } from "../globals/bottle";

export function generatorFactory(name?: string) {
    return function Decorator<T extends { new (...arg: any[]): any }>(
        constructor: T
    ) {
        const getGenerator = function getGenerator() {
            return new constructor();
        };

        getAppBottle().service(name ?? constructor.name, getGenerator);
    };
}
