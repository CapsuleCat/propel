import { getAppBottle } from "../globals/bottle";

export function Entity(entityName?: string) {
    return function EntityDecorator<T extends { new (...arg: any[]): any }>(
        constructor: T
    ) {
        const getEntity = function getEntity() {
            return new constructor();
        };

        getAppBottle().service(entityName ?? constructor.name, getEntity);
    };
}
