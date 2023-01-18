import type { AccessorKey } from "@capsule-cat/propel-core";
import { createAccessorKey, getDependency } from "@capsule-cat/propel-core";
import type { IRouter, Router } from "express";

interface ControllerStackItem {
    accessorKey: AccessorKey;
    url: string;
    router: Router;
}

const controllerStack: ControllerStackItem[] = [];

/**
 * Register an express router with propel
 *
 * @param {string} accessorKey - the key to register the router with
 * @param {string} url - the url to register the router at
 * @param {IRouter} router - the router to register
 */
export function registerExpress(
    accessorKey: AccessorKey,
    url: string,
    router: Router
) {
    controllerStack.push({ accessorKey, url, router });
}

/**
 * Execute the controller stack
 */
export function executeControllerStack() {
    const expressKey = createAccessorKey("Express");
    const express = getDependency<IRouter>(expressKey);

    if (!express) {
        throw new Error("Express not found");
    }

    for (const item of controllerStack) {
        express.use(item.url, item.router);
    }
}

const bootstrapStack: CallableFunction[] = [];

/**
 * Register a bootstrap function with propel
 *
 * @param {CallableFunction} fn - the function to register
 */
export function registerBootstrap(fn: CallableFunction) {
    bootstrapStack.push(fn);
}

/**
 * Execute the bootstrap stack
 */
export async function executeBootstrapStack() {
    const expressKey = createAccessorKey("Express");
    const express = getDependency<IRouter>(expressKey);

    for (const fn of bootstrapStack) {
        await fn(express);
    }
}

/**
 *
 */
export function clearControllerStack() {
    controllerStack.length = 0;
}

/**
 *
 */
export function clearBootstrapStack() {
    bootstrapStack.length = 0;
}
