export type AccessorKey = string;

export interface AccessorOptions {
    /**
     * Override the name of the dependency to inject.
     */
    name?: AccessorKey;
}

export interface InjectOptions extends AccessorOptions {
    args?: unknown[];
    failIfMissing?: boolean;
    unbox?: (injectable: unknown) => unknown;
}

export interface PropelPlugin {
    init?: () => Promise<void>;
}

export type WhenCallback = () => boolean;
