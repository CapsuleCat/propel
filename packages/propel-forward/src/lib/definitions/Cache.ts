export interface Cache {
    get<T>(key: string): Promise<T | undefined>;
    remove(key: string): Promise<void>;
    store<T>(key: string, value: T): Promise<void>;
}
