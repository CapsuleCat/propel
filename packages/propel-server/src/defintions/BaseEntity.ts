export abstract class BaseEntity<T> {
    protected model: T | undefined;

    getModel(): T {
        if (!this.model) {
            throw new Error(
                "Model was not initialized. Did you forget to set it in the constructor?"
            );
        }

        return this.model;
    }
}
