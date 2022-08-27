import { generatorFactory } from "../utils/generatorFactory";

export function Service(serviceName?: string) {
    return generatorFactory(serviceName);
}
