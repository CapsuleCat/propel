import type { AccessorOptions } from "@capsule-cat/propel-core";

export type AccessorKey = string;

export type ServiceFactory = ((...args: unknown[]) => unknown) & {
    isFactory: true;
};

export interface EntityOptions extends AccessorOptions {
    when?: () => boolean;
}
