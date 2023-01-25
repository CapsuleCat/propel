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

/**
 * A plugin is a function that is registered with Propel and called when Propel is initialized.
 */
export interface PropelPlugin {
    init?: () => Promise<void>;
}

export type WhenCallback = () => boolean;
