import { generatorFactory } from "../utils/generatorFactory";

export function Entity(serviceName?: string) {
    return generatorFactory(serviceName);
}
