import type { AccessorOptions, WhenCallback } from "@capsule-cat/propel-core";

export type AccessorKey = string;

type SomeClass = new (...args: unknown[]) => unknown;

export type ServiceFactory = SomeClass & {
    isFactory: true;
};

export interface EntityOptions extends AccessorOptions {
    when?: WhenCallback;
}
