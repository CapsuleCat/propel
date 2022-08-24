import bodyParser from "body-parser";
import { IRouter } from "express";
import { getAppBottle } from "../globals/bottle";

export interface PropelApplicationProps {
    // TODO
    disableBodyParser?: boolean;
}

export function PropelApplication({
    disableBodyParser = false,
}: PropelApplicationProps = {}) {
    return function PropelApplicationDecorator<
        T extends { new (...arg: any[]): any }
    >(constructor: T) {
        getAppBottle().container._ExpressDefer.expressSetup((app: IRouter) => {
            // TODO let downstream users turn these options on or off

            if (!disableBodyParser) {
                app.use(bodyParser.json());
            }
        });
    };
}
