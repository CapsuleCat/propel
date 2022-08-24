import { getAppBottle } from "../globals/bottle";

export function Repository(repoName?: string) {
    return function RepositoryDecorator<T extends { new (...arg: any[]): any }>(
        constructor: T
    ) {
        const getRepository = function getRepository() {
            return new constructor();
        };

        getAppBottle().service(repoName ?? constructor.name, getRepository);
    };
}
