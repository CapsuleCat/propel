import { logger, getDependency } from "@capsule-cat/propel-core";
import type { AccessorKey } from "../types";

interface DeferStackItem {
    accessorKey: AccessorKey;
    propertyKey: string | symbol;
    priority: number;
}

let deferStack: DeferStackItem[];

/**
 * Defer a method call until the end of the bootstrap process.
 *
 * @param {AccessorKey} accessorKey - The name of the dependency to get
 * @param {string | symbol} propertyKey - The name of the method to call
 * @param {number} priority - The priority of the method to call
 */
export function deferCall(
    accessorKey: AccessorKey,
    propertyKey: string | symbol,
    priority: number
) {
    deferStack.push({ accessorKey, propertyKey, priority });
    deferStack = deferStack.sort((a, b) => a.priority - b.priority);
}

/**
 * Execute the defer stack.
 *
 * @returns {Promise<void>}
 */
export async function executeDeferStack() {
    for (const item of deferStack) {
        const target = getDependency(item.accessorKey);

        if (!target) {
            continue;
        }

        if (!target[item.propertyKey]) {
            logger("warn", "No method found for %s", item.propertyKey);
            throw new Error(`No method found for ${String(item.propertyKey)}`);
        }

        await target[item.propertyKey].call(target);
    }

    deferStack = [];
}
