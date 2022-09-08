class DBProxier<T> {
    public db?: T;

    constructor() {
        // Proxy access to the db instance
        return new Proxy(this, {
            get: (target, prop) => {
                if (prop in target) {
                    return target[prop as keyof typeof target];
                }

                if (target.db) {
                    if (prop in target.db) {
                        const key = prop as keyof T;
                        if (typeof target.db[key] === "function") {
                            return (
                                target.db[key] as unknown as CallableFunction
                            ).bind(target.db);
                        }

                        return target.db[key];
                    }
                }

                throw new Error(`Unknown property ${String(prop)}`);
            },
        });
    }
}

export const Database = DBProxier as {
    new <T>(): T & DBProxier<T>;
};
