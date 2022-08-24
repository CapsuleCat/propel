import Bottle from "bottlejs";
import { ExpressDefer, getExpressDefer } from "./ExpressDefer";
import { getServiceDefer } from "./ServiceDefer";

const appBottle = new Bottle();

appBottle.service("_ExpressDefer", getExpressDefer);
appBottle.service("_ServiceDefer", getServiceDefer);
appBottle.service(
    "Express",
    function getExpress(expressDefer: ExpressDefer) {
        return expressDefer.getApp();
    },
    "_ExpressDefer"
);

export function getAppBottle(): Bottle {
    return appBottle;
}
