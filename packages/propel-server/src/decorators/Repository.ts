import { generatorFactory } from "../utils/generatorFactory";

export function Repository(repoName?: string) {
    return generatorFactory(repoName);
}
