import bodyParser from "body-parser";
import { IRouter } from "express";
import { getAppBottle } from "../globals/bottle";

export interface PropelApplicationProps {
    // TODO
    disableBodyParser?: boolean;
}

/**
 * Propel Application Class Decorator Factory
 *
 * @param {PropelApplicationProps} optionalParams - optional params
 * @returns {import("../types").ClassDecorator} - a class decorator
 */
export function PropelApplication({
    disableBodyParser = false,
}: PropelApplicationProps = {}) {
    return function PropelApplicationDecorator() {
        getAppBottle().container._ExpressDefer.expressSetup((app: IRouter) => {
            // TODO let downstream users turn these options on or off

            if (!disableBodyParser) {
                app.use(bodyParser.json());
            }
        });
    };
}
