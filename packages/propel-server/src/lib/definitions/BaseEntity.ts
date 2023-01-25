class ModelProxier<T extends object> {
    protected model: T | undefined;

    constructor() {
        // Proxy access to the db instance
        return new Proxy(this, {
            get: (target, prop) => {
                if (prop in target) {
                    return target[prop as keyof typeof target];
                }

                if (target.model && prop in target.model) {
                    const key = prop as keyof T;
                    if (typeof target.model[key] === "function") {
                        return (
                            target.model[key] as unknown as CallableFunction
                        ).bind(target.model);
                    }

                    return target.model[key];
                }

                throw new Error(`Unknown property ${String(prop)}`);
            },
        });
    }

    public getModel(): T {
        if (!this.model) {
            throw new Error(
                "Model was not initialized. Did you forget to set it in the constructor?"
            );
        }

        return this.model;
    }
}

export const BaseEntity = ModelProxier as new <T extends object>() => T &
    ModelProxier<T>;
